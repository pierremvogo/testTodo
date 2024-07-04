import { Home, LabelOutlined, Person, Task } from "@mui/icons-material";
import logo from "../../assets/image/logo.png";
import Labels from "../../models/Label";

export const SideNav = () => {

    return (
        <nav>
            <ul>
                <li>
                    <a href="#">
                        <img src={logo} alt="" />
                        <span className="nav-item">Todo List</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <Home style={{ color: "black" }} className="fas" />
                        <span className="nav-item">Home</span>
                    </a>
                </li>
                <li>
                        // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a href="#">
                        <Task style={{ color: "black" }} className="fas" />
                        <span className="nav-item">Tasks</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <Person style={{ color: "black" }} className="fas" />
                        <span className="nav-item">Users</span>
                    </a>
                </li>
            </ul>
            <hr />
            <ul>
                <li>
                    <LabelOutlined style={{ color: "red", height: "30px" }} className="fas" />
                    <span className="nav-item-label">{Labels[0]}</span>
                </li>
                <li>
                    <LabelOutlined style={{ color: "blue", height: "30px" }} className="fas" />
                    <span className="nav-item-label">{Labels[1]}</span>
                </li>
                <li>
                    <LabelOutlined style={{ color: "green", height: "30px" }} className="fas" />
                    <span className="nav-item-label">{Labels[2]}</span>
                </li>
                <li>
                    <LabelOutlined style={{ color: "grey", height: "30px" }} className="fas" />
                    <span className="nav-item-label">{Labels[3]}</span>
                </li>
            </ul>
        </nav>
    );

};
