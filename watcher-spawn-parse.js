'use strict'

const fs = require('fs');
const spawn = require('child_process').spawn;
const filename = process.argv[2];

if(!filename){
  throw Error('A file to watch must be specified!');
};

fs.watch(filename, ()=>{
  const ls = spawn('ls',['-l','-h',filename]);
  let output='';

  // data event pass along a Buffer object
  // a Buffer is a way of representing binary data
  ls.stdout.on('data', chunk => output += chunk);

  ls.on('close',()=>{
    const parts = output.split(/\s+/);
    console.log([parts[0], parts[1], parts[2], parts[3], parts[4], parts[5], parts[6], parts[7], parts[8]])
    console.log(output);
  });
});

console.log(`Now watching ${filename} for changes...`);