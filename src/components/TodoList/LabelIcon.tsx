import { LabelOutlined } from "@mui/icons-material";
import { useEffect } from "react";

const  LabelIcon = ({params}: any) =>  {
        useEffect(()=>{
            console.log("MY PARAMS: ", params.row.col4)
        },[])
        return (
           <>
               <LabelOutlined  style={{color: "red", height: "30px"}} />
               {
                 params.row.col4.forEach((element:any) => {
                 console.log("ROW LABEL :", element)
                return(
                    element === "HTML"? <LabelOutlined  style={{color: "red", height: "30px"}} />:
                    element === "CSS"? <LabelOutlined  style={{color: "blue", height: "30px"}} />:
                    element === "JQUERY"? <LabelOutlined  style={{color: "green", height: "30px"}} />: 
                    element === "NODE JS"? <LabelOutlined  style={{color: "gray", height: "30px"}} />: ""
                )
               })}
           </>
        );
}

export default LabelIcon;