const apiKey = "859b36d85f5d9c4568ea9a531b3f12d8";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&q=";

const inputCity = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector("figure.weather-icon img");

var weekDay = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
var month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}&units=metric`);
  var data = await response.json();

  const utc = new Date().getTime() + new Date().getTimezoneOffset() * 60000; // world clock
  const cityTime = new Date(utc + data.timezone * 1000); // city’s clock

  if (response.status == 404) {
    document.querySelector("main").classList.add("noRecord");
  } else {
    document.querySelector("main").classList.remove("noRecord");
    document.querySelector("main").style.gridTemplateRows = "auto 1fr auto";
    document.querySelector(".logo").style.display = "none";
    document.querySelector(".footer").style.display = "none";
    document.querySelector(".topContent").style.height = "auto";
  }
  //   current date and time
  document.querySelector(".dateTime").innerHTML = `${
    weekDay[cityTime.getDay() === 0 ? 6 : cityTime.getDay() - 1]
  }, ${month[cityTime.getMonth()]} ${cityTime.getDate()}, ${cityTime
    .getHours()
    .toString()
    .padStart(2, "0")}:${cityTime.getMinutes().toString().padStart(2, "0")}`;

  document.querySelector(".bottomContent").style.padding = "32px 24px";

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = `<span>${Math.round(
    data.main.temp
  )}</span>°C`;
  document.querySelector(".topContent .weather").innerHTML =
    data.weather[0].description;
  // document.querySelector(".bottomContent .humidity").innerHTML = data.main.temp;
  // document.querySelector(".bottomContent .wind").innerHTML = data.wind.speed;
  document.querySelector(".humidityWind").innerHTML = `
      <li class="humidity">
        <img src="assets/humidity.png" alt="" />
        <h3><span>${data.main.temp}</span>%</h3>
        <p class="label">Humidity</p>
      </li>
      <li class="wind">
        <img src="assets/wind.png" alt="" />
        <h3><span>${data.wind.speed}</span>km/h</h3>
        <p class="label">Wind Speed</p>
      </li>
      `;

  if (data.weather[0].main === "Clear") {
    weatherIcon.src = "assets/weather/sunny.png";
  } else if (
    data.weather[0].main === "Rain" &&
    500 <= data.weather[0].id <= 501
  ) {
    weatherIcon.src = "assets/weather/light-rain.png";
  } else if (
    data.weather[0].main === "Rain" &&
    502 <= data.weather[0].id <= 504
  ) {
    weatherIcon.src = "assets/weather/sunny.png";
  } else if (data.weather[0].main === "Clouds" && data.weather[0].id == 801) {
    weatherIcon.src = "assets/weather/partly-cloudy.png";
  } else if (
    data.weather[0].main === "Clouds" &&
    802 <= data.weather[0].id <= 803
  ) {
    weatherIcon.src = "assets/weather/partly-cloudy-with-sun.png";
  } else if (data.weather[0].main === "Clouds" && data.weather[0].id == 804) {
    weatherIcon.src = "assets/weather/overcast.png";
  } else if (data.weather[0].main === "Fog" && data.weather[0].id == 741) {
    weatherIcon.src = "assets/weather/foggy.png";
  } else if (
    data.weather[0].main === "Thunderstorm" &&
    210 <= data.weather[0].id <= 221
  ) {
    weatherIcon.src = "assets/weather/thunderstorm.png";
  } else if (
    data.weather[0].main === "Thunderstorm" &&
    200 <= data.weather[0].id <= 202 &&
    230 <= data.weather[0].id <= 232
  ) {
    weatherIcon.src = "assets/weather/thunderstorm-with-rain.png";
  } else if (
    data.weather[0].main === "Snow" &&
    600 <= data.weather[0].id <= 601 &&
    611 <= data.weather[0].id <= 621
  ) {
    weatherIcon.src = "assets/weather/snow.png";
  } else if (data.main.temp > 40) {
    weatherIcon.src = "assets/weather/hot-temperature.png";
  } else if (data.main.temp < 10) {
    weatherIcon.src = "assets/weather/cold-temperature.png";
  } else if (data.weather[0].main === "Mist") {
    weatherIcon.src = "assets/weather/windy.png";
  } else {
    weatherIcon.src = "assets/weather/sunny.png";
  }
}

// window.onload = function () {
//   checkWeather("Delhi");
// };

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputCity.value) {
    checkWeather(inputCity.value);
    document.querySelector("main").classList.add("cityData");
  } else {
    checkWeather("Delhi");
  }
});

inputCity.addEventListener("input", () => {
  if (inputCity.value.trim() !== "") {
    document.querySelector(".search").style.gridTemplateColumns = "1fr 50px";
    searchBtn.classList.add("active");
  } else {
    searchBtn.classList.remove("active");
    document.querySelector(".search").style.gridTemplateColumns = "1fr";
  }
});
