import React, { useContext } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { HomeScreen, ProductScreen, CartScreen, SigninScreen } from "./screens/";
import { Badge, Container, Navbar } from "reactstrap";
import { Store } from "./Store";

function App() {
    const { state } = useContext(Store);

    return (
        <BrowserRouter>
            <div className='d-flex flex-column site-container'>
                <Navbar className='bg-dark'>
                    <Container className="container d-flex justify-content-between align-items-center">
                        <Link to='/' className='text-white text-decoration-none fs-4'>
                            amaz0ns
                        </Link>
                        <Link to='/cart'>
                            <i className="fa-solid fa-cart-shopping fs-5"></i>
                            <Badge color="danger" style={{
                                opacity: state?.cart?.cartItems?.length > 0 ? "1" : "0"
                            }}>{state?.cart?.cartItems?.reduce((a, b) => a + b.quantity, 0)}</Badge>
                        </Link>
                    </Container>
                </Navbar>
                <main>
                    <Container className="mt-4">
                        <Routes>
                            <Route path="/signin" element={<SigninScreen />} />
                            <Route path="/cart" element={<CartScreen />} />
                            <Route path="/product/:slug" element={<ProductScreen />} />
                            <Route path="/" element={<HomeScreen />} />
                        </Routes>

                    </Container>

                </main>
                <footer className='text-center'>All rights reserved</footer>
            </div>

        </BrowserRouter>
    );
}

export default App;
