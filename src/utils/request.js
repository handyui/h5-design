import axios from 'axios';
import merge from 'lodash/merge';
import { isFunction } from './util';

export default class VeryAxios {
  constructor(options = {}, axiosConfig = {}) {
    const {
      // 用户自己决定是否需要取消重复的请求
      cancelDuplicated = false,
      duplicatedKeyFn,
    } = options

    // 定义一个字典，存储 键值为 接口键：接口对应的cancel token
    this.pendingAjax = new Map()
    this.cancelDuplicated = cancelDuplicated

    // 为请求接口生成键名的函数
    this.duplicatedKeyFn = isFunction(duplicatedKeyFn) ? duplicatedKeyFn : (config) => `${config.method}${config.url}`;

    // 默认axios参数
    this.defaultAxiosConfig = {
      timeout: 20000,
      responseType: 'json',
      headers: {
        'content-type': 'application/json',
      },
    }
    this.config = merge(this.defaultAxiosConfig, axiosConfig)

    this.createAxios()
    this.interceptors()
  }

  createAxios() {
    this.axios = axios.create(this.config)
  }

  interceptors() {
    // // 拦截请求
    this.axios.interceptors.request.use((config) => {
        // 在请求开始之前检查先前的请求
        this.removePendingAjax(config)
        // 将当前请求添加到pendingAjax
        this.addPendingAjax(config)
        // ...
        return config
    })

   
    // 拦截响应
    this.axios.interceptors.response.use((res) => {
        // 在请求完成之后去掉该请求
        this.removePendingAjax(res.config)

        return new Promise((resolve, reject) => {
          if (!res || !res.data) resolve()
          const resData = res.data
          // ...
          const data = this.getResData(resData)
          return resolve(data)
        })
      }, (error) => {
        // 如果出现错误，删除该请求
        this.removePendingAjax(error.config)
        // ...
        return Promise.reject(error)
      },
    );
  }

  // 添加请求到pendingAjax字典
  addPendingAjax(config) {
    // 如果需要取消重复请求，就直接return，不让它添加到pendingAjax字典
    if (!this.cancelDuplicated) return
    const veryConfig = config.veryConfig || {}
    // 为这个请求接口生成一个键
    const duplicatedKey = JSON.stringify({
      duplicatedKey: veryConfig.duplicatedKey || this.duplicatedKeyFn(config),
      type: 'duplicatedRequest',
    })
    // 使用CancelToken的构造函数来创建cancel token
    config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
      // 如果当前请求键不存在pendingAjax，就把它和对应的cancel token添加到pendingAjax
      if (duplicatedKey && !this.pendingAjax.has(duplicatedKey)) {
        this.pendingAjax.set(duplicatedKey, cancel);
      }
    });
  }

  // 在pendingAjax字典中删除请求
  removePendingAjax(config) {
    // 如果需要取消重复请求
    if (!this.cancelDuplicated) return;
    const veryConfig = config.veryConfig || {};
    const duplicatedKey = JSON.stringify({
      duplicatedKey: veryConfig.duplicatedKey || this.duplicatedKeyFn(config),
      type: 'duplicatedRequest',
    })
    // 如果当前的请求存在pendingAjax字典，取消这个请求并从队列删除
    if (duplicatedKey && this.pendingAjax.has(duplicatedKey)) {
      const cancel = this.pendingAjax.get(duplicatedKey);
      cancel(duplicatedKey);
      this.pendingAjax.delete(duplicatedKey);
    }
  }


  fetch(type, path, param = {}, config = {}) {
    return new Promise((resolve, reject) => {
      this.axios[type](path, param, config)
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  }

  GET(path, param = {}, config = {}) {
    return this.fetch('get', path, { params: param, ...config });
  }

  POST(path, param = {}, config = {}) {
    return this.fetch('post', path, param, config);
  }

  // 上传表单方法
  FORMDATA(path, params, config = {}) {
    const formdata = new FormData();
    Object.keys(params).forEach((key) => {
      formdata.append(key, params[key]);
    });

    const defaultFormDataConfig = {
      method: 'post',
      data: formdata,
      headers: {
        'content-type': 'multipart/form-data;charset=UTF-8',
      },
    };
    return new Promise((resolve, reject) => {
      this.axios(path, merge(defaultFormDataConfig, config)).then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  }
}