function formatdate(timestamp) {
  //current date and time

  let dates = new Date(timestamp);

  let hours = dates.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = dates.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = ["sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let day = days[dates.getDay()];

  return `${day}  ${hours}:${minutes}`;
}

function displayTemparature(response) {
  console.log(response.data);
  let temparature = document.querySelector("#Temp");
  temparature.innerHTML = Math.round(response.data.main.temp);

  // here celsius null
  celsiustemp = response.data.main.temp;

  let Description = document.querySelector("#description");
  Description.innerHTML = response.data.weather[0].description;

  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.name;

  let countryName = document.querySelector("#country");
  countryName.innerHTML = response.data.sys.country;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let date = document.querySelector("#date");
  date.innerHTML = formatdate(response.data.dt * 1000);

  // icon Change

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    ` http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  // for img alt
  icon.setAttribute("alt", response.data.weather[0].description);
}

// Api

function search(city) {
  let apiKey = "857fbe973ad9987d54d0a62fd2b80055";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemparature);
}

search("dhaka");

// working on form & input

function handleSubmit(event) {
  event.preventDefault();
  let input = document.querySelector("#search-input");
  search(input.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

// working on Units fahrenheit / degreees

function displayFahrenheit(event) {
  event.preventDefault();
  // add class to design units
  Celsius.classList.remove("celsius");
  Fahrenheit.classList.add("celsius");
  let temp = document.querySelector("#Temp");
  let fahrenheitTemp = (celsiustemp * 9) / 5 + 32;
  temp.innerHTML = Math.round(fahrenheitTemp);
}

// new technics
let celsiustemp = null;

let Fahrenheit = document.querySelector("#fahrenheit");
Fahrenheit.addEventListener("click", displayFahrenheit);

// working celsius

function displayCelsius(event) {
  event.preventDefault();
  //add class to design units
  Celsius.classList.add("celsius");
  Fahrenheit.classList.remove("celsius");
  let temp = document.querySelector("#Temp");
  temp.innerHTML = Math.round(celsiustemp);
}

let Celsius = document.querySelector("#celsius");
Celsius.addEventListener("click", displayCelsius);
