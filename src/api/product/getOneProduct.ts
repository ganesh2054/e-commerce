import endpoints from '../endpoint/endpoints'
import { BASE_URL } from '../constant'

const getProductById = async (id:number) => {
  try {
    const response = await fetch(BASE_URL+endpoints.product.getProductById.replace(":id",id.toString()),{
        method:'get',
        headers: {
            'Content-Type': 'application/json',
          },
    })
    const data=await response.json()
    return {data}
  } catch (err) {
    throw new Error()
  }
}

export default getProductById
