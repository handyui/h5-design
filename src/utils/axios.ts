import axios , { AxiosRequestConfig, AxiosResponse, AxiosError }from 'axios'

class HttpRequest {
    loading: any 
    data: any
    queue: any
    constructor () {
        this.loading = null
        this.data = null
        // 存储请求队列
        this.queue = {}
    }
    // 销毁请求实例
    distroy (url:any) {
        delete this.queue[url]
        const queue = Object.keys(this.queue)
        return queue.length
        // if (!Object.keys(this.queue).length) {
        //     // this.loading.close()
        //     console.log('加载关闭...')
        // }
    }
    // 请求拦截
    interceptors (instance:any, url:any) {
        // 添加请求拦截器
        instance.interceptors.request.use((config:AxiosRequestConfig) => {
         
            this.queue[url] = true
            return config
        }, (error:AxiosError) => {
            return Promise.reject(error)
        })
        // 添加响应拦截器
        instance.interceptors.response.use((res:AxiosResponse) => {
            // 关闭loading
            // this.loading.close()
     
            this.distroy(url)
            return res.data
            // if (data.code == '10000') { // token过期
            //     if (!window.isRefreshing) {
            //     window.isRefreshing = true
            //     // res.headers.Authorization = res.data.data.token
            //     this.atoken = res.data.data.token
            //     setToken(res.data.data.token)
            //     return this.request(this.data).then(res=>{
            //         // console.log('失效重新请求了===========>')
            //         // console.log(res)
            //         window.isRefreshing = false
            //         this.atoken = null
            //         this.data = null
            //         this.distroy(url)
            //         return res
            //     })
            //     }
            // }else if (data.code == '10001') { // token失效
            //     Message({
            //         message: '登录超时，请重新登录',
            //         type: 'error',
            //         duration: 5 * 1000
            //     })
            //     store.dispatch('LoginOut').then(()=>{
            //         location.reload() // 为了重新实例化vue-router对象 避免bug
            //     })
            // }else{
            //     this.distroy(url)
            //     return data
            // }
        }, (error:AxiosError) => {
            // this.distroy(url)
            console.log(error)
            // Message({
            //     message: '链接超时，请稍候再试',
            //     type: 'error',
            //     duration: 5 * 1000
            // })
            return Promise.reject(error.response)
        })
    }

    request (options:AxiosRequestConfig) {
        this.data = options
        const instance = axios.create({
            baseURL: process.env.NODE_ENV === 'development' ? '/api/' : 'http://192.168.7.221:80/api', 
            timeout: 60000, // request timeout
            // withCredentials: true,
            // headers: {
            //     'Content-Type': 'application/json; charset=utf-8',
            //     'X-URL-PATH': location.pathname
            // }
        })
        this.interceptors(instance, options.url)
        options = Object.assign({}, options)
        // this.queue[options.url] = instance
        return instance(options)
    }
}

export default HttpRequest
