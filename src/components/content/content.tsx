import { useEffect, useState } from "react";
import "../../styles/content.scss";
import PersonList from "../PersonList/PersonList";
import TodoList from "../TodoList/TodoList";
import SideNav from "../sideNav/sideNav";
import "./content.scss";

export default function Content() {
    const [type, setType] = useState<any>("task")
    
    useEffect(() => {
       
       },[])
       
    const openList = (type: any) => {
        setType(type)
    }
  return (
    <>
    <div className="container">
        <SideNav  displayList={openList}/>
        <div className="list">
           {type === "person"? <PersonList />: type==="task"? <TodoList  />:""}
        </div>
    </div>
    </>
  );
}