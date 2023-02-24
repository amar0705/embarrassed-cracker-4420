const express = require("express")
const {ProductModel} = require("../models/product.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const productRouter = express.Router()

productRouter.get("/", async(req,res)=>{
    try{
        const notes = await ProductModel.find()
        res.send(notes)
    }
    catch(err){
        console.log(err)
        console.log({"message":"Something went wrong"})
    }
})


module.exports = {productRouter}