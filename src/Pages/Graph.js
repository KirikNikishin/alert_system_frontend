import React, { Component } from 'react';
import { CardGroup, Container, Card, Button, Dropdown } from 'react-bootstrap';

export default class Graph extends Component {
    render() {
        return (
            <Container>
                <br/>
                <br/>
                <br/>
                <br/>
                <Card bg="info">
                    <div
                        style={{
                            borderRadius: '8px',
                            display: 'flex',
                            justifyContent: 'right',
                            alignItems: 'right',
                            gap: '10px',
                        }}
                    >
                        <Dropdown>
                            <Dropdown.Toggle
                                id="dropdown-basic"
                                style={{ backgroundColor: 'white', borderColor: 'black', color: 'black' }}
                            >
                                Меню
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/temperature">Температура</Dropdown.Item>
                                <Dropdown.Item href="#/systolic_pressure">Систолическое давление</Dropdown.Item>
                                <Dropdown.Item href="#/diastolic_pressure">Диастолическое давление</Dropdown.Item>
                                <Dropdown.Item href="#/pulse">Пульс</Dropdown.Item>
                                <Dropdown.Item href="#/stress_level">Стресс</Dropdown.Item>
                                <Dropdown.Item href="#/oxygen_level">Кислород</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        {/* Кнопки */}
                        <Button variant="primary" style={{ borderColor: 'black' }} href={`/`}>
                            Составить отчет
                        </Button>
                        <Button
                            style={{
                                backgroundColor: 'red',
                                borderColor: 'black',
                                color: 'white',
                            }}
                            href={`/`}
                        >
                            Закрыть
                        </Button>

                        {/* Выпадающий список */}
                        
                    </div>
                    <h2> </h2>
                    <h2> </h2>
                    <Card.Img
                        variant="left"
                        src="https://markimarta.ru/wp-content/uploads/2017/06/garmin-heartpulse.png"
                    />
                </Card>
            </Container>
        );
    }
}
