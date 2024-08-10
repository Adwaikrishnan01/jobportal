import React from 'react'
import Button from '../ui/Button'
import { useDispatch } from 'react-redux'
import { closeModal } from '../../redux/slices/modalSlice'
import axios from '../../utils/AxiosConfig'
import Modal from './Modal'

const ConfirmationModal = () => {
  const dispatch=useDispatch()
 
  const handleDelete=async()=>{
     try{
      const response = await axios.delete('/admin/delete')
      dispatch(closeModal('confirmation'))
      window.location.reload
     }catch(error){
      console.log(error)
     }
  }
  return (
    <Modal name="confirmation" title="Attention">
    <div className='mx-2 my-1'>
      <div className='text-gray-700 text-wrap'>are you sure you want to delete this account ?</div>
    </div>
    <div className='w-full flex justify-between items-center gap-5 mt-4'>
      <Button outline label={"cancel"} small onClick={()=>dispatch(closeModal('confirmation'))}/>
      <Button small label={"delete"} onClick={handleDelete}/>
    </div>
   </Modal>
  )
}

export default ConfirmationModal