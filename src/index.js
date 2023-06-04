import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

console.log(axios);

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

axios.defaults.baseURL = 'https://pixabay.com/api/';
// const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '37030497-adb1b30a9790add5f50421470';

let pageToFetch = 0;
let queryToFetch = '';

async function fetchEvents(q, page) {
  try {
    const { data } = await axios('', {
      param: {
        key: API_KEY,
        q,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page,
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    // allert('Sorry, there are no images matching your search query. Please try again.')
  }
}
async function getEvents(q, page) {
  const data = await fetchEvents(q, page)
    .then(data => {
      console.log(data);
      if (!data.page.totalElements) {
        alert(`There are no events by keyword ${query}`);
        return;
      }
      const events = data._embedded.events;
      console.log(events);
      renderEvents(events);
      if (
        data.page.totalPages > 1 &&
        pageToFetch + 1 !== data.page.totalPages
      ) {
        button.classList.remove('unvisible');
      }
    })
    .finally(() => {
      // loader.classList.add('unvisible')
    });
}
function renderEvents(events) {
  const markup = events
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
            return `<a class="gallery-link" href="${largeImageURL}">
            <img class="gallery-img" src="${webformatURL}" alt="${tags}"></a> 
            <div class="img-container">
            <p class="img-info">${likes}</p>
            <p class="img-info">${views}</p>
            <p class="img-info">${comments}</p>
            <p class="img-info">${downloads}</p>
            </div>`;
      }
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

// form.addEventListener("submit", handleSubmit);
// function handleSubmit(event) {
//   event.preventDefault();
//   const inputValue = event.target.elements.query.value;
//   if (!inputValue.trim() || inputValue === queryToFetch) {
//     return;
//   }
//   queryToFetch = inputValue;
//   pageToFetch = 0;
//   gallery.innerHTML = "";
//   button.classList.add("unvisible");
//   getEvents(queryToFetch, pageToFetch);
// }
// button.addEventListener("click", handleLoadMore);

// function handleLoadMore() {
//   button.classList.add("unvisible");
//   pageToFetch += 1;
//   getEvents(queryToFetch, pageToFetch);
// }

// fetchUsersBtn.addEventListener("click", async () => {
//   try {
//     const users = await fetchUsers();
//     renderUserListItems(users);
//   } catch (error) {
//     console.log(error.message);
//   }
// });

// async function fetchUsers() {
//   const baseUrl = "https://jsonplaceholder.typicode.com";
//   const userIds = [1, 2, 3, 4, 5];

//   const arrayOfPromises = userIds.map(async (userId) => {
//     const response = await fetch(`${baseUrl}/users/${userId}`);
//     return response.json();
