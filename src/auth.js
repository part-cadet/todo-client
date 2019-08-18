import AuthService from './components/auth/AuthService';
import { ValidationControllerFactory, ValidationRules } from 'aurelia-validation';
import { BootstrapFormRenderer } from './components/bootstrap-form-renderer';
import { inject } from 'aurelia-framework';

@inject(AuthService, ValidationControllerFactory)
export class Auth {
  show = true;
  username = '';
  password = '';
  passwordRetyped = '';

  constructor(authService, controllerFactory) {
    this.authService = authService;
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
  }

  login() {
    this.controller.validate()
      .then(result => {
        if (result.valid) {
          this.authService.login(this.username, this.password);
        } else {
          console.log(result);
        }
      });
  }

  toggle() {
    this.show = !this.show;
  }
}

ValidationRules
  .ensure('username')
  .displayName('User name')
  .required()
  .withMessage('\${$displayName} can\'t be blank.')
  .ensure('password')
  .displayName('Password')
  .required()
  .withMessage('\${$displayName} can\'t be blank.')
  .ensure('passwordRetyped')
  .displayName('Password confirmation')
  .required()
  .withMessage('\${$displayName} can\'t be blank.')
  .on(Auth);

