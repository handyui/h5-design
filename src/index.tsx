import React from 'react';
import ReactDOM from 'react-dom';
import App from './router/App';
import reportWebVitals from './reportWebVitals';
import "antd/dist/antd.css"
import { Provider } from 'react-redux'
import store from './store/store'
import '@/assets/style/index.scss';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



// request.js import axios from 'axios' class Request { constructor(baseURL, options = 'application/json') { this.request = axios.create({ // 使用自定义配置创建一个 axios 实例 baseURL, headers: { 'content-type': options },timeout: 120000, // 超时设置（默认是 0 表示无超时时间） withCredentials: true, // 跨域请求时是否需要携带凭证 // 其他配置 })// 添加请求拦截器 this.request.interceptors.request.use(config => { // 在发送请求之前做些什么 }), (error) => { // 响应错误时做些事 // 请求被取消时 if (axios.isCancel(error)) { console.log('request is canceled'); } else if (error.response && (error.response.code === 401 || error.response.code === 403)) { // 没有权限时 console.log('login failed'); }return Promise.reject(error) })// 添加响应拦截器 this.request.interceptors.response.use(response => { // 对响应数据做点什么 }, (error) => { // 对响应错误做点什么 return Promise.reject(error) }) }get(url, params) { return this.request.get(url, { params }) }post(url, data, config) { return this.request.post(url, data, config) }// 其他方法 }class Net { constructor(baseURL, headers = 'application/json;charset=UTF-8') { return new Request(baseURL, headers) } } }export default Net