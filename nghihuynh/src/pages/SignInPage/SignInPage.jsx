import React, { useEffect } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import imageLogo from '../../assets/images/logo_login.jpg'
import { Image } from 'antd'
import {useLocation, useNavigate} from 'react-router-dom'
import {useState} from 'react'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponent/Loading'
import jwt_decode from "jwt-decode";
import {useDispatch} from 'react-redux'
import { updateUser } from '../../redux/slides/userSlide'

const SignInPage = () => {

  const [isShowPassword, setIsShowPassword] = useState(false)
  const location = useLocation()
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
const dispatch = useDispatch();

  const navigate = useNavigate()

  const mutation = useMutationHooks(
     data => UserService.loginUser(data)
  )
  const {data, isLoading, isSuccess} = mutation

  useEffect(() => {
    if (isSuccess) {
      if(location?.state) {
        navigate(location?.state)
      }else {
        navigate('/')
      }
      localStorage.setItem('access_token',JSON.stringify (data?.access_token))
      if(data?.access_token ){
        const decoded = jwt_decode(data?.access_token );
        console.log('decoded', decoded)
        if(decoded?.id){
          handleGetDetailsUser(decoded?.id, data?.access_token)

        }
      }
    }
  }, [isSuccess])

  const handleGetDetailsUser = async (id, token) =>{
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({...res?.data, access_token: token}))
  }
  console.log('mutation', mutation)

  const handleOnchangeEmail=(value)=>{
    setEmail(value)
}

const handleOnchangePassword=(value)=>{
setPassword(value)
}
const handleSignIn=()=>{
  mutation.mutate({
    email,
    password
  })
}

  const handleNavigateSignUp=()=>{
    navigate('/sign-up')
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh' }}>
      <div style={{ width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
        <WrapperContainerLeft>
          <h1 style={{color:'#BB0000'}}>Xin chào</h1>
          <p>Đăng nhập || tạo tài khoản tại đây</p>
          <InputForm style={{marginBottom:"10px"}} placeholder="afh@gmail.com" value={email} onChange={handleOnchangeEmail}/>
          <div style={{position: 'relative'}}>
            <span 
            onClick ={() =>setIsShowPassword(!isShowPassword)}
            style={{
              zIndex:10,
              position :'absolute',
              top: '4px',
              right :'8px'
            }}
            >{
              isShowPassword ?(
                <EyeFilled/>
              ) :(
                <EyeInvisibleFilled/>
              )
            }
            </span>
            <InputForm placeholder="password" type ={isShowPassword ? "text":"password"} value={password} onChange={handleOnchangePassword}/>

          </div>
          {data?.status ==='ERR' && <span style={{color:'red'}}>{data?.message}</span>}
          <Loading isLoading={isLoading}>
          <ButtonComponent
            disabled={!email || !password || !email.length || !password.length}
          onClick={handleSignIn}
            size={40}
            styleButton={{
              background: 'rgb(255, 57, 103)',
              height: '48px',
              width: '100%',
              border: 'none',
              borderRadius: '4px',
              marginTop: '26px 0 10px'
            }}
            textbutton={'Đăng nhập'}
            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
          ></ButtonComponent>
          </Loading>
          <p><WrapperTextLight>Quên mật khẩu?</WrapperTextLight></p>
          <p>Chưa có tài khoản? <WrapperTextLight onClick={handleNavigateSignUp}> Tạo tài khoản</WrapperTextLight></p>

        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image src={imageLogo} preview={false} alt="iamge-logo" height="300px" width="300px" />
          <h3 style={{ color: '#FF3366', textAlign: 'center', padding: '10px' }}>
    Mua sắm tại SnowNghi
</h3>
        </WrapperContainerRight>
      </div>
    </div>
  )
}

export default SignInPage