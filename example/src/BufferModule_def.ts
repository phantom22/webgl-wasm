type i32 = number | number & { __valueType:undefined };
type f32 = number | number & { __valueType:undefined };
type f64 = number | number & { __valueType:undefined };
type wasm_global_i32 = { value:i32 };
type wasm_global_f32 = { value:f32 };
type i32ptr = i32 & { i32_type:undefined };
type f32ptr = i32 & { f32_type:undefined };
type vec2ptr = i32 & { vec2_type:undefined };
type vec3ptr = i32 & { vec3_type:undefined };
type vec4ptr = i32 & { vec4_type:undefined };
type mat3ptr = i32 & { mat3_type:undefined };
type mat4ptr = i32 & { mat4_type:undefined };
type quatptr = i32 & { quat_type:undefined };
type BufferModule = WebAssembly.Exports & {
    free_blocks_list_length: wasm_global_i32;
    memory_size: wasm_global_i32;
    memory_last_i32_offset: wasm_global_i32;
    free_blocks_list_offset: wasm_global_i32;
    max_block_size: wasm_global_i32;
    /** equality tolerance between two 32-bit floats. the default value is ```1e-6```. */
    f32_eq_tolerance: wasm_global_f32;

    SIZEOF_I32: { value:4 };
    SIZEOF_F32: { value:4 };
    SIZEOF_VEC2: { value:8 };
    SIZEOF_VEC3: { value:12 };
    SIZEOF_VEC4: { value:16 };
    SIZEOF_MAT3: { value:36 };
    SIZEOF_MAT4: { value:64 };
    SIZEOF_QUAT: { value:16 };

    i32_log(from:i32ptr): void;
    f32_log(from:f32ptr): void;
    vec2_log(from:vec2ptr): void;
    vec3_log(from:vec3ptr): void;
    vec4_log(from:vec4ptr): void;
    mat3_log(from:mat3ptr): void;
    mat4_log(from:mat4ptr): void;
    quat_log(from:quatptr): void;

    /** resets the internal free blocks array. */
    reset_memory();

    /** tries to allocate an ```n_bytes``` block in memory, then returns its memory offset.
     * 
     * returns ```-1``` on fail.
     */
    malloc(n_bytes:i32): i32;
    /** tries to allocate an ```n_bytes``` block in memory with the specified byte alignment, then returns its memory offset.
     * 
     * returns ```-1``` on fail.
     */
    malloc_aligned(n_bytes:i32,byte_alignment:i32): i32;
    /** calls internally ```malloc_aligned(4,4)```. 
     *
     * ```new_i32(x)``` is a better alternative. 
     */
    malloc_i32(): i32ptr;
    /** calls internally ```malloc_aligned(4,4)```. 
     * 
     * ```new_f32(x)``` is a better alternative.
     */
    malloc_f32(): f32ptr;
    /** calls internally ```malloc_aligned(8,4)```.
     * 
     * ```new_vec2(x,y)``` is a better alternative. 
     */
    malloc_vec2(): vec2ptr;
    /** calls internally ```malloc_aligned(12,4)```.
     * 
     * ```new_vec3(x,y,z)``` is a better alternative. 
     */
    malloc_vec3(): vec3ptr;
    /** calls internally ```malloc_aligned(16,4)```.
     * 
     * ```new_vec4(x,y,z,w)``` is a better alternative. 
     */
    malloc_vec4(): vec4ptr;
    /** calls internally ```malloc_aligned(36,4)```.*/
    malloc_mat3(): mat3ptr;
    /** calls internally ```malloc_aligned(64,4)```. */
    malloc_mat4(): mat4ptr;
    /** calls internally ```malloc_aligned(16,4)```. */
    malloc_quat(): quatptr;

    /** calls internally ```malloc_aligned(4,4)``` and on success initializes its value. */
    new_i32(value:i32): i32ptr;
    /** calls internally ```malloc_aligned(4,4)``` and on success initializes its value. */
    new_f32(value:f32): f32ptr;
    /** calls internally ```malloc_aligned(8,4)``` and on success initializes its values. */
    new_vec2(x:f32,y:f32): vec2ptr;
    /** calls internally ```malloc_aligned(12,4)``` and on success initializes its values. */
    new_vec3(x:f32,y:f32,z:f32): vec3ptr;
    /** calls internally ```malloc_aligned(16,4)``` and on success initializes its values. */
    new_vec4(x:f32,y:f32,z:f32,w:f32): vec4ptr;
    /** calls internally ```malloc_aligned(36,4)``` and on success initializes its values. */
    new_mat3(m00:f32,m10:f32,m20:f32,m01:f32,m11:f32,m21:f32,m02:f32,m12:f32,m22:f32): mat3ptr;
    /** calls internally ```malloc_aligned(64,4)``` and on success initializes its values. */
    new_mat4(m00:f32,m10:f32,m20:f32,m30:f32,m01:f32,m11:f32,m21:f32,m31:f32,m02:f32,m12:f32,m22:f32,m32:f32,m03:f32,m13:f32,m23:f32,m33:f32): mat4ptr;
    /** calls internally ```malloc_aligned(12,4)``` and on success initializes its values. */
    new_quat(x:f32,y:f32,z:f32,w:f32): quatptr;

    /** upcasts the specified 2d vectors to a 3d one. 
     * 
     * frees current memory block and allocates the necessary memory:
     * - if the new memory offset coincides with the old one, no further action needed.
     * - otherwise, copies the previous values into the new offset and resets the old memory block with zeros. */
    //vec2_to_vec3(v:vec2ptr): vec3ptr;
    //vec2_to_vec4(v:vec2ptr): vec4ptr;
    //vec3_to_vec4(v:vec3ptr): vec4ptr;
    //mat3_to_mat4(v:mat3ptr): mat4ptr;

    //vec3_to_vec2(v:vec3ptr): vec2ptr;
    //vec4_to_vec3(v:vec4ptr): vec3ptr;
    //vec4_to_vec2(v:vec4ptr): vec2ptr;
    //mat4_to_mat3(v:mat4ptr): mat3ptr;

    /** throws an error on invalid ```offset-size``` combinations. */
    free(offset:i32,size:i32): asserts offset is number;
    /* @ts-ignore */
    /** calls internally ```free(offset,4)```. */free_i32(offset:i32ptr): asserts offset is number;
    /* @ts-ignore */
    /** calls internally ```free(offset,4)```. */ free_f32(offset:f32ptr): asserts offset is number;
    /* @ts-ignore */
    /** calls internally ```free(offset,8)```. */free_vec2(offset:vec2ptr): asserts offset is number;
    /* @ts-ignore */
    /** calls internally ```free(offset,12)```. */free_vec3(offset:vec3ptr): asserts offset is number;
    /* @ts-ignore */
    /** calls internally ```free(offset,16)```. */free_vec4(offset:vec4ptr): asserts offset is number;
    /* @ts-ignore */
    /** calls internally ```free(offset,36)```. */free_mat3(offset:mat3ptr): asserts offset is number;
    /* @ts-ignore */
    /** calls internally ```free(offset,64)```. */free_mat4(offset:mat4ptr): asserts offset is number;
    /* @ts-ignore */
    /** calls internally ```free(offset,12)```. */free_quat(offset:quatptr): asserts offset is number;

    /** returns the x component offset. */
    get_x<T extends vec2ptr|vec3ptr|vec4ptr|quatptr>(from:T): i32;
    /** returns the y component offset. */
    get_y<T extends vec2ptr|vec3ptr|vec4ptr|quatptr>(from:T): i32;
    /** returns the z component offset. */
    get_z<T extends vec3ptr|vec4ptr|quatptr>(from:T): i32;
    /** returns the w component offset. */
    get_w<T extends vec4ptr|quatptr>(from:T): i32;

    mat3_get_col1(from:mat3ptr): vec3ptr;
    mat3_get_col2(from:mat3ptr): vec3ptr;
    mat3_get_col3(from:mat3ptr): vec3ptr;

    mat4_get_col1(from:mat4ptr): vec4ptr;
    mat4_get_col2(from:mat4ptr): vec4ptr;
    mat4_get_col3(from:mat4ptr): vec4ptr;
    mat4_get_col4(from:mat4ptr): vec4ptr;

    mat3_set_col1(dest:mat3ptr,from:vec3ptr): void;
    mat3_set_col2(dest:mat3ptr,from:vec3ptr): void;
    mat3_set_col3(dest:mat3ptr,from:vec3ptr): void;

    mat4_set_col1(dest:mat4ptr,from:vec4ptr): void;
    mat4_set_col2(dest:mat4ptr,from:vec4ptr): void;
    mat4_set_col3(dest:mat4ptr,from:vec4ptr): void;
    mat4_set_col4(dest:mat4ptr,from:vec4ptr): void;

    i32_get(from:i32ptr): i32;
    /** clones the value stored in ```from``` into ```dest```. */
    i32_set(dest:i32ptr,from:i32ptr): void;
    i32_seti(dest:i32ptr,value:i32): void;
    /** increment ```dest``` by the value in ```from``` then return the updated value. */
    i32_incr(dest:i32ptr,from:i32ptr): i32;
    /** increment ```dest``` by the specified immediate amount then return the updated value. */
    i32_incri(dest:i32ptr,increment:i32): i32;

    f32_get(from:f32ptr): f32;
    /** clones the value stored in ```from``` into ```dest```. */
    f32_set(dest:f32ptr,from:f32ptr): void;
    f32_seti(dest:f32ptr,value:f32): void;
    /** increment ```dest``` by the value in ```from``` then return the updated value. */
    f32_incr(dest:f32ptr,from:f32ptr): f32;
    /** increment ```dest``` by the specified immediate amount then return the updated value. */
    f32_incri(dest:f32ptr,increment:f32): f32;

    /** clones the values stored in ```from``` into ```dest```. */
    vec2_set(dest:vec2ptr,from:vec2ptr): void;
    vec2_seti(dest:vec2ptr,x:f32,y:f32): void;
    vec2_get(from:vec2ptr): [f32,f32];
    vec2_zero(dest:vec2ptr): void;
    vec2_one(dest:vec2ptr): void;
    vec2_left(dest:vec2ptr): void;
    vec2_right(dest:vec2ptr): void;
    vec2_down(dest:vec2ptr): void;
    vec2_up(dest:vec2ptr): void;

    /** clones the values stored in ```from``` into ```dest```. */
    vec3_set(dest:vec3ptr,from:vec3ptr): void;
    vec3_seti(dest:vec3ptr,x:f32,y:f32,z:f32): void;
    vec3_get(from:vec3ptr): [f32,f32,f32];
    vec3_zero(dest:vec3ptr): void;
    vec3_one(dest:vec3ptr): void;
    vec3_left(dest:vec3ptr): void;
    vec3_right(dest:vec3ptr): void;
    vec3_down(dest:vec3ptr): void;
    vec3_up(dest:vec3ptr): void;
    vec3_back(dest:vec3ptr): void;
    vec3_forward(dest:vec3ptr): void;
    /** copies the camera position 3D vector to ```dest```. */
    vec3_camera_position(dest:vec3ptr): void;
    /** copies the camera target 3D vector to ```dest```. */
    vec3_camera_target(dest:vec3ptr): void;
    /** copies the camera up dir 3D vector to ```dest```. */
    vec3_camera_up_dir(dest:vec3ptr): void;

    /** clones the values stored in ```from``` into ```dest```. */
    vec4_set<T extends quatptr|vec4ptr>(dest:T,from:T): void;
    vec4_seti<T extends quatptr|vec4ptr>(dest:T,x:f32,y:f32,z:f32,w:f32): void;
    vec4_get<T extends quatptr|vec4ptr>(from:T): [x:f32,y:f32,z:f32,w:f32];

    /** clones the values stored in ```from``` into ```dest```. */
    mat3_set(dest:mat3ptr,from:mat3ptr): void;
    mat3_seti(dest:mat3ptr,m00:f32,m10:f32,m20:f32,m01:f32,m11:f32,m21:f32,m02:f32,m12:f32,m22:f32): void;
    mat3_get(from:mat3ptr): [f32,f32,f32,f32,f32,f32,f32,f32,f32];
    mat3_identity(dest:mat3ptr): void;
    mat3_zero(dest:mat3ptr): void;

    /** clones the values stored in ```from``` into ```dest```. */
    mat4_set(dest:mat4ptr,from:mat4ptr): void;
    mat4_seti(dest:mat4ptr,m00:f32,m10:f32,m20:f32,m30:f32,m01:f32,m11:f32,m21:f32,m31:f32,m02:f32,m12:f32,m22:f32,m32:f32,m03:f32,m13:f32,m23:f32,m33:f32): void;
    mat4_get(from:mat4ptr): [f32,f32,f32,f32,f32,f32,f32,f32,f32,f32,f32,f32,f32,f32,f32,f32];
    mat4_identity(dest:mat4ptr): void;
    mat4_zero(dest:mat4ptr): void;

    vec2_neg(dest:vec2ptr,from:vec2ptr): void;
    vec3_neg(dest:vec3ptr,from:vec3ptr): void;
    vec4_neg(dest:vec4ptr,from:vec4ptr): void;
    vec2_add(dest:vec2ptr,from_a:vec2ptr,from_b:vec2ptr): void;
    vec3_add(dest:vec3ptr,from_a:vec3ptr,from_b:vec3ptr): void;
    vec4_add<T extends quatptr|vec4ptr>(dest:T,from_a:T,from_b:T): void;
    vec2_add_scalar(dest:vec2ptr,from:vec2ptr,scalar:f32ptr): void;
    vec3_add_scalar(dest:vec3ptr,from:vec3ptr,scalar:f32ptr): void;
    vec4_add_scalar(dest:vec4ptr,from:vec4ptr,scalar:f32ptr): void;
    vec2_sub(dest:vec2ptr,from_a:vec2ptr,from_b:vec2ptr): void;
    vec3_sub(dest:vec3ptr,from_a:vec3ptr,from_b:vec3ptr): void;
    vec4_sub<T extends quatptr|vec4ptr>(dest:T,from_a:T,from_b:T): void;
    vec2_sub_norm(dest:vec2ptr,from_a:vec2ptr,from_b:vec2ptr): void;
    vec3_sub_norm(dest:vec3ptr,from_a:vec3ptr,from_b:vec3ptr): void;
    vec4_sub_norm(dest:vec4ptr,from_a:vec4ptr,from_b:vec4ptr): void;
    vec2_mul(dest:vec2ptr,from:vec2ptr,scalar:i32): void;
    vec3_mul(dest:vec3ptr,from:vec3ptr,scalar:i32): void;
    vec4_mul<T extends quatptr|vec4ptr>(dest:T,from:T,scalar:i32): void;
    vec2_muli(dest:vec2ptr,from:vec2ptr,scalar:f32): void;
    vec3_muli(dest:vec3ptr,from:vec3ptr,scalar:f32): void;
    vec4_muli<T extends quatptr|vec4ptr>(dest:T,from:T,scalar:f32): void;
    vec2_div(dest:vec2ptr,from:vec2ptr,scalar:i32): void;
    vec3_div(dest:vec3ptr,from:vec3ptr,scalar:i32): void;
    vec4_div<T extends quatptr|vec4ptr>(dest:T,from:T,scalar:i32): void;
    vec2_divi(dest:vec2ptr,from:vec2ptr,scalar:f32): void;
    vec3_divi(dest:vec3ptr,from:vec3ptr,scalar:f32): void;
    vec4_divi<T extends quatptr|vec4ptr>(dest:T,from:T,scalar:f32): void;
    vec2_dot(from_a:vec2ptr,from_b:vec2ptr): f32;
    vec3_dot(from_a:vec3ptr,from_b:vec3ptr): f32;
    vec4_dot<T extends quatptr|vec4ptr>(from_a:T,from_b:T): f32;
    vec2_dot_st(dest:f32ptr,from_a:vec2ptr,from_b:vec2ptr): void;
    vec3_dot_st(dest:f32ptr,from_a:vec3ptr,from_b:vec3ptr): void;
    vec4_dot_st<T extends quatptr|vec4ptr>(dest:f32ptr,from_a:T,from_b:T): void;
    vec2_eq(from_a:vec2ptr,from_b:vec2ptr): i32;
    vec3_eq(from_a:vec3ptr,from_b:vec3ptr): i32;
    vec4_eq<T extends quatptr|vec4ptr>(from_a:T,from_b:T): i32;
    vec2_eq_st(dest:i32ptr,from_a:vec2ptr,from_b:vec2ptr): void;
    vec3_eq_st(dest:i32ptr,from_a:vec3ptr,from_b:vec3ptr): void;
    vec4_eq_st<T extends quatptr|vec4ptr>(dest:i32ptr,from_a:T,from_b:T): void;
    vec2_eqz(from:vec2ptr): i32;
    vec3_eqz(from:vec3ptr): i32;
    vec4_eqz<T extends quatptr|vec4ptr>(from:T): i32;
    vec2_eqz_st(dest:i32ptr,from:vec2ptr): void;
    vec3_eqz_st(dest:i32ptr,from:vec3ptr): void;
    vec4_eqz_st<T extends quatptr|vec4ptr>(dest:i32ptr,from:T): void;
    vec2_mag(from:vec2ptr): f32;
    vec3_mag(from:vec3ptr): f32;
    vec4_mag<T extends quatptr|vec4ptr>(from:T): f32;
    vec2_mag_st(dest:f32ptr,from:vec2ptr): void;
    vec3_mag_st(dest:f32ptr,from:vec3ptr): void;
    vec4_mag_st<T extends quatptr|vec4ptr>(dest:f32ptr,from:T): void;
    vec2_mag_sqr(from:vec2ptr): f32;
    vec3_mag_sqr(from:vec3ptr): f32;
    vec4_mag_sqr<T extends quatptr|vec4ptr>(from:T): f32;
    vec2_mag_sqr_st(dest:f32ptr,from:vec2ptr): void;
    vec3_mag_sqr_st(dest:f32ptr,from:vec3ptr): void;
    vec4_mag_sqr_st<T extends quatptr|vec4ptr>(dest:f32ptr,from:T): void;
    vec2_norm(dest:vec2ptr,from:vec2ptr): void;
    vec3_norm(dest:vec3ptr,from:vec3ptr): void;
    vec4_norm<T extends quatptr|vec4ptr>(dest:T,from:T): void;
    vec4_norm_ds<T extends quatptr|vec4ptr>(dest:T): void;
    vec2_dist(from_a:vec2ptr,from_b:vec2ptr): f32;
    vec3_dist(from_a:vec3ptr,from_b:vec3ptr): f32;
    vec4_dist(from_a:vec4ptr,from_b:vec4ptr): f32;
    vec2_dist_st(dest:f32ptr,from_a:vec2ptr,from_b:vec2ptr): void;
    vec3_dist_st(dest:f32ptr,from_a:vec3ptr,from_b:vec3ptr): void;
    vec4_dist_st(dest:f32ptr,from_a:vec4ptr,from_b:vec4ptr): void;
    vec2_angle(from_a:vec2ptr,from_b:vec2ptr): f32;
    vec3_angle(from_a:vec3ptr,from_b:vec3ptr): f32;
    vec4_angle(from_a:vec4ptr,from_b:vec4ptr): f32;
    vec2_angle_st(dest:f32ptr,from_a:vec2ptr,from_b:vec2ptr): void;
    vec3_angle_st(dest:f32ptr,from_a:vec3ptr,from_b:vec3ptr): void;
    vec4_angle_st(dest:f32ptr,from_a:vec4ptr,from_b:vec4ptr): void;
    vec3_cross(dest:i32,from_a:vec3ptr,from_b:vec3ptr): void;
    vec3_cross_norm(dest:i32,from_a:vec3ptr,from_b:vec3ptr): void;
    vec2_lerp(dest:vec2ptr,from_a:vec2ptr,from_b:vec2ptr,t:f32): void;
    vec3_lerp(dest:vec3ptr,from_a:vec3ptr,from_b:vec3ptr,t:f32): void;
    vec4_lerp<T extends quatptr|vec4ptr>(dest:T,from_a:T,from_b:T,t:f32): void;

    mat3_det(from:mat3ptr): f32;
    mat4_det(from:mat4ptr): f32;
    mat3_det_st(dest:f32ptr,from:mat3ptr): void;
    mat4_det_st(dest:f32ptr,from:mat4ptr): void;
    mat3_transp_ds(dest:mat3ptr): void;
    mat4_transp_ds(dest:mat4ptr): void;
    /** if ```dest``` coincides with ```from``` use ```mat3_transp_ds()``` otherwise you will have a wrong result. */
    mat3_transp(dest:mat3ptr,from:mat3ptr): void;
    /** if ```dest``` coincides with ```from``` use ```mat4_transp_ds()``` otherwise you will have a wrong result. */
    mat4_transp(dest:mat4ptr,from:mat4ptr): void;
    mat3_is_zero(from:mat3ptr): i32;
    mat4_is_zero(from:mat4ptr): i32;
    mat3_is_zero_st(dest:i32ptr,from:mat3ptr): void;
    mat4_is_zero_st(dest:i32ptr,from:mat4ptr): void;
    mat3_is_identity(from:mat3ptr): i32;
    mat4_is_identity(from:mat4ptr): i32;
    mat3_is_identity_st(dest:i32ptr,from:mat3ptr): void;
    mat4_is_identity_st(dest:i32ptr,from:mat4ptr): void;
    mat3_inv(dest:mat3ptr,from:mat3ptr): void;
    mat4_inv(dest:mat4ptr,from:mat4ptr): void;
    /** assumed determinant equal to 1. */
    mat3_inv_rot(dest:mat3ptr,from:mat3ptr): void;
    /** assumed determinant equal to 1. */
    mat4_inv_rot(dest:mat4ptr,from:mat4ptr): void;
    /** assumed upper left 2x2 matrix to be invertible. uses the block decomposition method. */
    mat4_inv_bd(dest:mat4ptr,from:mat4ptr): void;
    mat3_prod(dest:mat3ptr,from_a:mat3ptr,from_b:mat3ptr): void;
    mat4_prod(dest:mat4ptr,from_a:mat4ptr,from_b:mat4ptr): void;
    mat3_mul_vec(dest:vec3ptr,mat:mat3ptr,vec3:vec3ptr): void;
    mat4_mul_vec(dest:vec4ptr,mat:mat4ptr,vec4:vec4ptr): void;
    
    /** sets the internal perspective camera parameters, but you still need to use ```view_perspective()```. */
    set_perspective_camera(pos_x:f64,pos_y:f64,pos_z:f64,target_x:f64,target_y:f64,target_z:f64,up_x:f64,up_y:f64,up_z:f64,fovy:f64,aspect_ratio:f64,near_plane:f64,far_plane:f64): void;
    /** sets the internal perspective camera parameters, but you still need to use ```view_orthographic()```. */
    set_orthographic_camera(pos_x:f64,pos_y:f64,pos_z:f64,target_x:f64,target_y:f64,target_z:f64,up_x:f64,up_y:f64,up_z:f64,left_plane:f64,right_plane:f64,bottom_plane:f64,top_plane:f64,near_plane:f64,far_plane:f64): void;

    set_camera_position(from:vec3ptr): void;
    set_camera_positioni(pos_x:f64,pos_y:f64,pos_z:f64): void;
    get_camera_position(): [pos_x:f64,pos_y:f64,pos_z:f64];

    set_camera_target(from:vec3ptr): void;
    set_camera_targeti(target_x:f64,target_y:f64,target_z:f64): void;
    get_camera_target(): [target_x:f64,target_y:f64,target_z:f64];

    set_camera_up_dir(from:vec3ptr): void;
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
    view_matrix(dest:mat4ptr): void;
    /** the viewport matrix converts clip-space position to screen-space position.
     * 
     * influeced by viewport (x, y, width, height). */
    viewport_matrix(dest:mat4ptr): void;
    /** the perspective matrix converts camera position to clip-space position.
     * 
     * influenced by fovy, aspect ratio, near plane and far plane. */
    perspective_matrix(dest:mat4ptr): void;
    /** the orthographic matrix converts camera position to clip-space position.
     * 
     * influenced by (left, right, bottom, top, near, far) planes. */
    orthographic_matrix(dest:mat4ptr): void;

    /** the view-perspective matrix converts world position to clip-space position. 
     * 
     * influenced by camera (position, target, up direction), fovy, aspect ratio, near plane and far plane. */
    view_perspective(dest:mat4ptr): void;
    /** the view-orthographic matrix converts world position to clip-space position. 
     * 
     * influenced by camera (position, target, up direction) and (left, right, bottom, top, near, far) planes. */
    view_orthographic(dest:mat4ptr): void;

    /** constructs a 3x3 rotation matrix from a given XYZ-order rotation (in radians). */
    mat3_from_XYZi(dest:mat3ptr,angle_x:f64,angle_y:f64,angle_z:f64) : void;
    /** constructs a 3x3 rotation matrix from a given X-axis rotation (in radians). */
    mat3_from_Xi(dest:mat3ptr,angle_x:f64) : void;
    /** constructs a 3x3 rotation matrix from a given Y-axis rotation (in radians). */
    mat3_from_Yi(dest:mat3ptr,angle_y:f64) : void;
    /** constructs a 3x3 rotation matrix from a given Z-axis rotation (in radians). */
    mat3_from_Zi(dest:mat3ptr,angle_z:f64) : void;
    /** constructs a 3x3 rotation matrix from a given XY-order rotation (in radians). */
    mat3_from_XYi(dest:mat3ptr,angle_x:f64,angle_y:f64) : void;
    /** constructs a 3x3 rotation matrix from a given XZ-order rotation (in radians). */
    mat3_from_XZi(dest:mat3ptr,angle_x:f64,angle_z:f64) : void;
    /** constructs a 3x3 rotation matrix from a given YZ-order rotation (in radians). */
    mat3_from_YZi(dest:mat3ptr,angle_y:f64,angle_z:f64) : void;

    /** constructs a billboard rotation matrix with fixed rotation around the x-axis.
     * 
     * for a group of particles, the reference position to be passed, can be any particle's position or the center of the particle cloud. */
    billboard_around_X(dest:mat3ptr,position:vec3ptr): void;
    /** constructs a billboard rotation matrix with fixed rotation around the y-axis.
     * 
     * for a group of particles, the reference position to be passed, can be any particle's position or the center of the particle cloud. */
    billboard_around_Y(dest:mat3ptr,position:vec3ptr): void;
    /** constructs a billboard rotation matrix with fixed rotation around the z-axis.
     * 
     * for a group of particles, the reference position to be passed, can be any particle's position or the center of the particle cloud. */
    billboard_around_Z(dest:mat3ptr,position:vec3ptr): void;
    /** constructs a spherical billboard rotation matrix.
     * 
     * for a group of particles, the reference position to be passed, can be any particle's position or the center of the particle cloud. */
    billboard_spherical(dest:mat3ptr,position:vec3ptr): void;
    
    /** constructs a transform matrix from a given XYZ scale, XYZ-order rotation (in radians) and traslation. */
    transform_SXYZT(dest:mat4ptr,scale:vec3ptr,eulerXYZ:vec3ptr,position:vec3ptr): void;
    /** constructs a transform matrix from a given XYZ-order rotation (in radians) and traslation. */
    transform_XYZT(dest:mat4ptr,eulerXYZ:vec3ptr,position:vec3ptr): void;
    /** constructs a transform matrix from a given XYZ scale, X-axis rotation (in radians) and translation. */
    transform_SXT(dest:mat4ptr,scale:vec3ptr,eulerX:f32ptr,position:vec3ptr): void;
    /** constructs a transform matrix from a given X-axis rotation (in radians) and translation. */
    transform_XT(dest:mat4ptr,eulerX:f32ptr,position:vec3ptr): void;
    /** constructs a transform matrix from a given XYZ scale, Y-axis rotation (in radians) and translation. */
    transform_SYT(dest:mat4ptr,scale:vec3ptr,eulerY:f64,position:vec3ptr): void;    
    /** constructs a transform matrix from a given Y-axis rotation (in radians) and translation. */
    transform_YT(dest:mat4ptr,eulerY:f32ptr,position:vec3ptr): void;
    /** constructs a transform matrix from a given XYZ scale, Z-axis rotation (in radians) and translation. */
    transform_SZT(dest:mat4ptr,scale:vec3ptr,eulerZ:f32ptr,position:vec3ptr): void;
    /** constructs a transform matrix from a given Z-axis rotation (in radians) and translation. */
    transform_ZT(dest:mat4ptr,eulerZ:f32ptr,position:vec3ptr): void;
    /** constructs a transform matrix from a given XYZ scale, XY-order rotation (in radians) and translation. */
    transform_SXYT(dest:mat4ptr,scale:vec3ptr,eulerXY:vec2ptr,position:vec3ptr): void;
    /** constructs a transform matrix from a given XY-order rotation (in radians) and translation. */
    transform_XYT(dest:mat4ptr,eulerXY:vec2ptr,position:vec3ptr): void;
    /** constructs a transform matrix from a given XYZ scale, XZ-order rotation (in radians) and translation. */
    transform_SXZT(dest:mat4ptr,scale:vec3ptr,eulerXZ:vec2ptr,position:vec3ptr): void;
    /** constructs a transform matrix from a given XZ-order rotation (in radians) and translation. */
    transform_XZT(dest:mat4ptr,eulerXZ:vec2ptr,position:vec3ptr): void;
    /** constructs a transform matrix from a given XYZ scale, YZ-order rotation (in radians) and translation. */
    transform_SYZT(dest:mat4ptr,scale:vec3ptr,eulerYZ:vec2ptr,position:vec3ptr): void;
    /** constructs a transform matrix from a given YZ-order rotation (in radians) and translation. */
    transform_YZT(dest:mat4ptr,angle_y:f64,angle_z:f64,position:vec3ptr): void;
    /** constructs a transform matrix from a given XYZ scale, quaternion and translation. */
    transform_SQT(dest:mat4ptr,scale:vec3ptr,quaternion:quatptr,position:vec3ptr): void;
    /** constructs a transform matrix from a given quaternion and translation. */
    transform_QT(dest:mat4ptr,quaternion:quatptr,position:vec3ptr): void;
    /** constructs a transform matrix from a given XYZ scale, 3x3 rotation matrix and translation. */
    transform_SMT(dest:mat4ptr,scale:vec3ptr,rotation_matrix:mat3ptr,position:vec3ptr): void;
    /** constructs a transform matrix from a given 3x3 rotation matrix and translation. */
    transform_MT(dest:mat4ptr,rotation_matrix:mat3ptr,position:vec3ptr): void;

    transform_USXYZT(dest:mat4ptr,uniform_scale:f32ptr,eulerXYZ:vec3ptr,position:vec3ptr): void;
    transform_USXT(dest:mat4ptr,uniform_scale:f32ptr,eulerX:f32ptr,position:vec3ptr): void;
    transform_USYT(dest:mat4ptr,uniform_scale:f32ptr,eulerY:f32ptr,position:vec3ptr): void;   
    transform_USZT(dest:mat4ptr,uniform_scale:f32ptr,eulerZ:f32ptr,position:vec3ptr): void;
    transform_USXYT(dest:mat4ptr,uniform_scale:f32ptr,eulerXY:vec2ptr,position:vec3ptr): void;
    transform_USXZT(dest:mat4ptr,uniform_scale:f32ptr,eulerXZ:vec2ptr,position:vec3ptr): void;
    transform_USYZT(dest:mat4ptr,uniform_scale:f32ptr,eulerYZ:vec2ptr,position:vec3ptr): void;

    /** updates the translation encoded in the transform matrix. */
    transform_set_T(dest:mat4ptr,from:vec3ptr): void;
    /** updates the scaling and the rotation encoded in the transform matrix. */
    transform_apply_SQ(dest:mat4ptr,scale:vec3ptr,quaternion:quatptr): void;
    /** updates the rotation encoded in the transform matrix. */
    transform_apply_Q(dest:mat4ptr,quaternion:quatptr): void;
    /** updates the scaling and the rotation encoded in the transform matrix. */
    transform_apply_SM(dest:mat4ptr,scale:vec3ptr,rotation:mat3ptr): void;
    /** updates the rotation encoded in the transform matrix. */
    transform_apply_M(dest:mat4ptr,rotation:mat3ptr): void;

    /** constructs a normal matrix from a given transform matrix that only encodes rotation and translation.  */
    normal_from_transform_RT(dest:mat3ptr,transform_matrix_RT:mat4ptr): void;
    /** constructs a normal matrix from a given transform matrix that encodes scaling, rotation and translation. */
    normal_from_transform_SRT(dest:mat3ptr,transform_matrix_SRT:mat4ptr,scale:vec3ptr): void;
    /** constructs a normal matrix from a given rotation matrix. */
    normal_from_rotation(dest:mat3ptr,rotation_matrix:mat3ptr): void;

    /** costructs a quaternion from a given XYZ-order rotation (in radians). */
    quat_from_XYZi(dest:quatptr,angle_x:f64,angle_y:f64,angle_z:f64): void;
    /** costructs a quaternion from a given X-axis rotation (in radians). */
    quat_from_Xi(dest:quatptr,angle_x:f64): void;
    /** costructs a quaternion from a given Y-axis rotation (in radians). */
    quat_from_Yi(dest:quatptr,angle_y:f64): void;
    /** costructs a quaternion from a given Z-axis rotation (in radians). */
    quat_from_Zi(dest:quatptr,angle_z:f64): void;
    /** costructs a quaternion from a given XY-order rotation (in radians). */
    quat_from_XYi(dest:quatptr,angle_x:f64,angle_y:f64): void;
    /** costructs a quaternion from a given XZ-order rotation (in radians). */
    quat_from_XZi(dest:quatptr,angle_x:f64,angle_z:f64): void;
    /** costructs a quaternion from a given YZ-order rotation (in radians). */
    quat_from_YZi(dest:quatptr,angle_y:f64,angle_z:f64): void;
    /** precision loss with consecutive products without normalization:
     * - 1e-6: ~34
     * - 1e-5: ~1053
     * - 1e-4: ~10825
     * - 1e-3: ~108824
     * - 1e-2: ~1082584
     * - 1e-1: ~10359640
     * - 12e-1: ~19812447
     */
    quat_prod(dest:quatptr,from_a:quatptr,from_b:quatptr): void;
    
    /** assumed unit quaternions. */
    quat_angle(from_a:quatptr,from_b:quatptr): f32;
    /** assumed unit quaternions. */
    quat_angle_st(dest:i32,from_a:quatptr,from_b:quatptr): void;
    /** assumed unit quaternions. */
    quat_inv(dest:quatptr,from:quatptr): void;
    /** assumed unit quaternions. */
    quat_inv_ds(dest:quatptr): void;
    /** unclamped spherical linear interpolation between two quaternions. 
     * 
     * consider that interpolation between two quaternions that are either equal or opposite will cause unwanted behaviour. */
    quat_slerp(dest:quatptr,from_a:quatptr,from_b:quatptr,t:f64): void;

    mat3_from_quat(dest:mat3ptr,from:quatptr): void;
    mat4_from_quat(dest:mat4ptr,from:quatptr): void;
    /** assigns the top left 3x3 matrix of the specified 4x4 matrix into ```dest```. */
    mat3_from_mat4(dest:mat3ptr,from:mat4ptr): void;
    /** extends the 3x3 matrix to a 4x4 matrix (last row/column is set to ```[0,0,0,1]```). */
    mat4_from_mat3(dest:mat4ptr,from:mat3ptr): void;
    /** assumed valid 3x3 rotation matrix. */
    quat_from_mat3(dest:quatptr,from:mat3ptr): void;
    /** assumed valid 4x4 rotation matrix. */
    quat_from_mat4(dest:quatptr,from:mat4ptr): void;
    /** converts the vec3 to homogeneous coordinates. */
    vec4_from_vec3(dest:vec4ptr,from:vec3ptr): void;

    set_simple_seed(seed:i32): void;
    /** returns a seeded pseudorandom number between 0 and 1.
     * 
     * the seed can be set with ```set_simple_seed()```.
     */
    simple_random(): f64;
};

