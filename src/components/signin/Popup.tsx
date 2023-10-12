import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
export default function Popup(props:any){
return (
<Modal
     show={props.show}
     dialogClassName="modal-90w"
     aria-labelledby="contained-modal-title-vcenter"
     centered
   >
     <>
   <div className='pt-20 flex justify-end'>
<FontAwesomeIcon icon={faClose} className="w-20 h-20 cursor-pointer mr-20" onClick={props.onHide}></FontAwesomeIcon>
    </div>
    {props.children}
    </>
  </Modal>
)
}