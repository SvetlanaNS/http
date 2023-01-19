const http = require("http");
const fs = require('fs');

const host = 'localhost';
const port = 8000;

const requestListener = (req, res) => {

  res.setHeader("Content-Type", "text/html; charset=utf-8;");

  
  if (req.url === '/get' && req.method === 'GET') {
    res.writeHead(200);
    res.end('success');
    
  

   res.write( fs.readdirSync('/tests', { withFileTypes: true }))
console.log()

    }else {
    res.writeHead(405);
    res.end('HTTP method not allowed');
    }
 

  if (req.url === '/post' && req.method === 'POST') {
    res.writeHead(200);
    res.end('success');
    }else{
    res.writeHead(405);
    res.end('HTTP method not allowed');
    }
 

  if (req.url === '/delete' && req.method === ' DELETE') {
    res.writeHead(200);
    res.end('success');
    }else{
    res.writeHead(405);
    res.end('HTTP method not allowed');
    }

    if (req.url === '/redirect' && req.method === 'GET') {
      response.redirect('/redirected')
      }
 response.statusCode = 404; // адрес не найден
      response.write("Not Found");  
  };



  const server = http.createServer(requestListener);//создаcт сервер

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
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