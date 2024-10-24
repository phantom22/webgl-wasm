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