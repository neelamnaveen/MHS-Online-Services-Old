import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

export default function InsertService() {
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [serviceName, setServiceName] = useState("");
    const [serviceComments, setServiceComments] = useState();
    const [status, setStatus] = useState("Pending");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate("");

    const setUsrName = (e) => {
        setName(e.target.value);
    }

    const setUsrContact = (e) => {
        setContact(e.target.value);
    }

    const setServName = (e) => {
        setServiceName(e.target.value);
    }

    const setComments = (e) => {
        setServiceComments(e.target.value);
    }

    const setSerStatus = (e) => {
        setStatus(e.target.value);
    }

    const addService = async (e) => {
        e.preventDefault();

        if (!name || !contact || !serviceName || !serviceComments) {
            setError("*Please fill in all the required fields.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await fetch("http://localhost:3001/insertservice", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    { 
                        "Name": name, 
                        "Contact": contact, 
                        "ServiceName": serviceName, 
                        "ServiceComments": serviceComments, 
                    }
                )
            });

            await res.json();

            if (res.status === 201) {
                alert("Data Inserted");
                setServiceName("");
                setServiceComments(0);
                navigate('/services');
            }
            else if (res.status === 422) {
                alert("Service is already added with that barcode.");
            }
            else {
                setError("Something went wrong. Please try again.");
            }
        } catch (err) {
            setError("An error occurred. Please try again later.");
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='container-fluid p-5'>
             <h1 className=''>Enter Service Information</h1>
             
            <div className="mt-5 col-lg-6 col-md-6 col-12 fs-4">
                <label htmlFor="service_name" className="form-label fw-bold">Name</label>
                <input type="text" onChange={setUsrName} value={name} className="form-control fs-5" id="name" placeholder="Enter your Name" required />
            </div>
             
            <div className="mt-5 col-lg-6 col-md-6 col-12 fs-4">
                <label htmlFor="service_name" className="form-label fw-bold">Phone No.</label>
                <input type="text" onChange={setUsrContact} value={contact} className="form-control fs-5" id="contact" placeholder="Enter your contact number" required />
            </div>
             
            <div className="mt-5 col-lg-6 col-md-6 col-12 fs-4">
                <label htmlFor="service_name" className="form-label fw-bold">Service Name</label>
                <input type="text" onChange={setServName} value={serviceName} className="form-control fs-5" id="service_name" placeholder="Enter Service Name" required />
            </div>
            
            <div className="mt-3 col-lg-6 col-md-6 col-12 fs-4">
                <label htmlFor="service_comments" className="form-label fw-bold">Comments</label>
                <input type="text" onChange={setComments} value={serviceComments} className="form-control fs-5" id="service_comments" placeholder="Please enter comments ex: Urgent work, Home cleaning in Kattangur by 25/06/2024" required />
            </div>
            
            <div className="mt-3 col-lg-6 col-md-6 col-12 fs-4">
                <label htmlFor="service_comments" className="form-label fw-bold">Status</label>
                <input type="text" onChange={setSerStatus} value={status} className="form-control fs-5" id="service_status" placeholder="Status" required />
            </div>

            <div className='d-flex justify-content-center col-lg-6 col-md-6'>
                <NavLink to="/services" className='btn btn-primary me-5 fs-4'>Cancel</NavLink>
                <button type="submit" onClick={addService} className="btn btn-primary fs-4" disabled={loading}>{loading ? 'Inserting...' : 'Insert'}</button>
            </div>
            <div className="col text-center col-lg-6">
                {error && <div className="text-danger mt-3 fs-5 fw-bold">{error}</div>}
            </div>
        </div>
    )
}
