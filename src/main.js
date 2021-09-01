import AxiosMini from './core/AxiosMini';
import { mixin } from './utils'

function createInstance(config) {
    // 通过构造函数创建出context对象
    var context = new AxiosMini(config);

    // 把原型链上request方法的this指向上一步的context对象
    var instance = AxiosMini.prototype.request.bind(context);

    // 为request方法添加上AxiosMini原型链上的方法（get,post）,还有实例化后对象的属性
    mixin(instance, AxiosMini.prototype, context);

    // 返回的本质上经过加工的request方法
    return instance;
}

var axiosmini = createInstance({});

function create(config) {
    return createInstance(config || {});
}

axiosmini.create = create;

export default axiosmini;
