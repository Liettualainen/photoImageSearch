import Notiflix from 'notiflix';
import { fetchSearchPhotos } from './js/pixabay'
const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery')
const searchImage = form.elements.searchQuery;
const submitbutton = form.querySelector('[type="submit"]');
let searchResult ="";

searchImage.addEventListener("input", (e) => {
    searchResult = e.target.value;
    return searchResult;
});

submitbutton.addEventListener("click", (e) => { 
    e.preventDefault();
    // console.log("button", searchResult);
    fetchImages(searchResult);
}

);

async function fetchImages(searchResult)
{
   try {
       const imageList = await fetchSearchPhotos(searchResult);
       renderImages(imageList);
       
   } catch (error) {
    Notiflix.Notify.failure(`❌ Oops! Something went wrong!</p>Try reloading the page!`, {
      timeout: 2000, useIcon: false, width: '240px', position: 'left-top', distance: '10px',
    }, )
     console.log(error);
    }
    form.reset();
};

function renderImages(imageList) {
  console.log("imagelist", imageList.hits);  
  const imageRender = imageList.hits.map(({ previewURL, tags, likes, views, comments, downloads }) => {
    
    return ` <div class="photo-card">
  <img src=${previewURL} alt=${tags} loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
    </div>
</div>`;
  })
  
     gallery.innerHTML = imageRender;
  return gallery;
}


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
