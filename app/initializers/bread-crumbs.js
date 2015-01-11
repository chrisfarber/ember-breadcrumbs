export default {
  name: "ember-breadcrumbs",
  initialize: function(container, app) {
    app.inject("component:bread-crumbs", "router", "router:main");
    app.inject("component:bread-crumbs", "applicationController", "controller:application");
  }
};
