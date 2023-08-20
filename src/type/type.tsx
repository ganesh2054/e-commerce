export interface ReactNodeProps {
    children : React.ReactNode
  }
  export interface ProductType{
        id:number,
        title:string,
        description:string,
        price:number,
        discountPercentage:number,
        rating:number,
        stock:number,
        brand:string,
        category:string,
        thumbnail:string,
        images:string
  }
  
  export interface CartType{
      id:number,
      products:CartItemType[],
      total:number,
      discountedTotal:number,
      userId:number,
      totalProducts:number,
      totalQuantity:number
  }
 
  export interface CartItemType{
      id:number,
      title:string,
      price:number,
      quantity:number,
      total:number,
      discountPercentage:number,
      discountedPrice:number
  }