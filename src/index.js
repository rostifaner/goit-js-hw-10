import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const selectElem = document.querySelector('.breed-select');
const catOutput = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorLog = document.querySelector('.error');

showLoader();
selectElem.style.display = 'none';

fetchBreeds()
  .then(breeds => {
    selectElem.style.display = 'flex';
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      selectElem.appendChild(option);
    });
    new SlimSelect({
      select: '#breeds',
    });
  })
  .catch(error => {
    Notify.failure('Oops! Something went wrong! Try reloading the page!', {
      clickToClose: true,
    });
    console.error(error, 'Oops! Something went wrong! Try reloading the page!');
  })
  .finally(() => {
    selectElem.style.display = 'none';
    hideLoader();
  });

selectElem.addEventListener('change', handlerChange);

function handlerChange(event) {
  const selectedBreedId = event.target.value;
  showLoader();
  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      const { url, breeds } = catData[0];
      const markup = `
      <p class="cat-breeds">${breeds[0].name}</p>
    <img class="cat-img" src="${url}" alt="${breeds[0].name}" height="400">
    
    <p class="cat-desc">${breeds[0].description}</p>
    <p class="cat-temp"><span class="tem-title">Temperament:</span> ${breeds[0].temperament}</p>
    `;
      catOutput.innerHTML = markup;
    })
    .catch(error => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!', {
        clickToClose: true,
      });
      console.error(
        error,
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => {
      hideLoader();
    });
}

function showLoader() {
  loader.classList.remove('hide');
}

function hideLoader() {
  loader.classList.add('hide');
}
