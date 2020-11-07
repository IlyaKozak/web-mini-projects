// DOM Elements
const time = document.querySelector('.time'),
  dateTime = document.querySelector('.date'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  meteo = document.querySelector('.meteo-header'),
  changeBGImageBtn = document.getElementById('changeBGImage');

const blockquote = document.querySelector('blockquote');
const figure = document.querySelector('figure');
const figcaption = document.querySelector('figcaption');
const quoteBtn = document.getElementById('quote-btn');
const container = document.querySelector('.main-container');

const country = document.querySelector('.country');
const error = document.querySelector('.error');
const weatherIcon = document.querySelector('.owf');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');
const description = document.querySelector('.description');
const wind = document.querySelector('.wind');

// API Key
const API_KEY = 'acb9b873cb08e19c797fcfb2109e1c98';

// Show 12 or 24 time format
const showAmPm = false;

// Months for getMonth method
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

// Days for getDay method
const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

// Show Date
function showDate() {
  const today = new Date(),
    month = months[today.getMonth()],
    date = today.getDate(),
    day = days[today.getDay()];

  dateTime.innerHTML = `${day}, ${date} ${month}`;
}

// Show Time
function showTime() {
  const today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  // Show New Date
  if (hour === 0 && min === 0 && sec === 0) showDate();
  // Set New Background and Greeting
  if (min === 0 && sec === 0) {
    changeBg();
    getQuote();
  }

  // Set AM or PM
  const amPm = hour >= 12 ? 'PM' : 'AM';

  // // 12hr Format
  // hour = hour % 12 || 12;

  // Output Time
  time.innerHTML = `<span class="hour1">${addZero(hour).slice(
    0,
    1
  )}</span><span class="hour2">${addZero(hour).slice(
    1
  )}</span><span class="colon">:</span><span class="min1">${addZero(min).slice(
    0,
    1
  )}</span><span class="min2">${addZero(min).slice(
    1
  )}</span><span class="colon">:</span><span class="sec1">${addZero(sec).slice(
    0,
    1
  )}</span><span class="sec2">${addZero(sec).slice(1)} ${
    showAmPm ? amPm : ''
  }</span>`;

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet(eventType) {
  const today = new Date(),
    hour = today.getHours();

  if (eventType === 'mouseup') {
    startHour++;
    if (startHour === 24) startHour = 0;
    const img = document.createElement('img');
    const src = `assets/images/${bgImages[startHour]}`;
    img.src = src;
    img.onload = () => (container.style.backgroundImage = `url(${src})`);
  } else {
    const img = document.createElement('img');
    const src = `assets/images/${bgImages[hour]}`;
    img.src = src;
    img.onload = () => (container.style.backgroundImage = `url(${src})`);
  }

  if (hour >= 6 && hour < 12) {
    // Morning - 6:00 — 11:59
    greeting.textContent = 'Good Morning, ';
  } else if (hour >= 12 && hour < 18) {
    // Afternoon - 12:00 — 17:59
    greeting.textContent = 'Good Afternoon, ';
  } else if (hour >= 18 && hour < 24) {
    // Evening - 18:00 — 23:59
    greeting.textContent = 'Good Evening, ';
  } else {
    // Night - 00:00 - 5:59
    greeting.textContent = 'Good Night, ';
  }
}

// Change Background Image
function changeBg(e) {
  if (changeBGImageBtn.getAttribute('disabled') === 'true') e.preventDefault();

  rotateAngle++;
  changeBGImageBtn.style.transform = `rotate(${rotateAngle * 180}deg)`;
  if (e) setBgGreet(e.type);
  else setBgGreet();
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Clear Name
function clearName() {
  name.innerText = '';
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      setLocalStorage(name, 'name', '[Enter Name]');
      name.blur();
    }
  } else {
    setLocalStorage(name, 'name', '[Enter Name]');
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Clear Focus
function clearFocus() {
  focus.innerText = '';
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      setLocalStorage(focus, 'focus', '[Enter Focus]');
      focus.blur();
    }
  } else {
    setLocalStorage(focus, 'focus', '[Enter Focus]');
  }
}

// Get Meteo
function getMeteo() {
  if (localStorage.getItem('meteo') === null) {
    meteo.textContent = 'Enter City';
  } else {
    meteo.textContent = localStorage.getItem('meteo');
    getWeather(localStorage.getItem('meteo'));
  }
}

// Clear Meteo
function clearMeteo() {
  meteo.innerText = '';
}

// Set Meteo
function setMeteo(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      setLocalStorage(meteo, 'meteo', 'Enter City');
      getMeteo();
      meteo.blur();
    }
  } else {
    setLocalStorage(meteo, 'meteo', 'Enter City');
    getMeteo();
  }
}

