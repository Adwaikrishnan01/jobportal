import Accordion from '../Accordion';
import MenuItem from '../navbar/MenuItem'
import JobsFilter from './Filter'
const Sidebar = ({ filters, onFilterChange,onApplyFilters,onClearFilters }) => {

    return ( 
         <div className="hidden md:block w-1/6 bg-gray-100 py-4 shadow-md">
          <JobsFilter filters={filters} 
          onFilterChange={onFilterChange} 
          onApplyFilters={onApplyFilters} 
          onClearFilters={onClearFilters}
          />
         </div>

     );
}
 
export default Sidebar;


