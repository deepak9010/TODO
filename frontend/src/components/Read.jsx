// in React2.jsx , i add some mui functionality like dialog box

// import React,{useEffect,useState} from "react";
// import { Link } from 'react-router-dom';



// const Read = () => {
 
//   const [data, setData] = useState();
//   const [error, setError] = useState();



//   // for delete the card
//   const handleDelete = async(id)=> {
//     const response = await fetch(`http://localhost:5000/${id}`, {
//       method: "DELETE",
//     });

//     const result2 = await response.json();

//     if (!response.ok) {
//       setError(result2.error);
//     }
//     if (response.ok) {
//       // console.log("deleted", response.ok);
//       setError("Deleted Successfully");

//       setTimeout(() => {
//         setError("");
//         getData();
//       }, 1000);
//     }
    
//   }

//   // for read all data
//   const getData = async()=> {
//     const response = await fetch("http://localhost:5000");
//     const result = await response.json();

//     // console.log("result..", result);

//     if (!response.ok) {
//       console.log(result.error);
//       setError(result.error);
//     }
//     if (response.ok) {
//       // console.log(result);
//       setData(result);
//       setError("");
     
//     }

//   }
 

//   useEffect(() => {
//     getData();
//   },[]);

//   console.log(data);

//   return (
//     <div id="containerAlldata">
//        {error && <div className="alert alert-danger"> {error} </div>}

//        <h2 className='text-center'>All data</h2>

//       <div className="Alldetail_container">

//         {data?.map((ele) => (
//                  <div key={ele._id} className="detail_item">

//                 <div className="card-content">
//                   <h4 > {ele.name} </h4>
//                   <h5 > {ele.email} </h5>
//                   <h5 > {ele.branch}  </h5>
//                   <p>  {ele.age}</p>
                
//                  <div className="projects_button">
//                  <a href="#all" className="card_link" onClick={() => handleDelete(ele._id)}>
//                     Delete
//                   </a>

//                   <Link to={`/${ele._id}`} className="card_link">
//                     Edit
//                   </Link>
//                  </div>

//                 </div>
    
//             </div>

//         ))}
       
//       </div>
//     </div>
//   );
// };

// export default Read;