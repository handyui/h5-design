import HttpRequest from './axios'
const axios = new HttpRequest()
export default axios

export const request = {
    /*
  * post请求
  * @param {0,1,2} val[0]:url,val[1]:data
  */
    /* post (...val) {
    return axios.request({
      url: val[0],
      method: 'post',
      data: val[1],
      header: val[2]
    })
  },
  get (...val) {
    return axios.request({
      url: val[0],
      method: 'get',
      params: val[1],
      header: val[2]
    })
  }, */
    post(...val:any[]) {
        //  定义promise对象
        let promise
        return new Promise((resolve, reject) => {
            // 发送post请求
            promise = axios.request({
                url: val[0],
                method: 'post',
                data: val[1],
                headers: val[2],
                // withCredentials: val[0] == '/saasFile/fileUpload' || val[0] == '/saasFile/delete/' ? false : true
            })
            // 返回请求的结果
            promise.then((response) => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    get(...val:any[]) {
        return new Promise((resolve, reject) => {
            //  定义promise对象
            let promise
            // 发送get请求
            promise = axios.request({
                url: val[0],
                method: 'get',
                params: val[1],
                headers: val[2],
                responseType: val[3],
                // withCredentials: val[0] == '/saasFile/fileUpload' || val[0] == '/saasFile/delete/' ? false : true
            })
            // 返回请求的结果
            promise.then((response) => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    }
}
