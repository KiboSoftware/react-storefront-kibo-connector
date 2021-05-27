import get from 'lodash/get'
import colors from '../util/colors'
import { Product } from '../types/ProductPageData'
import Media from 'react-storefront-connector/Media';


const ratingAttrFQN = `tenant~rating`
const colorAttrFQN = `tenant~color`
const sizeAttrFQN = `tenant~size`

const mapImage = (image): Media => ({
        src: image.imageUrl,
        alt: image.imageLabel,
        type: "image"
});

const mapMedia = (images = []) => images.map(i => mapImage(i))

function mapColorOptions (product, variantProduct){

    const options = get(product, 'options', [])
    const colorOptions = options.find(opt => opt.attributeFQN === colorAttrFQN)
    if(!colorOptions) {
        return
    }
    let imageSet
    if(variantProduct) {
        imageSet = get(variantProduct, 'productImages', [])
    } else {
        imageSet = get(product, 'content.productImages', [])
    }
    const images = mapMedia(imageSet)
    return colorOptions.values.map(colorOpt => {
        let { value, stringValue="" } = colorOpt
        let hexColor = colors[stringValue.toLowerCase()]?.background
        return {
            id: value,
            text: value || stringValue,
            image: {
              alt: stringValue,
              src: `https://via.placeholder.com/48x48/${ hexColor && hexColor.replace('#', '')}`,
            },
            media: {
              thumbnails: images,
              thumbnail: images[0],
              full: images
            }
       }
    })
}
function mapSizeOptions (product){
    const options = get(product, 'options', [])
    const sizeOption = options.find(option => option.attributeFQN === sizeAttrFQN)
    if(!sizeOption) {
        return
    }
    return sizeOption.values.map(sizeOption => {
        let { value, stringValue } = sizeOption
        return {
            id: value,
            text: value || stringValue
        }
    })
}
function getSpecsHtml(product) {  
    const specs = attributesToSpecs(product)
    return specs.map(spec => `<b>${spec.name}:</b> ${[...spec.values]}`).join('<br/>')
}
function attributesToSpecs(product){
    const properties = get(product, 'properties', [])
    const visibleAttrs = properties.filter(attr => !attr.isHidden)

    return visibleAttrs.map(attr => {
        let name = attr?.attributeDetail?.name
        let values = get(attr, 'values', []).map(val => val.stringValue || val.value)
        return { name, values }
    })
}
function getRating(product) {
    const properties = get(product, 'properties', [])
    const ratingAttribute = properties.find(attr => attr.attributeFQN === ratingAttrFQN)
    let rating = 0 
    if(!ratingAttribute) {
        return rating
    }
    rating = ratingAttribute?.values[0]?.value || rating
    return rating
}
function getPriceFromRange({upper, lower}) {
    const upperRangePrice = upper.salePrice || upper.price
    const lowerRangePrice = lower.salePrice || lower.price
    const price = upperRangePrice
    const priceText = `$${lowerRangePrice.toFixed(2)} - $${upperRangePrice.toFixed(2)}`
    return { price, priceText }
}
function getPrice(product, variantProduct) {

    if(!variantProduct && product.priceRange) {
        console.log(product.priceRange)
        return getPriceFromRange(product.priceRange)
    }
    // use variant price first, if exists
    const { salePrice, price } = get(variantProduct || product, 'price', {})
    const producePrice = salePrice || price
    const priceText = `$${producePrice.toFixed(2)}`

    return { priceText, price: producePrice }
}
function normalizeProduct(rawData): Product {
    
    const product = get(rawData, 'data.product', {})

    // check for configured variant product
    const variantProduct = get(rawData, 'data.configureProduct', null)
    const { price, priceText } = getPrice(product, variantProduct)
    const { productCode } = product;
    const content = get(product, 'content', {})

    const { productImages } = content
    const isConfigurableProduct = get(product, 'productUsage', '') === 'Configurable'

    let colors, sizes
    if(isConfigurableProduct) {
        colors = mapColorOptions(product, variantProduct)
        sizes = mapSizeOptions(product)
    }
    return {
        isConfigurableProduct,
        colors,
        sizes,
        price,
        priceText,
        id: productCode,
        reviewsKey: productCode,
        sku: productCode,
        url: `/p/${productCode}`,
        name: get(content, "productName", ""),
        description: get(content, "productFullDescription", ""),
        rating: getRating(product),
        thumbnail: mapImage(productImages[0]),
        media: {
            full: mapMedia(productImages),
            thumbnails: mapMedia(productImages)
        },
        specs: getSpecsHtml(product),
      }
}

export default normalizeProduct