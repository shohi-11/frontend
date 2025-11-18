import { useContext } from "react";
import { PassingValue } from "../../App";
import Card from "../../components/Cards/Card";

const Mens = () => {
  const allProducts = useContext(PassingValue);

  const mensProducts = allProducts.filter((item) => item.prodCat === "Mens");

  console.log("All Products:", allProducts);
  console.log("Filtered Mens Products:", mensProducts);

  return (
    <div className='Mens'>
      {mensProducts.map((item, index) => (
        <Card key={index} {...item} />
      ))}
    </div>
  );
};


export default Mens
