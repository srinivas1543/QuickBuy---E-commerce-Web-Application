import axios from "axios";
import { useEffect,useState } from "react";
import "./Homepage.css";
import Header from "../../Components/Header";  
import ProductsGrid from "./ProductsGrid";


function HomePage({cart ,loadCart}) {

  const[ products , setProducts] = useState([]); // we are storing the fetched data in this state

  useEffect(()=>{
      async function getResposeData(){
        const response = await axios.get('http://localhost:3000/api/products')
        setProducts(response.data)
      }
      getResposeData();
  },[]); 

  return (
    <>
      <title>E-Commerce Project</title>
      
      <Header cart = {cart} />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}
export default HomePage;
