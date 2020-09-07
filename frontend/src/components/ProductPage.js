import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productActions';


export default function ProductPage(props) {

    const  [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id));
        return () => {
            // 
        };
    }, [])

    const handleAddToCart = () => {
        props.history.push('/cart/' + props.match.params.id + '?qty=' + qty)
    }

    return (
        <div>
            <div className="back">
                <Link to="/">Back</Link>
            </div>

            {
                loading ? <div>Loading...</div> :
                error ? <div>{error}</div> :
                (
                    <div className="details">
                        <div className="details-image">
                            <img src={product.image} alt="product" />
                        </div>
                        <div className="details-info">
                            <ul>
                                <li>
                                    <h4>{product.name}</h4>
                                </li>
                                <li>
                                    {product.rating} Stars ({product.numReviews} Reviews)
                        </li>
                                <li>
                                    Price: <b>Rs. {product.price}</b>
                                </li>
                                <li>
                                    Description:
                            <div>
                                        {product.description}
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="details-action">
                            <ul>
                                <li>
                                    Price: Rs.{product.price}
                                </li>
                                <li>
                                    Status: {product.countInStock > 0 ? "In Stock": "Unavailable"}
                                </li>
                                <li>
                                    Qty: <select value={qty} onChange={e => setQty(e.target.value)}>
                                        { [...Array(product.countInStock).keys()].map( q => 
                                            <option key={q+1} value={q+1}>{q+1}</option>) 
                                        }
                                    </select>
                                </li>
                                <li>
                                    { 
                                        product.countInStock > 0 
                                        &&
                                        <button class="button primary" onClick = {handleAddToCart}>Add to Cart</button> 
                                        }
                                </li>
                            </ul>
                        </div>

                    </div>
                )
            }
        </div>
    );
}
