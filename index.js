const express=require('express')
const MovieModel=require('./Model/movieModel')
const app=express();

app.use(express.json());

app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs')

app.get('/form',(req,res)=>{

    res.render("index");

})


app.post('/form',(req,res)=>{
    const movie= new MovieModel({
        Movie_name:req.body.moviename ,
        Movie_desc:req.body.moviedesc,
        Movie_image_url:req.body.imageurl,
        Movie_download_url:req.body.moviedownloadurl 
    })
 
    movie.save().then((data)=>{

        res.send("movie is submitted in data base")

    }).catch(()=>{
        res.send("error in submitted pls try again");
    })
})
 
    


app.get('/moviesdata',(req,res)=>{

    MovieModel.find({}).then((data)=>{
        res.status(200).json(data)
    })
})
const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log('server is running on 3000')
})