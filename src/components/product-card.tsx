import { Icon } from '@iconify/react';
import { CartItemType, ProductType } from '../type/type';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../features/cartSlice';
import { selectCart } from '../features/cartSlice';
import '../style/product-card-style.css';


export default function ProductCard({ product }: { product: ProductType }) {
    const dispatch = useDispatch()
    const { price, discountPercentage, thumbnail, title, id } = product ?? {}
    const discount = (price * discountPercentage) / 100
    const priceAfterDiscount = price - discount
    const cart = useSelector(selectCart)
    const productInCart = cart?.cart?.products?.some(c => c?.id === id);

    const handleAddToCart = () => {
        const cartItem: CartItemType = {}
        if (!productInCart || productInCart == undefined) {
            cartItem.id = id,
                cartItem.title = title,
                cartItem.quantity = 1,
                cartItem.price = price,
                cartItem.total = price,
                cartItem.discountPercentage = discountPercentage,
                cartItem.discountedPrice = priceAfterDiscount
            dispatch(addItem(cartItem))
        }
    }
    return (

        <div className="product-card">
            <div className="thumbnail-container">
                <img className="product-thumbnail" src={thumbnail} alt={title} />
                <div className="price-tag">
                    <span className="actual-price">{`$${price}`}</span>
                    <span className="discount-rate">{`${discountPercentage}% off`}</span>
                </div>
            </div>
            <h3 className="product-title">{product.title}</h3>
            <p className="discounted-price">{priceAfterDiscount}</p>
            <div className="action-buttons">
                <Icon className='like-icon' icon="flat-color-icons:like" width="24" />
                <button disabled={productInCart} className={`${productInCart ? 'add-to-cart-btn-disabled' : 'add-to-cart-btn'}`} onClick={() => handleAddToCart()}>Add to Cart</button>
            </div>
        </div>
    );
}
