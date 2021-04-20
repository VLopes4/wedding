import axios from 'axios';
import { environment } from '../config/environments';

const api = axios.create({
    baseURL: environment.services.apiUrlProd,
});

export default api;