import React from "react";
import ReactDOM from "react-dom";
import Loader from 'react-loader-spinner'
export default class loadnyut extends React.Component {
 //other logic
   render() {
    return(
     <Loader 
        type="bars"
        color="#00BFFF"
        height="100"	
        width="100"
     />   
    );
   }
}