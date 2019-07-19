import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import ListaTarefa from './ListaTarefa';

export default class NovaTarefa extends React.Component{
    constructor(props) {
        super(props);
        this.onChangeNome = this.onChangeNome.bind(this);
        this.onChangeDescricao = this.onChangeDescricao.bind(this);
        this.onChangeDataInicio = this.onChangeDataInicio.bind(this);
        this.onChangeDataFinal = this.onChangeDataFinal.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
          id: this.props.id || '',
          nome: this.props.nome || '',
          descricao: this.props.descricao || '',
          dataInicio: this.props.dataInicio || '',
          dataFinal: this.props.dataFinal || ''
        }
      }

      onChangeNome(e) {
        this.setState({
          nome: e.target.value
        });
      }

      onChangeDescricao(e) {
        this.setState({
          descricao: e.target.value
        });
      }

      onChangeDataInicio(e) {
        this.setState({
          dataInicio: e.target.value
        });
      }

      onChangeDataFinal(e) {
        this.setState({
          dataFinal: e.target.value
        });
      }

      verificaData(inicio, fim){
        if(inicio.isBefore(fim)){
          alert('inicio depois do fim')
        }else{
          alert('fim depois do inicio')
        }
      }

      onSubmit(e){
        e.preventDefault();
        if(!this.props.id){
          const obj = {
              nome: this.state.nome,
              descricao: this.state.descricao,
              dataInicio: this.state.dataInicio,
              dataFinal: this.state.dataFinal
            };

            if(Date.parse(obj.dataFinal) < Date.parse(obj.dataInicio)){
              alert('Data final inválida');
            }else{
              axios.post('https://enigmatic-scrubland-21960.herokuapp.com/todolists', obj)
                  .then(response => {
                    this.resp = response;
                    alert('Tarefa Inserida');
                    this.Listar();
                  })
                  .catch(e => {
                    console.error(e);
                  });
              this.setState({
              nome: '',
              descricao: '',
              dataInicio: '',
              dataFinal: ''
            })
          }
        }else{
          // alert('Edita!')
          const id = this.props.id;
          const obj = {
            nome: this.state.nome,
            descricao: this.state.descricao,
            dataInicio: this.state.dataInicio,
            dataFinal: this.state.dataFinal
          };

          if(Date.parse(obj.dataFinal) < Date.parse(obj.dataInicio)){
            alert('Data final inválida');
          }else{
            axios.put('https://enigmatic-scrubland-21960.herokuapp.com/todolists/'+ id, obj)
                .then(response => {
                  this.resp = response;
                  alert('Edição concluída!')
                  this.Listar();
                })
                .catch(e => {
                  console.error(e);
                });
            this.setState({
            nome: '',
            descricao: '',
            dataInicio: '',
            dataFinal: ''
          })
          }
       }
      }

      Listar(){
        this.props.irLista();
      }

  render(){
    return(
        
            <Container>
                <Row>
                    <Col sm>
                        <h1>Nova Tarefa</h1>
                    </Col>
                </Row>
                <Form onSubmit={this.onSubmit} method="post">
                <Row>
                    <Col>
                        <Form.Label>Nome da Tarefa</Form.Label>
                        <Form.Control type="text" name="nome" value={this.state.nome} onChange={this.onChangeNome} required/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control type="text" as="textarea" name="descricao" value={this.state.descricao} onChange={this.onChangeDescricao} required/>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col sm>
                        <Form.Label>Data de Início</Form.Label>
                        <Form.Control type="date" name="dataInicio" value={this.state.dataInicio} onChange={this.onChangeDataInicio} required/>
                    </Col>
                    <Col sm>
                        <Form.Label>Data Final</Form.Label>
                        <Form.Control type="date" name="dataFinal" value={this.state.dataFinal} onChange={this.onChangeDataFinal} required/>
                    </Col>
                </Row>
                <br/>
                <Row className="justify-content-md-center">
                    <Col sm>
                        <Button variant="primary" type="submit">
                            Salvar
                        </Button>
                    </Col>
                  </Row>
                  </Form>
            </Container>
        
    )
  }
};