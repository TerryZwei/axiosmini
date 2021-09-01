var ObjectProto = Object.prototype;

function isArray(val) {
    return ObjectProto.toString.call(val) === '[object Array]';
}

function isObject(value) {
    return value != null && (typeof value === 'object' || typeof value === 'function');
}

function forEach(obj, fn, context) {
    // 判断是null或者undefined
    if (obj === null || typeof obj === 'undefined') {
        return;
    }
    // 其他类型，则成为新数组里的成员
    if (typeof obj !== 'object') {
        obj = [obj];
    }
    // 判断是否是数组
    if (isArray(obj)) {
        var index = -1,
            length = obj.length;
        // 利用while遍历
        while (++index < length) {
            fn.call(context, obj[index], index, obj);
        }
    } else {
        for (var key in obj) {
            // 借用对象上的hasOwnProperty，排除原型链上的属性
            if (ObjectProto.hasOwnProperty.call(obj, key)) {
                fn.call(context, obj[key], key, obj);
            }
        }
    }
}

// 处理get请求参数
function paramsUrl(url, params) {
    if (!params) return url;
    var serializeParams = [];
    forEach(params, function serialize(item, key) {
        if (item) {
            if (isObject(item)) {
                item = JSON.stringify(item);
            }
            serializeParams.push(key + '=' + item);
        }
    });
    serializeParams = serializeParams.join('&');
    return serializeParams ? url + '?' + serializeParams : url;
}


// 遍历obj上的每一个属性，调用copy方法，绑定this的指向
function forIn(obj, fn, thisArg) {
    for (var key in obj) {
        if (fn.call(thisArg, obj[key], key, obj) === false) {
            break;
        }
    }
}

// 判断属性值非'__proto__'、'constructor'、'prototype'
function isValidKey(key) {
    return key !== '__proto__' && key !== 'constructor' && key !== 'prototype';
};

// 拷贝对象
function copy(val, key) {
    if (!isValidKey(key)) {
        return;
    }

    var obj = this[key];
    if (isObject(val) && isObject(obj)) {
        mixin(obj, val);
    } else {
        this[key] = val;
    }
}

// 合并多个对象，改变target的值
function mixin(target) {
    var length = arguments.length,
        index = 0;
    while (++index < length) {
        var obj = arguments[index];
        if (isObject(obj)) {
            forIn(obj, copy, target);
        }
    }
    return target;
}


export {
    isArray,
    isObject,
    forEach,
    mixin,
    paramsUrl
}