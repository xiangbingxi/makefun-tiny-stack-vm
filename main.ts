// Tiny stack VM: exact interpreter of make.fun's tiny stack ISA (kit ISA.md / vm.mjs).
import { mkdirSync as k, readdirSync as l, readFileSync as r, writeFileSync as w } from 'node:fs';
function run(p, q) {
  const D = new Int32Array(256); let s = 0;
  const C = new Int32Array(64); let c = 0;
  const M = new Int32Array(256);
  const o = new Uint8Array(1 << 16); let n = 0, i = 0, x = 0, t = 0;
  const d = (e) => [o.slice(0, n), e];
  for (;;) {
    if (t === 1e6) return d(10);
    if (x < 0 || x >= p.length) return d(9);
    const b = p[x];
    if (!(b < 8 || (b > 15 && b < 35 && b !== 31) || (b > 47 && b < 53) || b === 64 || b === 65 || (b > 79 && b < 84))) return d(5);
    const m = b === 1 ? 1 : b === 2 ? 4 : b > 47 && b < 52 ? 2 : 0;
    if (x + m >= p.length) return d(9);
    t++;
    const y = x + 1 + m;
    const u = b === 7 ? 3 : (b === 5 || b === 6 || b === 65 || (b > 15 && b < 35 && b !== 23 && b !== 27 && b !== 31)) ? 2 : (b === 3 || b === 4 || b === 23 || b === 27 || b === 49 || b === 50 || b === 64 || b === 80 || b === 81 || b === 83) ? 1 : 0;
    const v = b === 6 || b === 7 ? 3 : b === 4 || b === 5 ? 2 : b === 1 || b === 2 || b === 82 || b === 64 || (b > 15 && b < 35) ? 1 : 0;
    if (s < u) return d(2);
    if (s - u + v > 256) return d(3);
    x = y;
    if (b === 0) return d(0);
    else if (b === 1) D[s++] = (p[y - 1] << 24) >> 24;
    else if (b === 2) D[s++] = p[y - 4] | (p[y - 3] << 8) | (p[y - 2] << 16) | (p[y - 1] << 24);
    else if (b === 3) s--;
    else if (b === 4) { D[s] = D[s - 1]; s++; }
    else if (b === 5) { const a = D[s - 1]; D[s - 1] = D[s - 2]; D[s - 2] = a; }
    else if (b === 6) { D[s] = D[s - 2]; s++; }
    else if (b === 7) { const a = D[s - 3]; D[s - 3] = D[s - 2]; D[s - 2] = D[s - 1]; D[s - 1] = a; }
    else if (b === 23) D[s - 1] = -D[s - 1] | 0;
    else if (b === 27) D[s - 1] = ~D[s - 1];
    else if (b > 15 && b < 35 && b !== 31 && b !== 23 && b !== 27) {
      const z = D[s - 1], a = D[s - 2]; let g;
      if (b === 16) g = (a + z) | 0;
      else if (b === 17) g = (a - z) | 0;
      else if (b === 18) g = Math.imul(a, z);
      else if (b === 19) { if (!z) return d(4); g = a === -2147483648 && z === -1 ? a : (a / z) | 0; }
      else if (b === 20) { if (!z) return d(4); g = z === -1 ? 0 : (a % z) | 0; }
      else if (b === 21) { if (!z) return d(4); g = Math.floor((a >>> 0) / (z >>> 0)) | 0; }
      else if (b === 22) { if (!z) return d(4); g = ((a >>> 0) % (z >>> 0)) | 0; }
      else if (b === 24) g = a & z;
      else if (b === 25) g = a | z;
      else if (b === 26) g = a ^ z;
      else if (b === 28) g = a << (z & 31);
      else if (b === 29) g = a >> (z & 31);
      else if (b === 30) g = (a >>> (z & 31)) | 0;
      else if (b === 32) g = a === z ? 1 : 0;
      else if (b === 33) g = a < z ? 1 : 0;
      else g = (a >>> 0) < (z >>> 0) ? 1 : 0;
      s -= 2; D[s++] = g;
    }
    else if (b >= 48 && b <= 50) {
      const g = ((p[y - 2] | (p[y - 1] << 8)) << 16) >> 16;
      if (b === 48 || (b === 49) === (D[--s] === 0)) x = y + g;
    }
    else if (b === 51) { if (c === 64) return d(7); C[c++] = y; x = p[y - 2] | (p[y - 1] << 8); }
    else if (b === 52) { if (!c) return d(8); x = C[--c]; }
    else if (b === 64) { const a = D[s - 1]; if (a < 0 || a > 255) return d(6); D[s - 1] = M[a]; }
    else if (b === 65) { const a = D[s - 1], g = D[s - 2]; if (a < 0 || a > 255) return d(6); s -= 2; M[a] = g; }
    else if (b === 80) { const g = '' + D[s - 1]; if (n + g.length > 65536) return d(11); s--; for (let j = 0; j < g.length; j++) o[n++] = g.charCodeAt(j); }
    else if (b === 81) { if (n >= 65536) return d(11); o[n++] = D[--s] & 255; }
    else if (b === 82) D[s++] = i < q.length ? q[i++] : -1;
    else if (b === 83) return d(D[--s] & 255);
  }
}
const I = process.env.MAKEFUN_INPUT_DIR ?? '/input', O = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
for (const id of l(I).sort()) {
  const g = new Uint8Array(r(I + '/' + id + '/program.bin'));
  let q = new Uint8Array(0);
  try { q = new Uint8Array(r(I + '/' + id + '/input.bin')); } catch { /* no input */ }
  const [o, e] = run(g, q);
  k(O + '/' + id, { recursive: true });
  w(O + '/' + id + '/stdout.bin', o);
  w(O + '/' + id + '/exit.txt', e + '\n');
}
