import { Add, Delete, Edit } from '@mui/icons-material';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import img1 from '../../assets/image/img1.jpg';
import { mock } from '../../mock/mock';
import mockDataPerson from '../../mock/person';
import FormPerson from '../forms/formPerson';
import CustomModal from '../modal/modal';
import "./style.scss";




mock.onGet("/api/person/getAll").reply(200,
  {
      person: mockDataPerson.data
  }
)
mock.onGet("api/person/getById").reply((id: any) => {
  try{
      const personId = id
      const personDetails = mockDataPerson.data.find(value => value.id === personId) 
      if(personDetails !== undefined){
          return [200, {
              status: true,
              responseData : personDetails,
              message: ""
          }]
      }else{
          return [404,{
              status: false,
              responseData : undefined,
              messsage: "Not found"
          }]
      }
  }catch(err){
      return [500, {
          status: false,
          message: "Internal Server error!"
      }]
  }
}
)
mock.onPut("api/person/update").reply((payload: any) => {
  let newList = [];
  try{
      if(payload.data === null){
          return [400, 
                  payload.data]
      }else{
          const jsonData = JSON.parse(payload.data)
          const personId = Number(jsonData.id)
          newList = mockDataPerson.data.map((items) => {
          return  items.id === personId? {...items,
                  name: jsonData.name,
                  email: jsonData.email,
                  phone: jsonData.phone,
              }: items});
          }
          mockDataPerson.data = newList;
          return [200, payload.data]
      
  }catch(err){
      return [500, {
          status: false,
          message: "Internal Server error!"
      }]
  }
}
)
mock.onDelete("api/person/delete").reply((id: any) => {
  try{
      const personId = id
      const getPersonIndex = mockDataPerson.data.findIndex(value => value.id === personId)
      mockDataPerson.data.splice(getPersonIndex, 1)
      return [200, {
          status: true,
          message: "Person delete sucessfully"
      }
      ]
      
  }catch(err){
      return [204, {
          status: false,
          message: "Failed to delete Person"
      }]
  }
}
)

const  PersonList =  React.forwardRef(({ getPerson }:any, ref) => {
  const childRef = useRef<any>();
  const [dataPerson, setDataPerson] = useState<any>([])
  const [gridRowsData, setGridRowsData] = useState<any>([])

  React.useImperativeHandle(ref, ()=>{
    return{
        getPerson: getAllPerson,
    }
})
const handleCallback = (newArray:[]) => {
  setDataPerson(newArray)
  childRef.current.closeModal();
}

const handleOpen = () => {
  childRef.current.openModal();
}

const editPerson = (idPerson:any) => {
  childRef.current.openModal();
}
const deletePerson = (idPerson:any) => {
  axios.delete("api/person/delete", idPerson)
  .then( async (response:any) =>  {
        console.log(response.data)
        setDataPerson(mockDataPerson.data)
  })
}

  const columns: GridColDef[] = [
    { field: 'col1', headerName: 'User', width: 150, editable:false, renderCell:params=>
                                                      <Avatar src={img1} />, 
                                                      sortable:false, 
                                                      filterable:false},
    { field: 'col2', headerName: 'Name', width: 150,  editable:false},
    { field: 'col3', headerName: 'Email', width: 250, editable:false},
    { field: 'col4', headerName: 'Phone', width: 250, editable:false },
    { field: 'col5', headerName: 'Edit',  renderCell:(params)=> {return <Button onClick={()=>editPerson(params.row.id)}><Edit style={{cursor:"pointer"}}   /></Button> ;},},
    { field: 'col6', headerName: 'Delete',  renderCell:(params)=> {return <Button onClick={()=>deletePerson(params.row.id)}><Delete style={{color:"red", cursor:"pointer"}}  /></Button> ;},},
    
  ];

 const rows: GridRowsProp = gridRowsData;
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const handleModal = () => {
    childRef.current.openModal();
  }

  const getAllPerson = () =>{
   axios.get("/api/person/getAll")
    .then( async (response:any) => {
        setDataPerson(response.data.person)
    })
    .catch(err => {
      console.log(err)
    })
    }
    useEffect(()=>{
      if(dataPerson.length !== 0 ){
        setGridRowsData([])
        console.log("Data Person: "+JSON.stringify(dataPerson.person))
        Object.keys(dataPerson).map((value:any,i:number)=>{
          return setGridRowsData((gridRowsData: any) => [...gridRowsData, {
            id:dataPerson[i].id,
            col1:dataPerson[i].id,
            col2:dataPerson[i].name,
            col3:dataPerson[i].email,
            col4:dataPerson[i].phone,
          }])
        })
        console.log(gridRowsData)
        return
      } getAllPerson();

    },[dataPerson])
  
  return (
    <>
      <Box
        sx={{
          heiht: 400,
          width: '100%'
        }}
      >
        
        <Typography
          variant='h4'
          component={'h3'}
          sx={{textAlign: 'center', mt:3, mb:3}}
        >
         <div className="task-title_">
            <div className="btn-task_">
              <Button className='btn_' variant= "outlined" onClick={handleOpen} startIcon={<Add />} >
                Add New Person
              </Button>
            </div>
          </div>
        </Typography>
        <DataGrid  
          rows={rows} 
          columns={columns}
          getRowId={row => row.id}
          />
      </Box>
      <CustomModal  ref={childRef}> 
        {<FormPerson  parentCallback={handleCallback} />} 
    </CustomModal>
    </>
    
   
  );
})

export default PersonList
