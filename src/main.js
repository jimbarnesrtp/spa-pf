
String.prototype.startsWithI = function(s) {
  return this.toLowerCase().startsWith(s.toLowerCase())
} 

var sortPlayers = function(a, b) {
  if(b.init==a.init) {
        return b.bonus-a.bonus;
    } else {
      return b.init-a.init;
    }

}


// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//import the vue instance
import Vue from 'vue'
//import the App component
import App from './App'
//import the vue router
import VueRouter from 'vue-router'
//tell vue to use the router
Vue.use(VueRouter)
import $ from "jquery";

import Vuex from 'Vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    count: 0,
    players: [],
    currentPlayer: 0,
    playerUp: -1,
    round: 1,
    conditions: []
  },
  mutations: {
    increment (state) {
      state.count++
    },
    addPlayer(state) {
      state.players.push({ name: $('#name').val(), init: $('#init').val(), bonus: $('#bonus').val() });
      state.players.sort(function(a, b){return sortPlayers(a,b)});
      $('#name').val('');
      $('#init').val('');
      $('#bonus').val('');

    },
    setCurrentPlayer(state, n) {
      state.currentPlayer = n;
    },
    updatePlayer(state, n) {
      state.players[state.currentPlayer].bonus = n.bonus;
      state.players[state.currentPlayer].init = n.init;
      state.players.sort(function(a, b){return sortPlayers(a,b)});
    },
    reset(state) {
      var arrayLength = state.players.length;
      for (var i = 0; i < arrayLength; i++) {
         //state.players[i].bonus=0;
         state.players[i].init=0;
      } 
      state.playerUp = -1;
      state.round = 1;
      state.conditions = [];
    },
    clear(state) {
      state.players = [];
      state.playerUp = -1;
      state.round = 1;
      state.conditions = [];
    },
    changePlayer(state) {
      state.playerUp++;
      if(state.playerUp < state.players.length) {
        
      } else {
        state.playerUp = 0;
        state.round++;
        var arrayLength = state.conditions.length;
        for (var i = 0; i < arrayLength; i++) {
          if(state.conditions[i].active < state.conditions[i].total) {        
           state.conditions[i].active++;
          } else {
            state.conditions.splice(i,1);
          }
        }
      }
      
    },
    addCondition(state) {
      state.conditions.push({ player: $('#player').val(), name: $('#conName').val(), total: $('#rounds').val(), active:0 });
      $('#player').val('');
      $('#conName').val('');
      $('#rounds').val('');

    }
    
  },
  actions: {
    addPlayer (context) {      
      context.commit('addPlayer');
    },
    setCurrentPlayer (context, n) {
      context.commit('setCurrentPlayer', n);
    },
    updatePlayer (context, n) {
      context.commit('updatePlayer', n);
    },
    addCondition(context) {
      context.commit('addCondition');
    }
  }
})

//define your routes
//import the hello component
import Hello from './components/Hello'
//import the about component
import Feat from './components/Feat'
import UMR from './components/UMR'
import Spells from './components/spells'
import Skills from './components/Skills'
import Init from './components/Init'
import MagicItems from './components/magic-items'
import Monsters from './components/monsters'
import All from './components/all'
//define your routes
const routes = [
//route for the home route of the web page
{ path: '/', component: Hello },
//route for the about route of the web page
{ path: '/feats', component: Feat },
{ path: '/spells', component: Spells },
{ path: '/skills', component: Skills },
{ path: '/umr', component: UMR },
{ path: '/init', component: Init },
{ path: '/magic-items', component: MagicItems },
{ path: '/monsters', component: Monsters },
{ path: '/all', component: All }
]

// Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes, // short for routes: routes
  mode: 'history'
})
//instatinat the vue instance
new Vue({
//define the selector for the root component
  el: '#app',
  //pass the template to the root component
  template: '<App/>',
  //declare components that the root component can access
  components: { App },
  //pass in the router to the Vue instance
  router,
  store
  
}).$mount('#app')//mount the router on the app