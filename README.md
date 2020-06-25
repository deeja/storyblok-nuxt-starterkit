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

### Set up a demo site

#### Create a demo site
1. Go to storyblok.com 
1. Choose _Create new space_
1. Choose _Play with a demo_ 
1. Wait for the demo to be created
1. Get the preview key 
    - `Settings -> API Keys -> Preview Key`
1. Add a preview url 
    - `Settings -> General -> Preview Urls`
    - Add `http://localhost:3000`

### Set the storyblok token

Change the `STORYBLOK_TOKEN` in the `nuxt.config.js`, or set it using an environment variable. 
```js
// NOTE: The Storyblok token should NOT be stored as a general rule. 
// Using an environment variable is a good choice
// e.g. const token = process.env.STORYBLOCK_TOKEN
const STORYBLOK_TOKEN =
  process.env.STORYBLOCK_TOKEN || "fRhLxFwXxMQSuteNdL1Lrwtt";
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

### Building for production

``` bash
# generate static project
# this is the only command you will need to run if deploying to netlify, vercel, or other JAMStack style provider.
$ yarn generate # this is now an alias command for nuxt build --target static && nuxt export

# preview built static project
$ yarn serve
```

### Editing content
This is the part where it all comes together. 
With the site running on `http://localhost:3000`
1. Go to storyblock.com
1. Go to the demo space you have created. 
1. `Content -> Home`
1. Change the Preview url to the localhost option using the navigation dropdown

It should be working! If not, let me know and I'll try to help. 

### Deploying to Netlify
Deploying to Netlify is super easy. 
Set up a webhook to keep the generated files up to date with latest content. 

1. Create a site
1. Connect your repo
1. Set the build commands 
    - Build Command: `yarn generate`
    - Folder: `dist`)
1. Add the netlify __PREVIEW__ key (not public, unless you want it to be a non-editing deployment)
    - `Advanced -> STORYBLOCK_TOKEN: XXXXXXXXXXXXXXXXXXX`
1. Deploy Site and verify deployment
1. Create a build webhook on Netlify `Build & Deploy -> Add build hook -> master`
1. Copy build webhook url to Storyblok `General -> Webhooks -> Story Published & Unpublished` 





