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
      var crumbName = controller.get("breadCrumb");
      if (!Ember.isEmpty(crumbName)) {
        var defaultPath = defaultPaths[index];
        var specifiedPath = controller.get("breadCrumbPath");
        return breadCrumbs.addObject({
          name: crumbName,
          path: specifiedPath || defaultPath,
          linkable: specifiedPath !== false,
          isCurrent: false
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
