var express = require('express');
var router = express.Router();
var request = require('request');
var AI = require('./AI.js');

global.config = require('./config');

router.get('/',(req,res,next)=>{
    res.send('bienvenidos al chatbot')
})

router.get('/webhook',(req,res,next)=>{

    if(req.query['hub.verify_token'] === global.config.secret.webhook){
        res.send(req.query['hub.challenge']);
 
    }else{
        res.send('tu no puedes entrar aqui');
    }

})

router.post('/webhook',(req,res,next)=>{
    let data = req.body;

    if(data.object == 'page'){
        data.entry.forEach(pageEntry => {
            pageEntry.messaging.forEach(messageEvent =>{
                let message = messageEvent.message.text;
                let id = messageEvent.sender.id;

                request({
                    uri: 'https://graph.facebook.com/v2.6/me/messages',
                    qs:{access_token : global.config.secret.token},
                    method :'POST',
                    json : {
                        recipient: {id: id},
                        message: {text: AI.response(message)}
                    }
                },
                function (err,response,data){
                    if(err){
                        console.log('error al enviar mensaje')
                    }else{
                        console.log('enviado con exito')
                    }
                })
            })
        });
        
        res.sendStatus(200);
    }
})



module.exports = router;
