import React, { useContext } from 'react';
import Card from '../../components/Cards/Card';
import './All.css'
import { PassingValue } from '../../App';
const All = () => {
  const all = useContext(PassingValue); 
  // console.log(a);
  // Access the context value

  return (
    <div className='All'>
      <div className='All_products'>
      {all.map((product) => (
        <Card {...product}/>
        
      ))}
      </div>
    </div>
  );
};

export default All;