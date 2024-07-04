import axios from 'axios';
import React, { useState } from 'react';
import { mock } from '../../mock/mock';
import mockDataPerson from '../../mock/person';
import Person from "../../models/Person";
import '../../styles/form.scss';


mock.onPost("api/person/add").reply((payload: any) => {
  try{
      if(payload.data === null){
          return [400, payload.data]
      }else{
          const jsonPayload = JSON.parse(payload.data)
          jsonPayload.id = mockDataPerson.data.length + 1
      }
      return [200, payload.data]
  }catch(err){
      return [500, {
          status: false,
          message: "Internal Server error!"
      }]
  }
})

export default function ForamPerson ({parentCallback}:any)  {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{ 
    name?: string; 
    email?: string;
    phone?: string;}>({});

  const handleSubmit = (e: React.FormEvent) => {
    console.log(e)
    e.preventDefault();

    const newErrors: { 
      name?: string; 
      email?: string;
      phone?: string;  } = {};
    if (!name.trim() || name.length < 3) {
      newErrors.name = 'Name is required or must have at least 3 letters';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Phone is required';
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    }else{
      const validEmail: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if(!validEmail.test(email)){
        newErrors.email = 'The format of Email is incorrect';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Create a new Person object
    const newPerson: Person = {
      id: mockDataPerson.data.length + 1,
      name,
      email,
      phone
    };

    // Add the new person 
    addPerson(newPerson);

    // Reset the form fields
    setName('');
    setEmail('');
    setPhone('');
    setErrors({});
  };

  const addPerson = (person: Person) => {
    axios.post("api/person/add", person)
    .then((response)=>{
        mockDataPerson.data.concat(response.data)
        parentCallback( mockDataPerson.data.concat(response.data))
    })
    .catch((error) => {
      console.log(error)
    })
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      Add new Person
      <div className="form-group">
        <input
          placeholder='Name'
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={errors.name ? 'form-control error' : 'form-control'}
        />
        {errors.name && <div className="error-message">{errors.name}</div>}
      </div>

      <div className="form-group">
        <input
          placeholder='Email'
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={errors.email ? 'form-control error' : 'form-control'}
        />
        {errors.email && <div className="error-message">{errors.email}</div>}
      </div>

      <div className="form-group">
        <input
          placeholder='Phone'
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={errors.phone ? 'form-control error' : 'form-control'}
        />
        {errors.phone && <div className="error-message">{errors.phone}</div>}
      </div>
      
      <button type="submit" className="btn">
        Add User
      </button>
    </form>
  );
};