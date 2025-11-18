import React, { useContext } from 'react'
import Card from '../../components/Cards/Card'
import { PassingValue } from '../../App'

const Womens = () => {
   let allProducts  = useContext(PassingValue)
    let womensProducts = allProducts.filter((item)=>item.prodCat==="Womens")
  return (
    <div className='Womens'>
      {womensProducts.map((item)=>(
        <Card {...item}/>
      ))}
      
    </div>
  )
}

export default Womens