const express =require('express')
const cors=require('cors')
const {connect, default: mongoose} =require ('mongoose')
const axios=require('axios')
require('dotenv').config()
const upload=require('express-fileupload')

const userRoutes=require('./routes/userRoutes')
const postRoutes=require('./routes/postsRoutes')
const {notFound ,errorHandler}=require('./middelware/errorMiddelware')

const app=express();
const makeCall=async()=>{
    try {
        const response=await axios.get('http://localhost:8000/api/image/start')
        console.log(response.data)
    } catch (error) {
        console.error('error')
    }
}

app.use(express.json({extended:true}))
app.use(express.urlencoded({extended:true}))
app.use(cors({credentials:true, origin:['https://blog-bytes.vercel.app', 'http://localhost:3000']}))
app.use(upload())
app.use('/uploads',express.static(__dirname+'/uploads'))

app.use('/api/users',userRoutes)
app.use('/api/posts',postRoutes)
app.use(notFound)
app.use(errorHandler)
const url=process.env.MONGO__URI
mongoose.connect(url).then(app.listen(5000,()=>console.log(`server running on port ${process.env.PORT}`))).catch(error=>(console.log(error)))