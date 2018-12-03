import 'css/common.css'
import './category.css'

import Vue from 'vue'
import axios from 'axios'
import Foot from 'components/Foot.vue'
import url from 'js/api.js'

new Vue({
  el: '#app',
  data: {
    topLists: null,
    topIndex: 0,
    subData: null,
    rankData: null
  },
  created() {
    this.getTopList()
    this.getSubList(0) 
  },
  
  methods: {
    getTopList() {
      axios.get(url.topList).then(res => {
        this.topLists = res.data.lists
      }).catch(res => {

      })
    },
    getSubList(index, id) {
      this.topIndex = index
      if (index === 0) {
        this.getRank()
      } else {
        axios.get(url.subList, {
          id: id
        }).then(res => {
          this.subData = res.data.data
        })
      }
    },
    getRank(){
        axios.get(url.rank).then(res =>{
            this.rankData = res.data.data
        })
    }
  },
  components: {
    Foot
  },
  filters: {
    number(price){
      return price.toFixed(2)  // 保留两位小数
    }
  }
})
