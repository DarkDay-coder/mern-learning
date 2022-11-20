/**
 * Streams Types
 *    ReadableStream => Streams from which we can read or consume data.
 *                      HTTP request and fs read stream are example.
 *                         data and end event are important events.
 *                         pipe() and read() are important functions
 *    WritableStream => Streams to which we can write data.
 *                      HTTP response and fs write stream are example.
 *                      drain() and finish() are important events.
 *                      write() and end() are important functions.
 *    DuplexStream   => Stream that are both readable and writable.
 *                      netwebsocket is an example.
 *
 *    TransfomrStream => duplexstream that transforms data as it is written or read.
 */

const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
   // fs.readFile('test-file.txt', 'utf8', (err, data) => {
   //    if (err) console.log(err);
   //    res.end(data);
   // });
   const readable = fs.createReadStream('test-file.txt');
   readable.on('data', (chunk) => {
      res.write(chunk);
   })
   readable.on('end', () => {
      res.end();
   });

});

server.listen(8000, 'localhost', () => {
   console.log('listening on localhost:8000');
});
