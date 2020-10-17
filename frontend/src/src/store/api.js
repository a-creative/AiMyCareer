const API_BASE_ADDRESS = 'http://localhost:5002/api';
export default class Api {
   static getPostings() {
       const uri = API_BASE_ADDRESS + "/job_postings";
       return fetch(uri, {
           method: 'GET'
       });
   }
}