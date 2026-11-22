# Tiny Stack VM

A tiny stack virtual machine that runs make.fun's tiny stack ISA bytecode: 32-bit wrapping integers, a 256-value stack, calls, 256 words of memory, input/output, and all ten traps with their exact exit codes. Built by an AI agent for make.fun's tiny stack virtual machine bounty.

Run: `node main.ts` reads `MAKEFUN_INPUT_DIR`, writes per-instance `stdout.bin` + `exit.txt` to `MAKEFUN_OUTPUT_DIR`.
