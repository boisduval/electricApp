/**
 * ajax请求配置
 */
import axios from 'axios';
import * as RootNavigation from '../../RootNavigation';
import Toast from 'react-native-root-toast';

// axios默认配置
axios.defaults.timeout = 10000; // 超时时间
// axios.defaults.baseURL = 'http://cnbn801.boneng.hresysdms.cloud:18080/conn' // 默认地址
// axios.defaults.baseURL = 'http://a016.hresys.hresysdms.cloud:8082/conn' // 默认地址
// axios.defaults.headers.common['Language'] = val
// axios.defaults.baseURL = 'http://60.186.197.171:8081'

// 路由响应拦截
// http response 拦截器
axios.interceptors.response.use(
  (response) => {
    if (response.data.code === 0) {
      // if (response.config.method === 'post') {
      //   Toast.show(response.data.msg, {
      //     duration: Toast.durations.SHORT,
      //     position: Toast.positions.CENTER,
      //     shadow: true,
      //     animation: true,
      //     hideOnPress: true,
      //     delay: 0,
      //   });
      // }
      console.log(response);
      // Message.success(response.data.msg)
      // 返回 错误代码-1 清除ticket信息并跳转到登录页面
      //      cookie.del("ticket")
      //      window.location.href='http://login.com'
      return response;
    } else {
      if (response.data.code === 2) {
        // 跳转登录页
        // RootNavigation.navigate('login');
        // localStorage.removeItem('AutoSystemID')
      } else if (response.data.code === 1) {
        Toast.show(response.data.msg, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
        return response;
      }
      // else if (response.data.code === 4) {
      //   Message.error(response.data.msg)
      //   setTimeout(() => {
      //     localStorage.removeItem('AutoSystemID')
      //     window.location.href = '/console/login'
      //   }, 1000)
      // }
      else {
        // Message.error(response.data.msg)
        return response;
      }
    }
  },
  (error) => {
    // if (error && error.response) {
    //   switch (error.response.status) {
    //     case 404:
    //       router.push({ name: 'errorPage' })
    //       // error.message = '请求出错(404)'
    //       break
    //     case 500:
    //       router.push({ name: 'error-500' })
    //       //  error.message = '服务器错误(500)';
    //       break
    //     default: error.message = `连接出错(${error.response.status})!`;
    //   }
    // }
    return Promise.reject(error.response); // 返回接口返回的错误信息
  },
);

export default axios;
