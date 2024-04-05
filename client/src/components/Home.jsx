import React,{useEffect} from "react";
import MetaData from "./Layout/MetaData.jsx"
import Loader from "./Layout/Loader.jsx"
import Toast from "react-hot-toast"
import { useGetProductsQuery } from "../Redux/api/productApi.js";
import GetProductItem from "./product/GetProductItem.jsx";
import CustomPagination from "./Layout/CustomPagination.jsx";
import Filters from "./Layout/Filters.jsx";
import { useSearchParams } from "react-router-dom";



const Home =()=>{

  let [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || "";
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const category = searchParams.get("category");
  const ratings = searchParams.get("ratings");

  const params = { page, keyword};

  min !== null && (params.min = min);
  max !== null && (params.max = max);
  category !== null && (params.category = category);
  ratings !== null && (params.ratings = ratings);

  const {data,isError,error,isLoading} =useGetProductsQuery(params);
  //console.log(data)
  useEffect(() => {
    if (isError) {
      Toast.error(error?.data?.message);
    }
  }, [isError]);

  const columnSize = keyword ? 4 : 3;

  if (isLoading) return <Loader/>
  
    return (
        <>
        <MetaData title={"GoCart"} />
        <div className="row">
        {keyword && (
          <div className="col-6 col-md-3 mt-5">
            <Filters />
          </div>
        )}
        <div className={keyword ? "col-6 col-md-9" : "col-6 col-md-12"}>
          
            <h1 id="products_heading" className="text-secondary">
            {keyword
              ? `${data?.products?.length} Products found with keyword: ${keyword}`
              : "Latest Products"}
            </h1>
  
            <section id="products" className="mt-5">
              <div className="row">
              {data && data.products ? (
                data.products.map((product)=>(
                  <GetProductItem key={product.id} products ={product} columnSize={columnSize}/>
                ))
                ) : (

                  <p>No products found</p>

                )}
                
              </div>
            </section>
            
            <CustomPagination
            resPerPage={data?.prodPerPage}
            filteredProductsCount={data?.productLen}
          />
          </div>
        </div>
      </>
    )
}

export default Home
