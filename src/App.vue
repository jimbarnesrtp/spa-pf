<template>
  <div id="app">
  <!-- the router outlet, where all matched components would ber viewed -->
  <div class="row">
			<div class="column medium-12" style="text-align:center">
				<img src="images/PathfinderRPGLogo_500.jpeg">
			</div>
		</div>
  <router-link v-bind:to="'/'" class="button">Home</router-link>
  <router-link v-bind:to="'/feats'" class="button">Feats</router-link>
  <router-link v-bind:to="'/spells'" class="button">Spells</router-link>
  <router-link v-bind:to="'/skills'" class="button">Skills</router-link>
  <router-link v-bind:to="'/umr'" class="button">UMR</router-link>
  <router-link v-bind:to="'/init'" class="button">INIT</router-link>
  <router-link v-bind:to="'/magic-items'" class="button">Magic Items</router-link>
  <router-link v-bind:to="'/monsters'" class="button">Monsters</router-link>
  <router-link v-bind:to="'/all'" class="button">All</router-link>
  <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'app'
}
</script>
<!-- styling for the component -->
<style>


#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>