import 'css/common.css'
import './search.css'

import Vue from'vue'
import axios from 'axios'
import url from 'js/api.js'
import qs from 'qs'
import mixin from 'js/mixin'
import Velocity from 'velocity-animate'
let {keyword,id} = qs.parse(location.search.substr(1))

new Vue({
    el: '.container',
    data: {
        searchList: null,
        keyword,
        isShow: false
    },
    // 异步请求放到created下进行调用
    created(){
        this.getSearchList()
    },
    methods: {
        getSearchList(){
            axios.get(url.searchList,{keyword,id}).then(res =>{
                this.searchList = res.data.lists
            })
        },
        move() {
            // document.body.scrollTop 一直为0 可能因为文档声明问题，改为document.documentElement即可 
            if(document.documentElement.scrollTop > 100) {
                this.isShow = true
            }else{
                this.isShow = false
            }
        },
        toTop(){
             Velocity(document.body,'scroll',{duration: 500})
             this.isShow = false
        }
    },
    mixins: [mixin]
})