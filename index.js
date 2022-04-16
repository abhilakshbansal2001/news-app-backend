const axios = require("axios")
const express = require("express")
const  http = require('http');

const app = express();
  
// http.createServer(function (req, res) {
//     res.writeHead(200, { 'Content-Type': 'text/html' });
  
//     // req.url stores the path in the url
//     var url = req.url;
//     if (url === "/") {
        
//     }
    
  
// })

app.get("/" , (req,res) => {
    // res.send("Potty");
    axios.get(`http://api.mediastack.com/v1/news?access_key=58c8ce96564a31ebb6e07ae5bb0f87fa&limit=20`)
        .then((data) => {
        //   setToday({...data.data});
        // res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.send(data.data.data)
        // console.log(data.data.data);
        })
        .catch((err) => {
        // res.write("something went wrong");
        res.send("Hello fucker" + err)
        })
})

app.get("/news" , (req,res) => {
    axios.get(`https://newsdata.io/api/1/news?apikey=pub_65467390a18e52bd65f9f93a66f79968808e&language=en`)
        .then((data) => {
        //   setToday({...data.data});
        // res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.send(data.data)
        // console.log(data.data.data);
        })
        .catch((err) => {
        // res.write("something went wrong");
        res.send("Hello fucker" + err)
        })
})

app.listen(process.env.PORT || 5000, function () {
    console.log("SERVER STARTED PORT: 5000");
});