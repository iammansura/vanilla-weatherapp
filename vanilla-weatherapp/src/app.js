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
}

let apiKey = "857fbe973ad9987d54d0a62fd2b80055";

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Hannover&appid=${apiKey}&units=metric`;

console.log(apiUrl);

axios.get(apiUrl).then(displayTemparature);
