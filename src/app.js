import { PLATFORM } from 'aurelia-pal';

export class App {
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
        moduleId: PLATFORM.moduleName('./dashboard'),
        nav: true,
        title: 'Dashboard'
      },
      {
        route: 'boards',
        name: 'boards',
        moduleId: PLATFORM.moduleName('./boards'),
        nav: true,
        title: 'Boards'
      },
      {
        route: 'todos',
        name: 'todos',
        moduleId: PLATFORM.moduleName('./todos'),
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
}
