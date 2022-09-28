import React, { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

const PopUp = ({ open, onClose, children }) => {
   // use this in parent component begins here
   // const [open, setOpen] = useState(false);
   // const onClickOpenModal = () => {
   //    setOpen(true);
   // };
   // use this in parent component ends here

   const closeIcon = (
      <svg width="15" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path
            d="M14.827 12.54c-1.502-1.46-3.58-3.458-5.568-5.262 1.596-1.832 3.432-3.46 5.218-5.205C15.694.882 13.99-.781 12.771.41c-1.81 1.774-3.496 3.603-5.12 5.46a83.02 83.02 0 0 0-5.336-4.29C1.037.644-.86 2.483.432 3.43a84.232 84.232 0 0 1 5.555 4.486c-1.591 1.97-3.072 4.03-4.41 6.247-.87 1.441 1.346 2.625 2.217 1.179 1.233-2.041 2.31-4.221 3.771-6.043a225.894 225.894 0 0 1 5.372 5.084c.75.73 2.64-1.112 1.89-1.842z"
            fill="#DADADA"
         />
      </svg>
   );

   return (
      <>
         {/* <button className="button" onClick={() => setOpen(true)}>
            open modal
         </button> */}

         <Modal
            open={open}
            onClose={onClose}
            // onClose={() => setOpen(false)} // use this function in parent component
            closeOnOverlayClick={false}
            closeOnEsc={false}
            center
            closeIcon={closeIcon}
            classNames={{
               overlayAnimationIn: 'customEnterOverlayAnimation',
               overlayAnimationOut: 'customLeaveOverlayAnimation',
               modalAnimationIn: 'customEnterModalAnimation',
               // modalAnimationOut: 'customLeaveModalAnimation',
            }}
            animationDuration={800}
         >
            {children}
            
         </Modal>
      </>
   );
};

export default PopUp;
