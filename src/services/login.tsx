import axios from 'axios';
import { urlBase } from '../defaultvalues';

export const loginService = (body: { usernameOrEmail: string; password: string }) =>
    axios.post(`${urlBase}/auth`,body);
     