import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PostDetailComponent from '../../components/PostDetailsComponent/PostDetailsComponent'

const ProductDetailsPage = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  return (
    <div style={{width: '100%',background: '#efefef', height: '100%'}}>
      <div style={{ width: '1270px', height: '100%', margin: '0 auto'}} >
        {/* <h5><span style={{cursor: 'pointer', fontWeight: 'bold',fontSize:16}} onClick={() => {navigate('/')}}>Trang chủ</span> - Chi tiết Bài Viết</h5> */}
        <PostDetailComponent idPost={id} />
      </div>
    </div>
  )
}

export default ProductDetailsPage