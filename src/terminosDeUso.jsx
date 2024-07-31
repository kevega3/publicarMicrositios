
import { Col, Row,Button } from 'antd';
import {RightOutlined  } from '@ant-design/icons';
import { green } from '@ant-design/colors';
import './css/terminos.css'
import { useState ,useEffect} from "react";


export const Terminos = (props) => {

    const [ParametrosString] = useState(props.extenciones);
    const Siguiente = () => {
        props.cetearvalores()
    };
    return (
        <div className='Minicontedor'>
            <h2>Funcionamiento</h2>
            <Row>
                <Col span={24}>
                    <ul>
                        <li>Todos los archivos seleccionados deben de respetar la siguiente estructura <b>CodigoEntidad-Enfermedad-CarpetaContederoa-NombreArchivo</b></li>
                        <li>Los tipos archivos permitidos dentro de las carpetas son:   <b>{ParametrosString}</b> los temas tipos de documentos no serán cargados</li>
                        <li><b>El Asistente de Cargue recorrerá todos los archivos contenidos en el directorio seleccionado, filtrando los archivos permitidos y validando el nombre del archivo</b></li>                    
                    </ul>
                </Col>
            </Row>
            <Row>
                <Col span={24} justify="end" align="end">
                <Button
                            type="primary"
                            icon={<RightOutlined />}
                            size="large"
                            onClick={Siguiente}
                            style={{ backgroundColor: green[6], borderColor: green[6] }} // Usa el color importado
                            
                        >Siguiente
                        </Button>
                </Col>
            </Row>
            
        
        </div>
    );
};