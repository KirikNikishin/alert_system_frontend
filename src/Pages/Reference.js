import React, { Component } from 'react';
import { CardGroup, Container, Card, Button } from 'react-bootstrap';

export default class Reference extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            error2: null,
            isLoaded2: false,
            items2: []
        };
    }

    componentDidMount() {
        const path = window.location.pathname; // Выводим локальный путь в консоль
        const lastSegment = path.split('/').filter(Boolean).pop();
        console.log(lastSegment);

        fetch(`https://alert-backend-ze8j.onrender.com/api/v1/organization/employee/${lastSegment}`)
            .then(res => res.json())
            .then(
                result => {
                    console.log(result); // Выводим результат в консоль для проверки
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                error => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );

        fetch(`https://alert-backend-ze8j.onrender.com/api/v1/health_alert/employee/${lastSegment}/health_reference`)
            .then(res => res.json())
            .then(
                result => {
                    console.log(result); // Выводим результат в консоль для проверки
                    this.setState({ items2: result, isLoaded2: true });
                },
                error => {
                    this.setState({ error2: error, isLoaded2: true });
                }
            );
    }

    render() {
        const { error, isLoaded, items, error2, isLoaded2, items2 } = this.state;

        if (error) {
            return (
                <Container>
                        <Card bg="danger" className="mb-3" style={{ display: 'flex', flexDirection: 'row' }}>
                            <Card.Img
                                variant="left"
                                src="https://www.kindpng.com/picc/m/173-1731325_person-icon-png-transparent-png.png"
                                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                            />
                            <Card.Body>
                                <Card.Title>Ошибка</Card.Title>
                                <Card.Text>Ошибка загрузки данных</Card.Text>
                            </Card.Body>
                        </Card>
                </Container>
            );
        } else if (!isLoaded) {
            return (
                <Container>
                        <Card bg="danger" className="mb-3" style={{ display: 'flex', flexDirection: 'row' }}>
                            <Card.Img
                                variant="left"
                                src="https://www.kindpng.com/picc/m/173-1731325_person-icon-png-transparent-png.png"
                                style={{ width: '450px', height: '450px', objectFit: 'cover' }}
                            />
                            <Card.Body>
                                <Card.Title>Загрузка...</Card.Title>
                                <Card.Text>Пожалуйста, подождите</Card.Text>
                            </Card.Body>
                        </Card>
                </Container>
            );
        } else {
            return (
                <Container>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                            <Card
                                bg={items.current_status === "2_NORMAL" ? "success" : items.current_status === "1_UNSTABLE" ? "warning" : "danger"}
                                key={items.id}
                                className="mb-3"
                                style={{ display: 'flex', flexDirection: 'row' }}
                            >
                                <Card.Img
                                    variant="left"
                                    src="https://www.kindpng.com/picc/m/173-1731325_person-icon-png-transparent-png.png"
                                    style={{ width: '450px', height: '450px', objectFit: 'cover' }}
                                />
                                <Card.Body>
                                    <Card.Title>
                                        Температура: {items2.normal_temperature}℃ <br/> <br/>
                                        Систолическое давление: {items2.normal_systolic_pressure} мм рт. ст.<br/> <br/>
                                        Диастолическое давление: {items2.normal_diastolic_pressure} мм рт. ст.<br/> <br/>
                                        Пульс: {items2.normal_pulse} ударов в минуту<br/> <br/>
                                        Уровень стресса: {items2.normal_stress_level}% <br/> <br/>
                                        Уровень кислорода в крови: {items2.normal_oxygen_level}% <br/> <br/>
                                        Дата замера: {items2.last_update}
                                    </Card.Title>
                                    <Card.Text>
                                        
                                    </Card.Text>
                                    <div
                                        style={{
                                            borderRadius: '8px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            gap: '10px',
                                        }}
                                        >
                                    <Button variant="primary" style={{ borderColor: 'black'}} href={`/measurement/${items2.employee}`}>Текущие значения</Button>
                                    <Button style={{ backgroundColor: 'grey', borderColor: 'black', color: 'white' }} href={`/employer/${items2.employee}`}>Эталонные значения</Button>
                                    </div> <br/>
                                    <div
                                        style={{
                                            borderRadius: '8px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            gap: '10px',
                                        }}
                                        >
                                    <Button variant="primary" style={{ borderColor: 'black'}} href={`/graph/${items.id}`}>Посмотреть график</Button>
                                    <Button style={{ backgroundColor: 'red', borderColor: 'black', color: 'white' }} href={`/call`}>Вызвать скорую</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                </Container>
            );
        }
    }      
}
