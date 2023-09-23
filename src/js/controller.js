import * as model from './model.js'


const controlShowWeather = async function(){
    try{
        // load weather data from the model
        await model.getCurrentWeather('Kyiv');
    } catch(err){
        console.error(err)
    }
}

const init = function(){
    controlShowWeather();
}

init();