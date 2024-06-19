import { Add, Bolt, PeopleAlt, PriorityHigh, TaskAlt, TodayOutlined } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { mock } from "../../mock/mock";
import data from "../../mock/person";
import "../../styles/content.scss";
import TodoList from "../TodoList/TodoList";
import CustomButton from "../button/button";
import FormPerson from "../forms/formPerson";
import FormTask from "../forms/formTask";
import CustomModal from "../modal/modal";


mock.onGet("/api/person/getAll").reply(200,
    {
        person: data.person
    }
  )

export default function Content() {
    const childRef = useRef<any>();
    const childRef1 = useRef<any>();
    const [type, setType] = useState<any>("")
    const [dataPerson, setDataPerson] = useState<any>([])
    const [staff, setStaff] = useState<any>([])
    const [closeModal, setCloseModal] = useState(true)
    

   const handleCallback = () => {
        childRef1.current.getTask()
        childRef.current.closeModal();
    }
    const handleOpen = (param: any) => {
        if(param === "task"){
          setType("task")
            childRef.current.openModal();
        }else{
            setType("")
            childRef.current.openModal();
        } 
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getAllPerson = () =>{
        axios.get("/api/person/getAll")
         .then( async (response:any) => {
             console.log("Data Person --------: "+JSON.stringify(response.data.person))
             setDataPerson(response.data.person)
             console.log("Data Person --------: "+JSON.stringify(dataPerson))
         })
         .catch(err => {
           console.log(err)
         })
         }
    useEffect(() => {
        if(dataPerson.length !== 0 ){
            console.log(dataPerson);
            Object.keys(dataPerson).map((value:any,i:number)=>{
                return setStaff((staff: any) => [...staff, {
                value:dataPerson[i].id,
                label:dataPerson[i].name,
                }])
            })
            console.log("data Person : ",staff)
            return
        } 
        getAllPerson();
       },[dataPerson])

    const taskData =  [
        {
            variant: "outlined",
            title: "Add New Task",
            startIcon: Add,
        },
        {
            variant: "text",
            title: "All",
            startIcon: PeopleAlt,
            sorted: true
        },
        {
            variant: "text",
            title: "Priority",
            startIcon: PriorityHigh,
            sorted: true
        },
        {
            variant: "text",
            title: "Today",
            startIcon: TodayOutlined,
            sorted: true
        },
        {
            variant: "text",
            title: "Completed",
            startIcon: TaskAlt,
            sorted: true
        }

    ]
    const labelData = [
        {label: "HMTL", icon: <Bolt color="primary"/>},
        {label: "CSS", icon: <Bolt color="secondary" />},
        {label: "JQUERY", icon: <Bolt color="action" />},
        {label: "NODE", icon: <Bolt color="disabled" />}
    ]
    const sortedTask = () => {
        console.log("SortTask");
    }
  return (
    <>
    <div className="main">
        <div className="todoList">
        <div className="header flex">
            <div className="left-align">
                {taskData.map((value, index) => {
                    return(
                        <div key={index}> 
                            <CustomButton 
                                variant={taskData[index].variant} 
                                sx={{borderRadius: 28}}
                                onClick={() => !taskData[index].sorted?handleOpen("task"):sortedTask()}
                                uppercase={false}
                                startIcon={<value.startIcon />}
                                >
                                    {value.title}
                            </CustomButton>
                        </div>
                    )
                })}
            </div>
            <div style={{marginRight: "70%"}}>
            <div className="left-align">
                Labels
                {labelData.map((value, index) => {
                    return(
                        <div style={{marginTop:"15px"}} key={index}> 
                            <span>{labelData[index].icon}</span>
                            <span>{labelData[index].label}</span>
                        </div>
                    )
                })}
            </div>
            </div>
            <div style={{marginRight: "5%"}}>
            <div className="left-align">
            <CustomButton 
                variant={"outlined"} 
                sx={{borderRadius: 28}}
                onClick={() => handleOpen("")}
                uppercase={false}
                startIcon={<Add />}
                >
                Add New Person
            </CustomButton>
            </div>
            </div>
        </div>
            <TodoList ref={childRef1} /> 
        </div>
    </div>
     <CustomModal closeModal={closeModal} ref={childRef}> {type==="task"?<FormTask persons={staff} parentCallback={handleCallback} />: <FormPerson />} </CustomModal>
    </>
  );
}