import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import './MultiStep.css';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';

const Multistepform = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: 'levitaion@levitation.in',
    phone_number: '',
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    geolocation :'',
    single_file: [],
    multi_ups1: [],
    multi_ups2: [],
    multi_ups3: [],
  });
  const [geolocationStatus, setGeolocationStatus] = useState('');
  const [formSubmissionStatus, setFormSubmissionStatus] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const acquireGeolocation = () => {
    setGeolocationStatus('Acquiring geolocation...');

   
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setGeolocationStatus(`Geolocation captured: ${latitude}, ${longitude}`);
        },
        (error) => {
          console.log(error);
          setGeolocationStatus('Failed to capture geolocation');
        }
      );
    } else {
      setGeolocationStatus('Geolocation is not supported by this browser');
    }
  };

  useEffect(() => {
    
    acquireGeolocation();
  }, []);
  function handleNextStep() {
        if (step === 1) {
            if (!formData.name || !formData.email || !phoneNumber) {
                alert('Please fill in all the required fields.');
                return;
            }
        }
        setStep((prevStep) => prevStep + 1);
    }

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone_number', phoneNumber);
      formDataToSend.append('address_1', formData.address_1);
      formDataToSend.append('address_2', formData.address_2);
      formDataToSend.append('city', formData.city);
      formDataToSend.append('state', formData.state);
      formDataToSend.append('pincode', formData.pincode);
      formDataToSend.append('country', formData.country);
      formDataToSend.append('geolocation', formData.geolocation);
      formDataToSend.append('single_file', formData.single_file);
      formDataToSend.append('multi_ups1', formData.multi_ups1);
      if (formData.multi_ups2) {
        formDataToSend.append('multi_ups2', formData.multi_ups2);
      }
      if (formData.multi_ups3) {
        formDataToSend.append('multi_ups3', formData.multi_ups3);
      }

      const response = await axios.post(
        'https://x8ki-letl-twmt.n7.xano.io/apidoc:XooRuQbs/form',
        formDataToSend,
        // {
        //   headers: {
        //     'Content-Type': 'multipart/form-data',
        //     'media-Type':'application/json'
            
        //   },
        // }
      );

      console.log(response.data);

      if (response.status === 200) {
        setFormSubmissionStatus('Success');
      } else {
        setFormSubmissionStatus('Failed');
      }
    } catch (error) {
        
      console.log(error);
      setFormSubmissionStatus('Form submission failed');
    }
  };

  const handleFileUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    let updatedFiles = [];
  
    selectedFiles.forEach((file) => {
      if (file.type !== 'image/png' && file.type !== 'application/pdf') {
        alert('Only PNG and PDF files are allowed.');
        return;
      }
  
      if (file.size > 1048576) {
        alert('File size exceeds the limit of 1MB.');
        return;
      }
  
      updatedFiles.push(file);
    });
  
    if (formData.single_file.length + updatedFiles.length > 5) {
      alert('You can upload a maximum of 5 files. Please remove some files and try again.');
      return;
    }
  
    setFormData({ ...formData, single_file: [...formData.single_file, ...updatedFiles] });
  };
  
    const renderFormStep = () => {
        switch (step) {
            case 1:
                return (
                    <div id="page">
                    <h2>Step 1: Basic Details</h2>
                        <div>
                        <label htmlFor="name">Name</label>
                        <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        />
                        </div>
                        <div>
                        <label htmlFor="email">Email</label>
                        <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        />
                        </div>
                <div>
                        <label htmlFor="phone">Phone Number</label>
                        <PhoneInput
                        country={'in'}
                        value={phoneNumber}
                        onChange={setPhoneNumber}
                        inputProps={{
                        id: 'phone',
                        required: true,
                        }}
                        />
                        </div>
                </div>
            );
            case 2:
                return (
                <div id="page">
                <h2>Step 2: Address</h2>
                    <div>
                    <label htmlFor="addressLine1">Address Line 1</label>
                    <input
                    type="text"
                    id="addressLine1"
                    value={formData.address_1}
                    onChange={(e) =>
                    setFormData({ ...formData, address_1: e.target.value })
                    }
                    required
                    />
                    </div>
                <div>
                    <label htmlFor="addressLine2">Address Line 2</label>
                    <input
                    type="text"
                    id="addressLine2"
                    value={formData.address_2}
                    onChange={(e) =>
                    setFormData({ ...formData, address_2: e.target.value })
                    }
                    required
                    />
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input
                    type="text"
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                    />
                </div>
            <div>
                    <label htmlFor="state">State</label>
                    <input
                    type="text"
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    required
                    />
                </div>
            <div>
                    <label htmlFor="pincode">Pincode</label>
                    <input
                    type="text"
                    id="pincode"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    required
                    />
                </div>
            <div>
                    <label htmlFor="country">Country</label>
                    <input
                    type="text"
                    id="country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    required
                    />
                </div>
            </div>
            );
            case 3:
                return (
                    <div>
                    <h2>Step 3: Single File Upload</h2>
                    <input type="file" onChange={(e) => handleFileUpload(e, 'single_file')} />
                    </div>
                    );
            case 4:
                return (
                    <div>
                    <h2>Step 4: Multi File Upload</h2>
                    <input type="file" onChange={(e) => handleFileUpload(e, 'multi_ups1')} />
                    <input type="file" onChange={(e) => handleFileUpload(e, 'multi_ups2')} />
                    <input type="file" onChange={(e) => handleFileUpload(e, 'multi_ups3')} />
                    </div>
                    );
            case 5:
                return (
                <div>
                    <h2>Step 5: Status</h2>
                    <p>{formSubmissionStatus}</p>
                    </div>
                    );
                    default:
                    return null;
                    }
                };
                return (
                    <div id="main">
                        <h1>Multi-Step Form Page</h1>
                        <form onSubmit={handleFormSubmit}>
                            {renderFormStep()}
                            {step !== 1 && (
                            <button type="button" id="btn" onClick={handlePrevStep}>
                            Previous
                            </button>
                            )}
                            {step !== 5 && (
                            <button type="button" id="btn" onClick={handleNextStep}>
                            Next
                            </button>
                            )}
                            {step === 5 && <button type="submit" id="btn">Submit</button>}
                        </form>
                        {step === 4 && (
                            <>
                            <p>{geolocationStatus}</p>
                            <button type="button" onClick={acquireGeolocation}>
                                Acquire Geolocation
                            </button>
                            </>
                        )}
                    </div>
                    );
};

export default Multistepform;

