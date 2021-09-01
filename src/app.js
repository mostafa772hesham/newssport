const express = require('express')
const path = require('path') 
const request = require("request");
const hbs = require("hbs");
const app = express()
const port = process.env.PORT || 3000 

////////////////////////////http request
const newsapi=(language,category)=>{
    const url ="https://newsapi.org/v2/top-headlines?category="+category+"&pageSize=50&language="+language+"&apiKey=18b9cc774c3a473585e49ef6276f31f3"
    request( {url,json:true}, (error,response)=>{
    
        // Internet Connection
        if(error){
            console.log('Error has occurred')
        }
        else if(response.body.status=="error"){
            console.log('please log in')
        }
        else if(response.body.articles.length==0){
            console.log('cant find your artical')
            
        }
   
            response.body.articles.forEach(element => {
                news=      {

                        title:element.title,
                        description:element.description,
                        urlToImage:element.urlToImage
                    }
                });
            
      
    
                
                const partialpatch =path.join(__dirname,"../templates/partials")
                hbs.registerPartials(partialpatch)
                app.set('view engine', 'hbs');
                const viewpath = path.join(__dirname,"../templates/views")
                app.set("views",viewpath)
             app.get("",(req,res)=>{
                    res.render("index",{
                        array:response.body.articles,
                     title:news.title ,
                     description : news.description,
                     urlToImage : news.urlToImage
                    })
                    
                })

                
                app.listen(port,()=>{console.log('Listening on port 3000 .. server is up')})
            })
        }
        newsapi("ar","sports")
        
///////////////////////////////////