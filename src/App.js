import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

//Para obtener los departamentos
function loadJSON(callback) {   

  var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
      xobj.open('GET', 'colombia.json', true); // Reemplaza colombia-json.json con el nombre que le hayas puesto
      xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
          callback(xobj.responseText);
        }
  };
  xobj.send(null);  
}

//Para cargar el json de los departamentos
var departamentos = function init() {
  loadJSON(function(response) {
   // Parse JSON string into object
     var JSONFinal = JSON.parse(response);
     return JSONFinal
  });
 }

//Falta el combobox de los deptos
const data = [
  { id: 1, nombre: "Cali", departamento: "Valle", codigod: 76, distritocapital: false },

  //{ id: 6, personaje: "Seto Kaiba", anime: "Yu-Gi-Oh!" },
];

class App extends React.Component {
  
 

  state = {
    
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      nombre: "",
      departamento: "",
      codigod: 0,
      distritocapital: false,
    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };
 
  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

 

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

 

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };



  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id == registro.id) {
        arreglo[contador].nombre = dato.nombre;
        arreglo[contador].departamento = dato.departamento;
        arreglo[contador].codigo = dato.codigo;
        arreglo[contador].distritocapital = dato.distritocapital;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };


 
  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.id);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id == registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };



  insertar= ()=>{
    var valorNuevo= {...this.state.form};
    valorNuevo.id=this.state.data.length+1;
    var lista= this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  }


  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    
    return (
      <>
        <Container>
        <br />
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Crear</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Departamento</th>
                <th>Código departamento</th>
                <th>Distrito capital</th>

              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.nombre}</td>
                  <td>
                    <select id="departamento" name="departamento">
                        <option value="Amazonas">Amazonas</option>
                        <option value="Antioquia">Antioquia</option>
                        <option value="Arauca">Arauca</option>
                        <option value="Atlántico">Atlántico</option>
                        <option value="Amazonas">Atlántico</option>
                        <option value="Boyacá">Boyacá</option>
                        <option value="Caldas"> Caldas</option>
                        <option value="Caquetá">Caquetá</option>
                        <option value="Casanare">Casanare</option>
                        <option value="Cauca">Cauca</option>
                        <option value="Cesar">Cesar</option>
                        <option value="Chocó">Chocó</option>
                        <option value="Córdoba">Córdoba</option>
                        <option value="Cundinamarca">Cundinamarca</option>
                        <option value="Guainía">Guainía</option>
                        <option value="Guaviare">Guaviare</option>
                        <option value="Huila">Huila</option>
                        <option value="La Guajira">La Guajira</option>
                        <option value="Meta">Meta</option>
                        <option value="Nariño">Nariño</option>
                        <option value="Norte de Santander">Norte de Santander</option>
                        <option value="Putumayo">Putumayo</option>
                        <option value="Quindío">Quindío</option>
                        <option value="Risaralda">Risaralda</option>
                        <option value="San Andrés y Providencia">San Andrés y Providencia</option>
                        <option value="Santander">Santander</option>
                        <option value="Sucre">Sucre</option>
                        <option value="Tolima">Tolima</option>
                        <option value="Valle del Cauca">Valle del Cauca</option>
                        <option value="Vaupés">Vaupés</option>
                        <option value="Vichada">Vichada</option>
                    </select>
                  </td>
                  <td>{dato.codigod}</td>
                  <td>{dato.distritocapital}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>


        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Departamento: 
              </label>
              <input
                className="form-control"
                name="departamento"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.departamento}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Código departamento: 
              </label>
              <input
                className="form-control"
                name="codigod"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.codigod}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Distrito capital: 
              </label>
              <input
                className="form-control"
                name="departamento"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.distritocapital}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Insertar Personaje</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Departamento: 
              </label>
              <input
                className="form-control"
                name="departamento"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Código departamento: 
              </label>
              <input
                className="form-control"
                name="codigod"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Distrito capital: 
              </label>
              <input
                className="form-control"
                name="distritocapital"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default App;
