import React, { useEffect } from 'react';
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style';
import InputForm from '../../components/InputForm/InputForm';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import imageLogo from '../../assets/images/logo_login.jpg';
import { Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook';
import Loading from '../../components/LoadingComponent/Loading';
import * as message from '../../components/Message/Message'
const SignUpPage = () => {
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState();
  
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const handleOnchangeEmail=(value)=>{
      setEmail(value)
  }

  const mutation = useMutationHooks(
    data => UserService.signupUser(data)
 )

 const {data, isLoading, isSuccess, isError} = mutation
 useEffect(() =>{
  if(isSuccess){
    message.success()
    handleNavigateSignIn()
  } else if(isError){
    message.error()
  }
 },[isSuccess, isError])

const handleOnchangePassword=(value)=>{
  setPassword(value)
}

const handleOnchangeConfirmPassword=(value)=>{
  setConfirmPassword(value)
}

const handleSignUp=() =>{
  mutation.mutate({email, password, confirmPassword})
}

  const handleNavigateSignIn = () => {
    navigate('/sign-in');
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh' }}>
      <div style={{ width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
        <WrapperContainerLeft>
          <h1 style={{color:'#BB0000'}}>Xin chào</h1>
          <p>Đăng nhập || tạo tài khoản tại đây</p>
          <InputForm style={{ marginBottom: '10px' }} placeholder="afh@gmail.com"  value={email} onChange={handleOnchangeEmail}/>

          <div style={{ position: 'relative' }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px',
                cursor: 'pointer', 
              }}
            >
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm placeholder="password" style={{ marginBottom: '10px' }} type={isShowPassword ? "text" : "password"} 
            value={password} onChange={handleOnchangePassword}/>
          </div>

          <div style={{ position: 'relative' }}>
            <span
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px',
                cursor: 'pointer',  
              }}
            >
              {isShowConfirmPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm placeholder="confirm password" style={{ marginBottom: '10px' }} type={isShowConfirmPassword ? "text" : "password"} 
            value={confirmPassword} onChange={handleOnchangeConfirmPassword}/>
          </div>
          {data?.status ==='ERR' && <span style={{color:'red'}}>{data?.message}</span>}
          <Loading isLoading={isLoading}>
          <ButtonComponent
           disabled={!email || !password ||confirmPassword || !email.length || !password.length || !confirmPassword}
          onClick={handleSignUp}
            size={40}
            styleButton={{
              background: 'rgb(255, 57, 103)',
              height: '48px',
              width: '100%',
              border: 'none',
              borderRadius: '4px',
              marginTop: '26px 0 10px',
            }}
            textbutton={'Đăng ký'}
            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
          ></ButtonComponent>
          </Loading>
          <p>
            <WrapperTextLight>Quên mật khẩu?</WrapperTextLight>
          </p>
          <p>
            Bạn đã có tài khoản ? <WrapperTextLight onClick={handleNavigateSignIn}> Đăng nhập</WrapperTextLight>
          </p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
        <Image src={imageLogo} preview={false} alt="iamge-logo" height="300px" width="300px" />
          <h3 style={{ color: '#FF3366', textAlign: 'center', padding: '10px' }}>
    Mua sắm tại SnowNghi
</h3>
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignUpPage;
