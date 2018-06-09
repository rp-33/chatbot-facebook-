global.config = require('./config');
const ai= require('apiai')(global.config.AI.token);

exports.response = function (text){
   console.log(text);
   return text;
}

