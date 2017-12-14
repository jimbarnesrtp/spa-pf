<template>
    <div id="reset-modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              Modify {{ players[currentPlayer].name }} 
              <button type="button" class="button" :disabled="currentPlayer == maxPlayers" style="float:right;margin-left:5px" v-on:click="modalChangeCharacter(currentPlayer+1)"> Forward </button>
            <button style="float:right" :disabled="currentPlayer == 0" type="button" class="button" v-on:click="modalChangeCharacter(currentPlayer-1)"> back </button>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <div class="row">
                <div class="column medium-6">
                  Init: <input type="text" id="init2" :value="players[currentPlayer].init">
                </div>
                <div class="column medium-6">
                  Bonus: <input type="text" id="bonus2" :value="players[currentPlayer].bonus" >
                </div>
              </div>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              
              <button class="modal-default-button button" v-on:click="save();" @click="$emit('close')">
                OK
              </button>
              <br/>
              <br/>
            </slot>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import $ from "jquery";
export default {
  name: 'resetModal',
  methods: { 
    save: function() {
      this.$store.dispatch('updatePlayer', {
        init: $('#init2').val(),
        bonus: $('#bonus2').val()
      })
      //store.players.sort(function(a, b){return sortPlayers(a,b)});
    },
    modalChangeCharacter(index) {
      this.save();
      this.$store.dispatch('setCurrentPlayer', index);
    },
  },
  computed: {
    players () {
      return this.$store.state.players;
    },
    currentPlayer() {
      return this.$store.state.currentPlayer;
    },
    maxPlayers() {
      return this.$store.state.players.length-1;
    }
  }
}
</script>