type Texture = {
    albedo: WebGLTexture;
    metallic?: WebGLTexture;
    normal?: WebGLTexture;
    displacement?: WebGLTexture;
    ambient_occlusion?: WebGLTexture;
    opacity?: WebGLTexture;
    reflection?: WebGLTexture;
    emissive?: WebGLTexture;
};

type GL_NEAREST = WebGLRenderingContextBase["NEAREST"];
type GL_LINEAR = WebGLRenderingContextBase["LINEAR"];
type GL_NEAREST_MIPMAP_NEAREST = WebGLRenderingContextBase["NEAREST_MIPMAP_NEAREST"];
type GL_LINEAR_MIPMAP_NEAREST = WebGLRenderingContextBase["LINEAR_MIPMAP_NEAREST"];
type GL_NEAREST_MIPMAP_LINEAR = WebGLRenderingContextBase["NEAREST_MIPMAP_LINEAR"];
type GL_LINEAR_MIPMAP_LINEAR = WebGLRenderingContextBase["LINEAR_MIPMAP_LINEAR"];
type GL_REPEAT = WebGLRenderingContextBase["REPEAT"];
type GL_CLAMP_TO_EDGE = WebGLRenderingContextBase["CLAMP_TO_EDGE"];
type GL_MIRRORED_REPEAT = WebGLRenderingContextBase["MIRRORED_REPEAT"];
type GL_NEVER = WebGLRenderingContextBase["NEVER"];
type GL_LESS = WebGLRenderingContextBase["LESS"];
type GL_EQUAL = WebGLRenderingContextBase["EQUAL"];
type GL_LEQUAL = WebGLRenderingContextBase["LEQUAL"];
type GL_GREATER = WebGLRenderingContextBase["GREATER"];
type GL_NOTEQUAL = WebGLRenderingContextBase["NOTEQUAL"];
type GL_GEQUAL = WebGLRenderingContextBase["GEQUAL"];
type GL_ALWAYS = WebGLRenderingContextBase["ALWAYS"];
type GL_NONE = WebGLRenderingContextBase["NONE"];
type GL_COMPARE_REF_TO_TEXTURE = WebGL2RenderingContextBase["COMPARE_REF_TO_TEXTURE"];

type TextureImgData = {
    albedo: string;
    metallic?: string;
    normal?: string;
    displacement?: string;
    ambient_occlusion?: string;
    opacity?: string;
    reflection?: string;
    emissive?: string;
}
type TextureParameters = {
    /** magnification filter, default value is GL_NEAREST. */
    mag_filter?: GL_NEAREST | GL_LINEAR;
    /** minification filter, default value is GL_NEAREST_MIPMAP_LINEAR. */
    min_filter?: GL_NEAREST | GL_LINEAR | GL_NEAREST_MIPMAP_NEAREST | GL_NEAREST_MIPMAP_LINEAR | GL_LINEAR_MIPMAP_NEAREST | GL_LINEAR_MIPMAP_LINEAR;
    /** wrapping function for texture coordinates s, default value is GL_REPEAT. */
    wrap_s?: GL_REPEAT | GL_CLAMP_TO_EDGE | GL_MIRRORED_REPEAT;
    /** wrapping function for texture coordinates t, default value is GL_REPEAT. */
    wrap_t?: GL_REPEAT | GL_CLAMP_TO_EDGE | GL_MIRRORED_REPEAT;
    /** texture_mipmap_level, any integer value. */
    base_level?: number;
    /** texture comparison function, default value GL_LEQUAL. */
    compare_func?: GL_NEVER | GL_LESS | GL_EQUAL | GL_LEQUAL | GL_GREATER | GL_NOTEQUAL | GL_GEQUAL | GL_ALWAYS;
    /** texture comparison mode, default value GL_NONE. */
    compare_mode?: GL_NONE | GL_COMPARE_REF_TO_TEXTURE;
    /** maximum texture mipmap array level, any integer value. */
    max_level?: number;
    /** texture maximum level-of-detail value, any float value. */
    max_lod?: number;
    /** texture minimum level-of-detail value, any float value. */
    min_lod?: number;
    /** wrapping function for texture coordinates r, default value is GL_REPEAT. */
    wrap_r?: GL_REPEAT | GL_CLAMP_TO_EDGE | GL_MIRRORED_REPEAT;
};