import { API_KEY, URL, CURRENT_W, SEVEN_DAY_F } from "./config.js";
import { AJAX } from "./helpers.js";

export const state = {}

const createObj = function(data){
  return {
    current: data.current,
    forecast: data.forecast,
    location: data.location,
  };
}

export const getCurrentWeather = async function (city) {
  try {
    const data = await AJAX(`${URL}${API_KEY}&q=${city}${CURRENT_W}`);
    state = createObj(data);
  } catch (error) {
    console.error(error);
  }
};
