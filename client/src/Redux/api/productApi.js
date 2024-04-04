
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const productApi = createApi({
reducerPath: "productApi",
baseQuery:fetchBaseQuery({baseUrl:"/api"}),
endpoints: (builder)=> ({
getProducts: builder.query({
    query:(_)=>({
       url: "/allproducts",
    }),
}),
    getProductDetails : builder.query({
        query:(id) => ({
            url: `/allproducts/${id}`,
        })
})
})
})



export const {useGetProductsQuery, useGetProductDetailsQuery} = productApi
