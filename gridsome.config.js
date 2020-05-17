// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Gridsome',
  siteUrl: 'https://okakyo.myvnc.com',
  template:{
    Doc: '/blog/:slugs',
  },
  transformers: {
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
      plugins: [
        
      ]
    }
  },

  plugins: [
    'gridsome-plugin-pug' ,
    {
      use: 'gridsome-plugin-purgecss',
      // default options, the following will be included if you don't provide anything
      options: {
        content: [
          './src/**/*.vue',
          './src/**/*.js',
          './src/**/*.jsx',
          './src/**/*.md',
          './node_modules/vuetify/dist/vuetify.js',
          'node_modules/prismjs/**/*.js'
        ],
        defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
        whitelist: ['v-application', 'v-application--wrap'],
        whitelistPatterns: [/^v-((?!application).)*$/, /^theme--*/, /.*-transition/],
        whitelistPatternsChildren: [/^v-((?!application).)*$/, /^theme--*/]
      }
    },
    {
      use: `gridsome-plugin-netlify-cms`,
      options: {
        publicPath: `/admin`
      }
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        cacheTime: 600000, // default
        exclude: [],
        config: {
          '/blog/*': {
            changefreq: 'weekly',
            priority: 0.5
          },
          '/tag/*':{
            changefreq: 'weekly',
            priority: 0.4
          },
          '/article/*':{
            changefreq: 'weekly',
            priority: 0.6
          },
          '/':{
            changefreq:'monthly',
            priority: 0.7
          },
        }
      }
    },
    
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'blog/**/*.md',
        route: "/article/:slugs",
        typeName: 'Doc',
        refs: {
          tags: {
            typeName: "tagPage",
            route: "/tag/:id",
            create: true
          }
        },
        remark: {
          plugins: [
            '@gridsome/remark-prismjs',
            [ '@noxify/gridsome-plugin-remark-embed', {
              'enabledProviders' : ['Youtube', 'Twitter', 'Gist'],
          }]
          ]
        }
      }
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'UA-137860602-2'
      }
    }
  ],
}
