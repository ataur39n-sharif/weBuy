import React from 'react';
import { Link } from 'react-router-dom';

const Product = (props) => {
    const {_id, ProductName, ProductPrice, ProductImgUrl } = props.product;
    
    return (
        <div className='col-bg-2 col-md-3 cl-sm-12 d-flex justify-content-center'>
            <div className="card mt-2 mb-2" style={{ width: "18rem" }}>
                <img src={ProductImgUrl} className="card-img-top" alt="..."></img>
                <div className="card-body">
                    <h5 className="card-title">{ProductName}</h5>
                    <div className='d-flex justify-content-between align-items-center'>
                        <span><strong>${ProductPrice}</strong></span>
                        <Link to={`/checkOut/${_id}`} className="btn btn-dark">Buy Now</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;