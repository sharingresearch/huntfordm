/*
 * Copyright (c) 2018, Ben Barsdell. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * * Redistributions of source code must retain the above copyright
 *   notice, this list of conditions and the following disclaimer.
 * * Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 * * Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived
 *   from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS ``AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/*
  TODO: Clean up the code:
    Do proper async (promise-based) shader loading/initialization
  TODO: Implement sharable links by loading/saving control values to HTTP GET string
*/

import { mat4 } from "gl-matrix";
import { createFloatBuffer, FloatBuffer } from "@web/webgl/utils/buffer";
import { loadTexture } from "@web/webgl/utils/texture";
import {
  buildShaderProgram,
  ProgramShaderSource,
} from "@web/webgl/utils/shader";

import { vsSource as imgVsSource } from "./shaders/simple_vert";
import { fsSource as imgFsSource } from "./shaders/image_warp_frag";
import { vsSource as magVsSource } from "./shaders/inverse_shear_mapping_vert";
import { fsSource as magFsSource } from "./shaders/simple_frag";

type AttributeLocations = {
  position: number;
  projection: WebGLUniformLocation | null;
  modelview: WebGLUniformLocation | null;
  kappa_c: WebGLUniformLocation | null;
  gamma_c: WebGLUniformLocation | null;
  lens_count: WebGLUniformLocation | null;
  lens_pos: WebGLUniformLocation | null;
  lens_mass: WebGLUniformLocation | null;
  texture: WebGLUniformLocation | null;
  textureScale: WebGLUniformLocation | null;
};

export type AttributeSettings = {
  kappa_c: number;
  gamma_c: number;
  lens_count: number;
  lens_pos: Float32List;
  lens_mass: number;
  texture: WebGLTexture | null;
  textureScale: [w: number, h: number];
};

type SimulationProgramVariant = {
  program: WebGLProgram;
  vertexBuffer: FloatBuffer;
  attributes: AttributeLocations;
};

export enum RenderMode {
  magnitude = 0,
  image = 1,
}

export type Lens = {
  position: [number, number];
  mass: number;
};

const sourceScale = 0.5;
const quadCoords = [
  -sourceScale,
  -sourceScale,
  -sourceScale,
  sourceScale,
  sourceScale,
  -sourceScale,
  sourceScale,
  sourceScale,
];
// Note: This breaks the 1:1 b/w pxls and verts. Could adjust the
//         resolution to take this into account and achieve 1:1.
const imageScaleEdgePad = 0.0;
const rawImageScale = (1.0 + imageScaleEdgePad) * sourceScale;
const imageScale: [number, number] = [rawImageScale, rawImageScale];

export class LensingSimulationProgram {
  readonly gl: WebGLRenderingContext;
  readonly programVariants: (SimulationProgramVariant | null)[] = [];
  readonly projection = mat4.create();
  readonly modelview = mat4.create();
  resolution?: [number, number];
  lenses: Lens[];
  activeProgramVariant: RenderMode | null = null;
  settings: AttributeSettings;

  constructor(
    gl: WebGLRenderingContext,
    meshResolution: [number, number],
    textureSrc = "images/M51_Whirlpool_Galaxy.jpg",
    textureScale: [number, number] = [1, 1],
    lenses: Lens[] = [{ position: [0.5, 0.5], mass: 0.2 }]
  ) {
    this.gl = gl;
    const magShaders = { fsSource: magFsSource, vsSource: magVsSource };
    const imgShaders = { fsSource: imgFsSource, vsSource: imgVsSource };
    const programShaders: ProgramShaderSource[] = [magShaders, imgShaders];
    const vertexBuffers = [genMesh(meshResolution, imageScale), quadCoords];
    for (let i = 0; i < programShaders.length; ++i) {
      const sp = buildShaderProgram(gl, programShaders[i]);

      if (!sp) {
        console.warn(
          "[Simulation] Error initialising shader program. Program will not function: ",
          programShaders[i]
        );
        this.programVariants.push(null);
        continue;
      }

      const buffer = createFloatBuffer(gl, vertexBuffers[i], 2, gl.STATIC_DRAW);
      if (!buffer) {
        console.error("[Simulation] Error creating vertex buffer.");
        continue;
      }

      // Add an attribute for each buffer we will pass in
      const simulationVariant: SimulationProgramVariant = {
        program: sp,
        vertexBuffer: buffer,
        attributes: {
          position: gl.getAttribLocation(sp, "a_position"),
          projection: gl.getUniformLocation(sp, "u_projection"),
          modelview: gl.getUniformLocation(sp, "u_modelview"),
          kappa_c: gl.getUniformLocation(sp, "u_kappa_c"),
          gamma_c: gl.getUniformLocation(sp, "u_gamma_c"),
          lens_count: gl.getUniformLocation(sp, "u_lens_count"),
          lens_pos: gl.getUniformLocation(sp, "u_lens_pos"),
          lens_mass: gl.getUniformLocation(sp, "u_lens_mass"),
          texture: gl.getUniformLocation(sp, "u_texture"),
          textureScale: gl.getUniformLocation(sp, "u_textureScale"),
        },
      };
      gl.enableVertexAttribArray(simulationVariant.attributes.position);

      this.programVariants.push(simulationVariant);
    }

    loadTexture(gl, textureSrc)
      .then((texture) => {
        this.settings.texture = texture;
        if (this.resolution) {
          this.drawScene(this.resolution);
        }
      })
      .catch((err) => console.error(err));

    this.lenses = lenses;
    this.settings = {
      kappa_c: 0,
      gamma_c: 0,
      lens_count: 1,
      lens_pos: lenses.reduce<Float32List>(
        (prev: Float32List, current: Lens) => {
          return [...prev, ...current.position];
        },
        []
      ),
      lens_mass: 0.2, // To Do: Update shader to support different masses between lenses and reduce lenses to array of masses
      texture: null,
      textureScale: textureScale,
    };

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.disable(gl.DEPTH_TEST);
  }

