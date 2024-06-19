import React, { useState } from 'react';
import Person from "../../models/Person";
import '../../styles/form.scss';

const Form: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{ 
    name?: string; 
    email?: string;
    phone?: string;}>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form fields
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
      id: crypto.randomUUID(),
      name: "pirate",
      email: "mvogo@gmail.com",
      phone: "674995825",
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
    console.log('Added new task:', person);
  };

  const handleChange = ()  => {
    console.log("djfs")
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
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

export default Form;