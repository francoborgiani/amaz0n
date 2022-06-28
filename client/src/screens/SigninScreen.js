import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";

export const SigninScreen = () => {
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get("redirect");
    const redirect = redirectInUrl || "/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleChangeEmail = e => {
        setEmail(e.target.value);
    };

    const handleChangePassword = e => {
        setPassword(e.target.value);
    };

    return (
        <Container className="small-container">
            <Helmet>
                <title>Sign In</title>
            </Helmet>
            <h1 className="my-3">Sign in</h1>
            <Form>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input name="email" type="email" value={email} onChange={handleChangeEmail} required></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input name="password" type="password" value={password} onChange={handleChangePassword} required>

                    </Input>
                </FormGroup>
                <div className="mb-3">
                    <Button color="primary" type="submit">Sign In</Button>
                </div>
                <div className="mb-3">
                    New Customer?
                    <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
                </div>
            </Form>
        </Container>
    );
};
