import React,  {useEffect,useState}  from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';


const columns = [
  { field: 'srNumber', headerName: 'ID', width: 150 },
  {field: 'name',headerName: 'First name',width: 180,editable: true, },
  {field: 'email',headerName: 'Email',width: 240,editable: true,},
  { field: 'branch', headerName: 'Branch', width: 150, editable: true, },
  { field: 'age', headerName: 'Age',type: 'number', width: 80, editable: true,},
];


const Table = () => {

    const [data, setData] = useState([]);
    const [error, setError] = useState();
    
    const getData = async()=> {
        const response = await fetch("http://localhost:5000");
        const result = await response.json();
    
        // console.log("result..", result);
    
        if (!response.ok) {
          console.log(result.error);
          setError(result.error);
        }
        if (response.ok) {
        //   console.log(result);
               const rows = result.map((item,index)=>{
                          return { 
                                 id:item._id,
                                 srNumber:index+1,
                                 name:item.name,
                                 email:item.email,
                                 branch:item.branch,
                                 age:item.age,
                             }
                         });
               setData(rows);
               setError("");
        }
      }
    



    useEffect(() => {
        getData();
      }, []);
    
      console.log(data);


      //  store data in new array from data hook using forEach loop
// const rows = []
// let count=0;

//   data?.forEach(obj => {

//      count=count+1;
//      const partialObj = {};
//      // partialObj.key = obj._id;
//      partialObj.srNumber = count;
//      partialObj.name = obj.name;
//      partialObj.email = obj.email;
//      partialObj.branch = obj.branch;
//      partialObj.age = obj.age;
 
 
//    rows.push(partialObj);
// });
// //  console.log(count);
// console.log(rows);


  return (
    <div >
 
  <Box sx={{ height: 500, width: '100%' }}>
         <DataGrid
            rows={data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />  
     
       </Box>
    </div>
  )
}

export default Table;