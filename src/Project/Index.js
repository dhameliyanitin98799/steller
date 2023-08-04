import { Link } from 'react-router-dom'
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { fireStoreDb } from '../firebaseConfig';


const Index = () => {
    // const fetchData = async () => {
    //     const querySnapshot = await getDocs(collection(fireStoreDb, "item"));
    //     console.log(querySnapshot.docs);
    // }
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const querySnapshot = await getDocs(collection(fireStoreDb, "product"));
        console.log(querySnapshot.docs);

        const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().item,
            description: doc.data().description,
            price: doc.data().price,
            image: doc.data().product_image,
            liked: doc.data().liked || false,
        }));
        setData(data);
    };

    useEffect(() => {
        fetchData();``
    }, []);
    const addToCart = async (cart) => {
        await addDoc(collection(fireStoreDb, "cart"), {
            id: cart.id,
            name: cart.name,
            description: cart.description,
            price: cart.price,
            image: cart.image,
            quantity: 1,
        });
    };
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
   
    
    return (
        <div>

            <div>
                {/*================Home Banner Area =================*/}
                <section className="home_banner_area mb-40">
                    <div className="banner_inner d-flex align-items-center">
                        <div className="container">
                            <div className="banner_content row">
                                <div className="col-lg-12">
                                    <p className="sub text-uppercase">men Collection</p>
                                    <h3><span>Show</span> Your <br />Personal <span>Style</span></h3>
                                    <h4>Fowl saw dry which Link above together place.</h4>
                                    <Link className="main_btn mt-40">View Collection</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*================End Home Banner Area =================*/}
                {/* Start feature Area */}
                <section className="feature-area section_gap_bottom_custom">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-6">
                                <div className="single-feature">
                                    <Link className="title">
                                        <i className="flaticon-money" />
                                        <h3>Money back gurantee</h3>
                                    </Link>
                                    <p>Shall open divide Link one</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="single-feature">
                                    <Link className="title">
                                        <i className="flaticon-truck" />
                                        <h3>Free Delivery</h3>
                                    </Link>
                                    <p>Shall open divide Link one</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="single-feature">
                                    <Link className="title">
                                        <i className="flaticon-support" />
                                        <h3>Alway support</h3>
                                    </Link>
                                    <p>Shall open divide Link one</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="single-feature">
                                    <Link className="title">
                                        <i className="flaticon-blockchain" />
                                        <h3>Secure payment</h3>
                                    </Link>
                                    <p>Shall open divide Link one</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* End feature Area */}
                {/*================ Feature Product Area =================*/}
                <section className="feature_product_area section_gap_bottom_custom">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-12">
                                <div className="main_title">
                                    <h2><span>Featured product</span></h2>
                                    <p>Bring called seed first of third give itself now ment</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className='col-4'>
                                {data.map((item) => (
                                    <div key={item.id}>
                                        <p>{item.name}</p>
                                        <p>{item.price}</p>
                                        <img src={item.image} />

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                {/*================ End Feature Product Area =================*/}
                {/*================ Offer Area =================*/}
                <section className="offer_area">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="offset-lg-4 col-lg-6 text-center">
                                <div className="offer_content">
                                    <h3 className="text-uppercase mb-40">all men’s collection</h3>
                                    <h2 className="text-uppercase">50% off</h2>
                                    <Link className="main_btn mb-20 mt-5">Discover Now</Link>
                                    <p>Limited Time Offer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*================ End Offer Area =================*/}
                {/*================ New Product Area =================*/}
                <section className="new_product_area section_gap_top section_gap_bottom_custom">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-12">
                                <div className="main_title">
                                    <h2><span>new products</span></h2>
                                    <p>Bring called seed first of third give itself now ment</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="new_product">
                                    <h5 className="text-uppercase">collection of 2019</h5>
                                    <h3 className="text-uppercase">Men’s summer t-shirt</h3>
                                    <div className="product-img">
                                        <img className="img-fluid" src="asset/img/product/new-product/new-product1.png" alt />
                                    </div>
                                    <h4>$120.70</h4>
                                    <Link to="/Cart" className="main_btn">Add to cart</Link>
                                </div>
                            </div>
                            <div className="col-lg-6 mt-5 mt-lg-0">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6">
                                        <div className="single-product">
                                            <div className="product-img">
                                                <img className="img-fluid w-100" src="asset/img/product/new-product/n1.jpg" alt />
                                                <div className="p_icon">
                                                    <Link>
                                                        <i className="ti-eye" />
                                                    </Link>
                                                    <Link>
                                                        <i className="ti-heart" />
                                                    </Link>
                                                    <Link>
                                                        {data.map((item) => (
                                                            <div key={item.id}>
                                                                <p>{item.name}</p>
                                                                <p>{item.price}</p>
                                                                <img src={item.image} alt={item.name} />
                                                                <button
                                                                    onClick={() => handleLike(item.id, !item.liked)}
                                                                    style={{ color: item.liked ? "red" : "black" }}
                                                                >
                                                                    <i className="ti-shopping-cart" />
                                                                </button>
                                                                <button onClick={() => addToCart(item)} disabled={item.addedToCart}>
                                                                    {item.addedToCart ? "Added to Cart" : "Add to Cart"}
                                                                </button>
                                                            </div>
                                                        ))}

                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="product-btm">
                                                <Link className="d-block">
                                                    <h4>Nike latest sneaker</h4>
                                                </Link>
                                                <div className="mt-3">
                                                    <span className="mr-4">$25.00</span>
                                                    <del>$35.00</del>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="single-product">
                                            <div className="product-img">
                                                <img className="img-fluid w-100" src="asset/img/product/new-product/n2.jpg" alt />
                                                <div className="p_icon">
                                                    <Link>
                                                        <i className="ti-eye" />
                                                    </Link>
                                                    <Link>
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
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <i className="ti-heart" />
                                                    </Link>
                                                    <Link>
                                                        <i className="ti-shopping-cart" />
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="product-btm">
                                                <Link className="d-block">
                                                    <h4>Men’s denim jeans</h4>
                                                </Link>
                                                <div className="mt-3">
                                                    <span className="mr-4">$25.00</span>
                                                    <del>$35.00</del>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="single-product">
                                            <div className="product-img">
                                                <img className="img-fluid w-100" src="asset/img/product/new-product/n3.jpg" alt />
                                                <div className="p_icon">
                                                    <Link>
                                                        <i className="ti-eye" />
                                                    </Link>
                                                    <Link>
                                                        <i className="ti-heart" />
                                                    </Link>
                                                    <Link>
                                                        <i className="ti-shopping-cart" />
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="product-btm">
                                                <Link className="d-block">
                                                    <h4>quartz hand watch</h4>
                                                </Link>
                                                <div className="mt-3">
                                                    <span className="mr-4">$25.00</span>
                                                    <del>$35.00</del>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="single-product">
                                            <div className="product-img">
                                                <img className="img-fluid w-100" src="asset/img/product/new-product/n4.jpg" alt />
                                                <div className="p_icon">
                                                    <Link>
                                                        <i className="ti-eye" />
                                                    </Link>
                                                    <Link>
                                                        <i className="ti-heart" />
                                                    </Link>
                                                    <Link>
                                                        <i className="ti-shopping-cart" />
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="product-btm">
                                                <Link className="d-block">
                                                    <h4>adidas sport shoe</h4>
                                                </Link>
                                                <div className="mt-3">
                                                    <span className="mr-4">$25.00</span>
                                                    <del>$35.00</del>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*================ End New Product Area =================*/}
                {/*================ Inspired Product Area =================*/}
                <section className="inspired_product_area section_gap_bottom_custom">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-12">
                                <div className="main_title">
                                    <h2><span>Inspired products</span></h2>
                                    <p>Bring called seed first of third give itself now ment</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-3 col-md-6">
                                <div className="single-product">
                                    <div className="product-img">
                                        <img className="img-fluid w-100" src="asset/img/product/inspired-product/i1.jpg" alt />
                                        <div className="p_icon">
                                            <Link>
                                                <i className="ti-eye" />
                                            </Link>
                                            <Link>
                                                <i className="ti-heart" />
                                            </Link>
                                            <Link>
                                                <i className="ti-shopping-cart" />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="product-btm">
                                        <Link className="d-block">
                                            <h4>Latest men’s sneaker</h4>
                                        </Link>
                                        <div className="mt-3">
                                            <span className="mr-4">$25.00</span>
                                            <del>$35.00</del>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="single-product">
                                    <div className="product-img">
                                        <img className="img-fluid w-100" src="asset/img/product/inspired-product/i2.jpg" alt />
                                        <div className="p_icon">
                                            <Link>
                                                <i className="ti-eye" />
                                            </Link>
                                            <Link>
                                                <i className="ti-heart" />
                                            </Link>
                                            <Link>
                                                <i className="ti-shopping-cart" />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="product-btm">
                                        <Link className="d-block">
                                            <h4>Latest men’s sneaker</h4>
                                        </Link>
                                        <div className="mt-3">
                                            <span className="mr-4">$25.00</span>
                                            <del>$35.00</del>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="single-product">
                                    <div className="product-img">
                                        <img className="img-fluid w-100" src="asset/img/product/inspired-product/i3.jpg" alt />
                                        <div className="p_icon">
                                            <Link>
                                                <i className="ti-eye" />
                                            </Link>
                                            <Link>
                                                <i className="ti-heart" />
                                            </Link>
                                            <Link>
                                                <i className="ti-shopping-cart" />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="product-btm">
                                        <Link className="d-block">
                                            <h4>Latest men’s sneaker</h4>
                                        </Link>
                                        <div className="mt-3">
                                            <span className="mr-4">$25.00</span>
                                            <del>$35.00</del>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="single-product">
                                    <div className="product-img">
                                        <img className="img-fluid w-100" src="asset/img/product/inspired-product/i4.jpg" alt />
                                        <div className="p_icon">
                                            <Link>
                                                <i className="ti-eye" />
                                            </Link>
                                            <Link>
                                                <i className="ti-heart" />
                                            </Link>
                                            <Link>
                                                <i className="ti-shopping-cart" />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="product-btm">
                                        <Link className="d-block">
                                            <h4>Latest men’s sneaker</h4>
                                        </Link>
                                        <div className="mt-3">
                                            <span className="mr-4">$25.00</span>
                                            <del>$35.00</del>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="single-product">
                                    <div className="product-img">
                                        <img className="img-fluid w-100" src="asset/img/product/inspired-product/i5.jpg" alt />
                                        <div className="p_icon">
                                            <Link>
                                                <i className="ti-eye" />
                                            </Link>
                                            <Link>
                                                <i className="ti-heart" />
                                            </Link>
                                            <Link>
                                                <i className="ti-shopping-cart" />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="product-btm">
                                        <Link className="d-block">
                                            <h4>Latest men’s sneaker</h4>
                                        </Link>
                                        <div className="mt-3">
                                            <span className="mr-4">$25.00</span>
                                            <del>$35.00</del>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="single-product">
                                    <div className="product-img">
                                        <img className="img-fluid w-100" src="asset/img/product/inspired-product/i6.jpg" alt />
                                        <div className="p_icon">
                                            <Link>
                                                <i className="ti-eye" />
                                            </Link>
                                            <Link>
                                                <i className="ti-heart" />
                                            </Link>
                                            <Link>
                                                <i className="ti-shopping-cart" />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="product-btm">
                                        <Link className="d-block">
                                            <h4>Latest men’s sneaker</h4>
                                        </Link>
                                        <div className="mt-3">
                                            <span className="mr-4">$25.00</span>
                                            <del>$35.00</del>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="single-product">
                                    <div className="product-img">
                                        <img className="img-fluid w-100" src="asset/img/product/inspired-product/i7.jpg" alt />
                                        <div className="p_icon">
                                            <Link>
                                                <i className="ti-eye" />
                                            </Link>
                                            <Link>
                                                <i className="ti-heart" />
                                            </Link>
                                            <Link>
                                                <i className="ti-shopping-cart" />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="product-btm">
                                        <Link className="d-block">
                                            <h4>Latest men’s sneaker</h4>
                                        </Link>
                                        <div className="mt-3">
                                            <span className="mr-4">$25.00</span>
                                            <del>$35.00</del>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="single-product">
                                    <div className="product-img">
                                        <img className="img-fluid w-100" src="asset/img/product/inspired-product/i8.jpg" alt />
                                        <div className="p_icon">
                                            <Link>
                                                <i className="ti-eye" />
                                            </Link>
                                            <Link>
                                                <i className="ti-heart" />
                                            </Link>
                                            <Link>
                                                <i className="ti-shopping-cart" />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="product-btm">
                                        <Link className="d-block">
                                            <h4>Latest men’s sneaker</h4>
                                        </Link>
                                        <div className="mt-3">
                                            <span className="mr-4">$25.00</span>
                                            <del>$35.00</del>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*================ End Inspired Product Area =================*/}
                {/*================ Start Blog Area =================*/}
                <section className="blog-area section-gap">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-12">
                                <div className="main_title">
                                    <h2><span>latest blog</span></h2>
                                    <p>Bring called seed first of third give itself now ment</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 col-md-6">
                                <div className="single-blog">
                                    <div className="thumb">
                                        <img className="img-fluid" src="asset/img/b1.jpg" alt />
                                    </div>
                                    <div className="short_details">
                                        <div className="meta-top d-flex">
                                            <Link>By Admin</Link>
                                            <Link><i className="ti-comments-smiley" />2 Comments</Link>
                                        </div>
                                        <Link className="d-block" to="/SingleBlog">
                                            <h4>Ford clever bed stops your sleeping
                                                partner hogging the whole</h4>
                                        </Link>
                                        <div className="text-wrap">
                                            <p>
                                                Let one fifth i bring fly to divided face for bearing the divide unto seed winged divided light
                                                Forth.
                                            </p>
                                        </div>
                                        <Link className="blog_btn">Learn More <span className="ml-2 ti-arrow-right" /></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="single-blog">
                                    <div className="thumb">
                                        <img className="img-fluid" src="asset/img/b2.jpg" alt />
                                    </div>
                                    <div className="short_details">
                                        <div className="meta-top d-flex">
                                            <Link>By Admin</Link>
                                            <Link><i className="ti-comments-smiley" />2 Comments</Link>
                                        </div>
                                        <Link className="d-block" to="/SingleBlog">
                                            <h4>Ford clever bed stops your sleeping
                                                partner hogging the whole</h4>
                                        </Link>
                                        <div className="text-wrap">
                                            <p>
                                                Let one fifth i bring fly to divided face for bearing the divide unto seed winged divided light
                                                Forth.
                                            </p>
                                        </div>
                                        <Link className="blog_btn">Learn More <span className="ml-2 ti-arrow-right" /></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="single-blog">
                                    <div className="thumb">
                                        <img className="img-fluid" src="asset/img/b3.jpg" alt />
                                    </div>
                                    <div className="short_details">
                                        <div className="meta-top d-flex">
                                            <Link>By Admin</Link>
                                            <Link><i className="ti-comments-smiley" />2 Comments</Link>
                                        </div>
                                        <Link className="d-block" to="/SingleBlog">
                                            <h4>Ford clever bed stops your sleeping
                                                partner hogging the whole</h4>
                                        </Link>
                                        <div className="text-wrap">
                                            <p>
                                                Let one fifth i bring fly to divided face for bearing the divide unto seed winged divided light
                                                Forth.
                                            </p>
                                        </div>
                                        <Link className="blog_btn">Learn More <span className="ml-2 ti-arrow-right" /></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*================ End Blog Area =================*/}
            </div>


        </div>
    )
}

export default Index
