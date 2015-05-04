Pattern Presenter Gulp Tasks
---
---

Contains [Gulp](http://gulpjs.com) tasks which can be used to perform functions for the pattern presenter.

## Basic Usage

```
// gulpfile.js
var someTaskName = require('pattern-presenter').gulpSomeTaskName(optionsObject);
```

## Gulp Task: `watch-patterns`

Gulp task which sets up a watch (using [gulp-watch](https://www.npmjs.com/package/gulp-watch)) for a set of user-owned, local, non-compiled patterns.

### Usage

In your `gulpfile.js`, in the requires at the top:
```
var options = {
	localPatternFiles: ['./relative/path/to/local/patterns','./some/other/pattern/directory']
}
var importPatterns = require('pattern-presenter')).gulpWatchPatterns(options)
```

### Options

```
  var options = {
    localPatternFiles: ['./app/patterns-local/**/*','./app/templates'],
    patternImporterOptions: patternImporterUtils.getOptions()
  }
```

#### localPatternFiles

project-relative path to sets of un-compiled patterns

#### patternImporterOptions

options for the [pattern-importer](https://github.com/scottnath/pattern-importer)