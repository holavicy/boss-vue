import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currRouteNme: '',
    oriMenuList:[],
    menuList:[],
    breadCrumbList:[],
    currColor:''
  },

  mutations: {
    setCurrRouteNme( state, payload ) {
      state.currRouteNme = payload.currRouteNme
    },

    setMenuList( state, payload) {
      state.menuList = payload.menuList
    },

    setOriMenuList( state, payload) {
      state.oriMenuList = payload.oriMenuList
    },

    setBreadCrumb( state, payload) {
      state.breadCrumbList = payload.breadCrumbList
    },

    setColor ( state, payload ) {
      state.currColor = payload.currColor
    }
  },
  actions: {
    setMenuList ( {commit} ) {
      let menuList;
      return new Promise ( (resolve) => {
        axios('/emro_boss/staff/staffauth/findPages?staffNo=00649').then( res => {
          menuList = res.data.authList.map(({id,symbol,pId,forward,resName,isLeaf})=>{
            return {
              id,
              symbol,
              pId,
              forward,
              label:resName,
              isLeaf:isLeaf,
              icon:isLeaf == 1?'':'el-icon-goods'
            }
          });

          commit('setOriMenuList', {
            oriMenuList: menuList
          });

          let menuTree = menuList.reduce(function (prev, item) {
            prev[item.pId] ? prev[item.pId].push(item) : prev[item.pId] = [item];
            return prev;
          }, {});
          
          for (let parentItem in menuTree) {
            menuTree[parentItem].forEach(function (item) {
                item.children = menuTree[item.id] ? menuTree[item.id] : null;
            });
          }
          
          commit('setMenuList', {
            menuList: menuTree[0]
          });
          resolve();
        })
      })
  
    },

    setBreadCrumb ( {commit, state} ) {

      let currMenuList = state.oriMenuList;
      let currMenu;
      let breadCrumbPre = [];
  
      for (let i=0; i<currMenuList.length; i++) {
          if(currMenuList[i]['symbol'] == state.currRouteNme){
            currMenu = currMenuList[i];
              let breadCrumbItem = {};
              breadCrumbItem.title = currMenuList[i].label;
              breadCrumbItem.path = '';
              breadCrumbPre.unshift(breadCrumbItem);
          }
      }
      function setBreadCrumb(menu){
          if(menu.pId != 0){
              for (let i=0; i<currMenuList.length; i++) {
                if(currMenuList[i]['id'] == menu.pId){
                  let breadCrumbItem = {};
                  breadCrumbItem.title = currMenuList[i]['label'];
                  breadCrumbItem.path = '';
                  breadCrumbPre.unshift(breadCrumbItem);
                  setBreadCrumb(currMenuList[i])
                }
              }
          }
      }
      setBreadCrumb(currMenu);
      let index = {
          title:'首页',
          path:''
      };
      breadCrumbPre.unshift(index);
      commit('setBreadCrumb', {
        breadCrumbList:breadCrumbPre
      })
    }

  }
})
