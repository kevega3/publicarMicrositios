import React, { useState ,useEffect} from 'react';
import { Transfer,Modal,Space,Button,} from 'antd';
import {SelectOutlined} from '@ant-design/icons';
import { green,red,blue } from '@ant-design/colors';

// El componente espera que `props.epsAPI` sea un arreglo de objetos con la clave `codigoEntidad`
export const Transfers = ({ epsAPI, funciondesabilitar, EnviarArchivosEntidades, Archivos, setArchivos }) => {
//   const epsAPI = props.epsAPI || []; // Usar un array vacío si epsAPI no está definido
  const dataSource = epsAPI.map((item, index) => ({
    key: index.toString(),
    value:item.codigoEntidad,
    title: item.codigoEntidad,
    description: `Description of ${item.codigoEntidad}`,
  }));

  
  const [targetKeys, setTargetKeys] = useState([]);
//   const [Archivos, setArchivos] = useState(Archivos);
useEffect(() => {
    funciondesabilitar();
}, [Archivos, funciondesabilitar]);

const handleFileChange2 = (newFiles) => {
    setArchivos(newFiles);
};


  const [selectedKeys, setSelectedKeys] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [valoresSeleccionados, setvaloresSeleccionados] = useState([]);


//   const handleFileChange2 = (newFiles) => {
//     setArchivos(newFiles);
// };

const handleChange = (newTargetKeys) => {
    setTargetKeys(newTargetKeys);
    const selectedValues = newTargetKeys.map(key => {
        const selectedItem = dataSource.find(item => item.key === key);
        return selectedItem ? selectedItem.value : null;
    }).filter(value => value !== null);
    setvaloresSeleccionados(selectedValues);
};

const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);

};

const handleScroll = (direction, e) => {

    // console.log('target:', e.target);
};


// modal

const [open, setOpen] = useState(false);

const showModal = () => {
    setOpen(true);
};
const handleOk = () => {
    setOpen(false);
};

const handleCancel = () => {
    setOpen(false);
};

const desactivo = () =>{
    let l = valoresSeleccionados.length > 0 ?  false: true
    return l

}
const cargarArchivosEntidades = async () => {
    handleOk();
    
    await EnviarArchivosEntidades(Archivos,valoresSeleccionados)
    setArchivos([])
}

const locale = {
    itemUnit: 'item',
    itemsUnit: 'items',
    searchPlaceholder: 'Buscar aquí', // Personalizar el placeholder del buscador
    notFoundContent: 'No se encontro ningun registro',
};


return (
        <><>
                <Space>
                    <Button 
                            type='primary'
                            size="medium"
                            icon={<SelectOutlined />}
                            onClick={showModal}
                            style={{ backgroundColor: blue[6], borderColor: blue[6], marginLeft:'5px' }} // Usa el color importado
                            disabled={funciondesabilitar()}
                            >
                        Cargue entidades seleccionadas
                    </Button>
                </Space>




                <Modal
                    open={open}
                    title={<span style={{ fontSize: '20px' }}>Seleccione las entidades a las cuales les va  compartir los archivos</span>}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    width={1000}
                    height={1000}                    
                        footer={[
                                    <Button key="back" 
                                    type='primary'
                                    size='large'
                                    style={{ backgroundColor: red[6], borderColor: red[6], margin: 20 }}
                                    onClick={handleCancel}
                                    >
                                        Cancerlar
                                    </Button>,
                                <Button 
                                    type='primary'
                                    size='large'
                                    style={{ backgroundColor: green[6], borderColor: green[6], margin: 20 }}
                                    
                                    disabled={desactivo()}
                                    
                                    onClick={() => cargarArchivosEntidades(Archivos)}
                                >
                                    Cargar Archivos
                                </Button>    
                                ]}                  >
                    <Transfer
                        dataSource={dataSource}
                        titles={['FUENTE', 'ENTIDADES A COMPARTIR']}
                        targetKeys={targetKeys}
                        selectedKeys={selectedKeys}
                        onChange={handleChange}
                        onSelectChange={handleSelectChange}
                        onScroll={handleScroll}
                        render={(item) => item.title}
                        disabled={disabled}
                        showSearch
                        oneWay
                        locale={locale}
                        searchPlaceholder='Busca aquí'
                        listStyle={{
                            width: '100vw',
                            height: '40vh',
                        }}
                        style={{
                            marginBottom: 16,
                    }} />
                    
                </Modal>
            </></>
            
    );
};

