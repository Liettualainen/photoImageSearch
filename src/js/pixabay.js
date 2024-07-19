const axios = require('axios').default;
const baseUrl = "https://pixabay.com/api/";
let API_KEY = '30904237-89ef4380cd88db989fbe73792';
const imageType = "photo";
const photoOrientation = "horizontal";
const safeSearch = true;
const StartingPage = "1";
const perPage = "40";
// const searchImage = "cars";

 const fetchSearchPhotos = async (searchImage) => {
  const response = await axios.get(
    `${baseUrl}?key=${API_KEY}&q=${searchImage}&image_type=${imageType}&orientation=${photoOrientation}&safesearch=${safeSearch}&page=${StartingPage}&per_page=${perPage}`
  ); 
  //  console.log(response.data.hits);
   return response.data;
}

export { fetchSearchPhotos }


// axios.defaults.baseURL = 'https://api.thecatapi.com/v1/breeds';
// axios.defaults.headers.common["x-api-key"] = 'live_LvFy4yYYCNd4yVpvWYbla3SLSuX17j7Lz7OHydyrhv9o5DJ8HR0V5VwLlZGdWh1I';

// fetch.getJSON(URL, function (data) {
//     if (parseInt(data.totalHits) > 0)
//     fetch.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
// else
//     console.log('No hits');
// });

// 	var API_KEY = '30904237-89ef4380cd88db989fbe73792';
// var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent('red roses');
// $.getJSON(URL, function(data){
// if (parseInt(data.totalHits) > 0)
//     $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
// else
//     console.log('No hits');
// });


// const fetchUsers = async () => {
//   try {
//     const response = await fetch(`${baseUrl}?key=${API_KEY}&q=${searchImage}&image_type=${imageType}&orientation=${photoOrientation}&safesearch=${safeSearch}&page=${StartingPage}&per_page=${perPage}`);
//     const photos = await response.json();
//     console.log(photos);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// fetchUsers();
