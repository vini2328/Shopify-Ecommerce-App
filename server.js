import express from 'express'
import colors from'colors' 
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import categoryRoutes from './routes/categoryRoutes.js'
import authRoute from './routes/authRoute.js'
import productRoutes from './routes/productRoutes.js'
import cors from 'cors'
import path from 'path'


dotenv.config()

connectDB()
const app= express()

// middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname,'./client/build')))

// routes

app.use("/api/v1/auth",authRoute)
app.use("/api/v1/category",categoryRoutes)
app.use("/api/v1/product",productRoutes)



app.use("*",function(req,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"))
})
const PORT =process.env.PORT || 8080

app.listen(PORT, ()=>{
    console.log(`Server listening at ${PORT}`.bgCyan.white)
})


