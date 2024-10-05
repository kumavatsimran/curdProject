import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Form() {
    let [user, setUser] = useState({});
    let [hobby, setHobby] = useState([]);
    let [error, setError] = useState({});
    let navigate = useNavigate();

    let handleInput = (e) => {
        let { name, value } = e.target;
        let newHobby = [...hobby];

        if (name === 'hobby') {
            if (e.target.checked) {
                newHobby.push(value);
            } else {
                let pos = newHobby.findIndex((val) => val === value);
                newHobby.splice(pos, 1);
            }
            setHobby(newHobby);
            setUser({ ...user, hobby: newHobby });
        } else {
            setUser({ ...user, [name]: value });
        }
    };

    let validate = () => {
        let tempError = {};
        if (!user.name) tempError.name = "Name is required";
        if (!user.email) tempError.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(user.email)) tempError.email = "Invalid email format";
        if (hobby.length === 0) tempError.hobby = "At least one hobby is required";
        if (!user.city) tempError.city = "City is required";
        if (!user.gender) tempError.gender = "Gender is required";
        
        setError(tempError);
        return Object.keys(tempError).length === 0;
    };

    let handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        fetch('http://localhost:3000/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        .then(() => {
            toast.success('Data added');
        })
        .catch((err) => {
            console.log(err);
        });

        setTimeout(() => {
            navigate('/TablePage');
        }, 500);
    };

    return (
        <div className="container mt-5">
            <div className="text-center mb-4">
                <Link to={'/TablePage'} className='btn btn-primary'>Go to Table Page</Link>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form method='post' onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light">
                        <h3 className="text-center mb-4">User Information Form</h3>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" name="name" className="form-control" onChange={handleInput} />
                            {error.name && <span className="text-danger">{error.name}</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="text" name="email" className="form-control" onChange={handleInput} />
                            {error.email && <span className="text-danger">{error.email}</span>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Hobby</label><br />
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" name="hobby" value="dance" onChange={handleInput} />
                                <label className="form-check-label">Dance</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" name="hobby" value="music" onChange={handleInput} />
                                <label className="form-check-label">Music</label>
                            </div>
                            {error.hobby && <span className="text-danger">{error.hobby}</span>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Gender</label><br />
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" id="male" name="gender" value="male" onChange={handleInput} />
                                <label className="form-check-label" htmlFor="male">Male</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" id="female" name="gender" value="female" onChange={handleInput} />
                                <label className="form-check-label" htmlFor="female">Female</label>
                            </div>
                            {error.gender && <span className="text-danger">{error.gender}</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">City</label>
                            <select name="city" className="form-select" onChange={handleInput}>
                                <option value="">Select a city</option>
                                <option value="surat">Surat</option>
                                <option value="ahmedabad">Ahmedabad</option>
                                <option value="bharuch">Bharuch</option>
                            </select>
                            {error.city && <span className="text-danger">{error.city}</span>}
                        </div>
                        <div className="d-grid">
                            <button type='submit' className='btn btn-success'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
}

export default Form;
