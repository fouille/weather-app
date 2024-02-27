import {
  API_KEY,
  URL,
  CURRENT_W,
  SEVEN_DAY_F,
  HOURLY_LENGTH,
  WINDY_LEVEL,
  F_D_API_KEY,
  F_D_API_URL,
  CITY_TO_COORDS,
  COORDS_TO_CITY,
  CITIES_PER_PAGE,
  forecast_URL,
} from "./config.js";
import { AJAX } from "./helpers.js";

export const state = {
  weekdays: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
  userSettings: {
    temperature: "celsius",
    windSpeed: "km/h",
    pressure: "mb",
    precipitation: "millimiters",
    distance: "kilometers",
  },
  generalSettings: {
    TFhours: true,
    location: true,
    notifications: false,
  },
  savedCities: {},
  activeCity: "",
  citiesPerPage: CITIES_PER_PAGE,
  page: 1,
};

const createObj = function (data) {
  return {
    current: data.current,
    forecast: data.forecast,
    location: data.location,
  };
};

export const getLocation = async function () {
  if (navigator.geolocation && state.generalSettings.location) {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { longitude, latitude } = position.coords;
      // const data = await AJAX(
      //   `https://geocode.xyz/${latitude},${longitude}?geoit=json`
      // );
      const data = await AJAX(
        `${COORDS_TO_CITY}lat=${latitude}&lon=${longitude}`
      );

      if (!data) return "Saint-hilaire-sous-romilly";
      state.savedCities[data.address.city] = {
        locale: true,
      };
      return data.address.city;
    } catch (error) {
      console.error("Error getting location:", error);

      return "Saint-hilaire-sous-romilly";
    }
  } else {
    return "Saint-hilaire-sous-romilly";
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

    state.activeCity = state.location.name;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getWeatherForSavedCities = async function () {
  try {
    if (Object.keys(state.savedCities).length === 0) return;

    for (const city of Object.keys(state.savedCities)) {
      const data = await AJAX(`${URL}${API_KEY}&q=${city}${CURRENT_W}`);
      state.savedCities[city].current = data.current;
      state.savedCities[city].forecast = data.forecast;
      state.savedCities[city].location = data.location;

      state.savedCities[city].img = getWeatherImage(
        state.savedCities[city].current.condition.text,
        state.savedCities[city].current.wind_mph > WINDY_LEVEL,
        state.savedCities[city].current.is_day
      );
    }
  } catch (err) {
    console.error("error getting cities", err);
    throw err;
  }
};

export const getCitiesPage = function (page = 1) {
  const keys = Object.keys(state.savedCities);
  const start = (page - 1) * state.citiesPerPage;
  const end = page * state.citiesPerPage;
  const citiesOnPage = keys.slice(start, end);
  const citiesData = {};
  citiesOnPage.forEach((city) => {
    citiesData[city] = state.savedCities[city];
  });

  return citiesData;
};

// Separate API to fetch 7-day forecast
export const getSevenDaysForecast = async function (city) {
  try {
    const data = await AJAX(`${F_D_API_URL}${city}${F_D_API_KEY}&units=metric`);
    console.log(data);

    state.forecastSeven = [];

    getForecastData(data);
  } catch (err) {
    console.error(`${err} WHAT THE HELL MAN?`);
    throw err;
  }
};

const getForecastData = function (data) {
  let date = null;
  let dayObject = [];
  for (const [i, timeframe] of data.list.entries()) {
    const newDate = new Date(timeframe.dt_txt).getDate();
    if (date === null) {
      date = newDate;
      dayObject.push(timeframe);
    } else if (newDate !== date) {
      const dominantCondition = getConditionForDescription(dayObject);
      const img = getWeatherImage(dominantCondition, false, true);
      const weekDay =
        state.weekdays[new Date(data.list[i - 1].dt_txt).getDay()];
      const [max, min] = getMinMaxTemp(dayObject);
      state.forecastSeven.push({
        dominantCondition,
        img,
        weekDay,
        min,
        max,
      });
      dayObject = [];
      date = newDate;
    }

    if (!dayObject.includes(timeframe)) dayObject.push(timeframe);
  }

  const dominantCondition = getConditionForDescription(dayObject);
  const img = getWeatherImage(dominantCondition, false, true);
  const weekDay =
    state.weekdays[new Date(data.list[data.list.length - 1].dt_txt).getDay()];
  const [max, min] = getMinMaxTemp(dayObject);
  state.forecastSeven.push({
    dominantCondition,
    img,
    weekDay,
    min,
    max,
  });
};

const getMinMaxTemp = function (day) {
  let min = Infinity;
  let max = -Infinity;
  for (const tf of day) {
    if (tf.main.temp_max > max) max = tf.main.temp_max;
    if (tf.main.temp_min < min) min = tf.main.temp_min;
  }
  return [Math.round(max), Math.round(min)];
};

const getConditionForDescription = function (day) {
  const condCounts = {};
  // Iterate through the array
  for (const item of day) {
    const condition = convertIDtoWeather(...item.weather);

    if (!condition) continue;

    if (condCounts[condition]) {
      // If it is, increment the count
      condCounts[condition]++;
    } else {
      // If it's not, add it to the object with a count of 1
      condCounts[condition] = 1;
    }
  }

  if (Object.keys(condCounts).length === 0) return "Sunny";
  const sortedArr = Object.entries(condCounts);
  sortedArr.sort((a, b) => b[1] - a[1]);
  return sortedArr[0][0];
};

const convertIDtoWeather = function (condObj) {
  const id = condObj.id;
  if (id > 199 && id < 300) {
    return "Thunder";
  }
  if (id > 299 && id < 500) {
    return "Drizzle";
  }
  if (id > 499 && id < 600) {
    if (id === 500 || id === 520) return "Patchy rain";
    return "Rainy";
  }
  if (id > 599 && id < 700) {
    if (id === 600) return "Patchy snow";
    if (id === 612) return "Patchy sleet";
    if (id === 611 || id === 613) return "Sleet";
    return "Snowy";
  }
  if (id > 699 && id < 800) {
    if (id === 701) return "Mist";
    if (id === 741) return "Fog";
    return "Cloudy";
  }
  if (id === 800) {
    return "Sunny";
  }
  if (id > 800) {
    if (id === 801) return "Partly cloudy";
    if (id === 804) return "Overcast";
    return "Cloudy";
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
  const firstDayArr = state.forecast.forecastday[0].hour;
  const secondDayArr = state.forecast.forecastday[1].hour;
  const curHour = new Date(state.location.localtime).getHours();

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
  if (condition.toLowerCase().includes("sunny")) {
    if (isWindy) return "windySun";
    return "sunny";
  }
  // clear moon
  if (condition.toLowerCase().includes("clear")) {
    if (isWindy) return "windyMoon";
    return "clear";
  }

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
  if (condition.toLowerCase().includes("partly cloudy")) {
    if (isDay) {
      if (isWindy) return "windyCloudySun";
      return "cloudySun";
    }
    if (isWindy) return "windyCloudyMoon";
    return "cloudyMoon";
  }

  // cloud
  if (
    condition.toLowerCase().includes("cloud") ||
    condition.toLowerCase().includes("overcast") ||
    condition.toLowerCase().includes("mist") ||
    condition.toLowerCase().includes("fog")
  )
    return "cloud";

  // sun with snow
  if (condition.includes("snow") || condition.includes("Blizzard"))
    return "snowyCloud";

  // cloud with snow and rain
  if (condition.includes("sleet")) return "snowyRainyCloud";
};

export const saveOptions = function (target) {
  const setting = target.dataset.setting;
  if (!setting) return;
  const value = target.textContent.trim().toLowerCase();
  state.userSettings[setting] = value;
  persistSettings();
  return target;
};

export const saveGeneral = function (target) {
  const setting = target.dataset.general;
  if (!setting) return;
  if (state.generalSettings[setting]) state.generalSettings[setting] = false;
  else state.generalSettings[setting] = true;
  persistGeneralSettings();
};

export const addSavedCity = function (city) {
  state.savedCities[city] = {
    current: state.current,
    forecast: state.forecast,
    img: state.cityImg,
    location: state.location,
  };
  persistSavedCity();
};

export const deleteSavedCity = function (city) {
  delete state.savedCities[city];
  persistSavedCity();
};

const persistSavedCity = function () {
  localStorage.setItem("saved cities", JSON.stringify(state.savedCities));
};

const persistSettings = function () {
  localStorage.setItem("settings", JSON.stringify(state.userSettings));
};

const persistGeneralSettings = function () {
  localStorage.setItem(
    "general settings",
    JSON.stringify(state.generalSettings)
  );
};

const init = function () {
  const storage = localStorage.getItem("settings");
  if (storage) state.userSettings = JSON.parse(storage);

  const generalStorage = localStorage.getItem("general settings");
  if (generalStorage) state.generalSettings = JSON.parse(generalStorage);

  const savedCities = localStorage.getItem("saved cities");
  if (savedCities) state.savedCities = JSON.parse(savedCities);
};

init();
