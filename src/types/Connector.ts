import Connector from 'react-storefront-connector'
import home from '../home'
import cart from '../cart'
import addToCart from '../cart/addToCart'
import updateCartItem from '../cart/updateCartItem'
import removeCartItem from '../cart/removeCartItem'
import product from '../product'
import session from '../session'
import signIn from '../session/signIn'
import signOut from '../session/signOut'
import signUp from '../session/signUp'
import subcategory from '../subcategory'
import search from '../search'
import searchSuggestions from '../search/searchSuggestions'
import userSignIn from '../userSignIn'

export default class KiboConnector implements Connector {
  home = home
  cart = cart
  addToCart = addToCart as any
  updateCartItem = updateCartItem
  removeCartItem = removeCartItem
  product = product
  session = session as any
  signIn = signIn as any
  signOut = signOut
  signUp = signUp
  userSignIn = userSignIn
  subcategory = subcategory
  search = search
  searchSuggestions = searchSuggestions
  productSlots = null
  productSuggestions = null
  routes = null
}
