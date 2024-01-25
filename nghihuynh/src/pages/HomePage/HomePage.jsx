import React from 'react'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from './style'
import slider1 from '../../assets/images/slider1.jpg'
import slider2 from '../../assets/images/slider2.jpg'
import slider3 from '../../assets/images/slider3.jpg'
import CardComponent from '../../components/CardComponent/CardComponent'
import { useQuery } from '@tanstack/react-query'
import * as ProductService from '../../services/ProductService'
import * as MenuService from '../../services/MenuService'
import * as SliderService from '../../services/SliderService'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import Loading from '../../components/LoadingComponent/Loading'
import { useDebounce } from '../../hooks/useDebounce'
import { useEffect } from 'react'
import Footer from '../Footer/Footer'
import TypeMenu from '../../components/TypeMenu/TypeMenu'

const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search)
  const searchDebounce = useDebounce(searchProduct, 500)
  const [loading, setLoading] = useState(false)
  const [limit, setLimit] = useState(6)
  const [typeProducts, setTypeProducts] = useState([])
  const [typeMenus, setTypeMenus] = useState([])

  const [ImageSlider, setImageSlider] = useState([])
  const [newProducts, setNewProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);



  
  
  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1]
    const search = context?.queryKey && context?.queryKey[2]
    const res = await ProductService.getAllProduct(search, limit)

    return res

  }

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct()
    if(res?.status === 'OK') {
      setTypeProducts(res?.data)
    }
  }
  const fetchAllTypeMenu = async () => {
    const res = await MenuService.getAllTypeMenu()
    if(res?.status === 'OK') {
      setTypeMenus(res?.data)
    }
  }
  const fetchAllSliderImage = async () => {
    try {
      const imageUrls = await SliderService.getAllSliderImage();
      
      // Check if the array of image URLs is not empty before updating the state
      if (imageUrls.length > 0) {
        setImageSlider(imageUrls);
      }
    } catch (error) {
      // Handle the error (log it, show a notification, etc.)
      console.error("Error fetching slider images:", error);
    }
  }
  


  
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const { isLoading, data: products, isPreviousData } = useQuery(['products', limit, searchDebounce], fetchProductAll, { retry: 3, retryDelay: 1000, keepPreviousData: true })

  useEffect(() => {
    fetchAllTypeProduct()
    fetchAllTypeMenu()
    fetchAllSliderImage()

  }, [])

  return (
    <Loading isLoading={isLoading || loading}>
      <div style={{ width: '1270px', margin: '0 auto' }}>
        <WrapperTypeProduct>
          {typeProducts.map((item) => {
            return (
              <TypeProduct name={item} key={item}/>
            )
          })}
        </WrapperTypeProduct>
        <WrapperTypeProduct>
          {typeMenus.map((item) => {
            return (
              <TypeMenu name={item} key={item}/>
            )
          })}
        </WrapperTypeProduct>

      </div>
      <div className='body' style={{ width: '100%', backgroundColor: '#efefef', }}>
        <div id="container" style={{ height: '1000px', width: '1270px', margin: '0 auto' }}>

        
        <SliderComponent settings={sliderSettings} />



          <WrapperProducts>
          {products?.data?.map(({ _id, countInStock, description, image, name, price, rating, type, selled, discount }) => (
  
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
))}
          </WrapperProducts>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <WrapperButtonMore
             textbutton={isPreviousData ? 'Hết sản phẩm' : 'Xem thêm'}
             type="outline"
             styleButton={{
               border: `1px solid ${products?.total === products?.data?.length ? '#d0011b' : '#d0011b'}`,
               color: `${products?.total === products?.data?.length ? '#d0011b' : '#d0011b'}`,
               width: '240px', height: '38px', borderRadius: '4px',
             }}
             disabled={products?.total === products?.data?.length || products?.totalPage === 1}
             styleTextButton={{ fontWeight: 500, color: products?.total === products?.data?.length && '#d0011b' }}
             onClick={() => setLimit((prev) => prev + 6)}
            />
          </div>

        </div>
      </div>
      <Footer/>
    </Loading>
  )
}

export default HomePage 