import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'//eslint-disable-line
import { Loader } from "../components/Loader/Loader";
import logger from "use-reducer-logger";
import { Col, Row } from "reactstrap";
import { Product } from "../components/Product/Product";
import { Helmet } from "react-helmet-async";

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
            products: action.payload,
            loading: false
        };
    case "FETCH_FAIL":
        return {
            ...state, loading: false, error: action.payload
        };
    }
};

export const HomeScreen = () => {
    const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
        loading: true,
        error: "",
        products: []
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({
                type: "FETCH_REQUEST"
            });
            try {
                const result = await axios.get("/api/products");
                dispatch({
                    type: "FETCH_SUCCESS",
                    payload: result.data
                });
            } catch (err) {
                dispatch({
                    type: "FETCH_FAIL",
                    error: "Hubo un error al obtener los productos"
                });
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            {
                loading && (
                    <Loader />
                )
            }
            <Helmet>
                <title>Amaz0na</title>
            </Helmet>
            <h1>Featured Products</h1>
            {
                (!error)
                    ? <section className="products">
                        <Row className='d-flex justify-content-center flex-wrap'>
                            {
                                products.map(product => (
                                    <Col sm="6" md="4" lg="3" className='mb-3' key={product.slug}>
                                        <Product product={product}/>
                                    </Col>
                                ))
                            }
                        </Row>
                    </section>
                    : <span>Error: {error}</span>

            }
        </div>
    );
};
