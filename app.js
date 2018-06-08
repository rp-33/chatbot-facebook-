var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();
app.use(bodyParser.json());
const token = 'EAAikGgWVb30BAL6ZCxJL2LSFBxAgr0BQGctoEHsF2A0aw7KdrUAw9OUCpXx2gwXanaCmM1oPJS3UQkGbeqnuQjLKHt5m9g9i1QrwVivbWzpj2zitZC5NBN43uWBlfY2p6rPCZChcCgWXEJBahc9qLBtraJUQaCa2DQoZAkkAiwZDZD';


app.get('/',(req,res,next)=>{
    res.send('bienvenidos al chatbot')
})

app.get('/webhook',(req,res,next)=>{

    if(req.query['hub.verify_token'] === "verify_token_4playnew"){
        res.send(req.query['hub.challenge']);
 
    }else{
        res.send('tu no puedes entrar aqui');
    }

})

app.post('/webhook',(req,res,next)=>{
    let data = req.body;

    if(data.object == 'page'){
        data.entry.forEach(pageEntry => {
            pageEntry.messaging.forEach(messageEvent =>{
                let message = messageEvent.message.text;
                let id = messageEvent.sender.id;
                console.log(id);
                console.log(message);
                /*respuesta*/
                let messageSend ={
                    recipient :{
                        id: id
                    },
                    message :{
                        text : "ya le respondo"
                    }
                };
                request({
                    uri: 'https://graph.facebook.com/v2.6/me/messages',
                    qs:{access_token : token},
                    method :'POST',
                    json : messageSend
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

app.listen(3000,()=>{
    console.log('environment 3000')
})