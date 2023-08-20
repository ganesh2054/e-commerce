import {saveToStorage } from '../../helper/local-storage'
import { CartType} from '../../type/type'

const addToCart = async (product:CartType) => {
  try {
   saveToStorage('cart',product)
  } catch (err) {
    throw new Error(err)
  }
}


export { addToCart }
