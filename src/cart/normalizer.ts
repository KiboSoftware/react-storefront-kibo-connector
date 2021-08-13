import CartItem from 'react-storefront-connector/CartItem'
import Cart from 'react-storefront-connector/Cart'
import Media from 'react-storefront-connector/Media'
import get from 'lodash/get'

function normalizeMedia(src='', alt=''): Media {
    return { src, alt, type: "image" }
}

function normalizeCartItem(item): CartItem{

    const product = get(item, 'product', {})
    return {
        id: item.id,
        name: get(product, 'name', ''),
        quantity: get(item, 'quantity', 1),
        url: `/p/${get(product, "productCode", '')}`,
        price: get(item, 'total', 0),
        priceText: `$${get(item, 'total', 0).toFixed(2)}`,
        thumbnail: normalizeMedia(product.imageUrl, product.name)
    }
}

function normalizeCartItems(cartItems=[]):CartItem[] {
    return cartItems.map(normalizeCartItem)
}

function normalize(rawData):Cart {
    const total = get(rawData, 'data.cart.total', 0)
    const cartItemsData = get(rawData, 'data.cart.items', [])
    return {
        items: normalizeCartItems(cartItemsData)
    }
}

export default normalize