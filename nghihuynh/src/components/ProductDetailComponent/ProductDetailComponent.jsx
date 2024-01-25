import { Col, Image, Rate, Row } from 'antd'
import React from 'react'
// import imageProductSmall from '../../assets/images/imagesmall.webp'
import { WrapperStyleImageSmall, WrapperStyleColImage, WrapperStyleNameProduct, WrapperProducts,WrapperStyleTextSell, WrapperPriceProduct, WrapperPriceTextProduct, WrapperAddressProduct, WrapperQualityProduct, WrapperInputNumber, WrapperBtnQualityProduct } from './style'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import * as ProductService from '../../services/ProductService'

import { useQuery } from '@tanstack/react-query'
import Loading from '../LoadingComponent/Loading'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { addOrderProduct,resetOrder } from '../../redux/slides/orderSlide'
 import { convertPrice, initFacebookSDK } from '../../utils'
import { useEffect } from 'react'
import * as message from '../Message/Message'
import CardComponent from '../CardComponent/CardComponent'
 import CommentComponent from '../CommentComponent/CommentComponent'
import { useMemo } from 'react'

const ProductDetailComponent = ({idProduct}) => {
    const [limit, setLimit] = useState(6)
    const [hoveredThumbnail, setHoveredThumbnail] = useState(null);
    const [numProduct, setNumProduct] = useState(1)
    const user = useSelector((state) => state.user)
    const order = useSelector((state) => state.order)
    const [errorLimitOrder,setErrorLimitOrder] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const onChange = (value) => { 
        setNumProduct(Number(value))
    }

    const fetchGetDetailsProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1]
        if(id) {
            const res = await ProductService.getDetailsProduct(id)
            return res.data
        }
    }
    
    const fetchProductAll = async (context) => {
        const limit = context?.queryKey && context?.queryKey[1];
        const search = context?.queryKey && context?.queryKey[2];
        const res = await ProductService.getAllProduct(search, limit);
    
        return res;
      };
    useEffect(() => {
       initFacebookSDK()
    }, [])

    useEffect(() => {
        const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id) 
        if((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
            setErrorLimitOrder(false)
        } else if(productDetails?.countInStock === 0){
            setErrorLimitOrder(true)
        }
    },[numProduct])

    useEffect(() => {
        if(order.isSucessOrder) {
            message.success('Đã thêm vào giỏ hàng')
        }
        return () => {
            dispatch(resetOrder())
        }
    }, [order.isSucessOrder])

    const handleChangeCount = (type, limited) => {
        if(type === 'increase') {
            if(!limited) {
                setNumProduct(numProduct + 1)
            }
        }else {
            if(!limited) {
                setNumProduct(numProduct - 1)
            }
        }
    }

    const { isLoading, data: productDetails } = useQuery(['product-details', idProduct], fetchGetDetailsProduct, { enabled : !!idProduct})
    const handleAddOrderProduct = () => {
        if(!user?.id) {
            navigate('/sign-in', {state: location?.pathname})
        }else {
            // {
            //     name: { type: String, required: true },
            //     amount: { type: Number, required: true },
            //     image: { type: String, required: true },
            //     price: { type: Number, required: true },
            //     product: {
            //         type: mongoose.Schema.Types.ObjectId,
            //         ref: 'Product',
            //         required: true,
            //     },
            // },
            const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id)
            if((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
                dispatch(addOrderProduct({
                    orderItem: {
                        name: productDetails?.name,
                        amount: numProduct,
                        image: productDetails?.image,
                        price: productDetails?.price,
                        product: productDetails?._id,
                        discount: productDetails?.discount,
                        countInstock: productDetails?.countInStock
                    }
                }))
            } else {
                setErrorLimitOrder(true)
            }
        }
    }
    const { data: products } = useQuery(["products", limit], fetchProductAll, {
        retry: 3,
        retryDelay: 1000,
        keepPreviousData: true,
      });

      const [mainImage, setMainImage] = useState(null);
      const [thumbnailImages, setThumbnailImages] = useState([]);
      const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState(0);
    
      const handleThumbnailClick = (clickedImage, index) => {
        setMainImage(clickedImage);
        setSelectedThumbnailIndex(index);
      };
      
      
      useEffect(() => {
        if (productDetails?.imageDetail?.length > 0) {
          setMainImage(productDetails.image);
          setThumbnailImages([productDetails.image, ...productDetails.imageDetail]);
          setSelectedThumbnailIndex(0); // Reset the index to 0 when productDetails change
        }
      }, [productDetails]); 
    return (
        <Loading isLoading={isLoading}>
           <Row
        style={{
          padding: "16px",
          background: "#fff",
          borderRadius: "4px",
          height: "100%",
        }}
      >
        <Col span={10} style={{ borderRight: "1px solid #e5e5e5", paddingRight: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Image
  src={hoveredThumbnail || mainImage}
  alt="image product"
  preview={true}
  style={{
    width: "300px",
    height: "250px",
    objectFit: "contain",
    borderRadius: "8px",
  }}
/>
          </div>
          <Row style={{ paddingTop: '10px', justifyContent: 'center' }}>
            {thumbnailImages.map((image2, index) => (
              <WrapperStyleColImage key={index} span={4}>
<WrapperStyleImageSmall
  src={image2}
  alt={`image small ${index}`}
  preview={false}
  onMouseEnter={() => setHoveredThumbnail(image2)}
  onMouseLeave={() => setHoveredThumbnail(null)}
  onClick={() => handleThumbnailClick(image2, index)}
  style={{
    height: '120px',
    width: '100px',
    objectFit: 'contain',
    border: index === selectedThumbnailIndex ? '2px solid #f00' : 'none',
    opacity: hoveredThumbnail === image2 || index === selectedThumbnailIndex ? 1 : 0.5,
  }}
/>

              </WrapperStyleColImage>
            ))}
          </Row>
  
        </Col>  
                <Col span={14} style={{ paddingLeft: '10px' }}>
                    <WrapperStyleNameProduct>{productDetails?.name}</WrapperStyleNameProduct>
                    <div>
                    <span style={{ color: '#d0011b', fontSize: '2.5rem', textDecoration: 'underline' }}> {productDetails?.rating} </span>                        <Rate style={{ color: '#d0011b', fontSize: '1.5rem' }} allowHalf defaultValue={productDetails?.rating} value={productDetails?.rating} />
                        <WrapperStyleTextSell> | Da ban 1000+</WrapperStyleTextSell>
                    </div>
                    <WrapperPriceProduct>
                        <WrapperPriceTextProduct style={{color:'#d0011b',fontsize: '1.875rem' ,fontweight: '500'}}>{convertPrice(productDetails?.price)}</WrapperPriceTextProduct>
                    </WrapperPriceProduct>
                    <WrapperAddressProduct>
                        <span style={{color:'#757575'}}>Giao đến : </span>
                        <span className='address'>{user?.address}</span>
                        {/* <span className='change-address'>  Đổi địa chỉ</span> */}
                    </WrapperAddressProduct>
                    
                    {/* { <LikeButtonComponent
                     dataHref={ process.env.REACT_APP_IS_LOCAL 
                                ? "https://developers.facebook.com/docs/plugins/" 
                                : window.location.href
                            } 
                    /> } */}
<div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5', display: 'flex', alignItems: 'center' }}>
    <div style={{ marginRight: '10px', color:'#757575' }}>Số lượng</div>
    <WrapperQualityProduct>
        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease',numProduct === 1)}>
            <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
        </button>
        <WrapperInputNumber onChange={onChange} defaultValue={1} max={productDetails?.countInStock} min={1} value={numProduct} size="small" />
        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase',  numProduct === productDetails?.countInStock)}>
            <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
        </button>
    </WrapperQualityProduct>
</div>
                    <div style={{ display: 'flex', aliggItems: 'center', gap: '12px' }}>
                        <div>
                            <ButtonComponent
                                size={40}
                                styleButton={{
                                    background: '#d41830',
                                    height: '48px',
                                    width: '220px',
                                    border: 'none',
                                    borderRadius: '4px'
                                }}
                                onClick={handleAddOrderProduct}
                                textbutton={'Thêm giỏ hàng'}
                                styleTextButton={{ color: 'rgb(252, 252, 252)', fontSize: '15px', fontWeight: '700' }}
                            ></ButtonComponent>
                            {errorLimitOrder && <div style={{color: 'red'}}>San pham het hang</div>}
                        </div>
                    </div>
                    <div>
                <h1 style={{ marginTop: '15px', }}>Mô tả sản phẩm</h1>
                <span style={{ fontSize: '2rem', fontWeight: '400', color:'#757575' }}>{productDetails?.description}</span>
                </div>
                </Col>
            
            </Row >
            
            
            <div className="">
        <h3>
          <b>Sản Phẩm Cùng Loại</b>
        </h3>
      </div>
      <div className="row">
        <WrapperProducts>
          {products?.data?.map(
            ({
              _id,
              countInStock,
              description,
              image,
              name,
              price,
              rating,
              type,
              selled,
              discount,
            }) => (
              <CardComponent
                key={_id}
                countInStock={countInStock}
                description={description}
                image={image}
                name={name}
                price={price}
                rating={rating}
                type={type}
                selled={selled}
                discount={discount}
                id={_id}
              />
            )
          )}
        </WrapperProducts>
      </div>
        </Loading>
        
    )
}

export default ProductDetailComponent