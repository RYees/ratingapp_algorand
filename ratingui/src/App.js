import React, {useEffect, useState} from "react";
import './App.css';
import MyAlgoConnect from "@randlabs/myalgo-connect";
import {getProductsAction, createProductAction} from "./utils/contract_functions";
import AddProduct from "./AddProduct";
import CreateProd from "./CreateProd";
import im from './images/img6.jpg'

const App = function AppWrapper() {

    const [address, setAddress] = useState(null);
    const [products, setProducts] = useState([]);

    const connectWallet = async () => {
        new MyAlgoConnect().connect()
            .then(accounts => {
                const _account = accounts[0];
                setAddress(_account.address);
                console.log('connected to MyAlgo wallet', address);
            }).catch(error => {
            console.log('Could not connect to MyAlgo wallet');
            console.error(error);
        })
    };

    useEffect(() => {
        getProductsAction().then(products => {
            setProducts(products)
            console.log('suprised', products);
        });
    }, []);

    const createProduct = async (data) => {
	    // setLoading(true);
	    createProductAction(address, data)
	        .then(() => {
	            // toast(<NotificationSuccess text="Product added successfully."/>);
	            // getProducts();
	            // fetchBalance(address);
              console.log('Successfully added')
	        })
	        .catch(error => {
	            console.log(error);
	            // toast(<NotificationError text="Failed to create a product."/>);
	            // setLoading(false);
	        })
	    };

    return (
        <>
        <div className="contain-boxing">
            {/* <img className="imw" src={im}/> */}<p>{address}</p>
            <div className="sub-box">
                {/* {address ? (
                    products.forEach((product) => product)
                ) : ( 
                    <button className="button-on" onClick={connectWallet}>Connect Wallet</button>
        
                )}  */}
                <div> <button className="button-on" onClick={connectWallet}>Connect Wallet</button></div>
                                
                <CreateProd senderAddress={address} />
           </div>
        </div>
        </>
    );
}

export default App;