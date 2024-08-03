
import { Col, Row,Button } from 'antd';
import {RightOutlined  } from '@ant-design/icons';
import { green } from '@ant-design/colors';
import './css/terminos.css'
import { useState } from "react";


export const Terminos = (props) => {

    const [ParametrosString] = useState(props.extenciones);
    const Siguiente = () => {
        props.cetearvalores()
    };
    return (
        <div className='Minicontedor'>
            <h2>Términos de Uso del Asistente de Cargue</h2>
            <Row>
                <Col span={24}>
                    
            <ol>
                <li>El asistente ofrece dos tipos de cargue de archivos:
                    <ul>
                        <li><b>Cargue por nombre del archivo:</b> Debe asegurarse de que cada archivo siga esta estructura: <b>CodigoEntidad-Enfermedad-CarpetaContenedora-NombreArchivo</b>.</li>
                        <li><b>Cargue general a entidades:</b> Este método enviará los archivos seleccionados a las entidades que elija en el micrositio.</li>
                    </ul>
                </li>
                <li>Los tipos de archivos permitidos dentro de las carpetas son: <b>{ParametrosString}</b>. Los archivos que no cumplan con estos formatos no serán cargados.</li>
                <li><b>El Asistente de Cargue recorrerá todos los archivos en el directorio seleccionado, filtrará los archivos permitidos y validará el nombre de cada archivo.</b></li>
            </ol>
                    
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