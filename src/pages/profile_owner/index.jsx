import React, { useState } from 'react';
import "../../pages/profile_owner/index.css";
import SideNavProfileOwner from './sidenav';

const ProfileOwner = () => {
    const [formData, setFormData] = useState({
        username: '',
        fullName: '',
        email: '',
        phoneNumber: '',
        gender: '',
        dateOfBirth: '',
        profilePicture: null
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                profilePicture: URL.createObjectURL(file)
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Handle form submission logic here
    };

    return (
        
        <div className="profile-page">
           
            <div className="profile-container">
                <h2 className="profile-title">My Profile</h2>

                <div className="profile-picture-container">
                    <label className="profile-picture-label">
                        <div className="profile-picture-placeholder">
                            {formData.profilePicture ? (
                                <img
                                    src={formData.profilePicture}
                                    alt="Profile"
                                    className="profile-image"
                                />
                            ) : (
                                <span className="upload-text">
                                    Click to upload profile picture
                                </span>
                            )}
                        </div>
                        <input
                            type="file"
                            className="hidden-input"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </label>
                </div>

                <form onSubmit={handleSubmit} className="profile-form">
                    <div className="form-group">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            label="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Telephone Number</label>
                        <div className="phone-input-container">
                            <input
                                type="text"
                                value="+62"
                                className="country-code"
                                readOnly
                            />
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                className="form-input phone-input"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Gender</label>
                        <div className="radio-group">
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={formData.gender === 'male'}
                                    onChange={handleInputChange}
                                />
                                <span>Male</span>
                            </label>
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={formData.gender === 'female'}
                                    onChange={handleInputChange}
                                />
                                <span>Female</span>
                            </label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Date of Birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                            className="form-input"
                        />
                    </div>

                    <button type="submit" className="submit-button">
                        SAVE
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfileOwner;