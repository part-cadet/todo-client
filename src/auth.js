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

  signup() {
    this.controller.validate()
      .then(result => {
        if (result.valid) {
          this.authService.signup(this.username, this.password);
        } else {
          console.log(result);
        }
      });
  }

  toggle() {
    this.show = !this.show;
  }
}

ValidationRules.customRule(
  'matchesProperty',
  (value, obj, otherPropertyName) => 
    value === null
    || value === undefined
    || value === ''
    || obj[otherPropertyName] === null
    || obj[otherPropertyName] === undefined
    || obj[otherPropertyName] === ''
    || value === obj[otherPropertyName],
  '${$displayName} must match ${$getDisplayName($config.otherPropertyName)}',
  otherPropertyName => ({ otherPropertyName })
);

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
  .satisfiesRule('matchesProperty', 'password')
  .required()
  .withMessage('\${$displayName} can\'t be blank.')
  .on(Auth);

