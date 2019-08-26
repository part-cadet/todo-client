import { Aurelia, inject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
// import config from './config';
// import { crypto } from 'crypto';

// import { json } from '../../../node_modules/aurelia-fetch-client/dist/aurelia-fetch-client';
const PORT = 3000;

 @inject(Aurelia, HttpClient)
export default class AuthService {
   // As soon as the AuthService is created, we query local storage to
   // see if the login information has been stored. If so, we immediately
   // load it into the session object on the AuthService.
   constructor(aurelia, httpClient) {
     this.httpClient = httpClient;
     this.app = aurelia;

     this.httpClient.configure(http => {
       http
         .useStandardConfiguration()
         .withBaseUrl(`http://localhost:${PORT}/api/`)
         .withDefaults({
           credentials: 'same-origin',
           headers: {
             'X-Requested-With': 'Fetch'
           }
         })
         .withInterceptor({
           request(message) {
             console.log(message);
             message.headers.append('Authorization', `Bearer ${localStorage.getItem('userToken')}` );
             return message;
           }
         });
     });

     // this.session = JSON.parse(localStorage[config.tokenName] || null);
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

   can(permission) {
     return true; // why not?
   }
 }
