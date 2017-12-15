<template>
    <div class="container" id="app">
        <div class="row">
            <div class="medium-3 column">
            <br>
            <label>Start typing to search Feat
                <input id="featfilter" v-model="featfilter" type="text" placeholder="Feat Name"  v-on:keyup="filterFeats()" @change="filterFeats()"/>
            </label>
            </div>
        </div>
        <div class="row">
            <div class="medium-2" style="text-align:left">
                <div>
                    <span v-for="feat in currentFeats" v-if="currentFeats.length > 0" v-on:click="loadFeat(feat)">{{feat.name}}-{{feat.type}} <br/></span>
                </div>
            </div>
            <div class="medium-10" v-if="chosenFeat" style="text-align:left">
                <b>Name:</b> {{chosenFeat.name}} <br/>
                <b>Type:</b> {{chosenFeat.type}} <br/>
                <span v-if="chosenFeat.description"><b>Description:</b> {{chosenFeat.description}}<br/></span>
                <span v-if="chosenFeat.prereq"><b>Pre-Requisite:</b> {{chosenFeat.prereq}}<br/></span>
                <span v-if="chosenFeat.prerequisiteFeats"><b>Pre-Requisite Feats:</b> {{chosenFeat.prerequisiteFeats}}<br/></span>
                <span v-if="chosenFeat.prerequisiteSkills"><b>Pre-Requisite Feats:</b> {{chosenFeat.prerequisiteSkills}}<br/></span>
                <b>Benefit:</b> {{chosenFeat.benefit}}  <br/>
                <span v-if="chosenFeat.normal"><b>Normal:</b> {{chosenFeat.normal}}<br/></span>
                <span v-if="chosenFeat.special"><b>Special:</b> {{chosenFeat.special}}<br/></span>
                <span v-if="chosenFeat.Teamwork"><b>Teamwork</b></span> <span v-if="chosenFeat.critical"><b>Critical</b></span> <span v-if="chosenFeat.grit"><b>Grit</b></span>
                <span v-if="chosenFeat.style"><b>Style</b></span> <span v-if="chosenFeat.performance"><b>Performance</b></span> <span v-if="chosenFeat.multiples"><b>Multiples</b></span>
                <span v-if="chosenFeat.panache"><b>Panache</b></span> <span v-if="chosenFeat.betrayal"><b>Betrayal</b></span> <span v-if="chosenFeat.targetting"><b>Targetting</b></span></br>
                <span v-if="chosenFeat.racial"><b>Racial:</b> {{chosenFeat.raceName}}</br></span>
                <span v-if="chosenFeat.goal"><b>Racial:</b> {{chosenFeat.goal}}</br></span>
                <span v-if="chosenFeat.racial"><b>Racial:</b> {{chosenFeat.raceName}}</br></span>
                <span v-if="chosenFeat.completionBonus"><b>Completion Bonus:</b> {{chosenFeat.completionBonus}}</br></span>
                Source: {{chosenFeat.source}}<br/>
                <br/>
            </div>
        </div>
        <featModal v-if="showModal" @close="showModal = false" :modalfeat="chosenFeat">

        </featModal>
    </div>
</template>

<script>
import featModal from './feat-modal.vue'
import axios from 'axios';

var sortFeats = function(a, b) {
    if(a.name < b.name) return -1;
      if(a.name > b.name) return 1;
      return 0;
    
  }
export default {
   name: 'feat',
  components: {featModal},
  data: function() {
      return {
        feats: [],
        currentFeats: [],
        showModal: false,
        chosenFeat: '',
        featfilter: '' 
      }
  },  
  methods: {
    filterFeats: function () { 
      this.currentFeats = []; 

	    var arrayLength = this.feats.length;
		  for (var i = 0; i < arrayLength; i++) {
        
		    if(this.feats[i].name.startsWithI(this.featfilter)) {
		    	this.currentFeats.push(this.feats[i]);
		    }
    		
		  }
      this.currentFeats.sort(function(a, b){return sortFeats(a,b)});
    },
    openModal: function(feat) {
       this.chosenFeat = feat; 
       this.showModal = true;
    },
    loadFeat: function(feat) {
      this.chosenFeat = feat;
    }
   
  },
  mounted() {
    axios.get("./json/feats.json")
    .then(response => {this.feats = response.data})
  }
}
</script>