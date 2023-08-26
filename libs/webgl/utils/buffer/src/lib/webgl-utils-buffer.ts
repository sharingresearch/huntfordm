export type FloatBuffer = {
  buffer: WebGLBuffer;
  itemSize: number;
  numItems: number;
};

export const createFloatBuffer = (
  gl: WebGLRenderingContext,
  data: number[],
  itemSize: number,
  flags: number
): FloatBuffer | null => {
  if (flags == null) {
    flags = gl.STATIC_DRAW;
  }
  const buffer = gl.createBuffer();
  if (!buffer) return null;

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), flags);

  return {
    buffer,
    itemSize,
    numItems: data.length / itemSize,
  };
};

export const setFloatBuffer = (
  gl: WebGLRenderingContext,
  buffer: FloatBuffer,
  data: number[],
  itemSize: number,
  flags: number
) => {
  if (flags == null) {
    flags = gl.STATIC_DRAW;
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer.buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), flags);

  buffer.itemSize = itemSize;
  buffer.numItems = data.length / itemSize;
  return buffer;
};

export type FloatTexture = {
  width: number;
  height: number;
  texture: WebGLTexture;
};
export const createFloatTexture = (
  gl: WebGLRenderingContext,
  pixels: number[] | null,
  [w, h]: [w: number, h: number]
): FloatTexture | null => {
  const texture = gl.createTexture();
  if (!texture) return null;

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
  if (pixels != null) {
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGB,
      w,
      h,
      0,
      gl.RGB,
      gl.FLOAT,
      new Float32Array(pixels)
    );
  } else {
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, w, h, 0, gl.RGB, gl.FLOAT, null);
  }
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
  return { width: w, height: h, texture };
};

export type SizedFrameBuffer = {
  width: number;
  height: number;
  fbo: WebGLFramebuffer;
};

export const createFrameBuffer = (
  gl: WebGLRenderingContext,
  texture: FloatTexture
): SizedFrameBuffer | null => {
  const fbo = gl.createFramebuffer();
  if (!fbo) return null;

  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(
    gl.FRAMEBUFFER,
    gl.COLOR_ATTACHMENT0,
    gl.TEXTURE_2D,
    texture,
    0
  );

  return {
    width: texture.width,
    height: texture.height,
    fbo,
  };
};
