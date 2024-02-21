const router =  require("express").Router()
const nodemailer = require('nodemailer');
const userDetail = require('../models/userDetail.model.js')
const globalUser = require('../models/globalUser.model.js')



//-----------------------------Login----Route---------------------------------------------
router.post("/Login", async function (req, res){
  const { email, password } = req.body
  
  try{
     const login = await userDetail.findOne({ email: email, password: password })

     if (!login) {
      
      return res.status(401).json({ error: "Invalid  User" });
    }
    // const isPasswordValid = await bcrypt.compare(password, login.password);
    // if (!isPasswordValid) {
    //   return res.status(401).json({ error: "Invalid Password" });
    // }
    return res.json(login)

   } catch (err) {
      console.error("Error during login:", err);
      return res.status(500).json({ error: "An error occurred during login" });
    }

})

//------------------------------SignUp---Route----------------------------------------------

router.post("/SignUp", async function (req, res) {
  const { image, userName, email, password, phoneNumber } = req.body


  try {
     const userExists =await userDetail.exists({email:email})
     

     if(userExists){
      return res.status(400).json({error:'User already exists'})
     }

     await userDetail.create({ image: image, name: userName, email: email, password: password, phone_number: phoneNumber })
//----------set--User as ------Global--User-----------------------------------------------------------------------------     
     await globalUser.create({image:image,name:userName,email:email})

    return res.status(200).json({message:' Sign Up Successfull'})
  }
  catch (err) {
    return res.status(500).json({error:'Try again Something went Wrong'})
  }


})

//-----------------------Forget---password--Route-----------------------------------------------------------------

router.post("/FargotPassword", async function (req, res) {
  const { email, otp } = req.body


  try {

    const forgetpassword = await userDetail.find({ email: email }).select('password')

    if (forgetpassword.length === 0) {

      return res.send(forgetpassword)
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
      }
    });

    const mailOptions = {
      from: 'choudharyarbaj887@gmail.com',
      to: email,
      subject: 'Forget Password OTP',
      text: `Your OTP  ${otp} /n please do not share it`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    return res.json(forgetpassword)



  }
  catch (err) {
    console.log("cannot find any user", err)
  }


})

//------------------------------------checking--sessionStorage------------------------------------------------
router.post('/sessionCheck', async function(req, res) {
  const { sessionEmail, sessionPassword } = req.body;
  try {
    const sessionCheck = await userDetail.find({ email: sessionEmail, password: sessionPassword });
    
    if (!sessionCheck) {
      
      
      return res.send(false);
    }
    
    
    return res.send(true);
  } catch (err) {
    console.log('error in sessionStorage');
    return res.status(500).send('Internal Server Error');
  }
});


//-------------------------------------Friend---data------------------------------------------------------------

router.post('/Friend', async function (req, res) {
  const {email, password } = req.body

  try {
    const friend = await userDetail.find({ email: email, password: password }).select('friend')


    return res.json(friend)
  } catch (err) {
    console.log(err)
  }
})

//-----------------------------------------Setting-------------------------------------------------------------

router.post('/Setting', async function (req, res) {
  const { email } = req.body

  try {
    const currentValue = await userDetail.find({email:email })
    
    return res.json(currentValue)
  }
  catch (err) {
    console.log('err')
  }
})

//----------------------------------------Setting---Update---------------------------------------------------

router.post('/settingUpdate', async function (req, res) {
  const { email, updateImage, updateName, updatePhone, updatePassword, updateLanguage } = req.body
   
  try {
    const updateValue = await userDetail.findOne({ email: email })
    
    updateValue.name = updateName;
    updateValue.image = updateImage;
    updateValue.phone_number = updatePhone;
    updateValue.password = updatePassword;
    updateValue.language = updateLanguage;

    await updateValue.save();
    
    return res.json(updateValue)
  }
  catch (err) {
    console.log(err)
  }
})




module.exports = router;