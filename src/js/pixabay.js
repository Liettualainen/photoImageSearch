const axios = require('axios').default;
const baseUrl = "https://pixabay.com/api/";
const API_KEY = '30904237-89ef4380cd88db989fbe73792';

const imageType = "photo";
const photoOrientation = "horizontal";
const safeSearch = true;
const perPage = "6";

const fetchSearchPhotos = async (searchImage, StartingPage) => {
  try {
    const response = await axios.get(
    `${baseUrl}?key=${API_KEY}&q=${searchImage}&image_type=${imageType}&orientation=${photoOrientation}&safesearch=${safeSearch}&page=${StartingPage}&per_page=${perPage}`
    );
    return response.data;
   }
  catch  (error) {
    console.error(error);
}
}

export { fetchSearchPhotos }