  updateTextureScale = (textureScale: [number, number]) => {
    console.log("[Simulation] Updating texture scale: ", textureScale);
    this.settings.textureScale = textureScale;
  };

  drawScene = (resolution: [number, number], lenses?: Lens[]) => {
    this.resolution = resolution;
    this.gl.viewport(0, 0, resolution[0], resolution[1]);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    const heightAspect = Math.min(resolution[1] / resolution[0], 1);
    const widthAspect = Math.min(resolution[0] / resolution[1], 1);
    mat4.ortho(
      this.projection,
      -sourceScale * widthAspect,
      sourceScale * widthAspect,
      sourceScale * heightAspect,
      -sourceScale * heightAspect,
      -1.0,
      1.0
    );
    mat4.identity(this.modelview);

    const programVariant = this.programVariants[this.activeProgramVariant || 0];
    if (!programVariant) return;

    // Set shader program
    this.gl.useProgram(programVariant.program);

    // Pass each buffer into the shader program
    this.gl.bindBuffer(
      this.gl.ARRAY_BUFFER,
      programVariant.vertexBuffer.buffer
    );
    this.gl.vertexAttribPointer(
      programVariant.attributes.position,
      programVariant.vertexBuffer.itemSize,
      this.gl.FLOAT,
      false,
      0,
      0
    );

    if (lenses) {
      this.lenses = lenses;
    }

    this.settings.lens_count = this.lenses.length;
    this.settings.lens_pos = this.lenses.reduce<Float32List>(
      (prev: Float32List, current: Lens) => {
        return [...prev, ...applyAspect(current.position, heightAspect)];
      },
      []
    );
    this.settings.lens_mass = this.lenses.reduce<number>(
      (prev: number, current: Lens) => {
        return current.mass > prev ? current.mass : prev;
      },
      0
    );

    setUniforms(
      this.gl,
      programVariant,
      this.settings,
      this.projection,
      this.modelview
    );
    // Note: Originally I used drawElements and an index buffer, but
    //         I discovered that this limits the number of verts to
    //         65k. Using drawArrays means having repeated vertices,
    //         but at least we can have unlimited resolution.
    this.gl.drawArrays(
      this.gl.TRIANGLE_STRIP,
      0,
      programVariant.vertexBuffer.numItems
    );
  };
}

/**
 *
 * @param position the position to update
 * @param verticalAspectRatio the multiplier to apply to the vertical position to account for the aspect ratio
 * @returns position with vertical ratio applied
 */
const applyAspect = (
  [x, y]: [x: number, y: number],
  verticalAspectRatio: number
): [x: number, y: number] => {
  return [x, y * verticalAspectRatio];
};

const genMesh = (
  [xRes, yRes]: [x: number, y: number],
  [w, h]: [w: number, h: number],
  hexMesh = true
) => {
  const meshCoords = [];
  let x = 0;
  meshCoords.push((1.0 / xRes - 1) * w, (1.0 / yRes - 1) * h);

  for (let row = 0; row < yRes - 1; ++row) {
    for (let col = 0; col < xRes - 1; ++col) {
      // Hex mesh (equilateral triangles) or square mesh (isosceles right
      // triangles).
      const hexShift = !(row % 2);
      const hexMeshEvenMultiplier = hexMesh && hexShift ? 1 : 0;
      const hexMeshOddMultipler = hexMesh && !hexShift ? 1 : 0;

      meshCoords.push(
        w * ((2.0 * (x + 0.5 + 0.5 * hexMeshEvenMultiplier)) / xRes - 1),
        h * ((2.0 * (row + 1.5)) / yRes - 1)
      );

      x -= (row % 2) * 2 - 1;
      meshCoords.push(
        w * ((2.0 * (x + 0.5 + 0.5 * hexMeshOddMultipler)) / xRes - 1),
        h * ((2.0 * (row + 0.5 - 0.0 * (col % 2))) / yRes - 1)
      );
    }

    meshCoords.push(
      w * ((2.0 * (x + 0.5)) / xRes - 1),
      h * ((2.0 * (row + 1.5)) / yRes - 1)
    );
  }
  return meshCoords;
};

// This function passes uniforms into the shader program
const setUniforms = (
  gl: WebGLRenderingContext,
  activeVariant: SimulationProgramVariant,
  settings: AttributeSettings,
  projection: Float32List,
  modelview: Float32List
) => {
  gl.uniformMatrix4fv(activeVariant.attributes.projection, false, projection);
  gl.uniformMatrix4fv(activeVariant.attributes.modelview, false, modelview);

  gl.uniform1f(activeVariant.attributes.kappa_c, settings.kappa_c);
  gl.uniform1f(activeVariant.attributes.gamma_c, settings.gamma_c);

  gl.uniform1i(activeVariant.attributes.lens_count, settings.lens_count);
  gl.uniform2fv(activeVariant.attributes.lens_pos, settings.lens_pos);
  gl.uniform1f(activeVariant.attributes.lens_mass, settings.lens_mass);
  const texture_unit = 0;
  gl.uniform1i(activeVariant.attributes.texture, texture_unit);
  gl.activeTexture(gl.TEXTURE0 + texture_unit);
  gl.uniform2f(
    activeVariant.attributes.textureScale,
    settings.textureScale[0],
    settings.textureScale[1]
  );
  gl.bindTexture(gl.TEXTURE_2D, settings.texture);
};
