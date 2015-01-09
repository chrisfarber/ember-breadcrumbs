BreadCrumbsComponent = Ember.Component.extend

  tagName: "ul"
  classNames: ["breadcrumbs"]

  router: null
  applicationController: null

  handlerInfos: (->
    handlerInfos = @get("router").router.currentHandlerInfos
  ).property "applicationController.currentPath"

  pathNames: (->
    @get("handlerInfos").map (handlerInfo) ->
      handlerInfo.name
  ).property "handlerInfos.[]"

  controllers: (->
    @get("handlerInfos").map (handlerInfo) ->
      handlerInfo.handler.controller
  ).property "handlerInfos.[]"

  breadCrumbs: (->
    controllers = @get "controllers"
    defaultPaths = @get "pathNames"

    breadCrumbs = []

    controllers.forEach (controller, index) ->
      crumbs = controller.get "breadCrumbs"
      if !Ember.isEmpty crumbs
        for crumb in crumbs
          if Ember.typeOf(crumb) != 'object' then crumb = label: crumb
          linkable = if crumb.linkable? then crumb.linkable else true
          breadCrumbs.addObject
            label: crumb.label
            path: crumb.path || defaultPaths[index]
            model: crumb.model
            linkable: linkable
            isCurrent: false

    deepestCrumb = breadCrumbs.get "lastObject"
    if deepestCrumb
      deepestCrumb.isCurrent = true

    breadCrumbs
  ).property "controllers.@each.breadCrumb", "controllers.@each.breadCrumbPath", "pathNames.[]"

`export default BreadCrumbsComponent`
