import React, { Component } from 'react'
import { CardGroup, Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch('https://alert-backend-ze8j.onrender.com/api/v1/organization/employee')
            .then(res => res.json())
            .then(
                result => {
                    console.log(result); // Выводим результат в консоль для проверки
                    this.setState({
                        isLoaded: true,
                        items: result.results
                    });
                },
                error => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    
    handleButtonClick = (id) => {
        this.setState({ selectedId: id }, () => {
            console.log("Сохранённый ID:", this.state.selectedId); // Проверяем сохранение
            // Можно добавить дополнительные действия, например, отправить ID в API
        });
    };

    render() {
        const { error, isLoaded, items } = this.state;
    
        if (error) {
            return (
                <Container>
                    <h2 className="text-center m-4">Сотрудники</h2>
                    <div>
                        Ошибка загрузки данных
                    </div>
                </Container>
            );
        } else if (!isLoaded) {
            return (
                <Container>
                    <h2 className="text-center m-4">Сотрудники</h2>
                    <div>
                        Загрузка...
                    </div>
                </Container>
            );
        } else {
            return (
                <Container>
                    <h2 className="text-center m-4">Сотрудники</h2>
                    <CardGroup>
                        {items.map((item) => {
                            return item.current_status === "2_NORMAL" ? (
                                <Card bg="success" key={item.id}>
                                    <Card.Img
                                        variant="top"
                                        src="https://www.kindpng.com/picc/m/173-1731325_person-icon-png-transparent-png.png"
                                    />
                                    <Card.Body>
                                        <Card.Title>
                                            {item.first_name} {item.middle_name} {item.last_name}
                                        </Card.Title>
                                        <Card.Text>
                                            Температура: {item.temperature} <br />
                                            Давление: {item.systolic_pressure}/
                                            {item.diastolic_pressure} <br />
                                            Состояние: Нормальное
                                        </Card.Text>
                                        <Button variant="primary" href={`/employer/${item.id}`}>Подробнее</Button>
                                    </Card.Body>
                                </Card>
                            ) : item.current_status === "1_UNSTABLE" ? (
                                <Card bg="warning" key={item.id}>
                                    <Card.Img
                                        variant="top"
                                        src="https://www.kindpng.com/picc/m/173-1731325_person-icon-png-transparent-png.png"
                                    />
                                    <Card.Body>
                                        <Card.Title>
                                            {item.first_name} {item.middle_name} {item.last_name}
                                        </Card.Title>
                                        <Card.Text>
                                            Температура: {item.temperature} <br />
                                            Давление: {item.systolic_pressure}/
                                            {item.diastolic_pressure} <br />
                                            Состояние: Нестабильное
                                        </Card.Text>
                                        <Button variant="primary" href={`/employer/${item.id}`}>Подробнее</Button>
                                    </Card.Body>
                                </Card>
                        ) : (
                            <Card bg="danger" key={item.id}>
                                <Card.Img
                                    variant="top"
                                    src="https://www.kindpng.com/picc/m/173-1731325_person-icon-png-transparent-png.png"
                                />
                                <Card.Body>
                                    <Card.Title>
                                        {item.first_name} {item.middle_name} {item.last_name}
                                    </Card.Title>
                                    <Card.Text>
                                        Температура: {item.temperature} <br />
                                        Давление: {item.systolic_pressure}/
                                        {item.diastolic_pressure} <br />
                                        Состояние: Под угрозой
                                    </Card.Text>
                                    <Button variant="primary" href={`/employer/${item.id}`}>Подробнее</Button>
                                </Card.Body>
                            </Card>
                        );
                        })}
                    </CardGroup>
                </Container>
            );
        }
    }
}