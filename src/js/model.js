import { API_KEY, URL, CURRENT_W, SEVEN_DAY_F } from "./config.js";
import { AJAX } from "./helpers.js";

export const getCurrentWeather = async function (city) {
  try {
    const data = await AJAX(`${URL}${API_KEY}&q=${city}${CURRENT_W}`);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
