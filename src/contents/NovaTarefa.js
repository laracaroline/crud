import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Strapi from 'strapi-sdk-javascript/build/main';
const strapi = new Strapi('http://localhost:1337');

export default class NovaTarefa extends React.Component{
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        fetch('http://localhost:1337/Todolists', {
          method: 'POST',
          body: data,
        });
      }

  render(){
    return(
        <Form onSubmit={this.handleSubmit}>
            <Container>
                <Row>
                    <Col sm>
                        <h1>Nova Tarefa</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Nome da Tarefa</Form.Label>
                        <Form.Control type="text" name="nome"/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control type="text" as="textarea" name="descricao"/>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col sm>
                        <Form.Label>Data de Início</Form.Label>
                        <Form.Control type="date" name="dataInicio"/>
                    </Col>
                    <Col sm>
                        <Form.Label>Data Final</Form.Label>
                        <Form.Control type="date" name="dataFinal"/>
                    </Col>
                </Row>
                <br/>
                <Row className="justify-content-md-center">
                    <Col xs lg="5">
                        <Button variant="primary" type="submit">
                            Salvar
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="danger" type="submit">
                            Cancelar
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Form>
    )
  }
};