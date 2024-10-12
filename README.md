# webgl-wasm

This module implements essential data structures for 3D environments, including 2D/3D/4D vectors, 3x3/4x4 matrices, quaternions, and methods for operations on scalar types like i32, f32, and f64.

It efficiently computes:
- Rotation matrices/quaternions for any XYZ-order Euler angles.
- Billboard matrices both fixed axis-rotation and spherical.
- Transformation matrices for scaling, rotation (Euler angles), and translation.
- Transformation matrices from rotation matrices or quaternions.
- View matrices.
- Perspective and orthographic projection matrices.
- Combined view-projection matrices (perspective and orthographic).
- Viewport matrices.

Memory allocation follows two patterns:
- `malloc_<structure>`: Allocates memory.
- `new_<structure>`: Allocates memory and initializes values.

Both functions return the memory offset for use in `dest/from` arguments.

---

The provided example demonstrates how to set up a TypeScript environment (recommended for type safety) and implement the imports required by the WebAssembly module.