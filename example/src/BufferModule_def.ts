type i32 = number | number & { __valueType:undefined };
type f32 = number | number & { __valueType:undefined };
type f64 = number | number & { __valueType:undefined };
type wasm_global_i32 = { value:i32 };
type wasm_global_f32 = { value:f32 };
type wasm_global_f64 = { value:f64 };
type vec2offset = i32 & { vec2_type:undefined };
type vec3offset = i32 & { vec3_type:undefined };
type vec4offset = i32 & { vec4_type:undefined };
type mat3offset = i32 & { mat3_type:undefined };
type mat4offset = i32 & { mat4_type:undefined };
type quatoffset = i32 & { quat_type:undefined };
type BufferModule = WebAssembly.Exports & {
    free_blocks_list_length: wasm_global_i32;
    memory_size: wasm_global_i32;
    memory_last_i32_offset: wasm_global_i32;
    free_blocks_list_offset: wasm_global_i32;
    max_block_size: wasm_global_i32;
    f32_eq_tolerance: wasm_global_f32;

    SIZEOF_I32: { value:4 };
    SIZEOF_F32: { value:4 };
    SIZEOF_F64: { value:8 };
    SIZEOF_VEC2: { value:8 };
    SIZEOF_VEC3: { value:12 };
    SIZEOF_VEC4: { value:16 };
    SIZEOF_MAT3: { value:36 };
    SIZEOF_MAT4: { value:64 };
    SIZEOF_QUAT: { value:16 };

    i32_log(from:i32): void;
    f32_log(from:i32): void;
    f64_log(from:i32): void;
    vec2_log(from:i32): void;
    vec3_log(from:i32): void;
    vec4_log(from:i32): void;
    mat3_log(from:i32): void;
    mat4_log(from:i32): void;
    quat_log(from:i32): void;

    /** resets the internal free blocks array. */
    reset_memory();

    /** tries to allocate an ```n_bytes``` block in memory, then returns its memory offset.
     * 
     * returns ```-1``` on fail.
     */
    malloc(n_bytes:i32): i32;
    /** calls internally ```malloc(4)```. 
     *
     * ```new_i32(x)``` is a better alternative. 
     */
    malloc_i32(): i32;
    /** calls internally ```malloc(4)```. 
     * 
     * ```new_f32(x)``` is a better alternative.
     */
    malloc_f32(): i32;
    /** calls internally ```malloc(8)```.
     * 
     * ```new_f64(x)``` is a better alternative.
     */
    malloc_f64(): i32;
    /** calls internally ```malloc(8)```.
     * 
     * ```new_vec2(x,y)``` is a better alternative. 
     */
    malloc_vec2(): vec2offset;
    /** calls internally ```malloc(12)```.
     * 
     * ```new_vec3(x,y,z)``` is a better alternative. 
     */
    malloc_vec3(): vec3offset;
    /** calls internally ```malloc(16)```.
     * 
     * ```new_vec4(x,y,z,w)``` is a better alternative. 
     */
    malloc_vec4(): vec4offset;
    /** calls internally ```malloc(36)```.*/
    malloc_mat3(): mat3offset;
    /** calls internally ```malloc(64)```. */
    malloc_mat4(): mat4offset;
    /** calls internally ```malloc(16)```. */
    malloc_quat(): quatoffset;

    /** calls internally ```malloc(4)``` and on success initializes its value. */
    new_i32(value:i32): i32;
    /** calls internally ```malloc(4)``` and on success initializes its value. */
    new_f32(value:f32): i32;
    /** calls internally ```malloc(8)``` and on success initializes its value. */
    new_f64(value:f64): i32;
    /** calls internally ```malloc(8)``` and on success initializes its values. */
    new_vec2(x:f32,y:f32): vec2offset;
    /** calls internally ```malloc(12)``` and on success initializes its values. */
    new_vec3(x:f32,y:f32,z:f32): vec3offset;
    /** calls internally ```malloc(16)``` and on success initializes its values. */
    new_vec4(x:f32,y:f32,z:f32,w:f32): vec4offset;
    /** calls internally ```malloc(36)``` and on success initializes its values. */
    new_mat3(m00:f32,m10:f32,m20:f32,m01:f32,m11:f32,m21:f32,m02:f32,m12:f32,m22:f32): mat3offset;
    /** calls internally ```malloc(64)``` and on success initializes its values. */
    new_mat4(m00:f32,m10:f32,m20:f32,m30:f32,m01:f32,m11:f32,m21:f32,m31:f32,m02:f32,m12:f32,m22:f32,m32:f32,m03:f32,m13:f32,m23:f32,m33:f32): mat4offset;
    /** calls internally ```malloc(12)``` and on success initializes its values. */
    new_quat(x:f32,y:f32,z:f32,w:f32): quatoffset;

    /** throws an error on invalid ```offset-size``` combinations. */
    free(offset:i32,size:i32): asserts offset is number;
    /** calls internally ```free(offset,4)```. */
    free_i32(offset:i32): asserts offset is number;
    /** calls internally ```free(offset,4)```. */
    free_f32(offset:i32): asserts offset is number;
    /** calls internally ```free(offset,8)```. */
    free_f64(offset:i32): asserts offset is number;
    /* @ts-ignore */
    /** calls internally ```free(offset,8)```. */free_vec2(offset:vec2offset): asserts offset is number;
    /* @ts-ignore */
    /** calls internally ```free(offset,12)```. */free_vec3(offset:vec3offset): asserts offset is number;
    /* @ts-ignore */
    /** calls internally ```free(offset,16)```. */free_vec4(offset:vec4offset): asserts offset is number;
    /* @ts-ignore */
    /** calls internally ```free(offset,36)```. */free_mat3(offset:mat3offset): asserts offset is number;
    /* @ts-ignore */
    /** calls internally ```free(offset,64)```. */free_mat4(offset:mat4offset): asserts offset is number;
    /* @ts-ignore */
    /** calls internally ```free(offset,12)```. */free_quat(offset:quatoffset): asserts offset is number;

    /** returns the x component. */
    get_x<T extends vec2offset|vec3offset|vec4offset|quatoffset>(from:T): f32;
    /** returns the y component. */
    get_y<T extends vec2offset|vec3offset|vec4offset|quatoffset>(from:T): f32;
    /** returns the z component. */
    get_z<T extends vec3offset|vec4offset|quatoffset>(from:T): f32;
    /** returns the w component. */
    get_w<T extends vec4offset|quatoffset>(from:T): f32;

    i32_get(from:i32): i32;
    /** clones the value stored in ```from``` into ```dest```. */
    i32_set(dest:i32,from:i32): void;
    i32_seti(dest:i32,value:i32): void;
    /** increment ```dest``` by the value in ```from``` then return the updated value. */
    i32_incr(dest:i32,from:i32): i32;
    /** increment ```dest``` by the specified immediate amount then return the updated value. */
    i32_incri(dest:i32,increment:i32): i32;

    f32_get(from:i32): f32;
    /** clones the value stored in ```from``` into ```dest```. */
    f32_set(dest:i32,from:i32): void;
    f32_seti(dest:i32,value:f32): void;
    /** increment ```dest``` by the value in ```from``` then return the updated value. */
    f32_incr(dest:i32,from:i32): f32;
    /** increment ```dest``` by the specified immediate amount then return the updated value. */
    f32_incri(dest:i32,increment:f32): f32;

    f64_get(from:i32): f64;
    /** clones the value stored in ```from``` into ```dest```. */
    f64_set(dest:i32,from:i32): void;
    f64_seti(dest:i32,value:f64): void;
    /** increment ```dest``` by the value in ```from``` then return the updated value. */
    f64_incr(dest:i32,from:i32): f64;
    /** increment ```dest``` by the specified immediate amount then return the updated value. */
    f64_incri(dest:i32,increment:f64): f64;

    /** clones the values stored in ```from``` into ```dest```. */
    vec2_set(dest:vec2offset,from:vec2offset): void;
    vec2_seti(dest:vec2offset,x:f32,y:f32): void;
    vec2_get(from:vec2offset): [f32,f32];
    vec2_zero(dest:vec2offset): void;
    vec2_one(dest:vec2offset): void;
    vec2_left(dest:vec2offset): void;
    vec2_right(dest:vec2offset): void;
    vec2_down(dest:vec2offset): void;
    vec2_up(dest:vec2offset): void;

    /** clones the values stored in ```from``` into ```dest```. */
    vec3_set(dest:vec3offset,from:vec3offset): void;
    vec3_seti(dest:vec3offset,x:f32,y:f32,z:f32): void;
    vec3_get(from:vec3offset): [f32,f32,f32];
    vec3_zero(dest:vec3offset): void;
    vec3_one(dest:vec3offset): void;
    vec3_left(dest:vec3offset): void;
    vec3_right(dest:vec3offset): void;
    vec3_down(dest:vec3offset): void;
    vec3_up(dest:vec3offset): void;
    vec3_back(dest:vec3offset): void;
    vec3_forward(dest:vec3offset): void;

    /** clones the values stored in ```from``` into ```dest```. */
    vec4_set<T extends quatoffset|vec4offset>(dest:T,from:T): void;
    vec4_seti<T extends quatoffset|vec4offset>(dest:T,x:f32,y:f32,z:f32,w:f32): void;
    vec4_get<T extends quatoffset|vec4offset>(from:T): [x:f32,y:f32,z:f32,w:f32];

    /** clones the values stored in ```from``` into ```dest```. */
    mat3_set(dest:mat3offset,from:mat3offset): void;
    mat3_seti(dest:mat3offset,m00:f32,m10:f32,m20:f32,m01:f32,m11:f32,m21:f32,m02:f32,m12:f32,m22:f32): void;
    mat3_get(from:mat3offset): [f32,f32,f32,f32,f32,f32,f32,f32,f32];
    mat3_identity(dest:mat3offset): void;
    mat3_zero(dest:mat3offset): void;

    /** clones the values stored in ```from``` into ```dest```. */
    mat4_set(dest:mat4offset,from:mat4offset): void;
    mat4_seti(dest:mat4offset,m00:f32,m10:f32,m20:f32,m30:f32,m01:f32,m11:f32,m21:f32,m31:f32,m02:f32,m12:f32,m22:f32,m32:f32,m03:f32,m13:f32,m23:f32,m33:f32): void;
    mat4_get(from:mat4offset): [f32,f32,f32,f32,f32,f32,f32,f32,f32,f32,f32,f32,f32,f32,f32,f32];
    mat4_identity(dest:mat4offset): void;
    mat4_zero(dest:mat4offset): void;

    vec2_add(dest:vec2offset,from_a:vec2offset,from_b:vec2offset): void;
    vec3_add(dest:vec3offset,from_a:vec3offset,from_b:vec3offset): void;
    vec4_add<T extends quatoffset|vec4offset>(dest:T,from_a:T,from_b:T): void;
    vec2_sub(dest:vec2offset,from_a:vec2offset,from_b:vec2offset): void;
    vec3_sub(dest:vec3offset,from_a:vec3offset,from_b:vec3offset): void;
    vec4_sub<T extends quatoffset|vec4offset>(dest:T,from_a:T,from_b:T): void;
    vec2_mul(dest:vec2offset,from:vec2offset,scalar:i32): void;
    vec3_mul(dest:vec3offset,from:vec3offset,scalar:i32): void;
    vec4_mul<T extends quatoffset|vec4offset>(dest:T,from:T,scalar:i32): void;
    vec2_muli(dest:vec2offset,from:vec2offset,scalar:f32): void;
    vec3_muli(dest:vec3offset,from:vec3offset,scalar:f32): void;
    vec4_muli<T extends quatoffset|vec4offset>(dest:T,from:T,scalar:f32): void;
    vec2_div(dest:vec2offset,from:vec2offset,scalar:i32): void;
    vec3_div(dest:vec3offset,from:vec3offset,scalar:i32): void;
    vec4_div<T extends quatoffset|vec4offset>(dest:T,from:T,scalar:i32): void;
    vec2_divi(dest:vec2offset,from:vec2offset,scalar:f32): void;
    vec3_divi(dest:vec3offset,from:vec3offset,scalar:f32): void;
    vec4_divi<T extends quatoffset|vec4offset>(dest:T,from:T,scalar:f32): void;
    vec2_dot(from_a:vec2offset,from_b:vec2offset): f32;
    vec3_dot(from_a:vec3offset,from_b:vec3offset): f32;
    vec4_dot<T extends quatoffset|vec4offset>(from_a:T,from_b:T): f32;
    vec2_dot_st(dest:i32,from_a:vec2offset,from_b:vec2offset): void;
    vec3_dot_st(dest:i32,from_a:vec3offset,from_b:vec3offset): void;
    vec4_dot_st<T extends quatoffset|vec4offset>(dest:i32,from_a:T,from_b:T): void;
    vec2_eq(from_a:vec2offset,from_b:vec2offset): i32;
    vec3_eq(from_a:vec3offset,from_b:vec3offset): i32;
    vec4_eq<T extends quatoffset|vec4offset>(from_a:T,from_b:T): i32;
    vec2_eq_st(dest:i32,from_a:vec2offset,from_b:vec2offset): void;
    vec3_eq_st(dest:i32,from_a:vec3offset,from_b:vec3offset): void;
    vec4_eq_st<T extends quatoffset|vec4offset>(dest:i32,from_a:T,from_b:T): void;
    vec2_eqz(from:vec2offset): i32;
    vec3_eqz(from:vec3offset): i32;
    vec4_eqz<T extends quatoffset|vec4offset>(from:T): i32;
    vec2_eqz_st(dest:i32,from:vec2offset): void;
    vec3_eqz_st(dest:i32,from:vec3offset): void;
    vec4_eqz_st<T extends quatoffset|vec4offset>(dest:i32,from:T): void;
    vec2_mag(from:vec2offset): f32;
    vec3_mag(from:vec3offset): f32;
    vec4_mag<T extends quatoffset|vec4offset>(from:T): f32;
    vec2_mag_st(dest:i32,from:vec2offset): void;
    vec3_mag_st(dest:i32,from:vec3offset): void;
    vec4_mag_st<T extends quatoffset|vec4offset>(dest:i32,from:T): void;
    vec2_mag_sqr(from:vec2offset): f32;
    vec3_mag_sqr(from:vec3offset): f32;
    vec4_mag_sqr<T extends quatoffset|vec4offset>(from:T): f32;
    vec2_mag_sqr_st(dest:i32,from:vec2offset): void;
    vec3_mag_sqr_st(dest:i32,from:vec3offset): void;
    vec4_mag_sqr_st<T extends quatoffset|vec4offset>(dest:i32,from:T): void;
    vec2_norm(dest:vec2offset,from:vec2offset): void;
    vec3_norm(dest:vec3offset,from:vec3offset): void;
    vec4_norm<T extends quatoffset|vec4offset>(dest:T,from:T): void;
    vec4_norm_ds<T extends quatoffset|vec4offset>(dest:T): void;
    vec2_dist(from_a:vec2offset,from_b:vec2offset): f32;
    vec3_dist(from_a:vec3offset,from_b:vec3offset): f32;
    vec4_dist(from_a:vec4offset,from_b:vec4offset): f32;
    vec2_dist_st(dest:i32,from_a:vec2offset,from_b:vec2offset): void;
    vec3_dist_st(dest:i32,from_a:vec3offset,from_b:vec3offset): void;
    vec4_dist_st(dest:i32,from_a:vec4offset,from_b:vec4offset): void;
    vec2_angle(from_a:vec2offset,from_b:vec2offset): f32;
    vec3_angle(from_a:vec3offset,from_b:vec3offset): f32;
    vec4_angle(from_a:vec4offset,from_b:vec4offset): f32;
    vec2_angle_st(dest:i32,from_a:vec2offset,from_b:vec2offset): void;
    vec3_angle_st(dest:i32,from_a:vec3offset,from_b:vec3offset): void;
    vec4_angle_st(dest:i32,from_a:vec4offset,from_b:vec4offset): void;
    vec3_cross(dest:i32,from_a:vec3offset,from_b:vec3offset): void;
    vec2_lerp(dest:vec2offset,from_a:vec2offset,from_b:vec2offset,t:f32): void;
    vec3_lerp(dest:vec3offset,from_a:vec3offset,from_b:vec3offset,t:f32): void;
    vec4_lerp<T extends quatoffset|vec4offset>(dest:T,from_a:T,from_b:T,t:f32): void;

    mat3_det(from:mat3offset): f32;
    mat4_det(from:mat4offset): f32;
    mat3_det_st(dest:i32,from:mat3offset): void;
    mat4_det_st(dest:i32,from:mat4offset): void;
    mat3_transp_ds(dest:mat3offset): void;
    mat4_transp_ds(dest:mat4offset): void;
    /** if ```dest``` coincides with ```from``` use ```mat3_transp_ds()``` otherwise you will have a wrong result. */
    mat3_transp(dest:mat3offset,from:mat3offset): void;
    /** if ```dest``` coincides with ```from``` use ```mat4_transp_ds()``` otherwise you will have a wrong result. */
    mat4_transp(dest:mat4offset,from:mat4offset): void;
    mat3_is_zero(from:mat3offset): i32;
    mat4_is_zero(from:mat4offset): i32;
    mat3_is_zero_st(dest:i32,from:mat3offset): void;
    mat4_is_zero_st(dest:i32,from:mat4offset): void;
    mat3_is_identity(from:mat3offset): i32;
    mat4_is_identity(from:mat4offset): i32;
    mat3_is_identity_st(dest:i32,from:mat3offset): void;
    mat4_is_identity_st(dest:i32,from:mat4offset): void;
    mat3_inv(dest:mat3offset,from:mat3offset): void;
    mat4_inv(dest:mat4offset,from:mat4offset): void;
    /** assumed determinant equal to 1. */
    mat3_inv_rot(dest:mat3offset,from:mat3offset): void;
    /** assumed determinant equal to 1. */
    mat4_inv_rot(dest:mat4offset,from:mat4offset): void;
    /** assumed upper left 2x2 matrix to be invertible. uses the block decomposition method. */
    mat4_inv_bd(dest:mat4offset,from:mat4offset): void;
    mat3_prod(dest:mat3offset,from_a:mat3offset,from_b:mat3offset): void;
    mat4_prod(dest:mat4offset,from_a:mat4offset,from_b:mat4offset): void;
    mat3_mul_vec(dest:vec3offset,mat:mat3offset,vec3:vec3offset): void;
    mat4_mul_vec(dest:vec4offset,mat:mat4offset,vec4:vec4offset): void;
    
    /** sets the internal perspective camera parameters, but you still need to use ```view_perspective()```. */
    set_perspective_camera(pos_x:f64,pos_y:f64,pos_z:f64,target_x:f64,target_y:f64,target_z:f64,up_x:f64,up_y:f64,up_z:f64,fovy:f64,aspect_ratio:f64,near_plane:f64,far_plane:f64): void;
    /** sets the internal perspective camera parameters, but you still need to use ```view_orthographic()```. */
    set_orthographic_camera(pos_x:f64,pos_y:f64,pos_z:f64,target_x:f64,target_y:f64,target_z:f64,up_x:f64,up_y:f64,up_z:f64,left_plane:f64,right_plane:f64,bottom_plane:f64,top_plane:f64,near_plane:f64,far_plane:f64): void;

    set_camera_position(from:vec3offset): void;
    set_camera_positioni(pos_x:f64,pos_y:f64,pos_z:f64): void;
    get_camera_position(): [pos_x:f64,pos_y:f64,pos_z:f64];

    set_camera_target(from:vec3offset): void;
    set_camera_targeti(target_x:f64,target_y:f64,target_z:f64): void;
    get_camera_target(): [target_x:f64,target_y:f64,target_z:f64];

    set_camera_up_dir(from:vec3offset): void;
    set_camera_up_diri(up_x:f64,up_y:f64,up_z:f64): void;
    get_camera_up_dir(): [up_x:f64,up_y:f64,up_z:f64];

    set_fovy(fovy:f64): void;
    get_fovy(): f64;
    set_fovx(fovx:f64): void;
    get_fovx(): f64;

    set_aspect_ratio(aspect_ratio:f64): void;
    get_aspect_ratio(): f64;
    
    set_left_plane(left_plane:f64): void;
    get_left_plane(): f64;
    set_right_plane(right_plane:f64): void;
    get_right_plane(): f64;
    set_bottom_plane(bottom_plane:f64): void;
    get_bottom_plane(): f64;
    set_top_plane(top_plane:f64): void;
    get_top_plane(): f64;

    set_near_plane(near_plane:f64): void;
    get_near_plane(): f64;
    set_far_plane(far_plane:f64): void;
    get_far_plane(): f64;

    /** internally updates the aspect ratio. note that you still have to manually call WebGLRenderingContext:viewport(). */
    set_viewport(x:f64,y:f64,width:f64,height:f64): void;

    /** the view matrix converts world position to camera position.
     * 
     * influenced by camera (position, target, up direction). */
    view_matrix(dest:mat4offset): void;
    /** the viewport matrix converts clip-space position to screen-space position.
     * 
     * influeced by viewport (x, y, width, height). */
    viewport_matrix(dest:mat4offset): void;
    /** the perspective matrix converts camera position to clip-space position.
     * 
     * influenced by fovy, aspect ratio, near plane and far plane. */
    perspective_matrix(dest:mat4offset): void;
    /** the orthographic matrix converts camera position to clip-space position.
     * 
     * influenced by (left, right, bottom, top, near, far) planes. */
    orthographic_matrix(dest:mat4offset): void;

    /** the view-perspective matrix converts world position to clip-space position. 
     * 
     * influenced by camera (position, target, up direction), fovy, aspect ratio, near plane and far plane. */
    view_perspective(dest:mat4offset): void;
    /** the view-orthographic matrix converts world position to clip-space position. 
     * 
     * influenced by camera (position, target, up direction) and (left, right, bottom, top, near, far) planes. */
    view_orthographic(dest:mat4offset): void;

    /** constructs a 3x3 rotation matrix from a given XYZ-order rotation (in radians). */
    mat3_from_XYZi(dest:mat3offset,angle_x:f64,angle_y:f64,angle_z:f64) : void;
    /** constructs a 3x3 rotation matrix from a given X-axis rotation (in radians). */
    mat3_from_Xi(dest:mat3offset,angle_x:f64) : void;
    /** constructs a 3x3 rotation matrix from a given Y-axis rotation (in radians). */
    mat3_from_Yi(dest:mat3offset,angle_y:f64) : void;
    /** constructs a 3x3 rotation matrix from a given Z-axis rotation (in radians). */
    mat3_from_Zi(dest:mat3offset,angle_z:f64) : void;
    /** constructs a 3x3 rotation matrix from a given XY-order rotation (in radians). */
    mat3_from_XYi(dest:mat3offset,angle_x:f64,angle_y:f64) : void;
    /** constructs a 3x3 rotation matrix from a given XZ-order rotation (in radians). */
    mat3_from_XZi(dest:mat3offset,angle_x:f64,angle_z:f64) : void;
    /** constructs a 3x3 rotation matrix from a given YZ-order rotation (in radians). */
    mat3_from_YZi(dest:mat3offset,angle_y:f64,angle_z:f64) : void;
    
    /** constructs a transform matrix from a given XYZ scale, XYZ-order rotation (in radians) and traslation. */
    transform_SXYZTi(dest:mat4offset,scale_x:f64,scale_y:f64,scale_z:f64,angle_x:f64,angle_y:f64,angle_z:f64,transform_x:f32,transform_y:f32,transform_z:f32): void;
    /** constructs a transform matrix from a given XYZ-order rotation (in radians) and traslation. */
    transform_XYZTi(dest:mat4offset,angle_x:f64,angle_y:f64,angle_z:f64,transform_x:f32,transform_y:f32,transform_z:f32): void;
    /** constructs a transform matrix from a given XYZ scale, X-axis rotation (in radians) and translation. */
    transform_SXTi(dest:mat4offset,scale_x:f64,scale_y:f64,scale_z:f64,angle_x:f64,transform_x:f32,transform_y:f32,transform_z:f32): void;
    /** constructs a transform matrix from a given X-axis rotation (in radians) and translation. */
    transform_XTi(dest:mat4offset,angle_x:f64,transform_x:f32,transform_y:f32,transform_z:f32): void;
    /** constructs a transform matrix from a given XYZ scale, Y-axis rotation (in radians) and translation. */
    transform_SYTi(dest:mat4offset,scale_x:f64,scale_y:f64,scale_z:f64,angle_y:f64,transform_x:f32,transform_y:f32,transform_z:f32): void;    
    /** constructs a transform matrix from a given Y-axis rotation (in radians) and translation. */
    transform_YTi(dest:mat4offset,angle_y:f64,transform_x:f32,transform_y:f32,transform_z:f32): void;
    /** constructs a transform matrix from a given XYZ scale, Z-axis rotation (in radians) and translation. */
    transform_SZTi(dest:mat4offset,scale_x:f64,scale_y:f64,scale_z:f64,angle_z:f64,transform_x:f32,transform_y:f32,transform_z:f32): void;
    /** constructs a transform matrix from a given Z-axis rotation (in radians) and translation. */
    transform_ZTi(dest:mat4offset,angle_z:f64,transform_x:f32,transform_y:f32,transform_z:f32): void;
    /** constructs a transform matrix from a given XYZ scale, XY-order rotation (in radians) and translation. */
    transform_SXYTi(dest:mat4offset,scale_x:f64,scale_y:f64,scale_z:f64,angle_x:f64,angle_y:f64,transform_x:f32,transform_y:f32,transform_z:f32): void;
    /** constructs a transform matrix from a given XY-order rotation (in radians) and translation. */
    transform_XYTi(dest:mat4offset,angle_x:f64,angle_y:f64,transform_x:f32,transform_y:f32,transform_z:f32): void;
    /** constructs a transform matrix from a given XYZ scale, XZ-order rotation (in radians) and translation. */
    transform_SXZTi(dest:mat4offset,scale_x:f64,scale_y:f64,scale_z:f64,angle_x:f64,angle_z:f64,transform_x:f32,transform_y:f32,transform_z:f32): void;
    /** constructs a transform matrix from a given XZ-order rotation (in radians) and translation. */
    transform_XZTi(dest:mat4offset,angle_x:f64,angle_z:f64,transform_x:f32,transform_y:f32,transform_z:f32): void;
    /** constructs a transform matrix from a given XYZ scale, YZ-order rotation (in radians) and translation. */
    transform_SYZTi(dest:mat4offset,scale_x:f64,scale_y:f64,scale_z:f64,angle_y:f64,angle_z:f64,transform_x:f32,transform_y:f32,transform_z:f32): void;
    /** constructs a transform matrix from a given YZ-order rotation (in radians) and translation. */
    transform_YZTi(dest:mat4offset,angle_y:f64,angle_z:f64,transform_x:f32,transform_y:f32,transform_z:f32): void;
    /** constructs a transform matrix from a given XYZ scale, 3x3 rotation matrix and translation. */
    transform_SMTi(dest:mat4offset,scale_x:f64,scale_y:f64,scale_z:f64,rotation_matrix:mat3offset,transform_x:f32,transform_y:f32,transform_z:f32): void;
    /** constructs a transform matrix from a given 3x3 rotation matrix and translation. */
    transform_MTi(dest:mat4offset,rotation_matrix:mat3offset,transform_x:f32,transform_y:f32,transform_z:f32): void;
    /** constructs a transform matrix from a given XYZ scale, quaternion and translation. */
    transform_SQTi(dest:mat4offset,scale_x:f32,scale_y:f32,scale_z:f32,quaternion:quatoffset,transform_x:f32,transform_y:f32,transform_z:f32): void;
    /** constructs a transform matrix from a given quaternion and translation. */
    transform_QTi(dest:mat4offset,quaternion:quatoffset,transform_x:f32,transform_y:f32,transform_z:f32): void;
    /** updates the translation encoded in the transform matrix. */
    transform_set_T(dest:mat4offset,from:vec3offset): void;
    /** updates the translation encoded in the transform matrix. */
    transform_set_Ti(dest:mat4offset,transform_x:f32,transform_y:f32,transform_z:f32): void;

    /** construct a normal matrix from a given transform matrix that only encodes rotation and translation.  */
    normal_from_transform_RT(dest:mat3offset,transform_matrix_RT:mat4offset): void;
    /** construct a normal matrix from a given transform matrix that encodes scaling, rotation and translation. */
    normal_from_transform_SRTi(dest:mat3offset,transform_matrix_SRT:mat4offset,scale_x:f32,scale_y:f32,scale_z:f32): void;
    /** construct a normal matrix from a given rotation matrix. */
    normal_from_rotation(dest:mat3offset,rotation_matrix:mat3offset): void;

    //transform_USXYZT(dest:mat4offset,uniform_scale:f64,angle_x:f64,angle_y:f64,angle_z:f64,transform_x:f32,transform_y:f32,transform_z:f32): void;
    //transform_USXT(dest:mat4offset,uniform_scale:f64,angle_x:f64,transform_x:f32,transform_y:f32,transform_z:f32): void;
    //transform_USYT(dest:mat4offset,uniform_scale:f64,angle_y:f64,transform_x:f32,transform_y:f32,transform_z:f32): void;   
    //transform_USZT(dest:mat4offset,uniform_scale:f64,angle_z:f64,transform_x:f32,transform_y:f32,transform_z:f32): void;
    //transform_USXYT(dest:mat4offset,uniform_scale:f64,angle_x:f64,angle_y:f64,transform_x:f32,transform_y:f32,transform_z:f32): void;
    //transform_USXZT(dest:mat4offset,uniform_scale:f64,angle_x:f64,angle_z:f64,transform_x:f32,transform_y:f32,transform_z:f32): void;
    //transform_USYZT(dest:mat4offset,uniform_scale:f64,angle_y:f64,angle_z:f64,transform_x:f32,transform_y:f32,transform_z:f32): void;

    /** costructs a quaternion from a given XYZ-order rotation (in radians). */
    quat_from_XYZi(dest:quatoffset,angle_x:f64,angle_y:f64,angle_z:f64): void;
    /** costructs a quaternion from a given X-axis rotation (in radians). */
    quat_from_Xi(dest:quatoffset,angle_x:f64): void;
    /** costructs a quaternion from a given Y-axis rotation (in radians). */
    quat_from_Yi(dest:quatoffset,angle_y:f64): void;
    /** costructs a quaternion from a given Z-axis rotation (in radians). */
    quat_from_Zi(dest:quatoffset,angle_z:f64): void;
    /** costructs a quaternion from a given XY-order rotation (in radians). */
    quat_from_XYi(dest:quatoffset,angle_x:f64,angle_y:f64): void;
    /** costructs a quaternion from a given XZ-order rotation (in radians). */
    quat_from_XZi(dest:quatoffset,angle_x:f64,angle_z:f64): void;
    /** costructs a quaternion from a given YZ-order rotation (in radians). */
    quat_from_YZi(dest:quatoffset,angle_y:f64,angle_z:f64): void;
    /** precision loss with consecutive products without normalization:
     * - 1e-6: ~34
     * - 1e-5: ~1053
     * - 1e-4: ~10825
     * - 1e-3: ~108824
     * - 1e-2: ~1082584
     * - 1e-1: ~10359640
     * - 12e-1: ~19812447
     */
    quat_prod(dest:quatoffset,from_a:quatoffset,from_b:quatoffset): void;
    
    /** assumed unit quaternions. */
    quat_angle(from_a:quatoffset,from_b:quatoffset): f32;
    /** assumed unit quaternions. */
    quat_angle_st(dest:i32,from_a:quatoffset,from_b:quatoffset): void;
    /** assumed unit quaternions. */
    quat_inv(dest:quatoffset,from:quatoffset): void;
    /** assumed unit quaternions. */
    quat_inv_ds(dest:quatoffset): void;
    /** unclamped spherical linear interpolation between two quaternions. 
     * 
     * consider that interpolation between two quaternions that are either equal or opposite will cause unwanted behaviour. */
    quat_slerp(dest:quatoffset,from_a:quatoffset,from_b:quatoffset,t:f64): void;

    mat3_from_quat(dest:mat3offset,from:quatoffset): void;
    mat4_from_quat(dest:mat4offset,from:quatoffset): void;
    /** assigns the top left 3x3 matrix of the specified 4x4 matrix into ```dest```. */
    mat3_from_mat4(dest:mat3offset,from:mat4offset): void;
    /** extends the 3x3 matrix to a 4x4 matrix (last row/column is set to ```[0,0,0,1]```). */
    mat4_from_mat3(dest:mat4offset,from:mat3offset): void;
    /** assumed valid 3x3 rotation matrix. */
    quat_from_mat3(dest:quatoffset,from:mat3offset): void;
    /** assumed valid 4x4 rotation matrix. */
    quat_from_mat4(dest:quatoffset,from:mat4offset): void;
    /** converts the vec3 to homogeneous coordinates. */
    vec4_from_vec3(dest:vec4offset,from:vec3offset): void;

    set_simple_seed(seed:i32): void;
    /** returns a seeded pseudorandom number between 0 and 1.
     * 
     * the seed can be set with ```set_simple_seed()```.
     */
    simple_random(): f64;
};

