import 'css/common.css'
import './index.css'

import Vue from 'vue';
import axios from 'axios'
import url from 'js/api.js'

import Foot from 'components/Foot.vue'
import Swipe from 'components/Swipe'

import {
  InfiniteScroll
} from 'mint-ui';
Vue.use(InfiniteScroll);

new Vue({
  el: '#app',
  data: {
    lists: null,
    pageNum: 1,
    pageSize: 6,
    loading: false, // false 表示可以继续加载
    allLoaded: false, // 是否完全加载
    bannerLists: null
  },
  created() {
    this.getLists()
    this.getBanner()
  },
  methods: {
    getLists() {
      if (this.allLoaded) {
        return
      }
      this.loading = true
      axios.get(url.hostLists, {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        let curLists = res.data.lists
        if (curLists.length < this.pageSize) {
          this.allLoaded = true
        }
        if (this.lists) {
          this.lists = this.lists.concat(curLists)
        } else {
          // 第一次请求数据
          this.lists = curLists
        }
        this.loading = false
        this.pageNum++
      })

    },
    getBanner(){
      axios.get(url.banner).then(res=>{
        this.bannerLists = res.data.lists
      })
    }
  },
  components: {
    Foot, // es6简洁写法(当值与变量名相同时)，相当于 Foot: Foot
    Swipe
  }
})
