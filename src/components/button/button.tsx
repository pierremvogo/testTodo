import { Button } from "@mui/material";
export default function CustomButton({children, ...attribute}:any){
        return (
            <Button  type="button" {...attribute}>
              {children}
            </Button>
          );
}
