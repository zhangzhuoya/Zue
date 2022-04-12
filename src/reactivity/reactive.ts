 import {track,trigger} from "./effect";
 /**
  * 主要是通过Proxy进行代理，拦截
  */
 export function reactive (raw: any) {
     return new Proxy(raw,{
        get(target,key) {
            let res = Reflect.get(target,key);
            // TODO 收集依赖
            track(target,key);
            return res

        },
        set(target,key,val) {
            let res = Reflect.set(target,key,val);

            // TODO 触发依赖
            trigger(target,key);
            return res
            

        }
    })

}