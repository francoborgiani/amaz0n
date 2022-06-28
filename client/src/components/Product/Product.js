import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardText, CardTitle } from "reactstrap";
import { Rating } from "../Rating/Rating";
import { Store } from "../../Store";
import axios from "axios";

export const Product = ({ product }) => {
    const navigate = useNavigate();
    const { state, dispatch } = useContext(Store);

    const handleAddToCart = async (product) => {
        const existsItem = state?.cart?.cartItems?.find(el => el._id === product._id);
        const quantity = existsItem ? existsItem.quantity + 1 : 1;

        const { data } = await axios.get(`/api/products/${product._id}`);
        if (data.countInStock < quantity) {
            window.alert("Sorry product is out of stock");
            return;
        }

        dispatch({
            type: "CART_ADD_ITEM",
            payload: { ...product, quantity }
        });
        navigate("/cart");
    };

    return (
        <Card>
            <Link to={`/product/${product.slug}`}>
                <img
                    className="card-img-top"
                    src={product.image}
                    alt={product.name}
                />
            </Link>
            <CardBody>
                <Link to={`/product/${product.slug}`}>
                    <CardTitle className="fs-5 text-primary">
                        {product.name}
                    </CardTitle>
                </Link>
                <Rating className="text-primary" rating={product.rating} numReviews={product.numReviews} />
                <CardText>${product.price}</CardText>
                {
                    product.countInStock > 0 && (
                        <Button color="primary" onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                    )
                }
            </CardBody>
        </Card>
    );
};
