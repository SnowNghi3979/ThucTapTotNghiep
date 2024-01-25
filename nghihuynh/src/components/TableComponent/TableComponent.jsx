import { Table } from 'antd';
import React, { useState } from 'react'
import Loading from '../../components/LoadingComponent/Loading'
import { Excel } from "antd-table-saveas-excel";
import { useMemo } from 'react';

const TableComponent = (props) => {
  const { selectionType = 'checkbox', data:dataSource = [], isLoading = false, columns = [], handleDelteMany } = props
  const [rowSelectedKeys, setRowSelectedKeys] = useState([])
  const newColumnExport = useMemo(() => {
    const arr = columns?.filter((col) => col.dataIndex !== 'action')
    return arr
  }, [columns])
  
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKeys(selectedRowKeys)
    },
    // getCheckboxProps: (record) => ({
    //   disabled: record.name === 'Disabled User',
    //   // Column configuration not to be checked
    //   name: record.name,
    // }),
  };
  const handleDeleteAll = () => {
    handleDelteMany(rowSelectedKeys)
  }
  const exportExcel = () => {
    const fileName = prompt("Nhập tên file (không cần phần mở rộng):");
    if (fileName) {
      const excel = new Excel();
      excel
        .addSheet("test")
        .addColumns(newColumnExport)
        .addDataSource(dataSource, {
          str2Percent: true
        })
        .saveAs(`${fileName}.xlsx`);
    }
  };
  
  return (
    <Loading isLoading={isLoading}>
      {!!rowSelectedKeys.length && (
        <div style={{
          background: '#ed380f',
          color: '#fff',
          fontWeight: 'bold',
          padding: '10px',
          cursor: 'pointer'
        }}
          onClick={handleDeleteAll}
        >
          Xóa tất cả
        </div>
      )}
      
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dataSource}
        {...props}
      />
      { <button onClick={exportExcel} style={{color:'white', backgroundColor:'#107c41'}}>Xuất File Excel</button> }
    </Loading>
  )
}

export default TableComponent