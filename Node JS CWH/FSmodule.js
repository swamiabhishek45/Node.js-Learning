
const fs = require('fs');

// Asynchronous readFile method
fs.readFile('second.js', 'utf8', (err, data) => {
    console.log(err, data); // It works on non-blocking module
})

// Synchronous readFile method
const a = fs.readFileSync('second.js')
console.log(a.toString()); // It works on blocking module

console.log("Finished reading file");

// Asynchronous writeFile method
fs.writeFile('file.txt', "This is data to be inserted in file", ()=>{
console.log("Written to the file");
});