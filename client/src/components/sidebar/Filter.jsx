import React, { useState } from 'react';
import axios from 'axios';
import Accordion from '../Accordion';
import Input from '.././Input'
import Button from '../Button';
const JobFilter = ({ filters, onFilterChange,onApplyFilters ,onClearFilters}) => {
  const handleInputChange = (field, value) => {
    onFilterChange({ ...filters, [field]: value });
  };

  return (
    <div>
      <Accordion title={"Filter"} children={<>
      <Input
        type="text"
        label={"Locations"}
        value={filters.locations}
        onChange={(e) => handleInputChange('locations', e.target.value)}
        placeholder="Enter locations (comma-separated)"
      />
      <Input
        type="text"
        label={"Skills"}
        value={filters.skills}
        onChange={(e) => handleInputChange('skills', e.target.value)}
        placeholder="Enter skills (comma-separated)"
      />

      <h3 className='font-bold text-gray-700'>Salary Range</h3>
      <Input
        type="number"
        label={"min"}
        value={filters.minSalary}
        onChange={(e) => handleInputChange('minSalary', e.target.value)}
        placeholder="Min Salary"
      />
      <Input
        type="number"
        label={"max"}
        value={filters.maxSalary}
        onChange={(e) => handleInputChange('maxSalary', e.target.value)}
        placeholder="Max Salary"
      />

      <h3 className='font-bold text-gray-700'>Experience Range (years)</h3>
      <Input
        type="number"
        label={"min"}
        value={filters.minExperience}
        onChange={(e) => handleInputChange('minExperience', e.target.value)}
        placeholder="Min Experience"
      />
      <Input
        type="number"
        label={"max"}
        value={filters.maxExperience}
        onChange={(e) => handleInputChange('maxExperience', e.target.value)}
        placeholder="Max Experience"
      />
      <div className="flex space-x-2">
        <Button onClick={onClearFilters} label={"Clear"} small outline/>
        <Button onClick={onApplyFilters} label={"Apply"} small/>
      </div>
      </>}/>
    </div>
  );
};

export default JobFilter;