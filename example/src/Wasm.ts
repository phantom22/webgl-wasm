/**
 * Prints to console the standard memory view of a program.
 * @param {Uint8Array} mem
 * @param {number} errByte error offset.
 * @param {string} errMsg
 */
function memoryView(byteArr:Uint8Array, errByte=-1, errMsg="") {
    if (errMsg === "")
        errMsg = "Something went wrong";

    const header = "|  decimal  |   hex   |    00  01  02  03  04  05  06  07  08  09  0A  0B  0C  0D  0E  0F    |        text        |",
          line = "=".repeat(header.length) + "\n",
          styleDefault = "color:#ffffff;font-weight:normal;",
          styleMsgError = "color:lightcoral;font-weight:bold;",
          styleByteError = "color:#ff0000;font-weight:bold;",
          eofErr = errByte >= byteArr.length,
          arr = Array.from(byteArr);

    if (errByte > byteArr.length)
        errByte = byteArr.length;

    if (eofErr) {
        arr.push(NaN);
    }

    let view = `%c\n${line}${header}\n${line}`,
        logStyles = [styleDefault],
        errFound = false;

    for (let i=0; i<byteArr.length; i+=16) {
        const decOffset = i.toString().padStart(7," "),
              hexOffset = `0x${(i).toString(16).padStart(5,"0")}`;
        let  hexBytes = "", // hexArr.slice(i,i+16).join("  ").padEnd(62," "),
             textVals = "", // base64Arr.slice(i,i+16).join("").padEnd(16," ");
             additionalMsg = "";

        if (errFound) {
            hexBytes += "%c";
            textVals += "%c";
            logStyles.push(styleByteError,styleDefault,styleByteError,styleDefault);
        }

        for (let j=i; j<i+16; j++) {

            const v = arr[j];

            if (v === undefined) {

                if (j < i+15)
                    hexBytes += "    ";
                else
                    hexBytes += "  ";
                textVals += " ";
            }
            else {
                const nan = v !== v;
                if (!errFound && j === errByte) {
                    errFound = true;
                    logStyles.push(styleByteError,styleDefault,styleByteError,styleDefault,styleMsgError,styleDefault);
                    hexBytes += "%c";
                    textVals += "%c";
                    additionalMsg = ` %c<---- ${errMsg}%c`;
                    if (nan) {
                        hexBytes += "??";
                        textVals += " ";
                    }
                }
                if (!nan) {
                    hexBytes += v.toString(16).padStart(2,"0").toUpperCase();
                    textVals += (v>31&&v<127||v>159&&v<256) ? String.fromCharCode(v) : ".";
                }
                if (j < i+15)
                    hexBytes += "  ";
            }

        }

        if (errFound) {
            hexBytes += "%c";
            textVals += "%c";
        }

        view += `|  ${decOffset}  | ${hexOffset} |    ${hexBytes}    |  ${textVals}  |${additionalMsg}\n`;
    }

    view += line;

    console.log(view, ...logStyles);
}

const Wasm = () => void 0;
Wasm.import = <A extends WebAssembly.Exports,B>(moduleName:string,binaries:string|Uint8Array,importObject?:B) => {
    const start = performance.now();
    return new Promise<{instance:WebAssembly.Instance,module:WebAssembly.Module,exports:A,binaries:Uint8Array,elapsedMs:number}>((resolve,reject) => {
        const blob = typeof binaries === "string" ? Uint8Array.from(atob(binaries), c=>c.charCodeAt(0)) : binaries;
        WebAssembly.compile(blob)
            .then((t:WebAssembly.Module) => {
                WebAssembly.instantiate(t,importObject as WebAssembly.Imports)
                    .then(res => resolve({instance:res,module:t,exports:res.exports as A,binaries:blob,elapsedMs:performance.now()-start}))
                    .catch(e => {
                        console.error(`WASM: Couldn't instantiate '${moduleName}' module, missing imports!\n${e}`);
                        reject(WebAssembly.Module.imports(t));
                    })
            })
            .catch(e => {
                    console.error(`WASM: Couldn't compile '${moduleName}' module!\n${e}`)
                    const offset = e.message.match(/[0-9]+/);
                    if (offset !== null && offset[0] !== "") {
                        const errByte = Number(offset[0]),
                              errMsg = e.message.slice(e.message.lastIndexOf(":")+2);
                        memoryView(blob, errByte, errMsg);
                    }
                    reject(void 0);
                }
            );
    });
}

