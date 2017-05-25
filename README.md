ember-breadcrumbs
=================

An Ember.js component for adding breadcrumbs to your app.

## Installing

Installation is accomplished by using `ember-cli` addons. From within your
`ember-cli` app, do:

```
npm install --save-dev ember-breadcrumbs
```

If you have an older version of `ember-cli`, this may not work. If you're sure that your version of `ember-cli` supports addons, then you may be able to use this in lieu of upgrading:

```
npm install --save-dev ember-cli
```

But you should probably just upgrade.

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
- **breadCrumbModel**: An object that will be passed into the `{{link-to}}` helper.
  This property is optional.

If the `breadCrumb` property is not specified, then no crumb will be displayed.
Note that this means, by default, no crumbs will be displayed.

### Dynamic content in crumbs

If you find yourself needing to add some logic to change what text is displayed in
a breadcrumb (or what path it links to, or the model it provides), there is no need
to do any thing special.

Just define your `breadCrumb` property (or any other properties) as a computed property that
depends on the other information you need. Your breadcrumbs will automatically update in
realtime, thanks to Ember.

```js
  breadCrumb: Ember.computed("model.name", {
    get() {
      let modelName = this.get("model.name");
      return `Blog Post: ${modelName}`;
    }
  }),
  breadCrumbModel: Ember.computed.alias("model")
```

### Showing multiple crumbs from one controller

Sometimes you might need to display multiple breadcrumbs from the same controller.
To accomplish this, you can define the `breadCrumbs` property on your controller.

This property should be an array of objects (one object per crumb) that contain
the following attributes:
- **label**: The text to display as the bread crumb. Required.
- **path**: The path that the crumb should link to. Optional; if not specified,
  the controller's route's path will be used instead.
- **model**: An object that should be passed into `{{link-to}}`. Optional.

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

- **label**: The title of the breadcrumb.
- **path**: The path that the crumb should link to. Can pass to `link-to`.
- **model**: The model object that can be passed to `link-to`. May not be present.
- **linkable**: True unless the controller's breadCrumbPath was false.
- **isCurrent**: True for the most specific (last) bread crumb, otherwise false.

## Contributing

Some things would be nice to have:

- Black box / system tests!!
- Reimagined support for routable components, if/when that lands in Ember.

I'm also open to handing off the stewardship of this addon. I haven't been able to
give the time that this project needs.

## License

MIT License.
