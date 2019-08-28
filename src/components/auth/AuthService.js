import { Aurelia, inject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

 @inject(Aurelia, HttpClient)
export default class AuthService {
   constructor(aurelia, httpClient) {
     this.httpClient = httpClient;
     this.app = aurelia;
   }

   async login(user, passwd) {
     const response = await this.httpClient.fetch('login', {
       method: 'POST',
       body: json({
         username: user,
         password: passwd
       })
     });
     const data = await response.json();
     localStorage.setItem('userToken', data.token);
     localStorage.setItem('username', data.username);
     return data;
   }

   async signup(user, passwd) {
     const response = await this.httpClient.fetch('signup', {
       method: 'POST',
       body: json({
         username: user,
         password: passwd
       })
     });
     const data = await response.json();
     return data;
   }

   logout() {
     localStorage.clear();
     this.app.setRoot('auth');
   }

   isAuthenticated() {
     const token = localStorage.getItem('userToken');
     return token !== null;
   }
 }
