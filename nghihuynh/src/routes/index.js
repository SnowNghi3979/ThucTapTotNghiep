import AdminPage from "../pages/AdminPage/AdminPage";
import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";

import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import OrderSucess from "../pages/OrderSuccess/OrderSuccess";
import MyOrderPage from "../pages/MyOrder/MyOrder";

import PostPage from "../pages/PostPage/PostPage";


export const routes =[
    {
        path: '/',
        page:HomePage,
        isShowHeader: true
    },
    {
        path: '/order',
        page:OrderPage,
        isShowHeader: true
    },
    {
        path: '/product',
        page:ProductPage,
        isShowHeader: true
    },
    {
        path: '/product/:type',
        page:TypeProductPage,
        isShowHeader: true
    },
    {
        path: '/product-details/:id',
        page:ProductDetailPage,
        isShowHeader: true
    },
    {
        path: '/orderSuccess',
        page: OrderSucess,
        isShowHeader: true
    },
  
    {
        path: '/my-order',
        page: MyOrderPage,
        isShowHeader: true
    },
    {
        path: '/sign-in',
        page:SignInPage,
        isShowHeader: false
    },
    {
        path: '/sign-up',
        page:SignUpPage,
        isShowHeader: false
    },
    {
        path: '/profile-user',
        page:ProfilePage,
        isShowHeader: false
    },
    {
        path: '/payment',
        page: PaymentPage,
        isShowHeader: true
    },
    {
        path: '/post-details/:id',
        page: PostPage,
        isShowHeader: true
    },
    {
        path: '/system/admin',
        page:AdminPage,
        isShowHeader: false,
        isPrivate :true
    },

    {
        path: '*',
        page:NotFoundPage
    }
]