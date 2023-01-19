import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import axios from './../utils/axios'
import Button from '@mui/material/Button';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';


function getEmployeeId(params: any) {
  return `${params.row.employee.id}`;
}

function getEmployeeName(params: any) {
  return `${params.row.employee.name}`;
}

function getCheckIn(params: any) {
  return params.row.checkin ?? 'N/A' 
}


function getCheckOut(params: any) {
  return params.row.checkout ?? 'N/A' 
}


const columns: GridColDef[] = [
  { field: 'employee.id', headerName: 'Id', width: 200, valueGetter: getEmployeeId},
  { field: 'employee.name', headerName: 'Name', width: 200, valueGetter: getEmployeeName},
  { field: 'checkin', headerName: 'Checkin', width: 200, valueGetter: getCheckIn},
  { field: 'checkout', headerName: 'Checkout', width: 200, valueGetter: getCheckOut},
  { field: 'hours', headerName: 'Hours', width: 200},
];


export default function Home() {

  const [data, setData] = useState([])
  const getData = async () => {
    const attendances:any = await axios().get('attendances')
    setData(attendances.data.attendances)
  };

  useEffect(()=>{
    getData()
  }, [])

  return (
    <>
      <Head>
        <title>Code Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {console.log(data)}
      <div style={{ height: 300, width: '100%' }}>
        {data && (
          
          <DataGrid rows={data} columns={columns} />
        )}
    </div>
    </>
  )
}
