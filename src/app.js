import { PLATFORM } from 'aurelia-pal';
import { HttpClient } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import AuthService  from './components/auth/AuthService';
import { DialogService } from 'aurelia-dialog';
import { Prompt } from './components/dialog/prompt';


const PORT = 2000;

@inject(HttpClient, AuthService, DialogService)
export class App {
  constructor(httpClient, authService, dialogService) {
    this.httpClient = httpClient;
    this.authService = authService;
    this.dialogService = dialogService;

    this.httpClient.configure(config => {
      config
        .useStandardConfiguration()
         .withBaseUrl(`http://localhost:${PORT}/api/`)
        //.withBaseUrl('http://cadet.todo.partdp.ir/api/')
        .withDefaults({
          credentials: 'same-origin',
          headers: {
            'X-Requested-With': 'Fetch'
          }
        })
        .withInterceptor({
          request(message) {
            console.log('message');
            console.log(message);
            message.headers.append('Authorization', `Bearer ${localStorage.getItem('userToken')}` );
            return message;
          },
          responseError(response) {
            if (response.status === 401) {
              console.log(`Stuatus Code: ${response.status}, Unauthorized Access`);
              authService.logout();
            } else {
              console.log(`Error: Stuatus Code: ${response.status}`);
            }
            return response;
          }
        });
    });
  }

  attached() {
    this.username = localStorage.username;
  }

  configureRouter(config, router) {
    config.title = 'Todo Web App';

    const handleUnknownRoutes = (instruction) => {
      return { route: 'not-found', moduleId: PLATFORM.moduleName('./not-found') };
    };
    config.mapUnknownRoutes(handleUnknownRoutes);

    config.addAuthorizeStep(AuthStep);
    config.map([
      {
        route: ['', 'dashboard' ],
        name: 'dashboard',
        moduleId: PLATFORM.moduleName('./components/dashboard/dashboard'),
        nav: true,
        title: 'Dashboard'
      },
      {
        route: 'boards',
        name: 'boards',
        moduleId: PLATFORM.moduleName('./components/boards/boards'),
        nav: true,
        title: 'Boards'
      },
      {
        route: 'todos',
        name: 'todos',
        moduleId: PLATFORM.moduleName('./components/todos/todos'),
        nav: true,
        title: 'Todos'
      }
    ]);

    this.router = router;
    config.fallbackRoute('');
  }

  clickHandler(hrefFromView) {
    window.location.href = hrefFromView;
  }

  logout() {
    this.dialogService.open({
      viewModel: Prompt,
      model: 'Are you sure you want to logout?',
      overlayColor: 'black',
      overlayOpacity: '.25',
      lock: false
    })
      .whenClosed(response => {
        console.log(response);
        if (!response.wasCancelled) {
          response.output = 'Accepted';
          this.authService.logout();
        } else {
          response.output = 'Cancelled';
        }
        console.log(response.output);
      });
  }
}

class AuthStep {
  run(navigationInstruction, next) {
    if (navigationInstruction.getAllInstructions().some(i => i.config.settings.auth)) {
      const isLoggedIn = authService.isAuthenticated();
      if (!isLoggedIn) {
        return next.cancel(new Redirect(PLATFORM.moduleName('auth')));
      }
    }

    return next();
  }
}
