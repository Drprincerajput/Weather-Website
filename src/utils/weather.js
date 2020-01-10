const request = require('request')

const weather = (latitude, longtitude, callback) => {
    const url = 'https://api.darksky.net/forecast/614f60194fb82b693342961dc0331437/'+latitude+','+longtitude

    request({url, json: true}, (error, {body})=>{
            if(error){
                callback('connection error', undefined)
            }else if(body.error){
                callback('not find', undefined)
            }
            else{
                let temp = body.currently.temperature
                let chance = body.currently.precipProbability
                callback(undefined, 'It is currently ' + temp + ' degrees out.There is a ' + chance + ' % chance of rain')
            }
        }

    )

}
module.exports = weather
