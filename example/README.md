# Orthographic Projection Example

This code structure is based on the [webgl2examples](https://github.com/tsherif/webgl2examples) repository, specifically from the `cube.html` file.

This example can run without a localhost environment by converting texture images into base64 data URIs. These URIs are loaded dynamically using an `img` element and the `onload()` event;
the same applies to the wasm binaries.

While using `fetch()` would provide a cleaner solution, this method is necessary for proper functionality when running as a local `.html` file.

Additionally, the `Wasm.ts` file includes a potential implementation for the expected imports of the WebAssembly module.