//imports
const express=require('express');
const bodyparser=require('body-parser');

//initializations
var app=express();
const route=require(__dirname+'/routes/route.js');
const port=process.env.PORT||8080;

//middleware
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(express.static(__dirname));

//file rendering routes
app.get("/",(req,res)=>{
   res.sendFile(__dirname+"/public/home.html");
});

app.get('/home.html',(req,res)=>{
   res.sendFile(__dirname+"/public/home.html");
});

app.get('/insert.html',(req,res)=>{
   res.sendFile(__dirname+"/public/insert.html");
});

app.get('/view.html',(req,res)=>{
   res.sendFile(__dirname+"/public/view.html");
});

app.get('/update.html',(req,res)=>{
   res.sendFile(__dirname+"/public/update.html");
});

app.get('/delete.html',(req,res)=>{
   res.sendFile(__dirname+"/public/delete.html");
});

//CRUD routes middleware
app.use('/api',route);

//server
app.listen(port,()=>{
   console.log("Server running at url http://localhost:"+port);
});