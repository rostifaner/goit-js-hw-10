import axios from 'axios';

axios.defaults.baseURL = 'https://api.thecatapi.com';

const API_KEY =
  'live_QkZIj47bveTZ3Z3fHghxpohL5Vj5XdihLP707tNkysPjUSKoHgZClpi2hq9BkASf';

axios.defaults.headers.common['x-api-key'] = API_KEY;

export function fetchBreeds() {
  return axios
    .get('/v1/breeds')

    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('error', error);
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Error', error);
    });
}
