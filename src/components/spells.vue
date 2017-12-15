<template>
<div class="container" id="app">
  <div class="row">
    <div class="medium-3 column">
        To display your spells please choose a class or filter by name or school
        <select id="class" v-model="selected" @change="changeSpells()">
          <option value="">Please Choose a class</option>
          <option  v-for="cclass in classes" v-bind:value="cclass.shortName"> {{ cclass.displayName }} </option>
        </select>
        </div>
    <div class="medium-3 column">
        <br>
      <label>Start typing to search magic items
        <input id="spellFilter" v-model="filterSpellName" type="text" placeholder="Spell Name"  v-on:keyup="filterSpellList()" @change="filterSpellList()"/>
      </label>
    </div>
    <div class="medium-3 column">
          <br>
          Pick a school to filter 
          <select id="class" v-model="schoolFilter" @change="filterBySchool()">
            <option value="">Filter by Slot</option>
            <option  v-for="school in schools" v-bind:value="school"> {{ school }} </option>
          </select>
        </div>
  </div>
  <div class="row" style="text-align:left;" >
    <div class="medium-2" v-for="(entry, index) in currentSpells" v-if="entry.length > 0">
      <div >
        <b v-on:click="expandSpells(index)">Spell Level {{index}}</b><br/>
        <div :id="['spellLevel'+index]" style="display:none">
          <div  class="spell" v-for="spell in entry" v-on:click="openModal(spell)">
            {{spell.name}}
          </div>
        </div>
      </div>
    </div>
  </div>	
  <div class="row">
    <div class="medium-2" style="text-align:left">
        <div>
          <span v-for="spell in filterSpells" v-if="filterSpells.length > 0" v-on:click="loadSpell(spell)">{{spell.name}} <br/></span>
        </div>
    </div>
    <div class="medium-10" v-if="filterSpell" style="text-align:left">
      <b>Name:</b> {{filterSpell.name}}<br/>
      <b>School:</b> {{filterSpell.school}} <span v-if="filterSpell.subschool"><b>Sub School:</b> {{filterSpell.subschool}}</span><br/>
      <span v-if="filterSpell.descriptor"><b>Descriptor:</b> {{filterSpell.descriptor}}<br/></span>
      <b>Cast Time:</b> {{filterSpell.casting_time}}<br/>
      <b>Range:</b> {{filterSpell.range}}  <span v-if="filterSpell.area"><b>Area:</b> {{filterSpell.area}}</span><br/>
      <span v-if="filterSpell.targets"><b>Targets:</b> {{filterSpell.targets}}<br/></span>
      <span v-if="filterSpell.effect"><b>Effect:</b> {{filterSpell.effect}}<br/></span>
      <span style="font-size:18px;font-weight:700" v-if="filterSpell.effect" >TLDR;</span> {{filterSpell.short_description}}<br/>
      <b>Components:</b> <span v-for="comp in filterSpell.components"> {{comp}},</span></br/>
      <div v-if="filterSpell.domain"><b>Domain:</b> <span v-for="dom in filterSpell.domain"> {{dom}}</span><br/></div>
      <b>Duration:</b> {{filterSpell.duration}}<br/>
      <b>Saving Throw:</b> {{filterSpell.saving_throw}}  <b>Spell Resistence:</b> {{filterSpell.spell_resistence}}<br/>
      <b>Dismissible:</b> {{filterSpell.dismissible}}<br/>
      <b>Shapeable:</b> {{filterSpell.shapeable}}<br/>
      <b>Description:</b> {{filterSpell.description}}<br/>
      <br/>
      <div v-if="filterSpell.mythic_text"><b>Mythic Effect:</b> {{filterSpell.mythic_text}}</div>
      <br/>
      Source: {{filterSpell.source}}<br/>

    </div>
  </div>
  <spellModal v-if="showModal" @close="showModal = false" :modalspell="chosenSpell">
      
  </spellModal>
</div>
</template>

<script>
import spellModal from './spell-modal.vue'
import axios from 'axios';
import $ from "jquery";

String.prototype.startsWithI = function(s) {
  return this.toLowerCase().startsWith(s.toLowerCase())
}

var isSpellForClass = function (id, spell) {
	var spellLevel = spell.spellLevel[id];
	if(spellLevel > -1) {
		return true;
	} else {
		return false;
	}
}

var spellLevelForClass = function (id, spell) {
  return spell.spellLevel[id];
}

var sortSpells = function(a, b) {
   	if(a.name < b.name) return -1;
    if(a.name > b.name) return 1;
    return 0;
  
}


export default {
  name: 'spells',
  components: {spellModal},
  data: function() {
      return {
        classes: [],
        spells: [],
        currentSpells: [],
        selected : '',
        showModal: false,
        chosenSpell: '',
        filterSpells: [],
        schools: [],
        filterSpell: '',
        filterSpellName: "", 
        schoolFilter: "" 
      }
  },
  methods: {
    changeSpells: function () { 
      this.filterSpells = [];
    	this.currentSpells = []; 
      var n = 11;
      for (var i = 0; i < n; i++)
        this.currentSpells.push(new Array());       
	   var arrayLength = this.spells.length;
     var spellLevel = -1;
		 for (var i = 0; i < arrayLength; i++) {
        spellLevel = spellLevelForClass(this.selected, this.spells[i]);
		    if(spellLevel > -1) {
		    	this.currentSpells[spellLevel].push(this.spells[i]);
		    }
    		
		 }
     for (var i = 0; i < n; i++)
        this.currentSpells[i].sort(function(a, b){return sortSpells(a,b)});
    },
    openModal: function(spell) {
       this.chosenSpell = spell; 
       this.showModal = true;
    },
    expandSpells: function(index) {
      var id = "#spellLevel"+index;
      $(id).toggle()
    },
    populateSchools: function() {
      var arrayLength = this.spells.length;
      for (var i=0; i < arrayLength; i++) {
        if(!this.schools.includes(this.spells[i].school.trim().toLowerCase())) {
          this.schools.push(this.spells[i].school.trim().toLowerCase());
        }
      }
      this.schools.sort();
    },
    filterBySchool: function() {
      this.currentSpells = [];
      this.filterSpells = []; 
      var arrayLength = this.spells.length;
		    for (var i = 0; i < arrayLength; i++) {        
		      if(this.spells[i].school.toLowerCase() == (this.schoolFilter)) {
		    	  this.filterSpells.push(this.spells[i]);
		      }
    		}
        this.filterSpells.sort(function(a, b){return sortSpells(a,b)});
    },
    filterSpellList: function () { 
      this.currentSpells = [];
      this.filterSpells = []; 
      if(this.filterSpellName) {
        var arrayLength = this.spells.length;
		    for (var i = 0; i < arrayLength; i++) {        
		      if(this.spells[i].name.startsWithI(this.filterSpellName)) {
		    	  this.filterSpells.push(this.spells[i]);
		      }
    		}
        this.filterSpells.sort(function(a, b){return sortSpells(a,b)});
      }
    },
    loadSpell: function(spell) {
      this.filterSpell = spell;
    }    
  },
  mounted() {
    axios.get("./json/classes.json")
    .then(response => {this.classes = response.data});
    axios.get("./json/spells.json").then(
      response => {this.spells = response.data;
      this.populateSchools();    
    });
  }
}

</script>