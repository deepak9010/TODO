
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';



const Signup = () => {
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const [error, setError] = useState("");


  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
 };

  const onSubmit = async (data) => {

    console.log("beforepost", data);

    const response = await fetch("http://localhost:5000/signupuser/sign", {
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
    }
    if (response.ok) {
      console.log("afterpost", result);
      navigate("/login");
    }
  }

  

  return (
    <div className='create2container'>

      <form onSubmit={handleSubmit(onSubmit)} className='create2form'>

        <p role="alert" style={{ fontSize: '1.4rem' }}>{error}</p>
        <h3>Create Your Account</h3>

        <label className='create2label'>Email</label>
        <input type="email" {...register("email", { required: true })} className='create2input' />
        {errors.email && <span style={{ color: "blue", fontSize: '1.4rem' }}>This field is required</span>}

        <br />
        
        
        <label className='create2label'>Password</label>
        <input type="text" {...register("password", { required: true })} className='create2input' />
        {errors.name && <span style={{ color: "blue", fontSize: '1.4rem' }}>This field is required</span>}

        <br />
        
        <div>
         <span> If Existing User</span> 
         <button type="button" className='SignupLoginBtn'  onClick={handleClick}>Log In</button>
         </div>
        <input type="submit" className='create2submit' />
      </form>
    </div>
  )
}

export default Signup;