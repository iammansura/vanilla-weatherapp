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
}

let apiKey = "857fbe973ad9987d54d0a62fd2b80055";

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Hannover&appid=${apiKey}&units=metric`;

console.log(apiUrl);

axios.get(apiUrl).then(displayTemparature);
