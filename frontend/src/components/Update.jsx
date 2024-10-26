
// import React ,{useEffect, useState}from 'react';
// import { useParams, useNavigate } from 'react-router-dom';


// const Update = () => {

//   const [name,setName] = useState("");
//   const [email,setEmail] = useState("");
//   const [branch,setBranch] = useState("");
//   const [age,setAge] = useState("0");

//   const[error,setError]=useState("");


//   const {id} = useParams();
//   // console.log(id);

//   const navigate = useNavigate();
  
//     //receving single user data
//   const getSingleUserData = async () => {

//       const response = await fetch(`http://localhost:5000/${id}`);
//       const result = await response.json();


//       if (!response.ok) {
//         console.log(result.error);
//         setError(result.error);
//       }

//       if (response.ok) {
//         setError("");
//         console.log("data to be updated", result);
//         setName(result.name);
//         setEmail(result.email);
//         setBranch(result.branch);
//         setAge(result.age);
//       }
//     };

   
//       //passing edited data to backend
//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     const updatedUser = { name, email, branch, age };

//     console.log(updatedUser);

//     const response = await fetch(`http://localhost:5000/${id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(updatedUser),
//     });

//     const result = await response.json();

//     if (!response.ok) {
//       console.log(result.error);
//       setError(result.error);
//     }

//     if (response.ok) {
//       console.log("updated result..", result);
//       setError("");
//       navigate("/all");
//     }
   
//   };



//    useEffect(()=>{
//     getSingleUserData();
//    });

//   return (
//     <div className='container my-2'>
          
//     {error && <div className="alert alert-danger"> {error} </div>}

//     <h2 className='text-center'>Edit the data</h2>

//   <form onSubmit = {handleUpdate} >

//     <div className="mb-3">
//       <label  className="form-label">Name</label>
//       <input type="text" 
//       className="form-control" 
//       value={name}
//       onChange={(e)=>setName(e.target.value)}
//        />
//     </div>

//     <div className="mb-3">
//        <label  className="form-label">Email address</label>
//        <input type="email" 
//        className="form-control"
//        value={email}
//        onChange={(e)=>setEmail(e.target.value)}
//         />
//     </div>

//     <div className="mb-3">
//        <label  className="form-label">Branch</label>
//        <input type="text" 
//        className="form-control"
//        value={branch}
//        onChange={(e)=>setBranch(e.target.value)}
//         />
//     </div>

//    <div className="mb-3">
//       <label  className="form-label">Age</label>
//       <input type="number" className="form-control"
//       value={age}
//       onChange={(e)=>setAge(e.target.value)}
//       />
//    </div>


// <button type="submit" className="btn btn-primary">Submit</button>
// </form>

// </div>
//   )
// }

// export default Update;