Wasm.encodeStringToUint32Array = (str:string,targetLength:number,toWATInstructions:boolean) => {
	const paddedStr = str.padEnd(targetLength," ");
	if (paddedStr.length !== targetLength)
		throw new Error(`the passed string must be of length ${targetLength}!`);
	const encoder = new TextEncoder(),
          uint8array = encoder.encode(paddedStr),
          uint32array = new Uint32Array(uint8array.buffer);
	return toWATInstructions ? `;; "${str}"\n`+Array.from(uint32array).map(v => "i32.const 0x"+v.toString(16).toUpperCase()).join("\n") : uint32array
}
Wasm.log_16char_string_from_i32x4 = (a:number,b:number,c:number,d:number) => {
	const uint32array = new Uint32Array([a,b,c,d]),
          uint8array = new Uint8Array(uint32array.buffer),
          string = new TextDecoder("utf-8").decode(uint8array);
	console.log(string)
}
Wasm.log_32char_string_from_i32x8 = (a:number,b:number,c:number,d:number,e:number,f:number,g:number,h:number) => {
	const uint32array = new Uint32Array([a,b,c,d,e,f,g,h]),
          uint8array = new Uint8Array(uint32array.buffer),
          string = new TextDecoder("utf-8").decode(uint8array);
	console.log(string)
}
Wasm.log_64char_string_from_i32x16 = (a:number,b:number,c:number,d:number,e:number,f:number,g:number,h:number,i:number,j:number,k:number,l:number,m:number,n:number,o:number,p:number) => {
	const uint32array = new Uint32Array([a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p]),
          uint8array = new Uint8Array(uint32array.buffer),
          string = new TextDecoder("utf-8").decode(uint8array);
	console.log(string)
}
Wasm.throw_64char_error_from_i32x16 = (a:number,b:number,c:number,d:number,e:number,f:number,g:number,h:number,i:number,j:number,k:number,l:number,m:number,n:number,o:number,p:number) => {
    const uint32array = new Uint32Array([a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p]),
          uint8array = new Uint8Array(uint32array.buffer),
          string = new TextDecoder("utf-8").decode(uint8array);

    throw string
}
Wasm.warn_64char_error_from_i32x16 = (a:number,b:number,c:number,d:number,e:number,f:number,g:number,h:number,i:number,j:number,k:number,l:number,m:number,n:number,o:number,p:number) => {
    const uint32array = new Uint32Array([a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p]),
          uint8array = new Uint8Array(uint32array.buffer),
          string = new TextDecoder("utf-8").decode(uint8array);

    console.warn(string)
}
let _nums_as_fracs = false,
    _frac_digits = 3,
    _max_den = 101,
    _no_padding = false,
    _memory = null as WebAssembly.Memory,
    _gl = null as WebGLRenderingContext;
