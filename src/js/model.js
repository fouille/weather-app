import { API_KEY, URL, CURRENT_W, SEVEN_DAY_F } from "./config.js";
import { AJAX } from "./helpers.js";

export const state = {};

const createObj = function (data) {
  return {
    current: data.current,
    forecast: data.forecast,
    location: data.location,
  };
};

export const getCurrentWeather = async function (city) {
  try {
    const data = await AJAX(`${URL}${API_KEY}&q=${city}${CURRENT_W}`);

    // create new object, so I don't reassign a const variable (state)
    const newState = createObj(data);

    // Modify state properties instead of reassigning the whole state
    Object.keys(newState).forEach((key) => {
      state[key] = newState[key];
    });

    state.cityImg = getWeatherImage();
  } catch (error) {
    console.error(error);
  }
};

export const getWeatherImage = function () {
  const day = state.current.is_day;
  const condition = state.current.condition.text;
  // clear sun
  if (condition === "Sunny") return "sunny";
  // clear moon
  if (condition === "Clear") return "clear";
  // cloud
  if (
    condition === "Cloudy" ||
    condition === "Overcast" ||
    condition === "Mist" ||
    condition.toLowerCase().includes("fog")
  )
    return "cloud";

  // Sun/moon with clouds and rain
  if (
    (condition.toLowerCase().includes("patchy") ||
      condition.toLowerCase().includes("light")) &&
    condition.toLowerCase().includes("rain")
  ) {
    if (day) return "rainyCloudySun";
    return "rainyCloudyMoon";
  }

  // cloud with snow and rain
  if (
    condition.toLowerCase().includes("freezing") &&
    condition.toLowerCase().includes("rain")
  )
    return "snowyRainyCloud";

  // cloud with rain
  if (
    condition.toLowerCase().includes("drizzle") ||
    condition.toLowerCase().includes("rain")
  )
    return "rainyCloud";

  if (condition === "Partly cloudy" && day)
    // clouds with sun or moon
    return "cloudySun";
  if (condition === "Partly cloudy") return "cloudyMoon";
};
