import Interceptors from './Interceptors'
import xhr from './xhr'
import { mixin, forEach } from '../utils'

// 构造函数
export default function AxiosMini(config) {
    this.config = config;
    this.interceptors = {
        request: new Interceptors,
        response: new Interceptors
    }
}

AxiosMini.prototype.request = function request(config) {
    this.config = this.config || {};
    mixin(this.config || {}, {
        method: config.method || 'get',
        url: config.url || '',
        headers: config.headers || {},
        data: config.data || {},
        params: config.params || {},
        timeout: config.timeout
    })

    var chain = [xhr, undefined];

    // 获取请求拦截器上的拦截方法数组
    var reqHandler = this.interceptors.request.handler;
    forEach(reqHandler, function (h) {
        chain.unshift(h.fulfilled, h.rejected);
    })
    // 获取响应拦截器上的拦截方法数组
    var resHandler = this.interceptors.response.handler;
    forEach(resHandler, function (h) {
        chain.push(h.fulfilled, h.rejected)
    })

    var p = Promise.resolve(this.config);

    while (chain.length) {
        p = p.then(chain.shift(), chain.shift());
    }


    return p;
}

AxiosMini.prototype.get = function get(url, config) {
    return this.request(mixin(config || {}, { method: 'get', url }));
}

AxiosMini.prototype.post = function post(url, config) {
    return this.request(mixin(config || {}, { method: 'post', url }));
}