Wasm.format_number = (x:number) => {
    if (Number.isInteger(x))
        return x.toString();

    if (_nums_as_fracs) {
        const max = _max_den;

        let pn = Math.floor(x), pd = 1,
            qn = Math.ceil(x),  qd = 1;
    
        while (pd+qd<max&&pd*qn-pn*qd===1) {
            let tn = pn + qn,
                td = pd + qd;
    
            if (tn/td>x) {
                qn = tn;
                qd = td;
            }
            else {
                pn = tn;
                pd = td;
            }
        }
    
        return x-pn/pd>qn/qd-x ? `${qn}/${qd}` : `${pn}/${pd}`
    }

    return x.toFixed(_frac_digits);
}
Wasm.format_numbers = (ignorePadding:boolean,...x:number[]) => {
    const l = x.length,
          _ = Array(l) as string[];
    let pad_length = 1;
    for (let i=0; i<l; i++) {
        const v = Wasm.format_number(x[i]),
              _l = v.length;
        if (_l > pad_length)
            pad_length = _l;
        _[i] = v;
    }
    for (let i=0; !ignorePadding && i<l; i++) {
        const _l = _[i].length;
        if (_l < pad_length)
            _[i] = _[i].padStart(pad_length, " ");
    }
    return _;
}
Wasm.log_number = (x:number) => {
    console.log(Wasm.format_number(x))
}
Wasm.log_vec2 = (x:number,y:number) => {
    const _ = Wasm.format_numbers(true,x,y);
    console.log(`vec2 { x:${_[0]}, y:${_[1]} }`);
}
Wasm.log_vec3 = (x:number,y:number,z:number) => {
    const _ = Wasm.format_numbers(true,x,y,z);
    console.log(`vec3 { x:${_[0]}, y:${_[1]}, z:${_[2]} }`);
}
Wasm.log_vec4 = (x:number,y:number,z:number,w:number) => {
    const _ = Wasm.format_numbers(true,x,y,z,w);
    console.log(`vec4 { x:${_[0]}, y:${_[1]}, z:${_[2]}, w:${_[3]} }`);
}
Wasm.log_mat3 = (a:number,b:number,c:number,d:number,e:number,f:number,g:number,h:number,i:number) => {
    const _ = Wasm.format_numbers(_no_padding,a,b,c,d,e,f,g,h,i);
    console.log(`mat3 {\n  ${_[0]}, ${_[3]}, ${_[6]},\n  ${_[1]}, ${_[4]}, ${_[7]},\n  ${_[2]}, ${_[5]}, ${_[8]}\n}`)
}
Wasm.log_mat4 = (a:number,b:number,c:number,d:number,e:number,f:number,g:number,h:number,i:number,j:number,k:number,l:number,m:number,n:number,o:number,p:number) => {
    const _ = Wasm.format_numbers(_no_padding,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p);
    console.log(`mat4 {\n  ${_[0]}, ${_[4]}, ${_[8]}, ${_[12]},\n  ${_[1]}, ${_[5]}, ${_[9]}, ${_[13]},\n  ${_[2]}, ${_[6]}, ${_[10]}, ${_[14]},\n  ${_[3]}, ${_[7]}, ${_[11]}, ${_[15]}\n}`)
}
Wasm.log_quat = (x:number,y:number,z:number,w:number) => {
    const _ = Wasm.format_numbers(true,x,y,z,w);
    console.log(`quat { x:${_[0]}, y:${_[1]}, z:${_[2]}, w:${_[3]} }`)
}
Wasm.set_target_memory = (memory:WebAssembly.Memory) => {
    _memory = memory;
}
Wasm.set_webgl_context = (gl:WebGLRenderingContext) => {
    _gl = gl;
}
Wasm.log_i32_array = (offset:number, size:number) => {
    if (_memory === null)
        throw "Wasm.log_i32_array(): you must set the target memory with Wasm.set_target_memory().";

    const i32array = new Int32Array(_memory.buffer, offset, size);
    console.log({offset,size:size*4,i32array:i32array.toString()})
}
Wasm.vec2_get = (offset:number) => {
    return new Float32Array(_memory.buffer, offset, 2);
}
Wasm.vec3_get = (offset:number) => {
    return new Float32Array(_memory.buffer, offset, 3);
}
Wasm.vec4_get = (offset:number) => {
    return new Float32Array(_memory.buffer, offset, 4);
}
Wasm.mat3_get = (offset:number) => {
    return new Float32Array(_memory.buffer, offset, 9);
}
Wasm.mat4_get = (offset:number) => {
    return new Float32Array(_memory.buffer, offset, 16);
}
Wasm.quat_get = (offset:number) => {
    return new Float32Array(_memory.buffer, offset, 4);
}
Object.freeze(Wasm);