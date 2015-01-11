ember-breadcrumbs
=================

An Ember.js component for adding breadcrumbs to your app.

## Installing

Installation is accomplished by using `ember-cli` addons. From within your
`ember-cli` app, do:

```
ember install:addon ember-breadcrumbs
```

## Usage

To add the breadcrumbs to your app, simply throw the component into one of your
templates: `{{bread-crumbs}}`.

Don't worry about which template. It will automatically update itself as your
route changes. There are no options to provide to the component.

For an example, check out the
[sample app](https://github.com/chrisfarber/ember-breadcrumbs-sample-app).

### Controlling crumbs

To display a bread crumb, you define properties on the controller associated
with a route. When that route (or a route nested underneath it) is active, the
bread crumb will be displayed.

The properties are:
- **breadCrumb**: The text to display. Required.
- **breadCrumbPath**: The path (e.g., `"post.edit"`) that the crumb will link to.
  This property is optional; the default will be the route's path.

If the `breadCrumb` property is not specified, then no crumb will be displayed.
Note that this means, by default, no crumbs will be displayed.

## Customization

`ember-breadcrumbs` is styled, by default, for
[Foundation's Breadcrumbs](http://foundation.zurb.com/docs/components/breadcrumbs.html).

Thanks to `ember-cli`'s addon support, it's now quite easy to replace this with
your own markup. Simply add a template to your project at the path:

```
app/templates/components/bread-crumbs.hbs
```

Your template can reference `breadCrumbs`, which is an array of objects containing
the following properties:

- **name**: The title of the breadcrumb.
- **path**: The path that the crumb should link to. Can pass to `link-to`.
- **linkable**: True unless the controller's breadCrumbPath was false.
- **isCurrent**: True for the most specific (last) bread crumb, otherwise false.

## License

MIT License.
