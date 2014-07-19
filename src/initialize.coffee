window.BreadCrumbs = Ember.Namespace.create()

Ember.onLoad "Ember.Application", (App) ->
  App.initializer
    name: "ember-breadcrumbs"
    initialize: (container, app) ->
      app.register "component:bread-crumbs", BreadCrumbs.BreadCrumbsComponent
      app.inject "component:bread-crumbs", "router", "router:main"
      app.inject "component:bread-crumbs", "applicationController", "controller:application"