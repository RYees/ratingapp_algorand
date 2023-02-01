import styled from "styled-components";


export const Button = styled.button`
    background-color : ${({backgroundColor}) => backgroundColor  ? '#df1f1f' : '#245EC7' };
    cursor: pointer;
    color: black;
    font-size: 1.2rem;
    padding : 20px 16px 20px 16px;
    border-radius: 200px;
    border-color : transparent;
    margin-top: -9px;
    margin-left: -65rem;
    font-family : 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif
`

export const TransactionButton = styled.button`
    background-color: rgb(255, 174, 0);
    color: ${({backgroundColor}) => backgroundColor  ? '#050505b2' : '#df1f1f' };
    cursor: pointer;
    font-size: 1.2rem;
    padding : 10px 25px 10px 25px;
    border-radius: 5px;
    border-color : ${({backgroundColor}) => backgroundColor  ? 'rgb(255, 174, 0)' : '#245EC7' };
    margin : 20px 10px;
    font-family : 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif 
    `
