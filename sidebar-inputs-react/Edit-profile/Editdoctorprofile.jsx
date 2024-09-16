import React, { useState,useRef } from 'react';
import './editdoctorprofile.css';
import { TbSquareArrowLeft } from "react-icons/tb";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";
import profile from '../../../assests/doctorprofile.png'; 
import currencyCodes from 'currency-codes';
import { TiPlus } from "react-icons/ti";
import { MdDelete } from "react-icons/md";

const Editdoctorprofile = () => {
  const [doctorData, setDoctorData] = useState({
    name: 'Dr. John Doe',
    title: 'Cardiologist',
    about: 'Experienced in cardiovascular health management Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, reiciendis debitis perspiciatis quas, esse unde in error fuga laudantium incidunt distinctio ipsam, consequuntur commodi corrupti amet quos? Dignissimos, odio provident.',
    dob: '1980-05-14',
    gender: 'male',
    email: 'johndoe@example.com',
    mobile: '9876543210',
    city: 'New York',
    state: 'New York',
    country: 'USA',
    zipcode: '10001',
    availability: 'available',
    consultation: 'Both',
    specialities: ['Cardiology','homeworks'],
    conditions: ['Heart specialist'],
    languages: ['English', 'Spanish'],
    fees: 100,
    hospital: [{ hospitalName: '', address: '', city: '', state: '', country: '', zipcode: '' }],
    certificationProof:'',
    businessProof:'',
    licenseProof:'',
    insurance:['Heart'],
    awards:['good life','thank you '],
    faq:['No question']
  });


  const [isOpenPersonal, setIsOpenPersonal] = useState(true);
  const [isOpenDoctor, setIsOpenDoctor] = useState(false);
  const [isOpenFees, setIsOpenFees] = useState(false);
  const [isOpenHospital, setIsOpenHospital] = useState([false]);
  const [isOpenDocumentProof, setIsDocumentProof] = useState(false);
  const [isOpenOthers, setIsOpenOthers] = useState(false);
  const [profilePic, setProfilePic] = useState(profile);
  const [newSpecialitie, setNewSpecialitie] = useState('');  
  const [newCondition, setNewCondition] = useState(''); 
  const [newLanguage, setNewLanguage] = useState('');   
  const [currency, setCurrency] = useState('USD'); 
  const [fees, setFees] = useState(100);
  const [newInsurance, setNewInsurance] = useState(''); 
  const [newAwards, setNewAwards] = useState(''); 
  const [newFaq, setNewFaq] = useState(''); 

  const togglePersonalSection = () => setIsOpenPersonal(!isOpenPersonal);
  const toggleDoctorSection = () => setIsOpenDoctor(!isOpenDoctor);
  const toggleFeesSection = () => setIsOpenFees(!isOpenFees);
  const toggleHospitalSection = (index) => {
    setIsOpenHospital((prevState) =>
      prevState.map((open, i) => (i === index ? !open : open))
    );
  };
  const toggleDocumentProofSection = () => setIsDocumentProof(!isOpenDocumentProof);
  const toggleOthersSection = () => setIsOpenOthers(!isOpenOthers);


  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleProfilePicDelete = () => setProfilePic(profile);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setDoctorData({ ...doctorData, [id]: value });
  };

  //specialities
  const handleSpecialitiesKeyDown = (e) => {
    if (e.key === 'Enter' && newSpecialitie && !doctorData.specialities.includes(newSpecialitie)) {
      setDoctorData({ ...doctorData, specialities: [...doctorData.specialities, newSpecialitie] });
      setNewSpecialitie('');
    }
  };

  const handleSpecialitiesRemove = (specialities) => {
    setDoctorData({ ...doctorData, specialities: doctorData.specialities.filter((c) => c !== specialities) });
  };
  
  //conditions
  const handleConditionKeyDown = (e) => {
    if (e.key === 'Enter' && newCondition && !doctorData.conditions.includes(newCondition)) {
      setDoctorData({ ...doctorData, conditions: [...doctorData.conditions, newCondition] });
      setNewCondition('');
    }
  };

  const handleConditionRemove = (condition) => {
    setDoctorData({ ...doctorData, conditions: doctorData.conditions.filter((c) => c !== condition) });
  };
   
  //languages
  const handleLanguageKeyDown = (e) => {
    if (e.key === 'Enter' && newLanguage && !doctorData.languages.includes(newLanguage)) {
      setDoctorData({ ...doctorData, languages: [...doctorData.languages, newLanguage] });
      setNewLanguage('');
    }
  };

  const handleLanguageRemove = (language) => {
    setDoctorData({ ...doctorData, languages: doctorData.languages.filter((l) => l !== language) });
  };

  //Insurance

  const handleInsuranceKeyDown = (e) => {
    if (e.key === 'Enter' && newInsurance && !doctorData.insurance.includes(newInsurance)) {
      setDoctorData({ ...doctorData, insurance: [...doctorData.insurance, newInsurance] });
      setNewInsurance('');
    }
  };

  const handleInsuranceRemove = (insurance) => {
    setDoctorData({ ...doctorData, insurance: doctorData.insurance.filter((c) => c !== insurance) });
  };

  //Awards
  const handleAwardsKeyDown = (e) => {
    if (e.key === 'Enter' && newAwards && !doctorData.awards.includes(newAwards)) {
      setDoctorData({ ...doctorData, awards: [...doctorData.awards, newAwards] });
      setNewAwards('');
    }
  };

  const handleAwardsRemove = (awards) => {
    setDoctorData({ ...doctorData, awards: doctorData.awards.filter((c) => c !== awards) });
  };

  //FAQ's
  const handleFaqKeyDown = (e) => {
    if (e.key === 'Enter' && newFaq && !doctorData.faq.includes(newFaq)) {
      setDoctorData({ ...doctorData, faq: [...doctorData.faq, newFaq] });
      setNewFaq('');
    }
  };

  const handleFaqRemove = (faq) => {
    setDoctorData({ ...doctorData, faq: doctorData.faq.filter((c) => c !== faq) });
  };
  //end

  const currencyOptions = currencyCodes.data.map((currency) => ({
    code: currency.code,
    currency: currency.currency
  }));
   
  const handleHospitalInputChange = (index, field, value) => {
    const updatedHospitals = doctorData.hospital.map((hospital, i) =>
      i === index ? { ...hospital, [field]: value } : hospital
    );
    setDoctorData({ ...doctorData, hospital: updatedHospitals });
  };
  

  const addNewHospital = () => {
    setDoctorData({
      ...doctorData,
      hospital: [...doctorData.hospital, { hospitalName: '', address: '', city: '', state: '', country: '', pinCode: '' }],
    });
    setIsOpenHospital([...isOpenHospital, true]);
  };

  const handleRemoveHospital = (index) => {
    setDoctorData(prevData => {
      const updatedHospitals = prevData.hospital.filter((_, i) => i !== index);
      return { ...prevData, hospital: updatedHospitals };
    });
  };

  // Update handleFileChange function (remains unchanged)
  const handleFileChange = (e, field) => {
    const file = e.target.files[0]; 
    const allowedFileTypes = [
      'image/png', 
      'image/jpeg', 
      'application/pdf' 
    ];

    if (file) {
      if (allowedFileTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setDoctorData({ ...doctorData, [field]: file.name });
        };

        reader.readAsDataURL(file);
      } else {
        alert("Invalid file format. Please upload a PNG, JPG, or PDF file.");
      }
    }
  };

  // Create separate refs for each input
  const certificationProofInputRef = useRef(null);
  const businessProofInputRef = useRef(null);
  const licenseProofInputRef = useRef(null);
  
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isChecked) {
      alert("You must agree to the Terms and Conditions before proceeding.");
    } else {
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className='edit-your-profile-container'>
      <div className="edit-doctor-our-profile-header">
        <TbSquareArrowLeft className="back-arrow" onClick={() => window.history.back()} />
        <span className='title-head-to-title'>Edit your Profile</span>
      </div>

      <div className='edit-your-profile-support-to-support-conatiner'  onSubmit={handleSubmit}>
        <div className="profile-picture-section">
          <p className='profile-picture-title'>Profile picture</p>
          <div className='profile-picture-flex-direction'>
            <img src={profilePic} alt="Profile" className="profile-picture" />
            <p className='profile-text'>This will be displayed on your profile</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicUpload}
              id="upload-new"
              style={{ display: 'none' }}
            />
            <div className='profile-picture-all-buttons'>
              <button className="upload-btn" onClick={() => document.getElementById('upload-new').click()}>Upload new</button>
              <button className="delete-btn" onClick={handleProfilePicDelete}>Delete</button>
            </div>
          </div>
        </div>

        <div className='edit-doctor-scroll-conatiner'>
          <div className='edit-your-profile-all-input-details-header'>
            {/* Personal Details Section */}
            <div className={`edit-your-profile-details-section ${isOpenPersonal ? 'open' : 'closed'}`}>
              <div className="edit-your-profile-section-header">
                <h3>Personal details</h3>
                <span onClick={togglePersonalSection}>{isOpenPersonal ? <RiArrowUpSLine className='toggle-arrow' /> : <RiArrowDownSLine className='toggle-arrow' />}</span>
              </div>
              {isOpenPersonal && (
                <div className="edit-your-profile-section-content">
                  <div className="edop-form-row">
                    <div className="edop-form-group">
                      <label htmlFor="name">Name</label>
                      <input type="text" id="name" placeholder='Enter your full name' value={doctorData.name} onChange={handleInputChange} />
                    </div>
                    <div className="edop-form-group">
                      <label htmlFor="title">Title</label>
                      <input type="text" id="title" placeholder='Eg., Vascular Surgery' value={doctorData.title} onChange={handleInputChange} />
                    </div>
                  </div>

                  <div className="edop-form-row">
                    <div className="edop-form-group edop-full-width">
                      <label htmlFor="about">About</label>
                      <textarea id="about" placeholder='Describe yourself...' value={doctorData.about} onChange={handleInputChange}></textarea>
                    </div>
                  </div>

                  <div className="edop-form-row">
                    <div className="edop-form-group">
                      <label htmlFor="dob">Date of Birth</label>
                      <input type="date" id="dob" placeholder='mm-dd-yyyy' value={doctorData.dob} onChange={handleInputChange} />
                    </div>

                    <div className="edop-form-group edop-select-box-header">
                      <label htmlFor="gender">Gender</label>
                      <select id="gender" value={doctorData.gender} onChange={handleInputChange} className='edop-select-box-input'>
                        <option >Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      <RiArrowDownSLine className="edop-select-box-arrow-icon" />
                    </div>
                  </div>

                  <div className="edop-form-row">
                    <div className="edop-form-group">
                      <label htmlFor="email">Email</label>
                      <input type="email" id="email" placeholder='Enter your email' value={doctorData.email} onChange={handleInputChange} />
                    </div>

                    <div className="edop-form-group">
                      <label htmlFor="mobile">Mobile number</label>
                      <input type="tel" id="mobile" placeholder='Enter mobile number' value={doctorData.mobile} onChange={handleInputChange} />
                    </div>
                  </div>

                  <div className="edop-form-row">
                    <div className="edop-form-group">
                      <label htmlFor="city">City</label>
                      <input type="text" id="city" placeholder='Enter your city' value={doctorData.city} onChange={handleInputChange} />
                    </div>
                    <div className="edop-form-group">
                      <label htmlFor="state">State</label>
                      <input type="text" id="state" placeholder='Enter your state' value={doctorData.state} onChange={handleInputChange} />
                    </div>
                  </div>

                  <div className="edop-form-row">
                    <div className="edop-form-group">
                      <label htmlFor="country">Country</label>
                      <input type="text" id="country" placeholder='Enter your country' value={doctorData.country} onChange={handleInputChange} />
                    </div>

                    <div className="edop-form-group">
                      <label htmlFor="zipcode">Zip code</label>
                      <input type="text" id="zipcode" placeholder='Enter your zipcode' value={doctorData.zipcode} onChange={handleInputChange} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Doctor Details Section */}
            <div className={`edit-your-profile-details-section ${isOpenDoctor ? 'open' : 'closed'}`}>
              <div className="edit-your-profile-section-header">
                <h3>Doctor details</h3>
                <span onClick={toggleDoctorSection}>{isOpenDoctor ? <RiArrowUpSLine className='toggle-arrow' /> : <RiArrowDownSLine className='toggle-arrow' />}</span>
              </div>
              {isOpenDoctor && (
                <div className="edit-your-profile-section-content">

                  <div className="edop-form-row">
                    <div className="edop-form-group edop-full-width">
                      <label>Specialities</label>
                      <div className="tag-container">
                        {doctorData.specialities.map((specialitie, index) => (
                          <span key={index} className="tag-edit-doctor">
                            {specialitie} <button onClick={() => handleSpecialitiesRemove(specialitie)}>x</button>
                          </span>
                        ))}
                        <input
                          type="text"
                          placeholder="Add Specialities"
                          value={newSpecialitie}
                          onChange={(e) => setNewSpecialitie(e.target.value)}
                          onKeyDown={handleSpecialitiesKeyDown} // Add onKeyDown handler
                        />
                      </div>
                    </div>
                  </div>

                  <div className="edop-form-row">
                    <div className="edop-form-group edop-full-width">
                      <label>Conditions</label>
                      <div className="tag-container">
                        {doctorData.conditions.map((condition, index) => (
                          <span key={index} className="tag-edit-doctor">
                            {condition} <button onClick={() => handleConditionRemove(condition)}>x</button>
                          </span>
                        ))}
                        <input
                          type="text"
                          placeholder="Add condition"
                          value={newCondition}
                          onChange={(e) => setNewCondition(e.target.value)}
                          onKeyDown={handleConditionKeyDown} // Add onKeyDown handler
                        />
                      </div>
                    </div>
                  </div>

                  <div className="edop-form-row">
                    <div className="edop-form-group edop-full-width">
                      <label>Languages</label>
                      <div className="tag-container">
                        {doctorData.languages.map((language, index) => (
                          <span key={index} className="tag-edit-doctor">
                            {language} <button onClick={() => handleLanguageRemove(language)}>x</button>
                          </span>
                        ))}
                        <input
                          type="text"
                          placeholder="Add language"
                          value={newLanguage}
                          onChange={(e) => setNewLanguage(e.target.value)}
                          onKeyDown={handleLanguageKeyDown} // Add onKeyDown handler
                        />
                      </div>
                    </div>
                  </div>

                  <div className="edop-form-row">

                    <div className="edop-form-group edop-select-box-header">
                      <label htmlFor="availability">Availability</label>
                      <select id="availability" value={doctorData.availability} onChange={handleInputChange} className='edop-select-box-input'>
                        <option >Select availability </option>
                        <option value="available">Available</option>
                        <option value="unavailable">Unavailable</option>
                      </select>
                      <RiArrowDownSLine className="edop-select-box-arrow-icon" />
                    </div>

                    <div className="edop-form-group edop-select-box-header">
                      <label htmlFor="consultation">Consultation</label>
                      <select id="consultation" value={doctorData.consultation} onChange={handleInputChange} className='edop-select-box-input'>
                        <option >Select consultation </option>
                        <option value="Online">Online</option>
                        <option value="In Person">In Person</option>
                        <option value="Both">Both</option>
                      </select>
                      <RiArrowDownSLine className="edop-select-box-arrow-icon" />
                    </div>
                  </div>  
                </div>
              )}
            </div>
             
            {/* Hospital Section */}
            {doctorData.hospital.map((hospital, index) => (
              <div key={index} className={`edit-your-profile-details-section ${isOpenHospital[index] ? 'open' : 'closed'}`}>
                <div className="edit-your-profile-section-header">
                  <h3>Hospital details {index + 1}</h3>
                  <div className='edit-another-hospital-container'>
                    <div className='edit-another-hospital-container-icon-text'>
                      <TiPlus />
                      <span className='edit-another-hospital-container-text' onClick={addNewHospital}>Add another hospital</span>
                    </div>
                    <span onClick={() => toggleHospitalSection(index)}>
                      {isOpenHospital[index] ? <RiArrowUpSLine className='toggle-arrow' /> : <RiArrowDownSLine className='toggle-arrow' />}
                    </span>
                  </div>
                </div>
                {isOpenHospital[index] && (
                  <div className="hospital-content">

                    <div className="edop-form-row">
                      <div className="edop-form-group">
                        <label htmlFor={`hospitalName-${index}`}>Hospital Name</label>
                        <input
                          type="text"
                          id={`hospitalName-${index}`}
                          placeholder='Enter Hospital name'
                          value={hospital.hospitalName}
                          onChange={(e) => handleHospitalInputChange(index, 'hospitalName', e.target.value)}
                        />
                      </div>

                      <div className="edop-form-group">
                        <label htmlFor={`address-${index}`}>Address</label>
                        <input
                          type="text"
                          id={`address-${index}`}
                          placeholder='Enter Hospital full address'
                          value={hospital.address}
                          onChange={(e) => handleHospitalInputChange(index, 'address', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="edop-form-row">
                      <div className="edop-form-group">
                        <label htmlFor={`city-${index}`}>City</label>
                        <input
                          type="text"
                          id={`city-${index}`}
                          placeholder='Enter city'
                          value={hospital.city}
                          onChange={(e) => handleHospitalInputChange(index, 'city', e.target.value)}
                        />
                      </div>

                      <div className="edop-form-group">
                        <label htmlFor={`state-${index}`}>State</label>
                        <input
                          type="text"
                          id={`state-${index}`}
                          placeholder='Enter state'
                          value={hospital.state}
                          onChange={(e) => handleHospitalInputChange(index, 'state', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="edop-form-row">
                      <div className="edop-form-group">
                        <label htmlFor={`country-${index}`}>Country</label>
                        <input
                          type="text"
                          id={`country-${index}`}
                          placeholder='Enter country'
                          value={hospital.country}
                          onChange={(e) => handleHospitalInputChange(index, 'country', e.target.value)}
                        />
                      </div>

                      <div className="edop-form-group">
                        <label htmlFor={`pinCode-${index}`}>Zip Code</label>
                        <input
                          type="text"
                          id={`zipcode-${index}`}
                          placeholder='Enter pinCode'
                          value={hospital.zipcode}
                          onChange={(e) => handleHospitalInputChange(index, 'zipcode', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="edit-doctor-Update-container edit-doctor-location-button">
                      <button className="edit-doctor-Update-btn">Pin your location</button>
                      <button className="edit-doctor-Remove-btn" onClick={() => handleRemoveHospital(index)} ><MdDelete />Remove</button>
                    </div>

                  </div>
                )}
              </div>
            ))}

            {/* Document verification Details Section */}
            <div className={`edit-your-profile-details-section ${isOpenDocumentProof ? 'open' : 'closed'}`}>
              <div className="edit-your-profile-section-header">
                <h3>Document verification details</h3>
                <span onClick={toggleDocumentProofSection}>
                  {isOpenDocumentProof ? <RiArrowUpSLine className='toggle-arrow' /> : <RiArrowDownSLine className='toggle-arrow' />}
                </span>
              </div>

              {isOpenDocumentProof && (
                <div>
                  <div className="edop-form-row">

                    {/* Certification Proof */}
                    <div className='edop-form-group'>
                      <label>Certification Proof</label>
                      <div className="edit-doctor-profile-doc-Proof-file">
                        <input
                          type="file"
                          id="certificationProof"
                          ref={certificationProofInputRef}
                          className="edit-doctor-profile-doc-Proof-input"
                          onChange={(e) => handleFileChange(e, "certificationProof")}
                        />
                        <p className="edit-doctor-profile-doc-Proof-file-name">
                          {doctorData.certificationProof ? doctorData.certificationProof : "No file chosen"}
                        </p>
                        <div className="edit-doctor-profile-doc-Proof-choose-file" onClick={() => certificationProofInputRef.current.click()}>
                          <span>Choose File</span>
                        </div>
                      </div>
                    </div>

                    {/* Business Proof */}
                    <div className='edop-form-group'>
                      <label>Business Proof</label>
                      <div className="edit-doctor-profile-doc-Proof-file">
                        <input
                          type="file"
                          id="businessProof"
                          ref={businessProofInputRef}
                          className="edit-doctor-profile-doc-Proof-input"
                          onChange={(e) => handleFileChange(e, "businessProof")}
                        />
                        <p className="edit-doctor-profile-doc-Proof-file-name">
                          {doctorData.businessProof ? doctorData.businessProof : "No file chosen"}
                        </p>
                        <div className="edit-doctor-profile-doc-Proof-choose-file" onClick={() => businessProofInputRef.current.click()}>
                          <span>Choose File</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* License Proof */}
                  <div className="edop-form-group edop-form-padding-or-magin">
                    <label>License Proof</label>
                    <div className="edit-doctor-profile-doc-Proof-file">
                      <input
                        type="file"
                        id="licenseProof"
                        ref={licenseProofInputRef}
                        className="edit-doctor-profile-doc-Proof-input"
                        onChange={(e) => handleFileChange(e, "licenseProof")}
                      />
                      <p className="edit-doctor-profile-doc-Proof-file-name">
                        {doctorData.licenseProof ? doctorData.licenseProof : "No file chosen"}
                      </p>
                      <div className="edit-doctor-profile-doc-Proof-choose-file" onClick={() => licenseProofInputRef.current.click()}>
                        <span>Choose File</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Fees details Section */}
            <div className={`edit-your-profile-details-section ${isOpenFees ? 'open' : 'closed'}`}>
              <div className="edit-your-profile-section-header">
                <h3>Fees details</h3>
                <span onClick={toggleFeesSection}>{isOpenFees ? <RiArrowUpSLine className='toggle-arrow' /> : <RiArrowDownSLine className='toggle-arrow' />}</span>
              </div>
              {isOpenFees && (
                <div className="edit-doctor-fees-details-conatiner">
                  <span>Enter your fees</span>
                  <div className="fees-input-container">
                    <div className=''>
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="currency-dropdown"
                      >
                        {currencyOptions.map((option) => (
                          <option key={option.code} value={option.code}>
                            {option.code} ({option.currency})  {/* Show currency code and name */}
                          </option>
                        ))}
                      </select>
                    </div>
                    <input
                      type="number"
                      value={fees}
                      onChange={(e) => setFees(e.target.value)}
                      className="fees-input"
                      placeholder="Enter fee amount"
                    />
                  </div>
              </div>

              )}
            </div> 

            {/* Others Details Section */}
            <div className={`edit-your-profile-details-section ${isOpenOthers ? 'open' : 'closed'}`}>
              <div className="edit-your-profile-section-header">
                <h3>Others details</h3>
                <span onClick={toggleOthersSection}>{isOpenOthers ? <RiArrowUpSLine className='toggle-arrow' /> : <RiArrowDownSLine className='toggle-arrow' />}</span>
              </div>
              {isOpenOthers && (
                <div className="edit-your-profile-section-content">
                  <div className="edop-form-row">
                    <div className="edop-form-group edop-full-width">
                      <label>Insurance</label>
                      <div className="tag-container">
                        {doctorData.insurance.map((insurances, index) => (
                          <span key={index} className="tag-edit-doctor">
                            {insurances} <button onClick={() => handleInsuranceRemove(insurances)}>x</button>
                          </span>
                        ))}
                        <input
                          type="text"
                          placeholder="Add Insurance"
                          value={newInsurance}
                          onChange={(e) => setNewInsurance(e.target.value)}
                          onKeyDown={handleInsuranceKeyDown} // Add onKeyDown handler
                        />
                      </div>
                    </div>
                  </div>

                  <div className="edop-form-row">
                    <div className="edop-form-group edop-full-width">
                      <label>Awards</label>
                      <div className="tag-container">
                        {doctorData.awards.map((award, index) => (
                          <span key={index} className="tag-edit-doctor">
                            {award} <button onClick={() => handleAwardsRemove(award)}>x</button>
                          </span>
                        ))}
                        <input
                          type="text"
                          placeholder="Add Awards"
                          value={newAwards}
                          onChange={(e) => setNewAwards(e.target.value)}
                          onKeyDown={handleAwardsKeyDown} // Add onKeyDown handler
                        />
                      </div>
                    </div>
                  </div>

                  <div className="edop-form-row">
                    <div className="edop-form-group edop-full-width">
                      <label>FAQ’s</label>
                      <div className="tag-container">
                        {doctorData.faq.map((faqs, index) => (
                          <span key={index} className="tag-edit-doctor">
                            {faqs} <button onClick={() => handleFaqRemove(faqs)}>x</button>
                          </span>
                        ))}
                        <input
                          type="text"
                          placeholder="Add FAQ’s"
                          value={newFaq}
                          onChange={(e) => setNewFaq(e.target.value)}
                          onKeyDown={handleFaqKeyDown} // Add onKeyDown handler
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>    
            
            <div>
              <div>
                <input
                  type="checkbox"
                  id="terms"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <span htmlFor="terms">
                  I agree to the{" "}
                  <a href="/terms" target="_blank" rel="noopener noreferrer">
                    Terms and Conditions
                  </a>
                </span>
              </div>

              <small>Please read and accept our Terms and Conditions before submitting.</small>
              <div className={`edit-doctor-Update-container${!isChecked ? "disabled" : ""}`} >
                <button className="edit-doctor-Update-btn mt-3" type="submit" disabled={!isChecked}>Update Profile</button>
              </div>
            </div>
          </div>  
        </div>
      </div>
    </div>
  );
};

export default Editdoctorprofile;
