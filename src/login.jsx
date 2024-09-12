import React, { useState,useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { Col, Row } from 'antd';
import axios  from 'axios';
import getConfig from './config.json'
import { UserOutlined,SecurityScanOutlined } from "@ant-design/icons";
export const Login = ({setUsuario}) => {
    
    const [loadings, setLoadings] = useState([]);
    // const [Usuario,setUsuario] = useState(props.Usuario)

    // useEffect(() => {
    //     setUsuario(props.Usuario);
    //   }, [props.Usuario]);

    const activateLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    };

    const pauseLoading = (index) => {

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 1000);
    };



    const Swal = require('sweetalert2')
    
    const onFinish = (values) => {
        try {
            activateLoading(3);
            const body = {
                username: values.username,
                password: values.password
            };
            
            axios.post(`${getConfig.apiUrl}/login`, body)
                .then(response => {
                    pauseLoading(3);
                    const token = response.data.username;
                    console.log(token)
                    if (token) {
                        localStorage.setItem('usuario', token);
                        setUsuario(token)
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "No se pudo iniciar sesión. Intente nuevamente."
                        });
                    }
                })
                .catch(error => {
                    pauseLoading(3);
                    let MensajeAmigable = error.response.data.ayuda || 'Error Desconocido'
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: MensajeAmigable,
                    });
                });
        } catch (err) {
            pauseLoading(3);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err.message
            });
        }
    };
    

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: 'Porfavor ingrese sus credenciales de  Windows'
        });
    };


    return (   
        <><Row>
            <Col>
                <h1 style={{textAlign:'center'}}>Login Cargue Archivos Micrositios</h1>
            </Col>
        </Row>
        <Row  style={{paddingLeft:45}}>  
            
                <Col span={24} >
                
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            minWidth: 500,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >


                        <Form.Item

                            name="username"

                            rules={[
                                {
                                    required: true,
                                    message: "Digita El numero de documento",
                                },
                            ]}
                        >
                            <Input
                                style={{ height: 60, fontSize: 17, color: '#173092' }}
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Usuario" />

                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Porfavor agregue la contraseña!',
                                },
                            ]}
                        >
                            <Input.Password style={{ height: 60, fontSize:17, color: '#173092' }}
                                prefix={<SecurityScanOutlined className="site-form-item-icon" />}
                                placeholder="Usuario" />

                        </Form.Item>
                        
                        <Form.Item  >


                            
                            <Button
                                style={{
                                    height: 50,
                                    minWidth : 330 ,
                                    fontSize: 15,
                                    backgroundColor: '#173092',
                                    borderColor: '#173092',
                                    color: '#FFFFF',
                                    justifyContent:"center"
                                }}
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                loading={loadings[3]}

                            >
                                Entrar
                            </Button>
                        
                        </Form.Item>
                    </Form>

                </Col>
            </Row></>

    );
};