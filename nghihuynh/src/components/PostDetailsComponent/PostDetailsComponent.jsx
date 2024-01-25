import { Col, Image } from "antd";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../LoadingComponent/Loading";
import * as PostService from "../../services/PostService";
import Footer from "../../pages/Footer/Footer";
import {
  WrapperStyleNameProduct,
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperType,
  WrapperStyleNameTitle,
  ImageRow,
  ImageContainer,
  TextContainer,
  SaleContainer,
  Title,
} from "./style";
import { useNavigate } from "react-router-dom";

const PostDetailsComponent = ({ idPost }) => {
  const navigate = useNavigate();
  const handleDetailsPost = (id) => {
    navigate(`/post-details/${id}`);
  };

  const [posts, setPosts] = useState([]);
  const [hover, setHover] = useState(false);

  const fetchGetDetailsPost = async (context) => {
    try {
      const id = context?.queryKey && context?.queryKey[1];
      if (id) {
        const res = await PostService.getDetailsPost(id);
        return res.data;
      }
    } catch (error) {
      console.error("Error fetching post details:", error);
      throw error;
    }
  };

  const {
    isLoading,
    data: postDetails,
    isError,
    error,
  } = useQuery(["post-details", idPost], fetchGetDetailsPost, {
    enabled: !!idPost,
  });

  const fetchPostAll = async () => {
    const res = await PostService.getAllPost();
    if (res?.status === "OK") {
      setPosts(res?.data);
    }
  };

  useEffect(() => {
    fetchPostAll();
  }, []);

  return (
    <Loading isLoading={isLoading}>
      {isError && <div>Error loading post details: {error.message}</div>}

      <Col>
        <WrapperType style={{ fontFamily: 'YourDesiredFont, sans-serif', fontSize: '18px', fontWeight: 'bold' }}>
          DEAL SALE SIÊU RẺ CHO GIỚI TRẺ
        </WrapperType>

        <WrapperStyleNameProduct>
          <h2 style={{ fontFamily: 'YourDesiredFont, sans-serif', fontSize: '24px', fontWeight: 'bold', color: hover ? '#ff3366' : '#000' }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            {postDetails?.name}
          </h2>
        </WrapperStyleNameProduct>

        <WrapperStyleNameTitle>
          {/* <h4 style={{ fontFamily: 'YourDesiredFont, sans-serif', fontSize: '16px' }}>{postDetails?.title}</h4> */}
        </WrapperStyleNameTitle>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <Image
            src={postDetails?.image}
            alt="image produdct"
            preview={true}
            style={{
              width: '100%',
              maxWidth: '700px',
              height: 'auto',
              objectFit: 'contain',
              borderRadius: '8px',
              border: '1px solid #e5e5e5',
            }}
          />
        </div>
      </Col>

      <WrapperPriceProduct style={{ marginTop: '16px' }}>
        <WrapperPriceTextProduct style={{ fontFamily: 'YourDesiredFont, sans-serif', fontSize: '16px' }}>
          {postDetails?.detail}
        </WrapperPriceTextProduct>
      </WrapperPriceProduct>
    </Loading>
  );
};

export default PostDetailsComponent;
