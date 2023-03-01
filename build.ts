import * as esbuild from "https://deno.land/x/esbuild@v0.17.10/mod.js";

const options:{}={
  entryPoints: ['./src/main.js'],
  bundle: true,
  minify:true,
  sourcemap: true,
  banner:{
    js:`/*
* ReisenJS
* Mit License
* https://github.com/nakasyou/ReisenJS
*/`
  }
};
async function build(addOptions:{}){
  Object.keys(options).forEach(key=>{
    if(Object.keys(addOptions).includes(key))return;
    addOptions[key]=options[key];
  });
  await esbuild.build(addOptions);
}
await Promise.all([
  build({
    outfile:'./dist/reisen.usm.js',
    format: 'iife',
    globalName: 'reisen'
  }),
  build({
    outfile:'./dist/reisen.cjs',
    format:'cjs'
  }),
  build({
    outfile:'./dist/reisen.mjs',
    format:'esm'
  })
])
Deno.exit();