<template>
  <footer class="footer">
    <span class="todo-count">剩余<strong>数量值：{{getTotal}}</strong></span>
    <ul class="filters">
      <li>
        <a class="selected" href="javascript:;" @click="showList('alldo')">全部</a>
      </li>
      <li>
        <a href="javascript:;" @click="showList('nodo')">未完成</a>
      </li>
      <li>
        <a href="javascript:;" @click="showList('yesdo')">已完成</a>
      </li>
    </ul>
    <button class="clear-completed" @click="clear()">清除已完成</button>
  </footer>
</template>

<script>
import pubsub from 'pubsub-js'
export default {
  name:'todo-footer',
  props:['list'],
  computed:{
    getTotal(){
      return this.list.filter(li=>{
        return !li.isDone
      }).length
    },
    
  },
  methods: {
      clear(){
        pubsub.publish('clearTask');
      },
      showList(hasdo){
        pubsub.publish('showdiffTask',hasdo)
      }
  },
}
</script>