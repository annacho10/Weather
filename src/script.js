// 밑에 7도 및 추가 5일 수정, 계산 기본값 수정, 시간 각 국가의 시간으로 바뀌어야 하지 않을까?
// temp max, min 모두 수정되어야 함...., visibility를 다른것으로 바꿔야 할듯?
function displayWeather(response) {
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#temp-max").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#temp-min").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#visibility").innerHTML = Math.round(
    response.data.visibility / 1000
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(city) {
  let apiKey = "33ccc5935c23e13f1d3bcc5768a8d1d3";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector(".form-control").value;
  searchCity(city);
}
let searchButton = document.querySelector(".location");
searchButton.addEventListener("submit", handleSubmit);

searchCity("London");

function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "33ccc5935c23e13f1d3bcc5768a8d1d3";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function searchGeolocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let geolocationButton = document.querySelector(".btn-success");
geolocationButton.addEventListener("click", searchGeolocation);

function showFahrenheit(event) {
  event.preventDefault();
  // 밑에 수정해야 할듯?
  let temperatureElement = document.querySelector(".temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  // 밑에 7도 수정되어야 함
  temperatureElement.innerHTML = 7;
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius);

function time(current) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[current.getDay()];
  let hours = current.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = current.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}
let now = new Date();
let dateTime = document.querySelector("#day-time");
dateTime.innerHTML = time(now);
