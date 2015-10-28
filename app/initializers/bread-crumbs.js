export default {
  name: "ember-breadcrumbs",
  initialize: function() {
    //pre 2.x
    if(arguments.length > 1) {
      arguments[1].inject("component:bread-crumbs", "router", "router:main");
      arguments[1].inject("component:bread-crumbs", "applicationController", "controller:application");  
    } else {
      arguments[0].inject("component:bread-crumbs", "router", "router:main");
      arguments[0].inject("component:bread-crumbs", "applicationController", "controller:application");  
    }
  }
};
