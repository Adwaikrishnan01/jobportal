import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/slices/modalSlice';
import JobsFilter from './Filter'
import { IoNotificationsOutline } from 'react-icons/io5';
const Sidebar = ({ filters, onFilterChange,onApplyFilters,onClearFilters }) => {
  const dispatch=useDispatch()
    return ( 
         <div className="bg-gray-100 py-4">
          <JobsFilter 
          filters={filters} 
          onFilterChange={onFilterChange} 
          onApplyFilters={onApplyFilters} 
          onClearFilters={onClearFilters}
          />
          <div className='flex items-center space-around border-y border-slate-300 py-3 px-3 text-lg font-semibold text-gray-800 hover:bg-purple-200 cursor-pointer' 
          onClick={()=>{dispatch(openModal('notification'))}}>
          <IoNotificationsOutline size={18}/>
          <div className='ml-4'>Notifications</div>
         </div>
         </div>
     );
}

export default Sidebar;


