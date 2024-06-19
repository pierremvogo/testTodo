import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { mock } from "../../mock/mock";
import data from "../../mock/person";
import { task } from "../../mock/task";
import Todo from "../../models/Todo";
import '../../styles/form.scss';

mock.onPost("api/task/add").reply((payload: any) => {
  try{
      if(payload.data === null){
          return [400, payload.data]
      }else{
          const jsonPayload = JSON.parse(payload.data)
          jsonPayload.id = task.data.length + 
          task.data.push(jsonPayload)
      }
      return [200, payload.data]
  }catch(err){
      return [500, {
          status: false,
          message: "Internal Server error!"
      }]
  }
}
)

mock.onGet("/api/person/getAll").reply(200,
  {
      person: data.person
  }
)


const FormTask: React.FC = () => {
  const [title, setTitle] = useState<any>('');
  const [priority, setPriority] = useState<any>('');
  const [person, setPerson] = useState<any>('');
  const [labels, setLabels] = useState<any>([]);
  const [startDate, setStartDate] = useState<any>(new Date());
  const [endDate, setEndDate] = useState<any>(new Date());
  const [description, setDescription] = useState<any>('');
  const [dataPerson, setDataPerson] = useState<any>([])
  const [errors, setErrors] = useState<{ 
    title?: string; 
    staff?: string;
    description?: string; 
    startDate?: string;
    priority?: string;
    label?: string; }>({});

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getAllPerson = () =>{
      axios.get("/api/person/getAll")
       .then( async (response:any) => {
           setDataPerson(response.data.person)
           console.log("Data Person: "+JSON.stringify(dataPerson))
       })
       .catch(err => {
         console.log(err)
       })
       }

       useEffect(() => {
        if(dataPerson.length !== 0 ){
          console.log(dataPerson);
          Object.keys(dataPerson).map((value:any,i:number)=>{
            return setDataPerson((dataPerson: any) => [...dataPerson, {
              value:dataPerson[i].id,
              label:dataPerson[i].name,
            }])
          })
          console.log(dataPerson)
          return
        } getAllPerson();
       },[dataPerson,setDataPerson])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { 
      title?: string; 
      staff?: string;
      description?: string; 
      startDate?: string;
      priority?: string;
      label?: string;  } = {};
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newTask: Todo = {
      id: 1,
      title,
      description,
      priority,
      labels,
      person,
      startDate,
      complited: false,
      endDate
    };

    console.log(newTask);

    // Add the new person 
    addTask(newTask);

    // Reset the form fields
    setTitle('');
    setDescription('');
    setLabels([]);
    setPriority("");
    setStartDate(new Date())
    setErrors({});
  };

  const addTask = (task: Todo) => {
    
    console.log('Added new task:', task);
  };

  const handleChange = ()  => {
    console.log("djfs")
  }
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  const prioritys = [
    {value: 'facile', label: 'Facile'},
    {value: 'moyen', label: 'Moyen'},
    {value: 'difficile', label: 'Difficile'},

  ]
  const label = [
    {value: 'html', label: 'HTML'},
    {value: 'css', label: 'CSS'},
    {value: 'node', label: 'NODE'},
    {value: 'js', label: 'JS'},
    {value: 'jquery', label: 'JQUERY'},
  ]

  return (
    <form onSubmit={handleSubmit} className="task-form">
      Add new Task
      <div className="form-group">
        <input
          placeholder='Title'
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={errors.title ? 'form-control error' : 'form-control'}
        />
        {errors.title && <div className="error-message">{errors.title}</div>}
      </div>
      <div className="form-group">
        <LocalizationProvider  dateAdapter={AdapterDayjs}>
          <DatePicker onChange={(e) => setStartDate(e)} className="datepicker" />
        </LocalizationProvider>
      </div>
      <div className="form-group">
        <LocalizationProvider  dateAdapter={AdapterDayjs}>
          <DatePicker onChange={(e) => setEndDate(e)} className="datepicker" />
        </LocalizationProvider>
      </div>
      <div className='task-form1'>

      <div className="form-group1">
        <Select placeholder={"Staff"} onChange={(e) => setPerson(e)} className="select" options={options} />
        {errors.staff && <div className="error-message">{errors.staff}</div>}
      </div>

      <div className="form-group1">
        <Select placeholder={"Priority"}  onChange={(e) => setPriority(e)} className="select" options={prioritys} />
        {errors.priority && <div className="error-message">{errors.priority}</div>}
      </div>
      <div className="form-group1">
        <Select placeholder={"Label"} isMulti onChange={(e) => setLabels(e)} className="select" options={label} />
        {errors.label && <div className="error-message">{errors.label}</div>}
      </div>
      </div>
      <div className="form-group">
        <textarea
          placeholder='Description'
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={errors.description ? 'form-control error' : 'form-control'}
        ></textarea>
        {errors.description && <div className="error-message">{errors.description}</div>}
      </div>
      
      <button type="submit" className="btn">
        Add Task
      </button>
    </form>
  );
};

export default FormTask;