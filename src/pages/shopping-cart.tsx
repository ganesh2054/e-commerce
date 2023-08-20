import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from '../features/cartSlice';
import { getCart } from '../features/cartSlice';
import { CartItemType} from '../type/type';
import CartItem from '../components/cart-item';
import { Link } from 'react-router-dom';
import { AppDispatch } from '../app/store';
import '../style/cart-style.css'


const ShoppingCartCard = () => {
    const dispatch:AppDispatch=useDispatch()
    const cart=useSelector(selectCart)
    // const [grandTotal,setGrandTotal]=useState(0)
    let grandTotal=0

    const [selectedItems,setSelectedItems]=useState<number[]>([])
   
    cart?.products.map((item:CartItemType)=>{
        if(selectedItems.includes(item?.id))
        {
            grandTotal=grandTotal+item.discountedPrice
        }
    })



    useEffect(()=>{
        dispatch(getCart())
    },[])

    const handleGrandTotal=(isSelected:boolean,id:number)=>{
    if(isSelected)
    {
    setSelectedItems([...selectedItems,id])
    }
    else{
        const filteredItems = selectedItems.filter(item => item!==id);
        setSelectedItems(filteredItems)
    }
    }

    return (
        <Layout>
            {
                cart?.products?.length>0?
                (<>
                    <table>
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Discount</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Remove</th>
    
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart?.products.map((item:CartItemType)=>(
                                <CartItem handleGrandTotal={handleGrandTotal} cartItem={item} />
    
                            ))
                        }
                      
                    </tbody>
                </table>
                <div style={{display:'flex',justifyContent:'flex-end',padding:'10px'}}>
                    <div style={{display:'flex',flexDirection:'column'}}>
                    <div style={{width:'200px',justifyContent:"space-between",display:"flex"}}>
                        <p>Grand Total:</p>
                        <p>${grandTotal}</p>
                    </div>
                    <button className='checkout-btn'>Checkout</button>
                    </div>
                </div>
                </>
                ):
                (
                    <div style={{color:'orange',display:'flex',justifyContent:'center'}}>
                        <div>No product added yet.</div>
                        <div>Click <Link to="/">here</Link> to add products</div>
                    </div>
                )
            }
           
        </Layout>
    );
}

export default ShoppingCartCard;
