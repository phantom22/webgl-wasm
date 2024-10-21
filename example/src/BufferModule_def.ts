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
    /** constructs a normal matrix from a given transform matrix that encodes scaling, rotation and translation. */
    normal_from_transform_USRT(dest:mat3ptr,transform_matrix_SRT:mat4ptr,uniform_scale:f32ptr): void;
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
    "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YWxsb2NfbWF0NAAiC21hbGxvY19xdWF0ACAHbmV3X2kzMgAjB25ld19mMzIAJAhuZXdfdmVjMgAlCG5ld192ZWMzACYIbmV3X3ZlYzQAJwhuZXdfbWF0MwAoCG5ld19tYXQ0ACkIbmV3X3F1YXQAKgRmcmVlACsIZnJlZV9pMzIALAhmcmVlX2YzMgAsCGZyZWVfZjY0AC0JZnJlZV92ZWMyAC0JZnJlZV92ZWMzAC4JZnJlZV92ZWM0AC8JZnJlZV9tYXQzADAJZnJlZV9tYXQ0ADEJZnJlZV9xdWF0AC8FZ2V0X3gAMgVnZXRfeQAzBWdldF96ADQFZ2V0X3cANQ1tYXQzX2dldF9jb2wxADINbWF0M19nZXRfY29sMgA1DW1hdDNfZ2V0X2NvbDMANg1tYXQ0X2dldF9jb2wxADINbWF0NF9nZXRfY29sMgA3DW1hdDRfZ2V0X2NvbDMAOA1tYXQ0X2dldF9jb2w0ADkNbWF0M19zZXRfY29sMQA6DW1hdDNfc2V0X2NvbDIAOw1tYXQzX3NldF9jb2wzADwNbWF0NF9zZXRfY29sMQA9DW1hdDRfc2V0X2NvbDIAPg1tYXQ0X3NldF9jb2wzAD8NbWF0NF9zZXRfY29sNABAB2kzMl9nZXQAQQdpMzJfc2V0AEIIaTMyX3NldGkAQwhpMzJfaW5jcgBECWkzMl9pbmNyaQBFB2YzMl9nZXQARgdmMzJfc2V0AEcIZjMyX3NldGkASAhmMzJfaW5jcgBJCWYzMl9pbmNyaQBKCHZlYzJfc2V0AEsJdmVjMl9zZXRpAEwIdmVjMl9nZXQATQl2ZWMyX3plcm8ATgh2ZWMyX29uZQBPCXZlYzJfbGVmdABQCnZlYzJfcmlnaHQAUQl2ZWMyX2Rvd24AUgd2ZWMyX3VwAFMIdmVjM19zZXQAOgl2ZWMzX3NldGkAVAh2ZWMzX2dldABVCXZlYzNfemVybwBWCHZlYzNfb25lAFcJdmVjM19sZWZ0AFgKdmVjM19yaWdodABZCXZlYzNfZG93bgBaB3ZlYzNfdXAAWwl2ZWMzX2JhY2sAXAx2ZWMzX2ZvcndhcmQAXRR2ZWMzX2NhbWVyYV9wb3NpdGlvbgBeEnZlYzNfY2FtZXJhX3RhcmdldABfEnZlYzNfY2FtZXJhX3VwX2RpcgBgCHZlYzRfc2V0AD0JdmVjNF9zZXRpAGEIdmVjNF9nZXQAYghtYXQzX3NldABjCW1hdDNfc2V0aQBkCG1hdDNfZ2V0AGUNbWF0M19pZGVudGl0eQBmCW1hdDNfemVybwBnCG1hdDRfc2V0AGgJbWF0NF9zZXRpAGkIbWF0NF9nZXQAag1tYXQ0X2lkZW50aXR5AGsJbWF0NF96ZXJvAGwIdmVjMl9uZWcAbQh2ZWMzX25lZwBuCHZlYzRfbmVnAG8IdmVjMl9hZGQAcAh2ZWMzX2FkZABxCHZlYzRfYWRkAHIPdmVjMl9hZGRfc2NhbGFyAHMPdmVjM19hZGRfc2NhbGFyAHQPdmVjNF9hZGRfc2NhbGFyAHUIdmVjMl9zdWIAdgh2ZWMzX3N1YgB3CHZlYzRfc3ViAHgNdmVjMl9zdWJfbm9ybQB5DXZlYzNfc3ViX25vcm0Aeg12ZWM0X3N1Yl9ub3JtAHsIdmVjMl9tdWwAfAh2ZWMzX211bAB9CHZlYzRfbXVsAH4JdmVjMl9tdWxpAH8JdmVjM19tdWxpAIABCXZlYzRfbXVsaQCBAQh2ZWMyX2RpdgCCAQh2ZWMzX2RpdgCDAQh2ZWM0X2RpdgCEAQl2ZWMyX2RpdmkAhQEJdmVjM19kaXZpAIYBCXZlYzRfZGl2aQCHAQh2ZWMyX2RvdACIAQh2ZWMzX2RvdACJAQh2ZWM0X2RvdACKAQt2ZWMyX2RvdF9zdACLAQt2ZWMzX2RvdF9zdACMAQt2ZWM0X2RvdF9zdACMAQd2ZWMyX2VxAI0BB3ZlYzNfZXEAjgEHdmVjNF9lcQCPAQp2ZWMyX2VxX3N0AJABCnZlYzNfZXFfc3QAkQEKdmVjNF9lcV9zdACSAQh2ZWMyX2VxegCTAQh2ZWMzX2VxegCUAQh2ZWM0X2VxegCVAQt2ZWMyX2Vxel9zdACWAQt2ZWMzX2Vxel9zdACXAQt2ZWM0X2Vxel9zdACYAQh2ZWMyX21hZwCZAQh2ZWMzX21hZwCaAQh2ZWM0X21hZwCbAQt2ZWMyX21hZ19zdACcAQt2ZWMzX21hZ19zdACdAQt2ZWM0X21hZ19zdACeAQx2ZWMyX21hZ19zcXIAnwEMdmVjM19tYWdfc3FyAKABDHZlYzRfbWFnX3NxcgChAQ92ZWMyX21hZ19zcXJfc3QAogEPdmVjM19tYWdfc3FyX3N0AKMBD3ZlYzRfbWFnX3Nxcl9zdACkAQl2ZWMyX25vcm0ApQEJdmVjM19ub3JtAKYBCXZlYzRfbm9ybQCnAQx2ZWM0X25vcm1fZHMAqAEJdmVjMl9kaXN0AKkBCXZlYzNfZGlzdACqAQl2ZWM0X2Rpc3QAqwEMdmVjMl9kaXN0X3N0AKwBDHZlYzNfZGlzdF9zdACtAQx2ZWM0X2Rpc3Rfc3QArgEKdmVjMl9hbmdsZQCvAQp2ZWMzX2FuZ2xlALABCnZlYzRfYW5nbGUAsQENdmVjMl9hbmdsZV9zdACyAQ12ZWMzX2FuZ2xlX3N0ALMBDXZlYzRfYW5nbGVfc3QAtAEKdmVjM19jcm9zcwC1AQ92ZWMzX2Nyb3NzX25vcm0AtgEJdmVjMl9sZXJwALcBCXZlYzNfbGVycAC4AQl2ZWM0X2xlcnAAuQEIbWF0M19kZXQAugEIbWF0NF9kZXQAuwELbWF0M19kZXRfc3QAvAELbWF0NF9kZXRfc3QAvQEObWF0M190cmFuc3BfZHMAvgEObWF0NF90cmFuc3BfZHMAvwELbWF0M190cmFuc3AAwAELbWF0NF90cmFuc3AAwQEMbWF0M19pc196ZXJvAMIBDG1hdDRfaXNfemVybwDDAQ9tYXQzX2lzX3plcm9fc3QAxAEPbWF0NF9pc196ZXJvX3N0AMUBEG1hdDNfaXNfaWRlbnRpdHkAxgEQbWF0NF9pc19pZGVudGl0eQDHARNtYXQzX2lzX2lkZW50aXR5X3N0AMgBE21hdDRfaXNfaWRlbnRpdHlfc3QAyQEIbWF0M19pbnYAygEIbWF0NF9pbnYAywEMbWF0M19pbnZfcm90AMwBDG1hdDRfaW52X3JvdADNAQttYXQ0X2ludl9iZADOAQltYXQzX3Byb2QAzwEJbWF0NF9wcm9kANABDG1hdDNfbXVsX3ZlYwDRAQxtYXQ0X211bF92ZWMA0gEWc2V0X3BlcnNwZWN0aXZlX2NhbWVyYQDTARdzZXRfb3J0aG9ncmFwaGljX2NhbWVyYQDUARNzZXRfY2FtZXJhX3Bvc2l0aW9uANUBFHNldF9jYW1lcmFfcG9zaXRpb25pANYBE2dldF9jYW1lcmFfcG9zaXRpb24A1wERc2V0X2NhbWVyYV90YXJnZXQA2AESc2V0X2NhbWVyYV90YXJnZXRpANkBEWdldF9jYW1lcmFfdGFyZ2V0ANoBEXNldF9jYW1lcmFfdXBfZGlyANsBEnNldF9jYW1lcmFfdXBfZGlyaQDcARFnZXRfY2FtZXJhX3VwX2RpcgDdAQhzZXRfZm92eQDeAQhnZXRfZm92eQDfAQhzZXRfZm92eADgAQhnZXRfZm92eADhARBzZXRfYXNwZWN0X3JhdGlvAOIBEGdldF9hc3BlY3RfcmF0aW8A4wEOc2V0X2xlZnRfcGxhbmUA5AEOZ2V0X2xlZnRfcGxhbmUA5QEPc2V0X3JpZ2h0X3BsYW5lAOYBD2dldF9yaWdodF9wbGFuZQDnARBzZXRfYm90dG9tX3BsYW5lAOgBEGdldF9ib3R0b21fcGxhbmUA6QENc2V0X3RvcF9wbGFuZQDqAQ1nZXRfdG9wX3BsYW5lAOsBDnNldF9uZWFyX3BsYW5lAOwBDmdldF9uZWFyX3BsYW5lAO0BDXNldF9mYXJfcGxhbmUA7gENZ2V0X2Zhcl9wbGFuZQDvAQxzZXRfdmlld3BvcnQA8AELdmlld19tYXRyaXgA8QEPdmlld3BvcnRfbWF0cml4APIBEnBlcnNwZWN0aXZlX21hdHJpeADzARNvcnRob2dyYXBoaWNfbWF0cml4APQBEHZpZXdfcGVyc3BlY3RpdmUA9QERdmlld19vcnRob2dyYXBoaWMA9gEObWF0M19mcm9tX1hZWmkA9wEMbWF0M19mcm9tX1hpAPgBDG1hdDNfZnJvbV9ZaQD5AQxtYXQzX2Zyb21fWmkA+gENbWF0M19mcm9tX1hZaQD7AQ1tYXQzX2Zyb21fWFppAPwBDW1hdDNfZnJvbV9ZWmkA/QESYmlsbGJvYXJkX2Fyb3VuZF9YAP4BEmJpbGxib2FyZF9hcm91bmRfWQD/ARJiaWxsYm9hcmRfYXJvdW5kX1oAgAITYmlsbGJvYXJkX3NwaGVyaWNhbACBAg90cmFuc2Zvcm1fU1hZWlQAggIOdHJhbnNmb3JtX1hZWlQAgwINdHJhbnNmb3JtX1NYVACEAgx0cmFuc2Zvcm1fWFQAhQINdHJhbnNmb3JtX1NZVACGAgx0cmFuc2Zvcm1fWVQAhwINdHJhbnNmb3JtX1NaVACIAgx0cmFuc2Zvcm1fWlQAiQIOdHJhbnNmb3JtX1NYWVQAigINdHJhbnNmb3JtX1hZVACLAg50cmFuc2Zvcm1fU1haVACMAg10cmFuc2Zvcm1fWFpUAI0CDnRyYW5zZm9ybV9TWVpUAI4CDXRyYW5zZm9ybV9ZWlQAjwINdHJhbnNmb3JtX1NRVACQAgx0cmFuc2Zvcm1fUVQAkQINdHJhbnNmb3JtX1NNVACSAgx0cmFuc2Zvcm1fTVQAkwIQdHJhbnNmb3JtX1VTWFlaVACUAg50cmFuc2Zvcm1fVVNYVACVAg50cmFuc2Zvcm1fVVNZVACWAg50cmFuc2Zvcm1fVVNaVACXAg90cmFuc2Zvcm1fVVNYWVQAmAIPdHJhbnNmb3JtX1VTWFpUAJkCD3RyYW5zZm9ybV9VU1laVACaAg90cmFuc2Zvcm1fc2V0X1QAmwISdHJhbnNmb3JtX2FwcGx5X1NRAJwCEXRyYW5zZm9ybV9hcHBseV9RAJ0CEnRyYW5zZm9ybV9hcHBseV9TTQCeAhF0cmFuc2Zvcm1fYXBwbHlfTQCfAhhub3JtYWxfZnJvbV90cmFuc2Zvcm1fUlQAoAIZbm9ybWFsX2Zyb21fdHJhbnNmb3JtX1NSVAChAhpub3JtYWxfZnJvbV90cmFuc2Zvcm1fVVNSVACiAhRub3JtYWxfZnJvbV9yb3RhdGlvbgCjAg5xdWF0X2Zyb21fWFlaaQCkAgxxdWF0X2Zyb21fWGkApQIMcXVhdF9mcm9tX1lpAKYCDHF1YXRfZnJvbV9aaQCnAg1xdWF0X2Zyb21fWFlpAKgCDXF1YXRfZnJvbV9YWmkAqQINcXVhdF9mcm9tX1laaQCqAglxdWF0X3Byb2QAqwIKcXVhdF9hbmdsZQCsAg1xdWF0X2FuZ2xlX3N0AK0CCHF1YXRfaW52AK4CC3F1YXRfaW52X2RzAK8CCnF1YXRfc2xlcnAAsAIObWF0M19mcm9tX3F1YXQAsQIObWF0NF9mcm9tX3F1YXQAsgIObWF0M19mcm9tX21hdDQAswIObWF0NF9mcm9tX21hdDMAtAIOcXVhdF9mcm9tX21hdDMAtQIOcXVhdF9mcm9tX21hdDQAtgIPc2V0X3NpbXBsZV9zZWVkALcCDXNpbXBsZV9yYW5kb20AuAIIARoKtvwBqAIJACAAKAIAEAgLCQAgACoCABAJCxEAIAAqAgAgAEEEaioCABAKCxkAIAAqAgAgAEEEaioCACAAQQhqKgIAEAsL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agsHACAAQRBqCwcAIABBIGoLBwAgAEEwagssACAAIAEqAgA4AgAgAEEEaiABQQRqKgIAOAIAIABBCGogAUEIaioCADgCAAsvACAAQQxqIAEqAgA4AgAgAEEQaiABQQRqKgIAOAIAIABBFGogAUEIaioCADgCAAsvACAAQRhqIAEqAgA4AgAgAEEcaiABQQRqKgIAOAIAIABBIGogAUEIaioCADgCAAs8ACAAIAEqAgA4AgAgAEEEaiABQQRqKgIAOAIAIABBCGogAUEIaioCADgCACAAQQxqIAFBDGoqAgA4AgALPwAgAEEQaiABKgIAOAIAIABBFGogAUEEaioCADgCACAAQRhqIAFBCGoqAgA4AgAgAEEcaiABQQxqKgIAOAIACz8AIABBIGogASoCADgCACAAQSRqIAFBBGoqAgA4AgAgAEEoaiABQQhqKgIAOAIAIABBLGogAUEMaioCADgCAAs/ACAAQTBqIAEqAgA4AgAgAEE0aiABQQRqKgIAOAIAIABBOGogAUEIaioCADgCACAAQTxqIAFBDGoqAgA4AgALBwAgACgCAAsMACAAIAEoAgA2AgALCQAgACABNgIACxYAIAAgACgCACABKAIAaiIANgIAIAALEwAgACAAKAIAIAFqIgA2AgAgAAsHACAAKgIACwwAIAAgASoCADgCAAsJACAAIAE4AgALGAEBfSAAIAAqAgAgASoCAJIiAjgCACACCxMAIAAgACoCACABkiIBOAIAIAELHAAgACABKgIAOAIAIABBBGogAUEEaioCADgCAAsTACAAIAE4AgAgAEEEaiACOAIACw8AIAAqAgAgAEEEaioCAAsZACAAQwAAAAA4AgAgAEEEakMAAAAAOAIACxkAIABDAACAPzgCACAAQQRqQwAAgD84AgALGQAgAEMAAIC/OAIAIABBBGpDAAAAADgCAAsZACAAQwAAgD84AgAgAEEEakMAAAAAOAIACxkAIABDAAAAADgCACAAQQRqQwAAgL84AgALGQAgAEMAAAAAOAIAIABBBGpDAACAPzgCAAsdACAAIAE4AgAgAEEEaiACOAIAIABBCGogAzgCAAsXACAAKgIAIABBBGoqAgAgAEEIaioCAAsmACAAQwAAAAA4AgAgAEEEakMAAAAAOAIAIABBCGpDAAAAADgCAAsmACAAQwAAgD84AgAgAEEEakMAAIA/OAIAIABBCGpDAACAPzgCAAsmACAAQwAAgL84AgAgAEEEakMAAAAAOAIAIABBCGpDAAAAADgCAAsmACAAQwAAgD84AgAgAEEEakMAAAAAOAIAIABBCGpDAAAAADgCAAsmACAAQwAAAAA4AgAgAEEEakMAAIC/OAIAIABBCGpDAAAAADgCAAsmACAAQwAAAAA4AgAgAEEEakMAAIA/OAIAIABBCGpDAAAAADgCAAsmACAAQwAAAAA4AgAgAEEEakMAAAAAOAIAIABBCGpDAACAvzgCAAsmACAAQwAAAAA4AgAgAEEEakMAAAAAOAIAIABBCGpDAACAPzgCAAsgACAAIxC2OAIAIABBBGojEbY4AgAgAEEIaiMStjgCAAsgACAAIxO2OAIAIABBBGojFLY4AgAgAEEIaiMVtjgCAAsgACAAIxa2OAIAIABBBGojF7Y4AgAgAEEIaiMYtjgCAAsnACAAIAE4AgAgAEEEaiACOAIAIABBCGogAzgCACAAQQxqIAQ4AgALHwAgACoCACAAQQRqKgIAIABBCGoqAgAgAEEMaioCAAuMAQAgACABKgIAOAIAIABBBGogAUEEaioCADgCACAAQQhqIAFBCGoqAgA4AgAgAEEMaiABQQxqKgIAOAIAIABBEGogAUEQaioCADgCACAAQRRqIAFBFGoqAgA4AgAgAEEYaiABQRhqKgIAOAIAIABBHGogAUEcaioCADgCACAAQSBqIAFBIGoqAgA4AgALWQAgACABOAIAIABBBGogAjgCACAAQQhqIAM4AgAgAEEMaiAEOAIAIABBEGogBTgCACAAQRRqIAY4AgAgAEEYaiAHOAIAIABBHGogCDgCACAAQSBqIAk4AgALRwAgACoCACAAQQRqKgIAIABBCGoqAgAgAEEMaioCACAAQRBqKgIAIABBFGoqAgAgAEEYaioCACAAQRxqKgIAIABBIGoqAgALdAAgAEMAAIA/OAIAIABBBGpDAAAAADgCACAAQQhqQwAAAAA4AgAgAEEMakMAAAAAOAIAIABBEGpDAACAPzgCACAAQRRqQwAAAAA4AgAgAEEYakMAAAAAOAIAIABBHGpDAAAAADgCACAAQSBqQwAAgD84AgALdAAgAEMAAAAAOAIAIABBBGpDAAAAADgCACAAQQhqQwAAAAA4AgAgAEEMakMAAAAAOAIAIABBEGpDAAAAADgCACAAQRRqQwAAAAA4AgAgAEEYakMAAAAAOAIAIABBHGpDAAAAADgCACAAQSBqQwAAAAA4AgAL/AEAIAAgASoCADgCACAAQQRqIAFBBGoqAgA4AgAgAEEIaiABQQhqKgIAOAIAIABBDGogAUEMaioCADgCACAAQRBqIAFBEGoqAgA4AgAgAEEUaiABQRRqKgIAOAIAIABBGGogAUEYaioCADgCACAAQRxqIAFBHGoqAgA4AgAgAEEgaiABQSBqKgIAOAIAIABBJGogAUEkaioCADgCACAAQShqIAFBKGoqAgA4AgAgAEEsaiABQSxqKgIAOAIAIABBMGogAUEwaioCADgCACAAQTRqIAFBNGoqAgA4AgAgAEE4aiABQThqKgIAOAIAIABBPGogAUE8aioCADgCAAufAQAgACABOAIAIABBBGogAjgCACAAQQhqIAM4AgAgAEEMaiAEOAIAIABBEGogBTgCACAAQRRqIAY4AgAgAEEYaiAHOAIAIABBHGogCDgCACAAQSBqIAk4AgAgAEEkaiAKOAIAIABBKGogCzgCACAAQSxqIAw4AgAgAEEwaiANOAIAIABBNGogDjgCACAAQThqIA84AgAgAEE8aiAQOAIAC38AIAAqAgAgAEEEaioCACAAQQhqKgIAIABBDGoqAgAgAEEQaioCACAAQRRqKgIAIABBGGoqAgAgAEEcaioCACAAQSBqKgIAIABBJGoqAgAgAEEoaioCACAAQSxqKgIAIABBMGoqAgAgAEE0aioCACAAQThqKgIAIABBPGoqAgALzwEAIABDAACAPzgCACAAQQRqQwAAAAA4AgAgAEEIakMAAAAAOAIAIABBDGpDAAAAADgCACAAQRBqQwAAAAA4AgAgAEEUakMAAIA/OAIAIABBGGpDAAAAADgCACAAQRxqQwAAAAA4AgAgAEEgakMAAAAAOAIAIABBJGpDAAAAADgCACAAQShqQwAAgD84AgAgAEEsakMAAAAAOAIAIABBMGpDAAAAADgCACAAQTRqQwAAAAA4AgAgAEE4akMAAAAAOAIAIABBPGpDAACAPzgCAAvPAQAgAEMAAAAAOAIAIABBBGpDAAAAADgCACAAQQhqQwAAAAA4AgAgAEEMakMAAAAAOAIAIABBEGpDAAAAADgCACAAQRRqQwAAAAA4AgAgAEEY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IAIQAyEEIAIQBCECIAAgBLY4AgAgAEEEakMAAAAAOAIAIABBCGogApq2OAIAIABBDGogASACorY4AgAgAEEQaiADtjgCACAAQRRqIAEgBKK2OAIAIABBGGogAyACorY4AgAgAEEcaiABmrY4AgAgAEEgaiADIASitjgCAAuMAQECfCABEAMhAyABEAQhASACEAMhBCACEAQhAiAAIAS2OAIAIABBBGogAyACorY4AgAgAEEIaiABIAKitjgCACAAQQxqIAKatjgCACAAQRBqIAMgBKK2OAIAIABBFGogASAEorY4AgAgAEEYakMAAAAAOAIAIABBHGogAZq2OAIAIABBIGogA7Y4AgALjAEBAnwgARADIQMgARAEIQEgAhADIQQgAhAEIQIgACADIASitjgCACAAQQRqIAK2OAIAIABBCGogASAEopq2OAIAIABBDGogAyACopq2OAIAIABBEGogBLY4AgAgAEEUaiABIAKitjgCACAAQRhqIAG2OAIAIABBHGpDAAAAADgCACAAQSBqIAO2OAIAC7sBAQV9IABBGGpDAACAvyABQQRqKgIAIxG2kyIDIAOUIAFBCGoqAgAjEraTIgQgBJSSIgYgASoCACMQtpMiAiAClJKRlSIFIAKUOAIAIABBHGogBSADlDgCACAAQSBqIAUgBJQ4AgAgAEEQakMAAIA/IAaRlSICIASUjDgCACAAQRRqIAIgA5Q4AgAgAEMAAIA/OAIAIABBBGpDAAAAADgCACAAQQhqQwAAAAA4AgAgAEEMakMAAAAAOAIAC7sBAQV9IABBGGpDAACAPyMQtiABKgIAkyIDIAOUIxK2IAFBCGoqAgCTIgQgBJSSIgYjEbYgAUEEaioCAJMiAiAClJKRlSIFIAOUOAIAIABBHGogBSAClDgCACAAQSBqIAUgBJQ4AgAgAEMAAIA/IAaRlSICIASUOAIAIABBCGogAiADlIw4AgAgAEEEakMAAAAAOAIAIABBDGpDAAAAADgCACAAQRBqQwAAgD84AgAgAEEUakMAAAAAOAIAC50BAQN9IABDAACAPyMQtiABKgIAkyICIAKUIxG2IAFBBGoqAgCTIgMgA5SSkZUiBCADlIw4AgAgAEEEaiAEIAKUIgI4AgAgAEEMaiACOAIAIABBEGogBCADlDgCACAAQQhqQwAAAAA4AgAgAEEUakMA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";

