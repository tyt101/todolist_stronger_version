<template>
  <header class="header">
    <h1>todos</h1>
    <input id="toggle-all" class="toggle-all" type="checkbox" >
    <label for="toggle-all"></label>
    <input
      class="new-todo"
      placeholder="输入任务名称-回车确认"
      autofocus
      @keyup.enter="add"
      v-model="task"
    />
  </header>
</template>

<script>
import {nanoid} from 'nanoid'
const pubsub = require('pubsub-js')
export default {
    name:'todo-header',
    data() {
        return {
            task:''
        }
    },
    methods: {
        add(){
            let li = {id:nanoid(),name:this.task,isDone:false}
            // console.log(li)
            pubsub.publish('addTask',li)
            this.task=''
        }
    },
}
</script>