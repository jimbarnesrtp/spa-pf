<template>
    <div id="skillModal" >
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
    
                    <div class="modal-header">
                        <slot name="header">
                            <button class="modal-default-button" @click="$emit('close')">
                                Close
                            </button>
                            </slot>
                    </div>
                    <div class="modal-body">
                        <slot name="body">
                            <iframe style="min-width:600px;min-height:400px;" width="100%" height="100%" :src="modalskill.url" frameborder="1" allowfullscreen></iframe>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
export default {
  name: 'skillModal',
  props: ['modalskill']
}
</script>