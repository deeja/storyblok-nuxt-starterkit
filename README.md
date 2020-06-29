# A StoryBlok / Nuxt starterkit

This code HEAVILY borrows from two different repositories: 
- https://github.com/storyblok/bootstrap-nuxt-demo/
- https://github.com/storyblok/nuxtwebsite 

### Improvements in functionality to those base versions
- Update of all libraries. 
- Static site generation with payload
- Use of a vuex store

### Changes to those versions
- Moving away from SASS and Bootstrap towards Tailwind and PostCSS
- Yarn as the command interface

## Site Preview
https://nuxt-starter-kit.danbl.com/

## Getting Started

### Set up a demo site on Storyblok
First we are setting up a site that uses the base [bootstrap demo version](https://github.com/storyblok/bootstrap-nuxt-demo/)).
But don't worry; we will add our own soon.

1. Go to storyblok.com 
1. Choose _Create new space_
1. Choose _Play with a demo_ 
1. Wait for the demo to be created
1. Get the preview key 
    - `Settings -> API Keys -> Preview Key`
1. Add a preview url 
    - `Settings -> General -> Preview Urls`
    - Add `http://localhost:3000`

### Download or copy or clone the code to your own computer

If you're reading this, then I'm guessing you know how to do this.
Otherwise, learn how to [git](https://git-scm.com/) or just use the `zip` download. 

### Set the storyblok token in the nuxt.config.js

Change the `STORYBLOK_TOKEN` in the `nuxt.config.js`, or set it using an environment variable. 
```js
// NOTE: The Storyblok token should NOT be stored as a general rule. 
// Using an environment variable is a good choice
// e.g. const token = process.env.STORYBLOK_TOKEN
const STORYBLOK_TOKEN =
  process.env.STORYBLOK_TOKEN || "fRhLxFwXxMQSuteNdL1Lrwtt";
```

### Building for development

Building for dev will let you see the site on your own computer! 
You will also be able to edit and change things through the storyblok interface.

``` bash
# install dependencies
$ yarn install 

# serve with hot reload at localhost:3000
$ yarn dev

```

The static production ready version of the site is able to be run locally.

``` bash
# to build, export and then serve up the built files on http://localhost:3000
$ yarn static

# or to just build and export
$ yarn generate

# or to run each command individually 
$ yarn build --static
$ yarn export
$ yarn serve
```

There are some issues in making the static version "non-static" in edit mode via Storyblok.
These are being worked on where found. 


### Editing content
This is the part where it all comes together. 
With the site running on `http://localhost:3000`
1. Go to [storyblok.com](https://www.storyblok.com/)
1. Go to the demo space you have created. 
1. `Content -> Home`
1. Change the Preview url to the localhost option using the navigation dropdown

It should be working! If not, let me know and I'll try to help. 

### Deploying to Netlify
Deploying to [Netlify](https://www.netlify.com/) is super easy. 
Set up a webhook to keep the generated files up to date with latest content. 

1. Create a site
1. Connect your repo
1. Set the build commands 
    - Build Command: `yarn generate`
    - Folder: `dist`
1. Add the netlify __PREVIEW__ key (not public, unless you want it to be a non-editing deployment)
    - `Advanced -> STORYBLOK_TOKEN: XXXXXXXXXXXXXXXXXXX`
1. Deploy Site and verify deployment
1. Create a build webhook on Netlify `Build & Deploy -> Add build hook -> master`
1. Copy build webhook url to Storyblok `General -> Webhooks -> Story Published & Unpublished` 


## NOTES 

### How to use this kit for your own project

1. Get it running using the instructions above
1. Delete all the Storyblok pages from the demo site.    
1. Delete the all components, EXCEPT Global and Page:
    - from  Storyblok
    - from the  Components folder.
    - from the `/plugins/components.js`
1. Modify Global and Home components to the data structure you need
    - Global: Keep the header and footer sections
1. Add pages
    - Global of type Global
    - Home of type Page
1. Remove all custom styles from `assets/css/tailwind.css`

If you leave this repo as a git secondary remote, you will be able to pull in changes when they are made here.

### Tailwind
Tailwind usually purges all unused css classes within it's library on production build.
Dynamic classes must be whitelisted in the `tailwind.config.js` for this project or they will be purged by PostCSS

 https://github.com/FullHuman/purgecss-docs/blob/master/whitelisting.md





