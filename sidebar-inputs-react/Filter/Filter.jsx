import React, { useState } from 'react';
//imported style.css
import './filter.css';

//imported and install bootstrap-icons
import 'bootstrap-icons/font/bootstrap-icons.css';

//imported react-iocns 
import { RiArrowDownSLine } from "react-icons/ri";
import { FiCalendar } from "react-icons/fi";

const Filter = () => {
  /*first set defult value*/
  const [filters, setFilters] = useState({
    specialty: 'All Specialty',
    gender: '',
    date: '',
    hospital: '',
    language: '',
    consultation: '',
    availability: '',
    condition: '',
  });
  
  /*onclick events*/
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  
  /*reset button Logic start */
  const handleReset = () => {
    setFilters({
      specialty: 'All Specialty',
      gender: '',
      date: '',
      hospital: '',
      language: '',
      consultation: '',
      availability: '',
      condition: '',
    });
  };
  /*reset button Logic End */


  return (
    <div className='m-2'>
      <div className="sidebar-filter">
        <div className='filter-heading-reset'>
          <h5>Filter</h5>
          <button onClick={handleReset}><i className="bi bi-arrow-counterclockwise "/> Reset Filter</button>
        </div>

        <div className="select-container-filter">
          <div className="form-group">
            <label>Specialty</label>
            <select name="specialty" value={filters.specialty} onChange={handleChange}>
              <option>All Specialty</option>
            </select>
            <RiArrowDownSLine className="arrow-icon-filter" />
          </div>
        </div>

        <div className="select-container-filter">
          <div className="form-group">
            <label>Gender</label>
            <select name="gender" value={filters.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
            </select>
            <RiArrowDownSLine className="arrow-icon-filter" />
          </div>
        </div>
        
        <div className="select-container-filter">
          <div className="form-group">
            <label>By Date</label>
            <div className="date-input-container">
              <input type="date" name="date" value={filters.date} onChange={handleChange} />
              <FiCalendar className="custom-calendar-icon" />
            </div>
          </div>
        </div>

        <div className="select-container-filter">
          <div className="form-group">
            <label>By Hospital Name</label>
            <select name="hospital" value={filters.hospital} onChange={handleChange}>
              <option value="">Hospital name</option>
            </select>
            <RiArrowDownSLine className="arrow-icon-filter" />
          </div>
        </div>

        <div className="select-container-filter">
          <div className="form-group">
            <label>Language</label>
            <select name="language" value={filters.language} onChange={handleChange}>
              <option value="">Select Language</option>
            </select>
            <RiArrowDownSLine className="arrow-icon-filter" />
          </div>
        </div>

        <div className="select-container-filter">
          <div className="form-group">
            <label>By Consultation</label>
            <select name="consultation" value={filters.consultation} onChange={handleChange}>
              <option value="">Consultation Type</option>
            </select>
            <RiArrowDownSLine className="arrow-icon-filter" />
          </div>
        </div>

        <div className="select-container-filter">
          <div className="form-group">
            <label>By Availability</label>
            <select name="availability" value={filters.availability} onChange={handleChange}>
              <option value="">Availability</option>
            </select>
            <RiArrowDownSLine className="arrow-icon-filter" />
          </div>
        </div>

        <div className="select-container-filter">
          <div className="form-group">
            <label>By Condition</label>
            <select name="condition" value={filters.condition} onChange={handleChange}>
              <option value="">Condition Type</option>
            </select>
            <RiArrowDownSLine className="arrow-icon-filter" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
