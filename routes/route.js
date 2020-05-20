const express=require('express');
const router=express.Router()
var vcapServices = require('vcap_services');
var MongoClient = require('mongodb').MongoClient;  
let url;   
var credentials = vcapServices.getCredentials('mlab');   
url=credentials.uri;
if (url==null)  {
   url="mongodb://mongo:27017/mynewdb";     
} 
      
//connect to mongodb database server
MongoClient.connect(url,(err,client)=>{
    if(err)
    {
       router.use('',(req,res)=>{
           res.send("Unable to connect to database. Try again later");
       }); 
    }
    else
    {  console.log("connected to database")
       //enter database mydb  
       const db=client.db('mynewdb'); 
        
       //CRUD routes
       router.post('/insert',(req,res)=>{
          var id=req.body.id;

          db.collection('insurance').find({"id":id}).toArray((err,detail)=>{
              if(err)
              res.send("Error in database access");
              else
              {
                if(detail.length==1)
                res.send("cannot insert as record with this id already exists");
                else
                {
                   var name=req.body.name;
                   var contact=req.body.contact;
                   var l=req.body.list;
                   var list=[];           
          
                   l.forEach(element => {
                        list.push({"type":element.type,"comp":element.comp,"term":element.term});
                   });

                   db.collection('insurance').insertOne({"id":id,"name":name,"contact":contact,"list":list},(error,result)=>{
                       if(error)
                       res.send("Could not insert record! Error in database access");
                       else
                       res.send("Successfully inserted record");
                   });
                }
              }
          });
       });
       router.get('/view',(req,res)=>{
        var id=req.query.id;
        var name=req.query.name;
        if(typeof(id)=='undefined'&&typeof(name)=='undefined')
        {
           db.collection('insurance').find({},{ projection:{"_id":0} }).toArray((error,result)=>{
               if(error)
               res.send(error);
               else
               res.send(JSON.stringify(result));
           });
        }
        else if(typeof(name)=='undefined')
        {
           db.collection('insurance').find({"id":id},{ projection:{"_id":0} }).toArray((error,result)=>{
               if(error)
               res.send(error);
               else
               {
                 if(result.length==0)
                 res.send("Record with this id does not exist");
                 else 
                 res.send(JSON.stringify(result));
               }
           });
        }
        else
        {
           db.collection('insurance').find({"name":name},{ projection:{"_id":0} }).toArray((error,result)=>{
               if(error)
               res.send(error);
               else
               {
                 if(result.length==0)
                 res.send("No records with this name is present!");
                 else 
                 res.send(JSON.stringify(result));
               }
           });  
        }
    });
    router.put('/update',(req,res)=>{
        var id=req.body.id;
        var name=req.body.name;
        var contact=req.body.contact;
        var l=req.body.list;
        var list=[];           

        l.forEach(element => {
           list.push({"type":element.type,"comp":element.comp,"term":element.term});
        });

        db.collection('insurance').updateOne({"id":id},{$set:{"name":name,"contact":contact,"list":list}},(error,result)=>{
          if(error)
          res.send("Could not update record! Error in database access");
          else
          res.send("Successfully updated record");
        });
   });
   router.delete('/delete',(req,res)=>{
    var id=req.query.id;
    db.collection('insurance').find({"id":id}).toArray((err,detail)=>{
       if(err)
       res.send("Error in database access");
       else
       {
         if(detail.length==1)
         {
            db.collection('insurance').deleteOne({"id":id},(error,success)=>{
                 if(error)
                 res.send("Error during deletion! Could not delete!");
                 else
                 res.send("Record successfully deleted!");   
            }); 
         }
         else
         res.send("Record with this id does not exist! Cannot delete!");
       }
    });
 });

    }       
});

module.exports=router;
