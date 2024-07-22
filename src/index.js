import Notiflix from 'notiflix';
import { fetchSearchPhotos } from './js/pixabay'
const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery')
const searchImage = form.elements.searchQuery;
const submitbutton = form.querySelector('[type="submit"]');
const loadMoreButton =  document.querySelector('.load-more')
let searchResult ="";

searchImage.addEventListener("input", (e) => {
    searchResult = e.target.value;
    return searchResult;
});
submitbutton.addEventListener("click", (e) => { 
    e.preventDefault();
    // console.log("button", searchResult);
    fetchImages(searchResult);
});

async function fetchImages(searchResult)
{
   try {
     const imageList = await fetchSearchPhotos(searchResult);
     console.log("totalhits",imageList.totalHits)
      Notiflix.Notify.success(
          ` Hooray! We found ${imageList.totalHits} images.`,
         {
            timeout: 3000, useIcon: true, width: '250px',
         },)
       renderImages(imageList);
   } catch (error) {
    Notiflix.Notify.failure(`❌ Oops! Something went wrong!</p>Try reloading the page!`, {
      timeout: 2000, useIcon: false, width: '250px', position: 'left-top', distance: '10px',
    }, )
     console.log(error);
    }
    form.reset();
};

function renderImages(imageList) {
    console.log("totalhits",imageList)
  const imageRender = imageList.hits.map(({ largeImageURL, previewURL, tags, likes, views, comments, downloads }) => {
    return `<div class="photo-card">
        <a class="gallery__link"  href=${largeImageURL}>
            <img
            class="photo-img"
            src=${previewURL}
            alt=${tags}
            loading="lazy"
             />
        </a>
  <div class="info">
    <p class="info-item">
      <b>Likes:</b>
      <b class="info-rearch">${likes}</b>
    </p>
    <p class="info-item">
      <b>Views:</b>
      <b  class="info-rearch">${views}</b>
    </p>
    <p class="info-item">
      <b>Comments:</b>
       <b  class="info-rearch"> ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: </b>
       <b  class="info-rearch">${downloads}</b>
    </p>
    </div>
</div>`;
  })
  loadMoreButton.style = "display: yes";

  
  gallery.innerHTML = imageRender.join(""); 

    const lightbox = new SimpleLightbox(`.gallery a`,
    {
      overlayOpacity: 0.9,heightRatio: 0.9, widthRatio: 0.9,
      captionType: "attr,",captionsData: "alt", captionPosition: 'bottom', captionDelay: 250,
     captionHTML:	true,
      scaleImageToRatio: true, scrollZoom: true, showCounter: false       
    });

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
// ✅