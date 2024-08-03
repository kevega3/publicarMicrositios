import React, { useState,useEffect } from 'react';
import { Progress,message } from 'antd';

export const Bar = (props) => {
    useEffect(() => {
        setEstado(props.tipoError ? 'active' : 'exception');
      }, [props.tipoError, props.numeroArchivosError]);

    const [estado, setEstado] = useState(props.tipoError ? 'active' : 'exception');
    if(props.porjentaje === 100 && estado === 'active'){ 
        message.success('Todos los archivos han sido cargados correctamente.')
    }else if (props.porjentaje === 100 && estado === 'exception'){
        console.log(props.porjentaje)
        message.warning('Alguno archivos no se cargaron correctamente, porfavor mire los detalles del cargue')
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>
            <Progress percent={props.porjentaje} type="line"  status={estado} />
        </div>

    );
};