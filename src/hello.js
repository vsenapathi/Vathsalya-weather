let now = new Date();
let week = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let weekDay = week[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

let hour = now.getHours();
if (hour > 12 && hour < 24) {
  hour = hour - 12;
  dayHalf = "PM";
} else if (hour === 12) {
  dayHalf = "PM";
} else if (hour < 12) {
  dayHalf = "AM";
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let currentDate = document.querySelector("span.date");
currentDate.innerHTML = `${weekDay} ${month} ${now.getDate()}`;

let currentTime = document.querySelector("span.time");
currentTime.innerHTML = `${hour}:${minutes} ${dayHalf}`;

function setLocation(response) {
  console.log(response.data);
  let cityName = document.querySelector(".city-name");
  cityName.innerHTML = response.data.name;

  let titleEdit = document.querySelector(".titleEdit");
  titleEdit.innerHTML = "In";

  let currentTemp = document.querySelector(".currentTemp");
  currentTemp.innerHTML = `${Math.round(response.data.main.temp)}°`;

  celsiusTemp = response.data.main.temp;

  let conditionElement = document.querySelector(".condition-description");
  conditionElement.innerHTML = `${response.data.weather[0].description}`;

  let conditionIcon = document.querySelector(".condition-img");
  conditionIcon.setAttribute(
    "src",
    `src/images/condition icons/${response.data.weather[0].icon}.png`
  );

  let windSpeed = document.querySelector(".windspeedValue");
  windSpeed.innerHTML = `${Math.round(2.237 * response.data.wind.speed)} mph`;

  let humidity = document.querySelector(".humidityValue");
  humidity.innerHTML = `${Math.round(response.data.main.humidity)}%`;
}

function goLocate(city) {
  let apiKey = "389591576a5c2ac7834f2735d7f36205";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(setLocation);
}

function convertUnit(event) {
  event.preventDefault();
  if (unitToggle.checked) {
    let fahrTemp = Math.round((celsiusTemp * 9) / 5 + 32);
    let currentTempValue = document.querySelector(".currentTemp");
    currentTempValue.innerHTML = `${fahrTemp}°`;
  } else {
    let currentTempValue = document.querySelector(".currentTemp");
    currentTempValue.innerHTML = `${Math.round(celsiusTemp)}°`;
  }
}

let celsiusTemp = null;

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".search-box");
  goLocate(cityInput.value);
}

let searchForm = document.querySelector(".search");
searchForm.addEventListener("submit", handleSubmit);

let unitToggle = document.querySelector(".checkbox");
unitToggle.addEventListener("change", convertUnit);
