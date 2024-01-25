import { Badge, Button, Col, Popover, Row } from 'antd'
import React from 'react'
import { WrapperContentPopup, WrapperHeader, WrapperHeaderAccout, WrapperTextHeader, WrapperTextHeaderSmall } from './style'
import {
  UserSwitchOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import ButttonInputSearch from '../ButttonInputSearch/ButttonInputSearch';
import { Link, useNavigate } from 'react-router-dom';
import * as PostService from "../../services/PostService";

import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService'
import { resetUser } from '../../redux/slides/userSlide'
import { useState } from 'react';
import Loading from '../LoadingComponent/Loading';
import { useEffect } from 'react';
import { searchProduct } from '../../redux/slides/productSlide';
import logo from "../../assets/images/shopsnow.jpg";
import { ImageContainer, ImageRow, Title } from '../../pages/Footer/style';


const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate()
  const handleDetailsPost = (id) => {
    navigate(`/post-details/${id}`);
  };
  const [posts, setPosts] = useState([]);

  const fetchPostAll = async () => {
      const res = await PostService.getAllPost();
      if (res?.status === "OK") {
        setPosts(res?.data);
      }
    };
  useEffect(() => {
     
      fetchPostAll();
    }, []);

  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [userName, setUserName] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [search,setSearch] = useState('')
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const order = useSelector((state) => state.order)
  const [loading, setLoading] = useState(false)
  const handleNavigateLogin = () => {
    navigate('/sign-in')
  }

  const handleLogout = async () => {
    setLoading(true)
    await UserService.logoutUser()
    dispatch(resetUser())
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    setUserName(user?.name)
    setUserAvatar(user?.avatar)
    setLoading(false)
  }, [user?.name, user?.avatar])

  const content = (
    <div>
      <WrapperContentPopup onClick={() => handleClickNavigate('profile')}>Thông tin</WrapperContentPopup>
      {user?.isAdmin && (

        <WrapperContentPopup onClick={() => handleClickNavigate('admin')}>Quản lí</WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={() => handleClickNavigate(`my-order`)}>Đơn hàng của tôi</WrapperContentPopup>
      <WrapperContentPopup onClick={() => handleClickNavigate()}>Đăng xuất</WrapperContentPopup>
    </div>
  );

  const handleClickNavigate = (type) => {
    if (type === 'profile') {
      navigate('/profile-user');
    } else if (type === 'admin') {
      navigate('/system/admin');
    } else if (type === 'my-order') {
      navigate('/my-order', {
        state: {
          id: user?.id,
          token: user?.access_token,
        },
      });
    } else {
      handleLogout();
      navigate('/'); // Navigate to the home page after logging out
    }
    setIsOpenPopup(false);
  };
  

  const onSearch = (e) => {
    setSearch(e.target.value)
    dispatch(searchProduct(e.target.value))
  }

  return (
    <div style={{  heiht: '100%', width: '100%', display: 'flex',background: '#FF9999', justifyContent: 'center' }}>
      <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset' }}>
        <Col span={5}>
        <Link to ="/">
        <p style={{color:"#FF3366"}}>Trang chủ SnowNghi</p>
        </Link>
          
    <div style={{ display: 'flex', alignItems: 'center' }} to="/">
  <img
    src={logo}  // Thay thế đường dẫn thực tế đến hình ảnh biểu tượng của bạn
    alt="Logo"
    style={{ height: '70px', width: 'auto' }}  // Điều chỉnh chiều cao theo nhu cầu
  />
</div>


        </Col>
        {!isHiddenSearch && (
          <Col span={13}>
            <ButttonInputSearch
              size="large"
              bordered={false}
              textbutton=""
              placeholder="SnowNghi bao ship 0Đ - Đăng ký ngay!
              "
              onChange={onSearch}
              backgroundColorButton="#d0011b"
              


              
            />
          </Col>
        )}
        <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
          <Loading isLoading={loading}>
            <WrapperHeaderAccout>
              {userAvatar ? (
                <img src={userAvatar} alt="avatar" style={{
                  height: '30px',
                  width: '30px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }} />
              ) : (
                <UserSwitchOutlined style={{ fontSize: '30px' }} />
              )}
              {user?.access_token ? (
                <>
                  <Popover content={content} trigger="click" open={isOpenPopup}>
                    <div style={{ cursor: 'pointer',maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }} onClick={() => setIsOpenPopup((prev) => !prev)}>{userName?.length ? userName : user?.email}</div>
                  </Popover>
                </>
              ) : (
                <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                  <WrapperTextHeaderSmall> Đăng nhập</WrapperTextHeaderSmall>
                  <div>
                    
                 
                  </div>
                </div>
              )}
            </WrapperHeaderAccout>
          </Loading>
          <Row style={{ alignItems: 'center' }}>
  {/* Giỏ hàng */}
  <Col span={6}>
    <div onClick={() => navigate('/order')} style={{ cursor: 'pointer' }}>
      <Badge count={order?.orderItems?.length} size="small">
        <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
      </Badge>
      <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
    </div>
  </Col>
  <Col span={7}></Col>
  {/* Bài viết */}
  <Col span={6}>
    {posts &&
      posts.length > 0 &&
      posts.slice(0, 1).map((post, index) => (
        <ImageRow key={index}>
          <ImageContainer onClick={() => handleDetailsPost(post._id)}>
            {/* Hiển thị hình ảnh */}
            <img src={post.image} alt={`post image ${index}`} style={{ width: '100px', height: 'auto', borderRadius: '8px' }} />

            {/* Hiển thị tên bài viết */}
            <Title style={{ color: '#000', fontFamily: 'YourDesiredFont, sans-serif', fontStyle: 'italic', fontSize: '10px' }}>
  {post.name}
</Title>
          </ImageContainer>
        </ImageRow>
      ))}
  </Col>
</Row>


        </Col>
      </WrapperHeader>
    </div>
  )
}

export default HeaderComponent