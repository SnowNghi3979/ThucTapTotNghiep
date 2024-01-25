import { combineReducers, configureStore } from '@reduxjs/toolkit'
import productReducer from './slides/productSlide'
import userReducer from './slides/userSlide'
import orderReducer from './slides/orderSlide'
import brandReducer from './slides/brandSlide'
import sliderReducer from './slides/sliderSlide'
import categoryReducer from './slides/categorySlide'
import postReducer from './slides/postSlide'
import menuReducer from './slides/menuSlide'
import configReducer from './slides/configSlide'

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['product','user','brand', 'slider','category','post','menu','config']
}

const rootReducer = combineReducers({
  product: productReducer,
  post: postReducer,
  user: userReducer,
  order: orderReducer,
  brand: brandReducer,
  slider: sliderReducer,
  category: categoryReducer,
  menu: menuReducer,
  config: configReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export let persistor = persistStore(store)