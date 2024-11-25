import React, { Component } from 'react';
import { Button, Container, FormControl, Navbar, Nav, Form } from 'react-bootstrap';
import logo from '../logo.svg';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

import Home from '../Pages/Home';
import Employer from '../Pages/Employer';
import Test from '../Pages/Test';
import Reference from '../Pages/Reference';
import Measurement from '../Pages/Measurement';
import Graph from '../Pages/Graph';
import Call from '../Pages/Call'


export default class Header extends Component {
    render() {
        return(
            <>
                <Navbar collapseOnSelect expand="md" bg="dark" variant='dark'>
                    <Container>
                        <Navbar.Brand href='/'>
                            <img src={logo}
                            height="30"
                            width="30"
                            className='d-inline-block align-top'
                            alt="Logo"
                            /> Система отслеживания состояния пользователей
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav" >
                            <Nav className="me-auto">
                                <Nav.Link href="/">Состояние пользователей</Nav.Link>
                                {/* <Nav.Link href="/about">About us</Nav.Link>
                                <Nav.Link href="/contacts">Contacts</Nav.Link>
                                <Nav.Link href="/blog">Blog</Nav.Link> */}
                            </Nav>
                            {/* <Form className='d-flex'>
                                <FormControl type="text" 
                                placeholder="Введите фамилию..."
                                className="me-sm-2"
                                />
                                <Button variant="outline-info">Поиск</Button>
                            </Form> */}
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <Router>
                    <Routes>
                        <Route exact path ="/" element={<Home/>} />
                        <Route exact path ="/employer/:id" element={<Employer/>} />
                        <Route exact path ="/reference/:id" element={<Reference/>} />
                        <Route exact path ="/measurement/:id" element={<Measurement/>} />
                        <Route exact path ="/graph/:id" element={<Graph/>} />
                        <Route exact path ="/call" element={<Call/>} />
                        <Route exact path ="/test" element={<Test/>} />
                    </Routes>
                </Router>
            </>
        );
    }
}