import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProductDetailComponent from '../../components/ProductDetailComponent/ProductDetailComponent'

const ProductDetailsPage = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  return (
    <div style={{width: '100%',background: '#efefef', height: '100%'}}>
      <div style={{ width: '1270px', height: '100%', margin: '0 auto'}} >
        <h3><span style={{cursor: 'pointer', fontWeight: 'bold'}} onClick={() => {navigate('/')}}></span></h3>
        <ProductDetailComponent idProduct={id} />
      </div>
    </div>
  )
}

export default ProductDetailsPage