import React from 'react';
import { Container, Row, Col, ListGroup, Button, Form, Accordion, Card } from 'react-bootstrap';
import axios from 'axios';

export default class ListaTarefa extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            tarefas: []
        };
    }

    componentDidMount() {
        this.listar();
    }

    listar(){
        axios.get('https://enigmatic-scrubland-21960.herokuapp.com/todolists')
        .then(res => {
            const tarefas = res.data;
            this.setState({tarefas});
        })
    }

    remover(id){
        axios.delete('https://enigmatic-scrubland-21960.herokuapp.com/todolists/'+id)
        .then(res => {
            console.log(res);
            console.log(res.data);
          });
        alert("Tarefa removida!");
        this.props.callback();
    }
    
    editar(e, id){
        e.preventDefault();
        axios.get('https://enigmatic-scrubland-21960.herokuapp.com/todolists/' + id)
            .then(response => {
                const tarefa = response.data;
                this.props.irEditar(tarefa.id, tarefa.nome, tarefa.descricao, tarefa.dataInicio, tarefa.dataFinal);
                console.log(response.data);
                console.log(response.status);
        })
        .catch(erro => console.log(erro))
    }

  render(){
    return(
        <Container>
            <Row>
                <Col>
                    <h1>Lista de Tarefas</h1>
                    <ListGroup>
                    <Form>
                        {this.state.tarefas.map(tarefa=>
                        <Accordion>
                            <ListGroup.Item style={{display: 'flex', justifyContent: 'space-between'}}> 
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <h5>{tarefa.nome}</h5>
                            </Accordion.Toggle>
                                <span>
                                <Button variant="primary" type="submit" onClick={e => this.editar(e, tarefa.id)}>
                                    Editar
                                </Button>
                                <Button variant="danger" type="submit" onClick={e => this.remover(tarefa.id)} style={{marginLeft: 15}}>
                                    Excluir
                                </Button>
                                </span>
                            </ListGroup.Item>
                            <Accordion.Collapse eventKey="0">
                               <ListGroup.Item style={{backgroundColor: '#F7F5FE'}}> 
                                Descrição: {tarefa.descricao} <br/>
                                Data Início: {(tarefa.dataInicio).split("-").reverse().join("/")} <br/>
                                Data Final: {(tarefa.dataFinal).split("-").reverse().join("/")} 
                                </ListGroup.Item>
                            </Accordion.Collapse>
                        </Accordion>
                        )}
                    </Form>
                    </ListGroup>
                    </Col>
            </Row>
        </Container>
    )
  }
};