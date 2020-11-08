require('dotenv').config({
  path: '.env',
});

module.exports = {
  siteMetadata: {
    title: `LocksBridge Artists | Classical Artist Management`,
    description: `LocksBridge is Turkey's first and leading international classical artist management company!`,
    author: `LocksBridge`,
    siteUrl: `https://locksbridge.net`,
  },
  plugins: [
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: {
        prefixes: [`/app/*`],
      },
    },
    {
      resolve: `gatsby-theme-i18n`,
      options: {
        defaultLang: `en`,
        locales: process.env.LOCALES || `en tr`,
        configPath: require.resolve(`./i18n/config.json`),
      },
    },
    {
      resolve: `gatsby-theme-i18n-react-intl`,
      options: {
        defaultLocale: `./i18n/react-intl/en.json`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    `gatsby-remark-images`,
    `gatsby-plugin-instagram-embed`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          `gatsby-remark-images`,
          {
            resolve: `gatsby-remark-embedder`,
            options: {
              customTransformers: [],
              services: {
                // The service-specific options by the name of the service
              },
            },
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'noopener noreferrer', // eslint-disable-line unicorn/prevent-abbreviations
            },
          },
          {
            resolve: 'gatsby-remark-smartypants',
            options: {
              dashes: 'oldschool',
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `artistsPages`,
        path: `${__dirname}/src/artistsPages`,
      },
    },
    'gatsby-plugin-optimize-svgs',
    `gatsby-plugin-sitemap`,
    {
      resolve: 'gatsby-plugin-react-axe',
      options: {
        showInProduction: true,
      },
    },
    'gatsby-plugin-react-helmet',
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `locksbridge-artists`,
        short_name: `lba`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#EBC900`,
        display: `minimal-ui`,
        icon: 'src/images/website-icon.png',
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: 'pixel id here',
      },
    },
    'gatsby-plugin-mdx-embed',
  ],
};
