#!/usr/bin/env node

// Workaround for Rollup architecture mismatch on Apple Silicon running Node in x64 mode
const { spawn } = require('child_process');
const path = require('path');

// Force using the WASM version if native module fails
process.env.ROLLUP_WASM = '1';

// Run Vite
const vite = spawn('npx', ['vite'], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    PATH: `${path.join(__dirname, 'node_modules', '.bin')}:${process.env.PATH}`
  }
});

vite.on('close', (code) => {
  process.exit(code);
});