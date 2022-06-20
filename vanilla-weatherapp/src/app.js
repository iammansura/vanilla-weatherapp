// firstly set day and time
// we need api for current date and time
function getForcast(coordinates) {
  let apiKey = `857fbe973ad9987d54d0a62fd2b80055`
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`

  axios.get(apiUrl).then(displayForcast)
}

function formatdate(date) {
  //current date and time
  let months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  let month = months[now.getMonth()]

  let hours = now.getHours()
  if (hours < 10) {
    hours = `0${hours}`
  }

  let minutes = now.getMinutes()
  if (minutes < 10) {
    minutes = `0${minutes}`
  }

  let days = ['sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
  let day = days[now.getDay()]
  let daTe = now.getDate()
  let today = `${month}, ${day} ${daTe} ${hours}:${minutes}`
  return today
}
let now = new Date()
let daytime = document.querySelector('#date')
daytime.innerHTML = formatdate(now)
// finished fierst step

// start 2nd
// here is Api for 5 days forcast and daily forcast update
// response give us current data

function displayTemparature(response) {
  console.log(response.data)
  let temparature = document.querySelector('#Temp')
  temparature.innerHTML = Math.round(response.data.main.temp)

  // here celsius null
  celsiustemp = response.data.main.temp

  let Description = document.querySelector('#description')
  Description.innerHTML = response.data.weather[0].description

  let cityName = document.querySelector('#city')
  cityName.innerHTML = response.data.name

  let countryName = document.querySelector('#country')
  countryName.innerHTML = response.data.sys.country

  let humidity = document.querySelector('#humidity')
  humidity.innerHTML = response.data.main.humidity

  let wind = document.querySelector('#wind')
  wind.innerHTML = Math.round(response.data.wind.speed)

  let feelslike = document.querySelector('#like')
  feelslike.innerHTML = Math.round(response.data.main.feels_like)

  let pressure = document.querySelector('#pressure')
  pressure.innerHTML = response.data.main.pressure

  // icon Change
  let icon = document.querySelector('#icon')
  icon.setAttribute(
    'src',
    ` http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
  )
  // for img alt
  icon.setAttribute('alt', response.data.weather[0].description)

  // 5 days api inject in this funstion
  getForcast(response.data.coord)
}

// working on 5 days forcast
// this day come in number when we (timestamp*100) given than give us days name
function formateDay(timestamp) {
  let date = new Date(timestamp * 1000)
  let days = ['sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
  let day = date.getDay()

  return days[day]
}
function displayForcast(response) {
  // console.log(response.data)
  formateDay()
  let forCast = response.data.daily

  let forcast = document.querySelector('#forcast')

  // here use div=row because we want our 5 days prediction in a row
  let forcastHTML = `<div class="row">`
  // use loop for five dayas

  forCast.forEach(function (forecastDay, index) {
    // use index for limit 6 day if we use 5 than show 5 days forcast
    if (index < 6) {
      forcastHTML =
        forcastHTML +
        `
  <div class="col-2 ">
    <div class="weather-date">
      ${formateDay(forecastDay.dt)}
    </div>
    <img src="http://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon
    }@2x.png" alt="" width="42" />
    <div class="weather-temp">
      <span class="temp-max">${Math.round(forecastDay.temp.max)}°</span>/
      <span class="temp-mini">${Math.round(forecastDay.temp.min)}°</span>
    </div>
  </div> 
`
    }
  })

  //here end the div
  forcastHTML = forcastHTML + `</div>`
  forcast.innerHTML = forcastHTML
  //console.log(forcastHTML);
}

// this second  Api use for input form

function search(city) {
  let apiKey = '857fbe973ad9987d54d0a62fd2b80055'
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  axios.get(apiUrl).then(displayTemparature)
}

// this means when open the page alwyas show (dhakas) details than search
search('dhaka')

// working on form & input

function handleSubmit(event) {
  event.preventDefault()
  let input = document.querySelector('#search-input')
  search(input.value)
}

let form = document.querySelector('#search-form')
form.addEventListener('submit', handleSubmit)

// delet fHRNHEIT
// working on Units fahrenheit / degreees

function displayFahrenheit(event) {
  event.preventDefault()
  //   // add class to design units
  Celsius.classList.remove('celsius')
  Fahrenheit.classList.add('celsius')
  let temp = document.querySelector('#Temp')
  let fahrenheitTemp = (celsiustemp * 9) / 5 + 32
  temp.innerHTML = Math.round(fahrenheitTemp)
}
// // new technics
let celsiustemp = null

let Fahrenheit = document.querySelector('#fahrenheit')
Fahrenheit.addEventListener('click', displayFahrenheit)

// DELET CELCIUS.

// working celsius
function displayCelsius(event) {
  event.preventDefault()
  //add class to design units
  Celsius.classList.add('celsius')
  Fahrenheit.classList.remove('celsius')
  let temp = document.querySelector('#Temp')
  temp.innerHTML = Math.round(celsiustemp)
}

let Celsius = document.querySelector('#celsius')
Celsius.addEventListener('click', displayCelsius)
