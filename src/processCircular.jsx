import React, { useState,useEffect } from 'react';
import { Progress } from 'antd';

export const BarCircular = (props) => {
    const [estado, setEstado] = useState(props.estado ? 'active' : 'exception');

    useEffect(() => {
      setEstado(props.estado ? 'active' : 'exception');
    }, [props.estado, props.numeroArchivosError]);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>
            <Progress percent={props.porjentaje} type="circle"  status={estado} size={200} />
        </div>
    );
};





