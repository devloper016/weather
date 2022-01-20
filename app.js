const express = require("express");
const https = require("https");


const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
    
});

app.post("/",function(req,res){
    const query = req.body.CityName;
    const apiKey = "85a4aee9fe8a92f2db8719e89f507d5c"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+ "&units=metric"
    
    https.get(url,function(response){
        console.log(response.statusCode);
    
        response.on("data",function(data){
           const weather = JSON.parse(data);
           const temp = weather.main.feels_like;
           const description = weather.weather[0].description;
    
           const icon = weather.weather[0].icon;
           const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
           res.write("<p> The weather is "+ description );
           res.write("<h1>The temprature in "+query+ " is " + temp + " degree Celcius</h1>");
           res.write("<img src="+imageURL+">"); 
           res.send();
        });
    });
})


app.listen(8080,function(){
    console.log("server is running");
});