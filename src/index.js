import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios'
import getConfig  from './config.json';
import {Spin } from 'antd';

const Index = () => {
  const [Parametros, setParametros] = useState([]);

  const contentStyle = {
    padding: 50,
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    height: '100%', 
  };
  const content = <div style={contentStyle} />;

  useEffect(() => {
    axios.get(`${getConfig.apiUrl}/TraerParametros`) 
      .then(data => {
        
        setParametros(data.data);
      })
      .catch(error => {
        alert(error.message);
      });
  }, []);

  return (
    <>
    {Parametros.length > 0 ? (
      <App data={Parametros} />
    ) : (
      <Spin tip="Cargado..." size="large">
        {content}
      </Spin>
    )}
  </>

  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index />);
