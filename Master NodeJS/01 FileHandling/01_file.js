const { log } = require('console');
const fs = require('fs');
const os = require('os');


// Blocking...Synchronous
// fs.writeFileSync('./test.txt', "Hello world");


// // Non-Blocking...Asynchronous
// fs.writeFile("./test.txt", "Hello world Async", (err) => {});



// console.log("Start script!!");

// const result = fs.readFileSync('./test.txt', 'utf8');
// console.log(result);

// fs.readFile('./test.txt', 'utf8', (err, res) => {
//     console.log(res);
// })

// console.log("Start End!!");

console.log(os.cpus().length);