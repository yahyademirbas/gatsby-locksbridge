import * as React from "react"
import Layout from "./layout"
import { LocalizedLink } from "gatsby-theme-i18n"
import { LocalizedLink as Link } from 'gatsby-theme-i18n/src/components/localized-link';

const Name = ({ name, locale }) => (
    <Layout>
        <h1>
            {name} & {locale}
        </h1>
        <p>
            <LocalizedLink to="/" paintDrip
                           duration={1}>Link to index page</LocalizedLink>
        </p>
    </Layout>
)

export default Name