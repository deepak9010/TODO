// it is like update.jsx ,but here we use React-hook-form and their functionality to pass data instead of diff. hooks


import React ,{useEffect, useState}from 'react';
import { useForm } from "react-hook-form"
import { useParams, useNavigate } from 'react-router-dom';


const Update2 = () => {

    const { register, handleSubmit,reset, formState: { errors }, } = useForm();
    const [error, setError] = useState("");
  

      const {id} = useParams();
      // console.log(id);
      const navigate = useNavigate();
  

     
    const getSingleUserData = async () => {
 
      const response = await fetch(`http://localhost:5000/${id}`);
      const result = await response.json();


        if (!response.ok) {
            console.log(result.error);
            setError(result.error);
           }

        if (response.ok) {
            setError("");
            console.log("data to be updated", result);
               

          //  destructuring the data
            const{name,email,branch,age} = result;
            // console.log(name);
            // console.log(email);
            // console.log(branch);
            // console.log(age);

      

            reset({name,email,branch,age})
            // reset(result);
            console.log("received data",result);
           
             }
     };
   


  useEffect(() => {
        getSingleUserData();
    },[reset]);

    

  const onSubmit = async (data) => {
    console.log("updated data", data);

    const response = await fetch(`http://localhost:5000/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }

    if (response.ok) {
      console.log("updated result..", result);
      setError("");
      navigate("/all");
    }
   
  };
  


    return (
      <div className='create2container'>
  
        <form onSubmit={handleSubmit(onSubmit)} className='create2form'>
  
          <p role="alert" style={{ fontSize: '1.4rem' }}>{error}</p>
  
          <label className='create2label'>Name</label>
          <input type="text" {...register("name", { required: true })} className='create2input' />
          {errors.name && <span style={{ color: "blue", fontSize: '1.4rem' }}>This field is required</span>}
  
          <br />
  
          <label className='create2label'>Email</label>
          <input type="email" {...register("email", { required: true })} className='create2input' />
          {errors.email && <span style={{ color: "blue", fontSize: '1.4rem' }}>This field is required</span>}
  
  
          <br />
  
          <label className='create2label'>Branch</label>
          <input type="text" {...register("branch", { required: true })} className='create2input' />
          {errors.branch && <span style={{ color: "blue", fontSize: '1.4rem' }}>This field is required</span>}
  
          <br />
  
          <label className='create2label'>Age</label>
          <input type="number" {...register("age", { required: true })} className='create2input' />
          {errors.age && <span style={{ color: "blue", fontSize: '1.4rem' }}>This field is required</span>}
  
          <br />
  
          <input type="submit" className='create2submit' />
        </form>
      </div>
    )
  }

export default Update2;