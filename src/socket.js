import Vue from "vue"
import _ from 'lodash'
import moment from 'moment'

Vue.prototype.moment = moment

const socket = new WebSocket("ws://stocks.mnet.website/")

const emitter = new Vue({
  methods:{
    send(message){      
      if (1 === socket.readyState)
        socket.send(message)
    }
  }
})
var stockData = [];
socket.onmessage = function(msg){    
  var stockDetails = eval(msg.data);      
  // var outputList;
  stockDetails.forEach(function([stockName, stockPrice]){
    stockData[stockName] = stockPrice;
    stockData.push({'name': stockName, 'price': Number((stockPrice).toFixed(1)), 'updatedAt': Date.now()});        
  });  
  
  // stockData = stockData.reduce((acc, current) => {    
  //   const x = acc.find(item => item.name === current.name);
  //   if (!x) {          
  //     return outputList = acc.concat([current]);
  //   } else {
  //     return acc;
  //   }
  // }, []);
  // console.log('stockData item--> ', outputList);  
  emitter.$emit("message", stockData);
}
socket.onerror = function(err){
  emitter.$emit("error", err)
}

export default emitter