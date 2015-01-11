import Ember from "ember";

export default Ember.Component.extend({
  tagName: "ul",
  classNames: ["breadcrumbs"],
  router: null,
  applicationController: null,

  handlerInfos: (function() {
    return this.get("router").router.currentHandlerInfos;
  }).property("applicationController.currentPath"),

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

  breadCrumbs: (function() {
    var controllers = this.get("controllers");
    var defaultPaths = this.get("pathNames");
    var breadCrumbs = [];

    controllers.forEach(function(controller, index) {
      var crumbs = controller.get("breadCrumbs");
      if (!Ember.isEmpty(crumbs)) {
        crumbs.map(function(crumb) {
          if (Ember.typeOf(crumb) !== 'object') crumb = {label: crumb};
          breadCrumbs.push({
            label: crumb.label,
            path: crumb.path || defaultPaths[index],
            model: crumb.model,
            linkable: !Ember.isNone(crumb.linkable) ? crumb.linkable : true,
            isCurrent: false
          });
        });
      }
    });

    var deepestCrumb = breadCrumbs.get("lastObject");
    if (deepestCrumb) {
      deepestCrumb.isCurrent = true;
    }

    return breadCrumbs;
  }).property("controllers.@each.breadCrumb", "controllers.@each.breadCrumbPath", "pathNames.[]")
});
