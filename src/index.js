import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Login} from './login.jsx'
import App from './App';
import axios from 'axios'
import getConfig  from './config.json';
import {Spin  } from 'antd';
import { Flex, Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
const Index = () => {
  const [Parametros, setParametros] = useState([]);
  
  const [Usuario, setUsuario] = useState(localStorage.getItem('usuario'));

  const isAuthenticated = () => {
    return Usuario !== null;
  };

  const contentStyle = {
    padding: 10,
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
    <Content style={contentStyle}>
    {Usuario ? (
              <>
                {Parametros.hasOwnProperty('epsCargueAzure') && Parametros.hasOwnProperty('parametrosCargueAzure') ? (
                  <App data={Parametros} />
                ) : (
                  <Spin tip="Cargado..." size="large">
                    {content}
                  </Spin>
                )}
              </>
            ) : (
              <Login setUsuario={setUsuario} />
            )}
    </Content>

  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index />);
