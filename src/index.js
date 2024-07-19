import Notiflix from 'notiflix';
import { fetchSearchPhotos } from './js/pixabay'
const form = document.querySelector('.search-form');
const searchImage = form.elements.searchQuery;
const submitbutton = form.querySelector('[type="submit"]');
let searchResult ="";

searchImage.addEventListener("input", (e) => {
    searchResult = e.target.value;
    return searchResult;
});

submitbutton.addEventListener("click", (e) => { 
    e.preventDefault();
    console.log("button", searchResult);
    fetchImages(searchResult);
}

);

async function fetchImages(search)
{
   try {
       const imageList = await fetchSearchPhotos(search);
       console.log("imagelist", imageList.hits);
    //    renderImages(imageList);
       
   } catch (error) {
    // Notiflix.Notify.failure(`❌ Oops! Something went wrong!</p>Try reloading the page!`, {
    //   timeout: 2000, useIcon: false, width: '240px', position: 'left-top', distance: '10px',
    // }, )
     console.log(error);
    }
    form.reset();
};

// function renderImages(cats) {
//   const catList = cats
//     .map(({ id, name }) => {
//       return `<option value=${id}>${name}</option>`;
//     }).join("\n")
//   fetchPostsInput.innerHTML = catList;
//     if (slimSelect.innerHTML !== "") {
//   const select= new SlimSelect({
//     select: document.querySelector('#slimSelect'),
//     settings: {
//     placeholderText: 'Search your cat`s feed',
//     showSearch: true,
//     searchText: 'Sorry nothing to see here',
//     searchPlaceholder: 'Search your cat`s feed',
//     searchHighlight: false,
//     closeOnSelect: true,
//     showOptionTooltips: false,
//   }})
//   }
//   return fetchPostsInput;
// }



