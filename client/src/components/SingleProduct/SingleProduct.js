import React, { useContext } from "react";
import { Button, Col, Row, ListGroup, ListGroupItem, Card, CardBody, Badge } from "reactstrap";
import { Rating } from "../Rating/Rating";
import { Helmet } from "react-helmet-async";
import { Store } from "../../Store";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SingleProduct = ({ product }) => {
    const { state, dispatch } = useContext(Store);
    const navigate = useNavigate();

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
        <div>
            <Row>
                <Col className="mb-4" md={5} xl={6}>
                    <img src={product.image} alt={product.name} className="img-large" />
                </Col>
                <Col className="mb-4" md={3}>
                    <ListGroup>
                        <ListGroupItem>
                            <Helmet>
                                <title>{product.name}</title>
                            </Helmet>
                            <h1>{product.name}</h1>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Rating
                                rating={product.rating}
                                numReviews={product.numReviews}
                            />
                        </ListGroupItem>
                        <ListGroupItem>
                            Description: {product.description}
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col className="mb-4" md={4} xl={3}>
                    <Card>
                        <CardBody>
                            <ListGroup>
                                <ListGroupItem>
                                    <Row>
                                        <Col>
                                            Price:
                                        </Col>
                                        <Col>
                                            ${product.price}
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>
                                            Status:
                                        </Col>
                                        <Col>
                                            {product.countInStock > 0
                                                ? <Badge color="success">In Stock</Badge>
                                                : <Badge color="danger">Unavailable</Badge>
                                            }
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                                {
                                    product.countInStock > 0 && (
                                        <ListGroupItem>
                                            <Button color="primary" onClick={() => handleAddToCart (product)}>
                                                Add to <i className="fa-solid fa-cart-shopping"></i>
                                            </Button>
                                        </ListGroupItem>
                                    )
                                }
                            </ListGroup>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
