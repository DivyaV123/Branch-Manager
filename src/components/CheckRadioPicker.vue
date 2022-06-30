<script setup>
import { computed ,onMounted,ref} from 'vue'
import { batchplanStore } from "../stores/batchplan1";
const batchplan = batchplanStore();

const props = defineProps({
  courseid:'',
  subject:'',
  options: {
    type: Object,
    default: () => {}
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'checkbox',
  },
  column: Boolean,
  modelValue: {
    type: [Object, Array, String, Number],
    default: null
  }
})

const items = computed(() => props.subject)
const items2 = computed (()=>props.courseid)

// console.log("data",items2);

const emit = defineEmits(['update:modelValue'])

const computedValue = computed({
  get: () => props.modelValue,
  set: value => {
    emit('update:modelValue', value)
  }
})
// console.log("computedValue",computedValue);
// console.log("emit",emit);

const checkData = computed (()=> batchplan.pullEnqFrom)

onMounted(async() => {
  if(items.value != null){
    batchplan.getPullEnqFrom(items.value)
  }
  
})
const inputType = computed(() => props.type === 'radio' ? 'radio' : 'checkbox')


</script>

<template>
  <div
    class="flex justify-start flex-wrap -mb-3"
    :class="{'flex-col items-start':column}"
   
  >
    <label
      v-for="(value, key) in checkData"
      :key="key"
      :class="type"
      class="mr-6 mb-3 last:mr-0"
    >
    <!-- <div v-if="items==value.id"> -->
      <input
       v-if="items2!==value.id "
        v-model="computedValue"
        :type="inputType"
        :name="options"
        
      >

      <span class="check" />
      <span class="control-label" v-if="items2!==value.id">{{ value.name }}</span>
      <!-- </div> -->
    </label>
  </div>
</template>
