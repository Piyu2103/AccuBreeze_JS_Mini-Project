const path=require('path')
const express=require('express')
const hbs=require('hbs')
const { PassThrough } = require('stream')
const geocode=require('./utils/geocode')
const forecast = require('./utils/forecast')

const app=express()
const port=process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//Setup handle bars for Express 
//Trying
app.set('view engine', '.hbs');
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup Static Directory
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'AccuBreeze',
        name:'Piyush Singhal'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About",
        name:'Piyush Singhal'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Piyush Singhal'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    const jaddress=(req.query.address) 
    geocode(jaddress, (error, response={}) => {
        if (error) { return res.send({error}) }
        //console.log(response)
        forecast(response.Latitude, response.Longitude, (error, data) => {
            if (error) { return res.send({error}) }
            res.send({
                Location:response.Location,
                forecast:data
            })
        })
    })
})

app.listen(port,()=>{
    console.log("Server is up on port "+port)
})

app.get('/help/*',(req,res)=>{
    res.render('404page',{
        name:'Piyush Singhal',
        error:'Help article not found!'
    })
})

app.get('/*',(req,res)=>{
    res.render('404page',{
        title:'ERROR 404',
        name:'Piyush Singhal',
        error:'Page not found!'
    })
})