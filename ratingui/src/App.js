import React, {useEffect, useState} from "react";
import './App.css';
import MyAlgoConnect from "@randlabs/myalgo-connect";
import {getProductsAction, createProductAction} from "./utils/contract_functions";
import AddProduct from "./AddProduct";
import CreateProd from "./CreateProd";

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
            {address ? (
                products.forEach((product) => product)
             ) : ( 
                <button onClick={connectWallet}>CONNECT WALLET</button>
    
           )} 
           <p>{address}</p>
           <CreateProd senderAddress={address} />
        </>
    );
}

export default App;