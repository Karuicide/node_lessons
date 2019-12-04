
// const http = require("http");
// const fs = require("fs");
// const url = require('url');

// /**
// //  * 
// //  * @param {Object} res - response object 
// //  * @param {String} data - html content
// //  * @param {Number} statusCode - http status code
// //  */

// function sendData(res,data,statusCode=500){
//     res.writeHead(statusCode, {
//         "Content-Type": "text/html"
//     });
//     res.write(data);
//     res.end();

// }

// function senddataToClient(res,fileName = 'index.html',statusCode = 200){
//     fs.readFile(fileName,"utf-8", (err,data) =>{
//         if(err){
//             return res.write(res,"<h1>500</h1>")     
//         }
//         sendData(res,data,statusCode);
//     })
// }

// http.createServer((req,res) => {
//     switch(req.url){
//         case "/page=home":
//             senddataToClient(res);
//         break;
//         case "/page=news":
//             senddataToClient(res,"news.htm");
//         break;
//         case "/page=contact":
//             senddataToClient(res,"contact.html");
//         break;        
//         default:
//             senddataToClient(res,"404.html",404);
//     }
//     console.log(req.url);   
// }).listen(8000);


// // /* erkr
// // http.createServer((req,res) => {
// //     res.writeHead(200, {
// //         "Content-Type": "text/html"
// //     });
// //     res.write("sdsdsd<br>");
// //     res.end("hello");
// // }).listen(8000)
// // */






const http = require('http');
const url = require('url');
const fs = require("fs");

const sendData = (fileName, res) => {
    
    fs.readFile(`${fileName}.html`,"utf-8", (err,data) =>{
        if(err) {
            if(err.code === 'ENOENT'){

            }
        }else{
            res.write(data);
        }

        res.end();
    });
};

http.createServer((req, res) =>{
    res.writeHead(200);

const {query: {page} } = url.parse(req.url, true);

    switch(page){
        case 'home': sendData('index', res); break;
        case 'contact': sendData('contact', res); break;
        case 'news': sendData('news', res); break;
        default: sendData('404', res); break;

    }
}).listen(8080);
