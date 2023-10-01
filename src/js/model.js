import {
  API_KEY,
  URL,
  CURRENT_W,
  SEVEN_DAY_F,
  HOURLY_LENGTH,
  WINDY_LEVEL,
} from "./config.js";
import { AJAX } from "./helpers.js";

export const state = {
  weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
};

const createObj = function (data) {
  return {
    current: data.current,
    forecast: data.forecast,
    location: data.location,
  };
};

export const getLocation = async function () {
  if (navigator.geolocation) {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { longitude, latitude } = position.coords;
      const data = await AJAX(
        `https://geocode.xyz/${latitude},${longitude}?geoit=json`
      );
      if (data.city.includes("Throttled")) return "Zhytomyr";
      return data.city;
    } catch (error) {
      console.error("Error getting location:", error);
      throw error; // Optionally rethrow the error for handling at a higher level.
    }
  } else {
    return "Zhytomyr";
    // You can also throw an error here if needed.
  }
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

    // get the appropriate image to a corresponding weather condition
    state.cityImg = getWeatherImage(
      state.current.condition.text,
      state.current.wind_mph > WINDY_LEVEL,
      state.current.is_day
    );

    // get hours according to current time
    state.hourly = getHours();

    // get image for each hour
    state.hourly.forEach((hour) => {
      hour.img = getWeatherImage(
        hour.condition.text,
        hour.wind_mph > WINDY_LEVEL,
        hour.is_day
      );
    });

    // get image for each day
    state.forecast.forecastday.forEach((day) => {
      const dominantCondition = getPredominantWeather(day);
      day.dominantCondition = shortWeatherDescription(dominantCondition);
      day.highestWind = getHighestWind(day);

      day.img = getWeatherImage(
        dominantCondition,
        day.highestWind > WINDY_LEVEL,
        true
      );
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// get the highest wind value of the day
const getHighestWind = function (day) {
  let count = -Infinity;
  for (const hour of day.hour) {
    const wind = hour.wind_mph;
    if (count < wind) count = wind;
  }
  return count;
};

// get a short description which will fit the container in 1 line
const shortWeatherDescription = function (condition) {
  if (condition.includes("Patchy") && condition.includes("rain"))
    return "Patchy rain";
  if (condition.includes("Patchy") && condition.includes("snow"))
    return "Patchy snow";
  if (condition.includes("Patchy") && condition.includes("sleet"))
    return "Patchy sleet";
  if (condition.toLowerCase().includes("thunder")) return "Thunder";
  if (condition.includes("shower") && condition.includes("rain"))
    return "Rain showers";
  if (condition.includes("rain")) return "Rainy";
  if (condition.includes("snow")) return "Snowy";
  if (condition.includes("drizzle")) return "Drizzle";
  if (condition.includes("sleet")) return "Sleet";
  if (condition.includes("pellets")) return "Ice pellets";
  return condition;
};

// get appropriate condition that describes the day
const getPredominantWeather = function (day) {
  const condCounts = {};
  // Iterate through the array
  for (const item of day.hour) {
    const condition = item.condition.text;
    if (condition === "Clear") continue;
    if (condCounts[condition]) {
      // If it is, increment the count
      condCounts[condition]++;
    } else {
      // If it's not, add it to the object with a count of 1
      condCounts[condition] = 1;
    }
  }
  const sortedArr = Object.entries(condCounts);
  sortedArr.sort((a, b) => b[1] - a[1]);
  return sortedArr[0][0];
};

// Get 6 hours (every 3 hours)
const getHours = function () {
  console.log(state);
  const firstDayArr = state.forecast.forecastday[0].hour;
  const secondDayArr = state.forecast.forecastday[1].hour;
  const curHour = new Date().getHours();

  const newArr = [];

  // every 3 hours
  for (let i = 0; i < HOURLY_LENGTH * 3; i += 3) {
    if (curHour + i > 23) {
      newArr.push(secondDayArr[curHour + i - secondDayArr.length]);
      continue;
    }
    newArr.push(firstDayArr[curHour + i]);
  }
  return newArr;
};

const getWeatherImage = function (condition, isWindy, isDay) {
  // clear sun
  if (condition === "Sunny") {
    if (isWindy) return "windySun";
    return "sunny";
  }
  // clear moon
  if (condition === "Clear") {
    if (isWindy) return "windyMoon";
    return "clear";
  }
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
    if (isDay) {
      // thunder
      if (condition.includes("thunder")) {
        if (condition.includes("rain")) return "lightningRainyCloudySun";
        if (condition.includes("snow")) return "lightningSnowyCloud";
      }
      // sun with rain
      if (
        condition.includes("rain") ||
        condition.toLowerCase().includes("drizzle")
      ) {
        if (isWindy) return "rainyWindyCloudySun";
        return "rainyCloudySun";
      }
      // cloud with snow and rain
      if (condition.includes("sleet")) return "snowyRainyCloud";
    }
    if (!isDay) {
      // thunder
      if (condition.includes("thunder")) {
        if (condition.includes("rain")) return "lightningRainyCloud";
        if (condition.includes("snow")) {
          if (isWindy) return "lightningSnowyWindyCloud";
          return "lightningSnowyCloud";
        }
      }
      // moon with rain
      if (
        condition.includes("rain") ||
        condition.toLowerCase().includes("drizzle")
      ) {
        if (isWindy) return "rainyWindyCloudyMoon";
        return "rainyCloudyMoon";
      }

      // moon with snow
      if (condition.includes("snow")) return "snowyCloudyMoon";

      // moon with snow and rain
      if (condition.includes("sleet")) return "snowyRainyMoon";
    }
  }
  // for all thunders
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
  ) {
    if (isWindy) return "rainyWindyCloud";
    return "rainyCloud";
  }

  // clouds with sun or moon
  if (condition === "Partly cloudy") {
    if (isDay) {
      if (isWindy) return "windyCloudySun";
      return "cloudySun";
    }
    if (isWindy) return "windyCloudyMoon";
    return "cloudyMoon";
  }
  // sun with snow
  if (condition.includes("snow") || condition.includes("Blizzard"))
    return "snowyCloud";

  // cloud with snow and rain
  if (condition.includes("sleet")) return "snowyRainyCloud";
};


