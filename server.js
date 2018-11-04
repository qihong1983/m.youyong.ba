const express = require('express');

const next = require('next');
const {
  join
} = require('path');
const {
  parse
} = require('url');
const dev = process.env.NODE_ENV !== 'production';
const app = next({
  dev
});
const handle = app.getRequestHandler();


app.prepare()
  .then(() => {
    const server = express();

    server.set('cache', false);
    server.get('*', (req, res) => {

      const parsedUrl = parse(req.url, true);

      const {
        pathname
      } = parsedUrl;

      console.log(pathname, '#############');
      res.setHeader('Last-Modified', (new Date()).toUTCString());
      // if (pathname === '/service-worker.js') {
      //   const filePath = join(__dirname, '.next', pathname)

      //   app.serveStatic(req, res, filePath)
      // } else {
      //   handle(req, res, parsedUrl)
      // }


      return handle(req, res);
    });
    server.listen(8087, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:8087');
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });


// server.js
// const {
//   createServer
// } = require('http')
// const {
//   join
// } = require('path')
// const {
//   parse
// } = require('url')
// const next = require('next')

// const app = next()
// const handle = app.getRequestHandler()

// app.prepare()
//   .then(() => {
//     createServer((req, res) => {

//         const parsedUrl = parse(req.url, true)
//         const {
//           pathname
//         } = parsedUrl

//         if (pathname === '/service-worker.js') {
//           const filePath = join(__dirname, '.next', pathname)

//           app.serveStatic(req, res, filePath)
//         } else {
//           handle(req, res, parsedUrl)
//         }
//         res.setHeader('Last-Modified', (new Date()).toUTCString());
//       })
//       .listen(3000, () => {
//         console.log(`> Ready on http://localhost:${3000}`)
//       })
//   })