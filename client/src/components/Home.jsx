import React,{useEffect} from "react";
import MetaData from "./Layout/MetaData.jsx"
import Loader from "./Layout/Loader.jsx"
import Toast from "react-hot-toast"
import { useGetProductsQuery } from "../Redux/api/productApi.js";
import ProductItem from "./product/productItem.jsx";


const Home =()=>{

  const {data,isError,error,isLoading} =useGetProductsQuery()
  console.log(data)
  useEffect(() => {
    if (isError) {
      Toast.error(error?.data?.message);
    }
  }, [isError]);
  if (isLoading){
    return <Loader/>
  }

    return (
        <>
        <MetaData title={"GoCart"} />
        <div className="row">
          <div className="col-6 col-md-12">
            <h1 id="products_heading" className="text-secondary">
              Latest Products
            </h1>
  
            <section id="products" className="mt-5">
              <div className="row">
                {data.products.map((product)=>(
                  <ProductItem products ={product}/>
                ))}
                
              </div>
            </section>
          </div>
        </div>
      </>
    )
}

export default Home
