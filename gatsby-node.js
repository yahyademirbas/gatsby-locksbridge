/* eslint-disable array-callback-return */
const path = require('path');

const { ensureTrailingSlash } = require('./src/util');

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allMdx {
        totalCount
        edges {
          node {
            id
            frontmatter {
              slug
              class
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }
  const artists = result.data.allMdx.edges;
  artists.forEach(({ node }) => {
    createPage({
      path: ensureTrailingSlash(node.frontmatter.slug),
      component: path.resolve(`src/templates/artists.js`),
      context: {
        artistId: node.id,
        slug: node.frontmatter.slug,
      },
    });
  });
};
