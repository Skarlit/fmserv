import axios from 'axios';

const xhr = axios.create({
    headers: {"X-Requested-With": "XMLHttpRequest"}
});

export default {
    xhr: xhr
}