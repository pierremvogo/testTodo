import { Home, LabelOutlined, Person, Task } from "@mui/icons-material";
import logo from "../../assets/image/logo.png";
import Labels from "../../models/Label";
import "./style.scss";


const SideNav = ({displayList}: any) => {

  
        return (
            <nav>
                <ul>
                    <li>
                        <a href="#" className="logo">
                            <img src={logo} alt=""  />
                            <span className="nav-item-logo">Todo List</span>
                        </a>
                    </li>
                    <li className="btn">
                     
                            <Home  style={{color: "black"}} className="fas"/>
                            <span className="nav-item">Home</span>
                       
                    </li>
                    <li className="btn" onClick={()=>displayList("task")}>
                         
                            <Task  style={{color: "black"}} className="fas"/>
                            <span className="nav-item">Tasks</span>
                        
                    </li>
                    <li className="btn" onClick={()=>displayList("person")}>
                       
                             <Person  style={{color: "black"}} className="fas"/> 
                             <span className="nav-item">Users</span>
                      
                    </li>
                </ul>
                <hr />
                    <ul>
                        <li>
                            <LabelOutlined  style={{color: "red", height: "30px"}} className="fas"/>
                            <span className="nav-item-label">{Labels[0]}</span>
                        </li>
                        <li>
                            <LabelOutlined  style={{color: "blue", height: "30px"}} className="fas"/>
                            <span className="nav-item-label">{Labels[1]}</span>
                        </li>
                        <li>
                            <LabelOutlined  style={{color: "green", height: "30px"}} className="fas"/>
                            <span className="nav-item-label">{Labels[2]}</span>
                        </li>
                        <li>
                            <LabelOutlined  style={{color: "grey", height: "30px"}} className="fas"/>
                            <span className="nav-item-label">{Labels[3]}</span>
                        </li>
                    </ul>
            </nav>
        );
   
}

export default SideNav;