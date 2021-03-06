// regenerator-runtime is to support async/await syntax in ESNext.
// If you don't use async/await, you can remove regenerator-runtime.
import 'regenerator-runtime/runtime';
import 'bootstrap';
import environment from './environment';
import '../node_modules/toastr/build/toastr.css';
// import AuthService from './components/auth/AuthService';

import { PLATFORM } from 'aurelia-pal';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'))
    .plugin(PLATFORM.moduleName('aurelia-validation'))
    .plugin(PLATFORM.moduleName('aurelia-dialog'));

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');


  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  //Uncomment the line below to enable animation.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-animator-css'));
  //if the css animator is enabled, add swap-order="after" to all router-view elements

  //Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-html-import-template-loader'));

  aurelia.start().then(() => {
    // const auth = aurelia.container.get(AuthService);
    // const root = auth.isAuthenticated() ? PLATFORM.moduleName('app') : PLATFORM.moduleName('auth');
    // aurelia.setRoot(root);
    aurelia.setRoot(PLATFORM.moduleName('app'));
  });
}