type BufferImports = {
    Math: {
        acos(x:number): number;
        tan(x:number): number;
        atan(x:number): number;
        sin(x:number): number;
        cos(x:number): number;
    };
    Wasm: {
        throw_64char_error_from_i32x16(a:number,b:number,c:number,d:number,e:number,f:number,g:number,h:number,i:number,j:number,k:number,l:number,m:number,n:number,o:number,p:number): void;
        log_number(x:number): void;
        log_vec2(x:number,y:number): void;
        log_vec3(x:number,y:number,z:number): void;
        log_vec4(x:number,y:number,z:number,w:number): void;
        log_mat3(a:number,b:number,c:number,d:number,e:number,f:number,g:number,h:number,i:number): void;
        log_mat4(a:number,b:number,c:number,d:number,e:number,f:number,g:number,h:number,i:number,j:number,k:number,l:number,m:number,n:number,o:number,p:number): void;
        log_quat(x:number,y:number,z:number,w:number): void;
    };
    env: {
        memory: WebAssembly.Memory;
        page_count: number;
    };
    Date: {
        now(): number;
    };
};

const BufferModule_base64 = 
    "AGFzbQEAAAABxARCYAF/AGACf38AYAN/f38AYAF/AX1gAn9/AX1gAXwAYAF/AX9gAAF8YAJ/fwF/YAABf2ACf3wAYAN/f30AYAN/fHwAYAF8AXxgBH9/f30AYAJ/fQBgBH99fX0AYAN8fHwAYAADfHx8YAh/fHx8fH19fQBgBX98fX19AGAJf3x8fHx8fX19AGAGf3x8fX19AGAFf399fX0AYAF9AX1gBH19fX0AYAAAYAR9fX19AX9gBH98fHwAYAh/fX19f319fQBgCH9/f39/f39/AGAQf39/f39/f39/f39/f39/fwBgAX0AYAJ9fQBgA319fQBgCX19fX19fX19fQBgEH19fX19fX19fX19fX19fX0AYAF9AX9gAXwBf2ACfX0Bf2ADfX19AX9gCX19fX19fX19fQF/YBB9fX19fX19fX19fX19fX19AX9gAn99AX1gAX8BfGACf38BfGACf3wBfGADf319AGABfwJ9fWABfwN9fX1gBX99fX19AGABfwR9fX19YAp/fX19fX19fX19AGABfwl9fX19fX19fX1gEX99fX19fX19fX19fX19fX19AGABfxB9fX19fX19fX19fX19fX19YA18fHx8fHx8fHx8fHx8AGAPfHx8fHx8fHx8fHx8fHx8AGAEfHx8fABgCn98fHx8fHx9fX0AYAd/fHx8fX19AGAKf39/f39/f39/fwBgHH9/f39/f39/f39/f39/f39/f39/f39/f39/f38AYAV9fX19fwF/YAV/fHx/fwBgBH98f38AAqwCEwRNYXRoBGFjb3MAGARNYXRoA3RhbgANBE1hdGgEYXRhbgANBE1hdGgDY29zAA0ETWF0aANzaW4ADQRNYXRoA3NpbgAYBFdhc20edGhyb3dfNjRjaGFyX2Vycm9yX2Zyb21faTMyeDE2AB8EV2FzbQpsb2dfbnVtYmVyAAAEV2FzbQpsb2dfbnVtYmVyACAEV2FzbQpsb2dfbnVtYmVyAAUEV2FzbQhsb2dfdmVjMgAhBFdhc20IbG9nX3ZlYzMAIgRXYXNtCGxvZ192ZWM0ABkEV2FzbQhsb2dfbWF0MwAjBFdhc20IbG9nX21hdDQAJARXYXNtCGxvZ19xdWF0ABkERGF0ZQNub3cACQNlbnYKcGFnZV9jb3VudAN/AANlbnYGbWVtb3J5AgABA5QCkgIAAAAAAAAAAAAaGgYJCQkJCQkGJSYnKBspKhsBAAAAAAAAAwMDAwYBAQgIAQ8EKywBCi0uAS8wAAAAAAAAARAxAAAAAAAAAAABMjMBNDUAAAE2NwAAAgICAgICAgICCwsLAgICCwsLBAQEAgIICAgCAgIGBgYBAQEDAwMBAQEDAwMBAQEBAQEABAQEAgICBAQEAgICAg4ODgMDAQEAAAEBBgYBAQYGAQEICAEBCAICAgI4OQAREgAREgAREgUHBQcFBwUHBQcFBwUHBQcFBzoAAAAAAAAcCgoKDAwMOzwTFBMUExQVFhUWFRYdFx0XARABFwEcCgoKDAwMAgQCAQAOAQEBAQEBAAcPPQ8+Px5AQR4QBtECJX8BQQALfwBBBAt/AEEEC38AQQgLfwBBCAt/AEEMC38AQRALfwBBJAt/AEHAAAt/AEEQC38BQQELfwFBAAt/AUEAC38BQQALfwFBAAt9AUOVv9YzC3wBRAAAAAAAAPA/C3wBRAAAAAAAAPA/C3wBRAAAAAAAAPA/C3wBRAAAAAAAAAAAC3wBRAAAAAAAAAAAC3wBRAAAAAAAAAAAC3wBRAAAAAAAAAAAC3wBRAAAAAAAAPA/C3wBRAAAAAAAAAAAC3wBRGVzLThSwfA/C3wBRBzHcRzHcfw/C3wBRAAAAAAAAAAAC3wBRAAAAAAAAAAAC3wBRAAAAAAAAAAAC3wBRAAAAAAAAAAAC3wBRJqZmZmZmbk/C3wBRAAAAAAAAFlAC3wBRAAAAAAAAAAAC3wBRAAAAAAAAAAAC3wBRAAAAAAAWIVAC3wBRFK4HoXrAnhACwfbIJ4CClNJWkVPRl9JMzIDAgpTSVpFT0ZfRjMyAwMKU0laRU9GX0Y2NAMEC1NJWkVPRl9WRUMyAwULU0laRU9GX1ZFQzMDBgtTSVpFT0ZfVkVDNAMHC1NJWkVPRl9NQVQzAwgLU0laRU9GX01BVDQDCQtTSVpFT0ZfUVVBVAMKB2kzMl9sb2cAEQdmMzJfbG9nABIHZjY0X2xvZwATCHZlYzJfbG9nABQIdmVjM19sb2cAFQh2ZWM0X2xvZwAWCG1hdDNfbG9nABcIbWF0NF9sb2cAGAhxdWF0X2xvZwAZF2ZyZWVfYmxvY2tzX2xpc3RfbGVuZ3RoAwsLbWVtb3J5X3NpemUDDBZtZW1vcnlfbGFzdF9pMzJfb2Zmc2V0Aw0XZnJlZV9ibG9ja3NfbGlzdF9vZmZzZXQDDg5tYXhfYmxvY2tfc2l6ZQMPEGYzMl9lcV90b2xlcmFuY2UDEAxyZXNldF9tZW1vcnkAGgZtYWxsb2MAHAptYWxsb2NfaTMyAB0KbWFsbG9jX2YzMgAdCm1hbGxvY19mNjQAHgttYWxsb2NfdmVjMgAeC21hbGxvY192ZWMzAB8LbWFsbG9jX3ZlYzQAIAttYWxsb2NfbWF0MwAhC21hbGxvY19tYXQ0ACILbWFsbG9jX3F1YXQAIAduZXdfaTMyACMHbmV3X2YzMgAkB25ld19mNjQAJQhuZXdfdmVjMgAmCG5ld192ZWMzACcIbmV3X3ZlYzQAKAhuZXdfbWF0MwApCG5ld19tYXQ0ACoIbmV3X3F1YXQAKwRmcmVlACwIZnJlZV9pMzIALQhmcmVlX2YzMgAtCGZyZWVfZjY0AC4JZnJlZV92ZWMyAC4JZnJlZV92ZWMzAC8JZnJlZV92ZWM0ADAJZnJlZV9tYXQzADEJZnJlZV9tYXQ0ADIJZnJlZV9xdWF0ADABeAAzAXkANAF6ADUBdwA2B2kzMl9nZXQANwdpMzJfc2V0ADgIaTMyX3NldGkAOQhpMzJfaW5jcgA6CWkzMl9pbmNyaQA7B2YzMl9nZXQAMwdmMzJfc2V0ADwIZjMyX3NldGkAPQhmMzJfaW5jcgA+CWYzMl9pbmNyaQA/B2Y2NF9nZXQAQAdmNjRfc2V0AEEIZjY0X3NldGkAQghmNjRfaW5jcgBDCWY2NF9pbmNyaQBECHZlYzJfc2V0AEUJdmVjMl9zZXRpAEYIdmVjMl9nZXQARwl2ZWMyX3plcm8ASAh2ZWMyX29uZQBJCXZlYzJfbGVmdABKCnZlYzJfcmlnaHQASwl2ZWMyX2Rvd24ATAd2ZWMyX3VwAE0IdmVjM19zZXQATgl2ZWMzX3NldGkATwh2ZWMzX2dldABQCXZlYzNfemVybwBRCHZlYzNfb25lAFIJdmVjM19sZWZ0AFMKdmVjM19yaWdodABUCXZlYzNfZG93bgBVB3ZlYzNfdXAAVgl2ZWMzX2JhY2sAVwx2ZWMzX2ZvcndhcmQAWAh2ZWM0X3NldABZCXZlYzRfc2V0aQBaCHZlYzRfZ2V0AFsIbWF0M19zZXQAXAltYXQzX3NldGkAXQhtYXQzX2dldABeDW1hdDNfaWRlbnRpdHkAXwltYXQzX3plcm8AYAhtYXQ0X3NldABhCW1hdDRfc2V0aQBiCG1hdDRfZ2V0AGMNbWF0NF9pZGVudGl0eQBkCW1hdDRfemVybwBlCHZlYzJfYWRkAGYIdmVjM19hZGQAZwh2ZWM0X2FkZABoCHZlYzJfc3ViAGkIdmVjM19zdWIAagh2ZWM0X3N1YgBrCHZlYzJfbXVsAGwIdmVjM19tdWwAbQh2ZWM0X211bABuCXZlYzJfbXVsaQBvCXZlYzNfbXVsaQBwCXZlYzRfbXVsaQBxCHZlYzJfZGl2AHIIdmVjM19kaXYAcwh2ZWM0X2RpdgB0CXZlYzJfZGl2aQB1CXZlYzNfZGl2aQB2CXZlYzRfZGl2aQB3CHZlYzJfZG90AHgIdmVjM19kb3QAeQh2ZWM0X2RvdAB6C3ZlYzJfZG90X3N0AHsLdmVjM19kb3Rfc3QAfAt2ZWM0X2RvdF9zdAB8B3ZlYzJfZXEAfQd2ZWMzX2VxAH4HdmVjNF9lcQB/CnZlYzJfZXFfc3QAgAEKdmVjM19lcV9zdACBAQp2ZWM0X2VxX3N0AIIBCHZlYzJfZXF6AIMBCHZlYzNfZXF6AIQBCHZlYzRfZXF6AIUBC3ZlYzJfZXF6X3N0AIYBC3ZlYzNfZXF6X3N0AIcBC3ZlYzRfZXF6X3N0AIgBCHZlYzJfbWFnAIkBCHZlYzNfbWFnAIoBCHZlYzRfbWFnAIsBC3ZlYzJfbWFnX3N0AIwBC3ZlYzNfbWFnX3N0AI0BC3ZlYzRfbWFnX3N0AI4BDHZlYzJfbWFnX3NxcgCPAQx2ZWMzX21hZ19zcXIAkAEMdmVjNF9tYWdfc3FyAJEBD3ZlYzJfbWFnX3Nxcl9zdACSAQ92ZWMzX21hZ19zcXJfc3QAkwEPdmVjNF9tYWdfc3FyX3N0AJQBCXZlYzJfbm9ybQCVAQl2ZWMzX25vcm0AlgEJdmVjNF9ub3JtAJcBDHZlYzRfbm9ybV9kcwCYAQl2ZWMyX2Rpc3QAmQEJdmVjM19kaXN0AJoBCXZlYzRfZGlzdACbAQx2ZWMyX2Rpc3Rfc3QAnAEMdmVjM19kaXN0X3N0AJ0BDHZlYzRfZGlzdF9zdACeAQp2ZWMyX2FuZ2xlAJ8BCnZlYzNfYW5nbGUAoAEKdmVjNF9hbmdsZQChAQ12ZWMyX2FuZ2xlX3N0AKIBDXZlYzNfYW5nbGVfc3QAowENdmVjNF9hbmdsZV9zdACkAQp2ZWMzX2Nyb3NzAKUBCXZlYzJfbGVycACmAQl2ZWMzX2xlcnAApwEJdmVjNF9sZXJwAKgBCG1hdDNfZGV0AKkBCG1hdDRfZGV0AKoBC21hdDNfZGV0X3N0AKsBC21hdDRfZGV0X3N0AKwBDm1hdDNfdHJhbnNwX2RzAK0BDm1hdDRfdHJhbnNwX2RzAK4BC21hdDNfdHJhbnNwAK8BC21hdDRfdHJhbnNwALABDG1hdDNfaXNfemVybwCxAQxtYXQ0X2lzX3plcm8AsgEPbWF0M19pc196ZXJvX3N0ALMBD21hdDRfaXNfemVyb19zdAC0ARBtYXQzX2lzX2lkZW50aXR5ALUBEG1hdDRfaXNfaWRlbnRpdHkAtgETbWF0M19pc19pZGVudGl0eV9zdAC3ARNtYXQ0X2lzX2lkZW50aXR5X3N0ALgBCG1hdDNfaW52ALkBCG1hdDRfaW52ALoBDG1hdDNfaW52X3JvdAC7AQxtYXQ0X2ludl9yb3QAvAELbWF0NF9pbnZfYmQAvQEJbWF0M19wcm9kAL4BCW1hdDRfcHJvZAC/AQxtYXQzX211bF92ZWMAwAEMbWF0NF9tdWxfdmVjAMEBFnNldF9wZXJzcGVjdGl2ZV9jYW1lcmEAwgEXc2V0X29ydGhvZ3JhcGhpY19jYW1lcmEAwwETc2V0X2NhbWVyYV9wb3NpdGlvbgDEARRzZXRfY2FtZXJhX3Bvc2l0aW9uaQDFARNnZXRfY2FtZXJhX3Bvc2l0aW9uAMYBEXNldF9jYW1lcmFfdGFyZ2V0AMcBEnNldF9jYW1lcmFfdGFyZ2V0aQDIARFnZXRfY2FtZXJhX3RhcmdldADJARFzZXRfY2FtZXJhX3VwX2RpcgDKARJzZXRfY2FtZXJhX3VwX2RpcmkAywERZ2V0X2NhbWVyYV91cF9kaXIAzAEIc2V0X2ZvdnkAzQEIZ2V0X2ZvdnkAzgEIc2V0X2ZvdngAzwEIZ2V0X2ZvdngA0AEQc2V0X2FzcGVjdF9yYXRpbwDRARBnZXRfYXNwZWN0X3JhdGlvANIBDnNldF9sZWZ0X3BsYW5lANMBDmdldF9sZWZ0X3BsYW5lANQBD3NldF9yaWdodF9wbGFuZQDVAQ9nZXRfcmlnaHRfcGxhbmUA1gEQc2V0X2JvdHRvbV9wbGFuZQDXARBnZXRfYm90dG9tX3BsYW5lANgBDXNldF90b3BfcGxhbmUA2QENZ2V0X3RvcF9wbGFuZQDaAQ5zZXRfbmVhcl9wbGFuZQDbAQ5nZXRfbmVhcl9wbGFuZQDcAQ1zZXRfZmFyX3BsYW5lAN0BDWdldF9mYXJfcGxhbmUA3gEMc2V0X3ZpZXdwb3J0AN8BC3ZpZXdfbWF0cml4AOABD3ZpZXdwb3J0X21hdHJpeADhARJwZXJzcGVjdGl2ZV9tYXRyaXgA4gETb3J0aG9ncmFwaGljX21hdHJpeADjARB2aWV3X3BlcnNwZWN0aXZlAOQBEXZpZXdfb3J0aG9ncmFwaGljAOUBDm1hdDNfZnJvbV9YWVppAOYBDG1hdDNfZnJvbV9YaQDnAQxtYXQzX2Zyb21fWWkA6AEMbWF0M19mcm9tX1ppAOkBDW1hdDNfZnJvbV9YWWkA6gENbWF0M19mcm9tX1haaQDrAQ1tYXQzX2Zyb21fWVppAOwBEHRyYW5zZm9ybV9TWFlaVGkA7QEPdHJhbnNmb3JtX1hZWlRpAO4BDnRyYW5zZm9ybV9TWFRpAO8BDXRyYW5zZm9ybV9YVGkA8AEOdHJhbnNmb3JtX1NZVGkA8QENdHJhbnNmb3JtX1lUaQDyAQ50cmFuc2Zvcm1fU1pUaQDzAQ10cmFuc2Zvcm1fWlRpAPQBD3RyYW5zZm9ybV9TWFlUaQD1AQ50cmFuc2Zvcm1fWFlUaQD2AQ90cmFuc2Zvcm1fU1haVGkA9wEOdHJhbnNmb3JtX1haVGkA+AEPdHJhbnNmb3JtX1NZWlRpAPkBDnRyYW5zZm9ybV9ZWlRpAPoBDnRyYW5zZm9ybV9TUVRpAPsBDXRyYW5zZm9ybV9RVGkA/AEOdHJhbnNmb3JtX1NNVGkA/QENdHJhbnNmb3JtX01UaQD+AQ90cmFuc2Zvcm1fc2V0X1QA/wEQdHJhbnNmb3JtX3NldF9UaQCAAhhub3JtYWxfZnJvbV90cmFuc2Zvcm1fUlQAgQIabm9ybWFsX2Zyb21fdHJhbnNmb3JtX1NSVGkAggIUbm9ybWFsX2Zyb21fcm90YXRpb24AgwIOcXVhdF9mcm9tX1hZWmkAhAIMcXVhdF9mcm9tX1hpAIUCDHF1YXRfZnJv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QfTQlYMCQe3C4csGQe3qtYMCQeLYvZsGQevAzMsGQfrKuYECQaDAgIECEAYLIAAgAWoiCCMOQQFrSgRAQebklasGQajS6IECQenYsasGQefCsYMCQeLYvZsGQevYgLEHQeHY1asGQfPAlMMHQePKlaMGQaDC2YsGQenCieMGQeXAtKsGQe3eycsHQa7AgIECQaDAgIECQaDAgIECEAYLIw4hAiMLIgYEQANAIAIoAgAiCSACQQRqKAIAaiIMIABLIAggCUtxIAAgCUYgCCAMRnFyBEBB5uSVqwZBqNLogQJB9NCVgwJB9N61kQZB5dqYkwdB5cqR6wJB4ti9mwZB68C8swdB5eSxiwZB8OaBuQdB6eihgwJB5uSVqwZBoNqV6wZB7+Tl8wJBoMCAgQJBoMCAgQIQBgsgCCAJRgRAIwsgBmtBAWohCiACIgRBBGohBwUgACAMRgRAIwsgBmtBAWohCyACIgNBBGohBQsLIAJBCGohAiAGQQFrIgYNAAsLIAogC3EEQCAFKAIAIAcoAgBJBH8gBCEAIAMhBCAKQQFrBSADIQAgC0EBawshAyAEQQRqIAUoAgAgBygCACABamo2AgAgAwRAA0AgACAAQQhrKAIANgIAIABBBGogAEEEaygCADYCACADQQFrIgMNAAsLIwtBAWskCyMOQQhqJA4PCyALBEAgBSAFKAIAIAFqNgIADwsgCgRAIAQgBCgCACABazYCACAHIAcoAgAgAWo2AgAPCyMLQQFqJAsjDkEIayQOIw4gADYCACMOQQRqIAE2AgALCAAgAEEEECwLCAAgAEEIECwLCAAgAEEMECwLCAAgAEEQECwLCAAgAEEkECwLCQAgAEHAABAsCwcAIAAqAgALCgAgAEEEaioCAAsKACAAQQhqKgIACwoAIABBDGoqAgALBwAgACgCAAsMACAAIAEoAgA2AgALCQAgACABNgIACxYAIAAgACgCACABKAIAaiIANgIAIAALEwAgACAAKAIAIAFqIgA2AgAgAAsMACAAIAEqAgA4AgALCQAgACABOAIACxgBAX0gACAAKgIAIAEqAgCSIgI4AgAgAgsTACAAIAAqAgAgAZIiATgCACABCwcAIAArAwALDAAgACABKwMAOQMACwkAIAAgATkDAAsYAQF8IAAgACsDACABKwMAoCICOQMAIAILEwAgACAAKwMAIAGgIgE5AwAgAQscACAAIAEqAgA4AgAgAEEEaiABQQRqKgIAOAIACxMAIAAgATgCACAAQQRqIAI4AgALDwAgACoCACAAQQRqKgIACxkAIABDAAAAADgCACAAQQRqQwAAAAA4AgALGQAgAEMAAIA/OAIAIABBBGpDAACAPzgCAAsZACAAQwAAgL84AgAgAEEEakMAAAAAOAIACxkAIABDAACAPzgCACAAQQRqQwAAAAA4AgALGQAgAEMAAAAAOAIAIABBBGpDAACAvzgCAAsZACAAQwAAAAA4AgAgAEEEakMAAIA/OAIACywAIAAgASoCADgCACAAQQRqIAFBBGoqAgA4AgAgAEEIaiABQQhqKgIAOAIACx0AIAAgATgCACAAQQRqIAI4AgAgAEEIaiADOAIACxcAIAAqAgAgAEEEaioCACAAQQhqKgIACxYAIABDAAAAAEMAAAAAQwAAAAAQogILFgAgAEMAAIA/QwAAgD9DAACAPxCiAgsWACAAQwAAAABDAAAAAEMAAIC/EKICCxYAIABDAAAAAEMAAAAAQwAAgD8QogILFgAgAEMAAAAAQwAAgL9DAAAAABCiAgsWACAAQwAAAABDAACAP0MAAAAAEKICCxYAIABDAACAv0MAAAAAQwAAAAAQogILFgAgAEMAAIA/QwAAAABDAAAAABCiAgs8ACAAIAEqAgA4AgAgAEEEaiABQQRqKgIAOAIAIABBCGogAUEIaioCADgCACAAQQxqIAFBDGoqAgA4AgALJwAgACABOAIAIABBBGogAjgCACAAQQhqIAM4AgAgAEEMaiAEOAIACx8AIAAqAgAgAEEEaioCACAAQQhqKgIAIABBDGoqAgALGQAgACABQSBBHEEYQRRBEEEMQQhBBBCaAgtZACAAIAE4AgAgAEEEaiACOAIAIABBCGogAzgCACAAQQxqIAQ4AgAgAEEQaiAFOAIAIABBFGogBjgCACAAQRhqIAc4AgAgAEEcaiAIOAIAIABBIGogCTgCAAtHACAAKgIAIABBBGoqAgAgAEEIaioCACAAQQxqKgIAIABBEGoqAgAgAEEUaioCACAAQRhqKgIAIABBHGoqAgAgAEEgaioCAAsMACAAQwAAgD8QmQILDAAgAEMAAAAAEJkCCz0AIAAgAUE8QTxBOEE4QTRBNEEwQTBBLEEsQShBKEEkQSRBIEEgQRxBHEEYQRhBFEEUQRBBDEEIQQQQnAILnwEAIAAgATgCACAAQQRqIAI4AgAgAEEIaiADOAIAIABBDGogBDgCACAAQRBqIAU4AgAgAEEUaiAGOAIAIABBGGogBzgCACAAQRxqIAg4AgAgAEEgaiAJOAIAIABBJGogCjgCACAAQShqIAs4AgAgAEEsaiAMOAIAIABBMGogDTgCACAAQTRqIA44AgAgAEE4aiAPOAIAIABBPGogEDgCAAt/ACAAKgIAIABBBGoqAgAgAEEIaioCACAAQQxqKgIAIABBEGoqAgAgAEEUaioCACAAQRhqKgIAIABBHGoqAgAgAEEgaioCACAAQSRqKgIAIABBKGoqAgAgAEEsaioCACAAQTBqKgIAIABBNGoqAgAgAEE4aioCACAAQTxqKgIACwwAIABDAACAPxCbAgsMACAAQwAAAAAQmwILKwAgACABKgIAIAIqAgCSOAIAIABBBGogAUEEaioCACACQQRqKgIAkjgCAAtEACAAIAEqAgAgAioCAJI4AgAgAEEEaiABQQRqKgIAIAJBBGoqAgCSOAIAIABBCGogAUEIaioCACACQQhqKgIAkjgCAAtdACAAIAEqAgAgAioCAJI4AgAgAEEEaiABQQRqKgIAIAJBBGoqAgCSOAIAIABBCGogAUEIaioCACACQQhqKgIAkjgCACAAQQxqIAFBDGoqAgAgAkEMaioCAJI4AgALKwAgACABKgIAIAIqAgCTOAIAIABBBGogAUEEaioCACACQQRqKgIAkzgCAAtEACAAIAEqAgAgAioCAJM4AgAgAEEEaiABQQRqKgIAIAJBBGoqAgCTOAIAIABBCGogAUEIaioCACACQQhqKgIAkzgCAAtdACAAIAEqAgAgAioCAJM4AgAgAEEEaiABQQRqKgIAIAJBBGoqAgCTOAIAIABBCGogAUEIaioCACACQQhqKgIAkzgCACAAQQxqIAFBDGoqAgAgAkEMaioCAJM4AgALKQEBfSAAIAEqAgAgAioCACIDlDgCACAAQQRqIAFBBGoqAgAgA5Q4AgALPAEBfSAAIAEqAgAgAioCACIDlDgCACAAQQRqIAFBBGoqAgAgA5Q4AgAgAEEIaiABQQhqKgIAIAOUOAIAC08BAX0gACABKgIAIAIqAgAiA5Q4AgAgAEEEaiABQQRqKgIAIAOUOAIAIABBCGogAUEIaioCACADlDgCACAAQQxqIAFBDGoqAgAgA5Q4AgALIgAgACABKgIAIAKUOAIAIABBBGogAUEEaioCACAClDgCAAs1ACAAIAEqAgAgApQ4AgAgAEEEaiABQQRqKgIAIAKUOAIAIABBCGogAUEIaioCACAClDgCAAtIACAAIAEqAgAgApQ4AgAgAEEEaiABQQRqKgIAIAKUOAIAIABBCGogAUEIaioCACAClDgCACAAQQxqIAFBDGoqAgAgApQ4AgALKQEBfSAAIAEqAgAgAioCACIDlTgCACAAQQRqIAFBBGoqAgAgA5U4AgALQgEBfSAAIAEqAgBDAACAPyACKgIAlSIDlDgCACAAQQRqIAFBBGoqAgAgA5Q4AgAgAEEIaiABQQhqKgIAIAOUOAIAC1QBAX0gACABKgIAQwAAgD8gAioCAJUiA5Q4AgAgAEEEaiABQQRqKgIAIAOUOAIAIABBCGoiACABQQhqKgIAIAOUOAIAIAAgAUEIaioCACADlDgCAAsiACAAIAEqAgAgApU4AgAgAEEEaiABQQRqKgIAIAKVOAIACzUAIAAgASoCACAClTgCACAAQQRqIAFBBGoqAgAgApU4AgAgAEEIaiABQQhqKgIAIAKVOAIAC1AAIAAgASoCAEMAAIA/IAKVIgKUOAIAIABBBGogAUEEaioCACAClDgCACAAQQhqIAFBCGoqAgAgApQ4AgAgAEEMaiABQQxqKgIAIAKUOAIACx8AIAAqAgAgASoCAJQgAEEEaioCACABQQRqKgIAlJILMQAgACoCACABKgIAlCAAQQRqKgIAIAFBBGoqAgCUkiAAQQhqKgIAIAFBCGoqAgCUkgtDACAAKgIAIAEqAgCUIABBBGoqAgAgAUEEaioCAJSSIABBCGoqAgAgAUEIaioCAJSSIABBDGoqAgAgAUEMaioCAJSSCw0AIAAgASACEHg4AgALDQAgACABIAIQeTgCAAsnACMQIAAqAgAgASoCAJOLXiMQIABBBGoqAgAgAUEEaioCAJOLXnELRwAjECAAKgIAIAEqAgCTi10EQEEADwsjECAAQQRqKgIAIAFBBGoqAgCTi10EQEEADwsjECAAQQhqKgIAIAFBCGoqAgCTi14LYgAjECAAKgIAIAEqAgCTi10EQEEADwsjECAAQQRqKgIAIAFBBGoqAgCTi10EQEEADwsjECAAQQhqKgIAIAFBCGoqAgCTi10EQEEADwsjECAAQQxqKgIAIAFBDGoqAgCTi14LDQAgACABIAIQfTYCAAsNACAAIAEgAhB+NgIACw0AIAAgASACEH82AgALGAAjECAAKgIAi14jECAAQQRqKgIAi15xCy8AIxAgACoCAItdBEBBAA8LIxAgAEEEaioCAItdBEBBAA8LIxAgAEEIaioCAIteC0EAIxAgACoCAItdBEBBAA8LIxAgAEEEaioCAItdBEBBAA8LIxAgAEEIaioCAItdBEBBAA8LIxAgAEEMaioCAIteCwwAIAAgARCDATYCAAsMACAAIAEQhAE2AgALDAAgACABEIUBNgIACx0BAX0gACoCACIBIAGUIABBBGoqAgAiASABlJKRCysBAX0gACoCACIBIAGUIABBBGoqAgAiASABlJIgAEEIaioCACIBIAGUkpELOQEBfSAAKgIAIgEgAZQgAEEEaioCACIBIAGUkiAAQQhqKgIAIgEgAZSSIABBDGoqAgAiASABlJKRCwwAIAAgARCJATgCAAsMACAAIAEQigE4AgALDAAgACABEIsBOAIACxwBAX0gACoCACIBIAGUIABBBGoqAgAiASABlJILKgEBfSAAKgIAIgEgAZQgAEEEaioCACIBIAGUkiAAQQhqKgIAIgEgAZSSCzgBAX0gACoCACIBIAGUIABBBGoqAgAiASABlJIgAEEIaioCACIBIAGUkiAAQQxqKgIAIgEgAZSSCwwAIAAgARCPATgCAAsMACAAIAEQkAE4AgALDAAgACABEJEBOAIACzoBA30gAEEEakMAAIA/IAEqAgAiAiAClCABQQRqKgIAIgMgA5SSkZUiBCADlDgCACAAIAQgApQ4AgALVQEEfSAAQQhqQwAAgD8gASoCACICIAKUIAFBBGoqAgAiAyADlJIgAUEIaioCACIEIASUkpGVIgUgBJQ4AgAgAEEEaiAFIAOUOAIAIAAgBSAClDgCAAtwAQV9IABDAACAPyABKgIAIgMgA5QgAUEEaioCACIEIASUkiABQQhqKgIAIgUgBZSSIAFBDGoqAgAiBiAGlJKRlSICIAOUOAIAIABBBGogBCAClDgCACAAQQhqIAUgApQ4AgAgAEEMaiAGIAKUOAIAC28CBX0CfyAAQwAAgD8gACoCACICIAKUIABBBGoiBioC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AgAgACACOAIACxkAIAAgAUEgQRRBCEEcQRBBBEEYQQwQmgILPQAgACABQSxBOEEcQTRBDEEwQThBLEEYQSRBCEEgQTRBHEEkQRhBBEEQQTBBDEEgQQhBBEE8QShBFBCcAguCAQAjECAAKgIAi10jECAAQQRqKgIAi11yIxAgAEEIaioCAItdcgRAQQAPCyMQIABBDGoqAgCLXSMQIABBEGoqAgCLXXIjECAAQRRqKgIAi11yBEBBAA8LIxAgAEEYaioCAItdIxAgAEEcaioCAItdcgRAQQAPCyMQIABBIGoqAgCLXgvnAQAjECAAKgIAi10jECAAQQRqKgIAi11yIxAgAEEIaioCAItdcgRAQQAPCyMQIABBDGoqAgCLXSMQIABBEGoqAgCLXXIjECAAQRRqKgIAi11yBEBBAA8LIxAgAEEYaioCAItdIxAgAEEcaioCAItdciMQIABBIGoqAgCLXXIEQEEADwsjECAAQSRqKgIAi10jECAAQShqKgIAi11yIxAgAEEsaioCAItdcgRAQQAPCyMQIABBMGoqAgCLXSMQIABBNGoqAgCLXXIjECAAQThqKgIAi11yBEBBAA8LIxAgAEE8aioCAIteCwwAIAAgARCxATYCAAsMACAAIAEQsgE2AgALlAEAIxAgAEEEaioCAItdIxAgAEEIaioCAItdciMQIABBDGoqAgCLXXIEQEEADwsjECAAQRRqKgIAi10jECAAQRhqKgIAi11yIxAgAEEcaioCAItdcgRAQQAPCyMQIAAqAgBDAACAv5KLXSMQIABBEGoqAgBDAACAv5KLXXIEQEEADwsjECAAQSBqKgIAQwAAgL+Si14L/wEAIxAgAEEEaioCAItdIxAgAEEIaioCAItdciMQIABBDGoqAgCLXXIEQEEADwsjECAAQRBqKgIAi10jECAAQRhqKgIAi11yIxAgAEEcaioCAItdcgRAQQAPCyMQIABBIGoqAgCLXSMQIABBJGoqAgCLXXIjECAAQSxqKgIAi11yBEBBAA8LIxAgAEEwaioCAItdIxAgAEE0aioCAItdciMQIABBOGoqAgCLXXIEQEEADwsjECAAKgIAQwAAgL+Si10jECAAQRRqKgIAQwAAgL+Si11yIxAgAEEoaioCAEMAAIC/kotdcgRAQQAPCyMQIABBPGoqAgBDAACAv5KLXgsMACAA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AEEYaiADIAKitjgCACAAQRxqIAGatjgCACAAQSBqIAMgBKK2OAIAC4wBAQJ8IAEQAyEDIAEQBCEBIAIQAyEEIAIQBCECIAAgBLY4AgAgAEEEaiADIAKitjgCACAAQQhqIAEgAqK2OAIAIABBDGogApq2OAIAIABBEGogAyAEorY4AgAgAEEUaiABIASitjgCACAAQRhqQwAAAAA4AgAgAEEcaiABmrY4AgAgAEEgaiADtjgCAAuMAQECfCABEAMhAyABEAQhASACEAMhBCACEAQhAiAAIAMgBKK2OAIAIABBBGogArY4AgAgAEEIaiABIASimrY4AgAgAEEMaiADIAKimrY4AgAgAEEQaiAEtjgCACAAQRRqIAEgAqK2OAIAIABBGGogAbY4AgAgAEEcakMAAAAAOAIAIABBIGogA7Y4AgALrwIBBHwgBBADIQogBBAEIQwgBRADIQQgBRAEIQUgBhADIQsgBhAEIQYgACABIAQgC6KitjgCACAAQQRqIAEgBCAGoqK2OAIAIABBCGogASAFopq2OAIAIABBDGpDAAAAADgCACAAQRBqIAIgDCALoiIBIAWiIAogBqKhorY4AgAgAEEUaiACIAwgBqIiDSAFoiAKIAuioKK2OAIAIABBGGogAiAMIASiorY4AgAgAEEcakMAAAAAOAIAIABBIGogAyANIAogBaIiAiALoqCitjgCACAAQSRqIAMgAiAGoiABoaK2OAIAIABBKGogAyAKIASiorY4AgAgAEEsakMAAAAAOAIAIABBMGogBzgCACAAQTRqIAg4AgAgAEE4aiAJOAIAIABBPGpDAACAPzgCAAuUAgEFfCABEAMhByABEAQhCSACEAMhASACEAQhAiADEAMhCCADEAQhAyAAIAEgCKK2OAIAIABBBGogASADorY4AgAgAEEIaiACmrY4AgAgAEEMakMAAAAAOAIAIABBEGogCSAIoiIKIAKiIAcgA6KhtjgCACAAQRRqIAkgA6IiCyACoiAHIAiioLY4AgAgAEEYaiAJIAGitjgCACAAQRxqQwAAAAA4AgAgAEEgaiALIAcgAqIiAiAIoqC2OAIAIABBJGogAiADoiAKobY4AgAgAEEoaiAHIAGitjgCACAAQSxqQwAAAAA4AgAgAEEwaiAEOAIAIABBNGogBTgCACAAQThqIAY4AgAgAEE8akMAAIA/OAIAC9cBAQF8IAQQAyEIIAQQBCEEIAAgAbY4AgAgAEEEakMAAAAAOAIAIABBCGpDAAAAADgCACAAQQxqQwAAAAA4AgAgAEEQakMAAAAAOAIAIABBFGogCCACorY4AgAgAEEYaiAEIAKitjgCACAAQRxqQwAAAAA4AgAgAEEgakMAAAAAOAIAIABBJGogBCADopq2OAIAIABBKGogCCADorY4AgAgAEEsakMAAAAAOAIAIABBMGogBTgCACAAQTRqIAY4AgAgAEE4aiAHOAIAIABBPGpDAACAPzgCAAvNAQEBfCABEAMhBSABEAQhASAAQwAAgD84AgAgAEEEakMAAAAAOAIAIABBCGpDAAAAADgCACAAQQxqQwAAAAA4AgAgAEEQakMAAAAAOAIAIABBFGogBbY4AgAgAEEYaiABtjgCACAAQRxqQwAAAAA4AgAgAEEgakMAAAAAOAIAIABBJGogAZq2OAIAIABBKGogBbY4AgAgAEEsakMAAAAAOAIAIABBMGogAjgCACAAQTRqIAM4AgAgAEE4aiAEOAIAIABBPGpDAACAPzgCAAvXAQEBfCAEEAMhCCAEEAQhBCAAIAggAaK2OAIAIABBBGpDAAAAADgCACAAQQhqIAQgAaKatjgCACAAQQxqQwAAAAA4AgAgAEEQakMAAAAAOAIAIABBFGogArY4AgAgAEEYakMAAAAAOAIAIABBHGpDAAAAADgCACAAQSBqIAQgA6K2OAIAIABBJGpDAAAAADgCACAAQShqIAggA6K2OAIAIABBLGpDAAAAADgCACAAQTBqIAU4AgAgAEE0aiAGOAIAIABBOGogBzgCACAAQTxqQwAAgD84AgALzQEBAXwgARADIQUgARAEIQEgACAFtjgCACAAQQRqQwAAAAA4AgAgAEEIaiABmrY4AgAgAEEMakMAAAAAOAIAIABBEGpDAAAAADgCACAAQRRqQwAAgD84AgAgAEEYakMAAAAAOAIAIABBHGpDAAAAADgCACAAQSBqIAG2OAIAIABBJGpDAAAAADgCACAAQShqIAW2OAIAIABBLGpDAAAAADgCACAAQTBqIAI4AgAgAEE0aiADOAIAIABBOGogBDgCACAAQTxqQwAAgD84AgAL1wEBAXwgBBADIQggBBAEIQQgACAIIAGitjgCACAAQQRqIAQgAaK2OAIAIABBCGpDAAAAADgCACAAQQxqQwAAAAA4AgAgAEEQaiAEIAKimrY4AgAgAEEUaiAIIAKitjgCACAAQRhqQwAAAAA4AgAgAEEcakMAAAAAOAIAIABBIGpDAAAAADgCACAAQSRqQwAAAAA4AgAgAEEoaiADtjgCACAAQSxqQwAAAAA4AgAgAEEwaiAFOAIAIABBNGogBjgCACAAQThqIAc4AgAgAEE8akMAAIA/OAIAC80BAQF8IAEQAyEFIAEQBCEBIAAgBbY4AgAgAEEEaiABtjgCACAAQQhqQwAAAAA4AgAgAEEMakMAAAAAOAIAIABBEGogAZq2OAIAIABBFGogBbY4AgAgAEEYakMAAAAAOAIAIABBHGpDAAAAADgCACAAQSBqQwAAAAA4AgAgAEEkakMAAAAAOAIAIABBKGpDAACAPzgCACAAQSxqQwAAAAA4AgAgAEEwaiACOAIAIABBNGogAzgCACAAQThqIAQ4AgAgAEE8akMAAIA/OAIAC/YBAQJ8IAQQAyEJIAQQBCEEIAUQAyEKIAUQBCEFIAAgCiABorY4AgAgAEEEakMAAAAAOAIAIABBCGogBSABopq2OAIAIABBDGpDAAAAADgCACAAQRBqIAQgBaIgAqK2OAIAIABBFGogCSACorY4AgAgAEEYaiAEIAqiIAKitjgCACAAQRxqQwAAAAA4AgAgAEEgaiAJIAWiIAOitjgCACAAQSRqIAQgA6KatjgCACAAQShqIAkgCqIgA6K2OAIAIABBLGpDAAAAADgCACAAQTBqIAY4AgAgAEE0aiAHOAIAIABBOGogCDgCACAAQTxqQwAAgD84AgAL3gEBAnwgARADIQYgARAEIQEgAhADIQcgAhAEIQIgACAHtjgCACAAQQRqQwAAAAA4AgAgAEEIaiACmrY4AgAgAEEMakMAAAAAOAIAIABBEGogASACorY4AgAgAEEUaiAGtjgCACAAQRhqIAEgB6K2OAIAIABBHGpDAAAAADgCACAAQSBqIAYgAqK2OAIAIABBJGogAZq2OAIAIABBKGogBiAHorY4AgAgAEEsakMAAAAAOAIAIABBMGogAzgCACAAQTRqIAQ4AgAgAEE4aiAFOAIAIABBPGpDAACAPzgCAAv2AQECfCAEEAMhCSAEEAQhBCAFEAMhCiAFEAQhBSAAIAogAaK2OAIAIABBBGogCSAFoiABorY4AgAgAEEIaiAEIAWiIAGitjgCACAAQQxqQwAAAAA4AgAgAEEQaiAFIAKimrY4AgAgAEEUaiAJIAqiIAKitjgCACAAQRhqIAQgCqIgAqK2OAIAIABBHGpDAAAAADgCACAAQSBqQwAAAAA4AgAgAEEkaiAEIAOimrY4AgAgAEEoaiAJIAOitjgCACAAQSxqQwAAAAA4AgAgAEEwaiAGOAIAIABBNGogBzgCACAAQThqIAg4AgAgAEE8akMAAIA/OAIAC94BAQJ8IAEQAyEGIAEQBCEBIAIQAyEHIAIQBCECIAAgB7Y4AgAgAEEEaiAGIAKitjgCACAAQQhqIAEgAqK2OAIAIABBDGpDAAAAADgCACAAQRBqIAKatjgCACAAQRRqIAYgB6K2OAIAIABBGGogASAHorY4AgAgAEEcakMAAAAAOAIAIABBIGpDAAAAADgCACAAQSRqIAGatjgCACAAQShqIAa2OAIAIABBLGpDAAAAADgCACAAQTBqIAM4AgAgAEE0aiAEOAIAIABBOGogBTgCACAAQTxqQwAAgD84AgAL9gEBAnwgBBADIQkgBBAEIQQgBRADIQogBRAEIQUgACAJIAqiIAGitjgCACAAQQRqIAUgAaK2OAIAIABBCGogBCAKoiABopq2OAIAIABBDGpDAAAAADgCACAAQRBqIAkgBaIgAqKatjgCACAAQRRqIAogAqK2OAIAIABBGGogBCAFoiACorY4AgAgAEEcakMAAAAAOAIAIABBIGogBCADorY4AgAgAEEkakMAAAAAOAIAIABBKGogCSADorY4AgAgAEEsakMAAAAAOAIAIABBMGogBjgCACAAQTRqIAc4AgAgAEE4aiAIOAIAIABBPGpDAACAPzgCAAveAQECfCABEAMhBiABEAQhASACEAMhByACEAQhAiAAIAYgB6K2OAIAIABBBGogArY4AgAgAEEIaiABIAeimrY4AgAgAEEMakMAAAAAOAIAIABBEGogBiACopq2OAIAIABBFGogB7Y4AgAgAEEYaiABIAKitjgCACAAQRxqQwAAAAA4AgAgAEEgaiABtjgCACAAQSRqQwAAAAA4AgAgAEEoaiAGtjgCACAAQSxqQwAAAAA4AgAgAEEwaiADOAIAIABBNGogBDgCACAAQThqIAU4AgAgAEE8akMAAIA/OAIAC/UCAQh9IAAgBEEEaioCACIIIAiUIg4gBEEIaioCACIJIAmUIg+SQwAAAMCUQwAAgD+SIAGUOAIAIABBBGogBCoCACIKIAiUIgsgBEEMaioCACINIAmUIgySQwAAAECUIAGUOAIAIABBEGogCyAMk0MAAABAlCAClDgCACAAQQhqIAogCZQiCyANIAiUIgyTQwAAAECUIAGUOAIAIABBIGogCyAMkkMAAABAlCADlDgCACAAQRRqIAogCpQiASAPkkMAAADAlEMAAIA/kiAClDgCACAAQRhqIAggCZQiCCANIAqUIgmSQwAAAECUIAKUOAIAIABBJGogCCAJk0MAAABAlCADlDgCACAAQShqIAEgDpJDAAAAwJRDAACAP5IgA5Q4AgAgAEEMakMAAAAAOAIAIABBHGpDAAAAADgCACAAQSxqQwAAAAA4AgAgAEEwaiAFOAIAIABBNGogBjgCACAAQThqIAc4AgAgAEE8akMAAIA/OAIAC9oCAQh9IAAgAUEEaioCACIFIAWUIgsgAUEIaioCACIGIAaUIgySQwAAAMCUQwAAgD+SOAIAIABBBGogASoCACIIIAWUIgcgAUEMaioCACIKIAaUIgmSQwAAAECUOAIAIABBEGogByAJk0MAAABAlDgCACAAQQhqIAggBpQiByAKIAWUIgmTQwAAAECUOAIAIABBIGogByAJkkMAAABAlDgCACAAQRRqIAggCJQiByAMkkMAAADAlEMAAIA/kjgCACAAQRhqIAUgBpQiBSAKIAiUIgaSQwAAAECUOAIAIABBJGogBSAGk0MAAABAlDgCACAAQShqIAcgC5JDAAAAwJRDAACAP5I4AgAgAEEMakMAAAAAOAIAIABBHGpDAAAAADgCACAAQSxqQwAAAAA4AgAgAEEwaiACOAIAIABBNGogAzgCACAAQThqIAQ4AgAgAEE8akMAAIA/OAIAC/kBACAAIAQqAgAgAZQ4AgAgAEEEaiAEQQRqKgIAIAGUOAIAIABBCGogBEEIaioCACABlDgCACAAQQxqQwAAAAA4AgAgAEEQaiAEQQxqKgIAIAKUOAIAIABBFGogBEEQaioCACAClDgCACAAQRhqIARBFGoqAgAgApQ4AgAgAEEcakMAAAAAOAIAIABBIGogBEEYaioCACADlDgCACAAQSRqIARBHGoqAgAgA5Q4AgAgAEEoaiAE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AgAgAEEMakMAAAAAOAIAIABBEGogATgCACAAQRRqQwAAAAA4AgAgAEEYakMAAAAAOAIAIABBHGpDAAAAADgCACAAQSBqIAE4AgALjAEAIAAgASoCADgCACAAQQRqIAEgCWoqAgA4AgAgAEEIaiABIAhqKgIAOAIAIABBDGogASAHaioCADgCACAAQRBqIAEgBmoqAgA4AgAgAEEUaiABIAVqKgIAOAIAIABBGGogASAEaioCADgCACAAQRxqIAEgA2oqAgA4AgAgAEEgaiABIAJqKgIAOAIAC8MBACAAIAE4AgAgAEEEakMAAAAAOAIAIABBCGpDAAAAADgCACAAQQxqQwAAAAA4AgAgAEEQakMAAAAAOAIAIABBFGogATgCACAAQRhqQwAAAAA4AgAgAEEcakMAAAAAOAIAIABBIGpDAAAAADgCACAAQSRqQwAAAAA4AgAgAEEoaiABOAIAIABBLGpDAAAAADgCACAAQTBqQwAAAAA4AgAgAEE0akMAAAAAOAIAIABBOGpDAAAAADgCACAAQTxqIAE4AgAL/AEAIAAgASoCADgCACAAIBtqIAEgG2oqAgA4AgAgACAaaiABIBpqKgIAOAIAIAAgGWogASAZaioCADgCACAAIBhqIAFBEGoqAgA4AgAgACAXaiABIBZqKgIAOAIAIAAgFWogASAUaioCADgCACAAIBNqIAEgEmoqAgA4AgAgACARaiABIBBqKgIAOAIAIAAgD2ogASAOaioCADgCACAAIA1qIAEgDGoqAgA4AgAgACALaiABIApqKgIAOAIAIAAgCWogASAIaioCADgCACAAIAdqIAEgBmoqAgA4AgAgACAFaiABIARqKgIAOAIAIAAgA2ogASACaioCADgCAAs6AQF/IAQQHCIFQX9GBEBBfw8LIAUgADgCACAFQQRqIAE4AgAgBUEIaiACOAIAIAVBDGogAzgCACAFC/EBAQl9IAAgASAHaioCACIIIAEgBmoqAgAiCZQgASAFaioCACIKIAEgBGoqAgAiC5STOAIAIABBDGogAUEIaioCACIMIAqUIAFBBGoqAgAiDSAJlJM4AgAgAEEYaiANIAuUIAggDJSTOAIAIABBBGogASADaioCACIOIAuUIAEgAmoqAgAiDyAJlJM4AgAgAEEQaiABKgIAIhAgCZQgDiAMlJM4AgAgAEEcaiAPIAyUIBAgC5STOAIAIABBCGogDyAKlCAOIAiUkzgCACAAQRRqIA4gDZQgECAKlJM4AgAgAEEgaiAQIAiUIA8gDZSTOAIAC2IBAnwgAEEMaiABRAAAAAAAAOA/oiIBEAMiBSACRAAAAAAAAOA/oiICEAMiBqK2OAIAIAAgARAEIgEgBqK2OAIAIAAgBGogAhAEIgIgBaK2OAIAIAAgA2ogASACopq2OAIACz8AIAAgA2ogAUQAAAAAAADgP6IiARAEtjgCACAAQQxqIAEQA7Y4AgAgAEMAAAAAOAIAIAAgAmpDAAAAADgCAAv2AwIKfQF/IAFBBGoqAgAhCyABQQhqKgIAIQwgASAHaioCACEPIAEgBmoqAgAhDSABIAVqKgIAIQ4gASAEaioCACEQIAEqAgAiCCABIANqKgIAIgmSIAEgAmoqAgAiCpIiEUMAAAAAXgRAIABBDGogEUMAAIA/kpEiCEMAAAA/lDgCACAAIA0gEJNDAACAPyAIIAiSlSIIlDgCACAAQQRqIA4gDJMgCJQ4AgAgAEEIaiALIAFBDGoqAgCTIAiUOAIADwsgCCAKXUEBdCAJIApdckEBIAggCV10ciISQQFGBEAgACAIQwAAgD+SIAmTIAqTkSIIQwAAAD+UOAIAIABBDGogDSABQRxqKgIAk0MAAIA/IAggCJKVIgiUOAIAIABBBGogDyALkiAIlDgCACAAQQhqIA4gDJIgCJQ4AgAPCyASQQJGBEAgAEEEakMAAIA/IAiTIAmSIAqTkSIIQwAAAD+UOAIAIABBDGogDiAMk0MAAIA/IAggCJKVIgiUOAIAIAAgDyALkiAIlDgCACAAQQhqIBAgDZIgCJQ4AgAFIABBCGpDAACAPyAIkyAJkyAKkpEiCEMAAAA/lDgCACAAQQxqIAsgD5NDAACAPyAIIAiSlSIIlDgCACAAIA4gDJIgCJQ4AgAgAEEEaiAQIA2SIAiUOAIACwsdACAAIAM4AgAgAEEEaiACOAIAIABBCGogATgCAAs=";

