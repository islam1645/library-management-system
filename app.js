const { response } = require('express');
var express = require('express');
var path = require('path');
const {body} =require('express-validator');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// render book to index page
app.get('/',(req,response)=>{
  fs.readFile(__dirname +'/user.txt',(err,data)=>{
    let d = JSON.parse(data.toString());
    response.render("index", {
      books: d
    });
  })
});
// render all pgaes
app.get('/user',(req,res)=>{
  
  res.render("user");
});
app.get("/registration", (req, res) => {
  res.render("registration");
});
app.get("/login", (req, res) => {
  res.render("login");
});
// add book to txt
app.post('/add',(req,response)=>{
  console.log(req.body)
  fs.readFile(__dirname + '/user.txt',(err,data)=>{
    let txt = JSON.parse(data);
    txt.push(req.body)
    fs.writeFile(__dirname + "/user.txt", JSON.stringify(txt),()=>{
      console.log('sucess');
      // alert('successfully');
    }); 
  })
});
// add users to tx
app.post("/register", (req, response) => {
  console.log(req.body);
  fs.readFile(__dirname + '/users.txt', (err, data) => {
    let users = JSON.parse(data);
    users.push(req.body);
    fs.writeFile(__dirname + "/users.txt", JSON.stringify(users), () => {
      console.log("sucess");
      
    });
  });
});
app.post('/register',
body('password').isLength({min:5}),
body('[re-password]').custom((value,{req})=>{
  if (value !== req.body.password){
    throw new Error('password does not match');
  }
  return true;

}),
(req, res)=>{

},

);







let http = require('http');
const fs = require('fs');
const { dirname } = require('path');

app.listen(3030);