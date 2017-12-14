<template>
<div class="container" id="app">
  <div class="row" style="text-align:left">
    <div class="medium-3 column">
        <br>
        <label>Start typing to search Rules
          <input id="umrfilter" v-model="umrfilter" type="text" placeholder="Rule Name"  v-on:keyup="filterUmrs()" @change="filterUmrs()"/>
        </label>
    </div>
  </div>
  <div class="row" style="text-align:left">
    <div class="medium-2">
        <div v-if="currentUmrs.length > 0">
          <span v-for="(umr, index) in currentUmrs"  :key='index' v-on:click="loadUmr(umr)">{{umr.name}}<br/></span>
        </div>
    </div>
    <div class="medium-10" v-if="chosenUmr">
        <b>Name:</b> {{chosenUmr.name}}<br/>
        {{chosenUmr.text}} <br/>
        <span v-if="chosenUmr.format"><b>Format:</b> {{chosenUmr.format}}<br/></span>
        <span v-if="chosenUmr.faq"><b>FAQ:</b> {{chosenUmr.faq}}<br/></span>
        
        <span v-if="chosenUmr.html"> <iframe height="100%" width="100%" :src="chosenUmr.html" frameborder="1" allowfullscreen></iframe><br/></span>
        
        <br/>
    </div>
  </div>
	
</div>
</template>

<script>
var sortFeats = function(a, b) {
   	if(a.name < b.name) return -1;
    if(a.name > b.name) return 1;
    return 0;
  
}
import axios from 'axios';

export default {
  name: 'UMR',
  data: function() {
      return {
        umrs: [],
        currentUmrs: [],
        chosenUmr: '',
        umrfilter: '' 
      }
       
  },
  methods: {
    filterUmrs: function () { 
      this.currentUmrs = []; 

	    var arrayLength = this.umrs.length;
		  for (var i = 0; i < arrayLength; i++) {
        
		    if(this.umrs[i].name.startsWithI(this.umrfilter)) {
		    	this.currentUmrs.push(this.umrs[i]);
		    }
    		
		  }
      this.currentUmrs.sort(function(a, b){return sortFeats(a,b)});
    },
    loadUmr: function(umr) {
      this.chosenUmr = umr;
    }
   
  },
  mounted() {
    axios.get("./json/umr.json")
    .then(response => {this.umrs = response.data; this.currentUmrs = response.data})
  }
};
</script>
