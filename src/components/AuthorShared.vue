<script setup>
import { computed, onBeforeMount, reactive, ref  } from 'vue'
import { mdiClose, mdiPlusBox, mdiMinusBox, mdiEmailPlusOutline } from '@mdi/js'
import JbButton from '@/components/JbButton.vue'
import JbButtons from '@/components/JbButtons.vue'
import CardComponent from '@/components/CardComponent.vue'
import Level from '@/components/Level.vue'
import TextLink from '@/components/TextLink.vue'
import Overlay from '@/components/Overlay.vue'
import Field from "@/components/Field.vue";
import { rigidStore } from "../stores/rigid";
import Control from "@/components/Control.vue";
import { themeStore } from "../stores/theme";
import dayjs from 'dayjs';
import { current } from 'tailwindcss/colors'
const theme = themeStore();

const rigid = rigidStore();


const props = defineProps({
  author:Array,
  title: {
    type: String,
    default: null
  },
  id: {
    type: Number,
  },
  button: {
    type: String,
    default: 'info'
  },
  buttonLabel: {
    type: String,
    default: 'Add'
  },
  shake: Boolean,
  hasCancel: Boolean,
  textLinkLabel: {
    type: String,
    default: null
  },
  textLinkIcon: {
    type: String,
    default: null
  },
  modelValue: {
    type: [String, Number, Boolean],
    default: null
  }
})
const hasError = ref(false)


const recs = computed(() => props.author);
console.log("recs",recs.value.id)




const emit = defineEmits(['update:modelValue', 'cancel', 'confirm'])
const currentPage = ref(1)
const value = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const confirmCancel = mode => {
  value.value = false
  emit(mode)
}
const cancel = () => {
  confirmCancel('cancel')
  // location.reload()
  }

const confirm =async() =>{
    await rigid.getaccept()
}

const shared=computed(()=>{
   return rigid.author  
})
console.log("hrfoc",shared);

onBeforeMount(async (page) => {
  await rigid.getshared(recs.value.id)
   
})
</script>

<template>
  <overlay
  >
    <card-component
      class="shadow-lg w-full max-h-modal md:w-3/5 z-50"
       title="Author data" 
      :header-icon="mdiClose"
      @header-icon-click="cancel"
    >
      <div class="pl-4 space-y-3 overflow-y-scroll">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      
     <field  label="Counselor name"   v-for="(client, index) in shared"
        :key="index"  > 
    <h1 class=" border-1 dark:bg-gray-800 rounded  text-white text-lg cursor-not-allowed text-center h-[40px] leading-8">{{client.shared_counselor}}</h1> 
    </field>
    <field   label=" count"  v-for="(client, index) in shared"
        :key="index" class="mb-0" >
          <control
          :icon-left="mdiPound"
           v-model="client.count"
           type="number"
           min=0 
          
            />
          </field>

          <div v-for="(client, index) in shared"
        :key="index" class="mt-7" >
          <jb-button
          v-if="client.status==2"
        label="Aceepted"
         color="success"
          />

     <jb-button
      v-if="client.status==3"
       label="Rejected"
       color="danger"/>
 
     <jb-button
      v-if="client.status==4"
       label="Accepted and Move"
       color="info"/>
 
     <jb-button
     v-else
       label="no enq data"
    class="bg-gray-600"/>


  </div>
 </div>

  
      </div>


    </card-component>
  </overlay>
</template>