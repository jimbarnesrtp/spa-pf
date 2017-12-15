<template>
    
<div class="container" id="app">
<div class="row">
	<div class="medium-3 column">
       <br>
       <label>Start typing to search magic items
        <input id="itemFilter" v-model="itemFilter" type="text" placeholder="Magic Item Name"  v-on:keyup="filterItems()" @change="filterItems()"/>
      </label>
  </div>
  <div class="medium-3 column">
    <br>
    Pick a slot to filter by that slot
    <select id="class" v-model="slotSelected" @change="filterBySlot()">
      <option value="">Filter by Slot</option>
      <option  v-for="(slot, index) in slots" v-bind:value="slot" :key="index"> {{ slot }} </option>
    </select>
  </div>
</div>
<div class="row">
  <div class="medium-2" style="text-align:left">
      <div v-if="currentItems.length > 0">
        <span v-for="(item, index) in currentItems" :key="index"  v-on:click="loadItem(item)">{{item.name}} <br/></span>
      </div>
  </div>
  <div class="medium-10" v-if="chosenItem" style="text-align:left">
   
      <h4> {{chosenItem.name}}</h4> 
      <b>Type:</b> {{chosenItem.aura}} <b>CL:</b> {{chosenItem.cl}} <br/> 
      <b>Slot:</b> {{chosenItem.slot}} <br/>
      <b>Price:</b> {{chosenItem.price}} <b>Weight:</b> {{chosenItem.weight}} <br/>
      <span v-if="chosenItem.description"><b>Description:</b> {{chosenItem.description}}<br/></span>

      <div v-if="chosenItem.intel">
          <h3>Intelligent Item</h3>
          <b>Alignment:</b> {{chosenItem.alignment}} <br/>
          <b>Intelligence:</b> {{chosenItem.intel}} <br/>
          <b>Wisdom:</b> {{chosenItem.wisdom}} <br/>
          <b>Charisma:</b> {{chosenItem.cha}} <br/>
          <b>Ego:</b> {{chosenItem.ego}} <br/>
          <b>Communication:</b> {{chosenItem.communication}} <br/>
          <b>Senses:</b> {{chosenItem.senses}} <br/>
          <b>Powers:</b> {{chosenItem.powers}} <br/>
          <b>Languages:</b> {{chosenItem.languages}} <br/>
      </div>
      <br/>
      <div v-if="chosenItem.magicItems">
        <h4>Cursed!</h4>
        <span>Reads as {{chosenItem.magicItems}}</span>
      </div>
      <br/>
      <h4>Creation</h4>
      <span v-if="chosenItem.requirements"><b>Creation Requirements:</b> {{chosenItem.requirements}}<br/></span>
      <span v-if="chosenItem.minorArtifact"> Minor Artifact</span>
      <span v-if="chosenItem.majorArtifact"> Major Artifact</span>
      <span v-if="chosenItem.mythic"> Mythic</span>
      <span v-if="chosenItem.legendary"> Legendary</span><br/>
      <span v-if="chosenItem.cost"><b>Cost:</b> {{chosenItem.cost}}</span> <br/>
      <b>Group:</b> {{chosenItem.group}}<br/>
      <span v-if="chosenItem.destruction"><b>Destruction:</b> {{chosenItem.destruction}}<br/></span>
      <br/>
      <b>Source:</b> {{chosenItem.source}}<br/>
      <br/>
  </div>
</div>

	
</div>
</template>
<script>

var sortItems = function(a, b) {
   	if(a.name < b.name) return -1;
    if(a.name > b.name) return 1;
    return 0;
  
}
import axios from 'axios';
 export default {
  name: 'magicItems',
  data: function() {
      return {
        items: [],
        currentItems: [],
        chosenItem: '',
        itemFilter: '' ,
        slots: [],
        slotSelected: ""
      }       
  },
  methods: {
    filterItems: function () { 
      this.currentItems = []; 
      if(this.itemFilter) {
        var arrayLength = this.items.length;
		    for (var i = 0; i < arrayLength; i++) {        
		      if(this.items[i].name.startsWithI(this.itemFilter)) {
		    	  this.currentItems.push(this.items[i]);
		      }
    		}
        this.currentItems.sort(function(a, b){return sortItems(a,b)});
      }	    
    },
    loadItem: function(item) {
      this.chosenItem = item;
    },
    populateSlots: function() {
      var arrayLength = this.items.length;
      for (var i=0; i < arrayLength; i++) {
        if(!this.slots.includes(this.items[i].slot)) {
          this.slots.push(this.items[i].slot);
        }
      }
    },
    filterBySlot: function() {
      this.currentItems = []; 
      var arrayLength = this.items.length;
		    for (var i = 0; i < arrayLength; i++) {        
		      if(this.items[i].slot == (this.slotSelected)) {
		    	  this.currentItems.push(this.items[i]);
		      }
    		}
        this.currentItems.sort(function(a, b){return sortItems(a,b)});
    }
   
  },
  mounted() {
    axios.get("./json/magicitems.json")
    .then(response => {this.items = response.data;
     this.populateSlots();
    })
  }
};
</script>