import axios from 'axios';

const client = axios.create();

client.defaults.xsrfCookieName = 'csrftoken';
client.defaults.xsrfHeaderName = 'X-CSRFToken';

client.get("/api/csrf-token/") // <- client.get("/api/token/") 요청한 쿠키를 저장한다

export default client;