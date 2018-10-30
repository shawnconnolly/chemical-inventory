import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://chem-inventory.firebaseio.com/'
});

export default instance;