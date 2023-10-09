import { TIMEOUT_SEC } from "./config";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url) {
  try {
    const fetchPro = fetch(url);
    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (err) {
    throw err;
  }
};

export const convertTo24Hour = function (time12Hour) {
  // Split the time string into hours, minutes, and AM/PM parts
  const [time, period] = time12Hour.split(" ");

  // Split the hours and minutes
  const [hours, minutes] = time.split(":");

  // Convert hours to a number
  let hours24 = parseInt(hours, 10);

  // Adjust for AM/PM
  if (period === "PM" && hours24 !== 12) {
    hours24 += 12;
  } else if (period === "AM" && hours24 === 12) {
    hours24 = 0;
  }

  // Convert back to string with leading zeros if needed
  const hours24String = hours24.toString().padStart(2, "0");

  // Combine hours and minutes in 24-hour format
  const time24Hour = `${hours24String}:${minutes}`;

  return time24Hour;
};


export const convertTo12Hour = function(time24hour) {
  const [hours, minutes] = time24hour.split(":");
  let period = "AM";

  // Convert hours to a number
  let hourNum = parseInt(hours, 10);

  // Determine the period (AM or PM)
  if (hourNum >= 12) {
    period = "PM";
    if (hourNum > 12) {
      hourNum -= 12;
    }
  }

  // Ensure the hour is in two-digit format (e.g., 03 instead of 3)
  const hour12 = hourNum.toString().padStart(2, "0");

  // Construct the 12-hour format time string
  const time12 = `${hour12}:${minutes} ${period}`;
  return time12;
}

export const parseDateStringToDate = function(dateString) {
  // Split the input string by '/' to extract day, month, and year
  const dateParts = dateString.split("/");

  // Ensure there are three parts (day, month, and year)
  if (dateParts.length === 3) {
    const day = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // Month is zero-based (0-11)
    const year = parseInt(dateParts[2]);

    // Create a Date object
    const properDate = new Date(year, month, day);

    // Check if the Date object is valid
    if (!isNaN(properDate.getTime())) {
      return properDate;
    }
  }

  // Return null for invalid input
  return null;
}

export const convertDateToTime = function (dateTimeString) {
  const dateObject = new Date(dateTimeString);

  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();

  const formattedTime =
    hours.toString().padStart(2, "0") +
    ":" +
    minutes.toString().padStart(2, "0");
  return formattedTime
};