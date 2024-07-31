import React from 'react';
import MUIDataTable from 'mui-datatables';


export const TableBasic = ({ data }) => {
    const columns = [
        {
          name: "name",
          label: "Nombre Archivo",
          options: {
            filter: true,
            
            fixedHeader : true,
            setCellProps: () => ({style: {whiteSpace:'nowrap', backgroundColor: '#CACACA', textAlign:'left'}}),
            setCellHeaderProps: () => ({style: { backgroundColor: '#17539C', color:"white"}}),
          }
        },
        {
          name: "extension",
          label: "Extension",
          options: {
            filter: true,
            setCellProps: () => ({style: {whiteSpace:'nowrap'}}),
            setCellHeaderProps: () => ({style: { backgroundColor: '#17539C', color:"white"}}),
            customBodyRender: (value) => {
              return(
                <center>
                  <span>
                    {value}
                  </span>
                </center>
              );
            }
          }
        },
        
        {
          name: "statusText",
          label: "Estado",
          options: {
            filter: true,
            setCellHeaderProps: () => ({ style: { backgroundColor: '#17539C', color: "white" } }),
            customBodyRender: (value) => {
              let tagColor;
              let tagBorder;
              let tagBackGround;
              
              if (value === "Cargado") {
                tagColor = "#389e0d"; 
                tagBorder = "1px solid #b7eb8f"
                tagBackGround = '#f6ffed'
              } else {
                tagColor = "#d4380d"; 
                tagBorder = "1px solid #d4380d"
                tagBackGround = '#fff2e8'
              }
              return (
                <center>
                  <span style={{ color: tagColor, padding: '5px',border: tagBorder, borderRadius: '5px', background: tagBackGround }}>
                    {value}
                  </span>
                </center>
              );
            },
          },
        },
        {
          name: "apiResponse",
          label: "Ayuda",
          options: {
            filter: true,
            setCellHeaderProps: () => ({style: { backgroundColor: '#17539C', color:"white",  textAlign:'Center'}})
          }
        }
      ];
  
    
      
      const options = {
        filter: true,
        filterType: 'dropdown',
        responsive: 'standard',
        fixedHeader: true,
        fixedSelectColumn: true,
        // tableBodyHeight: '600px',
        selectableRowsHideCheckboxes: false,
        selectableRows: false,
        searchOpen: true,
        downloadOptions: {
            filename: 'Resultado Cargue.csv',
            separator: '|',
            filterOptions: {},
            useDisplayedColumnsOnly: false,
            useDisplayedRowsOnly: false,
            encoding: 'UTF-8',
        },
        textLabels: {
            body: {
                noMatch: "No se encontraron registros",
                toolTip: "Ordenar",
            },
            pagination: {
                next: "Siguiente",
                previous: "Anterior",
                rowsPerPage: "Filas por página", 
                displayRows: "de",
            },
            toolbar: {
                search: "Buscar",
                downloadCsv: "Descargar CSV",
                print: "Imprimir",
                viewColumns: "Ver columnas",
                filterTable: "Filtrar tabla",
            },
            filter: {
                all: "Todos",
                title: "FILTROS",
                reset: "RESET",
            },
            viewColumns: {
                title: "Mostrar columnas",
                titleAria: "Mostrar/ocultar columnas",
            },
            selectedRows: {
                text: "fila(s) seleccionada(s)",
                delete: "Eliminar",
                deleteAria: "Eliminar filas seleccionadas",
            },
        },
    };


      
 return (
    
    <MUIDataTable
      data={data}
      columns={columns}
      options = {options}
    />    
);
};

