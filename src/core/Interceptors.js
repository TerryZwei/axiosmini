// 拦截器
function Interceptors() {
    this.handler = []
}

Interceptors.prototype.use = function (fulfilled, rejected) {
    this.handler.push({
        fulfilled,
        rejected
    });
}

export default Interceptors;