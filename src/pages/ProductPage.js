import React from 'react'
import Header from '../components/Header'
import Product from '../components/Product'
import Proposal from '../components/Proposal'
import Contract from '../components/Contract'
import '../App.css'

const ProductPage = () => {
  return (
    <div>
        <Header/>
        <div className="product-container">
        <div style={{ flex: 2 }}>
        <Product/>
        </div>
        <div style={{ flex: 1 }}>
        <Proposal/>
        <Contract/>
        </div>
        </div>
    </div>
  )
}

export default ProductPage