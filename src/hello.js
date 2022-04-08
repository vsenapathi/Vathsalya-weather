function formatDateTime(epoch, timezone) {
  let myDate = new Date(epoch * 1000);
  let timePlus1 = new Date((epoch + 3600) * 1000);
  let timePlus2 = new Date((epoch + 7200) * 1000);
  let timePlus3 = new Date((epoch + 10800) * 1000);
  let timePlus4 = new Date((epoch + 14400) * 1000);

  var options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: timezone,
  };
  let localDt = myDate.toLocaleString("en-US", options);

  let dtHeader = document.querySelector(".date-time");
  dtHeader.innerHTML = localDt;

  let plus1hr = timePlus1.toLocaleString("en-US", {
    timeZone: `${timezone}`,
    hour: "numeric",
  });

  let plus2hr = timePlus2.toLocaleString("en-US", {
    timeZone: `${timezone}`,
    hour: "numeric",
  });

  let plus3hr = timePlus3.toLocaleString("en-US", {
    timeZone: `${timezone}`,
    hour: "numeric",
  });

  let plus4hr = timePlus4.toLocaleString("en-US", {
    timeZone: `${timezone}`,
    hour: "numeric",
  });

  let timePlus1Title = document.querySelector(".forecastTimePlus1");
  timePlus1Title.innerHTML = plus1hr;

  let timePlus2Title = document.querySelector(".forecastTimePlus2");
  timePlus2Title.innerHTML = plus2hr;

  let timePlus3Title = document.querySelector(".forecastTimePlus3");
  timePlus3Title.innerHTML = plus3hr;

  let timePlus4Title = document.querySelector(".forecastTimePlus4");
  timePlus4Title.innerHTML = plus4hr;
}

function formatDisplay(response) {
  let currentTemp = document.querySelector(".currentTemp");
  currentTemp.innerHTML = `${Math.round(response.data.current.temp)}°`;

  celCurrentTemp = response.data.current.temp;

  let conditionElement = document.querySelector(".condition-description");
  conditionElement.innerHTML = `${response.data.current.weather[0].description}`;

  let conditionIcon = document.querySelector(".condition-img");
  conditionIcon.setAttribute(
    "src",
    `src/images/condition icons/${response.data.current.weather[0].icon}.png`
  );

  let windSpeed = document.querySelector(".windspeedValue");
  windSpeed.innerHTML = `${Math.round(
    2.237 * response.data.current.wind_speed
  )} mph`;

  let humidity = document.querySelector(".humidityValue");
  humidity.innerHTML = `${Math.round(response.data.current.humidity)}%`;

  let tempPlus1hr = document.querySelector(".forecastTempPlus1");
  tempPlus1hr.innerHTML = `${Math.round(response.data.hourly[1].temp)}°`;

  celTempPlus1hr = response.data.hourly[1].temp;

  let tempPlus2hr = document.querySelector(".forecastTempPlus2");
  tempPlus2hr.innerHTML = `${Math.round(response.data.hourly[2].temp)}°`;

  celTempPlus2hr = response.data.hourly[2].temp;

  let tempPlus3hr = document.querySelector(".forecastTempPlus3");
  tempPlus3hr.innerHTML = `${Math.round(response.data.hourly[3].temp)}°`;

  celTempPlus3hr = response.data.hourly[3].temp;

  let tempPlus4hr = document.querySelector(".forecastTempPlus4");
  tempPlus4hr.innerHTML = `${Math.round(response.data.hourly[4].temp)}°`;

  celTempPlus4hr = response.data.hourly[4].temp;

  let epoch = response.data.current.dt;
  let timezone = response.data.timezone;

  formatDateTime(epoch, timezone);
}

function getForecast(lat, lon) {
  let forecastApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=daily,minutely&appid=${apiKey}&units=metric`;

  axios.get(forecastApiUrl).then(formatDisplay);
}

function setLocation(response) {
  let cityName = document.querySelector(".city-name");
  cityName.innerHTML = response.data[0].name;

  let titleEdit = document.querySelector(".titleEdit");
  titleEdit.innerHTML = "In";

  getForecast(response.data[0].lat, response.data[0].lon);
}

function goLocate(city) {
  let coordApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;

  axios.get(coordApiUrl).then(setLocation);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".search-box");
  goLocate(cityInput.value);
}

function convertUnit(event) {
  event.preventDefault();
  if (unitToggle.checked) {
    let fahrCurrentTemp = Math.round((celCurrentTemp * 9) / 5 + 32);
    let currentTempValue = document.querySelector(".currentTemp");
    currentTempValue.innerHTML = `${fahrCurrentTemp}°`;

    let fahrTempPlus1hr = Math.round((celTempPlus1hr * 9) / 5 + 32);
    let tempPlus1hr = document.querySelector(".forecastTempPlus1");
    tempPlus1hr.innerHTML = `${fahrTempPlus1hr}°`;

    let fahrTempPlus2hr = Math.round((celTempPlus2hr * 9) / 5 + 32);
    let tempPlus2hr = document.querySelector(".forecastTempPlus2");
    tempPlus2hr.innerHTML = `${fahrTempPlus2hr}°`;

    let fahrTempPlus3hr = Math.round((celTempPlus3hr * 9) / 5 + 32);
    let tempPlus3hr = document.querySelector(".forecastTempPlus3");
    tempPlus3hr.innerHTML = `${fahrTempPlus3hr}°`;

    let fahrTempPlus4hr = Math.round((celTempPlus4hr * 9) / 5 + 32);
    let tempPlus4hr = document.querySelector(".forecastTempPlus4");
    tempPlus4hr.innerHTML = `${fahrTempPlus4hr}°`;
  } else {
    let currentTempValue = document.querySelector(".currentTemp");
    currentTempValue.innerHTML = `${Math.round(celCurrentTemp)}°`;

    let tempPlus1hr = document.querySelector(".forecastTempPlus1");
    tempPlus1hr.innerHTML = `${Math.round(celTempPlus1hr)}°`;

    let tempPlus2hr = document.querySelector(".forecastTempPlus2");
    tempPlus2hr.innerHTML = `${Math.round(celTempPlus2hr)}°`;

    let tempPlus3hr = document.querySelector(".forecastTempPlus3");
    tempPlus3hr.innerHTML = `${Math.round(celTempPlus3hr)}°`;

    let tempPlus4hr = document.querySelector(".forecastTempPlus4");
    tempPlus4hr.innerHTML = `${Math.round(celTempPlus4hr)}°`;
  }
}

celCurrentTemp = null;
celTempPlus1hr = null;
celTempPlus2hr = null;
celTempPlus3hr = null;
celTempPlus4hr = null;

let searchForm = document.querySelector(".search");
searchForm.addEventListener("submit", handleSubmit);

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  getForecast(lat, lon);

  let reverseGeocodeApi = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  axios.get(reverseGeocodeApi).then(function (response) {
    let cityName = document.querySelector(".city-name");
    cityName.innerHTML = response.data[0].name;
  });
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentLocationBtn = document.querySelector(".current-location");
currentLocationBtn.addEventListener("click", getCurrentLocation);

let unitToggle = document.querySelector(".checkbox");
unitToggle.addEventListener("change", convertUnit);

let apiKey = "389591576a5c2ac7834f2735d7f36205";

goLocate("London");
