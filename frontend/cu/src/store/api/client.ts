import axios from 'axios';
import Axios from 'axios';


const client = axios.create();

Axios.defaults.xsrfCookieName = 'csrftoken';
Axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

axios.get("/api/csrf-token/") // <- client.get("/api/token/") 요청한 쿠키를 저장한다

export default client;