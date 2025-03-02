
import { useState } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [formData, setFormData]= useState({
    ID:"",
    Name:"",
    Age:"",
    E_mail:"",
    Address:"",
  });

 // State for the search functionality
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit =async (e) =>{
    e.preventDefault();
    console.log("FORM SUBMITTED:", formData);
  

  try{
    const response = await fetch('http://localhost:3001/new-Student',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    });

    if(response.ok){
      console.log('Student data submitted successfully!');
      setFormData({ID:"",Name:"", Age:"", E_mail:"",Address:"" });
    }else
      {console.error('Failed to submit student data');}
  }catch(error){
      console.error('Error submitting form:', error);
    }
  };

  

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/search?q=${query}`);
            setResults(response.data);
        } catch (error) {
            console.error('Error searching:', error);
        }
    };

  return (
  <>
  <h1 id='h1'>Student Database</h1> 
 
    
    
    <input
    type='text'
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder="Search Student Details"
    />
    <button onClick={handleSearch}>Search</button>
    <ul>
        {results.map((student) => (
          <li key={student.ID}>
            {student.ID} - {student.Name} - {student.Age} - {student.E_mail} - {student.Address}
          </li>
        ))}
    </ul>
  <form onSubmit={handleSubmit}>
    <label>ID:</label>
    <input
    type="number"
    name="ID"
    value={formData.ID}
    onChange={handleChange}/>

    <label>NAME:</label>
    <input
    type="text"
    name="Name"
    value={formData.Name}
    onChange={handleChange}/>

    <label>Age:</label>
    <input
    type="number"
    name="Age"
    value={formData.Age}
    onChange={handleChange}/>

    <label>Email:</label>
    <input
    type="email"
    name="E_mail"
    value={formData.E_mail}
    onChange={handleChange}/>

    <label>Address:</label>
    <textarea
    name="Address"
    value={formData.Address}
    onChange={handleChange}/>

    <button type='submit'>Submit</button>
  </form> 
  </>
  );
}



export default App;
