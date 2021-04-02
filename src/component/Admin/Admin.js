import axios from 'axios';
import React, { useState } from 'react';
import { useLocation } from 'react-router';

const Admin = () => {
    const location = useLocation();

    const [product, setProduct] = useState({
        ProductName: '',
        ProductPrice: '',
        ProductImgUrl: '',
    })
    const handleChange = (event) => {
        console.log(event.target.name, event.target.value);
        const newData = { ...product }
        newData[event.target.name] = event.target.value;
        setProduct(newData);
    }

    const handleImageChange = (event) => {
        const imgData = new FormData();
        imgData.set('key', '776db192c6ccbf902896240b8bf6f0d9');
        imgData.append('image', event.target.files[0])

        axios.post('https://api.imgbb.com/1/upload', imgData)
            .then(function (response) {
                const imgData = { ...product }
                imgData.ProductImgUrl = response.data.data.display_url
                setProduct(imgData)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const handelSubmit = (e) => {
        if (product.ProductImgUrl !== '') {
            console.log(product);
            const url = `https://fast-sands-79034.herokuapp.com/addProduct`
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            })
                .then(res => res.json())
                .then(data => console.log(data))
        } else {
            alert('Please wait for uploading img')
        }
    }


    return (
        <div className="d-flex justify-content-center text-center">
            <form className="w-50 ">
                <input name="ProductName" type="text" onBlur={handleChange} className="form-control m-2" placeholder="product name" />
                <input name="ProductPrice" type="text" onBlur={handleChange} className="form-control m-2" placeholder="product price" />
                <label htmlFor="">Choose a product image</label>
                <input type="file" onChange={handleImageChange} className="form-control m-2" />
                {
                    product.ProductImgUrl !=='' ? <button onClick={handelSubmit}>Submit</button> : <p>Product add button will ber Available after filled all information and upload image .</p>
                }
            </form>
        </div>
    );
};

export default Admin;