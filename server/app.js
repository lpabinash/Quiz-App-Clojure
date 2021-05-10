
const express = require('express');
// const logger = require('morgan');
const cors = require('cors');
var fs = require('fs');

const app = express();

//use cors to allow cross origin resource sharing
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let books = [];
let fileName="";

// app.get('/', function(req, res) {
//   console.log('Inside Home Login');
//   res.writeHead(200, {
//     'Content-Type': 'application/json',
//   });
//   console.log('Books : ', JSON.stringify(books));
//   res.end(JSON.stringify(books));
// });

app.post('/create', function(req, res) {

  // books.push(req.body);
  // console.log(...req.body);
  const artists = req.body.reduce(
    (obj, item) => {
      obj[item.prompt] = item.answer;
      return obj;
      // console.log(obj)
    },
    {});
  fs.writeFile(`${fileName[0]}.JSON`, JSON.stringify(artists), function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
  
})
app.post('/filename', function(req, res) {

  // books.push(req.body);
 fileName=(Object.keys(req.body));
//  console.log(fileName[0])

//     console.log('Saved!');
//   // });
  
})
// console.log(books)

//start your server on port 3001
app.listen(3010, () => {
  console.log('Server Listening on port 3010');
});