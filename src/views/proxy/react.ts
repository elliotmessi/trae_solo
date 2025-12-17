// ReactiveModule
const depsMap = new WeakMap<Record<string, any>, Map<string | symbol, Set<() => void>>>()
let activeEffect = null

const track = (target: Record<string, any>, key: string | symbol) => {
  if (!activeEffect) return
  console.log('track:', target, key)
  let deps = depsMap.get(target)
  if (!deps) {
    depsMap.set(target, new Map())
  }
  deps = depsMap.get(target)
  let depsForKey = deps.get(key)
  if (!depsForKey) {
    deps.set(key, new Set())
  }
  depsForKey = deps.get(key)
  depsForKey.add(activeEffect)
}

const trigger = (target: Record<string, any>, key: string | symbol) => {
  console.log('trigger:', target, key)
  const deps = depsMap.get(target)
  if (!deps) return
  const depsForKey = deps.get(key)
  if (!depsForKey) return
  depsForKey.forEach(effectFn => {
    effectFn()
  })
}

const react = (data: Record<string, any>) => {
  return new Proxy(data, {
    get(target, key, receiver) {
      const value = Reflect.get(target, key, receiver)
      track(target, key)
      if (typeof value === 'object' && value !== null) {
        return react(value)
      }
      return value
    },
    set(target, key, value, receiver) {
      const oldValue = Reflect.get(target, key, receiver)
      const result = Reflect.set(target, key, value, receiver)
      if (oldValue !== value) {
        trigger(target, key)
      }
      return result
    },
  })
}

const effect = (fn: () => void) => {
  const effectFn = () => {
    activeEffect = effectFn
    // 执行原函数，触发get拦截，从而收集依赖
    fn()
    activeEffect = null
  }
  // 立刻执行一次，触发依赖收集
  effectFn()
}

export { effect, react }
