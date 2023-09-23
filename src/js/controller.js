import * as model from './model.js'
import landingPageView from "./views/landingPageView.js";


const controlShowWeather = async function(){
    try{
        // load weather data from the model
        await model.getCurrentWeather('Kyiv');

        // Render spinner
        landingPageView.renderSpinner()

        // Loading animation
        landingPageView._renderLoadingAnimation();
    } catch(err){
        console.error(err)
    }
}

const init = function(){
    landingPageView.addHandlerRender(controlShowWeather);
}

init();