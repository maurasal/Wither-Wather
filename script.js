const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const searchHistory = document.getElementById('searchHistory');
const cityName = document.getElementById('cityName')
const todayTemp = document.getElementById('todayTemp')
const todayHumidity = document.getElementById('todayHumidity')
const todayWind = document.getElementById('todayWind')
//API key=4d297f01ef675a7993a0a748eb04fa87

function citySearch(event) {
  event.preventDefault()

  var searchInputVal = searchInput.value;
  var queryUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='
  localStorage.setItem('searchHistory', searchInputVal)
  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }

  fetch (queryUrl + searchInputVal + '&units=Imperial&appid=4d297f01ef675a7993a0a748eb04fa87')
    .then(response => response.json())
    .then(data => {
      console.log(data)
      var today = dayjs().format('MMM D, YYYY');

      cityName.textContent = data.city.name + ", " + today
      todayTemp.textContent = "Temperature (F): " + data.list[0].main.temp;

      document.getElementById('day2Temp').textContent = "Temp: " + data.list[7].main.temp + 'F'
      document.getElementById('day3Temp').textContent = "Temp: " + data.list[15].main.temp
      document.getElementById('day4Temp').textContent = "Temp: " + data.list[23].main.temp
      document.getElementById('day5Temp').textContent = "Temp: " + data.list[31].main.temp
      document.getElementById('day6Temp').textContent = "Temp: " + data.list[39].main.temp
      todayWind.textContent = "Wind speed: " + data.list[0].wind.speed + "mph";
      document.getElementById('day2Wind').textContent = "Wind speed: " + data.list[7].wind.speed + "mph"
      document.getElementById('day3Wind').textContent = "Wind speed: " + data.list[15].wind.speed + "mph"
      document.getElementById('day4Wind').textContent = "Wind speed: " + data.list[23].wind.speed + "mph"
      document.getElementById('day5Wind').textContent = "Wind speed: " + data.list[31].wind.speed + "mph"
      document.getElementById('day6Wind').textContent = "Wind speed: " + data.list[39].wind.speed + "mph"
      todayHumidity.textContent = "Humidity level: " + data.list[0].main.humidity + "%";
      document.getElementById('day2Humidity').textContent = "Humidity level: " + data.list[7].main.humidity + "%"
      document.getElementById('day3Humidity').textContent = "Humidity level: " + data.list[15].main.humidity + "%"
      document.getElementById('day4Humidity').textContent = "Humidity level: " + data.list[23].main.humidity + "%"
      document.getElementById('day5Humidity').textContent = "Humidity level: " + data.list[31].main.humidity + "%"
      document.getElementById('day6Humidity').textContent = "Humidity level: " + data.list[39].main.humidity + "%"

      document.getElementById('day2').textContent = dayjs().add(1, 'day').format('MMM D, YYYY')
      document.getElementById('day3').textContent = dayjs().add(2, 'day').format('MMM D, YYYY')
      document.getElementById('day4').textContent = dayjs().add(3, 'day').format('MMM D, YYYY')
      document.getElementById('day5').textContent = dayjs().add(4, 'day').format('MMM D, YYYY')
      document.getElementById('day6').textContent = dayjs().add(5, 'day').format('MMM D, YYYY')
    })
    .catch(error => {
      console.error('Error', error)
    })    
}
function renderSearchHistory() {
  searchHistory.innerHTML = '';

  var searchHistoryList = JSON.parse(localStorage.getItem('searchHistory')) || [];

  searchHistoryList.forEach(query => {
    var button = document.createElement('button');
    button.textContent = query;
    button.addEventListener('click', function() {
      citySearch(query);
    });
    searchHistory.appendChild(button);
  });
}
searchBtn.addEventListener('click', citySearch)

renderSearchHistory();
