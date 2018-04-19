import axios from 'axios';
import {ENGINES_GETENGINES} from './actionTypes'; 

export const fetchEngineNodes=(id)=> {
    const urlParam = (id && id!=='' )? `/${id}`: "";
    const url = `http://demo2511271.mockable.io/engines${urlParam}`;
    //redux promise
    console.log(url);
    const request = axios.get(url);
    return {
      type: ENGINES_GETENGINES,
      payload: request,
      meta:{id}
    };
  }
  