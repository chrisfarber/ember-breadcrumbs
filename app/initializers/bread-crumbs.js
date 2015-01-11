var initializer;

initializer = {
  name: "ember-breadcrumbs",
  initialize: function(container, app) {
    app.inject("component:bread-crumbs", "router", "router:main");
    return app.inject("component:bread-crumbs", "applicationController", "controller:application");
  }
};

export default initializer;
