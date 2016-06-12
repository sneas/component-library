An easy way to create HTML component library for your project.

## Motivation

Most of web projects consist of components. It could be simple basic components like texts, icons, buttons or form inputs. Or it could be complex components like video player, sophisticated inputs (i.e. typeahead), menus, popovers, etc.
Any large project reaches a certain point when it's hard to remember and control all the pages and it's components.
Component library has been created as a special place to store and manage all the components of the web site in one place.

Requirements:
* easy to install
* easy to manage components
* easy add into existing build process

## Installation

```bash
npm install component-library
```

## Demo

```bash
cd component-library
npm start
```

## Integration with build process

As a reference I've used Gulp but it's easy to add components library into any build process.

```javascript
var gulp = require('gulp'),
    componentLibrary = require('component-library');

gulp.task('cl', function() {
    componentLibrary({
        templatesDir: '/project/templates/dir',
        outputDir: '/project/component-library/public',
        baseUrl: '/component-library/',
        js: [
            //List of your project's JS files goes here
            '/project/js/file.js'
        ],
        css: [
            //List of your project's CSS files goes here
            '/project/css/file.css'
        ]
    });
});

gulp.task('cl:watch', ['cl'], function() {
    gulp.watch(['/project/templates/dir'], ['cl']);
});
```

## License

(MIT License)

Copyright (c) 2016 Dima Snisarenko snisarenkodima@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.