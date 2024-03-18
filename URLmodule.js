import url from "url";

const myURL = new URL('https://google.com');
myURL.pathname = '/a/b/c';
myURL.search = '?d=e';
myURL.hash = '#home';
myURL.port = 6000;

console.log(myURL);
console.log(myURL.port);
console.log(myURL.href);
