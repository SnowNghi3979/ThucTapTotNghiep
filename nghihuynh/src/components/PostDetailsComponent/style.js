import { Col, Image, InputNumber } from "antd";
import styled from "styled-components";

export const WrapperStyleImageSmall = styled(Image)`
height: 34px ;
width: 34px ;
  object-fit: contain;
`

export const WrapperStyleColImage = styled(Col)`
    flex-basis: unset;
    display: flex;
    justify-content: space-between;
    margin-right: 15px;

`

export const WrapperStyleNameProduct = styled.h1`
    color: rgb(36, 36, 36);
    text-align:center;
    font-size: 26px;
    font-weight: 300;
    line-height: 32px;
    font-weight: 500;
        word-break: break-word;
`

export const WrapperStyleTextSell = styled.span`
    font-size: 15px;
    line-height: 24px;
    color: rgb(120, 120, 120)

`

export const WrapperPriceProduct = styled.div`
    background: rgb(250, 250, 250);
    border-radius: 4px;
`

export const WrapperPriceTextProduct = styled.h1`
    font-size: 12px;
    line-height: 40px;
    margin-right: 8px;
    font-weight: 500;
    padding: 10px;
    margin-top: 10px;
    color:black
`

export const WrapperAddressProduct = styled.div`
    span.address {
        text-decoration: underline;
        font-size: 15px;
        line-height: 24px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsisl
    };
    span.change-address {
        color: rgb(11, 116, 229);
        font-size: 16px;
        line-height: 24px;
        font-weight: 500;
    }
`

export const WrapperQualityProduct = styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
    width: 120px;
    border: 1px solid #ccc;
    border-radius: 4px;
`

export const WrapperInputNumber = styled(InputNumber)`
    &.ant-input-number.ant-input-number-sm {
        width: 40px;
        border-top: none;
        border-bottom: none;
        .ant-input-number-handler-wrap {
            display: none !important;
        }
    };
`
export const WrapperProducts = styled.div`
    display: flex;
    gap: 14px;
    margin-top:20px;
    flex-wrap: wrap;
`
export const WrapperType = styled.div`
color: rgb(11, 116, 229);
text-align:center;
font-size: 15px;
margin-top:20px;
margin-right:600px;
font-weight: 300;
line-height: 32px;
font-weight: 500;
    word-break: break-word;
`
export const WrapperStyleNameTitle = styled.div`
color: #black;
text-align:center;
font-size: 15px;
margin-top:20px;
margin-right:600px;

line-height: 32px;

    word-break: break-word;
`

export const TextContainer = styled.div`

text-align: center;
margin-top: 10px;
margin-bottom: 20px; /* Khoảng cách từ TextContainer đến SaleContainer */
font-weight: 600; 
font-size: 20px;
color: red;

`;
export const SaleContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Hai cột */
  gap: 20px; /* Khoảng cách giữa các hàng và cột */
  width: 100%;
  margin-left: 10px;
  
`;

export const ImageRow = styled.div`
  display: flex;
  align-items: center;
  gap: 15px; /* Khoảng cách giữa các thành phần */
`;
export const ImageContainer = styled.div`
  &:hover {
    background-color: ${props => (props.disabled ? '#ccc' : '#ddd')};
    transform: scale(1.05);
    transition: background-color 0.3s ease, transform 0.3s ease;
  }
`;

export const Title = styled.div`
  font-weight: 600;
  &:hover {
    color: red;
    span {
      color: #fff;
    }
  }
`;