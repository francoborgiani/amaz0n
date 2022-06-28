import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { Button, CardBody, CardTitle, Col, ListGroup, ListGroupItem, NavItem, Row } from "reactstrap";
import { Store } from "../Store";
import axios from "axios";

export const CartScreen = () => {
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const navigate = useNavigate();

    const handleUpdateCart = async (item, quantity) => {
        const { data } = await axios.get(`/api/products/${item._id}`);
        if (data.countInStock < quantity) {
            window.alert("Item is out of stock");
            return;
        }

        dispatch({
            type: "CART_ADD_ITEM",
            payload: {
                ...item,
                quantity: quantity > 0 ? quantity : 0
            }
        });
    };

    const handleRemoveFromCart = (item) => {
        dispatch({
            type: "CART_REMOVE_ITEM",
            payload: item
        });
    };

    const handleProceedCheckout = () => {
        navigate("/signin?redirect=/shipping");
    };

    return (
        <div>
            <Helmet>
                <title>Shopping Cart</title>
            </Helmet>
            <h1>Shopping Cart</h1>
            <Row>
                <Col md={8}>
                    {
                        cart.cartItems.length === 0
                            ? <CardTitle>
                                Cart is empty. <Link to="/">Go Shopping</Link>
                            </CardTitle>
                            : <ListGroup>
                                {
                                    cart.cartItems.map(el => (
                                        <ListGroupItem key={el._id}>
                                            <Row className="align-items-center">
                                                <Col>
                                                    <img
                                                        src={el.image}
                                                        alt={el.name}
                                                        className="img-fluid rounded img-thumbnail"
                                                    ></img>
                                                    <Link to={`/product/${el.slug}`}>{el.name}</Link>
                                                </Col>
                                                <Col md={3}>
                                                    <Button onClick={() => handleUpdateCart(el, el.quantity - 1)} color="light" disabled={NavItem.quantity === 1}>
                                                        <i className="fas fa-minus-circle" />
                                                    </Button>{" "}
                                                    <span>{el.quantity}</span>{" "}
                                                    <Button onClick={() => handleUpdateCart(el, el.quantity + 1)} color="light">
                                                        <i className="fas fa-plus-circle"></i>
                                                    </Button>
                                                </Col>
                                                <Col md={3}>
                                                    {el.price}
                                                </Col>
                                                <Col md={2}>
                                                    <Button color="light" onClick={() => handleRemoveFromCart(el)}>
                                                        <i className="fas fa-trash" />
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    ))
                                }
                            </ListGroup>
                    }
                </Col>
                <Col md={4}>
                    <CardBody>
                        <ListGroup flush>
                            <ListGroupItem>
                                <h3>Subtotal ({cart.cartItems.reduce((a, c) => a + c.quantity, 0)} items) : $ {" "}
                                    {cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}</h3>

                            </ListGroupItem>
                            <ListGroupItem>
                                <div className="d-grid">
                                    <Button
                                        onClick={handleProceedCheckout}
                                        type="button"
                                        color="primary"
                                        disabled={cart.cartItems.length === 0}
                                    >
                                        Proceed to Checkout
                                    </Button>
                                </div>
                            </ListGroupItem>
                        </ListGroup>
                    </CardBody>
                </Col>
            </Row>
        </div>
    );
};
