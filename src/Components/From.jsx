import React from 'react'
import Table from './Table'

function From() {

    const [formData,setFormdata]=React.useState({
        username: "",
        age:"",
        address:"",
        maritalState:false,
        Department:"",
        salary:""

    })

    const [addData,setAddData]=React.useState([])

    React.useEffect(()=>{
        getData()
    },[])

    const getData=()=>{
        fetch(`http://localhost:3001/EmployData`)
        .then((res)=>res.json())
        .then((res)=>{
            // console.log(res);
            setAddData(res)
        }).catch((err)=>{
             console.log(err);
        })
    }
 
    const handleChange=(e)=>{
        // console.log("value",e.target.value);
        // console.log("id",e.target.id);
        const {id,value,checked,type}=e.target
        // console.log(id, value);
        // console.log(id,value,checked,type); 
        setFormdata({
            ...formData,
            [id] : type === "checkbox" ? checked :value
        })
    }

    const {username,age,address,maritalState,Department,salary}= formData;

    const hadleSubmit=(e)=>{
        e.preventDefault()
        // console.log(formData);
        const formDataJson=JSON.stringify(formData)
        // console.log(formDataJson);
        fetch(`http://localhost:3001/EmployData`,{
            method:"POST",
            body:formDataJson,
            headers:{
                "content-type":"application/json"
            }
        }).then((res)=>{
            // console.log(res)
            getData()
        })
    }
    const handleAdd=()=>{getData()}
  return (
      <>
    <form onSubmit={hadleSubmit}>
        <input 
        id='username'
        type="text" onChange={handleChange}
        placeholder="USER NAME"
        value={username}
        />
        <br />
        <br />
        <input
        id='age'
         type="text" onChange={handleChange}
        placeholder="USER AGE" 
        value={age}
        />
        <br />
        <br />
        <input type="text"
        id='address'
         onChange={handleChange}
        placeholder="Address"
        value={address}
        />
         <br />
        <br />
        <label htmlFor="#">
            MARITAL STATE :
        <input 
        id='maritalState'
        type="checkbox" onChange={handleChange}
        checked={maritalState} 
        /> 
        </label>
        <br />
        <br />
        <label htmlFor="#">
            Department :
             <select onChange={handleChange} id="Department" value={Department}>
                 <option value="">Select Deperment</option>
                 <option value="it">IT</option>
                 <option value="marketing">Marketing</option>
                 <option value="finance">Finance</option>
                 <option value="hr">HR</option>

             </select>
        </label>
        <br />
        <br />
        <input type="text" placeholder='Salary'
        id='salary'
        value={salary}
        onChange={handleChange}
        />

        <br />
        <br />
        <input type="submit" value="SUBMIT" onClick={handleAdd} />

    </form>
 
 <center>

    <table>
        <thead>

           <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Address</th>
                <th>Marital State</th>
                <th>Department</th>
                <th>Salary</th>
            </tr>
        </thead>
        <tbody>

            {
                addData.map((items)=>(
                    <Table {...items} key={items.id}/>
                ))
            }
        </tbody>
    </table>
 </center>
  

    </>

  )
}

export  {From}