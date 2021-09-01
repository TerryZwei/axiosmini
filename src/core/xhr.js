import { forEach, paramsUrl, isObject } from '../utils/index'

export default function xhr(config) {
    return new Promise((resolve, reject) => {
        // 实例化
        var request = new XMLHttpRequest();

        // 初始化请求,异步请求
        request.open(config.method.toUpperCase(), paramsUrl(config.url, config.params), true);
        console.log(config.timeout)
        // 设置请求的超时时间
        request.timeout = config.timeout;

        // 监听readyState的值变化
        request.onreadystatechange = function readystatechange() {
            if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                // console.log(request.response);
                resolve(JSON.parse(request.response));
            }
        }


        // 设置请求头
        forEach(config.headers, function setheaders(item, key) {
            request.setRequestHeader(key, item);
        });


        // 超时触发
        request.ontimeout = function xhrtimeout() {
            console.log('timeout!');
            reject('timeout');
        }

        // 当请求遇到错误时，将触发error
        request.onerror = function xhrerror(e) {
            console.log('onerror:', e);
            reject('onerror')
        }

        // 请求终止时 abort 事件被触发
        request.onabort = function xhrabout(e) {
            console.log('onabort:', e);
            reject('onerror');
        }

        let bodyData = config.data;
        if (isObject(config.data)) {
            request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            bodyData = JSON.stringify(bodyData);
        } else {
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        // send发送请求
        request.send(bodyData);
    });
}