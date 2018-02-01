"use strict";

// PORT definition
const PORT = 3000;

// Import the HTTP library
const http = require('http');

// Import the fs library 
const fs = require('fs');

const cache = {};
cache['openhouse.html'] = fs.readFileSync('public/openhouse.html')
cache['openhouse.css'] = fs.readFileSync('public/openhouse.css')
cache['openhouse.js'] = fs.readFileSync('public/openhouse.js')

/** @function serveIndex
* Serves the file content of the root directory
* @param {string} path - specifies the folder path to list the files
* @param {serverResponse} res - the http response object
*/

function serveIndex(path,res){
    fs.readdir(path,(err,files)=>{
        if(err) {
            console.error(err)
            res.statusCode = 500
            res.end("Server Error")
        }
        var html = "<p>Index of "+ path + "</p>"
        html += "<ul>"
        html += files.map((item) => {
            return "<li><a href='" + item + "'>" + item + "</a></li>"
        }).join("")
        html += "</ul>"
        res.end(html)
    })
}

/** @function serverFile 
 * Serves the specified file with the provided response object
 * @param {string} path - specifies the file paht to read
 * @param {serverResponse} res - the http response object
 */

function serveFile(path,res){
    fs.readFile(path,(err,data) => {
        if(err){
            console.error(data)
            res.statusCode = 500
            res.end("Server Error: Could not read file")
            return
        }
        res.end(data)
            })
}

/** @function handleRequest
 * Request handler for our http server
 * @param {http.ClientRequest} req - the http request object 
 * @param {http.ClientResponse} res - the http response object
 */

function handleRequest(req, res) {
    //Map request urls     
    switch(req.url) {
        case '/':
            serveIndex('public',res)
            break
        case '/openhouse.html':
            serveFile('public/openhouse.html',res)
            break;
        case '/openhouse.css':
            serveFile('public/openhouse.css',res)
            break;
        case '/openhouse.js':
            serveFile('public/openhouse.js',res)
            break;
        default:
            res.statusCode = 404;
            res.end("File Not Found");
    }

}

// Create the web server
var server = http.createServer(handleRequest);

// Start listening on port PORT
server.listen(PORT, function(){
    console.log("Listening on port " + PORT);
});
