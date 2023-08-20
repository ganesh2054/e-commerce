import endpoints from '../endpoint/endpoints'
import { BASE_URL } from '../constant'

const products = async () => {
  try {
    const response = await fetch(BASE_URL+endpoints.product.getAllProduct,{
        method:'get',
        headers: {
            'Content-Type': 'application/json',
          },
    })
    const data=await response.json()
    const product=data.products
    return product
  } catch (err) {
    throw new Error(err)
  }
}

export { products }
