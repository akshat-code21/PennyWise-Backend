const express = require("express");
const { Router } = require("express");
const expenseRouter = Router();
expenseRouter.get('/',(req,res)=>{
    res.json({
        message : "he"
    })
})
module.exports = {
    expenseRouter : expenseRouter
}