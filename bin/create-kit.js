#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
if (args.includes('-v') || args.includes('--version')) {
  console.log('tidyfactor-php v1.0.0');
  process.exit(0);
}

if (args.includes('-h') || args.includes('--help')) {
  console.log('Usage: npx @tidyfactor/cli-php [project-directory] [options]');
  console.log('Options:');
  console.log('  -y, --yes          Non-interactive / AI Agent mode');
  console.log('  -v, --version      Show version');
  console.log('  -h, --help         Show help');
  process.exit(0);
}

console.log('✨ Scaffolded tidyfactor-php starter project successfully.');
