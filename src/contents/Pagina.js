import React from 'react';
import { Nav, Container, Row, Col} from 'react-bootstrap';
import ListaTarefa from './ListaTarefa';
import NovaTarefa from './NovaTarefa';
import Inicio from './Inicio';
import styled from 'styled-components';

const H1 = styled.h1`
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: 50px;
  margin-left: 10px;
`;
const Topo = styled.div`
  background-size: cover;
  width: 100%;
  position relative
`;

export default class Pagina extends React.Component{

    constructor(props){
      super(props);
      const {
        redirectPage
      } = this.props;

      if(!redirectPage){
        this.state = {          
          pagina: <Inicio/>
        }
      }else{
        this.state = {
          pagina: redirectPage
        }
      }
    }

    Listar(){
      this.setState({
          pagina: <ListaTarefa irEditar={this.Editar.bind(this)} callback={this.Listar.bind(this)}/>
      });
    }

    Editar(id_atividade, nome_atividade, descricao_atividade, data_inicio, data_final){
      this.setState({
        pagina: <NovaTarefa irLista={this.Listar.bind(this)} id = {id_atividade} nome = {nome_atividade} descricao={descricao_atividade} dataInicio={data_inicio} dataFinal={data_final}/>
    });
    }

    Inserir(){
      this.setState({
          pagina: <NovaTarefa irLista={this.Listar.bind(this)}/>
      });
    }

    Inicio(){
      this.setState({
          pagina: <Inicio/>
      })
    }

  render(){
    return(
        <Container>
            <Topo>
              <Row >
                  <Col sm> <H1> To Do List </H1></Col>
              </Row>
            </Topo>
            <Row>
                <Col sm={3}>
                  <Nav defaultActiveKey="/home" className="flex-column">
                    <Nav.Link onClick={this.Inserir.bind(this)}>Nova tarefa</Nav.Link>
                    <Nav.Link onClick={this.Listar.bind(this)}>Minhas Tarefas</Nav.Link>
                  </Nav>
                </Col>
                <Col sm={9}>
                    {this.state.pagina}
                </Col>
            </Row>
        </Container>
    )
  }
};