type BufferImports = {
    Math: {
        acos: Math["acos"];
        tan: Math["tan"];
        atan: Math["atan"];
        sin: Math["sin"];
        cos: Math["cos"];
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
        now: DateConstructor["now"];
    };
};

// this is buffer.wasm converted to base64
const BufferModule_base64 = 
    "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bGxvY19tYXQ0ACILbWFsbG9jX3F1YXQAIAduZXdfaTMyACMHbmV3X2YzMgAkCG5ld192ZWMyACUIbmV3X3ZlYzMAJghuZXdfdmVjNAAnCG5ld19tYXQzACgIbmV3X21hdDQAKQhuZXdfcXVhdAAqBGZyZWUAKwhmcmVlX2kzMgAsCGZyZWVfZjMyACwIZnJlZV9mNjQALQlmcmVlX3ZlYzIALQlmcmVlX3ZlYzMALglmcmVlX3ZlYzQALwlmcmVlX21hdDMAMAlmcmVlX21hdDQAMQlmcmVlX3F1YXQALwVnZXRfeAAyBWdldF95ADMFZ2V0X3oANAVnZXRfdwA1DW1hdDNfZ2V0X2NvbDEAMg1tYXQzX2dldF9jb2wyADUNbWF0M19nZXRfY29sMwA2DW1hdDRfZ2V0X2NvbDEAMg1tYXQ0X2dldF9jb2wyADcNbWF0NF9nZXRfY29sMwA4DW1hdDRfZ2V0X2NvbDQAOQ1tYXQzX3NldF9jb2wxADoNbWF0M19zZXRfY29sMgA7DW1hdDNfc2V0X2NvbDMAPA1tYXQ0X3NldF9jb2wxAD0NbWF0NF9zZXRfY29sMgA+DW1hdDRfc2V0X2NvbDMAPw1tYXQ0X3NldF9jb2w0AEAHaTMyX2dldABBB2kzMl9zZXQAQghpMzJfc2V0aQBDCGkzMl9pbmNyAEQJaTMyX2luY3JpAEUHZjMyX2dldABGB2YzMl9zZXQARwhmMzJfc2V0aQBICGYzMl9pbmNyAEkJZjMyX2luY3JpAEoIdmVjMl9zZXQASwl2ZWMyX3NldGkATAh2ZWMyX2dldABNCXZlYzJfemVybwBOCHZlYzJfb25lAE8JdmVjMl9sZWZ0AFAKdmVjMl9yaWdodABRCXZlYzJfZG93bgBSB3ZlYzJfdXAAUwh2ZWMzX3NldAA6CXZlYzNfc2V0aQBUCHZlYzNfZ2V0AFUJdmVjM196ZXJvAFYIdmVjM19vbmUAVwl2ZWMzX2xlZnQAWAp2ZWMzX3JpZ2h0AFkJdmVjM19kb3duAFoHdmVjM191cABbCXZlYzNfYmFjawBcDHZlYzNfZm9yd2FyZABdFHZlYzNfY2FtZXJhX3Bvc2l0aW9uAF4SdmVjM19jYW1lcmFfdGFyZ2V0AF8SdmVjM19jYW1lcmFfdXBfZGlyAGAIdmVjNF9zZXQAPQl2ZWM0X3NldGkAYQh2ZWM0X2dldABiCG1hdDNfc2V0AGMJbWF0M19zZXRpAGQIbWF0M19nZXQAZQ1tYXQzX2lkZW50aXR5AGYJbWF0M196ZXJvAGcIbWF0NF9zZXQAaAltYXQ0X3NldGkAaQhtYXQ0X2dldABqDW1hdDRfaWRlbnRpdHkAawltYXQ0X3plcm8AbAh2ZWMyX25lZwBtCHZlYzNfbmVnAG4IdmVjNF9uZWcAbwh2ZWMyX2FkZABwCHZlYzNfYWRkAHEIdmVjNF9hZGQAcg92ZWMyX2FkZF9zY2FsYXIAcw92ZWMzX2FkZF9zY2FsYXIAdA92ZWM0X2FkZF9zY2FsYXIAdQh2ZWMyX3N1YgB2CHZlYzNfc3ViAHcIdmVjNF9zdWIAeA12ZWMyX3N1Yl9ub3JtAHkNdmVjM19zdWJfbm9ybQB6DXZlYzRfc3ViX25vcm0Aewh2ZWMyX211bAB8CHZlYzNfbXVsAH0IdmVjNF9tdWwAfgl2ZWMyX211bGkAfwl2ZWMzX211bGkAgAEJdmVjNF9tdWxpAIEBCHZlYzJfZGl2AIIBCHZlYzNfZGl2AIMBCHZlYzRfZGl2AIQBCXZlYzJfZGl2aQCFAQl2ZWMzX2RpdmkAhgEJdmVjNF9kaXZpAIcBCHZlYzJfZG90AIgBCHZlYzNfZG90AIkBCHZlYzRfZG90AIoBC3ZlYzJfZG90X3N0AIsBC3ZlYzNfZG90X3N0AIwBC3ZlYzRfZG90X3N0AIwBB3ZlYzJfZXEAjQEHdmVjM19lcQCOAQd2ZWM0X2VxAI8BCnZlYzJfZXFfc3QAkAEKdmVjM19lcV9zdACRAQp2ZWM0X2VxX3N0AJIBCHZlYzJfZXF6AJMBCHZlYzNfZXF6AJQBCHZlYzRfZXF6AJUBC3ZlYzJfZXF6X3N0AJYBC3ZlYzNfZXF6X3N0AJcBC3ZlYzRfZXF6X3N0AJgBCHZlYzJfbWFnAJkBCHZlYzNfbWFnAJoBCHZlYzRfbWFnAJsBC3ZlYzJfbWFnX3N0AJwBC3ZlYzNfbWFnX3N0AJ0BC3ZlYzRfbWFnX3N0AJ4BDHZlYzJfbWFnX3NxcgCfAQx2ZWMzX21hZ19zcXIAoAEMdmVjNF9tYWdfc3FyAKEBD3ZlYzJfbWFnX3Nxcl9zdACiAQ92ZWMzX21hZ19zcXJfc3QAowEPdmVjNF9tYWdfc3FyX3N0AKQBCXZlYzJfbm9ybQClAQl2ZWMzX25vcm0ApgEJdmVjNF9ub3JtAKcBDHZlYzRfbm9ybV9kcwCoAQl2ZWMyX2Rpc3QAqQEJdmVjM19kaXN0AKoBCXZlYzRfZGlzdACrAQx2ZWMyX2Rpc3Rfc3QArAEMdmVjM19kaXN0X3N0AK0BDHZlYzRfZGlzdF9zdACuAQp2ZWMyX2FuZ2xlAK8BCnZlYzNfYW5nbGUAsAEKdmVjNF9hbmdsZQCxAQ12ZWMyX2FuZ2xlX3N0ALIBDXZlYzNfYW5nbGVfc3QAswENdmVjNF9hbmdsZV9zdAC0AQp2ZWMzX2Nyb3NzALUBD3ZlYzNfY3Jvc3Nfbm9ybQC2AQl2ZWMyX2xlcnAAtwEJdmVjM19sZXJwALgBCXZlYzRfbGVycAC5AQhtYXQzX2RldAC6AQhtYXQ0X2RldAC7AQttYXQzX2RldF9zdAC8AQttYXQ0X2RldF9zdAC9AQ5tYXQzX3RyYW5zcF9kcwC+AQ5tYXQ0X3RyYW5zcF9kcwC/AQttYXQzX3RyYW5zcADAAQttYXQ0X3RyYW5zcADBAQxtYXQzX2lzX3plcm8AwgEMbWF0NF9pc196ZXJvAMMBD21hdDNfaXNfemVyb19zdADEAQ9tYXQ0X2lzX3plcm9fc3QAxQEQbWF0M19pc19pZGVudGl0eQDGARBtYXQ0X2lzX2lkZW50aXR5AMcBE21hdDNfaXNfaWRlbnRpdHlfc3QAyAETbWF0NF9pc19pZGVudGl0eV9zdADJAQhtYXQzX2ludgDKAQhtYXQ0X2ludgDLAQxtYXQzX2ludl9yb3QAzAEMbWF0NF9pbnZfcm90AM0BC21hdDRfaW52X2JkAM4BCW1hdDNfcHJvZADPAQltYXQ0X3Byb2QA0AEMbWF0M19tdWxfdmVjANEBDG1hdDRfbXVsX3ZlYwDSARZzZXRfcGVyc3BlY3RpdmVfY2FtZXJhANMBF3NldF9vcnRob2dyYXBoaWNfY2FtZXJhANQBE3NldF9jYW1lcmFfcG9zaXRpb24A1QEUc2V0X2NhbWVyYV9wb3NpdGlvbmkA1gETZ2V0X2NhbWVyYV9wb3NpdGlvbgDXARFzZXRfY2FtZXJhX3RhcmdldADYARJzZXRfY2FtZXJhX3RhcmdldGkA2QERZ2V0X2NhbWVyYV90YXJnZXQA2gERc2V0X2NhbWVyYV91cF9kaXIA2wESc2V0X2NhbWVyYV91cF9kaXJpANwBEWdldF9jYW1lcmFfdXBfZGlyAN0BCHNldF9mb3Z5AN4BCGdldF9mb3Z5AN8BCHNldF9mb3Z4AOABCGdldF9mb3Z4AOEBEHNldF9hc3BlY3RfcmF0aW8A4gEQZ2V0X2FzcGVjdF9yYXRpbwDjAQ5zZXRfbGVmdF9wbGFuZQDkAQ5nZXRfbGVmdF9wbGFuZQDlAQ9zZXRfcmlnaHRfcGxhbmUA5gEPZ2V0X3JpZ2h0X3BsYW5lAOcBEHNldF9ib3R0b21fcGxhbmUA6AEQZ2V0X2JvdHRvbV9wbGFuZQDpAQ1zZXRfdG9wX3BsYW5lAOoBDWdldF90b3BfcGxhbmUA6wEOc2V0X25lYXJfcGxhbmUA7AEOZ2V0X25lYXJfcGxhbmUA7QENc2V0X2Zhcl9wbGFuZQDuAQ1nZXRfZmFyX3BsYW5lAO8BDHNldF92aWV3cG9ydADwAQt2aWV3X21hdHJpeADxAQ92aWV3cG9ydF9tYXRyaXgA8gEScGVyc3BlY3RpdmVfbWF0cml4APMBE29ydGhvZ3JhcGhpY19tYXRyaXgA9AEQdmlld19wZXJzcGVjdGl2ZQD1ARF2aWV3X29ydGhvZ3JhcGhpYwD2AQ5tYXQzX2Zyb21fWFlaaQD3AQxtYXQzX2Zyb21fWGkA+AEMbWF0M19mcm9tX1lpAPkBDG1hdDNfZnJvbV9aaQD6AQ1tYXQzX2Zyb21fWFlpAPsBDW1hdDNfZnJvbV9YWmkA/AENbWF0M19mcm9tX1laaQD9ARJiaWxsYm9hcmRfYXJvdW5kX1gA/gESYmlsbGJvYXJkX2Fyb3VuZF9ZAP8BEmJpbGxib2FyZF9hcm91bmRfWgCAAhNiaWxsYm9hcmRfc3BoZXJpY2FsAIECD3RyYW5zZm9ybV9TWFlaVACCAg50cmFuc2Zvcm1fWFlaVACDAg10cmFuc2Zvcm1fU1hUAIQCDHRyYW5zZm9ybV9YVACFAg10cmFuc2Zvcm1fU1lUAIYCDHRyYW5zZm9ybV9ZVACHAg10cmFuc2Zvcm1fU1pUAIgCDHRyYW5zZm9ybV9aVACJAg50cmFuc2Zvcm1fU1hZVACKAg10cmFuc2Zvcm1fWFlUAIsCDnRyYW5zZm9ybV9TWFpUAIwCDXRyYW5zZm9ybV9YWlQAjQIOdHJhbnNmb3JtX1NZWlQAjgINdHJhbnNmb3JtX1laVACPAg10cmFuc2Zvcm1fU1FUAJACDHRyYW5zZm9ybV9RVACRAg10cmFuc2Zvcm1fU01UAJICDHRyYW5zZm9ybV9NVACTAhB0cmFuc2Zvcm1fVVNYWVpUAJQCDnRyYW5zZm9ybV9VU1hUAJUCDnRyYW5zZm9ybV9VU1lUAJYCDnRyYW5zZm9ybV9VU1pUAJcCD3RyYW5zZm9ybV9VU1hZVACYAg90cmFuc2Zvcm1fVVNYWlQAmQIPdHJhbnNmb3JtX1VTWVpUAJoCD3RyYW5zZm9ybV9zZXRfVACbAhJ0cmFuc2Zvcm1fYXBwbHlfU1EAnAIRdHJhbnNmb3JtX2FwcGx5X1EAnQISdHJhbnNmb3JtX2FwcGx5X1NNAJ4CEXRyYW5zZm9ybV9hcHBseV9NAJ8CGG5vcm1hbF9mcm9tX3RyYW5zZm9ybV9SVACgAhlub3JtYWxfZnJvbV90cmFuc2Zvcm1fU1JUAKECFG5vcm1hbF9mcm9tX3JvdGF0aW9uAKICDnF1YXRfZnJvbV9YWVppAKMCDHF1YXRfZnJvbV9YaQCkAgxxdWF0X2Zyb21fWWkApQIMcXVhdF9mcm9tX1ppAKYCDXF1YXRfZnJvbV9YWWkApwINcXVhdF9mcm9tX1haaQCoAg1xdWF0X2Zyb21fWVppAKkCCXF1YXRfcHJvZACqAgpxdWF0X2FuZ2xlAKsCDXF1YXRfYW5nbGVfc3QArAIIcXVhdF9pbnYArQILcXVhdF9pbnZfZHMArgIKcXVhdF9zbGVycACvAg5tYXQzX2Zyb21fcXVhdACwAg5tYXQ0X2Zyb21fcXVhdACxAg5tYXQzX2Zyb21fbWF0NACyAg5tYXQ0X2Zyb21fbWF0MwCzAg5xdWF0X2Zyb21fbWF0MwC0Ag5xdWF0X2Zyb21fbWF0NAC1Ag9zZXRfc2ltcGxlX3NlZWQAtgINc2ltcGxlX3JhbmRvbQC3AggBGgqV+gGnAgkAIAAoAgAQCAsJACAAKgIAEAkLEQAgACoCACAAQQRqKgIAEAoLGQAgACoCACAAQQRqKgIAIABBCGoqAgAQCwshACAAKgIAIABBBGoqAgAgAEEIaioCACAAQQxqKgIAEAwLSQAgACoCACAAQQRqKgIAIABBCGoqAgAgAEEMaioCACAAQRBqKgIAIABBFGoqAgAgAEEYaioCACAAQRxqKgIAIABBIGoqAgAQDQuBAQAgACoCACAAQQRqKgIAIABBCGoqAgAgAEEMaioCACAAQRBqKgIAIABBFGoqAgAgAEEYaioCACAAQRxqKgIAIABBIGoqAgAgAEEkaioCACAAQShqKgIAIABBLGoqAgAgAEEwaioCACAAQTRqKgIAIABBOGoqAgAgAEE8aioCABAOCyEAIAAqAgAgAEEEaioCACAAQQhqKgIAIABBDGoqAgAQDwtKAQF/Iw0iACMLRwRAA0AgAEEEakEANgIAIABBADYCACAAQQhqIgAjC0cNAAsLQQEkCiMMQQRrJA0jDUEANgIAIwwjC0EIazYCAAspABAQJAEjAEEQdCQLIwtBBGskDCMMIwtBCGs2AgAjDEEEayQNIw0kDguvAgEGfyAAQQBMBEBB7cKx4wZB78ahyQJBusDQwwZB5cCI4wZB78atgwJB89LpqwZBoNrVmwdB9MCIqwZBoOC9mwdB6eilswdB5dyAgQJBoMCAgQJBoMCAgQJBoMCAgQJBoMCAgQJBoMCAgQIQBwsjCiICRQRAQX8PCyMNQQRqIQEDQAJAIAEoAgAiBCAARiIGBEAjCiACayECIwpBAWskCiMNQQhqJA0MAQsgACAESQ0AIAJBAWsiAgRAIAFBCGohAQwCBUF/DwsACwsgAUEEayIDIAMoAgAiBSAAajYCACABIAQgAGs2AgAjCkUgBkVyBEAgBQ8LIAIEQANAIAMgA0EIayIDKAIANgIAIAEgAUEIayIBKAIANgIAIAJBAWsiAg0ACwUgA0EANgIACyAFC4AEAQd/IABBAEwEQEHtwrHjBkHvxv26B0Hp6KH7BUHh2KW7BkHu2pXzBkH00KTRA0Gg6KGrBkGgxLH7BkHj1oGZB0Hp9JWDAkHt6s2jB0GgxJWDAkHw3s3LBkH00tmrBkGuwICBAkGgwICBAhAHCyABQQBMBEBB7cKx4wZB78b9ugdB6eih+wVB4diluwZB7tqV8wZB9NCk0QNBoMTlowdB5cCE4wZB6c656wZB5dzRgwJB7erNowdBoMSVgwJB8N7NywZB9NLZqwZBrsCAgQJBoMCAgQIQBwsjCiIDRQRAQX8PCyMNQQRqIQIDQAJAIAJBBGsiBSgCACIGIAFvIgRFIAIoAgAiByAARnEiCARAIwogA2shAyMKQQFrJAojDUEIaiQNDAELIAAgByAEa0kEQCABIARrIQQMAQsgA0EBayIDBEAgAkEIaiECDAIFQX8PCwALCyABIARGIAhyBH8gBSAAIAZqNgIAIAIgByAAayIANgIAIABFBSMNQQhrJA0jDSAGNgIAIw1BBGogBDYCACAFIAQgBmoiASAAajYCACACIAcgACAEams2AgAjCkEBaiQKIAEPCyEAIwpFIABFcgRAIAYPCyADBEADQCAFIAVBCGsiBSgCADYCACACIAJBCGsiAigCADYCACADQQFrIgMNAAsFIAVBADYCAAsgBgsIAEEEQQQQHAsIAEEIQQQQHAsIAEEMQQQQHAsIAEEQQQQQHAsIAEEkQQQQHAsJAEHAAEEEEBwLHgEBf0EEQQQQHCIBQX9GBEBBfw8LIAEgADYCACABCx4BAX9BBEEEEBwiAUF/RgRAQX8PCyABIAA4AgAgAQsoAQF/QQhBBBAcIgJBf0YEQEF/DwsgAiAAOAIAIAJBBGogATgCACACCzIBAX9BDEEEEBwiA0F/RgRAQX8PCyADIAA4AgAgA0EEaiABOAIAIANBCGogAjgCACADCzwBAX9BDEEEEBwiBEF/RgRAQX8PCyAEIAA4AgAgBEEEaiABOAIAIARBCGogAjgCACAEQQxqIAM4AgAgBAtuAQF/QSRBBBAcIglBf0YEQEF/DwsgCSAAOAIAIAlBBGogATgCACAJQQhqIAI4AgAgCUEMaiADOAIAIAlBEGogBDgCACAJQRRqIAU4AgAgCUEYaiAGOAIAIAlBHGogBzgCACAJQSBqIAg4AgAgCQu1AQEBf0HAAEEEEBwiEEF/RgRAQX8PCyAQIAA4AgAgEEEEaiABOAIAIBBBCGogAjgCACAQQQxqIAM4AgAgEEEQaiAEOAIAIBBBFGogBTgCACAQQRhqIAY4AgAgEEEcaiAHOAIAIBBBIGogCDgCACAQQSRqIAk4AgAgEEEoaiAKOAIAIBBBLGogCzgCACAQQTBqIAw4AgAgEEE0aiANOAIAIBBBOGogDjgCACAQQTxqIA84AgAgEAs8AQF/QRBBBBAcIgRBf0YEQEF/DwsgBCAAOAIAIARBBGogATgCACAEQQhqIAI4AgAgBEEMaiADOAIAIAQLhgYBC38gAEHAAEggAUEATHIEQEHm5JWrBkGo0uiBAkHp2LGrBkHnwrGDAkHi2L2bBkHr2IDxBkHlzoWjB0Hp7JWDAkH2wrGrB0Hl5oGJBkHyyoHxBkHv6IGJBkHs2L27B0HlyLmBAkGgwICBAkGgwICBAhAHCyABIw5LBEBB5uSVqwZBqNLogQJB9NCVgwJB8+CVmwZB6cylqwZB5MCI4wZB78atgwJB5fCNqwZB5cjNgwJB9NCVgwJB7cLhywZB7eq1gwJB4ti9mwZB68DMywZB+sq5gQJBoMCAgQIQBwsgACABaiIIIw1BAWtKBEBB5uSVqwZBqNLogQJB6dixqwZB58KxgwJB4ti9mwZB69iAsQdB4djVqwZB88CUwwdB48qVowZBoMLZiwZB6cKJ4wZB5cC0qwZB7d7JywdBrsCAgQJBoMCAgQJBoMCAgQIQBwsjDSECIwoiBgRAA0AgAigCACIJIAJBBGooAgBqIgwgAEsgCCAJS3EgACAJRiAIIAxGcXIEQEHm5JWrBkGo0uiBAkH00JWDAkH03rWRBkHl2piTB0HlypHrAkHi2L2bBkHrwLyzB0Hl5LGLBkHw5oG5B0Hp6KGDAkHm5JWrBkGg2pXrBkHv5OXzAkGgwICBAkGgwICBAhAHCyAIIAlGBEAjCiAGa0EBaiEKIAIiBEEEaiEHBSAAIAxGBEAjCiAGa0EBaiELIAIiA0EEaiEFCwsgAkEIaiECIAZBAWsiBg0ACwsgCiALcQRAIAUoAgAgBygCAEkEfyAEIQAgAyEEIApBAWsFIAMhACALQQFrCyEDIARBBGogBSgCACAHKAIAIAFqajYCACADBEADQCAAIABBCGsoAgA2AgAgAEEEaiAAQQRrKAIANgIAIANBAWsiAw0ACwsjCkEBayQKIw1BCGokDQ8LIAsEQCAFIAUoAgAgAWo2AgAPCyAKBEAgBCAEKAIAIAFrNgIAIAcgBygCACABajYCAA8LIwpBAWokCiMNQQhrJA0jDSAANgIAIw1BBGogATYCAAsIACAAQQQQKwsIACAAQQgQKwsIACAAQQwQKwsIACAAQRAQKwsIACAAQSQQKwsJACAAQcAAECsLBAAgAAsHACAAQQRqCwcAIABBCGoLBwAgAEEMagsHACAAQRhqCwcAIABBEGoLBwAgAEEgagsHACAAQTBqCywAIAAgASoCADgCACAAQQRqIAFBBGoqAgA4AgAgAEEIaiABQQhqKgIAOAIACy8AIABBDGogASoCADgCACAAQRBqIAFBBGoqAgA4AgAgAEEUaiABQQhqKgIAOAIACy8AIABBGGogASoCADgCACAAQRxqIAFBBGoqAgA4AgAgAEEgaiABQQhqKgIAOAIACzwAIAAgASoCADgCACAAQQRqIAFBBGoqAgA4AgAgAEEIaiABQQhqKgIAOAIAIABBDGogAUEMaioCADgCAAs/ACAAQRBqIAEqAgA4AgAgAEEUaiABQQRqKgIAOAIAIABBGGogAUEIaioCADgCACAAQRxqIAFBDGoqAgA4AgALPwAgAEEgaiABKgIAOAIAIABBJGogAUEEaioCADgCACAAQShqIAFBCGoqAgA4AgAgAEEsaiABQQxqKgIAOAIACz8AIABBMGogASoCADgCACAAQTRqIAFBBGoqAgA4AgAgAEE4aiABQQhqKgIAOAIAIABBPGogAUEMaioCADgCAAsHACAAKAIACwwAIAAgASgCADYCAAsJACAAIAE2AgALFgAgACAAKAIAIAEoAgBqIgA2AgAgAAsTACAAIAAoAgAgAWoiADYCACAACwcAIAAqAgALDAAgACABKgIAOAIACwkAIAAgATgCAAsYAQF9IAAgACoCACABKgIAkiICOAIAIAILEwAgACAAKgIAIAGSIgE4AgAgAQscACAAIAEqAgA4AgAgAEEEaiABQQRqKgIAOAIACxMAIAAgATgCACAAQQRqIAI4AgALDwAgACoCACAAQQRqKgIACxkAIABDAAAAADgCACAAQQRqQwAAAAA4AgALGQAgAEMAAIA/OAIAIABBBGpDAACAPzgCAAsZACAAQwAAgL84AgAgAEEEakMAAAAAOAIACxkAIABDAACAPzgCACAAQQRqQwAAAAA4AgALGQAgAEMAAAAAOAIAIABBBGpDAACAvzgCAAsZACAAQwAAAAA4AgAgAEEEakMAAIA/OAIACx0AIAAgATgCACAAQQRqIAI4AgAgAEEIaiADOAIACxcAIAAqAgAgAEEEaioCACAAQQhqKgIACyYAIABDAAAAADgCACAAQQRqQwAAAAA4AgAgAEEIakMAAAAAOAIACyYAIABDAACAPzgCACAAQQRqQwAAgD84AgAgAEEIakMAAIA/OAIACyYAIABDAACA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AACAPyAClSIClDgCACAAQQRqIAFBBGoqAgAgApQ4AgAgAEEIaiABQQhqKgIAIAKUOAIAIABBDGogAUEMaioCACAClDgCAAsfACAAKgIAIAEqAgCUIABBBGoqAgAgAUEEaioCAJSSCzEAIAAqAgAgASoCAJQgAEEEaioCACABQQRqKgIAlJIgAEEIaioCACABQQhqKgIAlJILQwAgACoCACABKgIAlCAAQQRqKgIAIAFBBGoqAgCUkiAAQQhqKgIAIAFBCGoqAgCUkiAAQQxqKgIAIAFBDGoqAgCUkgskACAAIAEqAgAgAioCAJQgAUEEaioCACACQQRqKgIAlJI4AgALDgAgACABIAIQiQE4AgALJwAjDyAAKgIAIAEqAgCTi14jDyAAQQRqKgIAIAFBBGoqAgCTi15xC0cAIw8gACoCACABKgIAk4tdBEBBAA8LIw8gAEEEaioCACABQQRqKgIAk4tdBEBBAA8LIw8gAEEIaioCACABQQhqKgIAk4teC2IAIw8gACoCACABKgIAk4tdBEBBAA8LIw8gAEEEaioCACABQQRqKgIAk4tdBEBBAA8LIw8gAEEIaioCACABQQhqKgIAk4tdBEBBAA8LIw8gAEEMaioCACABQQxqKgIAk4teCw4AIAAgASACEI0BNgIACw4AIAAgASACEI4BNgIACw4AIAAgASACEI8BNgIACxgAIw8gACoCAIteIw8gAEEEaioCAItecQsvACMPIAAqAgCLXQRAQQAPCyMPIABBBGoqAgCLXQRAQQAPCyMPIABBCGoqAgCLXgtBACMPIAAqAgCLXQRAQQAPCyMPIABBBGoqAgCLXQRAQQAPCyMPIABBCGoqAgCLXQRAQQAPCyMPIABBDGoqAgCLXgsdACAAIw8gASoCAIteIw8gAUEEaioCAItecTYCAAsMACAAIAEQlAE2AgALDAAgACABEJUBNgIACx0BAX0gACoCACIBIAGUIABBBGoqAgAiASABlJKRCysBAX0gACoCACIBIAGUIABBBGoqAgAiASABlJIgAEEIaioCACIBIAGUkpELOQEBfSAAKgIAIgEgAZQgAEEEaioCACIBIAGUkiAAQQhqKgIAIgEgAZSSIABBDGoqAgAiASABlJKRCyIBAX0gACABKgIAIgIgApQgAUEEaioCACICIAKUkpE4AgALDAAgACABEJoB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aioCAJSSIAUgBJQgAiABlJMgAEEgaioCAJSSC44CAQ59IABBKGoqAgAiAyAAQTxqKgIAIgGUIABBOGoqAgAiBCAAQSxqKgIAIgKUkyILIABBFGoqAgAiBZQgAEEkaioCACIGIAGUIABBNGoqAgAiByAClJMiDCAAQRhqKgIAIgiUkyAGIASUIAcgA5STIg0gAEEcaioCACIJlJIgACoCAJQgAEEgaioCACIKIAGUIABBMGoqAgAiASAClJMiDiAIlCALIABBEGoqAgAiApQgCiAElCABIAOUkyIDIAmUkpMgAEEEaioCAJSSIAwgApQgDiAFlJMgCiAHlCABIAaUkyIBIAmUkiAAQQhqKgIAlJIgBSADlCACIA2UIAggAZSSkyAAQQxqKgIAlJILDAAgACABELoBOAIACwwAIAAgARC7ATgCAAtsAgF/AX0gAEEEaiIBKgIAIQIgASAAQQxqIgEqAgA4AgAgASACOAIAIABBCGoiASoCACECIAEgAEEYaiIBKgIAOAIAIAEgAjgCACAAQRRqIgEqAgAhAiABIABBHGoiACoCADgCACAAIAI4AgAL0gECAX8BfSAAQRBqIgEqAgAhAiABIABBBGoiASoCADgCACABIAI4AgAgAEEgaiIBKgIAIQIgASAAQQhqIgEqAgA4AgAgASACOAIAIABBMGoiASoCACECIAEgAEEMaiIBKgIAOAIAIAEgAjgCACAAQSRqIgEqAgAhAiABIABBGGoiASoCADgCACABIAI4AgAgAEE0aiIBKgIAIQIgASAAQRxqIgEqAgA4AgAgASACOAIAIABBOGoiASoCACECIAEgAEEsaiIAKgIAOAIAIAAgAjgCAAuMAQAgACABKgIAOAIAIABBBGogAUEMaioCADgCACAAQQhqIAFBGGoqAgA4AgAgAEEMaiABQQRqKgIAOAIAIABBEGogAUEQaioCADgCACAAQRRqIAFBHGoqAgA4AgAgAEEYaiABQQhqKgIAOAIAIABBHGogAUEUaioCADgCACAAQSBqIAFBIGoqAgA4AgAL/AEAIAAgASoCADgCACAAQRRqIAFBFGoqAgA4AgAgAEEoaiABQShqKgIAOAIAIABBPGogAUE8aioCADgCACAAQQRqIAFBEGoqAgA4AgAgAEEIaiABQSBqKgIAOAIAIABBDGogAUEwaioCADgCACAA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HCMboCANoqG2OAIAIABBBGogB0QAAAAAAADwPyMeIx2hoyICRAAAAAAAAABAoiIBorY4AgAgAEEUaiAJIAuiIgYgAaK2OAIAIABBJGogCiALoiIFIAGitjgCACAAQTRqIAcjEKIgBiMRoqAgBSMSoqCaIAGiIx4jHaAgAqKhtjgCACAAQQhqIAxEAAAAAAAA8D8jICMfoaMiAkQAAAAAAAAAwKIiAaK2OAIAIABBGGogAyABorY4AgAgAEEoaiAEIAGitjgCACAAQThqIAggAaIjICMfoCACoqG2OAIAIABBDGpDAAAAADgCACAAQRxqQwAAAAA4AgAgAEEsakMAAAAAOAIAIABBPGpDAACAPzgCAAvCAQEFfCABEAMhBCABEAQhBiACEAMhASACEAQhAiADEAMhBSADEAQhAyAAIAEgBaK2OAIAIABBBGogASADorY4AgAgAEEIaiACmrY4AgAgAEEMaiAGIAWiIgcgAqIgBCADoqG2OAIAIABBEGogBiADoiIIIAKiIAQgBaKgtjgCACAAQRRqIAYgAaK2OAIAIABBGGogCCAEIAKiIgIgBaKgtjgCACAAQRxqIAIgA6IgB6G2OAIAIABBIGogBCABorY4AgALfgIBfAF9IAEQAyECIAEQBCEBIABDAACAPzgCACAAQQRqQwAAAAA4AgAgAEEIakMAAAAAOAIAIABBDGpDAAAAADgCACAAQRBqIAK2IgM4AgAgAEEUaiABtjgCACAAQRhqQwAAAAA4AgAgAEEcaiABmrY4AgAgAEEgaiADOAIAC34CAXwBfSABEAMhAiABEAQhASAAIAK2IgM4AgAgAEEEakMAAAAAOAIAIABBCGogAZq2OAIAIABBDGpDAAAAADgCACAAQRBqQwAAgD84AgAgAEEUakMAAAAAOAIAIABBGGogAbY4AgAgAEEcakMAAAAAOAIAIABBIGogAzgCAAt+AgF8AX0gARADIQIgARAEIQEgACACtiIDOAIAIABBBGogAbY4AgAgAEEIakMAAAAAOAIAIABBDGogAZq2OAIAIABBEGogAzgCACAAQRRqQwAAAAA4AgAgAEEYakMAAAAAOAIAIABBHGpDAAAAADgCACAAQSBqQwAAgD84AgALjAEBAnwgARADIQMgARAEIQEgAhADIQQgAhAEIQIgACAEtjgCACAAQQRqQwAAAAA4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";

