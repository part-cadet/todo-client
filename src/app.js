import { PLATFORM } from 'aurelia-pal';
import { HttpClient } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
const PORT = 3000;

@inject(HttpClient)
export class App {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  attached() {
    this.httpClient.configure(config => {
      config
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
  }

  configureRouter(config, router) {
    config.title = 'Todo Web App';

    const handleUnknownRoutes = (instruction) => {
      return { route: 'not-found', moduleId: PLATFORM.moduleName('./not-found') };
    };
    config.mapUnknownRoutes(handleUnknownRoutes);

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
      },
      {
        route: ['auth' ],
        name: 'dashboard',
        moduleId: PLATFORM.moduleName('./components/auth/auth'),
        nav: true,
        title: 'Auth'
      }
    ]);

    this.router = router;
    config.fallbackRoute('');
  }

  clickHandler(hrefFromView) {
    window.location.href = hrefFromView;
  }
}
