// it is like update.jsx ,but here we use React-hook-form and their functionality to create form and  pass data instead of diff. hooks

import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';



const Create2 = () => {
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const [error, setError] = useState("");


  const navigate = useNavigate();

  const onSubmit = async (data) => {

    console.log("beforepost", data);

    const response = await fetch("http://localhost:5000/create", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
      //    setError("emailid is duplicate");
      //    setError(error);
    }
    if (response.ok) {
      console.log("afterpost", result);
      navigate("/all");
    }
  }

  

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

export default Create2;