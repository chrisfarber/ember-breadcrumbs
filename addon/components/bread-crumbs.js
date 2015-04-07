import Ember from "ember";

function getWithoutProxy(obj, propertyName) {
  if (obj.hasOwnProperty(propertyName)) {
    return obj.get(propertyName);
  }
  return null;
}

export default Ember.Component.extend({
  router: null,
  applicationController: null,

  handlerInfos: function() {
    return this.get("router").router.currentHandlerInfos;
  }.property("applicationController.currentPath"),

  /*
    For the pathNames and controllers properties, we must be careful not to NOT
    specify the properties of the route in our dependent keys.

    Observing the controller property of the route causes some serious problems:
    https://github.com/chrisfarber/ember-breadcrumbs/issues/21
  */

  pathNames: (function() {
    return this.get("handlerInfos").map(function(handlerInfo) {
      return handlerInfo.name;
    });
  }).property("handlerInfos.[]"),

  controllers: (function() {
    return this.get("handlerInfos").map(function(handlerInfo) {
      return handlerInfo.handler.controller;
    });
  }).property("handlerInfos.[]"),

  breadCrumbs: function() {
    var controllers = this.get("controllers");
    var defaultPaths = this.get("pathNames");
    var breadCrumbs = [];

    controllers.forEach(function(controller, index) {
      var crumbs = getWithoutProxy(controller, "breadCrumbs") || [];
      var singleCrumb = getWithoutProxy(controller, "breadCrumb");

      if (!Ember.isBlank(singleCrumb)) {
        crumbs.push({
          label: singleCrumb,
          path: getWithoutProxy(controller, "breadCrumbPath"),
          model: getWithoutProxy(controller, "breadCrumbModel"),
        });
      }

      crumbs.forEach(function (crumb) {
        breadCrumbs.addObject(Ember.Object.create({
          label: crumb.label,
          path: crumb.path || defaultPaths[index],
          model: crumb.model,
          linkable: !Ember.isNone(crumb.linkable) ? crumb.linkable : true,
          isCurrent: false
        }));
      });
    });

    var deepestCrumb = breadCrumbs.get("lastObject");
    if (deepestCrumb) {
      deepestCrumb.isCurrent = true;
    }

    return breadCrumbs;
  }.property(
    "controllers.@each.breadCrumbs",
    "controllers.@each.breadCrumb",
    "controllers.@each.breadCrumbPath",
    "controllers.@each.breadCrumbModel",
    "pathNames.[]")
});

