import React from "react";
import Navbar from "./components/navbar";
// import { useNavigate } from "react-router-dom";
import checkAuth from "./components/auth/checkAuth";
function Ecommerce() {
    // const navigate= useNavigate()
    var products = [
        {name: "Dress", price: 100, available: true},
        {name: "Television", price: 500, available: true},
        {name: "Laptop", price: 200, available: true},
        {name: "Chair", price: 10, available: false},
        {name: "Table", price: 15, available: false},
        {name: "Car", price: 1000, available: true}
    ];

    return (
        <div>
        <Navbar/>
         
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        
                    </tr>
                </thead>
                <tbody>
                 { products.map((product) =>{
                        if (product.available) {
                            return (
                                <tr>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    
                                </tr>
                            );
                        } else {
                          
                        }
                   } )}
            
                </tbody>
            </table>
        </div>
    );
}

export default checkAuth(Ecommerce);
