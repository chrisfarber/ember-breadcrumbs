import { isBlank, isPresent } from '@ember/utils';
import { A } from '@ember/array';
import EmberObject, { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  router: null,
  applicationController: null,

  handlerInfos: computed("applicationController.currentPath", function() {
    var router = this.get("router")._routerMicrolib || this.get("router").router;
    return router.currentHandlerInfos;
  }),

  /*
    For the pathNames and controllers properties, we must be careful not to NOT
    specify the properties of the route in our dependent keys.

    Observing the controller property of the route causes some serious problems:
    https://github.com/chrisfarber/ember-breadcrumbs/issues/21
  */

  pathNames: computed("handlerInfos.[]", function() {
    return this.get("handlerInfos").map(function(handlerInfo) {
      return handlerInfo.name;
    });
  }),

  controllers: computed("handlerInfos.[]", function() {
    return this.get("handlerInfos").map(function(handlerInfo) {
      return handlerInfo.handler.controller;
    });
  }),

  breadCrumbs: computed("controllers.@each.breadCrumbs",
    "controllers.@each.breadCrumb",
    "controllers.@each.breadCrumbPath",
    "controllers.@each.breadCrumbModel",
    "pathNames.[]", function() {
    var controllers = this.get("controllers");
    var defaultPaths = this.get("pathNames");
    var breadCrumbs = A([]);

    controllers.forEach(function(controller, index) {
      var crumbs = controller.get("breadCrumbs") || A([]);
      var singleCrumb = controller.get("breadCrumb");

      if (!isBlank(singleCrumb)) {
        crumbs.push({
          label: singleCrumb,
          path: controller.get("breadCrumbPath"),
          model: controller.get("breadCrumbModel"),
        });
      }

      crumbs.forEach(function (crumb) {
        breadCrumbs.addObject(EmberObject.create({
          label: crumb.label,
          path: crumb.path || defaultPaths[index],
          model: crumb.model,
          linkable: isPresent(crumb.linkable) ? crumb.linkable : crumb.path !== false,
          isCurrent: false
        }));
      });
    });

    var deepestCrumb = get(breadCrumbs, "lastObject");
    if (deepestCrumb) {
      deepestCrumb.isCurrent = true;
    }

    return breadCrumbs;
  })
});
