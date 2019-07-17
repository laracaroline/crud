import React from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';


export default class ListaTarefa extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            tarefas: []
        };
    }

    componentDidMount() {
        fetch('http://localhost:1337/Todolists')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    tarefas: json
                })
            });
    }

  render(){
    
    var {tarefas} = this.state;

    return(
        <Container>
            <Row>
                <Col sm>
                    <h1>Lista de Tarefas</h1>
                    <ListGroup>
                        <ListGroup.Item action>
                            Tarefa
                        </ListGroup.Item>
                        <ListGroup.Item action href="#link2">
                        Tarefa 2
                        </ListGroup.Item>
                        <ListGroup.Item action>
                        Tarefa 3
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
  }
};