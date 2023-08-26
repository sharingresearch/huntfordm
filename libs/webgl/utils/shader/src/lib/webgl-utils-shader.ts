export type ProgramShaderSource = {
  vsSource: string;
  fsSource: string;
};

export const buildShaderProgram = (
  gl: WebGLRenderingContext,
  { vsSource, fsSource }: ProgramShaderSource
): WebGLProgram | null => {
  //Promise.all(shader_names
  //            .map(id => getShader(gl, id))
  //            .forEach(shader => gl.attachShader(shaderProgram, shader)));
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  if (!vertexShader) {
    console.error("Error loading vertex shader: ", vsSource);
    return null;
  }

  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
  if (!fragmentShader) {
    console.error("Error loading fragment shader: ", fsSource);
    return null;
  }

  const shaderProgram = gl.createProgram();
  if (!shaderProgram) return null;

  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert(
      "Unable to initialise the shader program: " +
        gl.getProgramInfoLog(shaderProgram)
    );
    return null;
  }

  return shaderProgram;
};

export const loadShader = (
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null => {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(
      "An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader)
    );
    gl.deleteShader(shader);
    return null;
  }

  return shader;
};
