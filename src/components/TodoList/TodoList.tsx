import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { mock } from '../../mock/mock';
import { task } from '../../mock/task';





mock.onGet("/api/task/getAll").reply(200,
  {
      task: task.data
  }
)

//pour enregistrer une tâche
mock.onPost("api/task/add").reply((payload: any) => {
  try{
      if(payload.data === null){
          return [400, payload.data]
      }else{
          const jsonPayload = JSON.parse(payload.data)
          jsonPayload.id = task.data.length + 
          task.data.push(jsonPayload)
      }
      return [200, payload.data]
  }catch(err){
      return [500, {
          status: false,
          message: "Internal Server error!"
      }]
  }
}
)

//pour récupérer une tâche 
mock.onGet("api/task/getById").reply((payload: any) => {
  try{
      const id = payload.id
      const taskId = Number(id)
      const taskDetails = task.data.find(value => value.id === taskId) 
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
          newList = task.data.map((items) => {
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
          task.data = newList;
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
mock.onDelete("api/task/delete").reply((payload: any) => {
  try{
      const id = payload.id
      const taskId = Number(id)
      const getTaskIndex = task.data.findIndex(value => value.id === taskId)
      task.data.splice(getTaskIndex, 1)
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

export default function TodoList() {
  const [dataTask, setDataTask] = useState<any>([])
  const [gridRowsData, setGridRowsData] = useState<any>([])

  const columns: GridColDef[] = [
    { field: 'col1', headerName: 'User', width: 150 },
    { field: 'col2', headerName: 'Task Title', width: 150 },
    { field: 'col3', headerName: 'Description', width: 250 },
    { field: 'col4', headerName: 'Labels', width: 250 },
    { field: 'col5', headerName: 'Start Date', width: 250 },
    { field: 'col6', headerName: 'End Date', width: 250 },
    { field: 'col7', headerName: 'Complited', width: 250 },
  ];

 const rows: GridRowsProp = gridRowsData;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getAllTask = () =>{
   axios.get("/api/task/getAll")
    .then( async (response:any) => {
        setDataTask(response.data.task)
        console.log("Data Task: "+JSON.stringify(dataTask))
    })
    .catch(err => {
      console.log(err)
    })
    }
    useEffect(()=>{
      if(dataTask.length !== 0 ){
        console.log(dataTask);
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
    <div style={{ height: 300, width: '100%' }}>
       <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
