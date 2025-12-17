import { react } from './react'

const depsMap = new WeakMap<RefImpl, Set<() => void>>()
let activeEffect = null

class RefImpl {
  private _value: any
  public v_isRef: boolean = true

  constructor(initialValue: any) {
    this._value = isObject(initialValue) ? react(initialValue) : initialValue
  }
  get value() {
    track(this)
    return this._value
  }
  set value(newValue: any) {
    const value = isObject(newValue) ? react(newValue) : newValue
    if (!Object.is(value, this._value)) {
      this._value = value
      trigger(this)
    }
  }
}

const cref = (target: any) => {
  return new RefImpl(target)
}

const effect = (fn: () => void) => {
  const effectFn = () => {
    activeEffect = effectFn
    fn()
    activeEffect = null
  }
  effectFn()
}

function track(target: RefImpl) {
  if (activeEffect) {
    if (!depsMap.get(target)) {
      depsMap.set(target, new Set())
    }
    const deps = depsMap.get(target)
    deps.add(activeEffect)
  }
}

function trigger(instance: RefImpl) {
  const deps = depsMap.get(instance)
  deps?.forEach(effect => {
    effect()
  })
}

function isObject(value: any) {
  return value !== null && typeof value === 'object'
}

export { cref, effect }
