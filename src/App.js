
import './css/App.css';
import getConfig  from './config.json';
import {Formulario} from './formulario'
import {Bar} from './processbar'
import { useState ,useEffect} from "react";
import { Collapse } from 'antd';
import axios from 'axios'
import { message } from 'antd';
import { TableBasic } from "./tabla";
import { Terminos } from "./terminosDeUso";




function App({ data }) {
  

  const [porcentaje, setporcentaje] = useState(0);
  const [numeroArchivos, setnumeroArchivos] = useState(0);
  
  const [tipoError, setipoError] = useState(true);
  const [numeroArchivosError, setnumeronumeroArchivosError] = useState(0);
  const [fileData, setFileData] = useState([]);
  const [terminosUso, seterminosUso] = useState(false);
  const [ParametrosAPI, setParametrosAPI] = useState(data.parametrosCargueAzure);
  const [epsAPI, setepsAPI] = useState(data.epsCargueAzure);


  useEffect(() => {
  }, [tipoError]);

  
  useEffect(() => {
    setParametrosAPI(data);    
}, [data]); 



const cetearvalores =  async () => {
  setnumeronumeroArchivosError(0)
  setnumeroArchivos(0)
  setporcentaje(0)
  setFileData([])
  setipoError(true)
  seterminosUso(true)
}

    const EnviarArchivosEntidades = async (Archivos, valoresSeleccionados) => {
    try {
        const totalFiles = Archivos.length * valoresSeleccionados.length;
        let uploadedFiles = 0;
        let numeroArchivosCargados = 0;
        let numeroArchivosError = 0;
        let newFileDataArray = [];

        const uploadPromises = valoresSeleccionados.map(async (valor) => {
            const formData = new FormData();

            Archivos.forEach(file => {
                formData.append('files', new Blob([file.buffer], { type: 'application/octet-stream' }), file.name);
                formData.append('fileNames', file.name);
                formData.append('fileExtensions', file.extension);
            });
            formData.append('Entidad', valor);
            try {
                const response = await axios.post(`${getConfig.apiUrl}/enviarEntidades`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                response.data.forEach(fileResponse => {
                    const newFileData = {
                        name: fileResponse.nombreArchivo,
                        extension: fileResponse.extension,
                        apiResponse: fileResponse.ayuda,
                        statusText: fileResponse.error ? 'Error' : 'Cargado',
                        entidad: fileResponse.entidad 
                    };


                    newFileDataArray.push(newFileData);

                    if (!fileResponse.error) {
                        numeroArchivosCargados++;
                    } else {
                        numeroArchivosError++;
                    }
                    setipoError(numeroArchivosError > 0 ? false : true);
                    uploadedFiles++;
                    const newPorcentaje = Math.round((uploadedFiles / totalFiles) * 100);
                    setporcentaje(newPorcentaje);
                });
            } catch (error) {
                console.error('Error al subir archivos para la entidad:', valor, error);
                
            }
            
        });

        await Promise.all(uploadPromises);

        setFileData(prevData => [...prevData, ...newFileDataArray]);
        setnumeroArchivos(numeroArchivosCargados);
        setnumeronumeroArchivosError(numeroArchivosError);
        

        setTimeout(() => {
            setporcentaje(0);
        }, 4000);
    } catch (error) {
        message.error('Error al cargar algunos archivos.' + error);
        console.log(error);
    }
    };



const CargarArchivosCAC = async (fileList) => {
    console.log(fileList.length)
  try {
      const totalFiles = fileList.length;
      let uploadedFiles = 0;
      let numeroArchivosCargados = 0;
      let numeroArchivosError = 0;
      let newFileDataArray = [];

      const uploadPromises = fileList.map(async (file) => {
          const formData = new FormData();
          formData.append('file', new Blob([file.buffer], { type: 'application/octet-stream' }), file.name);
          formData.append('fileName', file.name);
          formData.append('fileExtension', file.extension);

          try {
              const response = await axios.post(`${getConfig.apiUrl}/pruebasazure`, formData, {
                  headers: {
                      'Content-Type': 'multipart/form-data'
                  }
              });

              const newFileData = {
                  name: file.name,
                  extension: file.extension,
                  apiResponse: response.data.ayuda,
                  statusText: response.status === 200 ? 'Cargado' : 'Error',
                  entidad: response.data.entidad 
              };

              newFileDataArray.push(newFileData);

              if (response.status === 200) {
                  numeroArchivosCargados++;
              } else {
                  numeroArchivosError++;
              }
              uploadedFiles++;
              const newPorcentaje = Math.round((uploadedFiles / totalFiles) * 100);
              setporcentaje(newPorcentaje);
              setipoError(numeroArchivosError > 0 ? false : true);
          } catch (error) {
              console.error('Error al subir el archivo:', file.name, error);
              numeroArchivosError++;
              uploadedFiles++;
              const newPorcentaje = Math.round((uploadedFiles / totalFiles) * 100);
              setporcentaje(newPorcentaje);
          }
      });

      await Promise.all(uploadPromises);
        setFileData(prevData => [...prevData, ...newFileDataArray]);
        setnumeroArchivos(numeroArchivosCargados);
        setnumeronumeroArchivosError(numeroArchivosError);
        
        
      setTimeout(() => {
          setporcentaje(0);
      }, 5000);
  } catch (error) {
      message.error('Error al cargar algunos archivos.' + error);
      console.log(error);
  }
};


return (
    <div className="App">
      <h1>Asistente de Cargue Archivos SISCAC 4.0</h1>
      {terminosUso ? (
        <>
        {porcentaje !== 0  && (
          <Bar porjentaje={porcentaje} tipoError ={tipoError}/>
        )}
        {<Formulario   
            handleUploadFiles={CargarArchivosCAC}
            numeroArchivos ={numeroArchivos}
            numeroArchivosError = {numeroArchivosError}
            cetearvalores ={cetearvalores}
            fileData = {fileData}
            epsAPI = {epsAPI}
            funcionEnviar = {EnviarArchivosEntidades}
        /> }

      <br/>
        {fileData.length > 0 && (
          <Collapse  size="large" items={[{ key: '1', label: 'Aquí descubres los detalles del cargue', children: <TableBasic data={fileData} />}]}/>
          )}
        </>
      ) : (
        <Terminos  cetearvalores={cetearvalores}  extenciones ={ParametrosAPI} />
      )}

        {/* /> */}
      
    </div>
  );
}


export default App;
