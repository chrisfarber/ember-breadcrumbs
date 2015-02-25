import Ember from "ember";

export default Ember.Component.extend({
  router: null,
  applicationController: null,

  handlerInfos: (function() {
    return this.get("router").router.currentHandlerInfos;
  }).property("applicationController.currentPath"),

  pathNames: Ember.computed.mapBy("handlerInfos", "name"),
  controllers: Ember.computed.mapBy("handlerInfos", "handler.controller"),

  breadCrumbs: (function() {
    var controllers = this.get("controllers");
    var defaultPaths = this.get("pathNames");
    var breadCrumbs = [];

    controllers.forEach(function(controller, index) {
      var crumbs = controller.get("breadCrumbs");
      if (!Ember.isEmpty(crumbs)) {
        crumbs.map(function(crumb) {
          if (Ember.typeOf(crumb) !== 'object') crumb = {label: crumb};
          breadCrumbs.push(Ember.Object.create({
            label: crumb.label,
            path: crumb.path || defaultPaths[index],
            model: crumb.model,
            linkable: !Ember.isNone(crumb.linkable) ? crumb.linkable : true,
            isCurrent: false
          }));
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
