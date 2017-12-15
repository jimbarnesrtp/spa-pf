<template>
<div class="container" id="app">
        <div class="row">
            <div class="medium-3 column">
            <br>
            <label>Start typing to search Feats, skills, Universal Monster Rules, and spells
                <input id="filterText" v-model="filterText" type="text" placeholder="Search Name"  v-on:keyup="filter()" @change="filter()"/>
            </label>
            </div>
        </div>
        <div class="row">
            <div class="medium-2" style="text-align:left">
                <div>
                    <b>Feats:</b><br/>
                    <span v-for="feat in currentFeats" v-if="currentFeats.length > 0" v-on:click="loadFeat(feat)">{{feat.name}}-{{feat.type}} <br/></span>
                    <br/>

                    <b>Magic Items:</b><br/>
                        <span v-for="(item, index) in currentItems" :key="item.name"  v-on:click="loadItem(item)">{{item.name}} <br/></span>
                    <br/>

                    <b>Spells:</b><br/>
                    <span v-for="spell in currentSpells" v-if="currentSpells.length > 0" v-on:click="loadSpell(spell)">{{spell.name}} <br/></span>

                    <br/>

                    <b>Universal Monster Rules</b><br/>
                    <span v-for="(umr, index) in currentUmrs"  :key='umr.name' v-on:click="loadUmr(umr)">{{umr.name}}<br/></span>
                    <br/>

                    <b>Skills</b><br/>
                    <span v-for="(skill, index) in currentSkills"  :key='skill.name' v-on:click="loadSkill(skill)">{{skill.name}}<br/></span>
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
            <div class="medium-10 column" v-if="chosenSkill">
   
                <iframe height="100%" width="100%" :src="chosenSkill.url" frameborder="1" allowfullscreen></iframe>
            </div>
            <div class="medium-10" v-if="chosenUmr">
                <b>Name:</b> {{chosenUmr.name}}<br/>
                {{chosenUmr.text}} <br/>
                <span v-if="chosenUmr.format"><b>Format:</b> {{chosenUmr.format}}<br/></span>
                <span v-if="chosenUmr.faq"><b>FAQ:</b> {{chosenUmr.faq}}<br/></span>
                
                <span v-if="chosenUmr.html"> <iframe height="100%" width="100%" :src="chosenUmr.html" frameborder="1" allowfullscreen></iframe><br/></span>
                
                <br/>
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
import axios from 'axios';

var sortFeats = function(a, b) {
    if(a.name < b.name) return -1;
      if(a.name > b.name) return 1;
      return 0;
    
  }

export default {
   name: 'all',  
  data: function() {
      return {
        feats: [],
        spells: [],
        umrs: [],
        items: [],
        currentFeats: [],
        currentItems: [],
        currentSkills: [],
        currentUmrs: [],
        currentSpells: [],
        showModal: false,
        chosenFeat: '',
        chosenSkill: '',
        chosenUmr: '',
        chosenItem: '',
        filterSpell: '',
        filterText: '', 
      }
  },  
  methods: {
    filter: function() {
        if(filterText.value == "") {
          this.currentFeats = [];
          this.currentItems = [];
          this.currentSkills = [];
          this.currentUmrs = [];
          this.currentSpells = [];
        } else { 
          this.filterFeats();
          this.filterItems();
          this.filterUmrs();
          this.filterSkills();
          this.filterSpells();
        }
        

    },
    clearDisplay: function() {

        this.chosenFeat = '';
        this.chosenSkill = '';
        this.chosenUmr = '';
        this.chosenItem = '';
        this.filterSpell = '';
    },
    filterFeats: function () { 
      this.currentFeats = []; 

	    var arrayLength = this.feats.length;
		  for (var i = 0; i < arrayLength; i++) {
        
		    if(this.feats[i].name.startsWithI(this.filterText)) {
		    	this.currentFeats.push(this.feats[i]);
		    }
    		
		  }
      this.currentFeats.sort(function(a, b){return sortFeats(a,b)});
    },
    loadFeat: function(feat) {
      this.clearDisplay();
      this.chosenFeat = feat;
    },
    filterItems: function () { 
      this.currentItems = []; 
      if(this.filterText) {
        var arrayLength = this.items.length;
		    for (var i = 0; i < arrayLength; i++) {        
		      if(this.items[i].name.startsWithI(this.filterText)) {
		    	  this.currentItems.push(this.items[i]);
		      }
    		}
        this.currentItems.sort(function(a, b){return sortFeats(a,b)});
      }	    
    },
    loadItem: function(item) {
        this.clearDisplay();
      this.chosenItem = item;
    },
    filterUmrs: function () { 
      this.currentUmrs = []; 

	    var arrayLength = this.umrs.length;
		  for (var i = 0; i < arrayLength; i++) {
        
		    if(this.umrs[i].name.startsWithI(this.filterText)) {
		    	this.currentUmrs.push(this.umrs[i]);
		    }
    		
		  }
      this.currentUmrs.sort(function(a, b){return sortFeats(a,b)});
    },
    loadUmr: function(umr) {
        this.clearDisplay();
      this.chosenUmr = umr;
    },
    filterSpells: function () { 
      this.currentSpells = []; 
      if(this.filterText) {
        var arrayLength = this.spells.length;
		    for (var i = 0; i < arrayLength; i++) {        
		      if(this.spells[i].name.startsWithI(this.filterText)) {
		    	  this.currentSpells.push(this.spells[i]);
		      }
    		}
        this.currentSpells.sort(function(a, b){return sortFeats(a,b)});
      }
    },
    loadSpell: function(spell) {
        this.clearDisplay();
      this.filterSpell = spell;
    },
    filterSkills: function () { 
      this.currentSkills = []; 
      if(this.filterText) {
        var arrayLength = this.skills.length;
		    for (var i = 0; i < arrayLength; i++) {        
		      if(this.skills[i].name.startsWithI(this.filterText)) {
		    	  this.currentSkills.push(this.skills[i]);
		      }
    		}
        this.currentSkills.sort(function(a, b){return sortFeats(a,b)});
      }
    },
    loadSkill: function(skill) {
        this.clearDisplay();
      this.chosenSkill = skill;
    }
   
  },
  mounted() {
    axios.get("./json/feats.json").then(response => {this.feats = response.data});
    axios.get("./json/spells.json").then(response => {this.spells = response.data});
    axios.get("./json/umr.json").then(response => {this.umrs = response.data; this.umrs = response.data}) ;
    axios.get("./json/magicitems.json").then(response => {this.items = response.data});
    axios.get("./json/skills.json").then(response => {this.skills = response.data;})
  }
}
</script>