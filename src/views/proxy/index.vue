<script setup lang="ts">
import { effect, react } from './react'
import { cref, effect as ceffect } from './cref'
defineOptions({
  name: "ProxyObject"
});

const obj = react({
  count: 0,
})

effect(() => {
  console.log('obj.count:', obj.count)
})

const change = (value: number) => {
  obj.count = obj.count + value
}


const refCount = cref(0)

ceffect(() => {
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
    </el-card>
    
    <el-card header="Ref Object: cref -> ref">
      <p>当前 count 值：{{ refCount.value }}</p>
      <el-button type="primary" @click="refChange(1)">增加 count</el-button>
      <el-button type="primary" @click="refChange(-1)">减少 count</el-button>
    </el-card>
  </div>
</template>
