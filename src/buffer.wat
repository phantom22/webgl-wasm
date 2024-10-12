;; the suffix '_st' refers to functions that store a single value into the 
;;     target address instead of directly returning it from the stack.
;;
;; the suffix '_ds' refers to destructive functions that write directly to the
;;     provided offset.
;;
;; the suffin 'i' refers to the immediate value arguments, expected by the
;;     function.
;;
;; the commented number value present at the beginning of functions formatted
;;     like so '(;<number><+additional calls>;)' refers to the number of the 
;;     instructions present in the function body, note that this value does not
;;     reflect the number of instructions traversed based on conditional
;;     branches or in loop blocks, finally this number does not reflect local
;;     variables declaration. 
(module
    (import "Math" "acos" (func $acosf32 (param f32) (result f32)))
    (import "Math" "tan" (func $tan (param f64) (result f64)))
    (import "Math" "atan" (func $atan (param f64) (result f64)))
    (import "Math" "cos" (func $cos (param f64) (result f64)))
    (import "Math" "sin" (func $sin (param f64) (result f64)))
    (import "Math" "cos" (func $cosf32 (param f32) (result f32)))
    (import "Math" "sin" (func $sinf32 (param f32) (result f32)))

    (import "Wasm" "throw_64char_error_from_i32x16" (func $throw_64ch_i32x16 (param i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32)))
    ;;(import "Wasm" "log_i32_array" (func $log_i32_array (param i32 i32)))
    (import "Wasm" "log_number" (func $_log_i32 (param i32)))
    (import "Wasm" "log_number" (func $_log_f32 (param f32)))
    (import "Wasm" "log_number" (func $_log_f64 (param f64)))
    (import "Wasm" "log_vec2" (func $_log_vec2 (param f32 f32)))
    (import "Wasm" "log_vec3" (func $_log_vec3 (param f32 f32 f32)))
    (import "Wasm" "log_vec4" (func $_log_vec4 (param f32 f32 f32 f32)))
    (import "Wasm" "log_mat3" (func $_log_mat3 (param f32 f32 f32 f32 f32 f32 f32 f32 f32)))
    (import "Wasm" "log_mat4" (func $_log_mat4 (param f32 f32 f32 f32 f32 f32 f32 f32 f32 f32 f32 f32 f32 f32 f32 f32)))
    (import "Wasm" "log_quat" (func $_log_quat (param f32 f32 f32 f32)))
    
    (import "env" "memory" (memory 1))
    (import "env" "page_count" (global $page_count i32))

    (import "Date" "now" (func $date_now (result i32)))

    (global $simple_seed (mut i32) (i32.const 0))
    
    (global (export "SIZEOF_I32") i32 (i32.const 4))    
    (global (export "SIZEOF_F32") i32 (i32.const 4))
    (global (export "SIZEOF_F64") i32 (i32.const 8))
    (global (export "SIZEOF_VEC2") i32 (i32.const 8))
    (global (export "SIZEOF_VEC3") i32 (i32.const 12))
    (global (export "SIZEOF_VEC4") i32 (i32.const 16))
    (global (export "SIZEOF_MAT3") i32 (i32.const 36))
    (global (export "SIZEOF_MAT4") i32 (i32.const 64))
    (global (export "SIZEOF_QUAT") i32 (i32.const 16))

    (func $i32_log (;2+jscall;) (export "i32_log") (param $from i32)
        local.get $from
        i32.load
        call $_log_i32
    )

    (func $f32_log (;2+jscall;) (export "f32_log") (param $from i32)
        local.get $from
        f32.load
        call $_log_f32
    )

    (func $f64_log (;2+jscall;) (export "f64_log") (param $from i32)
        local.get $from
        f64.load
        call $_log_f64
    )

    (func $vec2_log (;6+jscall;) (export "vec2_log") (param $from i32)
        local.get $from
        f32.load
        local.get $from
        i32.const 4
        i32.add
        f32.load
        call $_log_vec2
    )

    (func $vec3_log (;10+jscall;) (export "vec3_log") (param $from i32)
        local.get $from
        f32.load
        local.get $from
        i32.const 4
        i32.add
        f32.load
        local.get $from
        i32.const 8
        i32.add
        f32.load
        call $_log_vec3
    )

    (func $vec4_log (;14+jscall;) (export "vec4_log") (param $from i32)
        local.get $from
        f32.load
        local.get $from
        i32.const 4
        i32.add
        f32.load
        local.get $from
        i32.const 8
        i32.add
        f32.load
        local.get $from
        i32.const 12
        i32.add
        f32.load
        call $_log_vec4
    )

    (func $mat3_log (;34+jscall;) (export "mat3_log") (param $from i32)
        local.get $from
        f32.load
        local.get $from
        i32.const 4
        i32.add
        f32.load
        local.get $from
        i32.const 8
        i32.add
        f32.load
        local.get $from
        i32.const 12
        i32.add
        f32.load
        local.get $from
        i32.const 16
        i32.add
        f32.load
        local.get $from
        i32.const 20
        i32.add
        f32.load
        local.get $from
        i32.const 24
        i32.add
        f32.load
        local.get $from
        i32.const 28
        i32.add
        f32.load
        local.get $from
        i32.const 32
        i32.add
        f32.load
        call $_log_mat3
    )

    (func $mat4_log (;62+jscall;) (export "mat4_log") (param $from i32)
        local.get $from
        f32.load
        local.get $from
        i32.const 4
        i32.add
        f32.load
        local.get $from
        i32.const 8
        i32.add
        f32.load
        local.get $from
        i32.const 12
        i32.add
        f32.load
        local.get $from
        i32.const 16
        i32.add
        f32.load
        local.get $from
        i32.const 20
        i32.add
        f32.load
        local.get $from
        i32.const 24
        i32.add
        f32.load
        local.get $from
        i32.const 28
        i32.add
        f32.load
        local.get $from
        i32.const 32
        i32.add
        f32.load
        local.get $from
        i32.const 36
        i32.add
        f32.load
        local.get $from
        i32.const 40
        i32.add
        f32.load
        local.get $from
        i32.const 44
        i32.add
        f32.load
        local.get $from
        i32.const 48
        i32.add
        f32.load
        local.get $from
        i32.const 52
        i32.add
        f32.load
        local.get $from
        i32.const 56
        i32.add
        f32.load
        local.get $from
        i32.const 60
        i32.add
        f32.load
        call $_log_mat4
    )

    (func $quat_log (;14+jscall;) (export "quat_log") (param $from i32)
        local.get $from
        f32.load
        local.get $from
        i32.const 4
        i32.add
        f32.load
        local.get $from
        i32.const 8
        i32.add
        f32.load
        local.get $from
        i32.const 12
        i32.add
        f32.load
        call $_log_quat
    )

    ;; Current length of the free_blocks_list length, situated at the end of the memory block.
    (global $fb_list_length (export "free_blocks_list_length") (mut i32) (i32.const 1))

    ;; Memory size in bytes (initialized by $init).
    (global $mem_size (export "memory_size") (mut i32) (i32.const 0))
    ;; Memory offset to the last 4 bytes in memory (initialized by $init).
    (global $mem_last_i32_offset (export "memory_last_i32_offset") (mut i32) (i32.const 0))
    ;; free_blocks_list offset (initialized by $init).
    (global $fb_list_offset (export "free_blocks_list_offset") (mut i32) (i32.const 0))
    ;; needed in the specific case where the free_blocks_list length is 0.
    (global $max_block_size (export "max_block_size") (mut i32) (i32.const 0))

    ;;(global $f64_eq_tolerance (export "f64_eq_tolerance") (mut f64) (f64.const 1e-7))
    (global $f32_eq_tolerance (export "f32_eq_tolerance") (mut f32) (f32.const 1e-7))

    ;;(func $log_fb_array (;4+jscall;) (export "log_free_blocks_array")
    ;;    global.get $fb_list_offset
    ;;    global.get $fb_list_length
    ;;    i32.const 2
    ;;    i32.mul
    ;;    call $log_i32_array
    ;;)

    ;;(func $blockn_size (;6;) (export "blockn_size") (param $n i32) (result i32)
    ;;    global.get $mem_last_i32_offset
    ;;    local.get $n
    ;;    i32.const 8
    ;;    i32.mul
    ;;    i32.sub
    ;;    i32.load
    ;;)

    ;;(func $blockn_offset(;8;) (export "blockn_offset") (param $n i32) (result i32)
    ;;    global.get $mem_last_i32_offset
    ;;    i32.const 4
    ;;    i32.sub
    ;;    local.get $n
    ;;    i32.const 8
    ;;    i32.mul
    ;;    i32.sub
    ;;    i32.load
    ;;)

    (func $reset_memory (;37;) (export "reset_memory")
        (local $offset i32)

        global.get $fb_list_offset
        local.tee $offset
        global.get $mem_size
        ;; erase array contents only if free_blocks_array length > 0
        i32.ne
        if
            (loop $reset_list
                local.get $offset
                local.get $offset
                i32.const 4
                i32.add
                i32.const 0
                i32.store
                i32.const 0
                i32.store

                local.get $offset
                i32.const 8
                i32.add
                local.tee $offset

                global.get $mem_size
                i32.ne
                br_if $reset_list
            )
        end

        i32.const 1
        global.set $fb_list_length

        global.get $mem_last_i32_offset
        i32.const 4
        i32.sub
        global.set $fb_list_offset

        global.get $fb_list_offset
        i32.const 0
        i32.store

        global.get $mem_last_i32_offset
        global.get $mem_size
        ;; accounts the initial free blocks list length.
        i32.const 8
        i32.sub
        i32.store
    )

    (func $init (;26;)
        call $date_now
        global.set $simple_seed
        ;; mem_size = page_count * 65536
        global.get $page_count
        i32.const 65536
        i32.mul
        global.set $mem_size
        ;; mem_last_i32_offset = mem_size - 132
        global.get $mem_size
        i32.const 4
        i32.sub
        global.set $mem_last_i32_offset
        ;; [...,0,mem_size-8]
        global.get $mem_last_i32_offset
        global.get $mem_size
        i32.const 8
        i32.sub
        i32.store
        ;; fb_list_offset = mem_last_i32_offset - 8
        global.get $mem_last_i32_offset
        i32.const 4
        i32.sub
        global.set $fb_list_offset

        global.get $fb_list_offset
        global.set $max_block_size
    )

    (start $init)

    (func $malloc (;127;) (export "malloc") (param $size i32) (result i32)
        (local $i i32) (local $block_size_offset i32) (local $block_size i32)
        (local $block_offset i32) (local $block_offset_offset i32) (local $eq_block_size i32)

        local.get $size
        i32.const 1
        i32.lt_s
        if
            ;; "malloc(): the block size must be positive."
            i32.const 0x6C6C616D
            i32.const 0x2928636F
            i32.const 0x6874203A
            i32.const 0x6C622065
            i32.const 0x206B636F
            i32.const 0x657A6973
            i32.const 0x73756D20
            i32.const 0x65622074
            i32.const 0x736F7020
            i32.const 0x76697469
            i32.const 0x20202E65
            i32.const 0x20202020
            i32.const 0x20202020
            i32.const 0x20202020
            i32.const 0x20202020
            i32.const 0x20202020
            call $throw_64ch_i32x16
        end

        ;; i = free_blocks.length
        global.get $fb_list_length
        local.tee $i
        i32.eqz
        ;; if free_blocks_length == 0, fail
        if
            ;; "malloc() failed: insufficient memory avaiable."
            ;; i32.const 0x6C6C616D
            ;; i32.const 0x2928636F
            ;; i32.const 0x69616620
            ;; i32.const 0x3A64656C
            ;; i32.const 0x736E6920
            ;; i32.const 0x69666675
            ;; i32.const 0x6E656963
            ;; i32.const 0x656D2074
            ;; i32.const 0x79726F6D
            ;; i32.const 0x61766120
            ;; i32.const 0x6C626169
            ;; i32.const 0x20202E65
            ;; i32.const 0x20202020
            ;; i32.const 0x20202020
            ;; i32.const 0x20202020
            ;; i32.const 0x20202020
            ;; call $warn_64ch_i32x16
            i32.const -1
            return
        end

        ;; block_size_offset = fb_list_offset + 4
        global.get $fb_list_offset
        i32.const 4
        i32.add
        local.set $block_size_offset

        ;; i = fb.list_length
        ;; block_size_offset = first from the list
        ;; while i > 0
        ;; if block_size == size
        ;;     break
        ;; if size < block_size
        ;;     break
        ;; offset += 8
        ;; i--
        ;; if i == 0
        ;;     return -1
        ;; 
        (block $get_block
            (loop $get_block_loop
                ;; block_size
                local.get $block_size_offset
                i32.load
                local.tee $block_size
                ;; size == block_size
                local.get $size
                i32.eq
                local.tee $eq_block_size
                if 
                    ;; i = number of blocks traversed
                    global.get $fb_list_length
                    local.get $i
                    i32.sub
                    local.set $i
                    ;; decrement length of fb_list
                    global.get $fb_list_length
                    i32.const 1
                    i32.sub
                    global.set $fb_list_length
                    ;; update free_blocks_list_offset, by incrementing it
                    global.get $fb_list_offset
                    i32.const 8
                    i32.add
                    global.set $fb_list_offset
                    br $get_block
                end

                ;; size < block 
                local.get $size
                local.get $block_size
                i32.lt_u
                if
                    br $get_block
                end

                local.get $i
                i32.const 1
                i32.sub
                local.tee $i
                i32.eqz
                ;; traversed the entire free_blocks_list, nothing found, fail
                if
                    ;; "malloc() failed: insufficient memory avaiable."
                    ;; i32.const 0x6C6C616D
                    ;; i32.const 0x2928636F
                    ;; i32.const 0x69616620
                    ;; i32.const 0x3A64656C
                    ;; i32.const 0x736E6920
                    ;; i32.const 0x69666675
                    ;; i32.const 0x6E656963
                    ;; i32.const 0x656D2074
                    ;; i32.const 0x79726F6D
                    ;; i32.const 0x61766120
                    ;; i32.const 0x6C626169
                    ;; i32.const 0x20202E65
                    ;; i32.const 0x20202020
                    ;; i32.const 0x20202020
                    ;; i32.const 0x20202020
                    ;; i32.const 0x20202020
                    ;; call $warn_64ch_i32x16
                    i32.const -1
                    return
                end

                local.get $block_size_offset
                i32.const 8
                i32.add
                local.set $block_size_offset

                br $get_block_loop
            )
        )

        local.get $block_size_offset
        i32.const 4
        i32.sub
        local.tee $block_offset_offset
        local.get $block_offset_offset
        i32.load
        local.tee $block_offset
        local.get $size
        ;; update block offset
        i32.add
        i32.store

        ;; decrease block size
        local.get $block_size_offset
        local.get $block_size
        local.get $size
        i32.sub
        i32.store

        global.get $fb_list_length
        i32.eqz
        local.get $eq_block_size
        i32.eqz
        i32.or
        ;; if fb_list_length == 0 || !eq_block_size, no need for shifting the list
        if
            ;; call $log_fb_array
            local.get $block_offset
            return
        end
        ;; eq_block_size is true
        
        local.get $i
        i32.eqz
        ;; entries to be removed from the list are exactly at the list start
        if
            ;; erase leftmost block data, to prevent undefined behaviour
            ;; only need to reset block offset since size was already updated to 0
            local.get $block_offset_offset
            i32.const 0
            i32.store
        else
            ;; i = number of blocks that were traversed before finding the suitable one
            (loop $shift_fb_list_one_right
                ;; memory[block_offset_offset] = memory[block_offset_offset-8]
                ;; block_offset_offset = block_offset_offset - 8
                local.get $block_offset_offset
                local.get $block_offset_offset
                i32.const 8
                i32.sub
                local.tee $block_offset_offset
                i32.load
                i32.store
                ;; memory[block_size_offset] = memory[block_size_offset-8]
                ;; block_size_offset = block_size_offset - 8
                local.get $block_size_offset
                local.get $block_size_offset
                i32.const 8
                i32.sub
                local.tee $block_size_offset
                i32.load
                i32.store

                ;; decrement i
                local.get $i
                i32.const 1
                i32.sub
                ;; if i > 0, continue loop
                local.tee $i
                i32.const 0
                i32.gt_u
                br_if $shift_fb_list_one_right
            )
        end

        ;; call $log_fb_array

        local.get $block_offset
    )

    (func $malloc_i32 (;128+call;) (export "malloc_i32") (result i32)
        i32.const 4
        call $malloc
    )

    (func $malloc_f32 (;128+call;) (export "malloc_f32") (result i32)
        i32.const 4
        call $malloc
    )

    (func $malloc_f64 (;128+call;) (export "malloc_f64") (result i32)
        i32.const 8
        call $malloc
    )

    (func $malloc_vec2 (;128+call;) (export "malloc_vec2") (result i32)
        i32.const 8
        call $malloc
    )

    (func $malloc_vec3 (;128+call;) (export "malloc_vec3") (result i32)
        i32.const 12
        call $malloc
    )

    (func $malloc_vec4 (;128+call;) (export "malloc_vec4") (result i32)
        i32.const 16
        call $malloc
    )

    (func $malloc_mat3 (;128+call;) (export "malloc_mat3") (result i32)
        i32.const 36
        call $malloc
    )

    (func $malloc_mat4 (;128+call;) (export "malloc_mat4") (result i32)
        i32.const 64
        call $malloc
    )

    (func $malloc_quat (;128+call;) (export "malloc_quat") (result i32)
        i32.const 16
        call $malloc
    )

    (func $new_i32 (;139+call;) (export "new_i32") (param i32) (result i32)
        (local $dest i32)
        i32.const 4
        call $malloc
        local.tee $dest
        i32.const -1
        i32.eq
        if
            i32.const -1
            return
        end
        local.get $dest
        local.get 0
        i32.store
        local.get $dest
    )

    (func $new_f32 (;139+call;) (export "new_f32") (param f32) (result i32)
        (local $dest i32)
        i32.const 4
        call $malloc
        local.tee $dest
        i32.const -1
        i32.eq
        if
            i32.const -1
            return
        end
        local.get $dest
        local.get 0
        f32.store
        local.get $dest
    )

    (func $new_f64 (;139+call;) (export "new_f64") (param f64) (result i32)
        (local $dest i32)
        i32.const 8
        call $malloc
        local.tee $dest
        i32.const -1
        i32.eq
        if
            i32.const -1
            return
        end
        local.get $dest
        local.get 0
        f64.store
        local.get $dest
    )

    (func $new_vec2 (;143+call;) (export "new_vec2") (param f32 f32) (result i32)
        (local $dest i32)
        i32.const 8
        call $malloc
        local.tee $dest
        i32.const -1
        i32.eq
        if
            i32.const -1
            return
        end

        local.get $dest
        local.get 0
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        local.get 1
        f32.store

        local.get $dest
    )

    (func $new_vec3 (;148+call;) (export "new_vec3") (param f32 f32 f32) (result i32)
        (local $dest i32)
        i32.const 12
        call $malloc
        local.tee $dest
        i32.const -1
        i32.eq
        if
            i32.const -1
            return
        end

        local.get $dest
        local.get 0
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        local.get 1
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        local.get 2
        f32.store

        local.get $dest
    )

    (func $new_vec4 (;153+call;) (export "new_vec4") (param f32 f32 f32 f32) (result i32)
        (local $dest i32)
        i32.const 12
        call $malloc
        local.tee $dest
        i32.const -1
        i32.eq
        if
            i32.const -1
            return
        end

        local.get $dest
        local.get 0
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        local.get 1
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        local.get 2
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        local.get 3
        f32.store

        local.get $dest
    )

    (func $new_mat3 (;178+call;) (export "new_mat3") (param f32 f32 f32 f32 f32 f32 f32 f32 f32) (result i32)
        (local $dest i32)
        i32.const 36
        call $malloc
        local.tee $dest
        i32.const -1
        i32.eq
        if
            i32.const -1
            return
        end

        local.get $dest
        local.get 0
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        local.get 1
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        local.get 2
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        local.get 3
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        local.get 4
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        local.get 5
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        local.get 6
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        local.get 7
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        local.get 8
        f32.store

        local.get $dest
    )

    (func $new_mat4 (;213+call;) (export "new_mat4") (param f32 f32 f32 f32 f32 f32 f32 f32 f32 f32 f32 f32 f32 f32 f32 f32) (result i32)
        (local $dest i32)
        i32.const 64
        call $malloc
        local.tee $dest
        i32.const -1
        i32.eq
        if
            i32.const -1
            return
        end

        local.get $dest
        local.get 0
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        local.get 1
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        local.get 2
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        local.get 3
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        local.get 4
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        local.get 5
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        local.get 6
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        local.get 7
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        local.get 8
        f32.store

        local.get $dest
        i32.const 36
        i32.add
        local.get 9
        f32.store

        local.get $dest
        i32.const 40
        i32.add
        local.get 10
        f32.store

        local.get $dest
        i32.const 44
        i32.add
        local.get 11
        f32.store

        local.get $dest
        i32.const 48
        i32.add
        local.get 12
        f32.store

        local.get $dest
        i32.const 52
        i32.add
        local.get 13
        f32.store

        local.get $dest
        i32.const 56
        i32.add
        local.get 14
        f32.store

        local.get $dest
        i32.const 60
        i32.add
        local.get 15
        f32.store

        local.get $dest
    )

    (func $new_quat (;153+call;) (export "new_quat") (param $x f32) (param $y f32) (param $z f32) (param $w f32) (result i32)
        (local $dest i32)
        i32.const 16
        call $malloc
        local.tee $dest
        i32.const -1
        i32.eq
        if
            i32.const -1
            return
        end

        local.get $dest
        local.get $x
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        local.get $y
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        local.get $z
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        local.get $w
        f32.store

        local.get $dest
    )

    (func $free (;286;) (export "free") (param $block_start i32) (param $block_size i32)
        (local $block_end i32) (local $last_valid_byte i32) 
        (local $i i32) 
        (local $left i32) (local $left_block_offset_offset i32) (local $left_block_size_offset i32) 
        (local $right i32) (local $right_block_offset_offset i32) (local $right_block_size_offset i32)
        (local $t_start_offset i32) (local $t_start i32) (local $t_end i32) (local $t_size i32)
        (local $biggest_block_offset_offset i32) (local $smallest_block_offset_offset i32) (local $merge_index i32)        
        local.get $block_start
        i32.const 64
        i32.lt_s
        local.get $block_size
        i32.const 0
        i32.le_s
        i32.or
        ;; if block_start < 64 | block_size <= 0, fail
        if
            ;; "free(): illegal block, negative values are not allowed."
            i32.const 0x65657266
            i32.const 0x203A2928
            i32.const 0x656C6C69
            i32.const 0x206C6167
            i32.const 0x636F6C62
            i32.const 0x6E202C6B
            i32.const 0x74616765
            i32.const 0x20657669
            i32.const 0x756C6176
            i32.const 0x61207365
            i32.const 0x6E206572
            i32.const 0x6120746F
            i32.const 0x776F6C6C
            i32.const 0x202E6465
            i32.const 0x20202020
            i32.const 0x20202020
            call $throw_64ch_i32x16
        end

        local.get $block_size
        global.get $max_block_size
        i32.gt_u
        if
            ;; "free(): the specified block exceeds the maximum block size."
            i32.const 0x65657266
            i32.const 0x203A2928
            i32.const 0x20656874
            i32.const 0x63657073
            i32.const 0x65696669
            i32.const 0x6C622064
            i32.const 0x206B636F
            i32.const 0x65637865
            i32.const 0x20736465
            i32.const 0x20656874
            i32.const 0x6978616D
            i32.const 0x206D756D
            i32.const 0x636F6C62
            i32.const 0x6973206B
            i32.const 0x202E657A
            i32.const 0x20202020
            call $throw_64ch_i32x16
        end

        ;; last_valid_byte
        global.get $fb_list_offset
        i32.const 1
        i32.sub
        ;; block_end
        local.get $block_start
        local.get $block_size
        i32.add
        local.tee $block_end
        i32.lt_s
        ;; if last_valid_byte < block_end, fail
        if
            ;; "free(): illegal block, values exceed avaiable memory."
            i32.const 0x65657266
            i32.const 0x203A2928
            i32.const 0x656C6C69
            i32.const 0x206C6167
            i32.const 0x636F6C62
            i32.const 0x76202C6B
            i32.const 0x65756C61
            i32.const 0x78652073
            i32.const 0x64656563
            i32.const 0x61766120
            i32.const 0x6C626169
            i32.const 0x656D2065
            i32.const 0x79726F6D
            i32.const 0x2020202E
            i32.const 0x20202020
            i32.const 0x20202020
            call $throw_64ch_i32x16
        end

        global.get $fb_list_offset
        local.set $t_start_offset

        global.get $fb_list_length
        local.set $i

        ;; if the free_blocks_list is empty, no need to check adjacency/correctness
        local.get $i
        i32.const 0
        i32.gt_u
        if
            (loop $find_adjacent_blocks
                ;; block_offset_offset
                local.get $t_start_offset
                ;; block_offset
                i32.load
                local.tee $t_start
                ;; block_size
                local.get $t_start_offset
                i32.const 4
                i32.add
                i32.load
                local.tee $t_size
                i32.add
                local.tee $t_end
                ;; check for illegal block intersection (not adjacency)
                ;; INTERSECTION_WITH_EXISTING_BLOCK := (t_end > block_start) && (block_end > t_start)
                local.get $block_start
                i32.gt_u
                local.get $block_end
                local.get $t_start
                i32.gt_u
                i32.and
                ;; EXISTING_FREE_BLOCK := block_start == t_start && block_end == t_end
                local.get $block_start
                local.get $t_start
                i32.eq
                local.get $block_end
                local.get $t_end
                i32.eq
                i32.and
                i32.or
                ;; INTERSECTION_WITH_EXISTING_BLOCK | EXISTING_FREE_BLOCK, fail
                if
                    ;; "free(): the to-be-freed-block overlaps with free memory."
                    i32.const 0x65657266
                    i32.const 0x203A2928
                    i32.const 0x20656874
                    i32.const 0x622D6F74
                    i32.const 0x72662D65
                    i32.const 0x2D646565
                    i32.const 0x636F6C62
                    i32.const 0x766F206B
                    i32.const 0x616C7265
                    i32.const 0x77207370
                    i32.const 0x20687469
                    i32.const 0x65657266
                    i32.const 0x6D656D20
                    i32.const 0x2E79726F
                    i32.const 0x20202020
                    i32.const 0x20202020
                    call $throw_64ch_i32x16
                end

                local.get $block_end
                local.get $t_start
                i32.eq
                if
                    ;; +1 to ensure that i32.and works correctly
                    ;; right = num_traversed_blocks + 1
                    global.get $fb_list_length
                    local.get $i
                    i32.sub
                    i32.const 1
                    i32.add
                    local.set $right

                    local.get $t_start_offset
                    local.tee $right_block_offset_offset
                    i32.const 4
                    i32.add
                    local.set $right_block_size_offset
                else
                    local.get $t_end
                    local.get $block_start
                    i32.eq
                    if
                        ;; +1 to ensure that i32.and works correctly
                        ;; left = num_blocks_traversed + 1
                        global.get $fb_list_length
                        local.get $i
                        i32.sub
                        i32.const 1
                        i32.add
                        local.set $left

                        local.get $t_start_offset
                        local.tee $left_block_offset_offset
                        i32.const 4
                        i32.add
                        local.set $left_block_size_offset
                    end
                end

                local.get $t_start_offset
                i32.const 8
                i32.add
                local.set $t_start_offset

                ;; while i > 0
                local.get $i
                i32.const 1
                i32.sub
                local.tee $i
                i32.const 0
                i32.gt_u
                br_if $find_adjacent_blocks
            )
        end

        local.get $left
        local.get $right
        i32.and
        if
            ;; find what is smallest block between the two adjacent ones
            ;; smallest block = rightmost in the array
            local.get $left_block_size_offset
            i32.load
            local.get $right_block_size_offset
            i32.load
            i32.lt_u
            if
                local.get $right_block_offset_offset
                local.set $biggest_block_offset_offset

                local.get $left_block_offset_offset
                local.set $smallest_block_offset_offset
                ;; num_blocks_traversed aka how many block to shift from left to right in the array
                ;; right-1 = num_blocks_traversed
                local.get $right
                i32.const 1
                i32.sub
                local.set $merge_index
                
            else
                local.get $left_block_offset_offset
                local.set $biggest_block_offset_offset

                local.get $right_block_offset_offset
                local.set $smallest_block_offset_offset
                ;; num_blocks_traversed aka how many block to shift from left to right in the array
                ;; left-1 = num_blocks_traversed
                local.get $left
                i32.const 1
                i32.sub
                local.set $merge_index
            end
            ;; update the existing entry in the array (smallest block, which is leftmost)
            ;; more specifically, just the new size. Since the block offset remains the same.
            local.get $smallest_block_offset_offset
            i32.const 4
            i32.add
            ;; get new block size, which is the sume of the two adjacent ones plus the block_size passed to the func
            local.get $left_block_size_offset
            i32.load
            local.get $right_block_size_offset
            i32.load
            local.get $block_size
            i32.add
            i32.add
            i32.store

            ;; offset to start from must be the biggest_block_entry, then go retroactively by traversed_blocks_count
            ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
            ;; shift one right, from start to biggest_block_entry - 1
            ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
            local.get $biggest_block_offset_offset
            local.set $t_start_offset
            
            local.get $merge_index ;; traversed blocks count
            i32.const 0
            i32.gt_u
            if
                (loop $shift_fb_list_one_right
                    ;; copy left entry offset to current entry offset
                    local.get $t_start_offset
                    local.get $t_start_offset
                    i32.const 8
                    i32.sub
                    i32.load
                    i32.store
                    ;; copy left entry size to current entry size
                    local.get $t_start_offset
                    i32.const 4
                    i32.add
                    local.get $t_start_offset
                    i32.const 4
                    i32.sub
                    i32.load
                    i32.store
                    ;; continue while merge_index > 0
                    local.get $merge_index
                    i32.const 1
                    i32.sub
                    local.tee $merge_index
                    i32.const 0
                    i32.gt_u
                    br_if $shift_fb_list_one_right
                )
            end
            ;; need to merge two blocks into one
            ;; decrement fb_list_length
            global.get $fb_list_length
            i32.const 1
            i32.sub
            global.set $fb_list_length
            ;; increment fb_list_offset
            global.get $fb_list_offset
            i32.const 8
            i32.add
            global.set $fb_list_offset
            ;; call $log_fb_array
            ;; one of the two blocks is the left-most in the list, no need to shift list
            ;; reorder list block size
            return
        end

        local.get $left
        if
            ;; increment left_block size
            local.get $left_block_size_offset
            local.get $left_block_size_offset
            i32.load
            local.get $block_size
            i32.add
            i32.store

            ;; call $log_fb_array

            ;; reorder list block size
            return
        end

        local.get $right
        if
            ;; decrement right_block offset
            local.get $right_block_offset_offset
            local.get $right_block_offset_offset
            i32.load
            local.get $block_size
            i32.sub
            i32.store
            ;; increment right_block size
            local.get $right_block_size_offset
            local.get $right_block_size_offset
            i32.load
            local.get $block_size
            i32.add
            i32.store

            ;; call $log_fb_array
            
            ;; reorder list block size
            return
        end

        ;; block not adjacent to anything
        ;; increment fb_list_length
        global.get $fb_list_length
        i32.const 1
        i32.add
        global.set $fb_list_length
        ;; decremenet fb_list_offset
        global.get $fb_list_offset
        i32.const 8
        i32.sub
        global.set $fb_list_offset
        ;; add new entries
        global.get $fb_list_offset
        local.get $block_start
        i32.store
        global.get $fb_list_offset
        i32.const 4
        i32.add
        local.get $block_size
        i32.store

        ;; call $log_fb_array

        ;; reorder list block size
    )

    (func $free_i32 (;288+call;) (export "free_i32") (param $offset i32)
        local.get $offset
        i32.const 4
        call $free
    )

    (func $free_f32 (;288+call;) (export "free_f32") (param $offset i32)
        local.get $offset
        i32.const 4
        call $free
    )

    (func $free_f64 (;288+call;) (export "free_f64") (param $offset i32)
        local.get $offset
        i32.const 8
        call $free
    )

    (func $free_vec2 (;288+call;) (export "free_vec2") (param $offset i32)
        local.get $offset
        i32.const 8
        call $free
    )

    (func $free_vec3 (;288+call;) (export "free_vec3") (param $offset i32)
        local.get $offset
        i32.const 12
        call $free
    )

    (func $free_vec4 (;288+call;) (export "free_vec4") (param $offset i32)
        local.get $offset
        i32.const 16
        call $free
    )

    (func $free_mat3 (;288+call;) (export "free_mat3") (param $offset i32)
        local.get $offset
        i32.const 36
        call $free
    )

    (func $free_mat4 (;288+call;) (export "free_mat4") (param $offset i32)
        local.get $offset
        i32.const 64
        call $free
    )

    (func $free_quat (;288+call;) (export "free_quat") (param $offset i32)
        local.get $offset
        i32.const 16
        call $free
    )

    (func (export "x") (param $from i32) (result f32)
        local.get $from
        f32.load
    )

    (func (export "y") (param $from i32) (result f32)
        local.get $from
        i32.const 4
        i32.add
        f32.load
    )

    (func (export "z") (param $from i32) (result f32)
        local.get $from
        i32.const 8
        i32.add
        f32.load
    )

    (func (export "w") (param $from i32) (result f32)
        local.get $from
        i32.const 12
        i32.add
        f32.load
    )

    (func $i32_get (;2;) (export "i32_get") (param $from i32) (result i32)
        local.get $from
        i32.load
    )

    (func $i32_set (;4;) (export "i32_set") (param $dest i32) (param $from i32)
        local.get $dest
        local.get $from
        i32.load
        i32.store
    )

    (func $i32_seti (;3;) (export "i32_seti") (param $dest i32) (param $val i32)
        local.get $dest
        local.get $val
        i32.store
    )

    (func $i32_incr (;9;) (export "i32_incr") (param $dest i32) (param $from i32) (result i32)
        (local $t i32)
        local.get $dest
        local.get $dest
        i32.load
        local.get $from
        i32.load
        i32.add
        local.tee $t
        i32.store
        local.get $t
    )

    (func $i32_incri (;8;) (export "i32_incri") (param $dest i32) (param $incr i32) (result i32)
        (local $t i32)
        local.get $dest
        local.get $dest
        i32.load
        local.get $incr
        i32.add
        local.tee $t
        i32.store
        local.get $t
    )

    (func $f32_get (;2;) (export "f32_get") (param $from i32) (result f32)
        local.get $from
        f32.load
    )

    (func $f32_set (;4;) (export "f32_set") (param $dest i32) (param $from i32)
        local.get $dest
        local.get $from
        f32.load
        f32.store
    )

    (func $f32_seti (;3;) (export "f32_seti") (param $dest i32) (param $val f32)
        local.get $dest
        local.get $val
        f32.store
    )

    (func $f32_incr (;9;) (export "f32_incr") (param $dest i32) (param $from i32) (result f32)
        (local $t f32)
        local.get $dest
        local.get $dest
        f32.load
        local.get $from
        f32.load
        f32.add
        local.tee $t
        f32.store
        local.get $t
    )

    (func $f32_incri (;8;) (export "f32_incri") (param $dest i32) (param $incr f32) (result f32)
        (local $t f32)
        local.get $dest
        local.get $dest
        f32.load
        local.get $incr
        f32.add
        local.tee $t
        f32.store
        local.get $t
    )

    (func $f64_get (;2;) (export "f64_get") (param $from i32) (result f64)
        local.get $from
        f64.load
    )

    (func $f64_set (;4;) (export "f64_set") (param $dest i32) (param $from i32)
        local.get $dest
        local.get $from
        f64.load
        f64.store
    )

    (func $f64_seti (;3;) (export "f64_seti") (param $dest i32) (param $val f64)
        local.get $dest
        local.get $val
        f64.store
    )

    (func $f64_incr (;9;) (export "f64_incr") (param $dest i32) (param $from i32) (result f64)
        (local $t f64)
        local.get $dest
        local.get $dest
        f64.load
        local.get $from
        f64.load
        f64.add
        local.tee $t
        f64.store
        local.get $t
    )

    (func $f64_incri (;8;) (export "f64_incri") (param $dest i32) (param $incr f64) (result f64)
        (local $t f64)
        local.get $dest
        local.get $dest
        f64.load
        local.get $incr
        f64.add
        local.tee $t
        f64.store
        local.get $t
    )

    (func $vec2_set (;12;) (export "vec2_set") (param $dest i32) (param $from i32)
        local.get $dest
        local.get $from
        f32.load
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        local.get $from
        i32.const 4
        i32.add
        f32.load
        f32.store
    )

    (func $vec2_seti (;8;) (export "vec2_seti") (param $dest i32) (param $x f32) (param $y f32)
        local.get $dest
        ;; v.x = x
        local.get $x
        f32.store
        ;; v.y = y
        local.get $dest
        i32.const 4
        i32.add
        local.get $y
        f32.store
    )

    (func $vec2_get (;6;) (export "vec2_get") (param $from i32) (result f32 f32)
        local.get $from
        f32.load
        local.get $from
        i32.const 4
        i32.add
        f32.load
    )

    (func $vec2_zero (;8;) (export "vec2_zero") (param $dest i32)
        local.get $dest
        f32.const 0.0
        f32.store
        local.get $dest
        i32.const 4
        i32.add
        f32.const 0.0
        f32.store
    )

    (func $vec2_one (;8;) (export "vec2_one") (param $dest i32)
        local.get $dest
        f32.const 1.0
        f32.store
        local.get $dest
        i32.const 4
        i32.add
        f32.const 1.0
        f32.store
    )

    (func $vec2_left (;8;) (export "vec2_left") (param $dest i32)
        local.get $dest
        f32.const -1.0
        f32.store
        local.get $dest
        i32.const 4
        i32.add
        f32.const 0.0
        f32.store
    )

    (func $vec2_right (;8;) (export "vec2_right") (param $dest i32)
        local.get $dest
        f32.const 1.0
        f32.store
        local.get $dest
        i32.const 4
        i32.add
        f32.const 0.0
        f32.store
    )

    (func $vec2_down (;8;) (export "vec2_down") (param $dest i32)
        local.get $dest
        f32.const 0.0
        f32.store
        local.get $dest
        i32.const 4
        i32.add
        f32.const -1.0
        f32.store
    )

    (func $vec2_up (;8;) (export "vec2_up") (param $dest i32)
        local.get $dest
        f32.const 0.0
        f32.store
        local.get $dest
        i32.const 4
        i32.add
        f32.const 1.0
        f32.store
    )

    (func $vec3_set (;20;) (export "vec3_set") (param $dest i32) (param $from i32)
        local.get $dest
        local.get $from
        f32.load
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        local.get $from
        i32.const 4
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        local.get $from
        i32.const 8
        i32.add
        f32.load
        f32.store
    )

    (func $vec3_seti (;13;) (export "vec3_seti") (param $dest i32) (param $x f32) (param $y f32) (param $z f32)
        ;; v.x = x
        local.get $dest
        local.get $x
        f32.store
        ;; v.y = y
        local.get $dest
        i32.const 4
        i32.add
        local.get $y
        f32.store
        ;; v.z = z
        local.get $dest
        i32.const 8
        i32.add
        local.get $z
        f32.store
    )

    (func $vec3_get (;10;) (export "vec3_get") (param $from i32) (result f32 f32 f32)
        local.get $from
        f32.load
        local.get $from
        i32.const 4
        i32.add
        f32.load
        local.get $from
        i32.const 8
        i32.add
        f32.load
    )

    (func $vec3_zero (;13;) (export "vec3_zero") (param $dest i32)
        local.get $dest
        f32.const 0.0
        f32.store
        local.get $dest
        i32.const 4
        i32.add
        f32.const 0.0
        f32.store
        local.get $dest
        i32.const 8
        i32.add
        f32.const 0.0
        f32.store
    )

    (func $vec3_one (;13;) (export "vec3_one") (param $dest i32)
        local.get $dest
        f32.const 1.0
        f32.store
        local.get $dest
        i32.const 4
        i32.add
        f32.const 1.0
        f32.store
        local.get $dest
        i32.const 8
        i32.add
        f32.const 1.0
        f32.store
    )

    (func $vec3_left (;13;) (export "vec3_left") (param $dest i32)
        local.get $dest
        f32.const -1.0
        f32.store
        local.get $dest
        i32.const 4
        i32.add
        f32.const 0.0
        f32.store
        local.get $dest
        i32.const 8
        i32.add
        f32.const 0.0
        f32.store
    )

    (func $vec3_right (;13;) (export "vec3_right") (param $dest i32)
        local.get $dest
        f32.const 1.0
        f32.store
        local.get $dest
        i32.const 4
        i32.add
        f32.const 0.0
        f32.store
        local.get $dest
        i32.const 8
        i32.add
        f32.const 0.0
        f32.store
    )

    (func $vec3_down (;13;) (export "vec3_down") (param $dest i32)
        local.get $dest
        f32.const 0.0
        f32.store
        local.get $dest
        i32.const 4
        i32.add
        f32.const -1.0
        f32.store
        local.get $dest
        i32.const 8
        i32.add
        f32.const 0.0
        f32.store
    )

    (func $vec3_up (;13;) (export "vec3_up") (param $dest i32)
        local.get $dest
        f32.const 0.0
        f32.store
        local.get $dest
        i32.const 4
        i32.add
        f32.const 1.0
        f32.store
        local.get $dest
        i32.const 8
        i32.add
        f32.const 0.0
        f32.store
    )

    (func $vec3_back (;13;) (export "vec3_back") (param $dest i32)
        local.get $dest
        f32.const 0.0
        f32.store
        local.get $dest
        i32.const 4
        i32.add
        f32.const 0.0
        f32.store
        local.get $dest
        i32.const 8
        i32.add
        f32.const -1.0
        f32.store
    )

    (func $vec3_forward (;13;) (export "vec3_forward") (param $dest i32)
        local.get $dest
        f32.const 0.0
        f32.store
        local.get $dest
        i32.const 4
        i32.add
        f32.const 0.0
        f32.store
        local.get $dest
        i32.const 8
        i32.add
        f32.const 1.0
        f32.store
    )

    (func $vec4_set (;28;) (export "vec4_set") (param $dest i32) (param $from i32)
        local.get $dest
        local.get $from
        f32.load
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        local.get $from
        i32.const 4
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        local.get $from
        i32.const 8
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        local.get $from
        i32.const 12
        i32.add
        f32.load
        f32.store
    )
    
    (func $vec4_seti (;18;) (export "vec4_seti") (param $dest i32) (param $x f32) (param $y f32) (param $z f32) (param $w f32)
        local.get $dest
        local.get $x
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        local.get $y
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        local.get $z
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        local.get $w
        f32.store
    )

    (func $vec4_get (;14;) (export "vec4_get") (param $from i32) (result f32 f32 f32 f32)
        local.get $from
        f32.load
        local.get $from
        i32.const 4
        i32.add
        f32.load
        local.get $from
        i32.const 8
        i32.add
        f32.load
        local.get $from
        i32.const 12
        i32.add
        f32.load
    )

    (func $mat3_set (;68;) (export "mat3_set") (param $dest i32) (param $from i32)
        local.get $dest
        local.get $from
        f32.load
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        local.get $from
        i32.const 4
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        local.get $from
        i32.const 8
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        local.get $from
        i32.const 12
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        local.get $from
        i32.const 16
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        local.get $from
        i32.const 20
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        local.get $from
        i32.const 24
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        local.get $from
        i32.const 28
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        local.get $from
        i32.const 32
        i32.add
        f32.load
        f32.store
    )

    (func $mat3_seti (;43;) (export "mat3_seti") (param $dest i32) (param f32 f32 f32 f32 f32 f32 f32 f32 f32)
        local.get $dest
        local.get 1
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        local.get 2
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        local.get 3
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        local.get 4
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        local.get 5
        f32.store
        
        local.get $dest
        i32.const 20
        i32.add
        local.get 6
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        local.get 7
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        local.get 8
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        local.get 9
        f32.store
    )

    (func $mat3_get (;34;) (export "mat3_get") (param $from i32) (result f32 f32 f32 f32 f32 f32 f32 f32 f32)
        local.get $from
        f32.load

        local.get $from
        i32.const 4
        i32.add
        f32.load

        local.get $from
        i32.const 8
        i32.add
        f32.load

        local.get $from
        i32.const 12
        i32.add
        f32.load

        local.get $from
        i32.const 16
        i32.add
        f32.load

        local.get $from
        i32.const 20
        i32.add
        f32.load

        local.get $from
        i32.const 24
        i32.add
        f32.load

        local.get $from
        i32.const 28
        i32.add
        f32.load

        local.get $from
        i32.const 32
        i32.add
        f32.load
    )

    (func $mat3_identity (;43;) (export "mat3_identity") (param $dest i32)
        local.get $dest
        f32.const 1.0
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        f32.const 1.0
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        f32.const 1.0
        f32.store
    )

    (func $mat3_zero (;43;) (export "mat3_zero") (param $dest i32)
        local.get $dest
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        f32.const 0.0
        f32.store
    )

    (func $mat4_set (;124;) (export "mat4_set") (param $dest i32) (param $from i32)
        local.get $dest
        local.get $from
        f32.load
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        local.get $from
        i32.const 4
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        local.get $from
        i32.const 8
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        local.get $from
        i32.const 12
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        local.get $from
        i32.const 16
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        local.get $from
        i32.const 20
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        local.get $from
        i32.const 24
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        local.get $from
        i32.const 28
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        local.get $from
        i32.const 32
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 36
        i32.add
        local.get $from
        i32.const 36
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 40
        i32.add
        local.get $from
        i32.const 40
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 44
        i32.add
        local.get $from
        i32.const 44
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 48
        i32.add
        local.get $from
        i32.const 48
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 52
        i32.add
        local.get $from
        i32.const 52
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 56
        i32.add
        local.get $from
        i32.const 56
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 60
        i32.add
        local.get $from
        i32.const 60
        i32.add
        f32.load
        f32.store
    )

    (func $mat4_seti (;78;) (export "mat4_seti") (param $dest i32) (param f32 f32 f32 f32 f32 f32 f32 f32 f32 f32 f32 f32 f32 f32 f32 f32)
        local.get $dest
        local.get 1
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        local.get 2
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        local.get 3
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        local.get 4
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        local.get 5
        f32.store
        
        local.get $dest
        i32.const 20
        i32.add
        local.get 6
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        local.get 7
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        local.get 8
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        local.get 9
        f32.store

        local.get $dest
        i32.const 36
        i32.add
        local.get 10
        f32.store

        local.get $dest
        i32.const 40
        i32.add
        local.get 11
        f32.store

        local.get $dest
        i32.const 44
        i32.add
        local.get 12
        f32.store

        local.get $dest
        i32.const 48
        i32.add
        local.get 13
        f32.store

        local.get $dest
        i32.const 52
        i32.add
        local.get 14
        f32.store

        local.get $dest
        i32.const 56
        i32.add
        local.get 15
        f32.store

        local.get $dest
        i32.const 60
        i32.add
        local.get 16
        f32.store
    )

    (func $mat4_get (;62;) (export "mat4_get") (param $from i32) (result f32 f32 f32 f32 f32 f32 f32 f32 f32 f32 f32 f32 f32 f32 f32 f32)
        local.get $from
        f32.load

        local.get $from
        i32.const 4
        i32.add
        f32.load

        local.get $from
        i32.const 8
        i32.add
        f32.load

        local.get $from
        i32.const 12
        i32.add
        f32.load

        local.get $from
        i32.const 16
        i32.add
        f32.load

        local.get $from
        i32.const 20
        i32.add
        f32.load

        local.get $from
        i32.const 24
        i32.add
        f32.load

        local.get $from
        i32.const 28
        i32.add
        f32.load

        local.get $from
        i32.const 32
        i32.add
        f32.load

        local.get $from
        i32.const 36
        i32.add
        f32.load

        local.get $from
        i32.const 40
        i32.add
        f32.load

        local.get $from
        i32.const 44
        i32.add
        f32.load

        local.get $from
        i32.const 48
        i32.add
        f32.load

        local.get $from
        i32.const 52
        i32.add
        f32.load

        local.get $from
        i32.const 56
        i32.add
        f32.load

        local.get $from
        i32.const 60
        i32.add
        f32.load
    )

    (func $mat4_identity (;78;) (export "mat4_identity") (param $dest i32)
        local.get $dest
        f32.const 1.0
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        f32.const 1.0
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 36
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 40
        i32.add
        f32.const 1.0
        f32.store

        local.get $dest
        i32.const 44
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 48
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 52
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 56
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 60
        i32.add
        f32.const 1.0
        f32.store
    )

    (func $mat4_zero (;78;) (export "mat4_zero") (param $dest i32)
        local.get $dest
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 36
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 40
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 44
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 48
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 52
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 56
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 60
        i32.add
        f32.const 0.0
        f32.store
    )

    (func $vec2_add (;20;) (export "vec2_add") (param $dest i32) (param $from_a i32) (param $from_b i32)
        ;; r.x = a.x + b.x
        local.get $dest
        local.get $from_a
        f32.load
        local.get $from_b
        f32.load
        f32.add
        f32.store
        ;; r.y = a.y + b.y
        local.get $dest
        i32.const 4
        i32.add
        local.get $from_a
        i32.const 4
        i32.add
        f32.load
        local.get $from_b
        i32.const 4
        i32.add
        f32.load
        f32.add
        f32.store
    )

    (func $vec3_add (;33;) (export "vec3_add") (param $dest i32) (param $from_a i32) (param $from_b i32)
        ;; r.x = a.x + b.x
        local.get $dest
        local.get $from_a
        f32.load
        local.get $from_b
        f32.load
        f32.add
        f32.store
        ;; r.y = a.y + b.y
        local.get $dest
        i32.const 4
        i32.add
        local.get $from_a
        i32.const 4
        i32.add
        f32.load
        local.get $from_b
        i32.const 4
        i32.add
        f32.load
        f32.add
        f32.store
        ;; r.z = a.z + b.z
        local.get $dest
        i32.const 8
        i32.add
        local.get $from_a
        i32.const 8
        i32.add
        f32.load
        local.get $from_b
        i32.const 8
        i32.add
        f32.load
        f32.add
        f32.store
    )

    (func $vec4_add (;46;) (export "vec4_add") (param $dest i32) (param $from_a i32) (param $from_b i32)
        ;; r.x = a.x + b.x
        local.get $dest
        local.get $from_a
        f32.load
        local.get $from_b
        f32.load
        f32.add
        f32.store
        ;; r.y = a.y + b.y
        local.get $dest
        i32.const 4
        i32.add
        local.get $from_a
        i32.const 4
        i32.add
        f32.load
        local.get $from_b
        i32.const 4
        i32.add
        f32.load
        f32.add
        f32.store
        ;; r.z = a.z + b.z
        local.get $dest
        i32.const 8
        i32.add
        local.get $from_a
        i32.const 8
        i32.add
        f32.load
        local.get $from_b
        i32.const 8
        i32.add
        f32.load
        f32.add
        f32.store
        ;; r.w = a.w + b.w
        local.get $dest
        i32.const 12
        i32.add
        local.get $from_a
        i32.const 12
        i32.add
        f32.load
        local.get $from_b
        i32.const 12
        i32.add
        f32.load
        f32.add
        f32.store
    )

    (func $vec2_sub (;20;) (export "vec2_sub") (param $dest i32) (param $from_a i32) (param $from_b i32)
        ;; r.x = a.x - b.x
        local.get $dest
        local.get $from_a
        f32.load
        local.get $from_b
        f32.load
        f32.sub
        f32.store
        ;; r.y = a.y - b.y
        local.get $dest
        i32.const 4
        i32.add
        local.get $from_a
        i32.const 4
        i32.add
        f32.load
        local.get $from_b
        i32.const 4
        i32.add
        f32.load
        f32.sub
        f32.store
    )

    (func $vec3_sub (;33;) (export "vec3_sub") (param $dest i32) (param $from_a i32) (param $from_b i32)
        ;; r.x = a.x + b.x
        local.get $dest
        local.get $from_a
        f32.load
        local.get $from_b
        f32.load
        f32.sub
        f32.store
        ;; r.y = a.y + b.y
        local.get $dest
        i32.const 4
        i32.add
        local.get $from_a
        i32.const 4
        i32.add
        f32.load
        local.get $from_b
        i32.const 4
        i32.add
        f32.load
        f32.sub
        f32.store
        ;; r.z = a.z + b.z
        local.get $dest
        i32.const 8
        i32.add
        local.get $from_a
        i32.const 8
        i32.add
        f32.load
        local.get $from_b
        i32.const 8
        i32.add
        f32.load
        f32.sub
        f32.store
    )

    (func $vec4_sub (;46;) (export "vec4_sub") (param $dest i32) (param $from_a i32) (param $from_b i32)
        ;; r.x = a.x + b.x
        local.get $dest
        local.get $from_a
        f32.load
        local.get $from_b
        f32.load
        f32.sub
        f32.store
        ;; r.y = a.y + b.y
        local.get $dest
        i32.const 4
        i32.add
        local.get $from_a
        i32.const 4
        i32.add
        f32.load
        local.get $from_b
        i32.const 4
        i32.add
        f32.load
        f32.sub
        f32.store
        ;; r.z = a.z + b.z
        local.get $dest
        i32.const 8
        i32.add
        local.get $from_a
        i32.const 8
        i32.add
        f32.load
        local.get $from_b
        i32.const 8
        i32.add
        f32.load
        f32.sub
        f32.store
        ;; r.w = a.w + b.w
        local.get $dest
        i32.const 12
        i32.add
        local.get $from_a
        i32.const 12
        i32.add
        f32.load
        local.get $from_b
        i32.const 12
        i32.add
        f32.load
        f32.sub
        f32.store
    )

    (func $vec2_mul (;18;) (export "vec2_mul") (param $dest i32) (param $from i32) (param $scalar i32)
        (local $t f32)
        ;; r.x = v.x * scalar
        local.get $dest
        local.get $from
        f32.load
        local.get $scalar
        f32.load
        local.tee $t
        f32.mul
        f32.store
        ;; r.y = v.y * scalar
        local.get $dest
        i32.const 4
        i32.add
        local.get $from
        i32.const 4
        i32.add
        f32.load
        local.get $t
        f32.mul
        f32.store
    )

    (func $vec3_mul (;28;) (export "vec3_mul") (param $dest i32) (param $from i32) (param $scalar i32)
        (local $t f32)
        ;; r.x = v.x * scalar
        local.get $dest
        local.get $from
        f32.load
        local.get $scalar
        f32.load
        local.tee $t
        f32.mul
        f32.store
        ;; r.y = v.y * scalar
        local.get $dest
        i32.const 4
        i32.add
        local.get $from
        i32.const 4
        i32.add
        f32.load
        local.get $t
        f32.mul
        f32.store
        ;; r.z = v.z * scalar
        local.get $dest
        i32.const 8
        i32.add
        local.get $from
        i32.const 8
        i32.add
        f32.load
        local.get $t
        f32.mul
        f32.store
    )

    (func $vec4_mul (;38;) (export "vec4_mul") (param $dest i32) (param $from i32) (param $scalar i32)
        (local $t f32)
        ;; r.x = v.x * scalar
        local.get $dest
        local.get $from
        f32.load
        local.get $scalar
        f32.load
        local.tee $t
        f32.mul
        f32.store
        ;; r.y = v.y * scalar
        local.get $dest
        i32.const 4
        i32.add
        local.get $from
        i32.const 4
        i32.add
        f32.load
        local.get $t
        f32.mul
        f32.store
        ;; r.z = v.z * scalar
        local.get $dest
        i32.const 8
        i32.add
        local.get $from
        i32.const 8
        i32.add
        f32.load
        local.get $t
        f32.mul
        f32.store
        ;; r.w = v.w * scalar
        local.get $dest
        i32.const 12
        i32.add
        local.get $from
        i32.const 12
        i32.add
        f32.load
        local.get $t
        f32.mul
        f32.store
    )

    (func $vec2_muli (;16;) (export "vec2_muli") (param $dest i32) (param $from i32) (param $scalar f32)
        ;; r.x = v.x * scalar
        local.get $dest
        local.get $from
        f32.load
        local.get $scalar
        f32.mul
        f32.store
        ;; r.y = v.y * scalar
        local.get $dest
        i32.const 4
        i32.add
        local.get $from
        i32.const 4
        i32.add
        f32.load
        local.get $scalar
        f32.mul
        f32.store
    )

    (func $vec3_muli (;26;) (export "vec3_muli") (param $dest i32) (param $from i32) (param $scalar f32)
        ;; r.x = v.x * scalar
        local.get $dest
        local.get $from
        f32.load
        local.get $scalar
        f32.mul
        f32.store
        ;; r.y = v.y * scalar
        local.get $dest
        i32.const 4
        i32.add
        local.get $from
        i32.const 4
        i32.add
        f32.load
        local.get $scalar
        f32.mul
        f32.store
        ;; r.z = v.z * scalar
        local.get $dest
        i32.const 8
        i32.add
        local.get $from
        i32.const 8
        i32.add
        f32.load
        local.get $scalar
        f32.mul
        f32.store
    )

    (func $vec4_muli (;36;) (export "vec4_muli") (param $dest i32) (param $from i32) (param $scalar f32)
        ;; r.x = v.x * scalar
        local.get $dest
        local.get $from
        f32.load
        local.get $scalar
        f32.mul
        f32.store
        ;; r.y = v.y * scalar
        local.get $dest
        i32.const 4
        i32.add
        local.get $from
        i32.const 4
        i32.add
        f32.load
        local.get $scalar
        f32.mul
        f32.store
        ;; r.z = v.z * scalar
        local.get $dest
        i32.const 8
        i32.add
        local.get $from
        i32.const 8
        i32.add
        f32.load
        local.get $scalar
        f32.mul
        f32.store
        ;; r.w = v.w * scalar
        local.get $dest
        i32.const 12
        i32.add
        local.get $from
        i32.const 12
        i32.add
        f32.load
        local.get $scalar
        f32.mul
        f32.store
    )

    (func $vec2_div (;18;) (export "vec2_div") (param $dest i32) (param $from i32) (param $scalar i32)
        (local $t f32)
        ;; r.x = v.x / scalar
        local.get $dest
        local.get $from
        f32.load
        local.get $scalar
        f32.load
        local.tee $t
        f32.div
        f32.store
        ;; r.y = v.y / scalar
        local.get $dest
        i32.const 4
        i32.add
        local.get $from
        i32.const 4
        i32.add
        f32.load
        local.get $t
        f32.div
        f32.store
    )

    (func $vec3_div (;28;) (export "vec3_div") (param $dest i32) (param $from i32) (param $scalar i32)
        (local $t f32)
        ;; r.x = v.x / scalar
        local.get $dest
        local.get $from
        f32.load
        f32.const 1.0
        local.get $scalar
        f32.load
        f32.div
        local.tee $t
        f32.mul
        f32.store
        ;; r.y = v.y / scalar
        local.get $dest
        i32.const 4
        i32.add
        local.get $from
        i32.const 4
        i32.add
        f32.load
        local.get $t
        f32.mul
        f32.store
        ;; r.z = v.z / scalar
        local.get $dest
        i32.const 8
        i32.add
        local.get $from
        i32.const 8
        i32.add
        f32.load
        local.get $t
        f32.mul
        f32.store
    )

    (func $vec4_div (;38;) (export "vec4_div") (param $dest i32) (param $from i32) (param $scalar i32)
        (local $t f32)
        ;; r.x = v.x / scalar
        local.get $dest
        local.get $from
        f32.load
        f32.const 1.0
        local.get $scalar
        f32.load
        f32.div
        local.tee $t
        f32.mul
        f32.store
        ;; r.y = v.y / scalar
        local.get $dest
        i32.const 4
        i32.add
        local.get $from
        i32.const 4
        i32.add
        f32.load
        local.get $t
        f32.mul
        f32.store
        ;; r.z = v.z / scalar
        local.get $dest
        i32.const 8
        i32.add
        local.get $from
        i32.const 8
        i32.add
        f32.load
        local.get $t
        f32.mul
        f32.store
        ;; r.w = v.w / scalar
        local.get $dest
        i32.const 8
        i32.add
        local.get $from
        i32.const 8
        i32.add
        f32.load
        local.get $t
        f32.mul
        f32.store
    )

    (func $vec2_divi (;16;) (export "vec2_divi") (param $dest i32) (param $from i32) (param $scalar f32)
        ;; r.x = v.x / scalar
        local.get $dest
        local.get $from
        f32.load
        local.get $scalar
        f32.div
        f32.store
        ;; r.y = v.y / scalar
        local.get $dest
        i32.const 4
        i32.add
        local.get $from
        i32.const 4
        i32.add
        f32.load
        local.get $scalar
        f32.div
        f32.store
    )

    (func $vec3_divi (;26;) (export "vec3_divi") (param $dest i32) (param $from i32) (param $scalar f32)
        ;; r.x = v.x / scalar
        local.get $dest
        local.get $from
        f32.load
        local.get $scalar
        f32.div
        f32.store
        ;; r.y = v.y / scalar
        local.get $dest
        i32.const 4
        i32.add
        local.get $from
        i32.const 4
        i32.add
        f32.load
        local.get $scalar
        f32.div
        f32.store
        ;; r.z = v.z / scalar
        local.get $dest
        i32.const 8
        i32.add
        local.get $from
        i32.const 8
        i32.add
        f32.load
        local.get $scalar
        f32.div
        f32.store
    )

    (func $vec4_divi (;39;) (export "vec4_divi") (param $dest i32) (param $from i32) (param $scalar f32)
        (local $t f32)
        ;; r.x = v.x / scalar
        local.get $dest
        local.get $from
        f32.load
        f32.const 1.0
        local.get $scalar
        f32.div
        local.tee $t
        f32.mul
        f32.store
        ;; r.y = v.y / scalar
        local.get $dest
        i32.const 4
        i32.add
        local.get $from
        i32.const 4
        i32.add
        f32.load
        local.get $t
        f32.mul
        f32.store
        ;; r.z = v.z / scalar
        local.get $dest
        i32.const 8
        i32.add
        local.get $from
        i32.const 8
        i32.add
        f32.load
        local.get $t
        f32.mul
        f32.store
        ;; r.w = v.w / scalar
        local.get $dest
        i32.const 12
        i32.add
        local.get $from
        i32.const 12
        i32.add
        f32.load
        local.get $t
        f32.mul
        f32.store
    )

    (func $vec2_dot (;15;) (export "vec2_dot") (param $from_a i32) (param $from_b i32) (result f32)
        ;; A := a.x * b.x 
        local.get $from_a
        f32.load
        local.get $from_b
        f32.load
        f32.mul
        ;; B := a.y * b.y
        local.get $from_a
        i32.const 4
        i32.add
        f32.load
        local.get $from_b
        i32.const 4
        i32.add
        f32.load
        f32.mul
        ;; A + B
        f32.add
    )

    (func $vec3_dot (;25;) (export "vec3_dot") (param $from_a i32) (param $from_b i32) (result f32)
        ;; A := a.x * b.x 
        local.get $from_a
        f32.load
        local.get $from_b
        f32.load
        f32.mul
        ;; B := a.y * b.y
        local.get $from_a
        i32.const 4
        i32.add
        f32.load
        local.get $from_b
        i32.const 4
        i32.add
        f32.load
        f32.mul
        ;; A + B
        f32.add
        ;; C := a.z * b.z
        local.get $from_a
        i32.const 8
        i32.add
        f32.load
        local.get $from_b
        i32.const 8
        i32.add
        f32.load
        f32.mul
        ;; A + B + C
        f32.add
    )

    (func $vec4_dot (;35;) (export "vec4_dot") (param $from_a i32) (param $from_b i32) (result f32)
        local.get $from_a
        f32.load
        local.get $from_b
        f32.load
        f32.mul

        local.get $from_a
        i32.const 4
        i32.add
        f32.load
        local.get $from_b
        i32.const 4
        i32.add
        f32.load
        f32.mul
        f32.add

        local.get $from_a
        i32.const 8
        i32.add
        f32.load
        local.get $from_b
        i32.const 8
        i32.add
        f32.load
        f32.mul
        f32.add

        local.get $from_a
        i32.const 12
        i32.add
        f32.load
        local.get $from_b
        i32.const 12
        i32.add
        f32.load
        f32.mul
        f32.add
    )

    (func $vec2_dot_st (;19+call;) (export "vec2_dot_st") (param $dest i32) (param $from_a i32) (param $from_b i32)
        local.get $dest
        local.get $from_a
        local.get $from_b
        call $vec2_dot
        f32.store
    )

    (func $vec3_dot_st (;29+call;) (export "vec3_dot_st") (param $dest i32) (param $from_a i32) (param $from_b i32)
        local.get $dest
        local.get $from_a
        local.get $from_b
        call $vec3_dot
        f32.store
    )

    (func $vec4_dot_st (;39+call;) (export "vec4_dot_st") (param $dest i32) (param $from_a i32) (param $from_b i32)
        local.get $dest
        local.get $from_a
        local.get $from_b
        call $vec3_dot
        f32.store
    )

    (func $vec2_eq (;21;) (export "vec2_eq") (param $from_a i32) (param $from_b i32) (result i32)
        local.get $from_a
        f32.load
        local.get $from_b
        f32.load
        ;; A := a.x == b.x
        f32.sub
        f32.abs
        global.get $f32_eq_tolerance
        f32.lt

        local.get $from_a
        i32.const 4
        i32.add
        f32.load
        local.get $from_b
        i32.const 4
        i32.add
        f32.load
        f32.sub
        f32.abs
        global.get $f32_eq_tolerance
        f32.lt
        i32.and
    )

    (func $vec3_eq (;38;) (export "vec3_eq") (param $from_a i32) (param $from_b i32) (result i32)
        local.get $from_a
        f32.load
        local.get $from_b
        f32.load
        ;; A := a.x == b.x
        f32.sub
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt
        if
            i32.const 0
            return
        end

        local.get $from_a
        i32.const 4
        i32.add
        f32.load
        local.get $from_b
        i32.const 4
        i32.add
        f32.load
        ;; B := a.y == b.y
        f32.sub
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt
        ;; A & B
        if
            i32.const 0
            return
        end

        local.get $from_a
        i32.const 8
        i32.add
        f32.load
        local.get $from_b
        i32.const 8
        i32.add
        f32.load
        ;; C := a.z == b.z
        f32.sub
        f32.abs
        global.get $f32_eq_tolerance
        f32.lt
        ;; A & B & C
    )

    (func $vec4_eq (;53;) (export "vec4_eq") (param $from_a i32) (param $from_b i32) (result i32)
        local.get $from_a
        f32.load
        local.get $from_b
        f32.load
        ;; A := a.x == b.x
        f32.sub
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt
        if
            i32.const 0
            return
        end

        local.get $from_a
        i32.const 4
        i32.add
        f32.load
        local.get $from_b
        i32.const 4
        i32.add
        f32.load
        ;; B := a.y == b.y
        f32.sub
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt
        ;; A & B
        if
            i32.const 0
            return
        end

        local.get $from_a
        i32.const 8
        i32.add
        f32.load
        local.get $from_b
        i32.const 8
        i32.add
        f32.load
        ;; C := a.z == b.z
        f32.sub
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt
        ;; A & B & C
        if
            i32.const 0
            return
        end

        local.get $from_a
        i32.const 12
        i32.add
        f32.load
        local.get $from_b
        i32.const 12
        i32.add
        f32.load
        ;; D := a.w == b.w
        f32.sub
        f32.abs
        global.get $f32_eq_tolerance
        f32.lt
        ;; A & B & C & D
    )

    (func $vec2_eq_st (;25+call;) (export "vec2_eq_st") (param $dest i32) (param $from_a i32) (param $from_b i32)
        local.get $dest
        local.get $from_a
        local.get $from_b
        call $vec2_eq
        i32.store
    )

    (func $vec3_eq_st (;43+call;) (export "vec3_eq_st") (param $dest i32) (param $from_a i32) (param $from_b i32)
        local.get $dest
        local.get $from_a
        local.get $from_b
        call $vec3_eq
        i32.store
    )

    (func $vec4_eq_st (;58+call;) (export "vec4_eq_st") (param $dest i32) (param $from_a i32) (param $from_b i32)
        local.get $dest
        local.get $from_a
        local.get $from_b
        call $vec4_eq
        i32.store
    )

    (func $vec2_eqz (;13;) (export "vec2_eqz") (param $from i32) (result i32)
        local.get $from
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.lt

        local.get $from
        i32.const 4
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.lt
        i32.and
    )

    (func $vec3_eqz (;25;) (export "vec3_eqz") (param $from i32) (result i32)
        local.get $from
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt
        if
            i32.const 0
            return
        end

        local.get $from
        i32.const 4
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt
        if
            i32.const 0
            return
        end

        local.get $from
        i32.const 8
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.lt
    )

    (func $vec4_eqz (;35;) (export "vec4_eqz") (param $from i32) (result i32)
        local.get $from
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt
        if
            i32.const 0
            return
        end

        local.get $from
        i32.const 4
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt
        if
            i32.const 0
            return
        end

        local.get $from
        i32.const 8
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt
        if
            i32.const 0
            return
        end

        local.get $from
        i32.const 12
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.lt
    )

    (func $vec2_eqz_st (;16+call;) (export "vec2_eqz_st") (param $dest i32) (param $from i32)
        local.get $dest
        local.get $from
        call $vec2_eqz
        i32.store
    )

    (func $vec3_eqz_st (;28+call;) (export "vec3_eqz_st") (param $dest i32) (param $from i32)
        local.get $dest
        local.get $from
        call $vec3_eqz
        i32.store
    )

    (func $vec4_eqz_st (;38+call;) (export "vec4_eqz_st") (param $dest i32) (param $from i32)
        local.get $dest
        local.get $from
        call $vec4_eqz
        i32.store
    )

    (func $vec2_mag (;14;) (export "vec2_mag") (param $from i32) (result f32)
        (local $x f32) (local $y f32)
        ;; x
        local.get $from
        f32.load
        local.tee $x
        local.get $x
        f32.mul
        ;; y
        local.get $from
        i32.const 4
        i32.add
        f32.load
        local.tee $y
        local.get $y
        f32.mul
        f32.add
        f32.sqrt
    )

    (func $vec3_mag (;22;) (export "vec3_mag") (param $from i32) (result f32)
        (local $x f32) (local $y f32) (local $z f32)
        ;; x
        local.get $from
        f32.load
        local.tee $x
        local.get $x
        f32.mul
        ;; y
        local.get $from
        i32.const 4
        i32.add
        f32.load
        local.tee $y
        local.get $y
        f32.mul
        f32.add
        ;; z
        local.get $from
        i32.const 8
        i32.add
        f32.load
        local.tee $z
        local.get $z
        f32.mul
        f32.add

        f32.sqrt
    )

    (func $vec4_mag (;30;) (export "vec4_mag") (param $from i32) (result f32)
        (local $t f32)
        local.get $from
        f32.load
        local.tee $t
        local.get $t
        f32.mul

        local.get $from
        i32.const 4
        i32.add
        f32.load
        local.tee $t
        local.get $t
        f32.mul
        f32.add

        local.get $from
        i32.const 8
        i32.add
        f32.load
        local.tee $t
        local.get $t
        f32.mul
        f32.add

        local.get $from
        i32.const 12
        i32.add
        f32.load
        local.tee $t
        local.get $t
        f32.mul
        f32.add
        f32.sqrt
    )

    (func $vec2_mag_st (;17+call;) (export "vec2_mag_st") (param $dest i32) (param $from i32)
        local.get $dest
        local.get $from
        call $vec2_mag
        f32.store
    )

    (func $vec3_mag_st (;25+call;) (export "vec3_mag_st") (param $dest i32) (param $from i32)
        local.get $dest
        local.get $from
        call $vec3_mag
        f32.store
    )

    (func $vec4_mag_st (;33+call;) (export "vec4_mag_st") (param $dest i32) (param $from i32)
        local.get $dest
        local.get $from
        call $vec4_mag
        f32.store
    )

    (func $vec2_mag_sqr (;13;) (export "vec2_mag_sqr") (param $from i32) (result f32)
        (local $t f32)

        local.get $from
        f32.load
        local.tee $t
        local.get $t
        f32.mul

        local.get $from
        i32.const 4
        i32.add
        f32.load
        local.tee $t
        local.get $t
        f32.mul
        f32.add
    )

    (func $vec3_mag_sqr (;21;) (export "vec3_mag_sqr") (param $from i32) (result f32)
        (local $t f32)

        local.get $from
        f32.load
        local.tee $t
        local.get $t
        f32.mul

        local.get $from
        i32.const 4
        i32.add
        f32.load
        local.tee $t
        local.get $t
        f32.mul
        f32.add

        local.get $from
        i32.const 8
        i32.add
        f32.load
        local.tee $t
        local.get $t
        f32.mul
        f32.add
    )

    (func $vec4_mag_sqr (;21;) (export "vec4_mag_sqr") (param $from i32) (result f32)
        (local $t f32)

        local.get $from
        f32.load
        local.tee $t
        local.get $t
        f32.mul

        local.get $from
        i32.const 4
        i32.add
        f32.load
        local.tee $t
        local.get $t
        f32.mul
        f32.add

        local.get $from
        i32.const 8
        i32.add
        f32.load
        local.tee $t
        local.get $t
        f32.mul
        f32.add

        local.get $from
        i32.const 12
        i32.add
        f32.load
        local.tee $t
        local.get $t
        f32.mul
        f32.add
    )

    (func $vec2_mag_sqr_st (;16+call;) (export "vec2_mag_sqr_st") (param $dest i32) (param $from i32)
        local.get $dest
        local.get $from
        call $vec2_mag_sqr
        f32.store
    )

    (func $vec3_mag_sqr_st (;24+call;) (export "vec3_mag_sqr_st") (param $dest i32) (param $from i32)
        local.get $dest
        local.get $from
        call $vec3_mag_sqr
        f32.store
    )

    (func $vec4_mag_sqr_st (;24+call;) (export "vec4_mag_sqr_st") (param $dest i32) (param $from i32)
        local.get $dest
        local.get $from
        call $vec4_mag_sqr
        f32.store
    )

    (func $vec2_norm (;28;) (export "vec2_norm") (param $dest i32) (param $from i32)
        (local $x f32) (local $y f32) (local $inv_mag f32)

        local.get $dest
        local.get $dest
        i32.const 4
        i32.add

        f32.const 1.0
        ;; x
        local.get $from
        f32.load
        local.tee $x
        local.get $x
        f32.mul
        ;; y
        local.get $from
        i32.const 4
        i32.add
        f32.load
        local.tee $y
        local.get $y
        f32.mul
        f32.add
        f32.sqrt
        f32.div
        local.tee $inv_mag
        local.get $y
        f32.mul
        f32.store

        local.get $inv_mag
        local.get $x
        f32.mul
        f32.store
    )

    (func $vec3_norm (;43;) (export "vec3_norm") (param $dest i32) (param $from i32)
        (local $x f32) (local $y f32) (local $z f32) (local $inv_mag f32)

        local.get $dest
        local.get $dest
        i32.const 4
        i32.add
        local.get $dest
        i32.const 8
        i32.add

        f32.const 1.0
        ;; x
        local.get $from
        f32.load
        local.tee $x
        local.get $x
        f32.mul
        ;; y
        local.get $from
        i32.const 4
        i32.add
        f32.load
        local.tee $y
        local.get $y
        f32.mul
        f32.add
        ;; z
        local.get $from
        i32.const 8
        i32.add
        f32.load
        local.tee $z
        local.get $z
        f32.mul
        f32.add

        f32.sqrt

        f32.div
        local.tee $inv_mag
        local.get $z
        f32.mul
        f32.store

        local.get $inv_mag
        local.get $y
        f32.mul
        f32.store

        local.get $inv_mag
        local.get $x
        f32.mul
        f32.store
    )

    (func $vec4_norm (;58;) (export "vec4_norm") (param $dest i32) (param $from i32)
        (local $x f32) (local $y f32) (local $z f32) (local $w f32) (local $inv_mag f32)

        local.get $dest

        f32.const 1.0

        local.get $from
        f32.load
        local.tee $x
        local.get $x
        f32.mul

        local.get $from
        i32.const 4
        i32.add
        f32.load
        local.tee $y
        local.get $y
        f32.mul
        f32.add

        local.get $from
        i32.const 8
        i32.add
        f32.load
        local.tee $z
        local.get $z
        f32.mul
        f32.add

        local.get $from
        i32.const 12
        i32.add
        f32.load
        local.tee $w
        local.get $w
        f32.mul
        f32.add
        f32.sqrt
        f32.div

        local.tee $inv_mag
        local.get $x
        f32.mul
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        local.get $y
        local.get $inv_mag
        f32.mul
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        local.get $z
        local.get $inv_mag
        f32.mul
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        local.get $w
        local.get $inv_mag
        f32.mul
        f32.store
    )

    (func $vec4_norm_ds (;55;) (export "vec4_norm_ds") (param $dest i32)
        (local $oy i32) (local $oz i32) (local $ow i32)
        (local $x f32) (local $y f32) (local $z f32) (local $w f32) (local $inv_mag f32)

        local.get $dest
        f32.const 1.0

        local.get $dest
        f32.load
        local.tee $x
        local.get $x
        f32.mul

        local.get $dest
        i32.const 4
        i32.add
        local.tee $oy
        f32.load
        local.tee $y
        local.get $y
        f32.mul
        f32.add

        local.get $dest
        i32.const 8
        i32.add
        local.tee $oz
        f32.load
        local.tee $z
        local.get $z
        f32.mul
        f32.add

        local.get $dest
        i32.const 12
        i32.add
        local.tee $ow
        f32.load
        local.tee $w
        local.get $w
        f32.mul
        f32.add
        f32.sqrt
        f32.div

        local.tee $inv_mag
        local.get $x
        f32.mul
        f32.store

        local.get $oy
        local.get $y
        local.get $inv_mag
        f32.mul
        f32.store

        local.get $oz
        local.get $z
        local.get $inv_mag
        f32.mul
        f32.store

        local.get $ow
        local.get $w
        local.get $inv_mag
        f32.mul
        f32.store
    )

    (func $vec2_dist (;22;) (export "vec2_dist") (param $from_a i32) (param $from_b i32) (result f32)
        (local $t f32)
        ;; a.x - b.x
        local.get $from_a
        f32.load
        local.get $from_b
        f32.load
        f32.sub
        local.tee $t
        local.get $t
        f32.mul
        ;; a.y - b.y
        local.get $from_a
        i32.const 4
        i32.add
        f32.load
        local.get $from_b
        i32.const 4
        i32.add
        f32.load
        f32.sub
        local.tee $t
        local.get $t
        f32.mul
        f32.add
        f32.sqrt
    )

    (func $vec3_dist (;35;) (export "vec3_dist") (param $from_a i32) (param $from_b i32) (result f32)
        (local $t f32)
        ;; a.x - b.x
        local.get $from_a
        f32.load
        local.get $from_b
        f32.load
        f32.sub
        local.tee $t
        local.get $t
        f32.mul
        ;; a.y - b.y
        local.get $from_a
        i32.const 4
        i32.add
        f32.load
        local.get $from_b
        i32.const 4
        i32.add
        f32.load
        f32.sub
        local.tee $t
        local.get $t
        f32.mul
        f32.add
        ;; a.z - b.z
        local.get $from_a
        i32.const 8
        i32.add
        f32.load
        local.get $from_b
        i32.const 8
        i32.add
        f32.load
        f32.sub
        local.tee $t
        local.get $t
        f32.mul
        f32.add
        
        f32.sqrt
    )

    (func $vec4_dist (;48;) (export "vec4_dist") (param $from_a i32) (param $from_b i32) (result f32)
        (local $t f32)
        ;; a.x - b.x
        local.get $from_a
        f32.load
        local.get $from_b
        f32.load
        f32.sub
        local.tee $t
        local.get $t
        f32.mul
        ;; a.y - b.y
        local.get $from_a
        i32.const 4
        i32.add
        f32.load
        local.get $from_b
        i32.const 4
        i32.add
        f32.load
        f32.sub
        local.tee $t
        local.get $t
        f32.mul
        f32.add
        ;; a.z - b.z
        local.get $from_a
        i32.const 8
        i32.add
        f32.load
        local.get $from_b
        i32.const 8
        i32.add
        f32.load
        f32.sub
        local.tee $t
        local.get $t
        f32.mul
        f32.add
        ;; a.w - b.w
        local.get $from_a
        i32.const 12
        i32.add
        f32.load
        local.get $from_b
        i32.const 12
        i32.add
        f32.load
        f32.sub
        local.tee $t
        local.get $t
        f32.mul
        f32.add
        
        f32.sqrt
    )

    (func $vec2_dist_st (;26+call;) (export "vec2_dist_st") (param $dest i32) (param $from_a i32) (param $from_b i32)
        local.get $dest
        local.get $from_a
        local.get $from_b
        call $vec2_dist
        f32.store
    )

    (func $vec3_dist_st (;39+call;) (export "vec3_dist_st") (param $dest i32) (param $from_a i32) (param $from_b i32)
        local.get $dest
        local.get $from_a
        local.get $from_b
        call $vec3_dist
        f32.store
    )

    (func $vec4_dist_st (;52+call;) (export "vec4_dist_st") (param $dest i32) (param $from_a i32) (param $from_b i32)
        local.get $dest
        local.get $from_a
        local.get $from_b
        call $vec4_dist
        f32.store
    )

    (func $vec2_angle (;38+jscall;) (export "vec2_angle") (param $from_a i32) (param $from_b i32) (result f32)
        (local $ax f32) (local $ay f32) (local $bx f32) (local $by f32)

        local.get $from_a
        f32.load
        local.tee $ax
        local.get $from_b
        f32.load
        local.tee $bx
        f32.mul
        local.get $from_a
        i32.const 4
        i32.add
        f32.load
        local.tee $ay
        local.get $from_b
        i32.const 4
        i32.add
        f32.load
        local.tee $by
        f32.mul
        f32.add

        local.get $ax
        local.get $ax
        f32.mul
        local.get $ay
        local.get $ay
        f32.mul
        f32.add
        f32.sqrt

        local.get $bx
        local.get $bx
        f32.mul
        local.get $by
        local.get $by
        f32.mul
        f32.add
        f32.sqrt
        f32.mul
        f32.div
        call $acosf32
    )

    (func $vec3_angle (;58+jscall;) (export "vec3_angle") (param $from_a i32) (param $from_b i32) (result f32)
        (local $ax f32) (local $ay f32) (local $az f32)
        (local $bx f32) (local $by f32) (local $bz f32)

        local.get $from_a
        f32.load
        local.tee $ax
        local.get $from_b
        f32.load
        local.tee $bx
        f32.mul
        local.get $from_a
        i32.const 4
        i32.add
        f32.load
        local.tee $ay
        local.get $from_b
        i32.const 4
        i32.add
        f32.load
        local.tee $by
        f32.mul
        f32.add
        local.get $from_a
        i32.const 8
        i32.add
        f32.load
        local.tee $az
        local.get $from_b
        i32.const 8
        i32.add
        f32.load
        local.tee $bz
        f32.mul
        f32.add

        local.get $ax
        local.get $ax
        f32.mul
        local.get $ay
        local.get $ay
        f32.mul
        f32.add
        local.get $az
        local.get $az
        f32.mul
        f32.add
        f32.sqrt

        local.get $bx
        local.get $bx
        f32.mul
        local.get $by
        local.get $by
        f32.mul
        f32.add
        local.get $bz
        local.get $bz
        f32.mul
        f32.add
        f32.sqrt
        f32.mul
        f32.div
        call $acosf32
    )

    (func $vec4_angle (;77+jscall;) (export "vec4_angle") (param $from_a i32) (param $from_b i32) (result f32)
        (local $ax f32) (local $ay f32) (local $az f32) (local $aw f32)
        (local $bx f32) (local $by f32) (local $bz f32) (local $bw f32)

        local.get $from_a
        f32.load
        local.tee $ax
        local.get $from_b
        f32.load
        local.tee $bx
        f32.mul
        local.get $from_a
        i32.const 4
        i32.add
        f32.load
        local.tee $ay
        local.get $from_b
        i32.const 4
        i32.add
        f32.load
        local.tee $by
        f32.mul
        f32.add
        local.get $from_a
        i32.const 8
        i32.add
        f32.load
        local.tee $az
        local.get $from_b
        i32.const 8
        i32.add
        f32.load
        local.tee $bz
        f32.mul
        f32.add
        local.get $from_a
        i32.const 12
        i32.add
        f32.load
        local.tee $aw
        local.get $from_b
        i32.const 12
        i32.add
        f32.load
        local.tee $bw
        f32.mul
        f32.add

        local.get $ax
        local.get $ax
        f32.mul
        local.get $ay
        local.get $ay
        f32.mul
        f32.add
        local.get $az
        local.get $az
        f32.mul
        f32.add
        local.get $aw
        local.get $aw
        f32.mul
        f32.add
        f32.sqrt

        local.get $bx
        local.get $bx
        f32.mul
        local.get $by
        local.get $by
        f32.mul
        f32.add
        local.get $bz
        local.get $bz
        f32.mul
        f32.add
        local.get $bw
        local.get $bw
        f32.mul
        f32.add
        f32.sqrt
        f32.mul
        f32.div
        call $acosf32
    )

    (func $vec2_angle_st (;42+call+jscall;) (export "vec2_angle_st") (param $dest i32) (param $from_a i32) (param $from_b i32)
        local.get $dest
        local.get $from_a
        local.get $from_b
        call $vec2_angle
        f32.store
    )

    (func $vec3_angle_st (;62+call+jscall;) (export "vec3_angle_st") (param $dest i32) (param $from_a i32) (param $from_b i32)
        local.get $dest
        local.get $from_a
        local.get $from_b
        call $vec3_angle
        f32.store
    )

    (func $vec4_angle_st (;81+call+jscall;) (export "vec4_angle_st") (param $dest i32) (param $from_a i32) (param $from_b i32)
        local.get $dest
        local.get $from_a
        local.get $from_b
        call $vec4_angle
        f32.store
    )

    (func $vec3_cross (;51;) (export "vec3_cross") (param $dest i32) (param $from_a i32) (param $from_b i32)
        (local $a f32) (local $b f32) (local $c f32)
        (local $d f32) (local $e f32) (local $f f32)
        local.get $dest

        local.get $from_a
        i32.const 4
        i32.add
        f32.load
        local.tee $b

        local.get $from_b
        i32.const 8
        i32.add
        f32.load
        local.tee $f

        f32.mul

        local.get $from_a
        i32.const 8
        i32.add
        f32.load
        local.tee $c

        local.get $from_b
        i32.const 4
        i32.add
        f32.load
        local.tee $e

        f32.mul
        f32.sub

        f32.store

        local.get $dest
        i32.const 4
        i32.add

        local.get $from_b
        f32.load
        local.tee $d

        local.get $c

        f32.mul

        local.get $from_a
        f32.load
        local.tee $a

        local.get $f

        f32.mul
        f32.sub

        f32.store

        local.get $dest
        i32.const 8
        i32.add

        local.get $a
        local.get $e

        f32.mul

        local.get $d
        local.get $b
        
        f32.mul
        f32.sub

        f32.store
    )

    (func $vec2_lerp (;31;) (export "vec2_lerp") (param $dest i32) (param $from_a i32) (param $from_b i32) (param $t f32)
        (local $u f32)

        local.get $dest
        f32.const 1.0
        local.get $t
        f32.sub
        local.tee $u
        local.get $from_a
        f32.load
        f32.mul
        local.get $from_b
        f32.load
        local.get $t
        f32.mul
        f32.add
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        local.get $from_a
        i32.const 4
        i32.add
        f32.load
        local.get $u
        f32.mul
        local.get $from_b
        i32.const 4
        i32.add
        f32.load
        local.get $t
        f32.mul
        f32.add
        f32.store
    )

    (func $vec3_lerp (;48;) (export "vec3_lerp") (param $dest i32) (param $from_a i32) (param $from_b i32) (param $t f32)
        (local $u f32)

        local.get $dest
        f32.const 1.0
        local.get $t
        f32.sub
        local.tee $u
        local.get $from_a
        f32.load
        f32.mul
        local.get $from_b
        f32.load
        local.get $t
        f32.mul
        f32.add
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        local.get $from_a
        i32.const 4
        i32.add
        f32.load
        local.get $u
        f32.mul
        local.get $from_b
        i32.const 4
        i32.add
        f32.load
        local.get $t
        f32.mul
        f32.add
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        local.get $from_a
        i32.const 8
        i32.add
        f32.load
        local.get $u
        f32.mul
        local.get $from_b
        i32.const 8
        i32.add
        f32.load
        local.get $t
        f32.mul
        f32.add
        f32.store
    )

    (func $vec4_lerp (;65;) (export "vec4_lerp") (param $dest i32) (param $from_a i32) (param $from_b i32) (param $t f32)
        (local $u f32)

        local.get $dest
        f32.const 1.0
        local.get $t
        f32.sub
        local.tee $u
        local.get $from_a
        f32.load
        f32.mul
        local.get $from_b
        f32.load
        local.get $t
        f32.mul
        f32.add
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        local.get $from_a
        i32.const 4
        i32.add
        f32.load
        local.get $u
        f32.mul
        local.get $from_b
        i32.const 4
        i32.add
        f32.load
        local.get $t
        f32.mul
        f32.add
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        local.get $from_a
        i32.const 8
        i32.add
        f32.load
        local.get $u
        f32.mul
        local.get $from_b
        i32.const 8
        i32.add
        f32.load
        local.get $t
        f32.mul
        f32.add
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        local.get $from_a
        i32.const 12
        i32.add
        f32.load
        local.get $u
        f32.mul
        local.get $from_b
        i32.const 12
        i32.add
        f32.load
        local.get $t
        f32.mul
        f32.add
        f32.store
    )

    (func $mat3_det (;60;) (export "mat3_det") (param $from i32) (result f32)
        (local $a f32) (local $g f32) (local $e f32)
        (local $c f32) (local $i f32) (local $m40 f32)
        
        local.get $from
        i32.const 4
        i32.add
        f32.load
        local.tee $g

        local.get $from
        i32.const 20
        i32.add
        f32.load
        local.tee $m40

        f32.mul

        local.get $from
        i32.const 8
        i32.add
        f32.load
        local.tee $e

        local.get $from
        i32.const 16
        i32.add
        f32.load
        local.tee $i

        f32.mul
        f32.sub
        ;; m6
        local.get $from
        i32.const 24
        i32.add
        f32.load

        f32.mul

        local.get $e

        local.get $from
        i32.const 12
        i32.add
        f32.load
        local.tee $c

        f32.mul
        
        local.get $from
        f32.load
        local.tee $a

        local.get $m40

        f32.mul

        f32.sub
        ;; m7
        local.get $from
        i32.const 28
        i32.add
        f32.load

        f32.mul

        f32.add

        local.get $a
        
        local.get $i

        f32.mul

        local.get $g

        local.get $c

        f32.mul

        f32.sub
        ;; g
        local.get $from
        i32.const 32
        i32.add
        f32.load

        f32.mul

        f32.add
    )

    (func $mat4_det (;155;) (export "mat4_det") (param $from i32) (result f32)
        (local $b f32) (local $c f32) (local $d f32)
        (local $f f32) (local $g f32) (local $h f32)
        (local $j f32) (local $k f32) (local $l f32)
        (local $n f32) (local $o f32) (local $p f32)
        (local $t1 f32) (local $t2 f32) (local $t3 f32) (local $t4 f32) (local $t5 f32) (local $t6 f32)

        local.get $from
        i32.const 40
        i32.add
        f32.load
        local.tee $k

        local.get $from
        i32.const 60
        i32.add
        f32.load
        local.tee $p

        f32.mul

        local.get $from
        i32.const 56
        i32.add
        f32.load
        local.tee $l

        local.get $from
        i32.const 44
        i32.add
        f32.load
        local.tee $o

        f32.mul
        f32.sub

        local.tee $t1

        local.get $from
        i32.const 20
        i32.add
        f32.load
        local.tee $f

        f32.mul

        local.get $from
        i32.const 36
        i32.add
        f32.load
        local.tee $g

        local.get $p

        f32.mul

        local.get $from
        i32.const 52
        i32.add
        f32.load
        local.tee $h

        local.get $o

        f32.mul
        f32.sub

        local.tee $t2

        local.get $from
        i32.const 24
        i32.add
        f32.load
        local.tee $j

        f32.mul
        f32.sub

        local.get $g
        local.get $l
        
        f32.mul

        local.get $h
        local.get $k

        f32.mul
        f32.sub

        local.tee $t3

        local.get $from
        i32.const 28
        i32.add
        f32.load
        local.tee $n

        f32.mul
        f32.add
        ;; a
        local.get $from
        f32.load
        
        f32.mul
        ;; a*(f*t1-j*t2+n*t3)
        local.get $from
        i32.const 32
        i32.add
        f32.load
        local.tee $c

        local.get $p

        f32.mul

        local.get $from
        i32.const 48
        i32.add
        f32.load
        local.tee $d

        local.get $o

        f32.mul
        f32.sub

        local.tee $t4

        local.get $j

        f32.mul

        local.get $t1

        local.get $from
        i32.const 16
        i32.add
        f32.load
        local.tee $b

        f32.mul

        local.get $c
        local.get $l

        f32.mul

        local.get $d
        local.get $k

        f32.mul
        f32.sub

        local.tee $t5

        local.get $n

        f32.mul

        f32.add

        f32.sub

        local.get $from
        i32.const 4
        i32.add
        f32.load
        
        f32.mul

        f32.add
        ;; a*(f*t1-j*t2+n*t3) + e*(j*t4-(b*t1+n*t5))
        local.get $t2
        local.get $b

        f32.mul

        local.get $t4
        local.get $f

        f32.mul

        f32.sub

        local.get $c
        local.get $h

        f32.mul

        local.get $d
        local.get $g

        f32.mul
        f32.sub

        local.tee $t6

        local.get $n

        f32.mul

        f32.add
        ;; i
        local.get $from
        i32.const 8
        i32.add
        f32.load

        f32.mul

        f32.add
        ;; a*(f*t1-j*t2+n*t3) + e*(j*t4-(b*t1+n*t5)) + i*(b*t2-f*t4+n*t6)
        local.get $f
        local.get $t5

        f32.mul

        local.get $b
        local.get $t3

        f32.mul

        local.get $j
        local.get $t6

        f32.mul
        
        f32.add
        
        f32.sub

        ;; m
        local.get $from
        i32.const 12
        i32.add
        f32.load

        f32.mul

        f32.add
    )

    (func $mat3_det_st (;63+call;) (export "mat3_det_st") (param $dest i32) (param $from i32)
        local.get $dest
        local.get $from
        call $mat3_det
        f32.store
    )

    (func $mat4_det_st (;158+call;) (export "mat4_det_st") (param $dest i32) (param $from i32)
        local.get $dest
        local.get $from
        call $mat4_det
        f32.store
    )

    (func $mat3_transp_ds (;47;) (export "mat3_transp_ds") (param $dest i32)
        (local $t1 i32) (local $v1 f32) (local $t2 i32)

        local.get $dest
        i32.const 4
        i32.add
        local.tee $t1
        f32.load
        local.set $v1

        local.get $t1
        local.get $dest
        i32.const 12
        i32.add
        local.tee $t2
        f32.load
        f32.store

        local.get $t2
        local.get $v1
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        local.tee $t1
        f32.load
        local.set $v1

        local.get $t1
        local.get $dest
        i32.const 24
        i32.add
        local.tee $t2
        f32.load
        f32.store

        local.get $t2
        local.get $v1
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        local.tee $t1
        f32.load
        local.set $v1

        local.get $t1
        local.get $dest
        i32.const 28
        i32.add
        local.tee $t2
        f32.load
        f32.store

        local.get $t2
        local.get $v1
        f32.store
    )

    (func $mat4_transp_ds (;96;) (export "mat4_transp_ds") (param $dest i32)
        (local $v1 f32) (local $t1 i32) (local $t2 i32)

        local.get $dest
        i32.const 16
        i32.add
        local.tee $t1
        f32.load
        local.set $v1

        local.get $t1

        local.get $dest
        i32.const 4
        i32.add
        local.tee $t2
        f32.load

        f32.store

        local.get $t2
        local.get $v1
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        local.tee $t1
        f32.load
        local.set $v1

        local.get $t1

        local.get $dest
        i32.const 8
        i32.add
        local.tee $t2
        f32.load

        f32.store

        local.get $t2
        local.get $v1
        f32.store

        local.get $dest
        i32.const 48
        i32.add
        local.tee $t1
        f32.load
        local.set $v1

        local.get $t1

        local.get $dest
        i32.const 12
        i32.add
        local.tee $t2
        f32.load

        f32.store

        local.get $t2
        local.get $v1
        f32.store

        local.get $dest
        i32.const 36
        i32.add
        local.tee $t1
        f32.load
        local.set $v1

        local.get $t1

        local.get $dest
        i32.const 24
        i32.add
        local.tee $t2
        f32.load

        f32.store

        local.get $t2
        local.get $v1
        f32.store

        local.get $dest
        i32.const 52
        i32.add
        local.tee $t1
        f32.load
        local.set $v1

        local.get $t1

        local.get $dest
        i32.const 28
        i32.add
        local.tee $t2
        f32.load

        f32.store

        local.get $t2
        local.get $v1
        f32.store

        local.get $dest
        i32.const 56
        i32.add
        local.tee $t1
        f32.load
        local.set $v1

        local.get $t1

        local.get $dest
        i32.const 44
        i32.add
        local.tee $t2
        f32.load

        f32.store

        local.get $t2
        local.get $v1
        f32.store
    )

    (func $mat3_transp (;67;) (export "mat3_transp") (param $dest i32) (param $from i32)
        local.get $dest
        local.get $from
        f32.load
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        local.get $from
        i32.const 12
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        local.get $from
        i32.const 24
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        local.get $from
        i32.const 4
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        local.get $from
        i32.const 16
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        local.get $from
        i32.const 28
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        local.get $from
        i32.const 8
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        local.get $from
        i32.const 20
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        local.get $from
        i32.const 32
        i32.add
        f32.load
        f32.store
    )

    (func $mat4_transp (;124;) (export "mat4_transp") (param $dest i32) (param $from i32)
        local.get $dest
        local.get $from
        f32.load
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        local.get $from
        i32.const 20
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 40
        i32.add
        local.get $from
        i32.const 40
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 60
        i32.add
        local.get $from
        i32.const 60
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        local.get $from
        i32.const 16
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        local.get $from
        i32.const 32
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        local.get $from
        i32.const 48
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        local.get $from
        i32.const 4
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        local.get $from
        i32.const 36
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        local.get $from
        i32.const 52
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        local.get $from
        i32.const 8
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 36
        i32.add
        local.get $from
        i32.const 24
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 44
        i32.add
        local.get $from
        i32.const 56
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 48
        i32.add
        local.get $from
        i32.const 12
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 52
        i32.add
        local.get $from
        i32.const 28
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 56
        i32.add
        local.get $from
        i32.const 44
        i32.add
        f32.load
        f32.store
    )

    (func $mat3_is_zero (;75;) (export "mat3_is_zero") (param $from i32) (result i32)
        local.get $from
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt

        local.get $from
        i32.const 4
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt
        i32.or

        local.get $from
        i32.const 8
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt
        i32.or
        if
            i32.const 0
            return
        end

        local.get $from
        i32.const 12
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt

        local.get $from
        i32.const 16
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt
        i32.or

        local.get $from
        i32.const 20
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt
        i32.or
        if
            i32.const 0
            return
        end

        local.get $from
        i32.const 24
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt

        local.get $from
        i32.const 28
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt
        i32.or
        if
            i32.const 0
            return
        end

        local.get $from
        i32.const 32
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.lt
    )

    (func $mat4_is_zero (;135;) (export "mat4_is_zero") (param $from i32) (result i32)
        local.get $from
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt

        local.get $from
        i32.const 4
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt
        i32.or

        local.get $from
        i32.const 8
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt
        i32.or
        if
            i32.const 0
            return
        end

        local.get $from
        i32.const 12
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt

        local.get $from
        i32.const 16
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt
        i32.or

        local.get $from
        i32.const 20
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt
        i32.or
        if
            i32.const 0
            return
        end

        local.get $from
        i32.const 24
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt

        local.get $from
        i32.const 28
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt
        i32.or

        local.get $from
        i32.const 32
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt
        i32.or
        if
            i32.const 0
            return
        end

        local.get $from
        i32.const 36
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt

        local.get $from
        i32.const 40
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt
        i32.or

        local.get $from
        i32.const 44
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt
        i32.or
        if
            i32.const 0
            return
        end

        local.get $from
        i32.const 48
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt

        local.get $from
        i32.const 52
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt
        i32.or

        local.get $from
        i32.const 56
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt
        i32.or
        if
            i32.const 0
            return
        end

        local.get $from
        i32.const 60
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.lt
    )

    (func $mat3_is_zero_st (;78;) (export "mat3_is_zero_st") (param $dest i32) (param $from i32)
        local.get $dest
        local.get $from
        call $mat3_is_zero
        i32.store
    )

    (func $mat4_is_zero_st (;138+call;) (export "mat4_is_zero_st") (param $dest i32) (param $from i32)
        local.get $dest
        local.get $from
        call $mat4_is_zero
        i32.store
    )

    (func $mat3_is_identity (;81;) (export "mat3_is_identity") (param $from i32) (result i32)
        local.get $from
        i32.const 4
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt

        local.get $from
        i32.const 8
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt
        i32.or

        local.get $from
        i32.const 12
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt
        i32.or
        if
            i32.const 0
            return
        end

        local.get $from
        i32.const 20
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt

        local.get $from
        i32.const 24
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt
        i32.or

        local.get $from
        i32.const 28
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt
        i32.or
        if
            i32.const 0
            return
        end

        local.get $from
        f32.load
        f32.const 1.0
        f32.sub
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt

        local.get $from
        i32.const 16
        i32.add
        f32.load
        f32.const 1.0
        f32.sub
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt
        i32.or
        if
            i32.const 0
            return
        end

        local.get $from
        i32.const 32
        i32.add
        f32.load
        f32.const 1.0
        f32.sub
        f32.abs
        global.get $f32_eq_tolerance
        f32.lt
    )

    (func $mat4_is_identity (;143;) (export "mat4_is_identity") (param $from i32) (result i32)
        local.get $from
        i32.const 4
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt

        local.get $from
        i32.const 8
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt
        i32.or

        local.get $from
        i32.const 12
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt
        i32.or
        if
            i32.const 0
            return
        end

        local.get $from
        i32.const 16
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt

        local.get $from
        i32.const 24
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt
        i32.or

        local.get $from
        i32.const 28
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt
        i32.or
        if
            i32.const 0
            return
        end

        local.get $from
        i32.const 32
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt

        local.get $from
        i32.const 36
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt
        i32.or

        local.get $from
        i32.const 44
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt
        i32.or
        if
            i32.const 0
            return
        end

        local.get $from
        i32.const 48
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt

        local.get $from
        i32.const 52
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt
        i32.or

        local.get $from
        i32.const 56
        i32.add
        f32.load
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt
        i32.or
        if
            i32.const 0
            return
        end

        local.get $from
        f32.load
        f32.const 1.0
        f32.sub
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt

        local.get $from
        i32.const 20
        i32.add
        f32.load
        f32.const 1.0
        f32.sub
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt
        i32.or

        local.get $from
        i32.const 40
        i32.add
        f32.load
        f32.const 1.0
        f32.sub
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt
        i32.or
        if
            i32.const 0
            return
        end

        local.get $from
        i32.const 60
        i32.add
        f32.load
        f32.const 1.0
        f32.sub
        f32.abs
        global.get $f32_eq_tolerance
        f32.lt
    )

    (func $mat3_is_identity_st (;83+call;) (export "mat3_is_identity_st") (param $dest i32) (param $from i32)
        local.get $dest
        local.get $from
        call $mat3_is_identity
        i32.store
    )

    (func $mat4_is_identity_st (;143+call;) (export "mat4_is_identity_st") (param $dest i32) (param $from i32)
        local.get $dest
        local.get $from
        call $mat4_is_identity
        i32.store
    )

    (func $mat3_inv (;185;) (export "mat3_inv") (param $dest i32) (param $from i32) (result i32)
        (local $a f32) (local $d f32) (local $g f32)
        (local $b f32) (local $e f32) (local $h f32)
        (local $c f32) (local $f f32) (local $i f32) (local $t f32)
        
        local.get $from
        i32.const 4
        i32.add
        f32.load
        local.tee $d

        local.get $from
        i32.const 20
        i32.add
        f32.load
        local.tee $h

        f32.mul

        local.get $from
        i32.const 8
        i32.add
        f32.load
        local.tee $g

        local.get $from
        i32.const 16
        i32.add
        f32.load
        local.tee $e

        f32.mul
        f32.sub
        ;; c
        local.get $from
        i32.const 24
        i32.add
        f32.load
        local.tee $c

        f32.mul

        local.get $g

        local.get $from
        i32.const 12
        i32.add
        f32.load
        local.tee $b

        f32.mul
        
        local.get $from
        f32.load
        local.tee $a

        local.get $h

        f32.mul

        f32.sub

        local.get $from
        i32.const 28
        i32.add
        f32.load
        local.tee $f

        f32.mul

        f32.add

        local.get $a
        
        local.get $e

        f32.mul

        local.get $d

        local.get $b

        f32.mul

        f32.sub

        local.get $from
        i32.const 32
        i32.add
        f32.load
        local.tee $i

        f32.mul

        f32.add

        local.tee $t
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt

        local.get $dest

        f32.const 1.0
        local.get $t
        f32.div
        local.tee $t

        local.get $e
        local.get $i
        f32.mul
        local.get $f
        local.get $h
        f32.mul
        f32.sub
        f32.mul
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        local.get $f
        local.get $g
        f32.mul
        local.get $d
        local.get $i
        f32.mul
        f32.sub
        local.get $t
        f32.mul
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        local.get $d
        local.get $h
        f32.mul
        local.get $e
        local.get $g
        f32.mul
        f32.sub
        local.get $t
        f32.mul
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        local.get $c
        local.get $h
        f32.mul
        local.get $b
        local.get $i
        f32.mul
        f32.sub
        local.get $t
        f32.mul
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        local.get $a
        local.get $i
        f32.mul
        local.get $c
        local.get $g
        f32.mul
        f32.sub
        local.get $t
        f32.mul
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        local.get $b
        local.get $g
        f32.mul
        local.get $a
        local.get $h
        f32.mul
        f32.sub
        local.get $t
        f32.mul
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        local.get $b
        local.get $f
        f32.mul
        local.get $c
        local.get $e
        f32.mul
        f32.sub
        local.get $t
        f32.mul
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        local.get $c
        local.get $d
        f32.mul
        local.get $a
        local.get $f
        f32.mul
        f32.sub
        local.get $t
        f32.mul
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        local.get $a
        local.get $e
        f32.mul
        local.get $b
        local.get $d
        f32.mul
        f32.sub
        local.get $t
        f32.mul
        f32.store
    )

    (func $mat4_inv (;445;) (export "mat4_inv") (param $dest i32) (param $from i32) (result i32)
        (local $A f32) (local $B f32) (local $C f32) (local $D f32)
        (local $a f32) (local $b f32) (local $c f32) (local $d f32)
        (local $e f32) (local $f f32) (local $g f32) (local $h f32)
        (local $i f32) (local $j f32) (local $k f32) (local $l f32)
        (local $m f32) (local $n f32) (local $o f32) (local $p f32) (local $t f32)
        (local $t1 f32) (local $t2 f32) (local $t3 f32) (local $t4 f32) (local $t5 f32) (local $t6 f32)

        local.get $from
        i32.const 40
        i32.add
        f32.load
        local.tee $k

        local.get $from
        i32.const 60
        i32.add
        f32.load
        local.tee $p

        f32.mul

        local.get $from
        i32.const 56
        i32.add
        f32.load
        local.tee $l

        local.get $from
        i32.const 44
        i32.add
        f32.load
        local.tee $o

        f32.mul
        f32.sub

        local.tee $t1

        local.get $from
        i32.const 20
        i32.add
        f32.load
        local.tee $f

        f32.mul

        local.get $from
        i32.const 36
        i32.add
        f32.load
        local.tee $g

        local.get $p

        f32.mul

        local.get $from
        i32.const 52
        i32.add
        f32.load
        local.tee $h

        local.get $o

        f32.mul
        f32.sub

        local.tee $t2

        local.get $from
        i32.const 24
        i32.add
        f32.load
        local.tee $j

        f32.mul
        f32.sub

        local.get $g
        local.get $l
        
        f32.mul

        local.get $h
        local.get $k

        f32.mul
        f32.sub

        local.tee $t3

        local.get $from
        i32.const 28
        i32.add
        f32.load
        local.tee $n

        f32.mul
        f32.add
        local.tee $A
        ;; a
        local.get $from
        f32.load
        local.tee $a
        
        f32.mul
        ;; a*(f*t1-j*t2+n*t3)
        local.get $t1

        local.get $from
        i32.const 16
        i32.add
        f32.load
        local.tee $b

        f32.mul
        
        local.get $from
        i32.const 32
        i32.add
        f32.load
        local.tee $c

        local.get $p

        f32.mul

        local.get $from
        i32.const 48
        i32.add
        f32.load
        local.tee $d

        local.get $o

        f32.mul
        f32.sub

        local.tee $t4

        local.get $j

        f32.mul
        f32.sub

        
        local.get $c
        local.get $l

        f32.mul

        local.get $d
        local.get $k

        f32.mul
        f32.sub

        local.tee $t5

        local.get $n

        f32.mul

        f32.add

        local.tee $B

        local.get $from
        i32.const 4
        i32.add
        f32.load
        local.tee $e
        
        f32.mul

        f32.sub
        ;; a*(f*t1-j*t2+n*t3) - e*(b*t1+n*t5-j*t4)
        local.get $t2
        local.get $b

        f32.mul

        local.get $t4
        local.get $f

        f32.mul

        f32.sub

        local.get $c
        local.get $h

        f32.mul

        local.get $d
        local.get $g

        f32.mul
        f32.sub

        local.tee $t6

        local.get $n

        f32.mul

        f32.add

        local.tee $C
        
        ;; i
        local.get $from
        i32.const 8
        i32.add
        f32.load
        local.tee $i

        f32.mul

        f32.add
        ;; a*(f*t1-j*t2+n*t3) - e*(b*t1+n*t5-j*t4) + i*(b*t2-f*t4+n*t6)
        local.get $b
        local.get $t3

        f32.mul

        local.get $j
        local.get $t6

        f32.mul
        f32.add

        local.get $f
        local.get $t5

        f32.mul
        
        f32.sub

        local.tee $D

        local.get $from
        i32.const 12
        i32.add
        f32.load
        local.tee $m

        f32.mul

        f32.sub
        ;; a*(f*t1-j*t2+n*t3) - e*(b*t1+n*t5-j*t4) + i*(b*t2-f*t4+n*t6) - m*(b*t3+j*t6-f*t5)
        local.tee $t
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt

        f32.const 1.0
        local.get $t
        f32.div
        local.set $t

        local.get $dest
        local.get $A
        local.get $t
        f32.mul
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        local.get $B
        f32.neg
        local.get $t
        f32.mul
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        local.get $C
        local.get $t
        f32.mul
        f32.store

        local.get $dest
        i32.const 48
        i32.add
        local.get $D
        f32.neg
        local.get $t
        f32.mul
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        local.get $i
        local.get $t2
        f32.mul
        local.get $e
        local.get $t1
        f32.mul
        f32.sub
        local.get $m
        local.get $t3
        f32.mul
        f32.sub
        local.get $t
        f32.mul
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        local.get $a
        local.get $t1
        f32.mul
        local.get $i
        local.get $t4
        f32.mul
        f32.sub
        local.get $m
        local.get $t5
        f32.mul
        f32.add
        local.get $t
        f32.mul
        f32.store

        local.get $dest
        i32.const 36
        i32.add
        local.get $e
        local.get $t4
        f32.mul
        local.get $a
        local.get $t2
        f32.mul
        f32.sub
        local.get $m
        local.get $t6
        f32.mul
        f32.sub
        local.get $t
        f32.mul
        f32.store

        local.get $dest
        i32.const 52
        i32.add
        local.get $a
        local.get $t3
        f32.mul
        local.get $e
        local.get $t5
        f32.mul
        f32.sub
        local.get $i
        local.get $t6
        f32.mul
        f32.add
        local.get $t
        f32.mul
        f32.store

        local.get $dest
        i32.const 8
        i32.add

        local.get $i
        local.get $n
        f32.mul
        local.get $j
        local.get $m
        f32.mul
        f32.sub
        local.tee $t1

        local.get $h

        f32.mul

        local.get $e
        local.get $n
        f32.mul
        local.get $f
        local.get $m
        f32.mul
        f32.sub
        local.tee $t2

        local.get $l
        
        f32.mul
        f32.sub

        local.get $e
        local.get $j
        f32.mul
        local.get $f
        local.get $i
        f32.mul
        f32.sub
        local.tee $t3

        local.get $p

        f32.mul
        f32.add

        local.get $t
        
        f32.mul
        f32.store

        local.get $dest
        i32.const 24
        i32.add

        local.get $a
        local.get $n
        f32.mul
        local.get $b
        local.get $m
        f32.mul
        f32.sub
        local.tee $t4

        local.get $l

        f32.mul

        local.get $t1
        local.get $d
        
        f32.mul
        f32.sub

        local.get $a
        local.get $j
        f32.mul
        local.get $b
        local.get $i
        f32.mul
        f32.sub
        local.tee $t5

        local.get $p

        f32.mul
        f32.sub

        local.get $t

        f32.mul

        f32.store

        local.get $dest
        i32.const 40
        i32.add

        local.get $d
        local.get $t2

        f32.mul

        local.get $h
        local.get $t4

        f32.mul
        f32.sub

        local.get $a
        local.get $f
        f32.mul
        local.get $b
        local.get $e
        f32.mul
        f32.sub
        local.tee $t6

        local.get $p

        f32.mul
        f32.add

        local.get $t

        f32.mul

        f32.store

        local.get $dest
        i32.const 56
        i32.add

        local.get $h
        local.get $t5

        f32.mul

        local.get $d
        local.get $t3

        f32.mul
        f32.sub

        local.get $l
        local.get $t6

        f32.mul
        f32.sub

        local.get $t

        f32.mul

        f32.store

        local.get $dest
        i32.const 12
        i32.add

        local.get $k
        local.get $t2

        f32.mul

        local.get $g
        local.get $t1

        f32.mul
        f32.sub

        local.get $o
        local.get $t3

        f32.mul
        f32.sub

        local.get $t

        f32.mul

        f32.store

        local.get $dest
        i32.const 28
        i32.add

        local.get $c
        local.get $t1

        f32.mul

        local.get $k
        local.get $t4

        f32.mul
        f32.sub

        local.get $o
        local.get $t5

        f32.mul
        f32.add

        local.get $t

        f32.mul

        f32.store

        local.get $dest
        i32.const 44
        i32.add

        local.get $g
        local.get $t4

        f32.mul

        local.get $c
        local.get $t2

        f32.mul
        f32.sub

        local.get $o
        local.get $t6

        f32.mul
        f32.sub

        local.get $t

        f32.mul

        f32.store

        local.get $dest
        i32.const 60
        i32.add

        local.get $c
        local.get $t3

        f32.mul

        local.get $g
        local.get $t5

        f32.mul
        f32.sub

        local.get $k
        local.get $t6

        f32.mul
        f32.add

        local.get $t

        f32.mul

        f32.store
    )

    (func $mat3_inv_rot (;80;) (export "mat3_inv_rot") (param $dest i32) (param $from i32)
        (local $t1 f32) (local $t2 f32)

        local.get $dest
        local.get $from
        f32.load
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        local.get $from
        i32.const 16
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        local.get $from
        i32.const 32
        i32.add
        f32.load
        f32.store

        local.get $from
        i32.const 4
        i32.add
        f32.load
        local.set $t1

        local.get $from
        i32.const 12
        i32.add
        f32.load
        local.set $t2

        local.get $dest
        i32.const 4
        i32.add
        local.get $t2
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        local.get $t1
        f32.store

        local.get $from
        i32.const 8
        i32.add
        f32.load
        local.set $t1

        local.get $from
        i32.const 24
        i32.add
        f32.load
        local.set $t2

        local.get $dest
        i32.const 8
        i32.add
        local.get $t2
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        local.get $t1
        f32.store

        local.get $from
        i32.const 20
        i32.add
        f32.load
        local.set $t1

        local.get $from
        i32.const 28
        i32.add
        f32.load
        local.set $t2

        local.get $dest
        i32.const 20
        i32.add
        local.get $t2
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        local.get $t1
        f32.store
    )

    (func $mat4_inv_rot (;148;) (export "mat4_inv_rot") (param $dest i32) (param $from i32)
        (local $t1 f32) (local $t2 f32)

        local.get $dest
        local.get $from
        f32.load
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        local.get $from
        i32.const 20
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 40
        i32.add
        local.get $from
        i32.const 40
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 60
        i32.add
        local.get $from
        i32.const 60
        i32.add
        f32.load
        f32.store

        local.get $from
        i32.const 4
        i32.add
        f32.load
        local.set $t1

        local.get $from
        i32.const 16
        i32.add
        f32.load
        local.set $t2

        local.get $dest
        i32.const 4
        i32.add
        local.get $t2
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        local.get $t1
        f32.store

        local.get $from
        i32.const 8
        i32.add
        f32.load
        local.set $t1

        local.get $from
        i32.const 32
        i32.add
        f32.load
        local.set $t2

        local.get $dest
        i32.const 8
        i32.add
        local.get $t2
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        local.get $t1
        f32.store

        local.get $from
        i32.const 12
        i32.add
        f32.load
        local.set $t1

        local.get $from
        i32.const 48
        i32.add
        f32.load
        local.set $t2

        local.get $dest
        i32.const 12
        i32.add
        local.get $t2
        f32.store

        local.get $dest
        i32.const 48
        i32.add
        local.get $t1
        f32.store

        local.get $from
        i32.const 24
        i32.add
        f32.load
        local.set $t1

        local.get $from
        i32.const 36
        i32.add
        f32.load
        local.set $t2

        local.get $dest
        i32.const 24
        i32.add
        local.get $t2
        f32.store

        local.get $dest
        i32.const 36
        i32.add
        local.get $t1
        f32.store

        local.get $from
        i32.const 28
        i32.add
        f32.load
        local.set $t1

        local.get $from
        i32.const 52
        i32.add
        f32.load
        local.set $t2

        local.get $dest
        i32.const 28
        i32.add
        local.get $t2
        f32.store

        local.get $dest
        i32.const 52
        i32.add
        local.get $t1
        f32.store

        local.get $from
        i32.const 44
        i32.add
        f32.load
        local.set $t1

        local.get $from
        i32.const 56
        i32.add
        f32.load
        local.set $t2

        local.get $dest
        i32.const 44
        i32.add
        local.get $t2
        f32.store

        local.get $dest
        i32.const 56
        i32.add
        local.get $t1
        f32.store
    )

    (func $mat4_inv_bd (;388;) (export "mat4_inv_bd") (param $dest i32) (param $from i32) (result i32)
        (local $v1 f32) (local $v2 f32)
        (local $v3 f32) (local $v4 f32)
        (local $t f32) (local $r i32)
        (local $a1 f32) (local $a2 f32) (local $a3 f32) (local $a4 f32)
        (local $t1 f32) (local $t2 f32) (local $t3 f32) (local $t4 f32)
        (local $t5 f32) (local $t6 f32) (local $t7 f32) (local $t8 f32)
        (local $t9 f32) (local $t10 f32) (local $t11 f32) (local $t12 f32)
        (local $t13 f32) (local $t14 f32) (local $t15 f32) (local $t16 f32)

        local.get $from
        f32.load
        local.tee $a4

        local.get $from
        i32.const 20
        i32.add
        f32.load
        local.tee $a1

        f32.mul

        local.get $from
        i32.const 16
        i32.add
        f32.load
        local.tee $a2

        local.get $from
        i32.const 4
        i32.add
        f32.load
        local.tee $a3

        f32.mul
        f32.sub

        local.tee $t
        f32.abs
        global.get $f32_eq_tolerance
        f32.gt
        local.set $r

        f32.const 1.0
        local.get $t
        f32.div
        local.tee $t

        local.get $a1
        f32.mul
        local.set $a1

        local.get $a2
        local.get $t
        f32.mul
        f32.neg
        local.set $a2

        local.get $a3
        local.get $t
        f32.mul
        f32.neg
        local.set $a3

        local.get $a4
        local.get $t
        f32.mul
        local.set $a4

        local.get $from
        i32.const 8
        i32.add
        f32.load
        local.tee $v1

        local.get $a1

        f32.mul

        local.get $from
        i32.const 24
        i32.add
        f32.load
        local.tee $v2

        local.get $a3

        f32.mul
        f32.add

        local.set $t1

        local.get $v1
        local.get $a2
        
        f32.mul

        local.get $v2
        local.get $a4

        f32.mul
        f32.add

        local.set $t2

        local.get $from
        i32.const 12
        i32.add
        f32.load
        local.tee $v1

        local.get $a1

        f32.mul

        local.get $from
        i32.const 28
        i32.add
        f32.load
        local.tee $v2

        local.get $a3

        f32.mul
        f32.add

        local.set $t3

        local.get $v1
        local.get $a2

        f32.mul

        local.get $v2
        local.get $a4

        f32.mul
        f32.add

        local.set $t4

        local.get $from
        i32.const 40
        i32.add
        f32.load
        ;; k

        local.get $from
        i32.const 32
        i32.add
        f32.load
        local.tee $v1

        local.get $t1

        f32.mul
        f32.sub

        local.get $from
        i32.const 36
        i32.add
        f32.load
        local.tee $v2

        local.get $t2

        f32.mul
        f32.sub

        local.set $t5

        local.get $from
        i32.const 44
        i32.add
        f32.load
        ;; o

        local.get $t3
        local.get $v1

        f32.mul
        f32.sub

        local.get $t4
        local.get $v2

        f32.mul
        f32.sub

        local.set $t7

        local.get $from
        i32.const 56
        i32.add
        f32.load
        ;; l

        local.get $from
        i32.const 48
        i32.add
        f32.load
        local.tee $v3

        local.get $t1

        f32.mul
        f32.sub

        local.get $from
        i32.const 52
        i32.add
        f32.load
        local.tee $v4

        local.get $t2

        f32.mul
        f32.sub

        local.set $t6

        local.get $from
        i32.const 60
        i32.add
        f32.load
        ;; p

        local.get $v3
        local.get $t3

        f32.mul
        f32.sub

        local.get $v4
        local.get $t4

        f32.mul
        f32.sub

        local.set $t8

        f32.const 1.0

        local.get $t5
        local.get $t8

        f32.mul

        local.get $t6
        local.get $t7

        f32.mul
        f32.sub

        ;; maybe check for Schur complement is zero.

        f32.div

        local.tee $t
        local.get $t8
        f32.mul
        local.set $t8

        local.get $dest
        i32.const 40
        i32.add

        local.get $t8
        f32.store

        local.get $dest
        i32.const 56
        i32.add
        local.get $t6
        local.get $t
        f32.mul
        f32.neg
        local.tee $t6
        f32.store

        local.get $dest
        i32.const 44
        i32.add
        local.get $t7
        local.get $t
        f32.mul
        f32.neg
        local.tee $t7
        f32.store

        local.get $dest
        i32.const 60
        i32.add
        local.get $t5
        local.get $t
        f32.mul
        local.tee $t5
        f32.store

        local.get $a1
        local.get $v1

        f32.mul

        local.get $a2
        local.get $v2

        f32.mul
        f32.add

        local.set $t9

        local.get $a1
        local.get $v3

        f32.mul

        local.get $a2
        local.get $v4

        f32.mul
        f32.add

        local.set $t10

        local.get $a3
        local.get $v1

        f32.mul

        local.get $a4
        local.get $v2

        f32.mul
        f32.add

        local.set $t11

        local.get $a3
        local.get $v3

        f32.mul

        local.get $a4
        local.get $v4
        
        f32.mul
        f32.add

        local.set $t12

        local.get $dest
        i32.const 32
        i32.add

        local.get $t9
        local.get $t8

        f32.mul

        local.get $t10
        local.get $t7

        f32.mul
        f32.add

        local.tee $t13

        f32.neg
        f32.store
        
        local.get $dest
        i32.const 48
        i32.add

        local.get $t9
        local.get $t6

        f32.mul

        local.get $t10
        local.get $t5

        f32.mul
        f32.add

        local.tee $t14

        f32.neg
        f32.store

        local.get $dest
        i32.const 36
        i32.add

        local.get $t11
        local.get $t8

        f32.mul

        local.get $t12
        local.get $t7

        f32.mul
        f32.add

        local.tee $t15

        f32.neg
        f32.store

        local.get $dest
        i32.const 52
        i32.add

        local.get $t11
        local.get $t6

        f32.mul

        local.get $t12
        local.get $t5

        f32.mul
        f32.add

        local.tee $t16

        f32.neg
        f32.store

        local.get $dest

        local.get $a1

        local.get $t13
        local.get $t1
        
        f32.mul
        f32.add

        local.get $t14
        local.get $t3

        f32.mul
        f32.add

        f32.store

        local.get $dest
        i32.const 4
        i32.add

        local.get $a3

        local.get $t15
        local.get $t1
        
        f32.mul
        f32.add

        local.get $t16
        local.get $t3

        f32.mul
        f32.add

        f32.store

        local.get $dest
        i32.const 16
        i32.add

        local.get $a2

        local.get $t13
        local.get $t2
        
        f32.mul
        f32.add

        local.get $t14
        local.get $t4

        f32.mul
        f32.add

        f32.store

        local.get $dest
        i32.const 20
        i32.add

        local.get $a4

        local.get $t15
        local.get $t2
        
        f32.mul
        f32.add

        local.get $t16
        local.get $t4

        f32.mul
        f32.add

        f32.store

        local.get $dest
        i32.const 8
        i32.add

        local.get $t8
        local.get $t1

        f32.mul

        local.get $t6
        local.get $t3

        f32.mul
        f32.add
        f32.neg

        f32.store

        local.get $dest
        i32.const 12
        i32.add

        local.get $t7
        local.get $t1

        f32.mul

        local.get $t5
        local.get $t3

        f32.mul
        f32.add
        f32.neg

        f32.store

        local.get $dest
        i32.const 24
        i32.add

        local.get $t8
        local.get $t2

        f32.mul

        local.get $t6
        local.get $t4

        f32.mul
        f32.add
        f32.neg

        f32.store

        local.get $dest
        i32.const 28
        i32.add

        local.get $t7
        local.get $t2

        f32.mul

        local.get $t5
        local.get $t4

        f32.mul
        f32.add
        f32.neg

        f32.store

        local.get $r
    )

    (func $mat3_prod (;201;) (export "mat3_prod") (param $dest i32) (param $from_a i32) (param $from_b i32)
        (local $a f32) (local $b f32) (local $c f32)
        (local $d f32) (local $e f32) (local $f f32)
        (local $g f32) (local $h f32) (local $i f32)
        (local $A f32) (local $B f32) (local $C f32)

        local.get $dest

        local.get $from_a
        f32.load
        local.tee $a

        local.get $from_b
        f32.load
        local.tee $A

        f32.mul

        local.get $from_a
        i32.const 12
        i32.add
        f32.load
        local.tee $b

        local.get $from_b
        i32.const 4
        i32.add
        f32.load
        local.tee $B

        f32.mul
        f32.add

        local.get $from_a
        i32.const 24
        i32.add
        f32.load
        local.tee $c

        local.get $from_b
        i32.const 8
        i32.add
        f32.load
        local.tee $C

        f32.mul
        f32.add

        f32.store

        local.get $dest
        i32.const 4
        i32.add

        local.get $from_a
        i32.const 4
        i32.add
        f32.load
        local.tee $d

        local.get $A

        f32.mul

        local.get $from_a
        i32.const 16
        i32.add
        f32.load
        local.tee $e

        local.get $B

        f32.mul
        f32.add

        local.get $from_a
        i32.const 28
        i32.add
        f32.load
        local.tee $f

        local.get $C

        f32.mul
        f32.add

        f32.store
        
        local.get $dest
        i32.const 8
        i32.add

        local.get $from_a
        i32.const 8
        i32.add
        f32.load
        local.tee $g

        local.get $A

        f32.mul

        local.get $from_a
        i32.const 20
        i32.add
        f32.load
        local.tee $h

        local.get $B

        f32.mul
        f32.add

        local.get $from_a
        i32.const 32
        i32.add
        f32.load
        local.tee $i

        local.get $C

        f32.mul
        f32.add

        f32.store
        
        local.get $dest
        i32.const 12
        i32.add

        local.get $a

        local.get $from_b
        i32.const 12
        i32.add
        f32.load
        local.tee $A

        f32.mul

        local.get $b

        local.get $from_b
        i32.const 16
        i32.add
        f32.load
        local.tee $B

        f32.mul
        f32.add

        local.get $c

        local.get $from_b
        i32.const 20
        i32.add
        f32.load
        local.tee $C

        f32.mul
        f32.add

        f32.store

        local.get $dest
        i32.const 16
        i32.add

        local.get $d
        local.get $A

        f32.mul

        local.get $e
        local.get $B

        f32.mul
        f32.add

        local.get $f
        local.get $C

        f32.mul
        f32.add

        f32.store

        local.get $dest
        i32.const 20
        i32.add

        local.get $g
        local.get $A

        f32.mul

        local.get $h
        local.get $B

        f32.mul
        f32.add

        local.get $i
        local.get $C

        f32.mul
        f32.add

        f32.store

        local.get $dest
        i32.const 24
        i32.add

        local.get $a

        local.get $from_b
        i32.const 24
        i32.add
        f32.load
        local.tee $A

        f32.mul

        local.get $b

        local.get $from_b
        i32.const 28
        i32.add
        f32.load
        local.tee $B

        f32.mul
        f32.add

        local.get $c

        local.get $from_b
        i32.const 32
        i32.add
        f32.load
        local.tee $C

        f32.mul
        f32.add

        f32.store

        local.get $dest
        i32.const 28
        i32.add

        local.get $d
        local.get $A

        f32.mul

        local.get $e
        local.get $B

        f32.mul
        f32.add

        local.get $f
        local.get $C

        f32.mul
        f32.add

        f32.store

        local.get $dest
        i32.const 32
        i32.add

        local.get $g
        local.get $A

        f32.mul

        local.get $h
        local.get $B

        f32.mul
        f32.add

        local.get $i
        local.get $C

        f32.mul
        f32.add

        f32.store
    )

    (func $mat4_prod (;426;) (export "mat4_prod") (param $dest i32) (param $from_a i32) (param $from_b i32)
        (local $A f32) (local $B f32) (local $C f32) (local $D f32)
        (local $E f32) (local $F f32) (local $G f32) (local $H f32)
        (local $I f32) (local $J f32) (local $K f32) (local $L f32)
        (local $M f32) (local $N f32) (local $O f32) (local $P f32)
        (local $t1 f32) (local $t2 f32) (local $t3 f32) (local $t4 f32)

        local.get $dest

        local.get $from_a
        f32.load
        local.tee $t1

        local.get $from_b
        f32.load
        local.tee $A

        f32.mul

        local.get $from_a
        i32.const 16
        i32.add
        f32.load
        local.tee $t2

        local.get $from_b
        i32.const 4
        i32.add
        f32.load
        local.tee $E

        f32.mul
        f32.add

        local.get $from_a
        i32.const 32
        i32.add
        f32.load
        local.tee $t3

        local.get $from_b
        i32.const 8
        i32.add
        f32.load
        local.tee $I

        f32.mul
        f32.add

        local.get $from_a
        i32.const 48
        i32.add
        f32.load
        local.tee $t4

        local.get $from_b
        i32.const 12
        i32.add
        f32.load
        local.tee $M

        f32.mul
        f32.add

        f32.store

        local.get $dest
        i32.const 16
        i32.add

        local.get $t1

        local.get $from_b
        i32.const 16
        i32.add
        f32.load
        local.tee $B

        f32.mul

        local.get $t2

        local.get $from_b
        i32.const 20
        i32.add
        f32.load
        local.tee $F

        f32.mul
        f32.add

        local.get $t3

        local.get $from_b
        i32.const 24
        i32.add
        f32.load
        local.tee $J

        f32.mul
        f32.add

        local.get $t4

        local.get $from_b
        i32.const 28
        i32.add
        f32.load
        local.tee $N

        f32.mul
        f32.add

        f32.store

        local.get $dest
        i32.const 32
        i32.add

        local.get $t1

        local.get $from_b
        i32.const 32
        i32.add
        f32.load
        local.tee $C

        f32.mul

        local.get $t2

        local.get $from_b
        i32.const 36
        i32.add
        f32.load
        local.tee $G

        f32.mul
        f32.add

        local.get $t3

        local.get $from_b
        i32.const 40
        i32.add
        f32.load
        local.tee $K

        f32.mul
        f32.add

        local.get $t4

        local.get $from_b
        i32.const 44
        i32.add
        f32.load
        local.tee $O

        f32.mul
        f32.add

        f32.store

        local.get $dest
        i32.const 48
        i32.add

        local.get $t1

        local.get $from_b
        i32.const 48
        i32.add
        f32.load
        local.tee $D

        f32.mul

        local.get $t2

        local.get $from_b
        i32.const 52
        i32.add
        f32.load
        local.tee $H

        f32.mul
        f32.add

        local.get $t3

        local.get $from_b
        i32.const 56
        i32.add
        f32.load
        local.tee $L

        f32.mul
        f32.add

        local.get $t4

        local.get $from_b
        i32.const 60
        i32.add
        f32.load
        local.tee $P

        f32.mul
        f32.add

        f32.store

        local.get $dest
        i32.const 4
        i32.add

        local.get $from_a
        i32.const 4
        i32.add
        f32.load
        local.tee $t1

        local.get $A

        f32.mul

        local.get $from_a
        i32.const 20
        i32.add
        f32.load
        local.tee $t2

        local.get $E

        f32.mul
        f32.add

        local.get $from_a
        i32.const 36
        i32.add
        f32.load
        local.tee $t3

        local.get $I

        f32.mul
        f32.add

        local.get $from_a
        i32.const 52
        i32.add
        f32.load
        local.tee $t4

        local.get $M

        f32.mul
        f32.add

        f32.store

        local.get $dest
        i32.const 20
        i32.add

        local.get $t1
        local.get $B

        f32.mul

        local.get $t2
        local.get $F

        f32.mul
        f32.add

        local.get $t3
        local.get $J

        f32.mul
        f32.add

        local.get $t4
        local.get $N

        f32.mul
        f32.add

        f32.store

        local.get $dest
        i32.const 36
        i32.add

        local.get $t1
        local.get $C

        f32.mul

        local.get $t2
        local.get $G

        f32.mul
        f32.add

        local.get $t3
        local.get $K

        f32.mul
        f32.add

        local.get $t4
        local.get $O

        f32.mul
        f32.add

        f32.store

        local.get $dest
        i32.const 52
        i32.add

        local.get $t1
        local.get $D

        f32.mul

        local.get $t2
        local.get $H

        f32.mul
        f32.add

        local.get $t3
        local.get $L

        f32.mul
        f32.add

        local.get $t4
        local.get $P

        f32.mul
        f32.add

        f32.store

        local.get $dest
        i32.const 8
        i32.add

        local.get $from_a
        i32.const 8
        i32.add
        f32.load
        local.tee $t1

        local.get $A

        f32.mul

        local.get $from_a
        i32.const 24
        i32.add
        f32.load
        local.tee $t2

        local.get $E

        f32.mul
        f32.add

        local.get $from_a
        i32.const 40
        i32.add
        f32.load
        local.tee $t3

        local.get $I

        f32.mul
        f32.add

        local.get $from_a
        i32.const 56
        i32.add
        f32.load
        local.tee $t4

        local.get $M

        f32.mul
        f32.add

        f32.store

        local.get $dest
        i32.const 24
        i32.add

        local.get $t1
        local.get $B

        f32.mul

        local.get $t2
        local.get $F

        f32.mul
        f32.add

        local.get $t3
        local.get $J

        f32.mul
        f32.add

        local.get $t4
        local.get $N

        f32.mul
        f32.add

        f32.store

        local.get $dest
        i32.const 40
        i32.add

        local.get $t1
        local.get $C

        f32.mul

        local.get $t2
        local.get $G

        f32.mul
        f32.add

        local.get $t3
        local.get $K

        f32.mul
        f32.add

        local.get $t4
        local.get $O

        f32.mul
        f32.add

        f32.store

        local.get $dest
        i32.const 56
        i32.add

        local.get $t1
        local.get $D

        f32.mul

        local.get $t2
        local.get $H

        f32.mul
        f32.add

        local.get $t3
        local.get $L

        f32.mul
        f32.add

        local.get $t4
        local.get $P

        f32.mul
        f32.add

        f32.store

        local.get $dest
        i32.const 12
        i32.add

        local.get $from_a
        i32.const 12
        i32.add
        f32.load
        local.tee $t1

        local.get $A

        f32.mul

        local.get $from_a
        i32.const 28
        i32.add
        f32.load
        local.tee $t2

        local.get $E

        f32.mul
        f32.add

        local.get $from_a
        i32.const 44
        i32.add
        f32.load
        local.tee $t3

        local.get $I

        f32.mul
        f32.add

        local.get $from_a
        i32.const 60
        i32.add
        f32.load
        local.tee $t4

        local.get $M

        f32.mul
        f32.add

        f32.store

        local.get $dest
        i32.const 28
        i32.add

        local.get $t1
        local.get $B

        f32.mul

        local.get $t2
        local.get $F

        f32.mul
        f32.add

        local.get $t3
        local.get $J

        f32.mul
        f32.add

        local.get $t4
        local.get $N

        f32.mul
        f32.add

        f32.store

        local.get $dest
        i32.const 44
        i32.add

        local.get $t1
        local.get $C

        f32.mul

        local.get $t2
        local.get $G

        f32.mul
        f32.add

        local.get $t3
        local.get $K

        f32.mul
        f32.add

        local.get $t4
        local.get $O

        f32.mul
        f32.add

        f32.store

        local.get $dest
        i32.const 60
        i32.add

        local.get $t1
        local.get $D

        f32.mul

        local.get $t2
        local.get $H

        f32.mul
        f32.add

        local.get $t3
        local.get $L

        f32.mul
        f32.add

        local.get $t4
        local.get $P

        f32.mul
        f32.add

        f32.store
    )

    (func $mat3_mul_vec (;78;) (export "mat3_mul_vec") (param $dest i32) (param $mat i32) (param $vec i32)
        (local $x f32) (local $y f32) (local $z f32)
        local.get $dest

        local.get $vec
        f32.load
        local.tee $x

        local.get $mat
        f32.load

        f32.mul

        local.get $vec
        i32.const 4
        i32.add
        f32.load
        local.tee $y

        local.get $mat
        i32.const 12
        i32.add
        f32.load

        f32.mul
        f32.add

        local.get $vec
        i32.const 8
        i32.add
        f32.load
        local.tee $z

        local.get $mat
        i32.const 24
        i32.add
        f32.load

        f32.mul
        f32.add

        f32.store

        local.get $dest
        i32.const 4
        i32.add

        local.get $mat
        i32.const 4
        i32.add
        f32.load
        
        local.get $x

        f32.mul

        local.get $mat
        i32.const 16
        i32.add
        f32.load
        
        local.get $y

        f32.mul
        f32.add

        local.get $mat
        i32.const 28
        i32.add
        f32.load
        
        local.get $z

        f32.mul
        f32.add

        f32.store

        local.get $dest
        i32.const 8
        i32.add

        local.get $mat
        i32.const 8
        i32.add
        f32.load
        
        local.get $x

        f32.mul

        local.get $mat
        i32.const 20
        i32.add
        f32.load
        
        local.get $y

        f32.mul
        f32.add

        local.get $mat
        i32.const 32
        i32.add
        f32.load
        
        local.get $z

        f32.mul
        f32.add

        f32.store
    )

    (func $mat4_mul_vec (;134;) (export "mat4_mul_vec") (param $dest i32) (param $mat i32) (param $vec i32)
        (local $x f32) (local $y f32) (local $z f32) (local $w f32)
        local.get $dest

        local.get $vec
        f32.load
        local.tee $x

        local.get $mat
        f32.load

        f32.mul

        local.get $vec
        i32.const 4
        i32.add
        f32.load
        local.tee $y

        local.get $mat
        i32.const 16
        i32.add
        f32.load

        f32.mul
        f32.add

        local.get $vec
        i32.const 8
        i32.add
        f32.load
        local.tee $z

        local.get $mat
        i32.const 32
        i32.add
        f32.load

        f32.mul
        f32.add

        local.get $vec
        i32.const 12
        i32.add
        f32.load
        local.tee $w

        local.get $mat
        i32.const 48
        i32.add
        f32.load

        f32.mul
        f32.add

        f32.store

        local.get $dest
        i32.const 4
        i32.add

        local.get $mat
        i32.const 4
        i32.add
        f32.load

        local.get $x

        f32.mul

        local.get $mat
        i32.const 20
        i32.add
        f32.load

        local.get $y

        f32.mul
        f32.add

        local.get $mat
        i32.const 36
        i32.add
        f32.load

        local.get $z

        f32.mul
        f32.add

        local.get $mat
        i32.const 52
        i32.add
        f32.load

        local.get $w

        f32.mul
        f32.add

        f32.store

        local.get $dest
        i32.const 8
        i32.add

        local.get $mat
        i32.const 8
        i32.add
        f32.load

        local.get $x

        f32.mul

        local.get $mat
        i32.const 24
        i32.add
        f32.load

        local.get $y

        f32.mul
        f32.add

        local.get $mat
        i32.const 40
        i32.add
        f32.load

        local.get $z

        f32.mul
        f32.add

        local.get $mat
        i32.const 56
        i32.add
        f32.load

        local.get $w

        f32.mul
        f32.add

        f32.store

        local.get $dest
        i32.const 12
        i32.add

        local.get $mat
        i32.const 12
        i32.add
        f32.load

        local.get $x

        f32.mul

        local.get $mat
        i32.const 28
        i32.add
        f32.load

        local.get $y

        f32.mul
        f32.add

        local.get $mat
        i32.const 44
        i32.add
        f32.load

        local.get $z

        f32.mul
        f32.add

        local.get $mat
        i32.const 60
        i32.add
        f32.load

        local.get $w

        f32.mul
        f32.add

        f32.store
    )

    ;; the camera position is set to (1,1,1) by default.
    (global $ex (mut f64) (f64.const 1.0))
    (global $ey (mut f64) (f64.const 1.0))
    (global $ez (mut f64) (f64.const 1.0))
    ;; the camera looks at the origin by default.
    (global $cx (mut f64) (f64.const 0.0))
    (global $cy (mut f64) (f64.const 0.0))
    (global $cz (mut f64) (f64.const 0.0))
    ;; the camera up vector is set to the y basic vector by default.
    (global $ux (mut f64) (f64.const 0.0))
    (global $uy (mut f64) (f64.const 1.0))
    (global $uz (mut f64) (f64.const 0.0))
    ;; the vertical field of view is set to 60 degrees, in radians, by default.
    (global $fovy (mut f64) (f64.const 1.0471975511965976))
    ;; the aspect ratio is set to 16:9 by default.
    (global $aspect_ratio (mut f64) (f64.const 1.7777777777777777))
    ;; the left boundary of the view volume.
    (global $left (mut f64) (f64.const 0.0))
    ;; the right boundary of the view volume.
    (global $right (mut f64) (f64.const 0.0))
    ;; the bottom boundary of the view volume.
    (global $bottom (mut f64) (f64.const 0.0))
    ;; the top boundary of the view volume.
    (global $top (mut f64) (f64.const 0.0))
    ;; the near plane is set to 0.1 by default, for a 1:1000 ratio.
    (global $near (mut f64) (f64.const 0.1))
    ;; the far plane is set to 100 by default, for a 1:1000 ratio.
    (global $far (mut f64) (f64.const 100.0))
    (global $vp_x (mut f64) (f64.const 0.0))
    (global $vp_y (mut f64) (f64.const 0.0))
    (global $vp_width (mut f64) (f64.const 1366.0))
    (global $vp_height (mut f64) (f64.const 768.365))
    (global $vp_half_width (mut f64) (f64.const 683.0))
    (global $vp_half_height (mut f64) (f64.const 384.1825))

    (func $set_perspective_camera (;26;) (export "set_perspective_camera") (param f64 f64 f64 f64 f64 f64 f64 f64 f64 f64 f64 f64 f64)
        local.get 0
        global.set $ex

        local.get 1
        global.set $ey

        local.get 2
        global.set $ez

        local.get 3
        global.set $cx

        local.get 4
        global.set $cy

        local.get 5
        global.set $cz

        local.get 6
        global.set $ux

        local.get 7
        global.set $uy

        local.get 8
        global.set $uz

        local.get 9
        global.set $fovy

        local.get 10
        global.set $aspect_ratio

        local.get 11
        global.set $near

        local.get 12
        global.set $far
    )

    (func $set_orthographic_camera (;30;) (export "set_orthographic_camera") (param f64 f64 f64 f64 f64 f64 f64 f64 f64 f64 f64 f64 f64 f64 f64)
        local.get 0
        global.set $ex

        local.get 1
        global.set $ey

        local.get 2
        global.set $ez

        local.get 3
        global.set $cx

        local.get 4
        global.set $cy

        local.get 5
        global.set $cz

        local.get 6
        global.set $ux

        local.get 7
        global.set $uy

        local.get 8
        global.set $uz

        local.get 9
        global.set $left

        local.get 10
        global.set $right

        local.get 11
        global.set $bottom

        local.get 12
        global.set $top

        local.get 13
        global.set $near

        local.get 14
        global.set $far
    )

    (func $set_camera_position (;11;) (export "set_camera_position") (param $from i32)
        local.get $from
        f32.load
        f64.promote_f32
        global.set $ex

        local.get $from
        i32.const 4
        i32.add
        f32.load
        f64.promote_f32
        global.set $ey

        local.get $from
        i32.const 8
        i32.add
        f32.load
        f64.promote_f32
        global.set $ez
    )

    (func $set_camera_positioni (;6;) (export "set_camera_positioni") (param f64 f64 f64)
        local.get 0
        global.set $ex

        local.get 1
        global.set $ey

        local.get 2
        global.set $ez
    )

    (func $get_camera_position (;3;) (export "get_camera_position") (result f64 f64 f64)
        global.get $ex
        global.get $ey
        global.get $ez
    )
    
    (func $set_camera_target (;11;) (export "set_camera_target") (param $from i32)
        local.get $from
        f32.load
        f64.promote_f32
        global.set $cx

        local.get $from
        i32.const 4
        i32.add
        f32.load
        f64.promote_f32
        global.set $cy

        local.get $from
        i32.const 8
        i32.add
        f32.load
        f64.promote_f32
        global.set $cz
    )

    (func $set_camera_targeti (;6;) (export "set_camera_targeti") (param f64 f64 f64)
        local.get 0
        global.set $cx

        local.get 1
        global.set $cy

        local.get 2
        global.set $cz
    )

    (func $get_camera_target (;3;) (export "get_camera_target") (result f64 f64 f64)
        global.get $cx
        global.get $cy
        global.get $cz
    )

    (func $set_camera_up_dir (;11;) (export "set_camera_up_dir") (param $from i32)
        local.get $from
        f32.load
        f64.promote_f32
        global.set $ux

        local.get $from
        i32.const 4
        i32.add
        f32.load
        f64.promote_f32
        global.set $uy

        local.get $from
        i32.const 8
        i32.add
        f32.load
        f64.promote_f32
        global.set $uz
    )

    (func $set_camera_up_diri (;6;) (export "set_camera_up_diri") (param f64 f64 f64)
        local.get 0
        global.set $ux

        local.get 1
        global.set $uy

        local.get 2
        global.set $uz
    )

    (func $get_camera_up_dir (;3;) (export "get_camera_up_dir") (result f64 f64 f64)
        global.get $ux
        global.get $uy
        global.get $uz
    )

    (func $set_fovy (;2;) (export "set_fovy") (param f64)
        local.get 0
        global.set $fovy
    )

    (func $get_fovy (;1;) (export "get_fovy") (result f64)
        global.get $fovy
    )

    (func $set_fovx (;8+2jscalls;) (export "set_fovx") (param $fovx f64)
        local.get $fovx
        f64.const 0.5
        f64.mul
        call $tan
        global.get $aspect_ratio
        f64.div
        call $atan
        f64.const 2.0
        f64.mul
        global.set $fovy
    )

    (func $get_fovx (;7+2jscalls;) (export "get_fovx") (result f64)
        global.get $fovy
        f64.const 0.5
        f64.mul
        call $tan
        global.get $aspect_ratio
        f64.mul
        call $atan
        f64.const 2.0
        f64.mul
    )

    (func $set_aspect_ratio (;2;) (export "set_aspect_ratio") (param f64)
        local.get 0
        global.set $aspect_ratio
    )

    (func $get_aspect_ratio (;1;) (export "get_aspect_ratio") (result f64)
        global.get $aspect_ratio
    )

    (func $set_left_plane (;2;) (export "set_left_plane") (param f64)
        local.get 0
        global.set $left
    )

    (func $get_left_plane (;1;) (export "get_left_plane") (result f64)
        global.get $left
    )

    (func $set_right_plane (;2;) (export "set_right_plane") (param f64)
        local.get 0
        global.set $right
    )

    (func $get_right_plane (;1;) (export "get_right_plane") (result f64)
        global.get $right
    )

    (func $set_bottom_plane (;2;) (export "set_bottom_plane") (param f64)
        local.get 0
        global.set $bottom
    )

    (func $get_bottom_plane (;1;) (export "get_bottom_plane") (result f64)
        global.get $bottom
    )

    (func $set_top_plane (;2;) (export "set_top_plane") (param f64)
        local.get 0
        global.set $top
    )

    (func $get_top_plane (;1;) (export "get_top_plane") (result f64)
        global.get $top
    )

    (func $set_near_plane (;2;) (export "set_near_plane") (param f64)
        local.get 0
        global.set $near
    )

    (func $get_near_plane (;1;) (export "get_near_plane") (result f64)
        global.get $near
    )

    (func $set_far_plane (;2;) (export "set_far_plane") (param f64)
        local.get 0
        global.set $far
    )

    (func $get_far_plane (;1;) (export "get_far_plane") (result f64)
        global.get $far
    )

    (func $set_viewport (;25;) (export "set_viewport") (param $x f64) (param $y f64) (param $width f64) (param $height f64)
        local.get $x
        global.set $vp_x

        local.get $y
        global.set $vp_y

        local.get $width
        global.set $vp_width

        local.get $height
        global.set $vp_height

        local.get $width
        local.get $height
        f64.div
        global.set $aspect_ratio

        local.get $width
        f64.const 0.5
        f64.mul
        global.set $vp_half_width

        local.get $height
        f64.const 0.5
        f64.mul
        global.set $vp_half_height
    )

    (func $view_matrix (;246;) (export "view_matrix") (param $dest i32)
        (local $zx f64) (local $zy f64) (local $zz f64) (local $z_mag f64) (local $t f64)
        (local $tx f64) (local $ty f64) (local $tz f64)
        (local $T1 f64) (local $T2 f64) (local $T3 f64)
        (local $T4 f64) (local $T5 f64) (local $T6 f64)
        global.get $ex
        global.get $cx
        f64.sub
        local.set $zx

        global.get $ey
        global.get $cy
        f64.sub
        local.set $zy

        global.get $ez
        global.get $cz
        f64.sub
        local.set $zz

        ;; compute the inv magnitude of the z camera basis vector.
        local.get $zx
        local.get $zx
        f64.mul
        local.get $zy
        local.get $zy
        f64.mul
        f64.add
        local.get $zz
        local.get $zz
        f64.mul
        f64.add
        f64.sqrt
        local.set $z_mag

        f64.const 1.0
        global.get $uy
        local.get $zz
        f64.mul
        global.get $uz
        local.get $zy
        f64.mul
        f64.sub
        local.tee $tx
        local.get $tx
        f64.mul

        global.get $uz
        local.get $zx
        f64.mul
        global.get $ux
        local.get $zz
        f64.mul
        f64.sub
        local.tee $ty
        local.get $ty
        f64.mul
        f64.add

        global.get $ux
        local.get $zy
        f64.mul
        global.get $uy
        local.get $zx
        f64.mul
        f64.sub
        local.tee $tz
        local.get $tz
        f64.mul
        f64.add
        f64.sqrt

        f64.div
        ;; t = 1 / (||x|| * ||z||)
        local.set $t

        local.get $dest
        local.get $tx
        local.get $t
        f64.mul
        local.tee $T1
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        local.get $ty
        local.get $t
        f64.mul
        local.tee $T2
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        local.get $tz
        local.get $t
        f64.mul
        local.tee $T3
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 48
        i32.add
        local.get $T1
        global.get $ex
        f64.mul
        local.get $T2
        global.get $ey
        f64.mul
        f64.add
        local.get $T3
        global.get $ez
        f64.mul
        f64.add
        f64.neg
        f32.demote_f64
        f32.store

        f64.const 1.0

        local.get $zy
        local.get $T3
        f64.mul
        local.get $zz
        local.get $T2
        f64.mul
        f64.sub
        local.tee $tx
        local.get $tx
        f64.mul

        local.get $zz
        local.get $T1
        f64.mul
        local.get $zx
        local.get $T3
        f64.mul
        f64.sub
        local.tee $ty
        local.get $ty
        f64.mul
        f64.add

        local.get $zx
        local.get $T2
        f64.mul
        local.get $zy
        local.get $T1
        f64.mul
        f64.sub
        local.tee $tz
        local.get $tz
        f64.mul
        f64.add
        f64.sqrt

        f64.div
        local.set $t

        local.get $dest
        i32.const 4
        i32.add
        local.get $tx
        local.get $t
        f64.mul
        local.tee $T4
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        local.get $ty
        local.get $t
        f64.mul
        local.tee $T5
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 36
        i32.add
        local.get $tz
        local.get $t
        f64.mul
        local.tee $T6
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 52
        i32.add
        local.get $T4
        global.get $ex
        f64.mul
        local.get $T5
        global.get $ey
        f64.mul
        f64.add
        local.get $T6
        global.get $ez
        f64.mul
        f64.add
        f64.neg
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 56
        i32.add

        local.get $zx
        local.get $z_mag
        f64.div
        local.tee $zx
        global.get $ex
        f64.mul

        local.get $zy
        local.get $z_mag
        f64.div
        local.tee $zy
        global.get $ey
        f64.mul
        f64.add

        local.get $zz
        local.get $z_mag
        f64.div
        local.tee $zz
        global.get $ez
        f64.mul
        f64.add
        f64.neg

        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        local.get $zx
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        local.get $zy
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 40
        i32.add
        local.get $zz
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        f32.const 0.0
        f32.store
        
        local.get $dest
        i32.const 28
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 44
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 60
        i32.add
        f32.const 1.0
        f32.store
    )

    (func $viewport_matrix (;87;) (export "viewport_matrix") (param $dest i32)
        local.get $dest
        global.get $vp_half_width
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 48
        i32.add
        global.get $vp_half_width
        global.get $vp_x
        f64.add
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        global.get $vp_half_height
        f32.demote_f64
        f32.neg
        f32.store

        local.get $dest
        i32.const 52
        i32.add
        
        global.get $vp_half_height
        global.get $vp_y
        f64.add
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 40
        i32.add
        f32.const 1.0
        f32.store

        local.get $dest
        i32.const 60
        i32.add
        f32.const 1.0
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 36
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 44
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 56
        i32.add
        f32.const 0.0
        f32.store
    )

    (func $perspective_matrix (;103;) (export "perspective_matrix") (param $dest i32)
        (local $t f64)
        local.get $dest
        i32.const 20
        i32.add

        f64.const 1.0
        global.get $fovy
        f64.const 0.5
        f64.mul
        call $tan
        f64.div
        local.tee $t

        f32.demote_f64
        f32.store

        local.get $dest

        local.get $t
        global.get $aspect_ratio
        f64.div

        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 40
        i32.add

        global.get $near
        global.get $far
        f64.add
        global.get $near
        global.get $far
        f64.sub
        local.tee $t
        f64.div
        
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 56
        i32.add

        global.get $near
        global.get $far
        f64.mul
        f64.const 2.0
        f64.mul
        local.get $t
        f64.div
        
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 44
        i32.add
        f32.const -1.0
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 36
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 48
        i32.add
        f32.const 0.0
        f32.store
        
        local.get $dest
        i32.const 52
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 60
        i32.add
        f32.const 0.0
        f32.store
    )

    (func $orthographic_matrix (;120;) (export "orthographic_matrix") (param $dest i32)
        (local $t f64)
        local.get $dest
        f64.const 2.0
        f64.const 1.0
        global.get $right
        global.get $left
        f64.sub
        f64.div
        local.tee $t
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 48
        i32.add
        global.get $right
        global.get $left
        f64.add
        f64.neg
        local.get $t
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        f64.const 2.0
        f64.const 1.0
        global.get $top
        global.get $bottom
        f64.sub
        f64.div
        local.tee $t
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 52
        i32.add
        global.get $top
        global.get $bottom
        f64.add
        f64.neg
        local.get $t
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 40
        i32.add
        f64.const -2.0
        f64.const 1.0
        global.get $far
        global.get $near
        f64.sub
        f64.div
        local.tee $t
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 56
        i32.add
        global.get $far
        global.get $near
        f64.add
        f64.neg
        local.get $t
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 60
        i32.add
        f32.const 1.0
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 36
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 44
        i32.add
        f32.const 0.0
        f32.store
    )

    (func $view_perspective (;315+jscall;) (export "view_perspective") (param $dest i32)
        (local $zx f64) (local $zy f64) (local $zz f64) (local $z_mag f64) (local $t f64)
        (local $tx f64) (local $ty f64) (local $tz f64)
        (local $T1 f64) (local $T2 f64) (local $T3 f64) (local $T7 f64)
        (local $T4 f64) (local $T5 f64) (local $T6 f64) (local $T8 f64) (local $T9 f64)
        global.get $ex
        global.get $cx
        f64.sub
        local.set $zx

        global.get $ey
        global.get $cy
        f64.sub
        local.set $zy

        global.get $ez
        global.get $cz
        f64.sub
        local.set $zz

        ;; compute the inv magnitude of the z camera basis vector.
        local.get $zx
        local.get $zx
        f64.mul
        local.get $zy
        local.get $zy
        f64.mul
        f64.add
        local.get $zz
        local.get $zz
        f64.mul
        f64.add
        f64.sqrt
        local.set $z_mag

        f64.const 1.0
        global.get $uy
        local.get $zz
        f64.mul
        global.get $uz
        local.get $zy
        f64.mul
        f64.sub
        local.tee $tx
        local.get $tx
        f64.mul

        global.get $uz
        local.get $zx
        f64.mul
        global.get $ux
        local.get $zz
        f64.mul
        f64.sub
        local.tee $ty
        local.get $ty
        f64.mul
        f64.add

        global.get $ux
        local.get $zy
        f64.mul
        global.get $uy
        local.get $zx
        f64.mul
        f64.sub
        local.tee $tz
        local.get $tz
        f64.mul
        f64.add
        f64.sqrt

        f64.div
        ;; t = 1 / (||x|| * ||z||)
        local.tee $t

        local.get $tx
        f64.mul
        local.set $T1

        local.get $ty
        local.get $t
        f64.mul
        local.set $T2

        local.get $tz
        local.get $t
        f64.mul
        local.set $T3

        local.get $T1
        global.get $ex
        f64.mul
        local.get $T2
        global.get $ey
        f64.mul
        f64.add
        local.get $T3
        global.get $ez
        f64.mul
        f64.add
        f64.neg
        local.set $T7

        f64.const 1.0

        local.get $zy
        local.get $T3
        f64.mul
        local.get $zz
        local.get $T2
        f64.mul
        f64.sub
        local.tee $tx
        local.get $tx
        f64.mul

        local.get $zz
        local.get $T1
        f64.mul
        local.get $zx
        local.get $T3
        f64.mul
        f64.sub
        local.tee $ty
        local.get $ty
        f64.mul
        f64.add

        local.get $zx
        local.get $T2
        f64.mul
        local.get $zy
        local.get $T1
        f64.mul
        f64.sub
        local.tee $tz
        local.get $tz
        f64.mul
        f64.add
        f64.sqrt

        f64.div
        local.tee $t

        local.get $tx
        f64.mul
        local.set $T4

        local.get $ty
        local.get $t
        f64.mul
        local.set $T5

        local.get $tz
        local.get $t
        f64.mul
        local.set $T6

        local.get $T4
        global.get $ex
        f64.mul
        local.get $T5
        global.get $ey
        f64.mul
        f64.add
        local.get $T6
        global.get $ez
        f64.mul
        f64.add
        f64.neg
        local.set $T8

        local.get $zx
        local.get $z_mag
        f64.div
        local.tee $zx
        global.get $ex
        f64.mul

        local.get $zy
        local.get $z_mag
        f64.div
        local.tee $zy
        global.get $ey
        f64.mul
        f64.add

        local.get $zz
        local.get $z_mag
        f64.div
        local.tee $zz
        global.get $ez
        f64.mul
        f64.add
        f64.neg
        local.set $T9

        f64.const 1.0
        global.get $fovy
        f64.const 0.5
        f64.mul
        call $tan
        f64.div
        local.tee $ty

        global.get $aspect_ratio
        f64.div
        local.set $tx

        global.get $near
        global.get $far
        f64.add
        global.get $near
        global.get $far
        f64.sub
        local.tee $t
        f64.div
        local.set $tz

        local.get $dest
        local.get $tx
        local.get $T1
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        local.get $ty
        local.get $T4
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        local.get $tz
        local.get $zx
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        local.get $zx
        f64.neg
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        local.get $tx
        local.get $T2
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        local.get $ty
        local.get $T5
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        local.get $tz
        local.get $zy
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        local.get $zy
        f64.neg
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        local.get $tx
        local.get $T3
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 36
        i32.add
        local.get $ty
        local.get $T6
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 40
        i32.add
        local.get $tz
        local.get $zz
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 44
        i32.add
        local.get $zz
        f64.neg
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 48
        i32.add
        local.get $tx
        local.get $T7
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 52
        i32.add
        local.get $ty
        local.get $T8
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 56
        i32.add
        local.get $tz
        local.get $T9
        f64.mul
        f64.const 2.0
        global.get $near
        f64.mul
        global.get $far
        f64.mul
        local.get $t
        f64.div
        f64.add
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 60
        i32.add
        local.get $T9
        f64.neg
        f32.demote_f64
        f32.store
    )

    (func $view_orthographic (;326;) (export "view_orthographic") (param $dest i32)
        (local $zx f64) (local $zy f64) (local $zz f64) (local $z_mag f64) (local $t f64)
        (local $tx f64) (local $ty f64) (local $tz f64)
        (local $T1 f64) (local $T2 f64) (local $T3 f64) (local $T7 f64)
        (local $T4 f64) (local $T5 f64) (local $T6 f64) (local $T8 f64) (local $T9 f64)
        global.get $ex
        global.get $cx
        f64.sub
        local.set $zx

        global.get $ey
        global.get $cy
        f64.sub
        local.set $zy

        global.get $ez
        global.get $cz
        f64.sub
        local.set $zz

        ;; compute the inv magnitude of the z camera basis vector.
        local.get $zx
        local.get $zx
        f64.mul
        local.get $zy
        local.get $zy
        f64.mul
        f64.add
        local.get $zz
        local.get $zz
        f64.mul
        f64.add
        f64.sqrt
        local.set $z_mag

        f64.const 1.0
        global.get $uy
        local.get $zz
        f64.mul
        global.get $uz
        local.get $zy
        f64.mul
        f64.sub
        local.tee $tx
        local.get $tx
        f64.mul

        global.get $uz
        local.get $zx
        f64.mul
        global.get $ux
        local.get $zz
        f64.mul
        f64.sub
        local.tee $ty
        local.get $ty
        f64.mul
        f64.add

        global.get $ux
        local.get $zy
        f64.mul
        global.get $uy
        local.get $zx
        f64.mul
        f64.sub
        local.tee $tz
        local.get $tz
        f64.mul
        f64.add
        f64.sqrt

        f64.div
        ;; t = 1 / (||x|| * ||z||)
        local.tee $t

        local.get $tx
        f64.mul
        local.set $T1

        local.get $ty
        local.get $t
        f64.mul
        local.set $T2

        local.get $tz
        local.get $t
        f64.mul
        local.set $T3

        local.get $T1
        global.get $ex
        f64.mul
        local.get $T2
        global.get $ey
        f64.mul
        f64.add
        local.get $T3
        global.get $ez
        f64.mul
        f64.add
        f64.neg
        local.set $T7

        f64.const 1.0

        local.get $zy
        local.get $T3
        f64.mul
        local.get $zz
        local.get $T2
        f64.mul
        f64.sub
        local.tee $tx
        local.get $tx
        f64.mul

        local.get $zz
        local.get $T1
        f64.mul
        local.get $zx
        local.get $T3
        f64.mul
        f64.sub
        local.tee $ty
        local.get $ty
        f64.mul
        f64.add

        local.get $zx
        local.get $T2
        f64.mul
        local.get $zy
        local.get $T1
        f64.mul
        f64.sub
        local.tee $tz
        local.get $tz
        f64.mul
        f64.add
        f64.sqrt

        f64.div
        local.tee $t

        local.get $tx
        f64.mul
        local.set $T4

        local.get $ty
        local.get $t
        f64.mul
        local.set $T5

        local.get $tz
        local.get $t
        f64.mul
        local.set $T6

        local.get $T4
        global.get $ex
        f64.mul
        local.get $T5
        global.get $ey
        f64.mul
        f64.add
        local.get $T6
        global.get $ez
        f64.mul
        f64.add
        f64.neg
        local.set $T8

        local.get $zx
        local.get $z_mag
        f64.div
        local.tee $zx
        global.get $ex
        f64.mul

        local.get $zy
        local.get $z_mag
        f64.div
        local.tee $zy
        global.get $ey
        f64.mul
        f64.add

        local.get $zz
        local.get $z_mag
        f64.div
        local.tee $zz
        global.get $ez
        f64.mul
        f64.add
        f64.neg
        local.set $T9

        f64.const 2.0
        f64.const 1.0
        global.get $right
        global.get $left
        f64.sub
        f64.div
        local.tee $t
        f64.mul
        local.set $tx

        local.get $dest
        local.get $T1
        local.get $tx
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        local.get $T2
        local.get $tx
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        local.get $T3
        local.get $tx
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 48
        i32.add
        local.get $T7
        local.get $tx
        f64.mul
        global.get $right
        global.get $left
        f64.add
        local.get $t
        f64.mul
        f64.sub
        f32.demote_f64
        f32.store

        f64.const 2.0
        f64.const 1.0
        global.get $top
        global.get $bottom
        f64.sub
        f64.div
        local.tee $t
        f64.mul
        local.set $tx

        local.get $dest
        i32.const 4
        i32.add
        local.get $T4
        local.get $tx
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        local.get $T5
        local.get $tx
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 36
        i32.add
        local.get $T6
        local.get $tx
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 52
        i32.add
        local.get $T8
        local.get $tx
        f64.mul
        global.get $top
        global.get $bottom
        f64.add
        local.get $t
        f64.mul
        f64.sub
        f32.demote_f64
        f32.store

        f64.const -2.0
        f64.const 1.0
        global.get $far
        global.get $near
        f64.sub
        f64.div
        local.tee $t
        f64.mul
        local.set $tx

        local.get $dest
        i32.const 8
        i32.add
        local.get $zx
        local.get $tx
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        local.get $zy
        local.get $tx
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 40
        i32.add
        local.get $zz
        local.get $tx
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 56
        i32.add
        local.get $T9
        local.get $tx
        f64.mul
        global.get $far
        global.get $near
        f64.add
        local.get $t
        f64.mul
        f64.sub
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 44
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 60
        i32.add
        f32.const 1.0
        f32.store
    )


    (func $mat3_from_XYZi (;102+6jscalls;) (export "mat3_from_XYZi") (param $dest i32) (param $ox f64) (param $oy f64) (param $oz f64)
        (local $a f64) (local $b f64) (local $c f64) (local $d f64) (local $e f64) (local $f f64)
        (local $t1 f64) (local $t2 f64)
        local.get $ox
        call $cos
        local.set $a

        local.get $ox
        call $sin
        local.set $b

        local.get $oy
        call $cos
        local.set $c

        local.get $oy
        call $sin
        local.set $d

        local.get $oz
        call $cos
        local.set $e

        local.get $oz
        call $sin
        local.set $f

        local.get $dest
        local.get $c
        local.get $e
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        local.get $c
        local.get $f
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        local.get $d
        f64.neg
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        local.get $b
        local.get $e
        f64.mul
        local.tee $t1
        local.get $d
        f64.mul
        local.get $a
        local.get $f
        f64.mul
        f64.sub
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        local.get $b
        local.get $f
        f64.mul
        local.tee $t2
        local.get $d
        f64.mul
        local.get $a
        local.get $e
        f64.mul
        f64.add
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        local.get $b
        local.get $c
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        local.get $t2
        local.get $a
        local.get $d
        f64.mul
        local.tee $t2
        local.get $e
        f64.mul
        f64.add
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        local.get $t2
        local.get $f
        f64.mul
        local.get $t1
        f64.sub
        f32.demote_f64
        f32.store
        
        local.get $dest
        i32.const 32
        i32.add
        local.get $a
        local.get $c
        f64.mul
        f32.demote_f64
        f32.store
    )

    (func $mat3_from_Xi (;52+2jscalls;) (export "mat3_from_Xi") (param $dest i32) (param $ox f64)
        (local $cx f64) (local $sx f64)
        local.get $ox
        call $cos
        local.set $cx
        local.get $ox
        call $sin
        local.set $sx

        local.get $dest
        f32.const 1.0
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        local.get $cx
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        local.get $sx
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        local.get $sx
        f64.neg
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        local.get $cx
        f32.demote_f64
        f32.store
    )

    (func $mat3_from_Yi (;52+2jscalls;) (export "mat3_from_Yi") (param $dest i32) (param $oy f64)
        (local $cy f64) (local $sy f64)
        local.get $oy
        call $cos
        local.set $cy
        local.get $oy
        call $sin
        local.set $sy

        local.get $dest
        local.get $cy
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        local.get $sy
        f64.neg
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        f32.const 1.0
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        local.get $sy
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        local.get $cy
        f32.demote_f64
        f32.store
    )

    (func $mat3_from_Zi (;52+2jscalls;) (export "mat3_from_Zi") (param $dest i32) (param $oz f64)
        (local $cz f64) (local $sz f64)
        local.get $oz
        call $cos
        local.set $cz
        local.get $oz
        call $sin
        local.set $sz

        local.get $dest
        local.get $cz
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        local.get $sz
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        local.get $sz
        f64.neg
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        local.get $cz
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        f32.const 1.0
        f32.store
    )

    (func $mat3_from_XYi (;69+4jscalls;) (export "mat3_from_XYi") (param $dest i32) (param $ox f64) (param $oy f64)
        (local $a f64) (local $b f64) (local $c f64) (local $d f64)
        local.get $ox
        call $cos
        local.set $a

        local.get $ox
        call $sin
        local.set $b

        local.get $oy
        call $cos
        local.set $c
        
        local.get $oy
        call $sin
        local.set $d

        local.get $dest
        local.get $c
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        local.get $d
        f64.neg
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        local.get $b
        local.get $d
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        local.get $a
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        local.get $b
        local.get $c
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        local.get $a
        local.get $d
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        local.get $b
        f64.neg
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        local.get $a
        local.get $c
        f64.mul
        f32.demote_f64
        f32.store
    )

    (func $mat3_from_XZi (;69+4jscalls;) (export "mat3_from_XZi") (param $dest i32) (param $ox f64) (param $oz f64)
        (local $a f64) (local $b f64) (local $c f64) (local $d f64)
        local.get $ox
        call $cos
        local.set $a

        local.get $ox
        call $sin
        local.set $b

        local.get $oz
        call $cos
        local.set $c
        
        local.get $oz
        call $sin
        local.set $d

        local.get $dest
        local.get $c
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        local.get $a
        local.get $d
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        local.get $b
        local.get $d
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        local.get $d
        f64.neg
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        local.get $a
        local.get $c
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        local.get $b
        local.get $c
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        local.get $b
        f64.neg
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        local.get $a
        f32.demote_f64
        f32.store
    )

    (func $mat3_from_YZi (;69+4jscalls;) (export "mat3_from_YZi") (param $dest i32) (param $oy f64) (param $oz f64)
        (local $a f64) (local $b f64) (local $c f64) (local $d f64)
        local.get $oy
        call $cos
        local.set $a

        local.get $oy
        call $sin
        local.set $b

        local.get $oz
        call $cos
        local.set $c
        
        local.get $oz
        call $sin
        local.set $d

        local.get $dest
        local.get $a
        local.get $c
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        local.get $d
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        local.get $b
        local.get $c
        f64.mul
        f64.neg
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        local.get $a
        local.get $d
        f64.mul
        f64.neg
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        local.get $c
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        local.get $b
        local.get $d
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        local.get $b
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        local.get $a
        f32.demote_f64
        f32.store
    )

    (func $billboard_around_X (;94;) (export "billboard_around_X") (param $dest i32) (param $tpos i32)
        (local $dx f32) (local $dy f32) (local $dz f32)
        (local $inv_mag f32) (local $mag_sqr f32) (local $part_mag_sqr f32)

        local.get $tpos
        i32.const 4
        i32.add
        f32.load
        global.get $ey
        f32.demote_f64
        f32.sub
        local.tee $dy
        local.get $dy
        f32.mul

        local.get $tpos
        i32.const 8
        i32.add
        f32.load
        global.get $ez
        f32.demote_f64
        f32.sub
        local.tee $dz
        local.get $dz
        f32.mul
        f32.add
        local.tee $part_mag_sqr

        local.get $tpos
        f32.load
        global.get $ex
        f32.demote_f64
        f32.sub
        local.tee $dx
        local.get $dx
        f32.mul
        f32.add
        local.set $mag_sqr

        local.get $dest
        i32.const 24
        i32.add

        f32.const -1.0
        local.get $mag_sqr
        f32.sqrt
        f32.div
        local.tee $inv_mag

        local.get $dx

        f32.mul
        f32.store

        local.get $dest
        i32.const 28
        i32.add

        local.get $inv_mag
        local.get $dy

        f32.mul
        f32.store

        local.get $dest
        i32.const 32
        i32.add

        local.get $inv_mag
        local.get $dz

        f32.mul
        f32.store

        local.get $dest
        i32.const 16
        i32.add

        f32.const 1.0
        local.get $part_mag_sqr
        f32.sqrt
        f32.div
        local.tee $inv_mag

        local.get $dz

        f32.mul
        f32.neg
        f32.store

        local.get $dest
        i32.const 20
        i32.add

        local.get $inv_mag
        local.get $dy

        f32.mul
        f32.store

        local.get $dest
        f32.const 1.0
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        f32.const 0.0
        f32.store
    )

    (func $billboard_around_Y (;94;) (export "billboard_around_Y") (param $dest i32) (param $tpos i32)
        (local $dx f32) (local $dy f32) (local $dz f32)
        (local $inv_mag f32) (local $mag_sqr f32) (local $part_mag_sqr f32)

        global.get $ex
        f32.demote_f64
        local.get $tpos
        f32.load
        f32.sub
        local.tee $dx
        local.get $dx
        f32.mul

        global.get $ez
        f32.demote_f64
        local.get $tpos
        i32.const 8
        i32.add
        f32.load
        f32.sub
        local.tee $dz
        local.get $dz
        f32.mul
        f32.add
        local.tee $part_mag_sqr

        global.get $ey
        f32.demote_f64
        local.get $tpos
        i32.const 4
        i32.add
        f32.load
        f32.sub
        local.tee $dy
        local.get $dy
        f32.mul
        f32.add
        local.set $mag_sqr

        local.get $dest
        i32.const 24
        i32.add

        f32.const 1.0
        local.get $mag_sqr
        f32.sqrt
        f32.div
        local.tee $inv_mag

        local.get $dx

        f32.mul
        f32.store

        local.get $dest
        i32.const 28
        i32.add

        local.get $inv_mag
        local.get $dy

        f32.mul
        f32.store

        local.get $dest
        i32.const 32
        i32.add

        local.get $inv_mag
        local.get $dz

        f32.mul
        f32.store

        local.get $dest

        f32.const 1.0
        local.get $part_mag_sqr
        f32.sqrt
        f32.div
        local.tee $inv_mag

        local.get $dz

        f32.mul
        f32.store

        local.get $dest
        i32.const 8
        i32.add

        local.get $inv_mag
        local.get $dx

        f32.mul
        f32.neg
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        f32.const 1.0
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        f32.const 0.0
        f32.store
    )

    (func $billboard_around_Z (;76;) (export "billboard_around_Z") (param $dest i32) (param $tpos i32)
        (local $dx f32) (local $dy f32)
        (local $inv_mag f32) (local $mag_sqr f32)

        global.get $ex
        f32.demote_f64
        local.get $tpos
        f32.load
        f32.sub
        local.tee $dx
        local.get $dx
        f32.mul

        global.get $ey
        f32.demote_f64
        local.get $tpos
        i32.const 4
        i32.add
        f32.load
        f32.sub
        local.tee $dy
        local.get $dy
        f32.mul
        f32.add
        local.set $mag_sqr

        local.get $dest

        f32.const 1.0
        local.get $mag_sqr
        f32.sqrt
        f32.div
        local.tee $inv_mag

        local.get $dy

        f32.mul
        f32.neg
        f32.store

        local.get $dest
        i32.const 4
        i32.add

        local.get $inv_mag
        local.get $dx

        f32.mul
        f32.store

        local.get $dest
        i32.const 12
        i32.add

        local.get $inv_mag
        local.get $dx

        f32.mul
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        
        local.get $inv_mag
        local.get $dy

        f32.mul
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        f32.const 1.0
        f32.store
    )

    (func $billboard_spherical (;108;) (export "billboard_spherical") (param $dest i32) (param $tpos i32)
        (local $dx f32) (local $dy f32) (local $dz f32)
        (local $fx f32) (local $fy f32) (local $fz f32)
        (local $rx f32) (local $rz f32)
        (local $t f32) (local $part_mag_sqr f32)

        f32.const 1.0
        global.get $ex
        f32.demote_f64
        local.get $tpos
        f32.load
        f32.sub
        local.tee $dx
        local.get $dx
        f32.mul

        global.get $ez
        f32.demote_f64
        local.get $tpos
        i32.const 8
        i32.add
        f32.load
        f32.sub
        local.tee $dz
        local.get $dz
        f32.mul
        f32.add
        local.tee $part_mag_sqr

        global.get $ey
        f32.demote_f64
        local.get $tpos
        i32.const 4
        i32.add
        f32.load
        f32.sub
        local.tee $dy
        local.get $dy
        f32.mul
        f32.add
        f32.sqrt
        f32.div
        local.set $t

        local.get $dest
        i32.const 24
        i32.add

        local.get $dx
        local.get $t
        f32.mul
        local.tee $fx

        f32.store

        local.get $dest
        i32.const 28
        i32.add

        local.get $dy
        local.get $t
        f32.mul
        local.tee $fy

        f32.store

        local.get $dest
        i32.const 32
        i32.add

        local.get $dz
        local.get $t
        f32.mul
        local.tee $fz

        f32.store

        local.get $dest

        f32.const 1.0
        local.get $part_mag_sqr
        f32.sqrt
        f32.div
        local.tee $t

        local.get $dz
        
        f32.mul
        f32.neg

        local.tee $rx

        f32.store

        local.get $dest
        i32.const 8
        i32.add

        local.get $dx
        local.get $t
        
        f32.mul

        local.tee $rz

        f32.store

        local.get $dest
        i32.const 12
        i32.add

        local.get $rz
        local.get $fy

        f32.mul

        f32.store

        local.get $dest
        i32.const 16
        i32.add

        local.get $rz
        local.get $fx

        f32.mul
        
        local.get $rx
        local.get $fz

        f32.mul
        f32.sub

        f32.store

        local.get $dest
        i32.const 20
        i32.add

        local.get $rx
        local.get $fy

        f32.mul

        f32.store

        local.get $dest
        i32.const 4
        i32.add
        f32.const 0.0
        f32.store
    )

    (func $transform_SXYZTi (;162+6jscalls;) (export "transform_SXYZTi") (param $dest i32) (param $sx f64) (param $sy f64) (param $sz f64) (param $ox f64) (param $oy f64) (param $oz f64) (param $tx f32) (param $ty f32) (param $tz f32)
        (local $a f64) (local $b f64) (local $c f64) (local $d f64) (local $e f64) (local $f f64)
        (local $t1 f64) (local $t2 f64)
        local.get $ox
        call $cos
        local.set $a

        local.get $ox
        call $sin
        local.set $b

        local.get $oy
        call $cos
        local.set $c

        local.get $oy
        call $sin
        local.set $d

        local.get $oz
        call $cos
        local.set $e

        local.get $oz
        call $sin
        local.set $f

        local.get $dest
        local.get $sx
        local.get $c
        local.get $e
        f64.mul
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        local.get $sx
        local.get $c
        local.get $f
        f64.mul
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        local.get $sx
        local.get $d
        f64.mul
        f64.neg
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        f64.const 0.0
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        local.get $sy
        local.get $b
        local.get $e
        f64.mul
        local.tee $t1
        local.get $d
        f64.mul
        local.get $a
        local.get $f
        f64.mul
        f64.sub
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        local.get $sy
        local.get $b
        local.get $f
        f64.mul
        local.tee $t2
        local.get $d
        f64.mul
        local.get $a
        local.get $e
        f64.mul
        f64.add
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        local.get $sy
        local.get $b
        local.get $c
        f64.mul
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        f64.const 0.0
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        local.get $sz
        local.get $t2
        local.get $a
        local.get $d
        f64.mul
        local.tee $t2
        local.get $e
        f64.mul
        f64.add
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 36
        i32.add
        local.get $sz
        local.get $t2
        local.get $f
        f64.mul
        local.get $t1
        f64.sub
        f64.mul
        f32.demote_f64
        f32.store
        
        local.get $dest
        i32.const 40
        i32.add
        local.get $sz
        local.get $a
        local.get $c
        f64.mul
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 44
        i32.add
        f64.const 0.0
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 48
        i32.add
        local.get $tx
        f32.store

        local.get $dest
        i32.const 52
        i32.add
        local.get $ty
        f32.store

        local.get $dest
        i32.const 56
        i32.add
        local.get $tz
        f32.store

        local.get $dest
        i32.const 60
        i32.add
        f64.const 1.0
        f32.demote_f64
        f32.store
    )

    (func $transform_XYZTi (;144+6jscalls;) (export "transform_XYZTi") (param $dest i32) (param $ox f64) (param $oy f64) (param $oz f64) (param $tx f32) (param $ty f32) (param $tz f32)
        (local $a f64) (local $b f64) (local $c f64) (local $d f64) (local $e f64) (local $f f64)
        (local $t1 f64) (local $t2 f64)
        local.get $ox
        call $cos
        local.set $a

        local.get $ox
        call $sin
        local.set $b

        local.get $oy
        call $cos
        local.set $c

        local.get $oy
        call $sin
        local.set $d

        local.get $oz
        call $cos
        local.set $e

        local.get $oz
        call $sin
        local.set $f

        local.get $dest
        local.get $c
        local.get $e
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        local.get $c
        local.get $f
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        local.get $d
        f64.neg
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        f64.const 0.0
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        local.get $b
        local.get $e
        f64.mul
        local.tee $t1
        local.get $d
        f64.mul
        local.get $a
        local.get $f
        f64.mul
        f64.sub
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        local.get $b
        local.get $f
        f64.mul
        local.tee $t2
        local.get $d
        f64.mul
        local.get $a
        local.get $e
        f64.mul
        f64.add
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        local.get $b
        local.get $c
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        f64.const 0.0
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        local.get $t2
        local.get $a
        local.get $d
        f64.mul
        local.tee $t2
        local.get $e
        f64.mul
        f64.add
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 36
        i32.add
        local.get $t2
        local.get $f
        f64.mul
        local.get $t1
        f64.sub
        f32.demote_f64
        f32.store
        
        local.get $dest
        i32.const 40
        i32.add
        local.get $a
        local.get $c
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 44
        i32.add
        f64.const 0.0
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 48
        i32.add
        local.get $tx
        f32.store

        local.get $dest
        i32.const 52
        i32.add
        local.get $ty
        f32.store

        local.get $dest
        i32.const 56
        i32.add
        local.get $tz
        f32.store

        local.get $dest
        i32.const 60
        i32.add
        f64.const 1.0
        f32.demote_f64
        f32.store
    )

    (func $transform_SXTi (;90+2jscalls;) (export "transform_SXTi") (param $dest i32) (param $sx f64) (param $sy f64) (param $sz f64) (param $ox f64) (param $tx f32) (param $ty f32) (param $tz f32)
        (local $a f64) (local $b f64)
        local.get $ox
        call $cos
        local.set $a
        local.get $ox
        call $sin
        local.set $b

        local.get $dest
        local.get $sx
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        f32.const 0.0
        f32.store
        
        local.get $dest
        i32.const 12
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        local.get $a
        local.get $sy
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        local.get $b
        local.get $sy
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 36
        i32.add
        local.get $b
        local.get $sz
        f64.mul
        f64.neg
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 40
        i32.add
        local.get $a
        local.get $sz
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 44
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 48
        i32.add
        local.get $tx
        f32.store

        local.get $dest
        i32.const 52
        i32.add
        local.get $ty
        f32.store

        local.get $dest
        i32.const 56
        i32.add
        local.get $tz
        f32.store

        local.get $dest
        i32.const 60
        i32.add
        f32.const 1.0
        f32.store
    )

    (func $transform_XTi (;87+2jscalls;) (export "transform_XTi") (param $dest i32) (param $ox f64) (param $tx f32) (param $ty f32) (param $tz f32)
        (local $cx f64) (local $sx f64)
        local.get $ox
        call $cos
        local.set $cx
        local.get $ox
        call $sin
        local.set $sx

        local.get $dest
        f32.const 1.0
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        f32.const 0.0
        f32.store
        
        local.get $dest
        i32.const 12
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        local.get $cx
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        local.get $sx
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 36
        i32.add
        local.get $sx
        f64.neg
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 40
        i32.add
        local.get $cx
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 44
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 48
        i32.add
        local.get $tx
        f32.store

        local.get $dest
        i32.const 52
        i32.add
        local.get $ty
        f32.store

        local.get $dest
        i32.const 56
        i32.add
        local.get $tz
        f32.store

        local.get $dest
        i32.const 60
        i32.add
        f32.const 1.0
        f32.store
    )

    (func $transform_SYTi (;90+2jscalls;) (export "transform_SYTi") (param $dest i32) (param $sx f64) (param $sy f64) (param $sz f64) (param $oy f64) (param $tx f32) (param $ty f32) (param $tz f32)
        (local $a f64) (local $b f64)
        local.get $oy
        call $cos
        local.set $a
        local.get $oy
        call $sin
        local.set $b

        local.get $dest
        local.get $a
        local.get $sx
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        local.get $b
        local.get $sx
        f64.mul
        f64.neg
        f32.demote_f64
        f32.store
        
        local.get $dest
        i32.const 12
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        local.get $sy
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        local.get $b
        local.get $sz
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 36
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 40
        i32.add
        local.get $a
        local.get $sz
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 44
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 48
        i32.add
        local.get $tx
        f32.store

        local.get $dest
        i32.const 52
        i32.add
        local.get $ty
        f32.store

        local.get $dest
        i32.const 56
        i32.add
        local.get $tz
        f32.store

        local.get $dest
        i32.const 60
        i32.add
        f32.const 1.0
        f32.store
    )

    (func $transform_YTi (;87+2jscalls;) (export "transform_YTi") (param $dest i32) (param $oy f64) (param $tx f32) (param $ty f32) (param $tz f32)
        (local $cy f64) (local $sy f64)
        local.get $oy
        call $cos
        local.set $cy
        local.get $oy
        call $sin
        local.set $sy

        local.get $dest
        local.get $cy
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        local.get $sy
        f64.neg
        f32.demote_f64
        f32.store
        
        local.get $dest
        i32.const 12
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        f32.const 1.0
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        local.get $sy
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 36
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 40
        i32.add
        local.get $cy
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 44
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 48
        i32.add
        local.get $tx
        f32.store

        local.get $dest
        i32.const 52
        i32.add
        local.get $ty
        f32.store

        local.get $dest
        i32.const 56
        i32.add
        local.get $tz
        f32.store

        local.get $dest
        i32.const 60
        i32.add
        f32.const 1.0
        f32.store
    )

    (func $transform_SZTi (;90+2jscalls;) (export "transform_SZTi") (param $dest i32) (param $sx f64) (param $sy f64) (param $sz f64) (param $oz f64) (param $tx f32) (param $ty f32) (param $tz f32)
        (local $a f64) (local $b f64)
        local.get $oz
        call $cos
        local.set $a
        local.get $oz
        call $sin
        local.set $b

        local.get $dest
        local.get $a
        local.get $sx
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        local.get $b
        local.get $sx
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        f32.const 0.0
        f32.store
        
        local.get $dest
        i32.const 12
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        local.get $b
        local.get $sy
        f64.mul
        f64.neg
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        local.get $a
        local.get $sy
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 36
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 40
        i32.add
        local.get $sz
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 44
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 48
        i32.add
        local.get $tx
        f32.store

        local.get $dest
        i32.const 52
        i32.add
        local.get $ty
        f32.store

        local.get $dest
        i32.const 56
        i32.add
        local.get $tz
        f32.store

        local.get $dest
        i32.const 60
        i32.add
        f32.const 1.0
        f32.store
    )

    (func $transform_ZTi (;87+2jscalls;) (export "transform_ZTi") (param $dest i32) (param $oz f64) (param $tx f32) (param $ty f32) (param $tz f32)
        (local $cz f64) (local $sz f64)
        local.get $oz
        call $cos
        local.set $cz
        local.get $oz
        call $sin
        local.set $sz

        local.get $dest
        local.get $cz
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        local.get $sz
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        f32.const 0.0
        f32.store
        
        local.get $dest
        i32.const 12
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        local.get $sz
        f64.neg
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        local.get $cz
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 36
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 40
        i32.add
        f32.const 1.0
        f32.store

        local.get $dest
        i32.const 44
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 48
        i32.add
        local.get $tx
        f32.store

        local.get $dest
        i32.const 52
        i32.add
        local.get $ty
        f32.store

        local.get $dest
        i32.const 56
        i32.add
        local.get $tz
        f32.store

        local.get $dest
        i32.const 60
        i32.add
        f32.const 1.0
        f32.store
    )

    (func $transform_SXYTi (;120+4jscalls;) (export "transform_SXYTi") (param $dest i32) (param $sx f64) (param $sy f64) (param $sz f64) (param $ox f64) (param $oy f64) (param $tx f32) (param $ty f32) (param $tz f32)
        (local $a f64) (local $b f64) (local $c f64) (local $d f64)
        local.get $ox
        call $cos
        local.set $a

        local.get $ox
        call $sin
        local.set $b

        local.get $oy
        call $cos
        local.set $c
        
        local.get $oy
        call $sin
        local.set $d

        local.get $dest
        local.get $c
        local.get $sx
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        local.get $d
        local.get $sx
        f64.mul
        f64.neg
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        local.get $b
        local.get $d
        f64.mul
        local.get $sy
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        local.get $a
        local.get $sy
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        local.get $b
        local.get $c
        f64.mul
        local.get $sy
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        local.get $a
        local.get $d
        f64.mul
        local.get $sz
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 36
        i32.add
        local.get $b
        local.get $sz
        f64.mul
        f64.neg
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 40
        i32.add
        local.get $a
        local.get $c
        f64.mul
        local.get $sz
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 44
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 48
        i32.add
        local.get $tx
        f32.store

        local.get $dest
        i32.const 52
        i32.add
        local.get $ty
        f32.store

        local.get $dest
        i32.const 56
        i32.add
        local.get $tz
        f32.store

        local.get $dest
        i32.const 60
        i32.add
        f32.const 1.0
        f32.store
    )

    (func $transform_XYTi (;104+4jscalls;) (export "transform_XYTi") (param $dest i32) (param $ox f64) (param $oy f64) (param $tx f32) (param $ty f32) (param $tz f32)
        (local $a f64) (local $b f64) (local $c f64) (local $d f64)
        local.get $ox
        call $cos
        local.set $a

        local.get $ox
        call $sin
        local.set $b

        local.get $oy
        call $cos
        local.set $c
        
        local.get $oy
        call $sin
        local.set $d

        local.get $dest
        local.get $c
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        local.get $d
        f64.neg
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        local.get $b
        local.get $d
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        local.get $a
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        local.get $b
        local.get $c
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        local.get $a
        local.get $d
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 36
        i32.add
        local.get $b
        f64.neg
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 40
        i32.add
        local.get $a
        local.get $c
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 44
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 48
        i32.add
        local.get $tx
        f32.store

        local.get $dest
        i32.const 52
        i32.add
        local.get $ty
        f32.store

        local.get $dest
        i32.const 56
        i32.add
        local.get $tz
        f32.store

        local.get $dest
        i32.const 60
        i32.add
        f32.const 1.0
        f32.store
    )

    (func $transform_SXZTi (;120+4jscalls;) (export "transform_SXZTi") (param $dest i32) (param $sx f64) (param $sy f64) (param $sz f64) (param $ox f64) (param $oz f64) (param $tx f32) (param $ty f32) (param $tz f32)
        (local $a f64) (local $b f64) (local $c f64) (local $d f64)
        local.get $ox
        call $cos
        local.set $a

        local.get $ox
        call $sin
        local.set $b

        local.get $oz
        call $cos
        local.set $c
        
        local.get $oz
        call $sin
        local.set $d

        local.get $dest
        local.get $c
        local.get $sx
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        local.get $a
        local.get $d
        f64.mul
        local.get $sx
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        local.get $b
        local.get $d
        f64.mul
        local.get $sx
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        local.get $d
        local.get $sy
        f64.mul
        f64.neg
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        local.get $a
        local.get $c
        f64.mul
        local.get $sy
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        local.get $b
        local.get $c
        f64.mul
        local.get $sy
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 36
        i32.add
        local.get $b
        local.get $sz
        f64.mul
        f64.neg
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 40
        i32.add
        local.get $a
        local.get $sz
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 44
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 48
        i32.add
        local.get $tx
        f32.store

        local.get $dest
        i32.const 52
        i32.add
        local.get $ty
        f32.store

        local.get $dest
        i32.const 56
        i32.add
        local.get $tz
        f32.store

        local.get $dest
        i32.const 60
        i32.add
        f32.const 1.0
        f32.store
    )

    (func $transform_XZTi (;104+4jscalls;) (export "transform_XZTi") (param $dest i32) (param $ox f64) (param $oz f64) (param $tx f32) (param $ty f32) (param $tz f32)
        (local $a f64) (local $b f64) (local $c f64) (local $d f64)
        local.get $ox
        call $cos
        local.set $a

        local.get $ox
        call $sin
        local.set $b

        local.get $oz
        call $cos
        local.set $c
        
        local.get $oz
        call $sin
        local.set $d

        local.get $dest
        local.get $c
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        local.get $a
        local.get $d
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        local.get $b
        local.get $d
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        local.get $d
        f64.neg
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        local.get $a
        local.get $c
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        local.get $b
        local.get $c
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 36
        i32.add
        local.get $b
        f64.neg
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 40
        i32.add
        local.get $a
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 44
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 48
        i32.add
        local.get $tx
        f32.store

        local.get $dest
        i32.const 52
        i32.add
        local.get $ty
        f32.store

        local.get $dest
        i32.const 56
        i32.add
        local.get $tz
        f32.store

        local.get $dest
        i32.const 60
        i32.add
        f32.const 1.0
        f32.store
    )

    (func $transform_SYZTi (;120+4jscalls;) (export "transform_SYZTi") (param $dest i32) (param $sx f64) (param $sy f64) (param $sz f64) (param $oy f64) (param $oz f64) (param $tx f32) (param $ty f32) (param $tz f32)
        (local $a f64) (local $b f64) (local $c f64) (local $d f64)
        local.get $oy
        call $cos
        local.set $a

        local.get $oy
        call $sin
        local.set $b

        local.get $oz
        call $cos
        local.set $c
        
        local.get $oz
        call $sin
        local.set $d

        local.get $dest
        local.get $a
        local.get $c
        f64.mul
        local.get $sx
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        local.get $d
        local.get $sx
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        local.get $b
        local.get $c
        f64.mul
        local.get $sx
        f64.mul
        f64.neg
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        local.get $a
        local.get $d
        f64.mul
        local.get $sy
        f64.mul
        f64.neg
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        local.get $c
        local.get $sy
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        local.get $b
        local.get $d
        f64.mul
        local.get $sy
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        local.get $b
        local.get $sz
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 36
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 40
        i32.add
        local.get $a
        local.get $sz
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 44
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 48
        i32.add
        local.get $tx
        f32.store

        local.get $dest
        i32.const 52
        i32.add
        local.get $ty
        f32.store

        local.get $dest
        i32.const 56
        i32.add
        local.get $tz
        f32.store

        local.get $dest
        i32.const 60
        i32.add
        f32.const 1.0
        f32.store
    )

    (func $transform_YZTi (;104+4jscalls;) (export "transform_YZTi") (param $dest i32) (param $oy f64) (param $oz f64) (param $tx f32) (param $ty f32) (param $tz f32)
        (local $a f64) (local $b f64) (local $c f64) (local $d f64)
        local.get $oy
        call $cos
        local.set $a

        local.get $oy
        call $sin
        local.set $b

        local.get $oz
        call $cos
        local.set $c
        
        local.get $oz
        call $sin
        local.set $d

        local.get $dest
        local.get $a
        local.get $c
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        local.get $d
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        local.get $b
        local.get $c
        f64.mul
        f64.neg
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        local.get $a
        local.get $d
        f64.mul
        f64.neg
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        local.get $c
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        local.get $b
        local.get $d
        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        local.get $b
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 36
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 40
        i32.add
        local.get $a
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 44
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 48
        i32.add
        local.get $tx
        f32.store

        local.get $dest
        i32.const 52
        i32.add
        local.get $ty
        f32.store

        local.get $dest
        i32.const 56
        i32.add
        local.get $tz
        f32.store

        local.get $dest
        i32.const 60
        i32.add
        f32.const 1.0
        f32.store
    )

    (func $transform_SQTi (;179;) (export "transform_SQTi") (param $dest i32) (param $sx f32) (param $sy f32) (param $sz f32) (param $quat i32) (param $tx f32) (param $ty f32) (param $tz f32) 
        (local $x f32) (local $y f32) (local $z f32) (local $w f32)
        (local $xx f32) (local $yy f32) (local $zz f32) (local $t1 f32) (local $t2 f32)

        local.get $dest

        local.get $quat
        i32.const 4
        i32.add
        f32.load
        local.tee $y
        local.get $y
        f32.mul
        local.tee $yy

        local.get $quat
        i32.const 8
        i32.add
        f32.load
        local.tee $z
        local.get $z
        f32.mul
        local.tee $zz

        f32.add

        f32.const -2.0
        f32.mul

        f32.const 1.0

        f32.add

        local.get $sx
        f32.mul

        f32.store

        local.get $dest
        i32.const 4
        i32.add

        local.get $quat
        f32.load

        local.tee $x
        local.get $y

        f32.mul
        local.tee $t1

        local.get $quat
        i32.const 12
        i32.add
        f32.load

        local.tee $w
        local.get $z

        f32.mul
        local.tee $t2

        f32.add

        f32.const 2.0

        f32.mul

        local.get $sx
        f32.mul

        f32.store

        local.get $dest
        i32.const 16
        i32.add

        local.get $t1
        local.get $t2

        f32.sub

        f32.const 2.0

        f32.mul

        local.get $sy
        f32.mul

        f32.store

        local.get $dest
        i32.const 8
        i32.add

        local.get $x
        local.get $z

        f32.mul
        local.tee $t1

        local.get $w
        local.get $y

        f32.mul
        local.tee $t2

        f32.sub

        f32.const 2.0

        f32.mul

        local.get $sx
        f32.mul

        f32.store

        local.get $dest
        i32.const 32
        i32.add

        local.get $t1
        local.get $t2

        f32.add

        f32.const 2.0

        f32.mul

        local.get $sz
        f32.mul

        f32.store

        local.get $dest
        i32.const 20
        i32.add

        local.get $x
        local.get $x

        f32.mul
        local.tee $xx

        local.get $zz
        
        f32.add

        f32.const -2.0

        f32.mul

        f32.const 1.0

        f32.add

        local.get $sy
        f32.mul

        f32.store

        local.get $dest
        i32.const 24
        i32.add

        local.get $y
        local.get $z

        f32.mul
        local.tee $t1

        local.get $w
        local.get $x

        f32.mul
        local.tee $t2

        f32.add

        f32.const 2.0
        
        f32.mul

        local.get $sy
        f32.mul

        f32.store

        local.get $dest
        i32.const 36
        i32.add

        local.get $t1
        local.get $t2

        f32.sub

        f32.const 2.0

        f32.mul

        local.get $sz
        f32.mul

        f32.store

        local.get $dest
        i32.const 40
        i32.add

        local.get $xx
        local.get $yy

        f32.add

        f32.const -2.0
        
        f32.mul

        f32.const 1.0

        f32.add

        local.get $sz
        f32.mul

        f32.store

        local.get $dest
        i32.const 12
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 44
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 48
        i32.add
        local.get $tx
        f32.store

        local.get $dest
        i32.const 52
        i32.add
        local.get $ty
        f32.store

        local.get $dest
        i32.const 56
        i32.add
        local.get $tz
        f32.store

        local.get $dest
        i32.const 60
        i32.add
        f32.const 1.0
        f32.store
    )

    (func $transform_QTi (;161;) (export "transform_QTi") (param $dest i32) (param $quat i32) (param $tx f32) (param $ty f32) (param $tz f32) 
        (local $x f32) (local $y f32) (local $z f32) (local $w f32)
        (local $xx f32) (local $yy f32) (local $zz f32) (local $t1 f32) (local $t2 f32)

        local.get $dest

        local.get $quat
        i32.const 4
        i32.add
        f32.load
        local.tee $y
        local.get $y
        f32.mul
        local.tee $yy

        local.get $quat
        i32.const 8
        i32.add
        f32.load
        local.tee $z
        local.get $z
        f32.mul
        local.tee $zz

        f32.add

        f32.const -2.0
        f32.mul

        f32.const 1.0

        f32.add
        f32.store

        local.get $dest
        i32.const 4
        i32.add

        local.get $quat
        f32.load

        local.tee $x
        local.get $y

        f32.mul
        local.tee $t1

        local.get $quat
        i32.const 12
        i32.add
        f32.load

        local.tee $w
        local.get $z

        f32.mul
        local.tee $t2

        f32.add

        f32.const 2.0

        f32.mul
        f32.store

        local.get $dest
        i32.const 16
        i32.add

        local.get $t1
        local.get $t2

        f32.sub

        f32.const 2.0

        f32.mul
        f32.store

        local.get $dest
        i32.const 8
        i32.add

        local.get $x
        local.get $z

        f32.mul
        local.tee $t1

        local.get $w
        local.get $y

        f32.mul
        local.tee $t2

        f32.sub

        f32.const 2.0

        f32.mul
        f32.store

        local.get $dest
        i32.const 32
        i32.add

        local.get $t1
        local.get $t2

        f32.add

        f32.const 2.0

        f32.mul
        f32.store

        local.get $dest
        i32.const 20
        i32.add

        local.get $x
        local.get $x

        f32.mul
        local.tee $xx

        local.get $zz
        
        f32.add

        f32.const -2.0

        f32.mul

        f32.const 1.0

        f32.add
        f32.store

        local.get $dest
        i32.const 24
        i32.add

        local.get $y
        local.get $z

        f32.mul
        local.tee $t1

        local.get $w
        local.get $x

        f32.mul
        local.tee $t2

        f32.add

        f32.const 2.0
        
        f32.mul
        f32.store

        local.get $dest
        i32.const 36
        i32.add

        local.get $t1
        local.get $t2

        f32.sub

        f32.const 2.0

        f32.mul
        f32.store

        local.get $dest
        i32.const 40
        i32.add

        local.get $xx
        local.get $yy

        f32.add

        f32.const -2.0
        
        f32.mul

        f32.const 1.0

        f32.add
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 44
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 48
        i32.add
        local.get $tx
        f32.store

        local.get $dest
        i32.const 52
        i32.add
        local.get $ty
        f32.store

        local.get $dest
        i32.const 56
        i32.add
        local.get $tz
        f32.store

        local.get $dest
        i32.const 60
        i32.add
        f32.const 1.0
        f32.store
    )

    (func $transform_SMTi (;121;) (export "transform_SMTi") (param $dest i32) (param $sx f32) (param $sy f32) (param $sz f32) (param $mat i32) (param $tx f32) (param $ty f32) (param $tz f32)
        local.get $dest
        local.get $mat
        f32.load
        local.get $sx
        f32.mul
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        local.get $mat
        i32.const 4
        i32.add
        f32.load
        local.get $sx
        f32.mul
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        local.get $mat
        i32.const 8
        i32.add
        f32.load
        local.get $sx
        f32.mul
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        local.get $mat
        i32.const 12
        i32.add
        f32.load
        local.get $sy
        f32.mul
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        local.get $mat
        i32.const 16
        i32.add
        f32.load
        local.get $sy
        f32.mul
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        local.get $mat
        i32.const 20
        i32.add
        f32.load
        local.get $sy
        f32.mul
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        local.get $mat
        i32.const 24
        i32.add
        f32.load
        local.get $sz
        f32.mul
        f32.store

        local.get $dest
        i32.const 36
        i32.add
        local.get $mat
        i32.const 28
        i32.add
        f32.load
        local.get $sz
        f32.mul
        f32.store

        local.get $dest
        i32.const 40
        i32.add
        local.get $mat
        i32.const 32
        i32.add
        f32.load
        local.get $sz
        f32.mul
        f32.store

        local.get $dest
        i32.const 44
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 48
        i32.add
        local.get $tx
        f32.store

        local.get $dest
        i32.const 52
        i32.add
        local.get $ty
        f32.store

        local.get $dest
        i32.const 56
        i32.add
        local.get $tz
        f32.store

        local.get $dest
        i32.const 60
        i32.add
        f32.const 1.0
        f32.store
    )

    (func $transform_MTi (;103;) (export "transform_MTi") (param $dest i32) (param $mat i32) (param $tx f32) (param $ty f32) (param $tz f32)
        local.get $dest
        local.get $mat
        f32.load
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        local.get $mat
        i32.const 4
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        local.get $mat
        i32.const 8
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        local.get $mat
        i32.const 12
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        local.get $mat
        i32.const 16
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        local.get $mat
        i32.const 20
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        local.get $mat
        i32.const 24
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 36
        i32.add
        local.get $mat
        i32.const 28
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 40
        i32.add
        local.get $mat
        i32.const 32
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 44
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 48
        i32.add
        local.get $tx
        f32.store

        local.get $dest
        i32.const 52
        i32.add
        local.get $ty
        f32.store

        local.get $dest
        i32.const 56
        i32.add
        local.get $tz
        f32.store

        local.get $dest
        i32.const 60
        i32.add
        f32.const 1.0
        f32.store
    )


    (func $transform_set_T (export "transform_set_T") (param $dest i32) (param $from i32)
        local.get $dest
        i32.const 48
        i32.add
        local.get $from
        f32.load
        f32.store

        local.get $dest
        i32.const 52
        i32.add
        local.get $from
        i32.const 4
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 56
        i32.add
        local.get $from
        i32.const 8
        i32.add
        f32.load
        f32.store
    )

    (func $transform_set_Ti (export "transform_set_Ti") (param $dest i32) (param $tx f32) (param $ty f32) (param $tz f32)
        local.get $dest
        i32.const 48
        i32.add
        local.get $tx
        f32.store

        local.get $dest
        i32.const 52
        i32.add
        local.get $ty
        f32.store

        local.get $dest
        i32.const 56
        i32.add
        local.get $tz
        f32.store
    )

    (func $normal_from_transform_RT (export "normal_from_transform_RT") (param $dest i32) (param $from i32)
        (local $a f32) (local $b f32) (local $c f32)
        (local $e f32) (local $f f32) (local $g f32)
        (local $i f32) (local $j f32) (local $k f32)

        local.get $dest

        local.get $from
        i32.const 20
        i32.add
        f32.load
        local.tee $f

        local.get $from
        i32.const 40
        i32.add
        f32.load
        local.tee $k

        f32.mul

        local.get $from
        i32.const 36
        i32.add
        f32.load
        local.tee $g

        local.get $from
        i32.const 24
        i32.add
        f32.load
        local.tee $j

        f32.mul
        f32.sub

        f32.store

        local.get $dest
        i32.const 12
        i32.add

        local.get $from
        i32.const 8
        i32.add
        f32.load
        local.tee $i

        local.get $g
        
        f32.mul

        local.get $from
        i32.const 4
        i32.add
        f32.load
        local.tee $e

        local.get $k

        f32.mul
        f32.sub

        f32.store

        local.get $dest
        i32.const 24
        i32.add

        local.get $e
        local.get $j

        f32.mul

        local.get $f
        local.get $i

        f32.mul
        f32.sub

        f32.store

        local.get $dest
        i32.const 4
        i32.add

        local.get $from
        i32.const 32
        i32.add
        f32.load
        local.tee $c

        local.get $j

        f32.mul

        local.get $from
        i32.const 16
        i32.add
        f32.load
        local.tee $b

        local.get $k

        f32.mul
        f32.sub

        f32.store

        local.get $dest
        i32.const 16
        i32.add

        local.get $from
        f32.load
        local.tee $a

        local.get $k

        f32.mul

        local.get $c
        local.get $i

        f32.mul
        f32.sub

        f32.store

        local.get $dest
        i32.const 28
        i32.add

        local.get $b
        local.get $i

        f32.mul

        local.get $a
        local.get $j

        f32.mul
        f32.sub

        f32.store

        local.get $dest
        i32.const 8
        i32.add

        local.get $b
        local.get $g

        f32.mul

        local.get $c
        local.get $f

        f32.mul
        f32.sub

        f32.store

        local.get $dest
        i32.const 20
        i32.add

        local.get $c
        local.get $e

        f32.mul

        local.get $a
        local.get $g

        f32.mul
        f32.sub

        f32.store

        local.get $dest
        i32.const 32
        i32.add

        local.get $a
        local.get $f

        f32.mul

        local.get $b
        local.get $e

        f32.mul
        f32.sub

        f32.store
    )

    (func $normal_from_transform_SRTi (export "normal_from_transform_SRTi") (param $dest i32) (param $from i32) (param $sx f32) (param $sy f32) (param $sz f32)
        (local $a f32) (local $b f32) (local $c f32)
        (local $e f32) (local $f f32) (local $g f32)
        (local $i f32) (local $j f32) (local $k f32)
        (local $t f32)

        local.get $dest

        local.get $from
        i32.const 20
        i32.add
        f32.load
        local.tee $f

        local.get $from
        i32.const 40
        i32.add
        f32.load
        local.tee $k

        f32.mul

        local.get $from
        i32.const 36
        i32.add
        f32.load
        local.tee $g

        local.get $from
        i32.const 24
        i32.add
        f32.load
        local.tee $j

        f32.mul
        f32.sub

        f32.const 1.0
        local.get $sx
        local.get $sy
        f32.mul
        local.get $sz
        f32.mul
        f32.div
        local.tee $t

        f32.mul

        f32.store

        local.get $dest
        i32.const 12
        i32.add

        local.get $from
        i32.const 8
        i32.add
        f32.load
        local.tee $i

        local.get $g
        
        f32.mul

        local.get $from
        i32.const 4
        i32.add
        f32.load
        local.tee $e

        local.get $k

        f32.mul
        f32.sub

        local.get $t
        f32.mul

        f32.store

        local.get $dest
        i32.const 24
        i32.add

        local.get $e
        local.get $j

        f32.mul

        local.get $f
        local.get $i

        f32.mul
        f32.sub

        local.get $t
        f32.mul

        f32.store

        local.get $dest
        i32.const 4
        i32.add

        local.get $from
        i32.const 32
        i32.add
        f32.load
        local.tee $c

        local.get $j

        f32.mul

        local.get $from
        i32.const 16
        i32.add
        f32.load
        local.tee $b

        local.get $k

        f32.mul
        f32.sub

        local.get $t
        f32.mul

        f32.store

        local.get $dest
        i32.const 16
        i32.add

        local.get $from
        f32.load
        local.tee $a

        local.get $k

        f32.mul

        local.get $c
        local.get $i

        f32.mul
        f32.sub

        local.get $t
        f32.mul

        f32.store

        local.get $dest
        i32.const 28
        i32.add

        local.get $b
        local.get $i

        f32.mul

        local.get $a
        local.get $j

        f32.mul
        f32.sub

        local.get $t
        f32.mul

        f32.store

        local.get $dest
        i32.const 8
        i32.add

        local.get $b
        local.get $g

        f32.mul

        local.get $c
        local.get $f

        f32.mul
        f32.sub

        local.get $t
        f32.mul

        f32.store

        local.get $dest
        i32.const 20
        i32.add

        local.get $c
        local.get $e

        f32.mul

        local.get $a
        local.get $g

        f32.mul
        f32.sub

        local.get $t
        f32.mul

        f32.store

        local.get $dest
        i32.const 32
        i32.add

        local.get $a
        local.get $f

        f32.mul

        local.get $b
        local.get $e

        f32.mul
        f32.sub

        local.get $t
        f32.mul

        f32.store
    )
    
    (func $normal_from_rotation (export "normal_from_rotation") (param $dest i32) (param $from i32)
        (local $a f32) (local $b f32) (local $c f32)
        (local $e f32) (local $f f32) (local $g f32)
        (local $i f32) (local $j f32) (local $k f32)

        local.get $dest

        local.get $from
        i32.const 16
        i32.add
        f32.load
        local.tee $f

        local.get $from
        i32.const 32
        i32.add
        f32.load
        local.tee $k

        f32.mul

        local.get $from
        i32.const 28
        i32.add
        f32.load
        local.tee $g

        local.get $from
        i32.const 20
        i32.add
        f32.load
        local.tee $j

        f32.mul
        f32.sub

        f32.store

        local.get $dest
        i32.const 12
        i32.add

        local.get $from
        i32.const 8
        i32.add
        f32.load
        local.tee $i

        local.get $g
        
        f32.mul

        local.get $from
        i32.const 4
        i32.add
        f32.load
        local.tee $e

        local.get $k

        f32.mul
        f32.sub

        f32.store

        local.get $dest
        i32.const 24
        i32.add

        local.get $e
        local.get $j

        f32.mul

        local.get $f
        local.get $i

        f32.mul
        f32.sub

        f32.store

        local.get $dest
        i32.const 4
        i32.add

        local.get $from
        i32.const 24
        i32.add
        f32.load
        local.tee $c

        local.get $j

        f32.mul

        local.get $from
        i32.const 12
        i32.add
        f32.load
        local.tee $b

        local.get $k

        f32.mul
        f32.sub

        f32.store

        local.get $dest
        i32.const 16
        i32.add

        local.get $from
        f32.load
        local.tee $a

        local.get $k

        f32.mul

        local.get $c
        local.get $i

        f32.mul
        f32.sub

        f32.store

        local.get $dest
        i32.const 28
        i32.add

        local.get $b
        local.get $i

        f32.mul

        local.get $a
        local.get $j

        f32.mul
        f32.sub

        f32.store

        local.get $dest
        i32.const 8
        i32.add

        local.get $b
        local.get $g

        f32.mul

        local.get $c
        local.get $f

        f32.mul
        f32.sub

        f32.store

        local.get $dest
        i32.const 20
        i32.add

        local.get $c
        local.get $e

        f32.mul

        local.get $a
        local.get $g

        f32.mul
        f32.sub

        f32.store

        local.get $dest
        i32.const 32
        i32.add

        local.get $a
        local.get $f

        f32.mul

        local.get $b
        local.get $e

        f32.mul
        f32.sub

        f32.store
    )

    (func $quat_from_XYZi (;73+6jscalls;) (export "quat_from_XYZi") (param $dest i32) (param $x f64) (param $y f64) (param $z f64)
        (local $x2 f64) (local $y2 f64) (local $z2 f64)
        (local $a f64) (local $b f64) (local $c f64) (local $d f64) (local $e f64) (local $f f64)
        (local $t1 f64) (local $t2 f64)

        local.get $dest
        i32.const 12
        i32.add

        local.get $y
        f64.const 0.5
        f64.mul
        local.tee $y2
        call $cos
        local.tee $c

        local.get $z
        f64.const 0.5
        f64.mul
        local.tee $z2
        call $cos
        local.tee $e

        f64.mul
        local.tee $t1

        local.get $x
        f64.const 0.5
        f64.mul
        local.tee $x2
        call $cos
        local.tee $a

        f64.mul

        local.get $x2
        call $sin
        local.tee $b

        local.get $y2
        call $sin
        local.tee $d

        f64.mul
        local.tee $t2

        local.get $z2
        call $sin
        local.tee $f

        f64.mul
        f64.sub
        f32.demote_f64
        f32.store

        local.get $dest

        local.get $b
        local.get $t1

        f64.mul

        local.get $a
        local.get $d

        f64.mul
        local.tee $t1

        local.get $f

        f64.mul
        f64.add
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 4
        i32.add

        local.get $t1
        local.get $e

        f64.mul

        local.get $c
        local.get $f

        f64.mul
        local.tee $t1

        local.get $b

        f64.mul
        f64.sub
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        
        local.get $a
        local.get $t1

        f64.mul

        local.get $t2
        local.get $e

        f64.mul
        f64.add
        f32.demote_f64
        f32.store
    )

    (func $quat_from_Xi (;23+2jscalls;) (export "quat_from_Xi") (param $dest i32) (param $x f64)
        (local $x2 f64)

        local.get $dest

        local.get $x
        f64.const 0.5
        f64.mul
        local.tee $x2
        call $sin
        f32.demote_f64

        f32.store

        local.get $dest
        i32.const 12
        i32.add

        local.get $x2
        call $cos
        f32.demote_f64

        f32.store

        local.get $dest
        i32.const 4
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        f32.const 0.0
        f32.store
    )

    (func $quat_from_Yi (;23+2jscalls;) (export "quat_from_Yi") (param $dest i32) (param $y f64)
        (local $y2 f64)

        local.get $dest
        i32.const 4
        i32.add

        local.get $y
        f64.const 0.5
        f64.mul
        local.tee $y2
        call $sin
        f32.demote_f64

        f32.store

        local.get $dest
        i32.const 12
        i32.add

        local.get $y2
        call $cos
        f32.demote_f64

        f32.store

        local.get $dest
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        f32.const 0.0
        f32.store
    )

    (func $quat_from_Zi (;23+2jscalls;) (export "quat_from_Zi") (param $dest i32) (param $z f64)
        (local $z2 f64)

        local.get $dest
        i32.const 8
        i32.add

        local.get $z
        f64.const 0.5
        f64.mul
        local.tee $z2
        call $sin
        f32.demote_f64

        f32.store

        local.get $dest
        i32.const 12
        i32.add

        local.get $z2
        call $cos
        f32.demote_f64

        f32.store

        local.get $dest
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        f32.const 0.0
        f32.store
    )

    (func $quat_from_XYi (;45;) (export "quat_from_XYi") (param $dest i32) (param $x f64) (param $y f64)
        (local $x2 f64) (local $y2 f64)
        (local $a f64) (local $b f64) (local $c f64) (local $d f64)

        local.get $dest
        i32.const 12
        i32.add

        local.get $x
        f64.const 0.5
        f64.mul
        local.tee $x2
        call $cos
        local.tee $a

        local.get $y
        f64.const 0.5
        f64.mul
        local.tee $y2
        call $cos
        local.tee $c

        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        
        local.get $x2
        call $sin
        local.tee $b

        local.get $c

        f64.mul
        f32.demote_f64

        f32.store

        local.get $dest
        i32.const 4
        i32.add

        local.get $y2
        call $sin
        local.tee $d

        local.get $a

        f64.mul
        f32.demote_f64

        f32.store

        local.get $dest
        i32.const 8
        i32.add

        local.get $b
        local.get $d
        f64.mul
        f64.neg
        f32.demote_f64

        f32.store
    )

    (func $quat_from_XZi (;45;) (export "quat_from_XZi") (param $dest i32) (param $x f64) (param $z f64)
        (local $x2 f64) (local $z2 f64)
        (local $a f64) (local $b f64) (local $e f64) (local $f f64)

        local.get $dest
        i32.const 12
        i32.add

        local.get $x
        f64.const 0.5
        f64.mul
        local.tee $x2
        call $cos
        local.tee $a

        local.get $z
        f64.const 0.5
        f64.mul
        local.tee $z2
        call $cos
        local.tee $e

        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        
        local.get $x2
        call $sin
        local.tee $b

        local.get $e

        f64.mul
        f32.demote_f64

        f32.store

        local.get $dest
        i32.const 8
        i32.add

        local.get $z2
        call $sin
        local.tee $f

        local.get $a

        f64.mul
        f32.demote_f64

        f32.store

        local.get $dest
        i32.const 4
        i32.add

        local.get $b
        local.get $f
        f64.mul
        f64.neg
        f32.demote_f64

        f32.store
    )

    (func $quat_from_YZi (;45;) (export "quat_from_YZi") (param $dest i32) (param $y f64) (param $z f64)
        (local $y2 f64) (local $z2 f64)
        (local $c f64) (local $d f64) (local $e f64) (local $f f64)

        local.get $dest
        i32.const 12
        i32.add

        local.get $y
        f64.const 0.5
        f64.mul
        local.tee $y2
        call $cos
        local.tee $c

        local.get $z
        f64.const 0.5
        f64.mul
        local.tee $z2
        call $cos
        local.tee $e

        f64.mul
        f32.demote_f64
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        
        local.get $y2
        call $sin
        local.tee $d

        local.get $e

        f64.mul
        f32.demote_f64

        f32.store

        local.get $dest
        i32.const 8
        i32.add

        local.get $z2
        call $sin
        local.tee $f

        local.get $c

        f64.mul
        f32.demote_f64

        f32.store

        local.get $dest

        local.get $d
        local.get $f
        f64.mul
        f64.neg
        f32.demote_f64

        f32.store
    )

    (func $quat_prod (;102;) (export "quat_prod") (param $dest i32) (param $from_a i32) (param $from_b i32)
        (local $a f32) (local $b f32) (local $c f32) (local $d f32)
        (local $e f32) (local $f f32) (local $g f32) (local $h f32)

        local.get $dest
        i32.const 12
        i32.add

        local.get $from_a
        i32.const 12
        i32.add
        f32.load
        local.tee $a

        local.get $from_b
        i32.const 12
        i32.add
        f32.load
        local.tee $e

        f32.mul

        local.get $from_a
        f32.load
        local.tee $b

        local.get $from_b
        f32.load
        local.tee $f

        f32.mul
        f32.sub

        local.get $from_a
        i32.const 4
        i32.add
        f32.load
        local.tee $c

        local.get $from_b
        i32.const 4
        i32.add
        f32.load
        local.tee $g

        f32.mul
        f32.sub

        local.get $from_a
        i32.const 8
        i32.add
        f32.load
        local.tee $d

        local.get $from_b
        i32.const 8
        i32.add
        f32.load
        local.tee $h

        f32.mul
        f32.sub
        
        f32.store

        local.get $dest

        local.get $a
        local.get $f

        f32.mul

        local.get $b
        local.get $e

        f32.mul
        f32.add

        local.get $c
        local.get $h

        f32.mul
        f32.add

        local.get $d
        local.get $g

        f32.mul
        f32.sub

        f32.store

        local.get $dest
        i32.const 4
        i32.add

        local.get $a
        local.get $g

        f32.mul

        local.get $c
        local.get $e

        f32.mul
        f32.add

        local.get $d
        local.get $f

        f32.mul
        f32.add

        local.get $b
        local.get $h

        f32.mul
        f32.sub

        f32.store

        local.get $dest
        i32.const 8
        i32.add

        local.get $a
        local.get $h

        f32.mul

        local.get $b
        local.get $g

        f32.mul
        f32.add

        local.get $d
        local.get $e

        f32.mul
        f32.add

        local.get $c
        local.get $f

        f32.mul
        f32.sub

        f32.store
    )

    (func $quat_angle (;47;) (export "quat_angle") (param $from_a i32) (param $from_b i32) (result f32)
        (local $ax f32) (local $ay f32) (local $az f32) (local $aw f32)
        (local $bx f32) (local $by f32) (local $bz f32) (local $bw f32)

        local.get $from_a
        f32.load
        local.tee $ax
        local.get $from_b
        f32.load
        local.tee $bx
        f32.mul

        local.get $from_a
        i32.const 4
        i32.add
        f32.load
        local.tee $ay
        local.get $from_b
        i32.const 4
        i32.add
        f32.load
        local.tee $by
        f32.mul
        f32.add

        local.get $from_a
        i32.const 8
        i32.add
        f32.load
        local.tee $az
        local.get $from_b
        i32.const 8
        i32.add
        f32.load
        local.tee $bz
        f32.mul
        f32.add

        local.get $from_a
        i32.const 12
        i32.add
        f32.load
        local.tee $aw
        local.get $from_b
        i32.const 12
        i32.add
        f32.load
        local.tee $bw
        f32.mul
        f32.add
        f32.abs
        call $acosf32

        f32.const 2.0
        f32.mul
    )

    (func $quat_angle_st (;85;) (export "quat_angle_st") (param $dest i32) (param $from_a i32) (param $from_b i32)
        local.get $dest
        local.get $from_a
        local.get $from_b
        call $quat_angle
        f32.store
    )

    (func $quat_inv (;31;) (export "quat_inv") (param $dest i32) (param $from i32)
        local.get $dest
        local.get $from
        f32.load
        f32.neg
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        local.get $from
        i32.const 4
        i32.add
        f32.load
        f32.neg
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        local.get $from
        i32.const 8
        i32.add
        f32.load
        f32.neg
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        local.get $from
        i32.const 12
        i32.add
        f32.load
        f32.store
    )

    (func $quat_inv_ds (;21;) (export "quat_inv_ds") (param $dest i32)
        (local $t i32)
        local.get $dest
        local.get $dest
        f32.load
        f32.neg
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        local.tee $t
        local.get $t
        f32.load
        f32.neg
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        local.tee $t
        local.get $t
        f32.load
        f32.neg
        f32.store
    )

    (func $quat_slerp (;105+4jscalls;) (export "quat_slerp") (param $dest i32) (param $from_a i32) (param $from_b i32) (param $t f32)
        (local $a f32) (local $b f32) (local $c f32) (local $d f32)
        (local $e f32) (local $f f32) (local $g f32) (local $h f32)
        (local $angle f32) (local $t1 f32) (local $t2 f32) (local $t3 f32)

        local.get $from_a
        f32.load
        local.tee $a
        local.get $from_b
        f32.load
        local.tee $e
        f32.mul

        local.get $from_a
        i32.const 4
        i32.add
        f32.load
        local.tee $b
        local.get $from_b
        i32.const 4
        i32.add
        f32.load
        local.tee $f
        f32.mul
        f32.add

        local.get $from_a
        i32.const 8
        i32.add
        f32.load
        local.tee $c
        local.get $from_b
        i32.const 8
        i32.add
        f32.load
        local.tee $g
        f32.mul
        f32.add

        local.get $from_a
        i32.const 12
        i32.add
        f32.load
        local.tee $d
        local.get $from_b
        i32.const 12
        i32.add
        f32.load
        local.tee $h
        f32.mul
        f32.add

        call $acosf32
        local.set $angle
        
        local.get $dest

        f32.const 1.0
        local.get $t
        f32.sub
        local.get $angle
        f32.mul
        call $sinf32

        local.tee $t1
        local.get $a
        
        f32.mul

        local.get $angle
        local.get $t
        f32.mul
        call $sinf32

        local.tee $t2
        local.get $e

        f32.mul
        f32.add

        f32.const 1.0
        local.get $angle
        call $sinf32
        f32.div
        local.tee $t3

        f32.mul
        f32.store

        local.get $dest
        i32.const 4
        i32.add

        local.get $b
        local.get $t1

        f32.mul

        local.get $f
        local.get $t2

        f32.mul
        f32.add

        local.get $t3

        f32.mul

        f32.store

        local.get $dest
        i32.const 8
        i32.add

        local.get $c
        local.get $t1

        f32.mul

        local.get $g
        local.get $t2

        f32.mul
        f32.add

        local.get $t3

        f32.mul

        f32.store

        local.get $dest
        i32.const 12
        i32.add

        local.get $d
        local.get $t1

        f32.mul

        local.get $h
        local.get $t2

        f32.mul
        f32.add

        local.get $t3

        f32.mul

        f32.store
    )

    (func $mat3_from_quat (;126;) (export "mat3_from_quat") (param $dest i32) (param $from i32)
        (local $x f32) (local $y f32) (local $z f32) (local $w f32)
        (local $xx f32) (local $yy f32) (local $zz f32) (local $t1 f32) (local $t2 f32)

        local.get $dest

        local.get $from
        i32.const 4
        i32.add
        f32.load
        local.tee $y
        local.get $y
        f32.mul
        local.tee $yy

        local.get $from
        i32.const 8
        i32.add
        f32.load
        local.tee $z
        local.get $z
        f32.mul
        local.tee $zz

        f32.add

        f32.const -2.0
        f32.mul

        f32.const 1.0

        f32.add
        f32.store

        local.get $dest
        i32.const 4
        i32.add

        local.get $from
        f32.load

        local.tee $x
        local.get $y

        f32.mul
        local.tee $t1

        local.get $from
        i32.const 12
        i32.add
        f32.load

        local.tee $w
        local.get $z

        f32.mul
        local.tee $t2

        f32.add

        f32.const 2.0

        f32.mul

        f32.store

        local.get $dest
        i32.const 12
        i32.add

        local.get $t1
        local.get $t2

        f32.sub

        f32.const 2.0

        f32.mul

        f32.store

        local.get $dest
        i32.const 8
        i32.add

        local.get $x
        local.get $z

        f32.mul
        local.tee $t1

        local.get $w
        local.get $y

        f32.mul
        local.tee $t2

        f32.sub

        f32.const 2.0

        f32.mul

        f32.store

        local.get $dest
        i32.const 24
        i32.add

        local.get $t1
        local.get $t2

        f32.add

        f32.const 2.0

        f32.mul

        f32.store

        local.get $dest
        i32.const 16
        i32.add

        local.get $x
        local.get $x

        f32.mul
        local.tee $xx

        local.get $zz
        
        f32.add

        f32.const -2.0

        f32.mul

        f32.const 1.0

        f32.add

        f32.store

        local.get $dest
        i32.const 20
        i32.add

        local.get $y
        local.get $z

        f32.mul
        local.tee $t1

        local.get $w
        local.get $x

        f32.mul
        local.tee $t2

        f32.add

        f32.const 2.0
        
        f32.mul

        f32.store

        local.get $dest
        i32.const 28
        i32.add

        local.get $t1
        local.get $t2

        f32.sub

        f32.const 2.0

        f32.mul

        f32.store

        local.get $dest
        i32.const 32
        i32.add

        local.get $xx
        local.get $yy

        f32.add

        f32.const -2.0
        
        f32.mul

        f32.const 1.0

        f32.add

        f32.store
    )

    (func $mat4_from_quat (;161;) (export "mat4_from_quat") (param $dest i32) (param $from i32)
        (local $x f32) (local $y f32) (local $z f32) (local $w f32)
        (local $xx f32) (local $yy f32) (local $zz f32) (local $t1 f32) (local $t2 f32)

        local.get $dest

        local.get $from
        i32.const 4
        i32.add
        f32.load
        local.tee $y
        local.get $y
        f32.mul
        local.tee $yy

        local.get $from
        i32.const 8
        i32.add
        f32.load
        local.tee $z
        local.get $z
        f32.mul
        local.tee $zz

        f32.add

        f32.const -2.0
        f32.mul

        f32.const 1.0

        f32.add
        f32.store

        local.get $dest
        i32.const 4
        i32.add

        local.get $from
        f32.load

        local.tee $x
        local.get $y

        f32.mul
        local.tee $t1

        local.get $from
        i32.const 12
        i32.add
        f32.load

        local.tee $w
        local.get $z

        f32.mul
        local.tee $t2

        f32.add

        f32.const 2.0

        f32.mul

        f32.store

        local.get $dest
        i32.const 16
        i32.add

        local.get $t1
        local.get $t2

        f32.sub

        f32.const 2.0

        f32.mul

        f32.store

        local.get $dest
        i32.const 8
        i32.add

        local.get $x
        local.get $z

        f32.mul
        local.tee $t1

        local.get $w
        local.get $y

        f32.mul
        local.tee $t2

        f32.sub

        f32.const 2.0

        f32.mul

        f32.store

        local.get $dest
        i32.const 32
        i32.add

        local.get $t1
        local.get $t2

        f32.add

        f32.const 2.0

        f32.mul

        f32.store

        local.get $dest
        i32.const 20
        i32.add

        local.get $x
        local.get $x

        f32.mul
        local.tee $xx

        local.get $zz
        
        f32.add

        f32.const -2.0

        f32.mul

        f32.const 1.0

        f32.add

        f32.store

        local.get $dest
        i32.const 24
        i32.add

        local.get $y
        local.get $z

        f32.mul
        local.tee $t1

        local.get $w
        local.get $x

        f32.mul
        local.tee $t2

        f32.add

        f32.const 2.0
        
        f32.mul

        f32.store

        local.get $dest
        i32.const 36
        i32.add

        local.get $t1
        local.get $t2

        f32.sub

        f32.const 2.0

        f32.mul

        f32.store

        local.get $dest
        i32.const 40
        i32.add

        local.get $xx
        local.get $yy

        f32.add

        f32.const -2.0
        
        f32.mul

        f32.const 1.0

        f32.add

        f32.store

        local.get $dest
        i32.const 12
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 44
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 48
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 52
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 56
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 60
        i32.add
        f32.const 1.0
        f32.store
    )

    (func $mat3_from_mat4 (;69;) (export "mat3_from_mat4") (param $dest i32) (param $from i32)
        local.get $dest
        local.get $from
        f32.load
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        local.get $from
        i32.const 4
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        local.get $from
        i32.const 8
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        local.get $from
        i32.const 16
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        local.get $from
        i32.const 20
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        local.get $from
        i32.const 24
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        local.get $from
        i32.const 32
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        local.get $from
        i32.const 36
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        local.get $from
        i32.const 40
        i32.add
        f32.load
        f32.store
    )

    (func $mat4_from_mat3 (;103;) (export "mat4_from_mat3") (param $dest i32) (param $from i32)
        local.get $dest
        local.get $from
        f32.load
        f32.store

        local.get $dest
        i32.const 4
        i32.add
        local.get $from
        i32.const 4
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 8
        i32.add
        local.get $from
        i32.const 8
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 16
        i32.add
        local.get $from
        i32.const 12
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 20
        i32.add
        local.get $from
        i32.const 16
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 24
        i32.add
        local.get $from
        i32.const 20
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 32
        i32.add
        local.get $from
        i32.const 24
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 36
        i32.add
        local.get $from
        i32.const 28
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 40
        i32.add
        local.get $from
        i32.const 32
        i32.add
        f32.load
        f32.store

        local.get $dest
        i32.const 12
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 28
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 44
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 48
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 52
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 56
        i32.add
        f32.const 0.0
        f32.store

        local.get $dest
        i32.const 60
        i32.add
        f32.const 1.0
        f32.store
    )

    (func $quat_from_mat3 (;78,101,105,106;) (export "quat_from_mat3") (param $dest i32) (param $from i32)
        (local $trace f32)  (local $a f32) (local $e f32) (local $i f32) (local $case i32)
        (local $m12 f32) (local $m21 f32) (local $m13 f32) (local $m31 f32) (local $m23 f32) (local $m32 f32)
        (local $sqrt_value f32) (local $inv_value f32)

        local.get $from
        i32.const 4
        i32.add
        f32.load
        local.set $m21

        local.get $from
        i32.const 8
        i32.add
        f32.load
        local.set $m31

        local.get $from
        i32.const 12
        i32.add
        f32.load
        local.set $m12

        local.get $from
        i32.const 20
        i32.add
        f32.load
        local.set $m32

        local.get $from
        i32.const 24
        i32.add
        f32.load
        local.set $m13

        local.get $from
        i32.const 28
        i32.add
        f32.load
        local.set $m23

        local.get $from
        f32.load
        local.tee $a

        local.get $from
        i32.const 16
        i32.add
        f32.load
        local.tee $e

        f32.add

        local.get $from
        i32.const 32
        i32.add
        f32.load
        local.tee $i

        f32.add
        local.tee $trace
        f32.const 0.0
        f32.gt
        ;; case 1: trace(M) > 0
        if
            ;; W
            local.get $dest
            i32.const 12
            i32.add

            f32.const 1.0
            local.get $trace
            f32.add
            f32.sqrt
            local.tee $sqrt_value
            f32.const 0.5
            f32.mul

            f32.store
            ;; X
            local.get $dest
            ;; M32
            local.get $m32
            ;; M23
            local.get $m23

            f32.sub

            f32.const 1.0
            local.get $sqrt_value
            f32.const 2.0
            f32.mul
            f32.div
            local.tee $inv_value

            f32.mul

            f32.store
            ;; Y
            local.get $dest
            i32.const 4
            i32.add
            ;; M13
            local.get $m13
            ;; M31
            local.get $m31

            f32.sub

            local.get $inv_value

            f32.mul

            f32.store
            ;; Z
            local.get $dest
            i32.const 8
            i32.add
            ;; M21
            local.get $m21
            ;; M12
            local.get $from
            i32.const 12
            i32.add
            f32.load

            f32.sub

            local.get $inv_value

            f32.mul

            f32.store

            return
        end

        local.get $i
        local.get $a
        f32.gt
        i32.const 1
        i32.shl ;; i>e sets the second bit
        local.get $i
        local.get $e
        f32.gt
        i32.or ;; i>a sets the first bit
        ;; this section does not affect the original output, if it was already set correctly.
        i32.const 1
        local.get $e ;; shift 1 by e>a, this way the result will match exactly a or b. 
        local.get $a
        f32.gt
        i32.shl
        i32.or ;; merge the two outputs
        local.tee $case
        i32.const 1
        i32.eq
        if ;; case=1: a is the largest value
            ;; x
            local.get $dest

            f32.const 1.0
            local.get $a
            f32.add
            local.get $e
            f32.sub
            local.get $i
            f32.sub
            f32.sqrt
            local.tee $sqrt_value
            f32.const 0.5
            f32.mul

            f32.store
            ;; w
            local.get $dest
            i32.const 12
            i32.add
            ;; R32
            local.get $m32
            ;; R23
            local.get $from
            i32.const 28
            i32.add
            f32.load

            f32.sub

            f32.const 1.0
            local.get $sqrt_value
            f32.const 2.0
            f32.mul
            f32.div
            local.tee $inv_value

            f32.mul

            f32.store
            ;; y
            local.get $dest
            i32.const 4
            i32.add
            ;; R12
            local.get $m12
            ;; R21
            local.get $m21

            f32.add

            local.get $inv_value

            f32.mul

            f32.store
            ;; z
            local.get $dest
            i32.const 8
            i32.add
            ;; R13
            local.get $m13
            ;; R31
            local.get $m31

            f32.add

            local.get $inv_value

            f32.mul

            f32.store
        
            return
        end

        local.get $case
        i32.const 2
        i32.eq
        if ;; case=2: e is the largest value
            ;; y
            local.get $dest
            i32.const 4
            i32.add

            f32.const 1.0
            local.get $a
            f32.sub
            local.get $e
            f32.add
            local.get $i
            f32.sub
            f32.sqrt
            local.tee $sqrt_value
            f32.const 0.5
            f32.mul

            f32.store
            ;; w
            local.get $dest
            i32.const 12
            i32.add
            ;; R13
            local.get $m13
            ;; R31
            local.get $m31

            f32.sub

            f32.const 1.0
            local.get $sqrt_value
            f32.const 2.0
            f32.mul
            f32.div
            local.tee $inv_value

            f32.mul

            f32.store
            ;; x
            local.get $dest
            ;; R12
            local.get $m12
            ;; R21
            local.get $m21

            f32.add

            local.get $inv_value

            f32.mul

            f32.store
            ;; z
            local.get $dest
            i32.const 8
            i32.add
            ;; R23
            local.get $m23
            ;; R32
            local.get $m32

            f32.add

            local.get $inv_value

            f32.mul

            f32.store
        
            return
        else ;; case=3: i is the largest value
            ;; z
            local.get $dest
            i32.const 8
            i32.add

            f32.const 1.0
            local.get $a
            f32.sub
            local.get $e
            f32.sub
            local.get $i
            f32.add
            f32.sqrt
            local.tee $sqrt_value
            f32.const 0.5
            f32.mul

            f32.store
            ;; w
            local.get $dest
            i32.const 12
            i32.add
            ;; R21
            local.get $m21
            ;; R12
            local.get $m12

            f32.sub

            f32.const 1.0
            local.get $sqrt_value
            f32.const 2.0
            f32.mul
            f32.div
            local.tee $inv_value

            f32.mul

            f32.store
            ;; x
            local.get $dest
            ;; R13
            local.get $m13
            ;; R31
            local.get $m31

            f32.add

            local.get $inv_value

            f32.mul

            f32.store
            ;; y
            local.get $dest
            i32.const 4
            i32.add
            ;; R23
            local.get $m23
            ;; R32
            local.get $m32

            f32.add

            local.get $inv_value

            f32.mul

            f32.store
        
            return
        end
    )

    (func $quat_from_mat4 (;78,101,105,106;) (export "quat_from_mat4") (param $dest i32) (param $from i32)
        (local $trace f32)  (local $a f32) (local $e f32) (local $i f32) (local $case i32)
        (local $m12 f32) (local $m21 f32) (local $m13 f32) (local $m31 f32) (local $m23 f32) (local $m32 f32)
        (local $sqrt_value f32) (local $inv_value f32)

        local.get $from
        i32.const 4
        i32.add
        f32.load
        local.set $m21

        local.get $from
        i32.const 8
        i32.add
        f32.load
        local.set $m31

        local.get $from
        i32.const 16
        i32.add
        f32.load
        local.set $m12

        local.get $from
        i32.const 24
        i32.add
        f32.load
        local.set $m32

        local.get $from
        i32.const 32
        i32.add
        f32.load
        local.set $m13

        local.get $from
        i32.const 36
        i32.add
        f32.load
        local.set $m23

        local.get $from
        f32.load
        local.tee $a

        local.get $from
        i32.const 20
        i32.add
        f32.load
        local.tee $e

        f32.add

        local.get $from
        i32.const 40
        i32.add
        f32.load
        local.tee $i

        f32.add
        local.tee $trace
        f32.const 0.0
        f32.gt
        ;; case 1: trace(M) > 0
        if
            ;; W
            local.get $dest
            i32.const 12
            i32.add

            f32.const 1.0
            local.get $trace
            f32.add
            f32.sqrt
            local.tee $sqrt_value
            f32.const 0.5
            f32.mul

            f32.store
            ;; X
            local.get $dest
            ;; M32
            local.get $m32
            ;; M23
            local.get $m23

            f32.sub

            f32.const 1.0
            local.get $sqrt_value
            f32.const 2.0
            f32.mul
            f32.div
            local.tee $inv_value

            f32.mul

            f32.store
            ;; Y
            local.get $dest
            i32.const 4
            i32.add
            ;; M13
            local.get $m13
            ;; M31
            local.get $m31

            f32.sub

            local.get $inv_value

            f32.mul

            f32.store
            ;; Z
            local.get $dest
            i32.const 8
            i32.add
            ;; M21
            local.get $m21
            ;; M12
            local.get $from
            i32.const 12
            i32.add
            f32.load

            f32.sub

            local.get $inv_value

            f32.mul

            f32.store

            return
        end

        local.get $i
        local.get $a
        f32.gt
        i32.const 1
        i32.shl ;; i>e sets the second bit
        local.get $i
        local.get $e
        f32.gt
        i32.or ;; i>a sets the first bit
        ;; this section does not affect the original output, if it was already set correctly.
        i32.const 1
        local.get $e ;; shift 1 by e>a, this way the result will match exactly a or e. 
        local.get $a
        f32.gt
        i32.shl
        i32.or ;; merge the two outputs
        local.tee $case
        i32.const 1
        i32.eq
        if ;; case=1: a is the largest value
            ;; x
            local.get $dest

            f32.const 1.0
            local.get $a
            f32.add
            local.get $e
            f32.sub
            local.get $i
            f32.sub
            f32.sqrt
            local.tee $sqrt_value
            f32.const 0.5
            f32.mul

            f32.store
            ;; w
            local.get $dest
            i32.const 12
            i32.add
            ;; R32
            local.get $m32
            ;; R23
            local.get $from
            i32.const 28
            i32.add
            f32.load

            f32.sub

            f32.const 1.0
            local.get $sqrt_value
            f32.const 2.0
            f32.mul
            f32.div
            local.tee $inv_value

            f32.mul

            f32.store
            ;; y
            local.get $dest
            i32.const 4
            i32.add
            ;; R12
            local.get $m12
            ;; R21
            local.get $m21

            f32.add

            local.get $inv_value

            f32.mul

            f32.store
            ;; z
            local.get $dest
            i32.const 8
            i32.add
            ;; R13
            local.get $m13
            ;; R31
            local.get $m31

            f32.add

            local.get $inv_value

            f32.mul

            f32.store
        
            return
        end

        local.get $case
        i32.const 2
        i32.eq
        if ;; case=2: e is the largest value
            ;; y
            local.get $dest
            i32.const 4
            i32.add

            f32.const 1.0
            local.get $a
            f32.sub
            local.get $e
            f32.add
            local.get $i
            f32.sub
            f32.sqrt
            local.tee $sqrt_value
            f32.const 0.5
            f32.mul

            f32.store
            ;; w
            local.get $dest
            i32.const 12
            i32.add
            ;; R13
            local.get $m13
            ;; R31
            local.get $m31

            f32.sub

            f32.const 1.0
            local.get $sqrt_value
            f32.const 2.0
            f32.mul
            f32.div
            local.tee $inv_value

            f32.mul

            f32.store
            ;; x
            local.get $dest
            ;; R12
            local.get $m12
            ;; R21
            local.get $m21

            f32.add

            local.get $inv_value

            f32.mul

            f32.store
            ;; z
            local.get $dest
            i32.const 8
            i32.add
            ;; R23
            local.get $m23
            ;; R32
            local.get $m32

            f32.add

            local.get $inv_value

            f32.mul

            f32.store
        
            return
        else ;; case=3: i is the largest value
            ;; z
            local.get $dest
            i32.const 8
            i32.add

            f32.const 1.0
            local.get $a
            f32.sub
            local.get $e
            f32.sub
            local.get $i
            f32.add
            f32.sqrt
            local.tee $sqrt_value
            f32.const 0.5
            f32.mul

            f32.store
            ;; w
            local.get $dest
            i32.const 12
            i32.add
            ;; R21
            local.get $m21
            ;; R12
            local.get $m12

            f32.sub

            f32.const 1.0
            local.get $sqrt_value
            f32.const 2.0
            f32.mul
            f32.div
            local.tee $inv_value

            f32.mul

            f32.store
            ;; x
            local.get $dest
            ;; R13
            local.get $m13
            ;; R31
            local.get $m31

            f32.add

            local.get $inv_value

            f32.mul

            f32.store
            ;; y
            local.get $dest
            i32.const 4
            i32.add
            ;; R23
            local.get $m23
            ;; R32
            local.get $m32

            f32.add

            local.get $inv_value

            f32.mul

            f32.store
        
            return
        end
    )

    (func $set_simple_seed (export "set_simple_seed") (param i32)
        local.get 0
        i32.eqz
        if
            return
        end

        local.get 0
        global.set $simple_seed
    )

    (func $simple_random (export "simple_random") (result f64)
        (local $t i32)
        global.get $simple_seed
        global.get $simple_seed
        i32.const 13
        i32.shl
        i32.xor

        local.tee $t
        local.get $t
        i32.const 17
        i32.shr_u
        i32.xor
        
        local.tee $t
        local.get $t
        i32.const 5
        i32.shl
        i32.xor

        local.tee $t
        global.set $simple_seed

        local.get $t
        f64.convert_i32_u
        f64.const 2.3283064365386963e-10
        f64.mul
    )
)