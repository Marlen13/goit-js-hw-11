import axios from 'axios';
import Notiflix from 'notiflix';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '37030497-adb1b30a9790add5f50421470';
export async function fetchImages(q, page) {
  try {
    const { data } = await axios(
      `?key=${API_KEY}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
    );
    if (data.hits.length === 0) { 
      
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    }
    console.log(data);
    return data;
  } catch (error) {
 console.log(error)
  }
}
