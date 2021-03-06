import React from 'react';
import { Container, Row, Col, ListGroup, Button, Form, Accordion} from 'react-bootstrap';
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
        axios.get('http://localhost:3002/listar')
        .then(res => {
            const tarefas = res.data;
            this.setState({tarefas});
        })
    }

    remover(id){
        axios.delete('http://localhost:3002/delete/'+id)
        .then(res => {
            console.log(res);
            console.log(res.data);
          });
        alert("Tarefa removida!");
        this.props.callback();
    }
    
    editar(e, id){
        e.preventDefault();
        axios.get('http://localhost:3002/atividade/' + id)
            .then(response => {
                const tarefa = response.data[0];
                const dataInicioFormat = tarefa.data_inicio.split("T")[0];
                const dataFimFormat = tarefa.data_final.split("T")[0];
                this.props.irEditar(tarefa.id_atividade, tarefa.nome_atividade, tarefa.descricao_atividade, dataInicioFormat, dataFimFormat);
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
                                <h5>{tarefa.nome_atividade}</h5>
                            </Accordion.Toggle>
                                <span>
                                <Button variant="primary" type="submit" onClick={e => this.editar(e, tarefa.id_atividade)}>
                                    Editar
                                </Button>
                                <Button variant="danger" type="submit" onClick={e => this.remover(tarefa.id_atividade)} style={{marginLeft: 15}}>
                                    Excluir
                                </Button>
                                </span>
                            </ListGroup.Item>
                            <Accordion.Collapse eventKey="0">
                               <ListGroup.Item style={{backgroundColor: '#F7F5FE'}}> 
                                Descrição: {tarefa.descricao_atividade} <br/>
                                Data Início: {(tarefa.data_inicio).split("T")[0].split("-").reverse().join("/")} <br/>
                                Data Final: {(tarefa.data_final).split("T")[0].split("-").reverse().join("/")} 
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