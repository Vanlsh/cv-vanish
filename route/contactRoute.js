const router = require('express').Router();
const nodemailer = require('nodemailer');

router.post('/contact', (req,res) => {
    let data = req.body
    if(data.name.length === 0 || data.email.length || data.message.length){
        return res.json({msg: "please fill all the field"})
    }

        let smtpTransporter = nodemailer.createTransport({
            service: 'Gmail',
            port:465,
            auth:{
                user: 'iparan8000@gmail.com',
                pass:'Iparan_80'
            }
        })

        let mailOption = {
            from: data.email,
            to:'iparan8000@gmail.com',
            subject: `message from ${data.name}`,
            html:`         
            <h3>Informations</h3>
            <ul>
            <li>Name: ${data.name}</li>
            <li>Email: ${data.email}</li>
            </ul>
            <h3>Message</h3>
            <p>${data.message}</p>
            `
        }
        smtpTransporter.sendMail(mailOption, (error) => {
            try{
                if(error) return res.status(400).json({msg:'Please fill all the fields!'})
                res.status(200).json({msg:'Thank you for contacting me!'})
            }catch (error){
                if(error)return res.status(500).json({smg: 'There is server error!'})
            }
        })

})

module.exports=router