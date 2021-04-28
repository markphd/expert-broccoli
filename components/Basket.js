import { useState, useEffect, useContext } from 'react'
import { BasketContext } from './BasketContext';

const Basket = () => {
    const { orderBasket, setOrderBasket } = useContext(BasketContext);
    
    if (localStorage.getItem('basket') !== null) {
      setOrderBasket(localStorage.getItem('basket'))
    } 

    return (
      <a href="/cart">
        <p className="basket">Basket ({--orderBasket.split('^').length})</p>
      </a>
    )
}


export default Basket