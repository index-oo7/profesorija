<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
    modal:{
        naziv: String,
        sadrzaj: Array,
        show: Boolean
    }
})

// modalShow = ref(false);

// beforeMounted(() => {
//     modalShow.value = true; 
// })

</script>

<template v-if:props.modal.show>
    <div class="modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">{{ props.modal.naziv }}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>{{ props.modal.sadrzaj }}</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click = "props.modal.show = false">Zatvori</button>
            </div>
        </div>
    </div>
    </div>
</template>

<style scoped>
</style>