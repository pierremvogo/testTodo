import { Add, Delete, Done, Edit, LabelOutlined, PriorityHigh, Today } from '@mui/icons-material';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import img1 from '../../assets/image/img1.jpg';
import { mock } from '../../mock/mock';
import mockDataTask from '../../mock/task';
import FormTask from '../forms/formTask';
import CustomModal from '../modal/modal';
import "./style.scss";





mock.onGet("/api/task/getAll").reply(200,
  {
      task: mockDataTask.data
  }
)

mock.onGet("api/task/getById").reply((payload: any) => {
  try{
      const id = payload.id
      const taskId = Number(id)
      const taskDetails = mockDataTask.data.find(value => value.id === taskId) 
      if(taskDetails !== undefined){
          return [200, {
              status: true,
              responseData : taskDetails,
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

//pour mettre à jour une tâche
mock.onPut("api/task/update").reply((payload: any) => {
  let newList = [];
  try{
      if(payload.data === null){
          return [400, 
                  payload.data]
      }else{
          const jsonData = JSON.parse(payload.data)
          const taskId = Number(jsonData.id)
          newList = mockDataTask.data.map((items) => {
          return  items.id === taskId? {...items,
                  title: jsonData.title,
                  person_id: jsonData.personId,
                  startDate: jsonData.startDate,
                  endDate: jsonData.endDate,
                  priority: jsonData.priority,
                  labels: jsonData.labels,
                  description: jsonData.description,
                  complited: jsonData.complited
              }: items});
          }
          mockDataTask.data = newList;
          return [200, payload.data]
      
  }catch(err){
      return [500, {
          status: false,
          message: "Internal Server error!"
      }]
  }
}
)
//pour supprimer une tâche
mock.onDelete("api/task/delete").reply((id: any) => {
  try{

      const taskId = id
      const getTaskIndex = mockDataTask.data.findIndex(value => value.id === taskId)
      mockDataTask.data.splice(getTaskIndex, 1)
      return [200, {
          status: true,
          message: "Task delete sucessfully"
      }
      ]
      
  }catch(err){
      return [204, {
          status: false,
          message: "Failed to delete task"
      }]
  }
}
)


const  TodoList =  React.forwardRef(({ getTask }:any, ref) => {
  const childRef = useRef<any>();

  const [dataTask, setDataTask] = useState<any>([])
  const [gridRowsData, setGridRowsData] = useState<any>([])
  const [staff, setStaff] = useState<any>([])

  const handleCallback = (newArray:[]) => {
    setDataTask(newArray)
    childRef.current.closeModal();
}

  React.useImperativeHandle(ref, ()=>{
    return{
        getTask: getAllTask,
    }
})

const handleModal = () => {
  childRef.current.openModal();
}

const editTask = (idTask:any) => {
  childRef.current.openModal();
}
const deleteTask = (idTask:any) => {
  axios.delete("api/task/delete", idTask)
  .then( async (response:any) =>  {
    setDataTask(mockDataTask.data)
})}


  const columns: GridColDef[] = [
    { field: 'col1', headerName: 'User', width: 150, editable:false, renderCell:params=>
                                                      <Avatar src={img1} />, 
                                                      sortable:false, 
                                                      filterable:false},
    { field: 'col2', headerName: 'Task Title', width: 150,  editable:false},
    { field: 'col3', headerName: 'Description', width: 250, editable:false},
    { field: 'col4', headerName: 'Labels', width: 200, editable:false, renderCell:(params)=>{
      return Object.keys(params.row.col4).map((key) => { 
        return params.row.col4[key] === "HTML"?
        <LabelOutlined  style={{color: "red", height: "30px"}} />:
        params.row.col4[key] === "CSS"?
        <LabelOutlined  style={{color: "blue", height: "30px"}} />: 
        params.row.col4[key] === "JQUERY"?
        <LabelOutlined  style={{color: "green", height: "30px"}} />:
        params.row.col4[key] === "NODE JS"?
        <LabelOutlined  style={{color: "grey", height: "30px"}} />:""; });
    } },
    { field: 'col5', headerName: 'Start Date', width: 200, editable:false, renderCell:params=>
                                                      moment(params.row.startDate).format('YYYY-MM-DD HH-MM-SS')},
    { field: 'col6', headerName: 'End Date', width: 200, editable:false, renderCell:params=>
                                                      moment(params.row.endDate).format('YYYY-MM-DD HH-MM-SS') },
    { field: 'col7', headerName: 'Complited', width: 200, editable:false, },
    { field: 'col8', headerName: 'Edit',  renderCell:(params)=> {
                                                      return <Button onClick={()=>editTask(params.row.id)}><Edit style={{cursor:"pointer"}}   /></Button> ;
                                                },
                                                
                                              },
    { field: 'col9', headerName: 'Delete',  renderCell:(params)=> {
                                                return <Button onClick={()=>deleteTask(params.row.id)}><Delete style={{color:"red", cursor:"pointer"}}  /></Button> ;
                                          },
                                          
                                        },
                                              
  ];

 const rows: GridRowsProp = gridRowsData;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getAllTask = () => {
   axios.get("/api/task/getAll")
    .then( async (response:any) => {
        setDataTask(response.data.task)
    })
    .catch(err => {
      console.log(err)
    })
    }
    
    useEffect(()=>{
      if(dataTask.length !== 0 ){
        setGridRowsData([])
        Object.keys(dataTask).map((value:any,i:number)=>{
          return setGridRowsData((gridRowsData: any) => [...gridRowsData, {
            id:dataTask[i].id,
            col1:dataTask[i].id,
            col2:dataTask[i].title,
            col3:dataTask[i].description,
            col4:dataTask[i].labels,
            col5:dataTask[i].startDate,
            col6:dataTask[i].endDate,
            col7:dataTask[i].complited
          }])
        })
        console.log(gridRowsData)
        return
      } getAllTask();

    },[dataTask])
  
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
          <div className="task-title">
            <div className="btn-task">
              <Button className='btn' variant= "outlined" startIcon={<PriorityHigh />} >
                Priority
              </Button>
              <Button className='btn' variant= "outlined" startIcon={<Today />} >
                Today
              </Button>
              <Button className='btn' variant= "outlined" startIcon={<Done />} >
                Completed
              </Button>
              <Button className='btn-add' variant= "outlined" onClick={handleModal} startIcon={<Add />} >
                Add New Task
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
        {<FormTask persons={staff} parentCallback={handleCallback} />} 
    </CustomModal>
    </>
   
  );
})

export default TodoList
