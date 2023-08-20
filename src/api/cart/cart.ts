import { getFromStorage } from '../../helper/local-storage'

const cart = async () => {
  try {
    const response = getFromStorage('cart')
    return response
  } catch (err) {
    throw new Error(err)
  }
}

export { cart }
