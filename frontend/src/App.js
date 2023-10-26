import React, { useState } from 'react';
import './App.css'; // Import your custom CSS file for styling
import { Link } from 'react-router-dom';

function App() {
  const [formData, setFormData] = useState({
    ID: '',
    friendID: '',
    password: '',
    photo: null,
  });

  const [message, setMessage] = useState(''); // State for displaying messages
  const [messageColor, setMessageColor] = useState(''); // State for message color

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      photo: file,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('ID', formData.ID);
    formDataToSend.append('friendID', formData.friendID);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('photo', formData.photo);

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message === 'Friend added to the list') {
          setMessage('Friend added to the list');
          setMessageColor('green');
        } else if (data.message === 'Friend is already in the list') {
          setMessage('Friend is already in the list');
          setMessageColor('blue');
        }
        // Clear the form after a successful submission
        setFormData({
          ID: '',
          friendID: '',
          password: '',
          photo: null,
        });
      } else {
        setMessage('Failed to submit the form. Internal server error.');
        setMessageColor('red');
      }
    } catch (error) {
      setMessage('Failed to submit the form. Internal server error.');
      setMessageColor('red');
      console.error(error);
    }
  }

  return (
    <div className="container">
	  <div className="network-heading">
        <h1>Add a friend</h1>
      </div>
      <div className="form-container">
        <h1 className="form-title">Submit Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="ID"
              value={formData.ID}
              onChange={handleInputChange}
              className="form-input"
              placeholder="ID"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="friendID"
              value={formData.friendID}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Friend ID"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Password"
            />
          </div>
          <div className="form-group">
            <label className="file-label">Choose a Photo</label>
            <input
              type="file"
              name="photo"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
          <p style={{ color: messageColor }}>{message}</p>
        </form>
      </div>
      <Link to="/friends-network">
        <button className="friends-network-button">Visit the friends network</button>
      </Link>
    </div>
  );
}

export default App;
