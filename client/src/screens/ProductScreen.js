import axios from "axios";
import React, { useReducer, useEffect } from "react";
import { useParams } from "react-router-dom";
import logger from "use-reducer-logger";
import { Loader } from "../components/Loader/Loader";
import { SingleProduct } from "../components/SingleProduct/SingleProduct";

const reducer = (state, action) => {
    switch (action.type) {
    case "FETCH_REQUEST":
        return {
            ...state,
            loading: true
        };
    case "FETCH_SUCCESS":
        return {
            ...state,
            product: action.payload,
            loading: false
        };
    case "FETCH_FAIL":
        return {
            ...state, loading: false, error: action.payload
        };
    }
};
export const ProductScreen = () => {
    const { slug } = useParams();

    const [{ loading, error, product }, dispatch] = useReducer(logger(reducer), {
        loading: true,
        error: "",
        product: {}
    });

    useEffect(() => {
        const getSingleProduct = async () => {
            try {
                const response = await axios.get("/api/products/slug/" + slug);
                dispatch({
                    type: "FETCH_SUCCESS",
                    payload: response.data
                });
            } catch (error) {
                dispatch({
                    type: "FETCH_FAIL",
                    payload: "Hubo un error al obtener el producto"
                });
            }
        };
        getSingleProduct();
    }, [slug]);


    return (
        <div>
            {
                loading
                    ? <Loader />
                    : error
                        ? <span>{error}</span>
                        : <SingleProduct product={product}/>
            }
        </div>
    );
};
