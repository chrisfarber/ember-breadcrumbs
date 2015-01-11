var BreadCrumbsComponent;

BreadCrumbsComponent = Ember.Component.extend({
  tagName: "ul",
  classNames: ["breadcrumbs"],
  router: null,
  applicationController: null,
  handlerInfos: (function() {
    var handlerInfos;
    return handlerInfos = this.get("router").router.currentHandlerInfos;
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
    var breadCrumbs, controllers, deepestCrumb, defaultPaths;
    controllers = this.get("controllers");
    defaultPaths = this.get("pathNames");
    breadCrumbs = [];
    controllers.forEach(function(controller, index) {
      var crumbName, defaultPath, specifiedPath;
      crumbName = controller.get("breadCrumb");
      if (!Ember.isEmpty(crumbName)) {
        defaultPath = defaultPaths[index];
        specifiedPath = controller.get("breadCrumbPath");
        return breadCrumbs.addObject({
          name: crumbName,
          path: specifiedPath || defaultPath,
          linkable: specifiedPath !== false,
          isCurrent: false
        });
      }
    });
    deepestCrumb = breadCrumbs.get("lastObject");
    if (deepestCrumb) {
      deepestCrumb.isCurrent = true;
    }
    return breadCrumbs;
  }).property("controllers.@each.breadCrumb", "controllers.@each.breadCrumbPath", "pathNames.[]")
});

export default BreadCrumbsComponent;
