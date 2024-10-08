const canvas = document.getElementById("gl-canvas") as HTMLCanvasElement;
if (!canvas)
    throw "the target canvas element with id #gl-canvas is missing from the document!";
else if (!(canvas instanceof HTMLCanvasElement))
    throw "The element #gl-canvas is not an HTMLCanvasElement!";

const gl = canvas.getContext("webgl2");
if (!gl)
    throw "WebGL 2.0 is not available!";

const page_count = 2,
      memory = new WebAssembly.Memory({ initial: page_count });
      
let b: BufferModule;
Wasm.set_target_memory(memory);
Wasm.import<BufferModule, BufferImports>(
    "buffer",
    BufferModule_base64,
    {
        env: { 
            memory,
            page_count:page_count
        }, 
        Math,
        Wasm,
        Date
    }
).then(({exports,elapsedMs}) => {
    b = exports;
    console.log(`wasm loaded in ${elapsedMs} milliseconds.`);
    main();
});

let resized = false;

function main() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    b.set_viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.enable(gl.DEPTH_TEST);

    /////////////////////
    // SET UP PROGRAM
    /////////////////////

    const vsSource =  (document.getElementById("vertex-draw") as HTMLScriptElement).text.trim(),
        fsSource =  (document.getElementById("fragment-draw") as HTMLScriptElement).text.trim();

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vsSource);
    gl.compileShader(vertexShader);

    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        throw gl.getShaderInfoLog(vertexShader);
    }

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fsSource);
    gl.compileShader(fragmentShader);

    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        throw gl.getShaderInfoLog(fragmentShader);
    }

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw gl.getProgramInfoLog(program);
    }

    /////////////////////////
    // GET UNIFORM LOCATIONS
    /////////////////////////

    const sceneUniformsLocation = gl.getUniformBlockIndex(program, "SceneUniforms");
    gl.uniformBlockBinding(program, sceneUniformsLocation, 0);

    const modelMatrixLocation = gl.getUniformLocation(program, "uModel"),
          normalMatrixLocation = gl.getUniformLocation(program, "uNormal"),
          texLocation = gl.getUniformLocation(program, "uTextureArray");

    gl.useProgram(program);

    /////////////////////
    // SET UP GEOMETRY
    /////////////////////

    const sphere = createSphere({ lat_bands:50, long_bands:50, radius:0.5 });

    const sphereArray = gl.createVertexArray();
    gl.bindVertexArray(sphereArray);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, sphere.positions, gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    const uvBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, sphere.uvs, gl.STATIC_DRAW);
    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(1);

    const normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, sphere.normals, gl.STATIC_DRAW);
    gl.vertexAttribPointer(2, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(2);  

    const indicesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, sphere.indices, gl.STATIC_DRAW);

    //////////////////////////
    // UNIFORM DATA
    //////////////////////////
    const pVMi = b.malloc_mat4(),
          viewProjMatrix = Wasm.mat4_get(pVMi);

    const ar = gl.drawingBufferWidth / gl.drawingBufferHeight,
          left = -ar/2,
          right = -left,
          bottom = -1/ar,
          top = 1/ar;
    b.set_orthographic_camera(
        2.5, 3, 0.3, // camera position
        0,   0,   0, // camera target
        0,   1,   0, // camera up dir
        left,right,bottom,top,
        -5, 5 // near plane, far plane 
    );
    b.view_orthographic(pVMi);

    const ePi = b.new_vec3(2.5,3,0.3), // eye position index
          eyePosition = Wasm.vec3_get(ePi),
          lightPosition = Wasm.vec3_get(b.new_vec3(1,3,-2)),
          tMi = b.malloc_mat4(), // transform matrix index
          nMi = b.malloc_mat3(), // normal matrix index
          transformMatrix = Wasm.mat4_get(tMi),
          normalMatrix = Wasm.mat3_get(nMi);

    const sceneUniformData = new Float32Array(24);
    sceneUniformData.set(viewProjMatrix);
    sceneUniformData.set(eyePosition, 16);
    sceneUniformData.set(lightPosition, 20);

    const sceneUniformBuffer = gl.createBuffer();
    gl.bindBufferBase(gl.UNIFORM_BUFFER, 0, sceneUniformBuffer);
    gl.bufferData(gl.UNIFORM_BUFFER, sceneUniformData, gl.DYNAMIC_DRAW);

    const q1 = b.new_quat(0,0,0,1),
          q2 = b.malloc_quat(),
          objectAngle = b.new_f64(0),
          objectIncrement = b.new_f64(Math.PI/240);

    b.quat_from_XYZi(q2,-Math.PI/360,-Math.PI/300,-Math.PI/240);
    b.vec4_norm_ds(q2);

    const img = new Image(),
          images = Object.keys(MetalTexture) as ["albedo","normal","metallic","displacement","roughness"];

    let imgIndex = 0;

    const texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D_ARRAY, texture);

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_WRAP_T, gl.REPEAT);

    
    const lastLayerIndex: number = 4;
    
    img.onload = function() {

        if (imgIndex === 0) {
            const levels = Math.floor(Math.log2(Math.max(img.width, img.height))) + 1;
            gl.texStorage3D(gl.TEXTURE_2D_ARRAY, levels, gl.RGBA8, img.width, img.height, lastLayerIndex===0?1:lastLayerIndex+1);
        }
        
        gl.texSubImage3D(gl.TEXTURE_2D_ARRAY, 0, 0, 0, imgIndex, img.width, img.height, 1, gl.RGBA, gl.UNSIGNED_BYTE, img);
        
        if (imgIndex !== lastLayerIndex) {
            imgIndex++;
            img.src = MetalTexture[images[imgIndex]];
            return;
        }

        gl.generateMipmap(gl.TEXTURE_2D_ARRAY);
        gl.uniform1i(texLocation, 0);

        function draw() {
            // apply rotation to sphere
            b.quat_prod(q1,q1,q2);
            b.vec4_norm_ds(q1);
            // update sphere transform matrix with new rotation and position
            b.transform_QTi(tMi,q1,Math.cos(b.f64_incr(objectAngle,objectIncrement)) * 0.3,0,Math.sin(b.f64_get(objectAngle)) * 0.3);
            gl.uniformMatrix4fv(modelMatrixLocation, false, transformMatrix);
            // calculate normal matrix from transform matrix
            b.normal_from_transform_RT(nMi, tMi);
            gl.uniformMatrix3fv(normalMatrixLocation, false, normalMatrix);

            if (resized) {
                resized = false;

                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;            
            }

            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawElements(gl.TRIANGLES, sphere.indices.length, gl.UNSIGNED_SHORT, 0);

            requestAnimationFrame(draw);
        }

        requestAnimationFrame(draw);
                
    }

    window.addEventListener("resize", () => { resized = true });

    img.src = MetalTexture[images[imgIndex]];
}