<template>
    <div class="container" id="app">
<div class="row">
	<div class="medium-3 column">
       <br>
       <label>Start typing to search monsters
        <input id="monsterFilter" v-model="monsterFilter" type="text" placeholder="Monster Name"  v-on:keyup="filterMonsters()" @change="filterMonsters()"/>
      </label>
  </div>
  <div class="medium-3 column">
    <br>
    Filter by CR
    <select id="class" v-model="crSelected" @change="filterByCR()">
      <option value="">CR</option>
      <option  v-for="(cr,index) in crs" v-bind:value="cr" :key="cr"> {{ cr }} </option>
    </select>
  </div>
  <div class="medium-3 column">
    <br>
    Filter by Type
    <select id="class" v-model="typeSelected" @change="filterByType()">
      <option value="">Type</option>
      <option  v-for="(type,index) in types" v-bind:value="type" :key="type"> {{ type }} </option>
    </select>
  </div>
  <div class="medium-3 column">
    <br>
    Filter by Environment
    <select id="class" v-model="envSelected" @change="filterByEnv()">
      <option value="">Environment</option>
      <option  v-for="(env, index) in envs" v-bind:value="env" :key="env"> {{ env }} </option>
    </select>
  </div>
    
</div>
<div class="row">
  <div class="medium-2" style="text-align:left">
      <div v-if="currentMonsters.length > 0">
        <span v-for="(monster, index) in currentMonsters"  v-on:click="loadMonster(monster)" :key="monster.name">{{monster.name}} <br/></span>
      </div>
  </div>
  <div class="medium-10" v-if="chosenMonster" style="text-align:left">
   
      <h4> {{chosenMonster.name}}</h4> 
      <b>XP:</b> {{chosenMonster.xp}} <b>CR:</b> {{chosenMonster.cr}} <br/> 
      {{chosenMonster.alignment}} {{chosenMonster.size}} {{chosenMonster.type}} {{chosenMonster.subType}}<br/>
      <b>Init:</b> <span v-if="chosenMonster.ref > 0">+</span>{{chosenMonster.init}}; <b>Senses:</b> {{chosenMonster.senses}}<br/>
      <b>Aura:</b>{{chosenMonster.aura}}<br/>
      <h4 class="monsterh4">DEFENSE</h4>
      <b>AC:</b> <span v-for="(ac, index) in chosenMonster.ac" :key="ac">{{ac}},</span> {{chosenMonster.acMods}}<br/>
      <b>HP:</b> {{chosenMonster.hp}} {{chosenMonster.hd}}<br/>
      <b>Saves:</b> Fort: <span v-if="chosenMonster.fort > 0">+</span>{{chosenMonster.fort}} Ref:<span v-if="chosenMonster.ref > 0">+</span>{{chosenMonster.ref}}
      Will: <span v-if="chosenMonster.will > 0">+</span>{{chosenMonster.will}}<br/>
      <b>DR:</b> {{chosenMonster.dr}}<br/>
      <b>Immunities:</b> {{chosenMonster.immune}}<br/>
      <b>Resist:</b> {{chosenMonster.resist}}<br/>
      <b>Weakness:</b> {{chosenMonster.weakness}}<br/>

      <h4 class="monsterh4">OFFENSE</h4>
      <b>Speed:</b> {{chosenMonster.speed}}<br/>
      <b>Melee:</b> {{chosenMonster.melee}}<br/>
      <b>Ranged:</b>  {{chosenMonster.ranged}}<br/>
      <b>Space:</b>  {{chosenMonster.space}}<br/>
      <b>Reach:</b>  {{chosenMonster.reach}}<br/>
      <b>Special Attacks:</b>  {{chosenMonster.SpecialAttacks}}<br/>
      <span v-if="chosenMonster.spellLikeAbilities"><b>Spell Like Abilities</b><br/></span>
      <div style="margin-left:15px;" v-if="chosenMonster.spellLikeAbilities">
        <div v-for="(sla, index) in chosenMonster.spellLikeAbilities" :key="sla.name"><b>{{sla.name}} {{sla.casterLevel}} {{sla.concentration}}</b> <span style="text-decoration:underline;color:blue;margin-right: 5px;" v-on:click="openModalSpell(spell)" :key="spell.name" v-for="(spell, index) in sla.abilities">{{spell.trim()}}</span></div>
      </div>

      <span v-if="chosenMonster.spellsKnown"><b>Spells Known:</b><br/></span>
      <div style="margin-left:15px;">
          <div v-for="(sla, index) in chosenMonster.spellsKnown" :key="sla.name"><b>{{sla.name}} {{sla.casterLevel}} {{sla.concentration}}</b> <span style="text-decoration:underline;color:blue;margin-right: 5px;" v-on:click="openModalSpell(spell)" :key="spell.name" v-for="(spell, index) in sla.abilities">{{spell.trim()}}</span></div>    
      </div>

      <span v-if="chosenMonster.spellsPrepared"><b>Spells Prepared:</b><br/></span>
      <div style="margin-left:15px;" v-if="chosenMonster.spellsPrepared">
          <div v-for="(sla, index) in chosenMonster.spellsPrepared" :key="sla.name"><b>{{sla.name}} {{sla.casterLevel}} {{sla.concentration}}</b> <span style="text-decoration:underline;color:blue;margin-right: 5px;" v-on:click="openModalSpell(spell)" :key="spell.name" v-for="(spell, index) in sla.abilities">{{spell.trim()}}</span></div>
      </div>
      <span v-if="chosenMonster.spellDomains"><b>Domains:</b> {{chosenMonster.spellDomains}}   D domain spell</span>
      <h4 class="monsterh4">STATISTICS</h4>
      <span v-for="(stat, index) in chosenMonster.abilitiyScores" :key="stat"><b>{{stat.trim().substring(0,3)}}: </b>{{stat.trim().substring(3)}} </span><br/>
      <b>Base Atk:</b> <span v-if="chosenMonster.baseAtk > 0">+</span> {{chosenMonster.baseAtk}} <b>CMB:</b> <span v-if="chosenMonster.cmb > 0">+</span> {{chosenMonster.cmb}} 
      <b>CMD:</b>  {{chosenMonster.cmd}} <br/>
      <b>Feats:</b> <span style="text-decoration:underline;color:blue;margin-right: 5px;"  :key="index" v-for="(feat, index) in chosenMonster.feats" v-on:click="openModal(feat)" >{{feat.trim()}}</span> &nbsp; <br/>
      <b>Skills:</b> <span v-for="(skill, index) in chosenMonster.skills"  :key="skill.name" v-on:click="loadSkill(skill)" style="text-decoration:underline;color:blue;margin-right: 5px;">{{skill}}</span><br/>
      <b>Languages:</b> <span v-for="(lang, index) in chosenMonster.languages" :key="lang">{{lang}}</span><br/>
      <b>SQ:</b> {{chosenMonster.sq}}<br/>
      <b>Gear:</b> {{chosenMonster.gear}}<br/>
      <b>Other Gear:</b> {{chosenMonster.otherGear}}<br/>
      <h4 class="monsterh4">Special Abilities</h4>
      {{chosenMonster.specialAbilities}}<br/>
      
      <h4 class="monsterh4">ECOLOGY</h4>
      <b>Environment:</b> {{chosenMonster.environment}}<br/>
      <b>Organization:</b> {{chosenMonster.org}}<br/>
      <b>Treasure:</b> {{chosenMonster.treasure}} <a href="http://paizo.com/pathfinderRPG/prd/ultimateEquipment/appendix.html">Treasure Generator</a><br/>
      <h4 class="monsterh4">DESCRIPTION</h4>
      <span v-if="chosenMonster.description"><b>Description:</b> {{chosenMonster.description}}<br/></span>

    
      
      <b>Source:</b> {{chosenMonster.source}}<br/>
      <br/>

  </div>
