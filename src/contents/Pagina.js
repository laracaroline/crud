import React from 'react';
import { Nav, Container, Row, Col} from 'react-bootstrap';
import ListaTarefa from './ListaTarefa';
import NovaTarefa from './NovaTarefa';
import Inicio from './Inicio';


export default class Pagina extends React.Component{

    constructor(){
      super();
      this.state = {
          pagina: <Inicio/>
      };
    }

    Listar(){
      this.setState({
          pagina: <ListaTarefa/>
      });
    }

    Inserir(){
      this.setState({
          pagina: <NovaTarefa/>
      });
    }

  render(){
    return(
        <Container>
            <Row >
                <Col sm>To Do List</Col>
            </Row>
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