<template>
  <div id="feat-modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container" style="text-align:left">

            <div class="modal-header">
              <slot name="header">
                <b>Name:</b>{{modalfeat.name}} <button class="modal-default-button" @click="$emit('close')">
                  Close
                </button>
              </slot>
            </div>

            <div class="modal-body">
              <slot name="body">
                <b>Type:</b> {{modalfeat.type}} <br/>
                <span v-if="modalfeat.description"><b>Description:</b> {{modalfeat.description}}<br/></span>
                <span v-if="modalfeat.prereq"><b>Pre-Requisite:</b> {{modalfeat.prereq}}<br/></span>
                <span v-if="modalfeat.prerequisiteFeats"><b>Pre-Requisite Feats:</b> {{modalfeat.rerequisiteFeats}}<br/></span>
                <span v-if="modalfeat.prerequisiteSkills"><b>Pre-Requisite Feats:</b> {{modalfeat.rerequisiteSkills}}<br/></span>
                <b>Benefit:</b> {{modalfeat.benefit}}  <br/>
                <span v-if="modalfeat.normal"><b>Normal:</b> {{modalfeat.normal}}<br/></span>
                <span v-if="modalfeat.special"><b>Special:</b> {{modalfeat.special}}<br/></span>
                <span v-if="modalfeat.Teamwork"><b>Teamwork</b></span> <span v-if="modalfeat.critical"><b>Critical</b></span> <span v-if="modalfeat.grit"><b>Grit</b></span>
                <span v-if="modalfeat.style"><b>Style</b></span> <span v-if="modalfeat.performance"><b>Performance</b></span> <span v-if="modalfeat.multiples"><b>Multiples</b></span>
                <span v-if="modalfeat.panache"><b>Panache</b></span> <span v-if="modalfeat.betrayal"><b>Betrayal</b></span> <span v-if="modalfeat.targetting"><b>Targetting</b></span></br>
                <span v-if="modalfeat.racial"><b>Racial:</b> {{modalfeat.raceName}}</br></span>
                <span v-if="modalfeat.goal"><b>Racial:</b> {{modalfeat.goal}}</br></span>
                <span v-if="modalfeat.racial"><b>Racial:</b> {{modalfeat.raceName}}</br></span>
                <span v-if="modalfeat.completionBonus"><b>Completion Bonus:</b> {{modalfeat.completionBonus}}</br></span>
                Source: {{modalfeat.source}}<br/>
                <br/>
                

              </slot>
            </div>
            
          </div>
        </div>
      </div>
  </div>
</template>

<script>


export default {
  name: 'featModal',
  props: ['modalfeat']
}
</script>