const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./Utils/forecast');

const app = express() ;

const PORT = process.env.PORT || 3000  ;
const STATIC_DIR = path.join(__dirname,"../public") ;
const HANDLEBARS_VIEWS_DIR = path.join(__dirname,"../public/templates/views") ;
const PARITALS_DIR = path.join(__dirname,"../public/templates/partials") ;



// default engine for handlebars
app.set('view engine','hbs');

// handlebars path
// ('views',path)
app.set('views',HANDLEBARS_VIEWS_DIR);



/** partials are like block-endblock in django-jinja  
 * they are used to write navbar , header or footer type of things once
 * and use anywhere
*/
hbs.registerPartials(PARITALS_DIR);



// app.use(express.static(TEMPLATE_DIR)) ;
// static files can't be served as handle bars , so they should be served like this only
app.use(express.static(STATIC_DIR)) ;



// app.get(<url:String>,callBack(request,response)=>{ do what to do when the url get request is recieved })
app.get('',(req,res)=>{

   // sending Response based on the request
   // res.send(`Hello Express <br>
   // <a href=\"../help\">Help</a>  <br>
   // <a href=\"../about\">About</a>  <br>
   // <a href=\"../weather\">Weather</a>  <br>
   // `);

   // to use with handlebars
   // render ("name of handlebar template","json data to show inside the file")
   res.render('weather',{
      title:"Weather",
      name:"Weather",
   })

});


app.get('/help',(req,res)=>{
   res.render('help',{
      title:'Help',
   })
}) ;

// after ip:port/help/anything
app.get('/help/*',(req,res)=>{
   res.render("404",{
      title:"Error 404",
   });
});

app.get('/json',(req,res)=>{

   /** express automatically detects that an object has been passed , 
    * It automatically stringify the object and send it .
   */
   res.send([
      {name:'Soham Saha' ,
      date_of_Creation : '16th July 2022',},
      {name:'Pranab Saha' ,
      date_of_Creation : '16th July 2022',},
      {name:'Anutirtha Saha' ,
      date_of_Creation : '16th July 2022',},
   ]);
}) ;

app.get('/about',(req,res)=>{
   res.render("about",{
      title:"About",
      manishka_image:"../static/assets/Manishka8.jfif",
   });
}) ;

// query
app.get('/product',(req,res)=>{

   // similar to django request.GET
   console.log(req.query);

   res.send({
      status: !!req.query.search ,
   })
})

app.get('/weather',(req,res)=>{

   let data = {
      error : "Please enter a place name",
      temperature : null ,
      feelslike:null,
      place:null,
      weatherPhoto:null,
   }

   if(!!req.query.address){
      forecast(req.query.address,(error,_data)=>{
         if(error == null) return res.send(_data) ;
         data.error = error ;
         return res.send(data);
      })
   }
   else return res.send(data);
   
}) ;


/** everything there in the link is a match
 * after ip:port/anything.
 * should be at the last to make sure that if none of the link is matched only then this is executed .
 */
app.get('*',(req,res)=>{
   // res.send("Error 404 , Page not Found");
   res.redirect('/') ;
});

// this starts the server .
// listen(port,ip:String,callback)
app.listen(PORT,'192.168.42.72',()=>{
   // clears the terminal everytime the app.js is executed by nodemon , thereby keeping the terminal clean and tidy.
   console.clear();
   console.log("Server Started at : http://192.168.42.72:3000") ;

   console.log(__dirname);
   console.log(__filename);
   console.log(path.join(__dirname,'../public'));
   console.log(PARITALS_DIR) ;
})

