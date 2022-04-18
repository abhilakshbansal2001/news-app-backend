const axios = require("axios")
const express = require("express")
const {API , ACESS} = require("./credential")
const app = express();
app.use(function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });
app.get("/topHeadlines" , (req,res) => {
        // `http://api.mediastack.com/v1/news?access_key=${ACESS}&limit=5`
    axios.get(`https://newsapi.org/v2/top-headlines?country=in&pageSize=5&apiKey=${API}`)
        .then(({data}) => {
                res.send(data.articles)
        })
        .catch((err) => {
                console.log(err)
        res.send(err)
        })
})

app.get("/past" , (req,res) => {
    const {from  , to , size , Countryname} = req.query;
    axios.get(`https://newsapi.org/v2/everything?q=${Countryname}&pageSize=${size}&from=${from}&to=${to}&sortBy=popularity&apiKey=${API}`)
        .then(({data}) => {
                res.send(data.articles)
        })
        .catch((err) => {
        
                console.log(err)
        res.send(err)
        })
})
app.get("/country" , (req,res) => {
    const { country } = req.query;
    axios.get(`https://newsapi.org/v2/top-headlines?country=${country || "in"}&pageSize=5&apiKey=${API}`)
        .then(({data}) => {
                res.send(data.articles)
        })
        .catch((err) => {
        
                console.log(err)
        res.send(err)
        })
})
app.get("/discover" , (req,res) => {
    const { country , lang , category } = req.query;
    axios.get(`http://api.mediastack.com/v1/news?access_key=${ACESS}&limit=20&countries=${country}&languages=${lang.join(",")}&categories=${category.join(",")}`)
        .then(({data}) => {
                // console.log(data)
                res.send(data.data)
        })
        .catch((err) => {
        
                console.log(err)
        res.send(err)
        })
})
app.get("/query" , (req,res) => {
    const { searchQuery , page } = req.query;
    axios.get(`https://newsapi.org/v2/everything?q=${searchQuery.toLowerCase()}&limit=10&page=${page}&sortBy=popularity&apiKey=${API}`)
        .then(({data}) => {
                // console.log(page)
                res.send(data.articles)
        })
        .catch((err) => {
        
                // console.log(err)
        res.send(err)
        })
})
app.get("/source" , (req,res) => {
        const { country , size } = req.query;
        axios.get(`https://newsapi.org/v2/sources?country=${country || "in"}&pageSize=${size}&apiKey=${API}`)
        .then((data) => {
                // console.log(data.data)
                res.send(data.data.sources)
        })
        .catch((err) => {
        
                console.log(err)
        res.send(err)
        })
})

app.listen(process.env.PORT || 5000, function () {
    console.log("SERVER STARTED PORT: 5000");
});