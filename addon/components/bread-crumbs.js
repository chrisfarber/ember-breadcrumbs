import Ember from "ember";

export default Ember.Component.extend({
  router: null,
  applicationController: null,

  handlerInfos: Ember.computed("applicationController.currentPath", function() {
    return this.get("router").router.currentHandlerInfos;
  }),

  /*
    For the pathNames and controllers properties, we must be careful not to NOT
    specify the properties of the route in our dependent keys.

    Observing the controller property of the route causes some serious problems:
    https://github.com/chrisfarber/ember-breadcrumbs/issues/21
  */

  pathNames: Ember.computed("handlerInfos.[]", function() {
    return this.get("handlerInfos").map(function(handlerInfo) {
      return handlerInfo.name;
    });
  }),

  controllers: Ember.computed("handlerInfos.[]", function() {
    return this.get("handlerInfos").map(function(handlerInfo) {
      return handlerInfo.handler.controller;
    });
  }),

  breadCrumbs: Ember.computed("controllers.@each.breadCrumbs",
    "controllers.@each.breadCrumb",
    "controllers.@each.breadCrumbPath",
    "controllers.@each.breadCrumbModel",
    "pathNames.[]", function() {
    var controllers = this.get("controllers");
    var defaultPaths = this.get("pathNames");
    var breadCrumbs = Ember.A([]);

    controllers.forEach(function(controller, index) {
      var crumbs = controller.get("breadCrumbs") || Ember.A([]);
      var singleCrumb = controller.get("breadCrumb");

      if (!Ember.isBlank(singleCrumb)) {
        crumbs.push({
          label: singleCrumb,
          path: controller.get("breadCrumbPath"),
          model: controller.get("breadCrumbModel"),
        });
      }

      crumbs.forEach(function (crumb) {
        breadCrumbs.addObject(Ember.Object.create({
          label: crumb.label,
          path: crumb.path || defaultPaths[index],
          model: crumb.model,
          linkable: Ember.isPresent(crumb.linkable) ? crumb.linkable : crumb.path !== false,
          isCurrent: false
        }));
      });
    });

    var deepestCrumb = Ember.get(breadCrumbs, "lastObject");
    if (deepestCrumb) {
      deepestCrumb.isCurrent = true;
    }

    return breadCrumbs;
  })
});
