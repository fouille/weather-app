import * as model from './model.js'
import landingPageView from './views/LandingPageView.js';
import sevenDayView from './views/sevenDayView.js';
import hourlyView from './views/hourlyView.js';
import detailsView from './views/detailsView.js';
import cityView from './views/cityView.js';



const controlShowWeather = async function(){
    try{
        const city = await model.getLocation();
        if(!city) city = "Zhytomyr";
        // load weather data from the model
        await model.getCurrentWeather("Fort Myers");

        // Render loading animation
        sevenDayView.renderLoading();
        hourlyView.renderLoading();
        detailsView.renderLoading();
        cityView.renderSpinner();

        // Render Data for each element
        sevenDayView.render(model.state);
        hourlyView.render(model.state);
        detailsView.render(model.state);
        cityView.render(model.state);

        // Insert city data
        cityView.insertCity();

        // Insert hourly data
        hourlyView.insertHourly();
        
        // Insert details data
        detailsView.insertDetails();

        // Insert seven day forecast data
        sevenDayView.insertDays()
    } catch(err){
        console.error(err)
    }
}

const init = function(){
    landingPageView.addHandlerRender(controlShowWeather);
}

init();