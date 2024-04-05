
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const productApi = createApi({
reducerPath: "productApi",
baseQuery:fetchBaseQuery({baseUrl:"/api"}),
endpoints: (builder)=> ({
getProducts: builder.query({
    query: (params) => ({
        url: "/allproducts",
        params: {
          page: params?.page,
          keyword: params?.keyword,
          category: params?.category,
          "price[gte]": params.min,
          "price[lte]": params.max,
          "ratings[gte]": params?.ratings,
        },
      }), 
}),
getProductDetails : builder.query({
  query:(id) => `/allproducts/${id}`,
  })
})
})




export const {useGetProductsQuery, useGetProductDetailsQuery} = productApi
