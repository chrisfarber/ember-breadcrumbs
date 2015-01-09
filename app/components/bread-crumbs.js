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
      var crumb, crumbs, linkable, _i, _len, _results;
      crumbs = controller.get("breadCrumbs");
      if (!Ember.isEmpty(crumbs)) {
        _results = [];
        for (_i = 0, _len = crumbs.length; _i < _len; _i++) {
          crumb = crumbs[_i];
          if (Ember.typeOf(crumb) !== 'object') {
            crumb = {
              label: crumb
            };
          }
          linkable = crumb.linkable != null ? crumb.linkable : true;
          _results.push(breadCrumbs.addObject({
            label: crumb.label,
            path: crumb.path || defaultPaths[index],
            model: crumb.model,
            linkable: linkable,
            isCurrent: false
          }));
        }
        return _results;
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
