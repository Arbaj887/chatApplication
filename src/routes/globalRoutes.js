const router =  require("express").Router()
const globalUser = require('../models/globalUser.model')

router.get('/Global',async function(req,res){

    try{

   const users = await globalUser.find({}).limit(20)
   
   return res.json(users)
    }
    catch(err){
        console.log(err)
    }
})

module.exports = router