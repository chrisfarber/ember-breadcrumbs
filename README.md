ember-breadcrumbs
=================

An Ember.js component for adding breadcrumbs to your app.

## Installing

You can install via the bower package `ember-breadcrumbs`. If you're using
ember-cli, you should add a line to your `Brocfile.js` that looks like:

```
app.import("bower_components/ember-breadcrumbs/dist/ember-breadcrumbs.js");
```

## Usage

To add the breadcrumbs to your app, simply throw the component into one of your
templates: `{{bread-crumbs}}`.

Don't worry about which template. It will automatically update itself as your
route changes. There are no options to provide to the component.

### Controlling crumbs

To display a bread crumb, you define properties on the controller associated
with a route. When that route (or a route nested underneath it) is active, the
bread crumb will be displayed.

The properties are:
- **breadCrumb**: The text to display. Required.
- **breadCrumbPath**: The path (e.g., `"post.edit"`) that the crumb will link
  to. This property is optional; the default will be the route's path.
- **breadCrumbData**: Optional arbitrary data you would like to attach to the
  breadcrumb item, which will be available in the template as `crumb.data`. This
  is useful if you use a custom template and want to use the data for markup
  purposes.

If the `breadCrumb` property is not specified, then no crumb will be displayed.
Note that this means, by default, no crumbs will be displayed.

## Customization

`ember-breadcrumbs` is styled, by default, for
[Foundation's Breadcrumbs](http://foundation.zurb.com/docs/components/breadcrumbs.html).

If you like, you can reopen the component and replace the layout. E.g.:

```
BreadCrumbs.BreadCrumbsComponent.reopen({
  tagName: "ul",
  classNames: ["fancy-crumbs"],
  layout: null,
  layoutName: "other-template"
});
```

## License

MIT License.
