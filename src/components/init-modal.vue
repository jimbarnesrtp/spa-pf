<template>
<div id="init-modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              Modify {{ players[currentPlayer].name }}
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
  name: 'initModal',
  methods: { 
    save: function() {
      this.$store.dispatch('updatePlayer', {
        init: $('#init2').val(),
        bonus: $('#bonus2').val()
      })
      //store.players.sort(function(a, b){return sortPlayers(a,b)});
    }
  },
  computed: {
    players () {
      return this.$store.state.players;
    },
    currentPlayer() {
      return this.$store.state.currentPlayer;
    }
  }
}
</script>