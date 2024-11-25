import React, { Component } from 'react';
import { Container, Card, Button } from 'react-bootstrap';

export default class Call extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 0, // Хранение количества секунд
        };
        this.audioRef = React.createRef(); // Ссылка на аудио-элемент
    }

    componentDidMount() {
        // Запуск таймера при монтировании компонента
        this.timerInterval = setInterval(() => {
            this.setState((prevState) => ({
                seconds: prevState.seconds + 1,
            }));
        }, 1000);

        // Автоматический запуск музыки
        if (this.audioRef.current) {
            this.audioRef.current.play().catch((err) => {
                console.error("Не удалось автоматически воспроизвести музыку:", err);
            });
        }
    }

    componentWillUnmount() {
        // Остановка таймера при размонтировании компонента
        clearInterval(this.timerInterval);
        if (this.audioRef.current) {
            this.audioRef.current.pause();
        }
    }

    // Функция для форматирования времени в HH:MM:SS
    formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${hrs}:${mins}:${secs}`;
    };

    render() {
        const { seconds } = this.state;

        return (
            <Container>
                <br />
                <br />
                <br />
                <br />
                <Card
                    bg="info"
                    className="mb-3"
                    style={{ display: 'flex', flexDirection: 'row' }}
                >
                    <Card.Body variant="left">
                        <br />
                        <Card.Title className="text-center">
                            103, Россия <br />
                            {this.formatTime(seconds)} {/* Вставка таймера */}
                        </Card.Title>
                        <Card.Text></Card.Text>
                    </Card.Body>
                    <Card.Body variant="right">
                        <Card.Title></Card.Title>
                        <Card.Text></Card.Text>
                        <div
                            style={{
                                borderRadius: '8px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '10px',
                            }}
                        >
                            <Button
                                style={{
                                    backgroundColor: 'grey',
                                    borderColor: 'black',
                                    color: 'white',
                                }}
                                href={`/`}
                            >
                                Громкая связь
                            </Button>
                            <Button
                                style={{
                                    backgroundColor: 'grey',
                                    borderColor: 'black',
                                    color: 'white',
                                }}
                                href={`/`}
                            >
                                Запись
                            </Button>
                            <Button
                                style={{
                                    backgroundColor: 'grey',
                                    borderColor: 'black',
                                    color: 'white',
                                }}
                                href={`/`}
                            >
                                Клавиатура
                            </Button>
                        </div>
                        <br />
                        <div
                            style={{
                                borderRadius: '8px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '10px',
                            }}
                        >
                            <Button
                                style={{
                                    backgroundColor: 'red',
                                    borderColor: 'black',
                                    color: 'white',
                                }}
                                href={`/`}
                            >
                                Повесить трубку
                            </Button>
                        </div>
                    </Card.Body>
                </Card>

                {/* Аудио-элемент для воспроизведения музыки из папки public */}
                <audio ref={this.audioRef}>
                    <source src="/zvuk.mp3" type="audio/mpeg" />
                    Ваш браузер не поддерживает воспроизведение аудио.
                </audio>
            </Container>
        );
    }
}
