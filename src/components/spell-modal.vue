<template>
    <div id="spell-modal" style="text-align:left">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <slot name="header">
                            <b>Name:</b>{{modalspell.name}} <button class="modal-default-button" @click="$emit('close')">
                            Close
                            </button>
                        </slot>
                    </div>

                    <div class="modal-body">
                        <slot name="body">
                            <b>School:</b> {{modalspell.school}} <span v-if="modalspell.subschool"><b>Sub School:</b> {{modalspell.subschool}}</span><br/>
                            <span v-if="modalspell.descriptor"><b>Descriptor:</b> {{modalspell.descriptor}}<br/></span>
                            <b>Cast Time:</b> {{modalspell.casting_time}}<br/>
                            <b>Range:</b> {{modalspell.range}}  <span v-if="modalspell.area"><b>Area:</b> {{modalspell.area}}</span><br/>
                            <span v-if="modalspell.targets"><b>Targets:</b> {{modalspell.targets}}<br/></span>
                            <span v-if="modalspell.effect"><b>Effect:</b> {{modalspell.effect}}<br/></span>
                            <span style="font-size:18px;font-weight:700" v-if="modalspell.effect" >TLDR;</span> {{modalspell.short_description}}<br/>
                            <b>Components:</b> <span v-for="comp in modalspell.components"> {{comp}},</span></br/>
                            <div v-if="modalspell.domain"><b>Domain:</b> <span v-for="dom in modalspell.domain"> {{dom}}</span><br/></div>
                            <b>Duration:</b> {{modalspell.duration}}<br/>
                            <b>Saving Throw:</b> {{modalspell.saving_throw}}  <b>Spell Resistence:</b> {{modalspell.spell_resistence}}<br/>
                            <b>Dismissible:</b> {{modalspell.dismissible}}<br/>
                            <b>Shapeable:</b> {{modalspell.shapeable}}<br/>
                            <b>Description:</b> {{modalspell.description}}<br/>
                            <br/>
                            <div v-if="modalspell.mythic_text"><b>Mythic Effect:</b> {{modalspell.mythic_text}}</div>
                            <br/>
                            Source: {{modalspell.source}}<br/>
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
  name: 'spellModal',
  props: ['modalspell']
}
</script>