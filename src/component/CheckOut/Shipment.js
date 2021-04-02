import React, { useContext, useState } from 'react';
import { userContext } from '../../App';

const Shipment = () => {

    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    console.log(loggedInUser);

    // const [shipmentData, setShipmentData] = useState()
    // const handleChange = (e) => {
    //     console.log(e.target.name, e.target.value);
    //     console.log('clicked');
    // }


    const handelSubmit = (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const number = document.getElementById('number').value;
        const address = document.getElementById('address').value;

        const shipmentData = {
            name: name,
            email: email,
            number: number,
            address: address,
            date: new Date()
        }
        if (number && address && name && email) {
            const fullOrderDetails = { ...loggedInUser, shipmentData: shipmentData }

            fetch(`https://fast-sands-79034.herokuapp.com/addOrder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fullOrderDetails)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data) {
                        alert('order successfully placed . check details on order section .')
                    }
                })


        }
        else (
            alert('Please fill all fields')
        )
    }
    // console.log(shipmentData);


    return (
        <div className="d-flex justify-content-center m-5">
            <form className="w-25 text-center">
                <h1>Input your shipping details</h1>
                <input className="form-control m-2 custom-required" type="text" id='name' value={loggedInUser.name} placeholder="Name" readOnly/>
                <input className="form-control m-2 custom-required" type="text" id='email' value={loggedInUser.email} placeholder="Email" readOnly/>
                <input className="form-control m-2 custom-required" type="text" id='number' placeholder="Enter your mobile number"/>
                <input className="form-control m-2 custom-required" type="text" id='address' placeholder='Enter your address' />

                <button className='btn btn-dark' onClick={handelSubmit}>Place Order</button>
            </form>
        </div>
    );
};

export default Shipment;