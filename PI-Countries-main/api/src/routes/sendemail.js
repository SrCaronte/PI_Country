const { text } = require('body-parser');
const { Router } = require('express');
const nodemailer = require('nodemailer')
const router = Router();
const {NMAILER_PASSWORD} = process.env;

router.post('/',async(req,res)=>{
    const {first_name, email,telephone,message,username,} = req.body

    contentHTML=`
    <h1>User Information</h1> 
    <ul>
        <li>first_name:${first_name}</li>
        <li>Username:${username}<li>
        <li>email:${email}</li>
        <li>telephone:${telephone}</li>
    </ul>
    <p>${message}</p>
    <P>http://localhost:3000/users/6304e70073765faae1e2db7d</P>
    `

    let transporter = nodemailer.createTransport({
        host:'smtp-mail.outlook.com',
        port: 587,  
        secure: false,
        auth:{
            user: 'HAppYTAil5@hotmail.com',
            pass: `${NMAILER_PASSWORD}`

        },
        tls:{
            rejectUnauthorized: false
        }
    })

    let info = await transporter.sendMail({
        from:"'HappyTails'<HAppYTAil5@hotmail.com>",
        to:'crismonothian@gmail.com',
        subject:`Caronte quiere adoptar a copito`,
        html:contentHTML,
        text:`https://github.com/SrCaronte`
    })

    console.log('message sent', info.messageId)
    res.redirect('/success')
})

module.exports = router;