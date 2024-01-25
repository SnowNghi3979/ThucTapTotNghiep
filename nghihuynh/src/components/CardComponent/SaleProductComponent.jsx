// import React, { useState } from 'react';
// import { StarFilled } from '@ant-design/icons';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { convertPrice } from '../../utils';
// import { WrapperCardStyle, StyleNameProduct, WrapperReportText, WrapperPriceText, WrapperDiscountText, WrapperStyleTextSell } from './style';
// import { useQuery } from '@tanstack/react-query';
// import { useDispatch, useSelector } from 'react-redux';
// import * as ProductService from '../../services/ProductService';
// import { addOrderProduct } from '../../redux/slides/orderSlide';
// import ButtonComponent from '../ButtonComponent/ButtonComponent';


// const SaleProductComponent = (props) => {
//   const [numProduct, setNumProduct] = useState(1);
//   const user = useSelector((state) => state.user);
//   const location = useLocation();
//   const dispatch = useDispatch();

//   const { id, image, name, price, rating, selled, discount } = props;
//   const navigate = useNavigate();

//   const handleDetailsProduct = () => {
//     navigate(`/product-details/${id}`);
//   };

//   const fetchGetDetailsProduct = async () => {
//     const res = await ProductService.getDetailsProduct(id);
//     return res.data;
//   };

//   const { isLoading, data: productDetails } = useQuery(['product-details', id], fetchGetDetailsProduct, { enabled: !!id });

//   const handleAddOrderProduct = () => {
//     if (!user?.id) {
//       navigate('/sign-in', { state: location?.pathname });
//     } else {
//       const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id);
//       if ((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
//         dispatch(addOrderProduct({
//           orderItem: {
//             name: productDetails?.name,
//             amount: numProduct,
//             image: productDetails?.image,
//             price: productDetails?.price,
//             product: productDetails?._id,
//             discount: productDetails?.discount,
//             countInstock: productDetails?.countInStock
//           }
//         }));
//       } else {
//         setErrorLimitOrder(true);
//       }
//     }
//   };

//   return (
//     <WrapperCardStyle
//       hoverable
//       headStyle={{ width: '100%', height: '200px', overflow: 'hidden' }}
//       style={{ width: 200, borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
//       bodyStyle={{ padding: '10px' }}
//       cover={<img alt="example" src={image} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />}
//       onClick={handleDetailsProduct}
//     >
//       <StyleNameProduct>{name}</StyleNameProduct>
//       <WrapperReportText>
//         <span style={{ marginRight: '4px', display: 'flex', alignItems: 'center' }}>
//           <span style={{ color: '#d0011b' }}> {rating}  </span> <StarFilled style={{ fontSize: '12px', color: '#d0011b' }} />
//         </span>
//         <WrapperStyleTextSell> | Đã bán {selled || 1000}+</WrapperStyleTextSell>
//       </WrapperReportText>
//       <WrapperPriceText>
//         <span style={{ marginRight: '8px', fontSize: '14px', fontWeight: 'bold', color: '#ee4d2d' }}>{convertPrice(price)}</span>
//         <WrapperDiscountText style={{ fontSize: '12px', fontWeight: 'bold', color: 'rgb(255, 66, 78)' }}>- {discount || 5} %</WrapperDiscountText>
//       </WrapperPriceText>

//       {/* Sale indicator */}
//       <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'red', color: 'white', padding: '5px', borderRadius: '5px' }}>
//         Sale
//       </div>

//       {/* Button to add product to order */}
//       <ButtonComponent onClick={handleAddOrderProduct}>Add to Order</ButtonComponent>
//     </WrapperCardStyle>
//   );
// };

// export default SaleProductComponent;
