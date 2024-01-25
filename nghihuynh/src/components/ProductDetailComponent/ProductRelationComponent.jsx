import React from 'react';
import { Col, Image, Row } from 'antd';

const ProductRelationComponent = ({ relatedProducts }) => {
  return (
    <Col span={24}>
      <h1 style={{ marginTop: '15px' }}>Sản phẩm cùng loại</h1>
      <Row gutter={[16, 16]}>
        {Array.isArray(relatedProducts) && relatedProducts.map((relatedProduct) => (
          <Col key={relatedProduct._id} span={6}>
            {/* Render your related product card here */}
            <Image src={relatedProduct.image} alt={relatedProduct.name} preview={false} />
            <div>{relatedProduct.name}</div>
            {/* Add more details or customize as needed */}
          </Col>
        ))}
      </Row>
    </Col>
  );
};

export default ProductRelationComponent;
