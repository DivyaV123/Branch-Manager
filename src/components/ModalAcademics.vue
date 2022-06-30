<script setup>
import { computed, reactive,onBeforeMount  } from 'vue'
import { mdiClose } from '@mdi/js'
import JbButton from '@/components/JbButton.vue'
import JbButtons from '@/components/JbButtons.vue'
import CardComponent from '@/components/CardComponent.vue'
import Level from '@/components/Level.vue'
import TextLink from '@/components/TextLink.vue'
import Overlay from '@/components/Overlay.vue'
import {selectClasses} from "../selectcss"
import Field from "@/components/Field.vue";
import TitleSubBar from "@/components/TitleSubBar.vue";
import CheckRadioPicker from "@/components/CheckRadioPicker.vue";
import { counselorStore } from "../stores/counselor";
import Multiselect from "@vueform/multiselect";
import Control from "@/components/Control.vue";
import { themeStore } from "../stores/theme"
const counselor = counselorStore();
const theme = themeStore();


onBeforeMount(async () => {
  await counselor.getAcademicValues();
});

const props = defineProps({
  title: {
    type: String,
    default: null
  },
  id: {
    type: Number,
  },
  academics: {
    type: Array
  },
  highest_degree: {
    type: Object,
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

const highestdegree = computed(() => counselor.highestdegree);
const degree = computed(() => counselor.degree);
const masters = computed(() => counselor.masters);

const emit = defineEmits(['update:modelValue', 'cancel', 'confirm'])

const value = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const confirmCancel = mode => {
  value.value = false
  emit(mode)
}
const dip = reactive({
  percentage: null,
  stream_object: null,
  college_object: null,
});
const deg = reactive({
  name: null,
  percentage: null,
  stream_object: null,
  college_object: null,
});

const mast = reactive({
  name: null,
  percentage: null,
  stream_object: null,
  college_object: null,
});
const formState= reactive({
  id:props.academics.id,
  enquiry:{
    highest_degree:props.highest_degree,
  },
    diploma: dip,
    degree: deg,
    masters: mast

})
const showDiplomaEducation = computed(() => {
  if (
    formState.enquiry.highest_degree &&
    formState.enquiry.highest_degree.name === "Diploma"
  ) {
    return true;
  } else {
    return false;
  }
});
const showDegreeEducation = computed(() => {
  if (
    formState.enquiry.highest_degree &&
    formState.enquiry.highest_degree.name === "Degree"
  ) {
    return true;
  } else {
    return false;
  }
});
const showMastersEducation = computed(() => {
  if (
    formState.enquiry.highest_degree &&
    formState.enquiry.highest_degree.name === "Masters"
  ) {
    return true;
  } else {
    return false;
  }
});
const fetchStream = async (query, type) => {
  let streams = await counselor.getStreams(query, type);
  return streams.results;
};
const fetchCollege = async (query, type) => {
  let colleges = await counselor.getColleges(query, type);
  return colleges.results;
};

const confirm = async() => {
  formState.diploma = dip
  formState.degree = deg
  formState.masters = mast 
  let valid = true
  let formValues = JSON.parse(JSON.stringify(formState))
  for (const key in formValues) {
    if(key === 'highest_degree' && formValues[key] === null){
     valid= false
     theme.pushMessage("Highest Degree is required!")
   } 
   if(key === 'diploma' && formValues['enquiry']['highest_degree'] !== null &&  formValues['enquiry']['highest_degree']['name'] === 'Diploma' && (formValues[key]['percentage'] === null || formValues[key]['stream_object'] === null || formValues[key]['college_object'] === null)){
      valid= false
     theme.pushMessage("Please fill Diploma education details!")
     
   } 
   if(key === 'degree' && formValues['enquiry']['highest_degree'] !== null &&  formValues['enquiry']['highest_degree']['name'] === 'Degree' && (formValues[key]['name'] === null || formValues[key]['percentage'] === null || formValues[key]['stream_object'] === null || formValues[key]['college_object'] === null)){
    valid= false
     theme.pushMessage("Please fill Degree education details!")
   }
    if(key === 'masters' && formValues['enquiry']['highest_degree'] !== null && formValues['enquiry']['highest_degree']['name'] === 'Masters' && (formValues[key]['name'] === null || formValues[key]['percentage'] === null || formValues[key]['stream_object'] === null || formValues[key]['college_object'] === null)){
    valid= false
     theme.pushMessage("Please fill Masters education details completely!")
   }
   }
   if(valid){
   let response = await counselor.submitAcademic(formValues)
     theme.pushMessage("Academics details added successfully") 
     location.reload() 
   confirmCancel('confirm')
   }
   else{
  theme.pushMessage("Form Error, please fill out mandatory fields")   
   }

}

const cancel = () => confirmCancel('cancel')
</script>

<template>
  <overlay
    v-show="value"

  >
    <card-component
      v-show="value"
   :title="`Add academic details `"
      class="shadow-lg w-full max-h-modal md:w-4/5 z-50"
      :class="{ 'animate-shake': shake }"
      :header-icon="mdiClose"
      modal
      @header-icon-click="cancel"
    >
      <div class="pl-4 space-y-3">
        <field>
        <control
          v-model="formState.enquiry.highest_degree"
          :options="highestdegree"
          help="Highest Degree"
          :error="formState.enquiry.highest_degree !== null? false : true"
        />
        </field>
        <title-sub-bar v-if="showDiplomaEducation" title="Diploma Details" />
    <card-component v-if="showDiplomaEducation">
      <field>
        <field :error="showDiplomaEducation ? true : false" help="Search stream">
          <Multiselect
            v-model="dip.stream_object"
            placeholder="Stream"
            :filter-results="false"
            :min-chars="3"
            :resolve-on-load="false"
            :delay="0"
            :searchable="true"
            valueProp="id"
            label="name"
            :classes="selectClasses"
            :options="
              async function (query) {
                return await fetchStream(query, 'Diploma'); // check JS block for implementation
              }
            "
          />
        </field>
        <field :error="showDiplomaEducation ? true : false"  help="Search College">
          <Multiselect
            v-model="dip.college_object"
            placeholder="College"
            :filter-results="false"
            :min-chars="3"
            :resolve-on-load="false"
            :delay="0"
            :searchable="true"
            valueProp="id"
            label="name"
            :classes="selectClasses"
            :options="
              async function (query) {
                return await fetchCollege(query, 'Diploma'); // check JS block for implementation
              }
            "
          />
        </field>
        <field :error="showDiplomaEducation ? true : false"  help="Select percentage">
          <label class="checkbox">
            <input
              v-model="dip.percentage"
              type="radio"
              name="diperc"
              :value="true"
              class="checkbox"
            />
            <span class="control-label">60% or Greater than 60%</span>
          </label>
          <label class="checkbox">
            <input
              v-model="dip.percentage"
              type="radio"
              name="diperc"
              :value="false"
              class="checkbox"
            />
            <span class="check" />
            <span class="control-label">Less than 60%</span>
          </label>
        </field>
      </field>
    </card-component>
    <title-sub-bar v-if="showDegreeEducation" title="Degree Details" />
    <card-component v-if="showDegreeEducation">
      <field>
        <field :error="showDegreeEducation ? true : false"  help="Select degree name">
          <Multiselect
            v-model="deg.name"
            :options="degree"
            valueProp="id"
            label="name"
            searchable
            trackBy="name"
            :classes="selectClasses"
          />
        </field>
        <field :error="showDegreeEducation ? true : false"  help="Search stream">
          <Multiselect
            v-model="deg.stream_object"
            placeholder="Stream"
            :filter-results="false"
            :min-chars="3"
            :resolve-on-load="false"
            :delay="0"
            :searchable="true"
            valueProp="id"
            label="name"
            :classes="selectClasses"
            :options="
              async function (query) {
                return await fetchStream(query, 'Degree'); // check JS block for implementation
              }
            "
          />
        </field>
        <field :error="showDegreeEducation ? true : false"  help="Search College">
          <Multiselect
            v-model="deg.college_object"
            placeholder="College"
            :filter-results="false"
            :min-chars="3"
            :resolve-on-load="false"
            :delay="0"
            :searchable="true"
            valueProp="id"
            label="name"
            :classes="selectClasses"
            :options="
              async function (query) {
                return await fetchCollege(query, 'Degree'); // check JS block for implementation
              }
            "
          />
        </field>
        <field :error="showDegreeEducation ? true : false"  help="Select percentage">
          <label class="checkbox">
            <input
              v-model="deg.percentage"
              type="radio"
              name="dperc"
              :value="true"
              class="checkbox"
            />
            <span class="control-label">60% or Greater than 60%</span>
          </label>
          <label class="checkbox">
            <input
              v-model="deg.percentage"
              type="radio"
              name="dperc"
              :value="false"
              class="checkbox"
            />
            <span class="check" />
            <span class="control-label">Less than 60%</span>
          </label>
        </field>
      </field>
    </card-component>
    <title-sub-bar v-if="showMastersEducation" title="Masters Details" />
    <card-component v-if="showMastersEducation">
      <field>
        <field :error="showMastersEducation ? true : false"  help="Select masters name">
          <Multiselect
            v-model="mast.name"
            :options="masters"
            valueProp="id"
            label="name"
            searchable
            trackBy="name"
            :classes="selectClasses"
          />
        </field>
        <field :error="showMastersEducation ? true : false" help="Search stream">
          <Multiselect
            v-model="mast.stream_object"
            placeholder="Stream"
            :filter-results="false"
            :min-chars="3"
            :resolve-on-load="false"
            :delay="0"
            :searchable="true"
            valueProp="id"
            label="name"
            :classes="selectClasses"
            :options="
              async function (query) {
                return await fetchStream(query, 'Masters'); // check JS block for implementation
              }
            "
          />
        </field>
        <field :error="showMastersEducation ? true : false" help="Search College">
          <Multiselect
            v-model="mast.college_object"
            placeholder="College"
            :filter-results="false"
            :min-chars="3"
            :resolve-on-load="false"
            :delay="0"
            :searchable="true"
            valueProp="id"
            label="name"
            :classes="selectClasses"
            :options="
              async function (query) {
                return await fetchCollege(query, 'Masters'); // check JS block for implementation
              }
            "
          />
        </field>
        <field :error="showMastersEducation ? true : false" help="Select percentage">
          <label class="checkbox">
            <input
              v-model="mast.percentage"
              type="radio"
              name="mperc"
              :value="true"
              class="checkbox"
            />
            <span class="control-label">60% or Greater than 60%</span>
          </label>
          <label class="checkbox">
            <input
              v-model="mast.percentage"
              type="radio"
              name="mperc"
              :value="false"
              class="checkbox"
            />
            <span class="check" />
            <span class="control-label">Less than 60%</span>
          </label>
        </field>
      </field>
    </card-component>
      </div>

      <template #footer>
        <level mobile>
          <jb-buttons>
            <jb-button
              :label="buttonLabel"
              :color="button"
              @click="confirm"
            />
            <!-- <jb-button
              v-if="hasCancel"
              label="Cancel"
              :color="button"
              outline
              @click="cancel"
            /> -->
               <jb-button
             
              label="Cancel"
              :color="button"
              outline
              @click="cancel"
            />
          </jb-buttons>

          <text-link
            :label="textLinkLabel"
            :icon="textLinkIcon"
          />
        </level>
      </template>
    </card-component>
  </overlay>
</template>