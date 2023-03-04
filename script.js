let latitude = 0;
let longitude = 0;

const mymap = L.map('issMap').setView([latitude, longitude], 1);
const marker = L.marker([latitude, longitude]).addTo(mymap);
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const tiles = L.tileLayer(tileUrl, { attribution })
tiles.addTo(mymap);

// Fetching data from the API
const url = "https://api.wheretheiss.at/v1/satellites/25544"
let firstTime = true;
async function getISS()
{
  const response = await fetch(url);
  const data = await response.json()

  latitude = data.latitude;
  longitude = data.longitude;
  marker.setLatLng([latitude, longitude]).addTo(mymap)
  if(firstTime){
    mymap.setView([latitude, longitude],5)
      firstTime = false
  }
  document.getElementById('lat').innerText = latitude.toFixed(2);
  document.getElementById('lon').innerText = longitude.toFixed(2);
  
}

setInterval(getISS, 1000)
































