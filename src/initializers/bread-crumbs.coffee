initializer =
  name: "ember-breadcrumbs"
  initialize: (container, app) ->
    app.inject "component:bread-crumbs", "router", "router:main"
    app.inject "component:bread-crumbs", "applicationController", "controller:application"

`export default initializer`
