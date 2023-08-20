import '../style/cart-style.css'
import { CartItemType, ProductType } from '../type/type';
import useProductById from '../api/product/getOneProduct';
import { useEffect, useState } from 'react';
import { incrementQuantity,decrementQuantity, removeItem } from '../features/cartSlice';
import { useDispatch } from 'react-redux';
import { Icon } from '@iconify/react';

interface PropType{
  cartItem:CartItemType,
  handleGrandTotal:(isSelected:boolean,id:number)=>void
}

export default function CartItem({ cartItem,handleGrandTotal }:PropType) {
  const dispatch=useDispatch()
  const { id, title, price, discountPercentage, quantity } = cartItem ?? {}
  const [product, setProduct] = useState<ProductType>()
  const [qty, setQty] = useState(0)
  const discount = (price * discountPercentage) / 100
  const priceAfterDiscount = price - discount

  useEffect(() => {
    const getProduct = async () => {
      if (id != 0) {
        const product = await useProductById(id)
        setProduct(product.data)
      }
    }
    getProduct()
    setQty(quantity)
  }, [id])

  const incrementItem = () => {
    if (product && typeof product.stock === 'number' &&product?.stock > qty) {
      const newQty = qty + 1
      const cartItem: CartItemType = {id:0,title:'',price:0,quantity:0,total:0,discountedPrice:0,discountPercentage:0}
      cartItem.id=id
      cartItem.quantity = newQty,
      cartItem.total = price * newQty,
      cartItem.discountedPrice = priceAfterDiscount * newQty
      dispatch(incrementQuantity(cartItem))
      setQty(newQty)

    }

  }
  const decrementItem = () => {
    if(qty>1)
    {    
      const newQty = qty - 1
      const cartItem: CartItemType = {id:0,title:'',price:0,quantity:0,total:0,discountedPrice:0,discountPercentage:0}
      cartItem.id=id
      cartItem.quantity = newQty,
      cartItem.total = price * newQty,
      cartItem.discountedPrice = priceAfterDiscount * newQty
      dispatch(decrementQuantity(cartItem))
      setQty(newQty)

    }

  }
  const handleRemove=()=>{
    dispatch(removeItem(id))
  }
  const handleItemSelection=(e: React.ChangeEvent<HTMLInputElement>)=>{
  if(e.target.checked)
  {
    handleGrandTotal(true,id)
  }
  else{
    handleGrandTotal(false,id)

  }
}

  return (

    <tr>
      <td><input type="checkbox"onChange={(e)=>handleItemSelection(e)} /></td>
      <td>
        <strong>{title}</strong>
        <div>{product?.description}</div>
        <div>Remaining: {product?.stock}</div>
      </td>
      <td>${price}</td>
      <td>{discountPercentage}%</td>
      <td>
        <button className="add-button" disabled={qty === 1} onClick={() => decrementItem()}>-</button>
        {qty}
        <button className="add-button" onClick={() => incrementItem()}>+</button>
      </td>
      <td >${(price * (1 - discountPercentage / 100) * qty).toFixed(2)}</td>
      <td><Icon onClick={()=>handleRemove()}  className="delete-icon" height='27' width='27' icon="ic:outline-delete" /></td>

    </tr>

  );
}