import React from 'react'
import Header from '../components/Header'
import Product from '../components/ProductPage/Product'
import Proposal from '../components/ProductPage/Proposal'
import Contract from '../components/ProductPage/Contract'
import '../App.css'
import Connection from '../components/ProductPage/Connection'

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
        <Connection/>
        </div>
        </div>
    </div>
  )
}

export default ProductPage