
import './css/App.css';
import {Formulario} from './formulario'
import {Bar} from './processbar'
import { useState,useEffect } from "react";

import { Collapse, Divider } from 'antd';
import axios from 'axios'
import { message,Button } from 'antd';
import { TableBasic } from "./tabla";
import { Terminos } from "./terminosDeUso";


function App() {
  const [porcentaje, setporcentaje] = useState(0);
  const [numeroArchivos, setnumeroArchivos] = useState(0);
  const [tipoError, setipoError] = useState(true);
  const [numeroArchivosError, setnumeronumeroArchivosError] = useState(0);
  const [fileData, setFileData] = useState([]);
  const [terminosUso, seterminosUso] = useState(false);
  
  

const cetearvalores =  async () => {
  setnumeronumeroArchivosError(0)
  setnumeroArchivos(0)
  setporcentaje(0)
  setFileData([])
  setipoError(true)
  seterminosUso(true)
  
}




const CargarArchivosCAC = async (fileList) => {
  try {
      const totalFiles = fileList.length;
      let uploadedFiles = 0;
      let numeroArchivosCargos = 0
      let numeroArchivosError = 0
      let newPorcentaje = 0
      
      for (const file of fileList) {
          const formData = new FormData();
          formData.append('file', new Blob([file.buffer], { type: 'application/octet-stream' }), file.name);
          formData.append('fileName', file.name);
          formData.append('fileExtension', file.extension);

          const response = await axios.post('http://api-pruebas.cuentadealtocosto.org/pruebasazure', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          });
          if (response.status === 200) {
              numeroArchivosCargos+= 1              
              setnumeroArchivos(numeroArchivosCargos) 
          } else {
              message.error(`Error ${response.data.ayuda}.`,4);
              numeroArchivosError+= 1              
              setnumeronumeroArchivosError(numeroArchivosError) 
              setipoError(false)
          }
          uploadedFiles += 1;
          newPorcentaje = Math.round((uploadedFiles / totalFiles) * 100);
          setporcentaje(newPorcentaje);
          const newFileData = {
            name: file.name,
            extension: file.extension,
            apiResponse: response.data.ayuda,
            statusText: response.status === 200 ? 'Cargado' : 'Error'
          };
          
          setFileData((prevData) => [...prevData, newFileData]);
      }
      if(newPorcentaje === 100 &&  porcentaje){
        message.success('Todos los archivos han sido cargados correctamente.');
      }else{
        message.warning('Error al cargar algunos archivos, descargue el archivo para mas detalles',4);
      }
      setTimeout(() => {
        setporcentaje(0);
      }, 4000)
  } catch (error) {
      message.error('Error al cargar algunos archivos.'+ error);
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
        {<Formulario  handleUploadFiles={CargarArchivosCAC} numeroArchivos ={numeroArchivos} numeroArchivosError = {numeroArchivosError} cetearvalores ={cetearvalores} fileData = {fileData} /> }
      <br/>
        {fileData.length > 0 && (
          <Collapse  size="large" items={[{ key: '1', label: 'Aquí descubres los detalles del cargue', children: <TableBasic data={fileData} />}]}/>
          )}
        </>
      ) : (
        <Terminos  cetearvalores={cetearvalores}/>
      )}


    </div>
  );
}


export default App;
