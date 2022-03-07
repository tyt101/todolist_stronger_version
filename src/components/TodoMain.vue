<template>
  <ul class="todo-list">
    <!-- completed: 完成的类名 -->
    <li :class="{completed:li.isDone}" v-for="li in list" :key="li.id">
      <div class="view">
        <input class="toggle" type="checkbox" v-model="li.isDone"/>
        <label>{{li.name}}</label>
        <button class="destroy" @click="deleteTask(li.id)"></button>
      </div>
    </li>
  </ul>
  
</template>

<script>
const pubsub = require('pubsub-js')
export default {
    name:'todo-main',
    props:['list'],
    methods: {
        deleteTask(id){
            pubsub.publish('deleteTask',id)
        }
    },
}
</script>