</div>
<featModal v-if="showModal" @close="showModal = false" :modalfeat="chosenFeat">

</featModal>
<skillModal v-if="showModalSkill" @close="showModalSkill = false" :modalskill="chosenSkill">
    
</skillModal>
<spellModal v-if="showModalSpell" @close="showModalSpell= false" :modalspell="chosenSpell">
      
</spellModal>

</div>
</template>
<script>
import spellModal from './spell-modal.vue'
import featModal from './feat-modal.vue'
import skillModal from './skill-modal.vue'
import axios from 'axios';
import $ from "jquery";

var sortMonsters = function(a, b) {
   	if(a.name < b.name) return -1;
    if(a.name > b.name) return 1;
    return 0;
  
}

var sortNumber = function(a,b) {
    return a - b;
}

export default {
  name: 'monsters',
  components: {spellModal, featModal, skillModal},
  data: function() {
    return {
        monsters: [],
        currentMonsters: [],
        showModal: false,
        showModalSpell: false,
        showModalSkill: false,
        chosenMonster: '',
        monsterFilter: '' ,
        crs: [],
        crSelected: "",
        types: [],
        envs:["Any", "Aquatic", "Coastline", "Desert", "Forest", "Hills", "Jungles", "Mountains", "Ocean", "Sea", "Plains", "River", "Lakes", "Marsh", "Swamp", "Underground", "City", "Urban", "Extraplanar"],
        envSelected: "",
        typeSelected: "",
        feats: [],
        chosenFeat: "",
        spells: [],
        chosenSpell: "",
        skills: [],
        chosenSkill: '',
        umrs: [],
        chosenUmr: ''
    }
    
       
  },
  methods: {
    filterMonsters: function () { 
      this.currentMonsters = []; 
      if(this.monsterFilter) {
        var arrayLength = this.monsters.length;
		    for (var i = 0; i < arrayLength; i++) {        
		      if(this.monsters[i].name.startsWithI(this.monsterFilter)) {
		    	  this.currentMonsters.push(this.monsters[i]);
		      }
    		}
        this.currentMonsters.sort(function(a, b){return sortMonsters(a,b)});
      }	    
    },
    loadMonster: function(monster) {
      this.chosenMonster = monster;
    },
    populateCRs: function() {
      var arrayLength = this.monsters.length;
      for (var i=0; i < arrayLength; i++) {
        if(!this.crs.includes(this.monsters[i].cr)) {
          this.crs.push(this.monsters[i].cr);
        }
      }
      this.crs.sort(sortNumber);
    },
    populateTypes: function() {
      var arrayLength = this.monsters.length;
      for (var i=0; i < arrayLength; i++) {
        if(!this.types.includes(this.monsters[i].type.trim().toLowerCase())) {
          this.types.push(this.monsters[i].type.trim().toLowerCase());
        }
      }
      this.types.sort();
    },
    filterByCR: function() {
      this.currentMonsters = []; 
      var arrayLength = this.monsters.length;
		    for (var i = 0; i < arrayLength; i++) {        
		      if(this.monsters[i].cr == (this.crSelected)) {
		    	  this.currentMonsters.push(this.monsters[i]);
		      }
    		}
        this.currentMonsters.sort(function(a, b){return sortMonsters(a,b)});
    },
    filterByType: function() {
      this.currentMonsters = []; 
      var arrayLength = this.monsters.length;
		    for (var i = 0; i < arrayLength; i++) {        
		      if(this.monsters[i].type.toLowerCase() == (this.typeSelected)) {
		    	  this.currentMonsters.push(this.monsters[i]);
		      }
    		}
        this.currentMonsters.sort(function(a, b){return sortMonsters(a,b)});
    },
    filterByEnv: function() {
      this.currentMonsters = []; 
      var arrayLength = this.monsters.length;
		    for (var i = 0; i < arrayLength; i++) {        
		      if(this.monsters[i].environment.toLowerCase().includes(this.envSelected.toLowerCase())) {
		    	  this.currentMonsters.push(this.monsters[i]);
		      }
    		}
        this.currentMonsters.sort(function(a, b){return sortMonsters(a,b)});
    },
    openModal: function(feat) {
      var arrayLength = this.feats.length;
      var featName = feat.toLowerCase().trim();
      if(featName.includes("(")) {
        featName = featName.substring(0, featName.indexOf("("));
        featName = featName.trim();
      }
      
      for (var i = 0; i < arrayLength; i++) {        
		      if(this.feats[i].name.toLowerCase().startsWithI(featName)) {
		    	  this.chosenFeat = this.feats[i];
            break;
		      }
    		}
       this.showModal = true;
    },
    openModalSpell: function(spell) {
      var arrayLength = this.spells.length;
      var spellName = spell.toLowerCase().trim();
      if(spellName.includes("(")) {
        spellName = spellName.substring(0, spellName.indexOf("("));
        spellName = spellName.trim();
      }
      
      for (var i = 0; i < arrayLength; i++) {        
		      if(this.spells[i].name.toLowerCase().startsWithI(spellName)) {
		    	  this.chosenSpell = this.spells[i];
            break;
		      }
    		}
       this.showModalSpell = true;
    },
    loadSkill: function(skill) {
      var arrayLength = this.skills.length;
      var skillName = skill;
      if(skillName.includes("(")) {
        skillName = skillName.substring(0, skillName.indexOf("("));
        skillName = skillName.trim();
      }
      if(skillName.includes("+")) {
        skillName = skillName.substring(0, skillName.indexOf("+"));
        skillName = skillName.trim();
      }
        for (var i = 0; i < arrayLength; i++) {        
		      if(this.skills[i].name.toLowerCase().startsWithI(skillName)) {
		    	  this.chosenSkill = this.skills[i];
            break;
		      }
        }
        this.showModalSkill = true;
      
    }   
  },
  mounted() {
    axios.get("./json/monsters.json")
    .then(response => {this.monsters = response.data;
     this.populateCRs();
     this.populateTypes();
    });
    axios.get("./json/feats.json")
    .then(response => {this.feats = response.data});
    axios.get("./json/skills.json")
    .then(response => {this.skills = response.data;    });
    axios.get("./json/spells.json").then(
      response => {this.spells = response.data;    
    });
  }
};

</script>