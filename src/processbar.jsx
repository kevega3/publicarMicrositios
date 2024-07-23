import React, { useState,useEffect } from 'react';
import { Progress } from 'antd';

export const Bar = (props) => {
    const [estado, setEstado] = useState(props.tipoError ? 'active' : 'exception');

    useEffect(() => {
      setEstado(props.tipoError ? 'active' : 'exception');
    }, [props.tipoError, props.numeroArchivosError]);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>
            <Progress percent={props.porjentaje} type="line"  status={estado} />
        </div>
    );
};

