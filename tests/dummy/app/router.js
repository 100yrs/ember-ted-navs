import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home', {path: '/'});
  this.route('talks', function() {
    this.route('index');
    this.route('new');
  });
  this.route('users');
  this.route('conferences');
  this.route('settings');
});

export default Router;
