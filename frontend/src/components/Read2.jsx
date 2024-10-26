import React,{useEffect,useState} from "react";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';




const Read2 = () => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [urlid, setUrlid] = useState();
  const [open, setOpen] = useState(false);
 

  const handleClickOpen = (id) => {
    setUrlid(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  // for delete the card
  const handleDelete = async(id)=> {
    const response = await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
    });

    const result2 = await response.json();

    if (!response.ok) {
      setError(result2.error);
    }
    if (response.ok) {
      // console.log("deleted", response.ok);
      setError("Deleted Successfully");
      setOpen(false);
      setTimeout(() => {
        setError("");
        getData();
      }, 1000);
    }
    
  }

  // for read all data
  const getData = async()=> {
    const response = await fetch("http://localhost:5000");
    const result = await response.json();

    // console.log("result..", result);

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      // console.log(result);
      setData(result);
      setError("");
     
    }

  }
 

  useEffect(() => {
    getData();
  },[]);

  console.log(data);

  return (
 
    <div id="containerAlldata">
       {error && <div className="alert alert-danger"> {error} </div>}

       <h2 className='text-center'>All data</h2>

      <div className="Alldetail_container">

        {data?.map((ele) => (
                //    setUrlid(ele._id),
                 <div key={ele._id} className="detail_item">
                      
                <div className="card-content">
                  <h4 > {ele.name} </h4>
                  <h5 > {ele.email} </h5>
                  <h5 > {ele.branch}  </h5>
                  <p>  {ele.age}</p>
                
                 <div className="projects_button">




                 {/* <a href="#all" className="card_link" onClick={() => handleDelete(ele._id)}>
                    Delete
                  </a> */}


                <Button variant="outlined" style={{color:"bisque",border:"none"}}  
                // onClick={handleClickOpen } 
                onClick={() => handleClickOpen (ele._id)}
                >
                     Delete
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="dialog-title"
                  aria-describedby="dialog-description"
                >
                  <DialogTitle id="dialog-title">
                    {"Are you sure to delete the data"}
                  </DialogTitle>
           
                  <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button  className="card_link" onClick={() => handleDelete(urlid)} autoFocus>
                         Yes
                    </Button>
                  </DialogActions>
          
                </Dialog>
         



                  <Link to={`/${ele._id}`} className="card_link">
                    Edit
                  </Link>
                 </div>

                </div>
    
            </div>

        ))}
       
      </div>
    </div>
  );
};

export default Read2;