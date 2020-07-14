const store = ({
  namespaced :true,
  state: {
    // aside 展开接点
    menuDefaultActive: '0',
    childTitle: 'welcome'
  },
  mutations:{
    changeMenuDefaultActive(state,data){
      state.menuDefaultActive = data
    },
    changeChildTitle(state,data){
      state.childTitle = data
    }
  },
  actions:{
     setMenuDefaultActive({commit},data){
       commit("changeMenuDefaultActive",data)
     },
     setChildTitle({commit},data){
       commit("changeChildTitle",data)
     }
  },
  getters: {
    getMenuDefaultActive: (state)=>state.menuDefaultActive,
    getChildTitle: (state)=>state.childTitle,

  },
})

export default store;