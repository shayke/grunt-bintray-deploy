# grunt-bintray-deploy

> The best Grunt plugin ever.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-bintray-deploy --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-bintray-deploy');
```

## The "bintray_deploy" task

### Overview
In your project's Gruntfile, add a section named `bintray_deploy` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  bintray_deploy: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.separator
Type: `String`
Default value: `',  '`

A string value that is used to do something with whatever.

#### options.punctuation
Type: `String`
Default value: `'.'`

A string value that is used to do something else with whatever else.

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  bintray_deploy: {
    options: {},
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
})
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  bintrayDeploy: {
      shay: {
          options: {
              username: "<your_bintray_username>",
              apikey: "<your_bintray_apikey>",
              subject: "<organization name or username to deploy to>",
              repo: "<repo name under the subject name>"
          },
          files: [{
              expand: true,
              src: 'dist/*.js', // Grab all the JS files from the dist folder
              dest: '/', // We are deploying those file as flat to their version inside Bintray
              filter: "isFile"
              }
          ]
      }
  }
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
