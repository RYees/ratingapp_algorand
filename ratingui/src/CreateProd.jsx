/*global AlgoSigner*/
import React, {useRef, useState} from "react";
import { FormStyle } from "./css/Form.style";
import { TransactionButton } from "./css/Button.styles";
import { BodyText } from "./css/MyAlgoWallet.styles";
import './css/style.css';
import { AiFillCloseCircle } from 'react-icons/ai';
import "./css/modal.css";
import {stringToMicroAlgos} from "./utils/conversions"; 
import {
    algodClient,
    indexerClient,
    ratingNote,
    minRound,
    myAlgoConnect,
    numGlobalBytes,
    numGlobalInts,
    numLocalBytes,
    numLocalInts
} from "./utils/constants";
/* eslint import/no-webpack-loader-syntax: off */
import approvalProgram from "!!raw-loader!./contracts/approval.teal";
import clearProgram from "!!raw-loader!./contracts/clear.teal";
import {base64ToUTF8String, utf8ToBase64String} from "./utils/conversions";
// import Transaction from "./Transaction";
import { TOKEN, ALGOD_SERVER, PORT } from "./utils/constant";
import {createProductAction} from "./utils/contract_functions";

const algosdk = require("algosdk");

const CreateProd = ({senderAddress}) => {
    const [modal, setModal] = useState(false);
    const [status, setStatus] = useState('');
    const [isLoading, setLoading] = useState(false);

    const prodName = useRef()
    const descrip = useRef()
    const imag = useRef()
    const prodPrice = useRef()
    let algodClient =  new algosdk.Algodv2(TOKEN, ALGOD_SERVER, PORT)
    const toggleModal = () => {
      setModal(!modal);
    };
     
    const createAsset = async() => {
        console.log('co', prodName.current)
        let name = prodName.current;
        let image = imag.current;
        let description = descrip.current;
        let price = stringToMicroAlgos(prodPrice.current);
        console.log('hhhwww', {name, image, description, price});
       createProduct({name, image, description, price});
    }
    // Compile smart contract in .teal format to program
    const compileProgram = async (programSource) => {
        let encoder = new TextEncoder();
        let programBytes = encoder.encode(programSource);
        let compileResponse = await algodClient.compile(programBytes).do();
        return new Uint8Array(Buffer.from(compileResponse.result, "base64"));
    }
    
    const createProduct = async (product) =>{
        // await AlgoSigner.connect();
        setLoading(true);
        let algodClient =  new algosdk.Algodv2(TOKEN, ALGOD_SERVER, PORT)
                
        //Query Algod to get testnet suggested params
        //let txParamsJS = await client.getTransactionParams().do()

        try{
           // createProductAction(address, data)
            console.log("Adding product...")

            let params = await algodClient.getTransactionParams().do();
            params.fee = algosdk.ALGORAND_MIN_TX_FEE;
            params.flatFee = true;
        
            // Compile programs
            const compiledApprovalProgram = await compileProgram(approvalProgram)
            const compiledClearProgram = await compileProgram(clearProgram)
        
            // Build note to identify transaction later and required app args as Uint8Arrays
            let note = new TextEncoder().encode(ratingNote);
            let name = new TextEncoder().encode(product.name);
            let image = new TextEncoder().encode(product.image);
            let description = new TextEncoder().encode(product.description);
            let price = algosdk.encodeUint64(product.price);
        
            let appArgs = [name, image, description, price]
        
            // Create ApplicationCreateTxn
            let txn = algosdk.makeApplicationCreateTxnFromObject({
                from: senderAddress,
                suggestedParams: params,
                onComplete: algosdk.OnApplicationComplete.NoOpOC,
                approvalProgram: compiledApprovalProgram,
                clearProgram: compiledClearProgram,
                numLocalInts: numLocalInts,
                numLocalByteSlices: numLocalBytes,
                numGlobalInts: numGlobalInts,
                numGlobalByteSlices: numGlobalBytes,
                note: note,
                appArgs: appArgs
            });
        
            // Get transaction ID
            let txId = txn.txID().toString();
        
            // Sign & submit the transaction
            let signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
            console.log("Signed transaction with txID: %s", txId);
            await algodClient.sendRawTransaction(signedTxn.blob).do();
        
            // Wait for transaction to be confirmed
            let confirmedTxn = await algosdk.waitForConfirmation(algodClient, txId, 4);
        
            // Get the completed Transaction
            console.log("Transaction " + txId + " confirmed in round " + confirmedTxn["confirmed-round"]);
        
            // Get created application id and notify about completion
            let transactionResponse = await algodClient.pendingTransactionInformation(txId).do();
            let appId = transactionResponse['application-index'];
            console.log("Created new app-id: ", appId);
            return appId;
        
        }catch(err){
            console.log('error first',err)
            setStatus('Asset creation failed, check if your Algosigner account is connected');
            toggleModal();
            setLoading(false)
        }
    }

  
    return(
    <>
    <div className="create">
    {/* <div> <button className="button-on">add</button></div> */}
     <div>
        <BodyText className="title">Create Product</BodyText>
     </div>
        <div className="form">
            <FormStyle onChange = {(e) => prodName.current = e.target.value} placeholder="Product name" /><br/>
            <FormStyle onChange = {(e) => descrip.current = e.target.value} placeholder="Image" /><br/>
            <FormStyle onChange = {(e) => imag.current = e.target.value} placeholder="Description" /><br/>
            <FormStyle onChange = {(e) => prodPrice.current = e.target.value} placeholder="Price" /><br/>
            <TransactionButton backgroundColor onClick ={createAsset}>{isLoading ? "loading...": "Create"}</TransactionButton>
            {/* <Button
                    variant="dark"
                    disabled={!isFormFilled()}
                    onClick={() => {
                        createProduct({
                            prodName,
                            image,
                            description,
                            price
                        });
                        handleClose();
                    }}
                >
                    Save product
                </Button> */}
        </div>

        {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2 className="text-gray-900 text-center">
               {status}
            </h2>
            <button className="close-modal" onClick={toggleModal}>
              <AiFillCloseCircle size='28px'className="text-gray-900"/>
            </button>
          </div>
        </div>
      )}

    </div>
    {/* <Transaction/> */}
    </>
    )
}

export default CreateProd