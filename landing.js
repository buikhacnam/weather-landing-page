
//DOM element
const time = document.getElementById('time'),
	greeting = document.getElementById('greeting'),
	name = document.getElementById('name'),
	focus = document.getElementById('focus'),
	container = document.querySelector('.container'),
	searchbox = document.querySelector('.search-box'),
	faillocation = document.querySelector('city');
	note = document.querySelector('.note');
	api = {
		key: "7845b36e72eeebc7131617478b064fe6",
		base: "https://api.openweathermap.org/data/2.5/"
	};


//Show Time
function showTime() {
	let today = new Date(),
	hour = today.getHours(),
	min = today.getMinutes(),
	sec = today.getSeconds();

	

	//Output time
	time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)}`;

	setTimeout(showTime, 1000);


}

//add Zaros
function addZero(n) {
	return n < 10? '0' + n : n; 
}

//setBackGround and Greeting
function setBgGreet() {
	let today = new Date();
	let hour = today.getHours();

	if (hour < 12) {
		document.body.style.backgroundImage = "url('https://images.pexels.com/photos/2876511/pexels-photo-2876511.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940') ";
		greeting.textContent = 'Good Morning,';
	}else if (hour < 18) {
		document.body.style.backgroundImage = "url('https://images.pexels.com/photos/2876511/pexels-photo-2876511.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940') ";
		
		greeting.textContent = 'Good Afternoon,';
	} else {
		document.body.style.backgroundImage = "url('https://images.pexels.com/photos/2876511/pexels-photo-2876511.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')";
		greeting.textContent = 'Good Evening,';
	}
}

function getName() {
	if (localStorage.getItem('name') === null) {
		name.textContent = '______';
	} else {
		name.textContent = localStorage.getItem('name');
	}
}

function setName(e) {
	if (e.type === 'keypress') {
      if (e.which == 13 || e.keyCode == 13) {
      	localStorage.setItem('name', e.target.innerText);
      	name.blur();
      }
	} else {
		localStorage.setItem('name', e.target.innerText)
	}
}

function getFocus() {
	if (localStorage.getItem('focus') === null) {
		focus.textContent = '__________';
	} else {
		focus.textContent = localStorage.getItem('focus');
	}
}

function setFocus(e) {
	if (e.type === 'keypress') {
      if (e.which == 13 || e.keyCode == 13) {
      	localStorage.setItem('focus', e.target.innerText);
      	focus.blur();
      }
	} else {
		localStorage.setItem('focus', e.target.innerText)
	}
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

showTime();
setBgGreet();
getName();
getFocus();

//--------------about weather--------------------

let defaultLocation;
searchbox.addEventListener('keypress', setQuery);

function setQuery(e) {
	if (e.which == 13 || e.keyCode == 13) {
		searchbox.blur();
		getResult(searchbox.value);
        localStorage.setItem('temp', searchbox.value);
		searchbox.value = "";
	}
}

function getTemp() {
	if (localStorage.getItem('temp') === null) {
		return defaultLocation = "Hanoi";
	} else {
		return defaultLocation = localStorage.getItem('temp');
	}
}

function getResult(query) {
	fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
		.then(weather => {
			return weather.json();
		}).then(displayResult);
}

function displayResult(weather) {
	console.log(weather);

	if (weather.message == "city not found") {
      localStorage.removeItem('temp');
      note.style.color = "red";
      note.style.background = "white";
      note.innerText = "* nhập có dấu: tỉnh + địa danh / địa danh (tp) - vd: tỉnh Quảng Ninh / Hải Phòng"
      
	} else{
    
    note.style.color = "white";
    note.style.background = "none";
    note.innerText = "* tỉnh + địa danh / địa danh - vd: tỉnh Quảng Ninh / Hải Phòng"

	console.log(weather);
	let city = document.querySelector('.location .city h1');
	city.innerText = `${weather.name},${weather.sys.country}`;

	let temp = document.querySelector('.current .temp h1');
	temp.innerText = `${weather.main.temp}°C`;

	let today = new Date();
	let hour = today.getHours();
	
	let weather_el = document.querySelector('.current .weather');
  		if(weather.weather[0].main == "Clouds") {
  			weather_el.innerHTML = '<i class="fas fa-cloud"></i>';
  		}if(weather.weather[0].main == "Rain" || weather.weather[0].main == "Thunderstorm") {
  			weather_el.innerHTML = '<i class="fas fa-cloud-showers-heavy"></i>';
  		} if((weather.weather[0].main == "Clear") && (hour < 18)) {
  			weather_el.innerHTML = '<i class="fas fa-sun"></i>';
  		} if((weather.weather[0].main == "Clear") && (hour > 17 || hour < 5)) {
  			weather_el.innerHTML = '<i class="fas fa-cloud-moon"></i>';
  		}
  		
	}

  	let now = new Date();
  	let date = document.querySelector('.location .date h3');
  	date.innerText = dateBuilder(now);
}






function dateBuilder(now) {
   let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  let day = days[now.getDay()];
  let date = now.getDate();
  let month = months[now.getMonth()];
  let year = now.getFullYear();

  return `${day} ${date} ${month} ${year}`;

}

getResult(getTemp());

