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
