import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import * as React from 'react';

 const  CustomModal = React.forwardRef( ({children, closeModal}:any, ref) =>{
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    React.useImperativeHandle(ref, ()=>{
        return{
            openModal: handleOpen,
            closeModal: handleClose
        }
    })
    React.useEffect(()=>{
      console.log("my close Modal ---------"+closeModal)
    },[])
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 650,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

        return (
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                 
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {children}
                </Typography>
              </Box>
            </Modal>
          );
} )

export default CustomModal

