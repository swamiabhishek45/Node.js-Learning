const fs = require("fs"); // In built

// Blocking & Non-blocking
// Sync returns
// Async does not returns 

// Create new file Synchronously
// fs.writeFileSync("./test.txt", "hello world Synchronous")

// Create new file Asynchronously
// fs.writeFile("./test.txt", "hello world Asynchronous", (err)=>{})

// read file Synchronously and return
// const result = fs.readFileSync("./contacts.txt", "utf-8");
// console.log(result);

// read file Asynchronoulsy and does not return
// fs.readFile("./contacts.txt", "utf-8", (err, result)=>{
//     if(err){
//         console.log("ERROR: ", err);
//     } else{
//         console.log(result);
//     }
// })

// add content without overiding previous one
// fs.appendFileSync("./test.txt", `\n${new Date().toLocaleString()}`);

// copy file
fs.cpSync("./contacts.txt","./copy2222.txt")
fs.copyFileSync("./test.txt", "./copy.txt");

// delete file
fs.unlinkSync("./copy2222.txt");

// get stats of file
const stats = fs.statSync("./test.txt").isDirectory()
console.log(stats);

// create new directory
// fs.mkdirSync("New Directory");
// fs.mkdirSync("Another Directory/a/b/", {recursive: true});
fs.mkdirSync("One More/new.txt", {recursive: true});