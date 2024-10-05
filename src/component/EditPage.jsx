import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function EditPage() {
    const [user, setUser] = useState({});
    const [hobby, setHobby] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch(`http://localhost:3000/user/${id}`, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                setUser(data);
                setHobby(data.hobby || []);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleInput = (e) => {
        const { name, value, type, checked } = e.target;
        let newHobby = [...hobby];

        if (name === 'hobby') {
            if (checked) {
                newHobby.push(value);
            } else {
                const pos = newHobby.findIndex((val) => value === val);
                newHobby.splice(pos, 1);
            }
            setHobby(newHobby);
            setUser({ ...user, hobby: newHobby });
        } else {
            setUser({ ...user, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/user/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(() => {
                toast.success('Data updated successfully');
                setTimeout(() => {
                    navigate('/TablePage');
                }, 500);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="container mt-5">
            <div className="text-center mb-4">
                <Link to="/TablePage" className="btn btn-primary">Back to Table Page</Link>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-sm">
                        <div className="card-header text-center">
                            <h2>Edit User Data</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        value={user.name || ''}
                                        onChange={handleInput}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="text"
                                        name="email"
                                        className="form-control"
                                        value={user.email || ''}
                                        onChange={handleInput}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Hobby</label>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            name="hobby"
                                            className="form-check-input"
                                            checked={hobby.includes('dance')}
                                            value="dance"
                                            onChange={handleInput}
                                        />
                                        <label className="form-check-label">Dance</label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            name="hobby"
                                            className="form-check-input"
                                            checked={hobby.includes('music')}
                                            value="music"
                                            onChange={handleInput}
                                        />
                                        <label className="form-check-label">Music</label>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Gender</label>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            name="gender"
                                            className="form-check-input"
                                            value="male"
                                            checked={user.gender === 'male'}
                                            onChange={handleInput}
                                        />
                                        <label className="form-check-label">Male</label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            name="gender"
                                            className="form-check-input"
                                            value="female"
                                            checked={user.gender === 'female'}
                                            onChange={handleInput}
                                        />
                                        <label className="form-check-label">Female</label>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="city" className="form-label">City</label>
                                    <select
                                        name="city"
                                        className="form-select"
                                        value={user.city || ''}
                                        onChange={handleInput}
                                    >
                                        <option value="">Select City</option>
                                        <option value="surat">Surat</option>
                                        <option value="ahemdabad">Ahemdabad</option>
                                        <option value="baruch">Baruch</option>
                                    </select>
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-success">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
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

export default EditPage;
