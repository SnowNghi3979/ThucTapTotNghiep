import React, { Fragment, useState  } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {routes} from './routes'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import { useEffect } from 'react'
import { isJsonString } from './utils'
import jwt_decode from "jwt-decode";
import * as UserService from './services/UserService'
import {useDispatch, useSelector} from 'react-redux'
import { updateUser } from './redux/slides/userSlide'
import axios from 'axios'
import Loading from './components/LoadingComponent/Loading'
import { styled } from '@tanstack/react-query-devtools'

// import axios from 'axios'
// import { useQuery } from '@tanstack/react-query'

function App() {
const dispatch = useDispatch();
const [isLoading, setIsLoading] = useState(false)
const user = useSelector((state)=> state.user)


useEffect(()=>{
  setIsLoading(true)
  const {decoded, storageData} = handleDecoded()
      if(decoded?.id){
        handleGetDetailsUser(decoded?.id, storageData)
    }
    setIsLoading(false)
},[])

const handleDecoded =()=>{
  let storageData= localStorage.getItem('access_token')
  let decoded ={}
  if(storageData && isJsonString(storageData)){
    storageData = JSON.parse(storageData)
       decoded = jwt_decode(storageData);  
  }
  return {decoded, storageData}
}

UserService.axiosJWT.interceptors.request.use(async (config) =>{
  const currentTieme = new Date()
  const{decoded}= handleDecoded()
  if(decoded?.exp < currentTieme.getTime() / 1000){
    const data = await UserService . refreshToken()
    config.headers['token'] = `Bearer ${data?.access_token}`
  }
  return config;
}, (err) => {
  return Promise.reject(err);
});

const handleGetDetailsUser = async (id, token) =>{
  const res = await UserService.getDetailsUser(id, token)
  dispatch(updateUser({...res?.data, access_token: token}))
}
  // useEffect(() =>{
  //   fetchAPI()
  // },[])
  // const fetchAPI = async ()=>{
  //   const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`)//call apit + tich hop react query
  //   return res.data
  //   }

  //   const query = useQuery({ queryKey: ['todos'], queryFn: fetchAPI})
  //   console.log('query', query)
  return (
    <div>
      <Loading isLoading={isLoading}>
      <Router>
        <Routes>
          {routes.map((route)=>{
            const Page= route.page
            // const isCheckAuth = !route.isPrivate || user.isAdmin
            const Layout = route.isShowHeader? DefaultComponent: Fragment;
            return(
              <Route key={route.path} path={ route.path} element={ //isCheckAuth &&
                <Layout>
                  <Page/>
                </Layout>
              } />
            )
          })}
        </Routes>
      </Router>
      </Loading>
    </div>
  )
}
export default App
