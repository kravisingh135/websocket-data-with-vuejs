<template>
<div class="container">
  <h1>Real time stock data</h1>
  <div class="head-content">
    <div class="name">Name</div>
    <div class="price">Price</div>
    <div class="updated-at">Updated At</div>
  </div>
  <div class="body-content">        
    <div v-for="message in messages" :key="message.value">
      <ul>
        <li v-for="messageList in message">
          <div class="name">{{messageList.name}}</div>
          <div class="price">{{messageList.price}}</div>
          <div class="updated-at">{{messageList.updatedAt | moment}}</div>
        </li>
      </ul>
    </div>    
  </div>
  </div>
</template>

<script>
    import Socket from "./socket"
    import moment from 'moment'

    export default {
        name: 'app',
        data(){
            return {
                messages: []                                
            }
        },
        methods:{
          handleMessage(msg){                       
            this.messages.push(msg) 
          }
        },
        filters: {
          moment: function (date) {
            return moment(date).fromNow();
          }
        },
        created(){
            Socket.$on("message", this.handleMessage)
        },
        beforeDestroy(){
            Socket.$off("message", this.handleMessage)
        }
  }
</script>
<style>
  @import './assets/css/style.css';
</style>