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
  const isWindy = state.current.wind_mph > 20;
  console.log(isWindy);
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

  // for sun/moon with a certain condition
  if (
    condition.toLowerCase().includes("patchy") ||
    condition.toLowerCase().includes("light")
  ) {
    if (day) {
      // thunder
      if (condition.includes("thunder")) {
        if (condition.includes("rain")) return "lightningRainyCloudySun";
        if (condition.includes("snow")) return "lightningSnowyCloud";
      }
      // sun with rain
      if (
        condition.includes("rain") ||
        condition.toLowerCase().includes("drizzle")
      )
        return "rainyCloudySun";

      // cloud with snow and rain
      if (condition.includes("sleet")) return "snowyRainyCloud";
    }
    if (!day) {
      // thunder
      if (condition.includes("thunder")) {
        if (condition.includes("rain")) return "lightningRainyCloud";
        if (condition.includes("snow")) return "lightningSnowyCloud";
      }
      // moon with rain
      if (
        condition.includes("rain") ||
        condition.toLowerCase().includes("drizzle")
      )
        return "rainyCloudyMoon";

      // moon with snow
      if (condition.includes("snow")) return "snowyCloudyMoon";

      // moon with snow and rain
      if (condition.includes("sleet")) return "snowyRainyMoon";
    }
  }
  // for all thund
  if (condition.toLowerCase().includes("thunder")) {
    if (condition.includes("rain")) return "lightningRainyCloud";
    if (condition.includes("snow")) return "lightningSnowyCloud";
    return "lightningCloud";
  }

  //for all showers
  if (condition.includes("shower")) {
    if (condition.includes("rain")) return "rainyCloud";
    if (condition.includes("snow") || condition.includes("ice"))
      return "snowyCloud";
    if (condition.includes("sleet")) return "snowyRainyCloud";
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

  // clouds with sun or moon
  if (condition === "Partly cloudy") {
    if (day) return "cloudySun";
    return "cloudyMoon";
  }
  // sun with snow
  if (condition.includes("snow") || condition.includes("Blizzard"))
    return "snowyCloud";

  // cloud with snow and rain
  if (condition.includes("sleet")) return "snowyRainyCloud";
};
