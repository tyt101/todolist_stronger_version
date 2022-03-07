<template>
  <section class="todoapp">
    <!-- 除了驼峰, 还可以使用-转换链接 -->
    <TodoHeader></TodoHeader>
    <TodoMain :list="showdiffTasks('showdiffTasks',isdo)"></TodoMain>
    <TodoFooter :list="list"></TodoFooter>
  </section>
</template>

<script>
// 1.0 样式引入
import "./styles/base.css"
import "./styles/index.css"
    
import TodoHeader from "./components/TodoHeader";
import TodoMain from "./components/TodoMain";
import TodoFooter from "./components/TodoFooter";
const pubsub = require('pubsub-js')

export default {
  name:'app',
  components: {
    TodoHeader,
    TodoMain,
    TodoFooter,
  },
  data() {
    return {
      list: [
        { id: 100, name: "吃饭", isDone: true },
        { id: 201, name: "睡觉", isDone: false },
        { id: 103, name: "打豆豆", isDone: true },
      ],
      isdo:'alldo'
    }
  },
  mounted() {
    this.pid_addTask=pubsub.subscribe('addTask',this.addTasks)
    this.pid_deleteTask=pubsub.subscribe('deleteTask',this.deleteTasks)
    this.pid_clearTask = pubsub.subscribe('clearTask',this.clearTasks)
    this.pis_showdiffTask = pubsub.subscribe('showdiffTask',this.showdiffTasks)
  },
  beforeDestroy(){
    pubsub.unsubscribe(this.pid_addTask)
    pubsub.unsubscribe(this.pid_deleteTask)
    
  },
  methods: {
    addTasks(name,task){
      // console.log('消息名字是'+name+'我这儿收到了数据'+task)
      this.list.push(task)
    },
    deleteTasks(name,taskId){
      this.list = this.list.filter(li=>{
        return li.id!=taskId
      })
    },
    clearTasks(){
      this.list = this.list.filter(li=>{
        return !li.isDone
      })
    },
    showdiffTasks(name,hasdo){
      console.log('hasdo是:'+hasdo)
      this.isdo=hasdo
      if(hasdo==='yesdo'){
        return this.list.filter(li=>{
          return li.isDone
        })
      }else if(hasdo==='nodo'){
        return this.list.filter(li=>{
          return !li.isDone
        })
      }else{
        return this.list
      }
    }
  },
};
</script>