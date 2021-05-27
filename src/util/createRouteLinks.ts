import Link from "react-storefront-connector/Link"

const createCategoryLink = (text, slugs=[]): Link => {
    const urlSlug = slugs.filter(slug => slug).join('/')
    return {
        text,
        as: `/s/${urlSlug}`,
        href:`/s/[...categorySlugs]`
    }
}

export {
    createCategoryLink
}
