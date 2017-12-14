<template>
<div id="app4" style="padding-top:10px">

  <div class="row">
    <div class="medium-4 column">
      <div class="row">
        <div class="medium-12 column">
            Add Player:<br/>
            Name: <input type="text" id="name">
        </div>
        <div class="medium-6 column">
            <label for="init" style="font-size:1rem;float:left">Init:</label> <input type="text" class="small-4" id="init">
        </div>
        <div class="medium-6 column">
            <label for="bonus" style="font-size:1rem;float:left">Bonus:</label> <input class="small-4" type="text" id="bonus">
        </div>
      </div>
      <button type="button" class="button" id="addPlayer" v-on:click="addPlayer()">Add</button>     
        
      
    </div>
    <div class="medium-4 column">
        Conditions:<br/>
        Add Condition:<br/>
        <div class="row">
          <div class="medium-12 column">
              Name: <input type="text" id="player">
          </div>
          <div class="medium-6 column">
              Condition: 
              <select id="conName" >
                 <option value="">Choose</option>
                 <option v-for="(status, index) in statuses" :key='index' v-bind:value="status"> {{status}}</option>
               </select>
          </div>
          <div class="column medium-6">
              Total Rounds: <input type="text" id="rounds">
              
          </div>
          <div class="column medium-12">
            <button type="button" class="button" id="addPlayer" v-on:click="addCondition()">Add</button>
          </div>
        </div>
    </div>
    <div class="medium-4 column">
        <table border="1">
            <tr>
               <th>Character</th>
               <th>Condition</th>
               <th>Rounds Active</th>
               <th>Total Rounds</th>
        
            </tr>
            <tr v-for="(condition, index) in conditions" :key='index'>
              <td>{{ condition.player }}</td> 
              <td style="text-align:center"> {{ condition.name }}</td> 
              <td style="text-align:center">{{ condition.active }}</td> 
              <td style="text-align:center">{{ condition.total }}</td>
            </tr>
          </table>
    </div>
  </div>
  
  <div class="row align-center">
    <div class="column medium-4">
      <button type="button" class="button" v-on:click="reset()">Reset Characters</button> &nbsp; <button class="button" type="button" v-on:click="clear()">Clear Characters</button> 
      &nbsp; <button type="button" class="button" v-on:click="openModalNewFight()">New Fight!</button>
    </div>
  </div>
  <div class="row">
    <div class="medium-12 column">
      <table border="1" style="font-size:30px;">
        <tr>
           <th>Character</th>
           <th>Init</th>
           <th>Bonus</th>
        </tr>
        <tr v-for="(player, index) in players" :key='index'>
          <td v-bind:class="{ active: readyPlayer(index) }" v-on:click="openModal(index)">{{ player.name }}</td>
           <td  style="text-align:center" v-on:click="openModal(index)"> {{ player.init }}</td> 
           <td style="text-align:center" v-on:click="openModal(index)">{{ player.bonus }}</td>
           <td style="text-align:center" v-on:click="deletePlayer(index)">Delete</td>
        </tr>
      </table>
    </div>
  </div>
  <div class="row align-center">
    <div class="column medium-3" style="text-align:center">
        Round: {{ round }}
        <button type="button" class="button" v-on:click="showNextPlayer()" style="margin-bottom:5px;">Fight!</button><br/>
        
    </div>
  </div>
  <initModal v-if="showModal" @close="showModal = false">

  </initModal>
  <resetModal v-if="showModalNewFight" @close="showModalNewFight = false">
    
  </resetModal>
</div>
</template>

<script>
import initModal from './init-modal.vue'
import resetModal from './reset-modal.vue'


export default {
  name: 'Init',
  components: {initModal, resetModal},
  data: function() {
    return {
        showModal: false,
        showModalNewFight: false,
        statuses: ["Bleed", "Blinded", "Broken", "Confused", "Cowering","Dazed", "Dazzled", "Dead", "Deafened", "Disabled", "Dying",	"Energy Drained", "Entangled","Exhausted",
        "Fascinated", "Fatigued", "Flat-Footed", "Frightened", "Grappled", "Helpless", "Incorporeal", "Invisible", "Nauseated", "Panicked", "Paralyzed", "Petrified", "Pinned",
        "Poisoned", "Prone", "Shaken", "Sickened", "Sinking", "Stable", "Staggered", "Stunned", "Unconscious"],
    }
  },
  methods: {
    openModal(index) {
       this.showModal = true;
       this.$store.dispatch('setCurrentPlayer', index);
    },
    openModalNewFight() {
      this.$store.commit('reset');
      this.showModalNewFight = true;
      this.$store.dispatch('setCurrentPlayer', 0);
    },
    reset: function() {
       this.$store.commit('reset');
    },
    clear: function() {
       this.$store.commit('clear');
    },
    addPlayer: function() {
      this.$store.dispatch('addPlayer');
    },
    showNextPlayer() {
       this.$store.commit('changePlayer');
    },
    readyPlayer(index) {
      if(index == this.$store.state.playerUp) {
        return true;
      } else {
        return false;
      }
    },
    addCondition() {
      this.$store.dispatch('addCondition');
    },
    deletePlayer: function(index) {
      this.$store.state.players.splice(index,1);
    }

  },
  computed: {
    players () {
      return this.$store.state.players;
    },
    currentPlayer() {

      return this.$store.state.currentPlayer;
    },
    round() {
      return this.$store.state.round;
    },
    conditions() {
      return this.$store.state.conditions;
    }
  }

}

var itemNum = 4;



</script>