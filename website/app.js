/* Global Variables */
const apiUrl = 'http://localhost:8000';
const apiKey = '&appid=017c54541f35518db3f3903322e9de70';
const baseURL = 'https://api.openweathermap.org/data/2.5/forecast?zip=';

const zipCodeElement = document.getElementById('zip');
const feelingsElement = document.getElementById('feelings');
const generateButton = document.getElementById('generate');
const dateElement = document.getElementById('date');
const temperatureElement = document.getElementById('temp');
const contentElement = document.getElementById('content');

const catchError = (error) => console.log('There\'s something error: ', error);

// Event listener to add function to existing HTML DOM element
generateButton.addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e){
  // Catch the user inputs into a variable called information
  let information = {
    zipCode: zipCodeElement.value,
    content: feelingsElement.value,
    date: new Date()
  };

  //Pass zipCode to getWeather function and deal with the returned data
  getWeather(baseURL,information.zipCode,apiKey)
  
  .then(weatherInfo => {
    //alert if the zip code is wrong and city isn't found by the api
    if (weatherInfo.cod != 200){
      return alert(weatherInfo.message);
    }
    //if the zip code exists
    information.temperature = weatherInfo.list[0].main.temp;
    postData(apiUrl+'/add',information);
    updateUI();
  })

}

/* Function to GET Web API Data*/
const getWeather = async (baseURL,zip,key) => {
  const res = await fetch(baseURL+zip+key)
  try {
    const data = await res.json()
    return data;
  } catch (error){
    catchError(error);
  }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin', 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (error){
    catchError(error);
  }
}

/* Function to GET Project Data */
const updateUI = async () => {
  const request = await fetch(apiUrl+'/all');
  try {
    const allData = await request.json();
    dateElement.innerHTML = `Today is ${allData.date}`;
    temperatureElement.innerHTML = `Temperature is ${allData.temp}`;
    contentElement.innerHTML = `I feel ${allData.content}`;
  } catch (error){
    catchError(error);
  }
}