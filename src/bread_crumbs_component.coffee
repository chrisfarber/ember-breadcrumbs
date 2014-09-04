defaultTemplate = """
{{#each crumb in breadCrumbs}}
<li {{bind-attr class="crumb.isCurrent:current:"}}>
  {{#if crumb.linkable}}
    {{#link-to crumb.path}}
      {{crumb.name}}
    {{/link-to}}
  {{else}}
    {{crumb.name}}
  {{/if}}
</li>
{{/each}}
"""

BreadCrumbs.BreadCrumbsComponent = Ember.Component.extend
  tagName: "div"
  classNames: ["breadcrumbs"]

  layout: Ember.Handlebars.compile defaultTemplate

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
      crumbName  = controller.get "breadCrumb"
      crumbNames = controller.get "breadCrumbs"

      defaultPath = defaultPaths[index]

      if !Ember.isEmpty crumbName
        specifiedPath = controller.get "breadCrumbPath"
        breadCrumbs.addObject
          name: crumbName
          path: specifiedPath || defaultPath
          linkable: (specifiedPath != false)
          isCurrent: false
      if !Ember.isEmpty crumbNames
        crumbNames.forEach (obj) ->
          name = obj[0]
          path = obj[1]

          breadCrumbs.addObject
            name: name
            path: path || defaultPath
            linkable:(path != undefined)
            isCurrent: false


    deepestCrumb = breadCrumbs.get "lastObject"
    if deepestCrumb
      deepestCrumb.isCurrent = true

    breadCrumbs
  ).property "controllers.@each.breadCrumb", "controllers.@each.breadCrumbs", "controllers.@each.breadCrumbPath", "pathNames.[]"
