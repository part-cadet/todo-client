 import {
  Aurelia,
  inject
} from 'aurelia-framework';
import {
  HttpClient, json
} from 'aurelia-fetch-client';
import config from './config';
// import { json } from '../../../node_modules/aurelia-fetch-client/dist/aurelia-fetch-client';
const PORT = 3000;

@inject(Aurelia, HttpClient)
export default class AuthService {
  session = null

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
          request(request) {
            return request;
          }
        });
    });

    // this.session = JSON.parse(localStorage[config.tokenName] || null);
  }

  login(user, passwd) {
    this.httpClient.fetch('login', {
      method: 'POST',
      body: json({
        username: user,
        password: passwd
      })
    })
      .then((response) => {
        console.log(response);
        return response.content;
      })
      .then((session) => {
        // Save to localStorage
        localStorage[config.tokenName] = JSON.stringify(session);

        // .. and to the session object
        this.session = session;

        // .. and set root to app.
        this.app.setRoot('app');
      });
  }

  signup(user, passwd) {
    this.httpClient.fetch('signup', {
      method: 'POST',
      body: json({
        username: user,
        password: passwd
      })
    })
      .then((response) => {
        console.log(response);
        return response.content;
      })
      .then((session) => {
        // Save to localStorage
        localStorage[config.tokenName] = JSON.stringify(session);

        // .. and to the session object
        this.session = session;

        // .. and set root to app.
      });
  }

  logout() {
    // Clear from localStorage
    localStorage[config.tokenName] = null;

    // .. and from the session object
    this.session = null;

    // .. and set root to login.
    this.app.setRoot('auth');
  }

  isAuthenticated() {
    console.log('is here');
    return this.session !== null;
  }

  can(permission) {
    return true; // why not?
  }
}
