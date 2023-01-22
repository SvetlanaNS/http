import http  from "http";
import fs from "fs";

import { collectRequestData } from "./js/collectRequestData.js";
import { auth, getUserID } from "./js/auth.js";
import { daysToSeconds } from "./js/daysToSeconds.js";
import { parseCookies } from "./js/parseCookies.js";
import { createFile } from "./js/createFile.js";
import { deleteFile } from "./js/deleteFile.js";

const host = 'localhost';
const port = process.env.PORT || 8000;
const path = "./files/";
const expiresDays = 2;

let cookies = {};
let userId = null;



const requestListener = (req, res) => {
  switch (req.url) {
    case "/auth": {
      if (req.method === "POST") {
        collectRequestData(req, (result) => {
          if (result) {
            if (auth(result.username, result.password)) {
              userId = getUserID(result.username, result.password);
              res.writeHead(200, {
                "Set-Cookie": [
                  userId=${getUserID(result.username, result.password)},
                  "authorized=true",
                  MAX_AGE=${daysToSeconds(expiresDays)},
                  "path=/",
                ],

                "Content-Type": text/plain,
              });
              return res.end("Success");
            } else {
              res.writeHead(400, { "Content-Type": "text/html" });
              return res.end("Wrong login or password");
            }
          } else {
            res.writeHead(500, { "Content-Type": "text/html" });
            return res.end("Internal server error");
          }
        });
        break;
      } else {
        res.writeHead(405, { "Content-Type": "text/html" });
        return res.end(
          HTTP method "${req.method}" for ${req.url} not allowed
        );
      }
    }
    case "/get": {
      let list = "";
      try {
        readdirSync(path).forEach((file) => {
          list === "" ? (list += ${file}) : (list += , ${file});
        });
        res.writeHead(200, { "Content-Type": "text/html" });
        return res.end(list);
      } catch (error) {
        res.writeHead(500, { "Content-Type": "text/html" });
        return res.end("Internal server error");
      }
    }
    case "/delete": {
      cookies = parseCookies(req);
      if (Object.entries(cookies).length !== 0) {
        if (cookies.authorized === "true" && +cookies.userId === +userId) {
          collectRequestData(req, (result) => {
            if (result?.filename) {
              deleteFile(./files/${result.filename});
            }
          });
        }
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      return res.end("success");
    }
    case "/post": {
      cookies = parseCookies(req);
      if (Object.entries(cookies).length !== 0) {
        if (cookies.authorized === "true" && +cookies.userId === +userId) {
          collectRequestData(req, (result) => {
            if (result?.content) {
              createFile(result.content);
            }
          });
        }
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      return res.end("File write successfully");
    }
    case "/redirect": {
      if (req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/html" });
        return res.end(
          "The resource is now permanently available at /redirected"
        );
      } else {
        res.writeHead(405, { "Content-Type": "text/html" });
        return res.end(
          HTTP method "${req.method}" for ${req.url} not allowed
        );
      }
    }
    default:
      res.writeHead(405, { "Content-Type": "text/html" });
      return res.end("HTTP method not allowed");
  }
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(Server is running on http://${host}:${port});
});










/*
const http = require('http')
const util= require('util')


const port = process.env.PORT || 8000

const messages=[]

messages.push({
  'name': 'John',
  'message': 'hi'
})


exports.server=http.createServer(function (req, res) {

  if (req.method == 'POST' && req.url == '/tests/filename1.json') {
    
    let message = ''
    req.on('data', function(data, msg) {
      console.log(data.toString('utf-8'))
      message=exports.addMessage(data.toString('utf-8'))
     
    })
    req.on('end', function() {
      console.log('message', util.inspect(message, true, null))
      console.log('messages:', util.inspect(messages, true, null))
  
      res.writeHead(200, {'Content-Type': 'text/plain'})
      
      res.end(message)
  
    })
} else
  if (req.method == 'GET' && req.url == '/tests/filename.json') {
 
    const body = exports.getMessages()
   
    res.writeHead(405, {
      'Content-Length': body.length,
      'Content-Type': 'text/plain'
    })
    res.end(body)

} else {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    
    res.end('Hello World\n')
  
  }

}).listen(port)

console.log('Server running at http://127.0.0.1:%s/', port)


/*
const http = require("http");
const fs = require('fs');

const host = 'localhost';
const port = 8000;
//Теперь определим глобальную функцию-обработчик:
const requestListener = (req, res) => {
   if (req.url === '/get') {
     res.writeHead(200);
     res.end(fs.readdirSync('/tests', { withFileTypes: true })
      );
   }
   else (req.url !== '/get'){ {
      res.writeHead(405);
      res.end('HTTP method not allowed');
  
  
      res.writeHead(500);
      res.end('Internal server error');
      }}

   res.writeHead(404);
   res.end('not found');
   };



*/