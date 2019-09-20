export default {
  name: "ember-breadcrumbs",
  initialize: function() {
    let application = arguments[1] || arguments[0];
    application.inject("component:bread-crumbs", "router", "router:main");
    application.inject("component:bread-crumbs", "routerService", "service:router");
  }
};
