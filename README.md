An easy way to create HTML styleguide for a web project.

Demo: http://sneas.github.io/component-library/index.html

[![travis build](https://img.shields.io/travis/sneas/component-library.svg?style=flat-square&maxAge=2592000)](https://travis-ci.org/sneas/component-library)
[![version](https://img.shields.io/npm/v/component-library.svg?style=flat-square)](http://npm.im/component-library)
[![MIT License](https://img.shields.io/npm/l/component-library.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)


## Motivation

Most of web projects consist of components. It could be simple basic components like texts, icons, buttons or form inputs. Or complex components like video player, sophisticated inputs (i.e. typeahead), menus, popovers, etc.
Any large project reaches a point when it's hard to remember and control all the pages and their components.

Component library is a special place to store and manage all the HTML components of a web site in one place.

Features:
* easy to install
* easy to manage
* easy to integrate with existing project
* absence of conflicts with existing JS and CSS

## Installation

```bash
npm install component-library
```

## Integration with project

### List of components

Create an empty folder in your projects's file system and fill it with HTML files (components). One HTML file per one component.

See [demo/src/templates](demo/src/templates) as an example.

### Integration with build process

As a reference I've used Gulp but it's easy to add components library into any build system. All you need is to require component library, point it to your newly created components folder and give it links to your projects's CSS and JS files.

```javascript
var gulp = require('gulp'),
    componentLibrary = require('component-library');

gulp.task('cl', function(cb) {
    componentLibrary(
        '/project/templates/dir',
        '/project/public/component-library',
        {
            baseUrl: '/component-library/',
            favicon: {
                href: '/project/favicon.ico',
                rel: 'shortcut icon',
                type: 'image/x-icon'
            },
            js: [
                //List of your project's JS files goes here
                '/project/js/file.js'
            ],
            css: [
                //List of your project's CSS files goes here
                '/project/css/file.css'
            ]
        }
    ).then(function() {
        cb();
    }).catch(function(er) {
        cb(er);
    });
});

gulp.task('cl:watch', ['cl'], function() {
    gulp.watch(['/project/templates/dir'], ['cl']);
});
```

## FAQ
### What if my project has a custom initialization logic in layout?
Create you own layout file by copying minimum HTML required:

```html
<!DOCTYPE html>
<html>
<head></head>
<body>
    {{ content }}
</body>
</html>
```

Add your custom code to it. **NB:** You can add only the required code. All the CSS links and JS scripts will be added automatically.
Add the `layout` param to the configuration object. Example:
```javascript
var componentLibrary = require('component-library');

componentLibrary(
    '/project/component-library/templates/dir',
    '/project/public/component-library',
    {
        layout: '/project/component-library/your-layout.html',
        baseUrl: '/component-library/',
        favicon: {
            href: '/project/favicon.ico',
            rel: 'shortcut icon',
            type: 'image/x-icon'
        },
        js: [
            //List of your project's JS files goes here
            '/project/js/file.js'
        ],
        css: [
            //List of your project's CSS files goes here
            '/project/css/file.css'
        ]
    }
);
```

See [demo/src/layout.html](demo/src/layout.html) as an example.

## License

(MIT License)

Copyright (c) 2016 Dima Snisarenko snisarenkodima@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
