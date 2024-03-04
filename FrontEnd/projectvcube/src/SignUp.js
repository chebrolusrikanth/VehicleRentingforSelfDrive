import React, { useState } from 'react';
import './SignUp.css'; 
import axios from 'axios';
import LoginPage from './LoginPage';


const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        adharImage: null,
        bikeRCImage: null,
        drivingLicenseImage: null,
    });

    const [isChecked,setIsChecked]=useState(false);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({
            ...formData,
            [name]: files[0]
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            axios.post('http://127.0.0.1:8000/firstapp/signup/', {
                "firstname": formData["firstName"],
                "lastname": formData["lastName"],
                "email": formData["email"],
                "password": formData["password"],
                "phoneno": formData["phone"],
                "aadharimage": formData["adharImage"],
                "bikercimage": formData["bikeRCImage"],
                "licenseimage": formData["drivingLicenseImage"]
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((resp) => {
                alert("Account is created succesufully")
            }).catch((error) => {
                alert("Account details allready existing in our data base")
            });
        };
    };

    const validateForm = () => {
        let errors = {};
        let formIsValid = true;

        if (!formData.firstName) {
            formIsValid = false;
            errors["firstName"] = "Please enter your first name.";
        }
        if (!isChecked) {
          formIsValid = false;
          errors["drivingLicenseImage"] = "Please accept our terms and conditions";
      }

        if (!formData.lastName) {
            formIsValid = false;
            errors["lastName"] = "Please enter your last name.";
        }

        if (!formData.email) {
            formIsValid = false;
            errors["email"] = "Please enter your email address.";
        }

        if (!formData.password) {
            formIsValid = false;
            errors["password"] = "Please enter your password.";
        }
        if (!formData.phone || ((formData.phone.length>10) || (formData.phone.length<10))){
            formIsValid = false;
            
            errors["phone"] = "Don't enter +91 or country code";
        }

        if (!formData.adharImage) {
            formIsValid = false;
            errors["adharImage"] = "Please upload your Aadhar image.";
        }

        if (!formData.bikeRCImage) {
            formIsValid = false;
            errors["bikeRCImage"] = "Please upload your Bike RC image.";
        }

        if (!formData.drivingLicenseImage) {
            formIsValid = false;
            errors["drivingLicenseImage"] = "Please upload your Driving License image.";
        }
        
        setErrors(errors);
        return formIsValid;
    };

    return (
        <div className="sign-up-container">
            <div className="form-container">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} />
                        <span className="error">{errors["firstName"]}</span>
                        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} />
                        <span className="error">{errors["lastName"]}</span>
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
                        <span className="error">{errors["email"]}</span>
                        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
                        <span className="error">{errors["password"]}</span>
                        <input type="tel" name="phone" placeholder="Enter PhoneNo with out +91" value={formData.phone} onChange={handleInputChange} />
                        <span className="error">{errors["phone"]}</span>
                    </div>
                    <div className="input-group">
                        <label>Aadhar:</label>
                        <input type="file" name="adharImage" accept="image/*" onChange={handleFileChange} />
                        <span className="error">{errors["adharImage"]}</span>
                        <label>Vehicle RC:</label>
                        <input type="file" name="bikeRCImage" accept="image/*" onChange={handleFileChange} />
                        <span className="error">{errors["bikeRCImage"]}</span>
                        <label>Driving License:</label>
                        <input type="file" name="drivingLicenseImage" accept="image/*" onChange={handleFileChange} />
                        <span className="error">{errors["drivingLicenseImage"]}</span>
                    </div>
                    <button type="submit">Sign Up</button><br></br>
                    <input type='checkbox' onChange={handleCheckboxChange}></input>&nbsp;
                    <label>I accept the <a href='https://drive.google.com/file/d/1jWyqTlBvuHBNcaeiXyr2S4PI74QPXuuv/view?usp=drive_link'>terms and conditions</a></label>
                </form>
            </div>
        </div>
    );
};

export default SignUp;