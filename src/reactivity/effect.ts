// 抽离概念，封装，面向对象思想。
class ReactiveEffect {
    private _fn: any;
    constructor(fn) {
        this._fn = fn;
    }
    run() {
        activeEffect = this;
        return this._fn()
    }

}
// 构建容器
let targetMap = new Map()
/**
 * 依赖收集，触发依赖
 * @param target 
 * @param key 
 */
export function track(target: any,key) {
    // 传递过来的target对象不能有重复，所以使用map集合
    let depsMap = targetMap.get(target);
    if(!depsMap) {
        depsMap = new Map();
        targetMap.set(target,depsMap);
    }
    // 处理key
    let dep = depsMap.get(key);
    if(!dep) {
        dep = new Set();
        depsMap.set(key,dep);
    }
    dep.add(activeEffect);
}
export function trigger(target, key) {
    let depsMap = targetMap.get(target);
    let dep = depsMap.get(key);
    for (const effect of dep) {
      effect.run();
    }
  }
  
let activeEffect;
export function effect(fn) {
    // 写一个类
    const _effect = new ReactiveEffect(fn)
    _effect.run();
    const runner =  _effect.run.bind(_effect);
    return runner;
}