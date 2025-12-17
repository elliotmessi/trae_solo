<script setup lang="ts">
import { effect, react } from './react'
import { cref, effect as ceffect } from './cref'
defineOptions({
  name: "ProxyObject"
});

const obj = react({
  count: 0,
})
let newCount = ref(0)



effect(() => {
  newCount.value = obj.count
  console.log('effect:', newCount, obj.count)
})

const change = (value: number) => {
  obj.count = obj.count + value
}


const refCount = cref(0)
const refNewCount = ref(0)

ceffect(() => {
  refNewCount.value = refCount.value
  console.log('refCount.value:', refCount.value)
})

const refChange = (value: number) => {
  refCount.value = refCount.value + value
}

</script>

<template>
  <h1>测试对象代理（vue3原理）</h1>
  <div>
    <el-card header="ProxyObject: react -> reactive">
      <p>当前 count 值：{{ obj.count }}</p>
      <el-button type="primary" @click="change(1)">增加 count</el-button>
      <el-button type="primary" @click="change(-1)">减少 count</el-button>
      <p>effect: {{ newCount }}</p>
    </el-card>
    
    <el-card header="Ref Object: cref -> ref">
      <p>当前 count 值：{{ refCount.value }}</p>
      <el-button type="primary" @click="refChange(1)">增加 count</el-button>
      <el-button type="primary" @click="refChange(-1)">减少 count</el-button>
      <p>effect: {{ refNewCount }}</p>
    </el-card>
  </div>
</template>
