import React, { Component } from 'react';
import { CardGroup, Container, Card, Button } from 'react-bootstrap';

export default class Employer extends Component {
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
                    this.setState({
                        isLoaded2: true,
                        items2: result
                    });
                },
                error => {
                    this.setState({
                        isLoaded2: true,
                        error2: error
                    });
                }
            );
    }

    render() {
        const { error, isLoaded, items, error2, isLoaded2, items2 } = this.state;

        if (error || error2) {
            return (
                <Container>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
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
        } else if (!isLoaded || !isLoaded2) {
            return (
                <Container>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
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
                                        Фамилия: {items.first_name} <br/> <br/>
                                        Имя: {items.middle_name} <br/> <br/>
                                        Отчество: {items.last_name} <br/> <br/>
                                        Дата рождения: {items.birth_date} <br/> <br/>
                                        Пол: {"  "} 
                                        {items.gender === "MALE" ? "Мужской" : items.gender === "FEMALE" ? "Женский" : "Ошибка"} <br/> <br/>
                                        Должность: {items.position} <br/> <br/>
                                        Группа крови: {"  "}
                                        {items2.blood_group === 1 ? "I" : items2.blood_group === 2 ? "II" : items2.blood_group === 3 ? "III" : items2.blood_group === 4 ? "IV" : "Не определена"} <br/> <br/>
                                        Резус-фактор: {"  "}
                                        {items2.rhesus_factor === true ? "+" : "-"} <br/> <br/>
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
                                    <Button variant="primary" style={{ borderColor: 'black'}} href={`/measurement/${items.id}`}>Текущие значения</Button>
                                    <Button variant="primary" style={{ borderColor: 'black'}} href={`/reference/${items.id}`}>Эталонные значения</Button>
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
