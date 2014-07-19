BreadCrumbs.BreadCrumbsComponent = Ember.Component.extend

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
      crumbName = controller.get "breadCrumb"
      if !Ember.isEmpty crumbName
        defaultPath = defaultPaths[index]
        specifiedPath = controller.get "breadCrumbPath"
        breadCrumbs.addObject
          name: crumbName
          path: specifiedPath || defaultPath
          linkable: (specifiedPath != false)
          isCurrent: false

    deepestCrumb = breadCrumbs.get "lastObject"
    if deepestCrumb
      deepestCrumb.isCurrent = true

    breadCrumbs
  ).property "controllers.@each.breadCrumb", "controllers.@each.breadCrumbPath", "pathNames.[]"
