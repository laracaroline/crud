import React from 'react';
import { Container, Jumbotron} from 'react-bootstrap';


export default class Inicio extends React.Component{
  render(){
    return(
        <Jumbotron fluid>
            <Container>
                <h1>Bem-vindo(a)!</h1>
                <p>
                    Registre suas tarefas e veja-as quando quiser!
                </p>
            </Container>
        </Jumbotron>
    )
  }
};