import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Services() {

    useEffect(() => {
        getServices();
    }, [])

    const [serviceData, setServiceData] = useState([]);

    const getServices = async (e) => {

        try {
            const res = await fetch("http://localhost:3001/services", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();

            if (res.status === 201) {
                console.log("Data Retrieved.");
                setServiceData(data);
            }
            else {
                console.log("Something went wrong. Please try again.");
            }
        } catch (err) {
            console.log(err);
        }
    }

    const deleteService = async (id) => {

        const response = await fetch(`http://localhost:3001/deleteservice/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await response.json();
        console.log(deletedata);

        if (response.status === 422 || !deletedata) {
            console.log("Error");
        } else {
            console.log("Service deleted");
            getServices();
        }

    }

    return (
        <>


            <div className='container-fluid p-5'>
                <h1> Services</h1>
                <div className='add_button'>
                    <NavLink to="/insertservice" className='btn btn-primary fs-5'> + Add New Service</NavLink>
                </div>
                <div className="overflow-auto mt-3" style={{ maxHeight: "38rem" }}>
                    <table className="table table-striped table-hover mt-3 fs-5">
                        <thead>
                            <tr className="tr_color">
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Contact</th>
                                <th scope="col">Service Name</th>
                                <th scope="col">Comments</th>
                                <th scope="col">Status</th>
                                <th scope="col">Update</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                serviceData.map((element, id) => {
                                    return (
                                        <>
                                            <tr>
                                                <th scope="row">{id + 1}</th>
                                                <td>{element.Name}</td>
                                                <td>{element.Contact}</td>
                                                <td>{element.ServiceName}</td>
                                                <td>{element.ServiceComments}</td>
                                                <td>{element.Status}</td>

                                                <td><NavLink to={`/updateservice/${element._id}`} className="btn btn-primary"><i className="fa-solid fa-pen-to-square"></i></NavLink></td>
                                                <td><button className="btn btn-danger" onClick={() => deleteService(element._id)}><i class="fa-solid fa-trash"></i></button></td>

                                            </tr>
                                        </>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>

            </div>

        </>
    )
}
