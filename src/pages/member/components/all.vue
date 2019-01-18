<template>
  <div class="container" style="min-height: 597px;">
    <div
      class="block-list address-list section section-first js-no-webview-block"
      v-if="lists&&lists.length"
    >
      <a
        v-for="list in lists"
        :key="list.id"
        class="block-item js-address-item address-item"
        @click="toEdit(list)"
        :class="{'address-item-default':list.isDefault}"
      >
        <div class="address-title">{{list.name}} {{list.tel}}</div>
        <p>{{list.provinceName}}{{list.cityName}}{{list.districtName}}{{list.address}}</p>
      </a>
    </div>
    <div v-if="lists&&!lists.length">没有地址，请添加</div>

    <div class="block stick-bottom-row center">
      <router-link
        class="btn btn-blue js-no-webview-block js-add-address-btn"
        :to="{name: 'form',query:{type:'add'}}"
      >新增地址</router-link>
    </div>
  </div>
</template>

<style scoped>
@import "./address_base.css";
@import "./address.css";
</style>

<script>
import Address from "js/addressService.js";
import axios from "axios";
import url from "js/api.js";

export default {
  data() {
    return {
      lists: null
    };
  },
  created() {
    this.getLists();
  },
  methods: {
    toEdit(list) {
      // this.$router.push({ path: "/address/form" });
      this.$router.push({name: 'form',query: {
        type: 'edit',
        instance: list
      }})
    },
    getLists() {
      axios.get(url.addressLists).then(res => {
        this.lists = res.data.lists;
      });
    }
  }
};
</script>
