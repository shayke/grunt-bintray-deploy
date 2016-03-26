# Grunt Bintray Deploy

> This is a [grunt](https://github.com/gruntjs/grunt) task for uploading your project to [Bintray](https://bintray.com).
Bintray is a free social service for easy OSS software packages distribution.
Bintray offers developers the fastest way to publish and consume OSS software releases. Whether you are distributing software packages or downloading ones.
Click [here](https://bintray.com/howbintrayworks) for more information

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

## The "bintrayDeploy" task

### Overview
In your project's Gruntfile, add a section named `bintrayDeploy` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  bintrayDeploy: {
    bintray: {
      options: {
        user: "bintray_user",
        apikey: "bintray_api_key",
        pkg: {
          repo: "repo",
        }
      },
      files: [{
        expand: true,
        flatten: true,
        src: ["dist/*.js"],
        dest: "<%= pkg.version %>",
        filter: "isFile"
      }]
    }
  },
})
```

### Options

#### options.user
Type: `String`

Your Bintray username, **mandatory**.

#### options.apikey
Type: `String`

Your Bintray API Key, used to communicate and publish files, **mandatory**.

#### options.pkg.repo
Type: `String`

The repository in Bintray to upload files to, **mandatory**.

#### options.pkg.userOrg
Type: `String`
Default value: `options.user`

An optional different organization/user name to deploy the files to.

#### options.pkg.name
Type: `String`
Default value: `The project's name from your package.json file`

An optional different package name (created automatically if not existed in Bintray) to deploy the files to.

#### options.pkg.version
Type: `String`
Default value: `The project's version from your package.json file`

An optional different package version (created automatically if not existed in Bintray) to deploy the files to.

#### options.pkg.desc
Type: `String`
Default value: `Automatically created GruntJS package`

An optional package description in case of auto creation by the plugin.

#### options.pkg.licenses
Type: `Array of strings`
Default value: `["MIT"]`

An optional package licenses in case of auto creation by the plugin.

#### options.pkg.labels
Type: `Array of strings`

An optional package labels in case of auto creation by the plugin.

#### options.publish
Type: Boolean

Publish the files after uploading

### Usage Examples

#### Default Options
In this example, the default options are used for publication, the package name and version will get auto created in Bintray with values from the project's package.json file.
All *.js files located in the project's dist directory will get uploaded under the project's version directory.

```js
grunt.initConfig({
  bintrayDeploy: {
    bintray: {
      options: {
        user: "bintray_user",
        apikey: "bintray_api_key",
        pkg: {
          repo: "repo",
        }
      },
      files: [{
        expand: true,
        flatten: true,
        src: ["dist/*.js"],
        dest: "<%= pkg.version %>",
        filter: "isFile"
      }]
    }
  },
})
```

#### Custom Options
In this example, we are using custom properties and override the default ones.

```js
grunt.initConfig({
  bintrayDeploy: {
    bintray: {
      options: {
        user: "bintray_user",
        apikey: "bintray_api_key",
        pkg: {
          repo: "repo",
          userOrg: "someOrganization",
          name: "packageName",
          version: "pacakgeVersion",
          desc: "A cool package description",
          licenses: ["Apache2"],
          labels: ["cool", "package"]
        }
      },
      files: [{
        expand: true,
        flatten: true,
        src: ["dist/*.js"],
        dest: "<%= pkg.version %>",
        filter: "isFile"
      }]
    }
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 2013-10-19   v0.1.0   First release
