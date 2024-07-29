import React, { useState,useEffect } from 'react';
import { InboxOutlined,LeftOutlined,CloudUploadOutlined } from '@ant-design/icons';
import { message, Upload, Button  } from 'antd';
import { Col, Row } from 'antd';
import { gold,green } from '@ant-design/colors';
import './css/uploadfiles.css';
const { Dragger } = Upload;

export const Formulario = (props ) => {
    const [fileList, setFileList] = useState([]);
    const [Archivos, setArchivos] = useState([]);
    const [botonVolver,setbotonVolver] = useState(false)
    
    
    const [archivosProcesados, setArchivosProcesados] = useState(props.numeroArchivos);
    const [numeroArchivosError, setnumeroArchivosError] = useState(props.numeroArchivosError);
    
    useEffect(() => {
        setArchivosProcesados(props.numeroArchivos);
        
    }, [props.numeroArchivos]); 

    const _habilitarBoton = () => {
        return botonVolver;
    };

    useEffect(() => {
        setnumeroArchivosError(props.numeroArchivosError);
        
    }, [props.numeroArchivosError]); 

    const handleResetFileList = () => {
        setFileList([]);
        props.cetearvalores()
        
    };


    const handleBeforeUpload = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileName = file.name;
            
            const fileExtension =  fileName.split('.')
            const fileBuffer = e.target.result;
            
            setArchivos(prevFileList => [
                ...prevFileList,
                {
                    name: fileName,
                    extension: fileExtension[1],
                    buffer: fileBuffer
                }
            ]);
            
        };
        reader.readAsArrayBuffer(file); 
        return false;
    };
    const shouldDisableButton = () => { 
        return Archivos.length === 0; 
    };


    const EnviarInfo = async (Archivos) => {
        setbotonVolver(true)
        setArchivos([])
        await props.handleUploadFiles(Archivos)
        
        setbotonVolver(false)
    }
    const handleOnChange = (info) => {
        if (info.file.status !== 'uploading') {
            setFileList(info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };
        // Procesa directorios y sus archivos recursivamente
        const processDirectory = (directoryEntry) => {
            const directoryReader = directoryEntry.createReader();
            directoryReader.readEntries(entries => {
                entries.forEach(entry => {
                    if (entry.isFile) {
                        entry.file(file => handleBeforeUpload(file));
                    } else if (entry.isDirectory) {
                        processDirectory(entry);
                    }
                });
            });
        };
    const handleOnDrop = (e) => {
        e.preventDefault();
        const { items } = e.dataTransfer;
    
        // Procesa los archivos y carpetas
        Array.from(items).forEach(item => {
            if (item.kind === 'file') {
                
                const file = item.getAsFile();
                console.log(file)
                handleBeforeUpload(file);
            } else if (item.kind === 'directory') {
                // Para carpetas, necesitamos procesar los archivos en la estructura de directorios
                const directoryReader = item.webkitGetAsEntry().createReader();
                directoryReader.readEntries(entries => {
                    entries.forEach(entry => {
                        if (entry.isFile) {
                            console.log(entry)
                            entry.file(file => handleBeforeUpload(file));
                        } else if (entry.isDirectory) {
                            processDirectory(entry);
                        }
                    });
                });
            }
        });
    };
    const propss = {
        name: 'file',
        directory: true,
        multiple: true,
        beforeUpload: handleBeforeUpload,
        showUploadList: false,
        onChange: handleOnChange,
        onDrop:handleOnDrop
    };
    
    return (
        <div className='ContenedorGeneralUpload'> 
            {fileList.length === 0 && ( 
            <Dragger {...propss}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Haga clic o arrastre la carpeta a esta área para cargarla.</p>
                <p className="ant-upload-hint">Soporte para una carga única o masiva. Está estrictamente prohibido cargar datos de la empresa u otros archivos prohibidos.</p>
                
            </Dragger>
            )}
            <br/>
            {fileList.length > 0 && (
                <><Row className='contedorArchivosProcesados'>
                    <Col span={12}>
                        <h2>Resultados del análisis:</h2>
                        <h3>Archivos detectados: {fileList.length}</h3>
                        {archivosProcesados > 0 && (
                            <h3 className='sucessArchivos'>Número archivos cargados con éxito: <span className='marcaSucces'>{archivosProcesados} </span></h3>
                        )}
                        {numeroArchivosError > 0 && (
                            <h3 className='errorArchivos'>Número archivos no cargados: <span className='marcaError'>{numeroArchivosError}</span> </h3>
                        )}
                    </Col>
                <Row>
                </Row>    
                <Row>
                    
                </Row  >
                    <Col span={12} justify="end" align="end">
                        <Button
                            type="primary"
                            icon={<LeftOutlined />}
                            size="large"
                            onClick={handleResetFileList}
                            style={{ backgroundColor: gold[6], borderColor: gold[6] }} // Usa el color importado
                            disabled={_habilitarBoton()}
                        >Volver
                        </Button>
                        <Button
                        
                            type="primary"
                            icon={<CloudUploadOutlined />}
                            size="large"
                            style={{ backgroundColor: green[6], borderColor: green[6], margin: 20 }} // Usa el color importado
                            onClick={() => EnviarInfo(Archivos)}
                            disabled={shouldDisableButton()}
                        >
                        Cargar Archivos
                        </Button>            
                    </Col>
                    
                </Row><Row>
                    </Row></>
            )}  
            
        </div>
    );
};
