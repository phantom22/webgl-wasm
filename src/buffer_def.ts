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