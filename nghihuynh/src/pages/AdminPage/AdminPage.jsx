import { Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { getItem } from '../../utils';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
 import OrderAdmin from '../../components/OrderAdmin/OrderAdmin';
import AdminBrand from '../../components/AdminBrand/AdminBrand';
import AdminPost from '../../components/AdminPost/AdminPost'
import * as OrderService from '../../services/OrderService'
import * as ProductService from '../../services/ProductService'
import * as MenuService from '../../services/MenuService'
import * as ConfigService from '../../services/ConfigService'
import * as UserService from '../../services/UserService'
import * as BrandService from '../../services/BrandService'
import * as SliderService from '../../services/SliderService'
import * as CategoryService from '../../services/CategoryService'
import * as PostService from '../../services/PostService'
import CustomizedContent from './components/CustomizedContent';
import { useSelector } from 'react-redux';
import { useQueries } from '@tanstack/react-query';
import { useMemo } from 'react';
import Loading from '../../components/LoadingComponent/Loading';
import AdminSlider from '../../components/AdminSlider/AdminSlider';
import AdminCategory from '../../components/AdminCategory/AdminCategory';
import AdminMenu from '../../components/AdminMenu/AdminMenu';
import AdminConfig from '../../components/AdminConfig/AdminConfig.jsx';

const AdminPage = () => {
  const user = useSelector((state) => state?.user)

  const items = [
     getItem('Người dùng', 'users', ),
    getItem('Sản phẩm', 'products'),    
    getItem('Thương Hiệu', 'brands'),  
    getItem('Đơn hàng', 'orders'),
    getItem('Bài đăng', 'posts'),
     getItem('Slider', 'sliders'),
    getItem('Danh mục', 'categories'),
    getItem('Menu', 'menus'),
    getItem('Config', 'configs'),
    
  ];

  const [keySelected, setKeySelected] = useState('');
  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder(user?.access_token)
    return {data: res?.data, key: 'orders'}
  }

  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct()
    console.log('res1', res)
    return {data: res?.data, key: 'products'}
  }

  const getAllUsers = async () => {
    const res = await UserService.getAllUser(user?.access_token)
    console.log('res', res)
    return {data: res?.data, key: 'users'}
  }
  const getAllBrands = async () => {
    const res = await BrandService.getAllBrand
    console.log('res', res)
    return {data: res?.data, key: 'brands'}
  }
  const getAllSliders = async () => {
    const res = await SliderService.getAllSlider
    console.log('res', res)
    return {data: res?.data, key: 'sliders'}
  }
  const getAllCategories = async () => {
    const res = await CategoryService.getAllCategory
    console.log('res', res)
    return {data: res?.data, key: 'categories'}
  }
  const getAllPosts = async () => {
    const res = await PostService.getAllPost
    console.log('res', res)
    return {data: res?.data, key: 'posts'}
  }
  const getAllMenus = async () => {
    const res = await MenuService.getAllMenu
    console.log('res', res)
    return {data: res?.data, key: 'menus'}
  }
  const getAllConfigs = async () => {
    const res = await ConfigService.getAllConfig
    console.log('res', res)
    return {data: res?.data, key: 'configs'}
  }





  const queries = useQueries({
    queries: [
      {queryKey: ['products'], queryFn: getAllProducts, staleTime: 1000 * 60},
      {queryKey: ['users'], queryFn: getAllUsers, staleTime: 1000 * 60},
      {queryKey: ['brands'], queryFn: getAllBrands, staleTime: 1000 * 60},
      {queryKey: ['sliders'], queryFn: getAllSliders, staleTime: 1000 * 60},
      {queryKey: ['categories'], queryFn: getAllCategories, staleTime: 1000 * 60},
      {queryKey: ['posts'], queryFn: getAllPosts, staleTime: 1000 * 60},
       {queryKey: ['orders'], queryFn: getAllOrder, staleTime: 1000 * 60},
       {queryKey: ['menus'], queryFn: getAllMenus, staleTime: 1000 * 60},
       {queryKey: ['configs'], queryFn: getAllConfigs, staleTime: 1000 * 60},


    ]
  })
  const memoCount = useMemo(() => {
    const result = {}
    try {
      if(queries) {
        queries.forEach((query) => {
          result[query?.data?.key] = query?.data?.data?.length
        })
      }
    return result
    } catch (error) {
      return result
    }
  },[queries])
  // const COLORS = {
  //  users: ['#e66465', '#9198e5'],
//  products: ['#a8c0ff', '#3f2b96'],
  // //  orders: ['#11998e', '#38ef7d'],
  // };

  const renderPage = (key) => {
    switch (key) {
      case 'users':
        return (
          <AdminUser />
        )
      case 'products':
        return (
          <AdminProduct />
        )
      case 'orders':
        return (
          <OrderAdmin />
        )
        case 'brands':
          return (
            <AdminBrand />
          )
          case 'configs':
            return (
              <AdminConfig />
            )
  
          case 'sliders':
            return (
              <AdminSlider />
            )
            case 'categories':
            return (
              <AdminCategory />
            )

          case 'posts':
            return (
              <AdminPost />
            )
            case 'menus':
            return (
              <AdminMenu />
            )
      default:
        return <></>
    }
  }

  const handleOnCLick = ({ key }) => {
    setKeySelected(key)
  }
  console.log('memoCount', memoCount)
  return (
    <>
      <HeaderComponent isHiddenSearch isHiddenCart />
      <div style={{ display: 'flex',overflowX: 'hidden' }}>
        <Menu
          mode="inline"
          style={{
            width: 256,
            boxShadow: '1px 1px 2px #ccc',
            height: '100vh'
          }}
          items={items}
          onClick={handleOnCLick}
        />
        <div style={{ flex: 1, padding: '15px 0 15px 15px' }}>
          {/* <Loading isLoading={memoCount && Object.keys(memoCount) &&  Object.keys(memoCount).length !== 3}>
            {!keySelected && (
              <CustomizedContent data={memoCount} colors={COLORS} setKeySelected={setKeySelected} />
            )}
          </Loading> */}
          {renderPage(keySelected)}
        </div>
      </div>
    </>
  )
}

export default AdminPage