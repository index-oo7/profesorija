<script setup>
import { ref } from 'vue';

props = defineProps({
    modal:{
        naziv: String,
        sadrzaj: String
    }
})

</script>

<template>
    <div class="modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">{{ modal.naziv }}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>{{ modal.sadrzaj }}</p>
            </div>
            <!-- <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div> -->
        </div>
    </div>
    </div>
</template>

<style scoped>
</style>