function setLocalStorage(element, name, text) {
  if (element.innerText.trim()) {
    localStorage.setItem(name, element.innerText.trim());
  } else {
    if (name === 'focus') {
      element.innerText = localStorage.getItem(name) || text;
    } else if (name === 'name') {
      element.innerText = localStorage.getItem(name) || text;
    } else if (name === 'meteo') {
      element.innerText = localStorage.getItem(name) || text;
    }
  }
}

function transitionStart() {
  changeBGImageBtn.classList.add('rotating');
  changeBGImageBtn.setAttribute('disabled', 'true');
}

function transitionEnd() {
  changeBGImageBtn.classList.remove('rotating');
  changeBGImageBtn.removeAttribute('disabled');
}

// Get Random Quote
async function getQuote() {
  const url = `assets/json/quotes.json`;
  const res = await fetch(url);
  const data = await res.json();
  const randomQuote = getRandomInt(0, data.length);
  figure.style.opacity = 0;
  setTimeout(() => {
    figure.style.opacity = 1;
    blockquote.textContent = data[randomQuote].quoteText;
    figcaption.textContent = `— ${data[randomQuote].quoteAuthor ||
      'Unknown Author'}`;
  }, 1000);
}

// Get Random Number
function getRandomInt(min, max) {
  // now rand is from  (min-0.5) to (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

// Generate 24 background images numbers for one day
function bgImagesNumbers() {
  const today = new Date(),
    startHour = today.getHours();
  const bgImagesFor24Hours = {};
  let hour = 6;
  // Morning
  const set = new Set();
  while (set.size < 6) set.add(getRandomInt(1, 20));
  [...set].forEach(num => {
    bgImagesFor24Hours[hour] = `morning/${addZero(num)}.jpg`;
    hour++;
  });
  // Day
  set.clear();
  while (set.size < 6) set.add(getRandomInt(1, 20));
  [...set].forEach(num => {
    bgImagesFor24Hours[hour] = `day/${addZero(num)}.jpg`;
    hour++;
  });
  // Evening
  set.clear();
  while (set.size < 6) set.add(getRandomInt(1, 20));
  [...set].forEach(num => {
    bgImagesFor24Hours[hour] = `evening/${addZero(num)}.jpg`;
    hour++;
  });
  // Night
  set.clear();
  while (set.size < 6) set.add(getRandomInt(1, 20));
  [...set].forEach(num => {
    if (hour === 24) hour = 0;
    bgImagesFor24Hours[hour] = `night/${addZero(num)}.jpg`;
    hour++;
  });
  set.clear();
  return [bgImagesFor24Hours, startHour];
}

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=${API_KEY}&units=metric`;
  const res = await fetch(url);
  if (res.ok === false) {
    error.style.display = 'inline-block';
    error.innerHTML = 'City Not Found';
    humidity.style.display = 'none';
    wind.style.display = 'none';
    country.style.display = 'none';
    weatherIcon.style.display = 'none';
    temperature.style.display = 'none';
    description.style.display = 'none';
    return;
  }
  error.style.display = 'none';
  const data = await res.json();
  country.style.display = 'inline-block';
  country.style.backgroundImage = `url("https://www.countryflags.io/${data.sys.country}/flat/64.png")`;
  const today = new Date(),
    hour = today.getHours();
  weatherIcon.style.display = 'inline-block';
  weatherIcon.className = `owf owf-${data.weather[0].id}-${
    hour < 6 ? 'n' : 'd'
  }`;
  temperature.style.display = 'inline-block';
  temperature.innerHTML = Math.round(data.main.temp) + '<sup>°C</sup>';
  humidity.style.display = 'inline-block';
  wind.style.display = 'inline-block';
  humidity.innerHTML = data.main.humidity + '<span class="icon"></span>';
  wind.innerHTML =
    '<span class="icon"></span>' +
    Math.round(data.wind.speed) +
    '<span class="sub">m/s</span>';
  description.style.display = 'inline-block';
  description.innerText = data.weather[0].description;
}

name.addEventListener('click', clearName);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('click', clearFocus);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
meteo.addEventListener('click', clearMeteo);
meteo.addEventListener('keypress', setMeteo);
meteo.addEventListener('blur', setMeteo);
changeBGImageBtn.addEventListener('mouseup', changeBg);
changeBGImageBtn.addEventListener('transitionstart', transitionStart);
changeBGImageBtn.addEventListener('transitionend', transitionEnd);
document.addEventListener('DOMContentLoaded', getQuote);
quoteBtn.addEventListener('click', getQuote);

// Run
showTime();
showDate();
let [bgImages, startHour] = bgImagesNumbers();
let rotateAngle = 0;
setBgGreet();
getName();
getFocus();
getMeteo();
