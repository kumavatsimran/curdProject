import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Tablepage() {
    let [record,setRecord]=useState([])
    let{id}=useParams()
    let neviget=useNavigate()
    useEffect(() => {
      return () => {
        recordCall()
      };
    }, []);

    let recordCall=()=>{
        fetch('http://localhost:3000/user',{
            method:'GET'
        }).then(async(res)=>{
            let data=await res.json()
            setRecord(data)
            console.log(data.gender);

        }).catch((err)=>{
            console.log(err);
        })
    }
    let deletData=(id)=>{
            fetch(`http://localhost:3000/user/${id}`,{
                method:'DELETE'
            }).then(()=>{
                console.log("data deleted");
                recordCall()
            }).catch((err)=>{
                console.log(err);
            })
    }
    let editData=(id)=>{
        neviget(`/Editpage/${id}`)
    }
  return (
    <>
    <h2>TablePage</h2>
    <Link to={'/'}>Form</Link>
    <br/><br/>
    <table align='center' border={1} className='table  table-success table-striped'>
        <thead>
            <tr>
                <td>name</td>
                <td>email</td>
                <td>hobby</td>
                <td>gender</td>
                <td>city</td>
                <td>action</td>
                <td>action</td>

            </tr>
        </thead>
        <tbody>
            {
                record.map((data,i)=>(
                    <tr key={i}>
                        <td>{data.name}</td>
                        <td>{data.email}</td>
                        <td>{data.hobby}</td>
                        <td>{data.gender}</td>
                        <td>{data.city}</td>
                        <td><button onClick={()=>deletData(data.id)}>delete</button></td>
                        <td><button onClick={()=>editData(data.id)}>edit</button></td>
                    </tr>
                ))
            }
        </tbody>
    </table>
    </>
  );
}

export default Tablepage;
