/* eslint-disable array-callback-return */
/* eslint-disable array-callback-return */
const path = require("path");
const express = require("express");
const { ensureTrailingSlash } = require("./src/util");
exports.onCreateDevServer = ({ app }) => {
  app.use(express.static("static"));
};
const _ = require("lodash");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return graphql(`
    {
      blog: allFile {
        nodes {
          childMdx {
            id
            frontmatter {
              slug
              class
              template
            }
            internal {
              type
            }
          }
        }
      }
    }
    `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const artists = result.data.blog.nodes;

    const contentTypes = _.groupBy(artists, "childMdx.internal.type");

    _.each(contentTypes, (pages, contentType) => {
      const pagesToCreate = pages.filter(page =>
        // get pages with template field
        _.get(page, `childMdx.frontmatter.template`)
      );
      if (!pagesToCreate.length) return console.log(`Skipping ${contentType}`);

      console.log(`Creating ${pagesToCreate.length} ${contentType}`);

      pagesToCreate.forEach((page, index) => {
        createPage({
          path: ensureTrailingSlash(page.childMdx.frontmatter.slug),
          component: path.resolve(
            `src/templates/${String(page.childMdx.frontmatter.template)}.js`
          ),
          context: {
            slug: page.childMdx.frontmatter.slug,
            contentID: page.childMdx.id
          }
        });
      });
    });
  });
};
