import React, {useEffect, useState} from "react";
import './App.css';
import MyAlgoConnect from "@randlabs/myalgo-connect";
import {getProductsAction} from "./utils/contract_functions";

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
        });
    }, []);

    return (
        <>
            {address ? (
                products.forEach((product) => console.log(product))
            ) : (
                <button onClick={connectWallet}>CONNECT WALLET</button>
            )} 
        </>
    );
}

export default App;