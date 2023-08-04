import { Link } from 'react-router-dom'
import React, { useEffect, useState } from "react";
import { fireStoreDb } from '../firebaseConfig';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    setDoc,
    updateDoc,
} from "firebase/firestore";
const Cart = () => {
    const handleLike = async (id, liked) => {
        const productRef = doc(collection(fireStoreDb, "product"), id);

        try {
            // Update the like status in the Firestore database
            await updateDoc(productRef, { liked });
            // Update the state to reflect the updated like status
            setData((prevData) =>
                prevData.map((item) =>
                    item.id === id ? { ...item, liked } : item
                )
            );

        } catch (error) {
            console.error("Error updating like status: ", error);
        }

    };
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const querySnapshot = await getDocs(collection(fireStoreDb, "product"));
        console.log(querySnapshot.docs);

        const data = []
        querySnapshot.forEach((doc) => {
            if (doc.data().liked === true) {
                data.push({
                    id: doc.id,
                    name: doc.data().product_name,
                    description: doc.data().description,
                    price: doc.data().price,
                    image: doc.data().product_image,
                    liked: doc.data().liked || false,
                })
            }
        })
        setData(data);
    };


    return (
        <div>

            <div>
                {/*================Home Banner Area =================*/}
                <section className="banner_area">
                    <div className="banner_inner d-flex align-items-center">
                        <div className="container">
                            <div className="banner_content d-md-flex justify-content-between align-items-center">
                                <div className="mb-3 mb-md-0">
                                    <h2>Cart</h2>
                                    <p>Very us move be blessed multiply night</p>
                                </div>
                                <div className="page_Link">
                                    <Link to="index.html">Home</Link>
                                    <Link to="cart.html">Cart</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*================End Home Banner Area =================*/}
                {/*================Cart Area =================*/}
                <section className="cart_area">
                    <div className="container">
                        <div className="cart_inner">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Product</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="media">
                                                    <div className="d-flex">
                                                        <img src="asset/img/product/single-product/s-product-s-2.jpg" alt />
                                                    </div>
                                                    <div className="media-body">
                                                        <p>Minimalistic shop for multipurpose use</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <h5>$360.00</h5>
                                            </td>
                                            <td>
                                                <div className="product_count">
                                                    <input type="text" name="qty" id="sst" maxLength={12} defaultValue={1} title="Quantity:" className="input-text qty" />
                                                    <button onclick="var result = document.getElementById('sst'); var sst = result.value; if( !isNaN( sst )) result.value++;return false;" className="increase items-count" type="button">
                                                        <i className="lnr lnr-chevron-up" />
                                                    </button>
                                                    <button onclick="var result = document.getElementById('sst'); var sst = result.value; if( !isNaN( sst ) && sst > 0 ) result.value--;return false;" className="reduced items-count" type="button">
                                                        <i className="lnr lnr-chevron-down" />
                                                    </button>
                                                </div>
                                            </td>
                                            <td>
                                                <h5>$720.00</h5>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="media">
                                                    <div className="d-flex">
                                                        <img src="asset/img/product/single-product/s-product-s-3.jpg" alt />
                                                    </div>
                                                    <div className="media-body">
                                                        <p>Minimalistic shop for multipurpose use</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <h5>$360.00</h5>
                                            </td>
                                            <td>
                                                <div className="product_count">
                                                    <input type="text" name="qty" id="sst" maxLength={12} defaultValue={1} title="Quantity:" className="input-text qty" />
                                                    <button onclick="var result = document.getElementById('sst'); var sst = result.value; if( !isNaN( sst )) result.value++;return false;" className="increase items-count" type="button">
                                                        <i className="lnr lnr-chevron-up" />
                                                    </button>
                                                    <button onclick="var result = document.getElementById('sst'); var sst = result.value; if( !isNaN( sst ) && sst > 0 ) result.value--;return false;" className="reduced items-count" type="button">
                                                        <i className="lnr lnr-chevron-down" />
                                                    </button>
                                                </div>
                                            </td>
                                            <td>
                                                <h5>$720.00</h5>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="media">
                                                    <div className="d-flex">
                                                        <img src="asset/img/product/single-product/s-product-s-4.jpg" alt />
                                                    </div>
                                                    <div className="media-body">
                                                        <p>Minimalistic shop for multipurpose use</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <h5>$360.00</h5>
                                            </td>
                                            <td>
                                                <div className="product_count">
                                                    <input type="text" name="qty" id="sst" maxLength={12} defaultValue={1} title="Quantity:" className="input-text qty" />
                                                    <button onclick="var result = document.getElementById('sst'); var sst = result.value; if( !isNaN( sst )) result.value++;return false;" className="increase items-count" type="button">
                                                        <i className="lnr lnr-chevron-up" />
                                                    </button>
                                                    <button onclick="var result = document.getElementById('sst'); var sst = result.value; if( !isNaN( sst ) && sst > 0 ) result.value--;return false;" className="reduced items-count" type="button">
                                                        <i className="lnr lnr-chevron-down" />
                                                    </button>
                                                </div>
                                            </td>
                                            <td>
                                                <h5>$720.00</h5>
                                            </td>
                                        </tr>
                                        <tr className="bottom_button">
                                            <td>
                                                <div>
                                                {data.map((item) => (
                                                    <div key={item.id}>
                                                        <p>{item.name}</p>
                                                        <p>{item.price}</p>
                                                        <img src={item.image} alt={item.name} />
                                                        <button
                                                            onClick={() => handleLike(item.id, !item.liked)}
                                                            style={{ color: item.liked ? "red" : "black" }}
                                                        >
                                                            <i className="fa-solid fa-heart"></i>
                                                        </button>
                                                        <button onClick={() => Cart(item)} disabled={item.addedToCart}>
                                                            {item.addedToCart ? "Added to Cart" : "Add to Cart"}
                                                        </button>
                                                    </div>
                                   ))}
                                              8ul  </div>
                                                <Link className="gray_btn" to="#">Add to Cart</Link>
                                            </td>
                                            <td />
                                            <td />
                                            <td>
                                                <div className="cupon_text">
                                                    <input type="text" placeholder="Coupon Code" />
                                                    <Link className="main_btn" to="#">Apply</Link>
                                                    <Link className="gray_btn" to="#">Close Coupon</Link>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td />
                                            <td />
                                            <td>
                                                <h5>Subtotal</h5>
                                            </td>
                                            <td>
                                                <h5>$2160.00</h5>
                                            </td>
                                        </tr>
                                        <tr className="shipping_area">
                                            <td />
                                            <td />
                                            <td>
                                                <h5>Shipping</h5>
                                            </td>
                                            <td>
                                                <div className="shipping_box">
                                                    <ul className="list">
                                                        <li>
                                                            <Link to="#">Flat Rate: $5.00</Link>
                                                        </li>
                                                        <li>
                                                            <Link to="#">Free Shipping</Link>
                                                        </li>
                                                        <li>
                                                            <Link to="#">Flat Rate: $10.00</Link>
                                                        </li>
                                                        <li className="active">
                                                            <Link to="#">Local Delivery: $2.00</Link>
                                                        </li>
                                                    </ul>
                                                    <h6>
                                                        Calculate Shipping
                                                        <i className="fa fa-caret-down" aria-hidden="true" />
                                                    </h6>
                                                    <select className="shipping_select">
                                                        <option value={1}>Bangladesh</option>
                                                        <option value={2}>India</option>
                                                        <option value={4}>Pakistan</option>
                                                    </select>
                                                    <select className="shipping_select">
                                                        <option value={1}>Select Link State</option>
                                                        <option value={2}>Select Link State</option>
                                                        <option value={4}>Select Link State</option>
                                                    </select>
                                                    <input type="text" placeholder="Postcode/Zipcode" />
                                                    <Link className="gray_btn" to="#">Update Details</Link>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="out_button_area">
                                            <td />
                                            <td />
                                            <td />
                                            <td>
                                                <div className="checkout_btn_inner">
                                                    <Link className="gray_btn" to="#">Continue Shopping</Link>
                                                    <Link className="main_btn" to="#">Proceed to checkout</Link>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
                {/*================End Cart Area =================*/}
            </div>


        </div>
    )
}

export default Cart
