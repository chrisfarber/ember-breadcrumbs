import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('account', {path: '/account'}, function () {
    this.route('password', {path: '/password'});
    this.route('finance', {path: '/finance'});
  });
  this.route('tools', {path: '/tools'}, function () {
    this.route('hammer', {path: '/hammer'}, function () {
      this.route('new', {path: '/new'});
    });
    this.route('screwdriver', {path: '/screwdriver'}, function () {
      this.route('new', {path: '/new'});
    });
  });
});

export default Router;
