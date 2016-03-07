# ember-breadcrumbs changelog

### 0.1.9

- [Bugfix] Default paths work again

### 0.1.8

- [Bugfix] Fix behavior of linkable, see issue #35
- [Bugfix] Avoid deprecation warnings, #42

### 0.1.7

- [Bugfix] Compatibility with Glimmer/Ember 1.13
- [Bugfix] Add tmp dir to npmignore
- [Bugfix] Don't depend on Ember extending prototypes

### 0.1.6

- [Bugfix] Revert 0.1.5. The attempted fix caused other problems, see issue #27.

### 0.1.5

- [Enhancement] Avoid triggering spurious deprecation warnings

### 0.1.4

- [Bugfix] Remove erroneous "main" entry in package.json.

### 0.1.3

- [Bugfix] Fix bug introduced in 0.1.2 that caused the addon to observe the Ember.Route's controller property.

### 0.1.2

- [Enhancement] Add support for having a single controller provide multiple breadcrumbs.

### 0.1.1

- [Enhancement] Improve ability to customize breadcrumbs template: no longer require reopening the component class.

### 0.1.0

- Converted to ember-cli addon
