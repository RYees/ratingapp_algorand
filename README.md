# Online Rating System on Algorand Blockchain

The online rating system provides the ratings of products and services to users. Existing rating systems rely on service or product users to provide their opinion with little or no consequences and the weight value of each rating is, at most, determined by the user’s trustworthiness based on past history or assigned to be equal. The value of a single rating is therefore variable and does not have a standard scale. Moreover, the cost of rating is so low that one can use bots to simulate fake rates. It is desirable therefore to devise a rating solution that discourages fake ratings - for example by introducing rating right token or cost of for each rating. So these repo will indicate the implementation of rating system on blockchain technology particularly in the Algorand blockchain.  


# Table of content
* [Overview](#overview)
* [Requirements](#requirements)
* [Workflow](#workflow)


## Overview
This project is about creating an online rating system to the blockchain to get a more reliable result of rating of users.

## Requirements

    • The smart contract will have a function to register products or services of a company so that it will be stored on the blockchain.
    • To make the rating system permissioned, when they receive a receipt for the product they purchase, the receipt will also have a qr code that contain the product information, using the mobile dapp they could scan the qr code from the receipt and then the smart contract will compare the qrcode with the products qr code that was already stored on the blockchain when registering the product and if it matched it will show the matched product for the user with the option to give their rating or tip the product provider.
    • Rating rights will be Nft with a limited right of rating for per each user public address, how users’ will rate will be by creating an asset first, when creating the asset the total number of the asset will be automatically filled by the application and then the user will create the asset. Once created the system will catch the assetId and transfer to the contract logic function to opt-in for the asset rating, since the contract owners’ are the product provider the rating asset will be finally assigned to the product for the provider.


    • When creating the rating asset, we could include additional info like comment on the product using metadata using ipfs external storage.
    • If the user want to tip in addition to rating, they will have a different option to tip as much algo value they want to the product/service provider.
    • Users who give a balanced and fair rating can receive a special gift from the product provider by qr code, when they scan the gift qrcode some amount of algo can be transferred to them from the contract to their account.
    
## Workflow
Steps to do the project:
* Step 1. 
   * building and deploy the smart contract with and pyteal libraries
   * Testing the smart contact with pytest
* Step 2
   * building the mobile dapp user interface with react native.
