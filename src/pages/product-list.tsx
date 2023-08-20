import { useEffect } from "react";
import { getProducts, selectProductData } from "../features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/product-card";
import Layout from "../components/layout";
import { ProductType } from "../type/type";

export default function Products() {
    const dispatch = useDispatch();
    const products = useSelector(selectProductData)

    useEffect(() => {
        dispatch(getProducts());
    }, []);

    return (
        <Layout>
            <div style={{ display: "grid", gridTemplateColumns: 'repeat(5, 1fr)', gridGap: '30px' }}>
                {
                    products?.product?.map((product:ProductType) => (
                        <ProductCard product={product} key={product.id} />
                    ))
                }
            </div>
        </Layout>

    )
}
