// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Gridsome',
  template:{
    Doc: 'blog/:slugs'
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
      use: `gridsome-plugin-netlify-cms`,
      options: {
        publicPath: `/10fsdftfah4axdghwdsza/admin`
      }
    },
    
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'blog/**/*.md',
        typeName: 'Doc',
        remark: {
          plugins: [
            '@gridsome/remark-prismjs'
          ]
        }
      }
    }
  ],
}
