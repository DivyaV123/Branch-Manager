

<template>
  <!-- <form-screen-section v-slot="{ cardClass, cardRounded }" bg="create batch plan" promo> -->
  <card-component card-class="w-11/12 md:w-7/12 lg:w-5/12 xl:w-4/12 shadow-2xl" card-rounded="rounded-lg"
    :class="[cardClassAddon]" form @submit.prevent="submit">

    <div class="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-1 gap-4 m-5">
      <field label="Branch" vertical :error="hasError1" help="This field is required" @click="click">
        <Multiselect class="border border-success h-8" v-model="form.branch" :options="getCourse.branch"
          :reduce="(name) => name" placeholder="Search branch here" name="branch" label="name" @click="clear"
          :object="true" valueProp="id" searchable trackBy="name" :classes="selectClasses" />
      </field>

      <field label="Course" vertical v-if="form.branch" :error="hasError2" help="This field is required"
        @click="clearsubject">


        <Multiselect class="border border-success h-8" v-model="form.courseid" :options="form.branch.courses"
          placeholder="Search branch here" name="branch" label="name" :object="true" valueProp="id" searchable
          trackBy="name" :classes="selectClasses"  @select="tabledata(form.courseid)"/>

      </field>


      <field label="Subject" v-if="form.courseid" vertical :error="hasError3" help="This field is required">
        <Multiselect class="border border-success h-8" :error="hasError3" v-model="form.sub"
          :options="form.courseid.subject" :object="true" placeholder="Search subject here" name="subject" label="name"
          @click="click" valueProp="id" searchable trackBy="name" :classes="selectClasses"  @select="tabledata(form.sub)"/>
      </field>



      <field label="Class Timings" vertical :error="hasError4" help="This field is required">
        <Multiselect class="border border-success mb-1 h-8" :error="hasError4" v-model="form.class_timing"
          :options="getCourse.class_timing" :object="true" placeholder="Select Class Timings" name="class_timing"
          label="name" @click="click" valueProp="id" searchable trackBy="name" :classes="selectClasses"  @select="tabledata(form.class_timing)"/>
      </field>
    <!-- </div> -->

    <!-- <div class="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-1 gap-4 m-5"> -->
      <field label="Trainer" v-if="form.branch" vertical :error="hasError5" help="This field is required"
        @click="getTrainer">
        <Multiselect class="border border-success h-8" :error="hasError5" v-model="form.trainer"
          :options="form.branch.trainer" :reduce="(name) => name.id" placeholder="Select Trainer " name="trainer"
          label="username" @click="click" valueProp="id" searchable trackBy="name" :classes="selectClasses"  @select="tabledata(form.trainer)" />
      </field>


      <field label="Mode of Class" vertical :error="hasError6">

        <Multiselect class="border border-success mb-[19px] h-8" :error="hasError6" v-model="form.moc"
          :options="getCourse.mode_class" :object="true" placeholder="Select mode of class" name="moc" label="name"
          @click="click" valueProp="id" searchable trackBy="name" :classes="selectClasses"  @select="tabledata(form.moc)" />
      </field>

      <!-- :options="getCourse.mode_class" -->
      <!-- :reduce="(name) => name.id" -->

      <field label="Tentative date and time" :error="hasError7" vertical help="This field is required"
        @change="holidaydata">

        <input type="date" v-model="date" :min="dayjs(new Date).format('YYYY-MM-DD')"
          class="bg-gray-700 border border-white py-1 w-full pl-2 h-8"   @change="tabledata">
      </field>

 <!-- @change="holidaydata" -->
      <field label="Add enq from" vertical :error="hasError8" help="This field is required"  >

        <input type="date" v-model="date2"
          :max="dayjs(new Date).subtract(getCourse.set_days, 'month').format('YYYY-MM-DD')"
          class="bg-gray-700 border border-white py-1 w-full pl-2 h-8"   @change="tabledata">
      </field>

    </div>

    <field vertical v-if="form.sub != null" label="Pull enq from" class="m-5">
      <div class="sm:flex block mb-2">
        <div v-for="(pull, index1) in form.sub.pull_course" :key="index1 + '8'" class="sm:ml-1 md:ml-4 ml-0">
          <div v-if="pull.name">
            <input type="checkbox" :id="pull.name" :value="pull.id" v-model="form.checkboxTwo"  @change="tabledata">

            <span class="ml-2" id="btn"> {{ pull.name }}</span>
          </div>
        </div>
      </div>
    </field>

    <div class="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-4 m-5">
      <field label="Batch type" vertical :error="hasError9" help="This field is required">
        <Multiselect v-model="form.batch_type" :options="getCourse.batch_type" :error="hasError9" valueProp="id"
          :reduce="(name) => name" label="name" searchable trackBy="name" placeholder="Select BatchType"
          :classes="selectClasses" class="h-8" />
      </field>

      <div v-if="form.batch_type == 2">
        <field label="Batchcode" vertical>
          <Multiselect class="border border-success h-8" v-model="form.batchcode" :options="getCourse"
            :reduce="(course) => course.id" placeholder="Select Batchcode" course="batchcode" label="course" searchable
            trackBy="name" :classes="selectClasses" />

        </field>

      </div>


      <div>
        <field label="Split" vertical :error="hasError13" help="This field is required" @click="click">
          <Multiselect class="border border-success h-8" :error="hasError13" v-model="form.split"
            :options="getCourse.split" placeholder="Select Split Enquiry" name="split" label="name" valueProp="id"
            searchable trackBy="name" :classes="selectClasses" @select="splitMethod(form.split)" />
        </field>
      </div>



      <div>
        <field label="Authorless Counselor" vertical v-if="form.branch" :error="hasError13" help="This field is required">
          <Multiselect class="border border-success h-8" :error="hasError13" v-model="form.authorless" :options="form.branch.counselor"
            placeholder="Select authorless counselor" name="username" label="username" valueProp="id"
            searchable trackBy="username" :classes="selectClasses"/>
        </field>
      </div>

{{form.authorless}}
    </div>
    <div class="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4 m-5">

      <div v-if="form.batch_type !== 2">
        <field label="Target students" horizontal help="This field is required" :error="hasError10" @click="click">
          <control :icon-left="mdiAccountMultiple" v-model="form.amount" type=number min="0" :error="hasError10"
            @click="number" class="ml-[22px]"/>
        </field>
      </div>

      <field label="Risks" horizontal help="This field is required" v-if="form.batch_type !== 2" :error="hasError11">
        <control v-model="form.risks" type="textarea" :error="hasError11" @click="click" />
      </field>
      <field label="Mitigation Plan" horizontal v-if="form.batch_type !== 2" help="This field is required"
        :error="hasError12">
        <control class="xs:-mt-2 ml-[30px]" v-model="form.mitigation" type="textarea" :error="hasError12" @click="click" />
      </field>
    </div>


    <div
      v-if="courseid !== null && class_timing !== null && moc !== null && branch !== null && date !== '' && date2 !== '' ">
      <hero-bar class="flex justify-center items-center mb-4">
        Enquiries in the Bucket
      </hero-bar>
      <enquiry-list :course="form.courseid" :class_timing="form.class_timing" :agreed_date="date2" :branch="form.branch"
        :start_date="date" :mode_class="form.moc" :pull_enq_from="form.checkboxTwo.join()" />
    </div>

    <div v-if="gettable.total === 0">
    </div>

    <div class="grid grid-cols-2 gap-0 my-6 xl:grid-cols-6 " v-else>
      <div v-if="form.split === 2">
        <label class="mb-3">Councellor name & Counts</label>
        <div v-if="form.branch">

          <field vertical v-for="(counselor, index) in  followup" :key="index" class="w-[500px]">

            <control :icon-left="mdiAccount" v-model="counselor.counselor" :label="counselor.name" />


            <field vertical>
              <control :icon-left="mdiPound" v-model="counselor.count" type="number" placeholder="Enter Count here"
                min="0" @change="counts" />
            </field>

          </field>


        </div>
      </div>

    </div>

    <template #footer>
      <level mobile>
        <jb-buttons>
          <jb-button label="Submit" type="submit" color="info" />
        </jb-buttons>




      </level>
    </template>
  </card-component>



</template>

<script setup>
import { batchplanStore } from "../stores/batchplan1";
import { sessionStore } from '../stores/session'
import { ref, reactive, onBeforeMount, computed, onMounted } from 'vue'
import {
  mdiCalendar,
  mdiBookOpenVariant,
  mdiAccountMultiple, mdiPound, mdiAccountPlusOutline, mdiDelete, mdiAccount, mdiLifebuoy, mdiPlusBox, mdiMinusBox
} from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
// import TitleSubBar from '@/components/TitleSubBar.vue'
import CardComponent from '@/components/CardComponent.vue'
import CheckRadioPicker from '@/components/CheckRadioPicker.vue'
import HeroBar from '@/components/HeroBar.vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import Control2 from '@/components/Control2.vue'
import JbButton from '@/components/JbButton.vue'
import { useRoute, useRouter } from 'vue-router'
import EnquiryList from '@/components/EnquiryList.vue'
import Level from '@/components/Level.vue'
import JbButtons from '@/components/JbButtons.vue'
import { themeStore } from "../stores/theme"
import Icon from '@/components/Icon.vue'
import dayjs from 'dayjs';
import ModalBox from '@/components/ModalBox.vue'
import Multiselect from "@vueform/multiselect";
import { selectClasses } from "../selectcss"


const router = useRouter()
const theme = themeStore();
const user = sessionStore()
const batchplan = batchplanStore();
const route = useRoute();


const titleStack = ref(['Branch Manager'])
const date = ref(null);
const date2 = ref(null)


const form = reactive({
  branch: null,
  courseid: null,
  sub: null,
  moc: null,
  class_timing: null,
  counselor_list: null,
  batch_type: null,
  risks: '',
  mitigation: '',
  amount: '',
  trainer: null,
  batchcode: null,
  split: '',
  authorless:null,
  checkboxTwo: []


})
const other_branches = ref(null)
const other_roles = ref(null)
const inactive = ref(null)
const count = ref(null)


const followup = ref(
  []
)

const followupnew = ref(
  []
)

const getCourse = computed(() => {
  return batchplan.course;
});
const gettable = computed(() => batchplan.enq)


const holiday = computed(() => {
  return batchplan.holidays
})


onBeforeMount(async () => {
  await user.checkUser();
  theme.setPageTitle("Create Batch Plan")
  await batchplan.getCourses()
  batchplan.getholiday();
  form.moc = batchplan.$state.course.mode_class[1];
  
});


const values2 = ref(null)

const counts = () => {
  const msgTotal = followup.value.reduce(function (prev, cur) {
    return prev + cur.count;
  }, 0);

  values2.value = msgTotal

}




const regex = new RegExp(/^[0-9]+$/)

const number = (value) => {
  if (regex.test(value) && form.amount != (-0)) {
    return form.amount;
  }
}

const table = Array({})



const click = () => {
  hasError1.value = false
  hasError2.value = false,
    hasError3.value = false,
    hasError4.value = false,
    hasError5.value = false,
    hasError6.value = false,
    hasError7.value = false,
    hasError8.value = false,
    hasError9.value = false,
    hasError10.value = false,
    hasError11.value = false,
    hasError12.value = false,
    hasError13.value = false,
    hasError14.value = false
}



const hasError = ref(false)
const hasError1 = ref(false)
const hasError2 = ref(false)
const hasError3 = ref(false)
const hasError4 = ref(false)
const hasError5 = ref(false)
const hasError6 = ref(false)
const hasError7 = ref(false)
const hasError8 = ref(false)
const hasError9 = ref(false)
const hasError10 = ref(false)
const hasError11 = ref(false)
const hasError12 = ref(false)
const hasError13 = ref(false)
const hasError14 = ref(false)



const cardClassAddon = computed(() => hasError.value ? 'animate-shake' : '')

const submit = async () => {
  if (form.branch === null) {
    hasError1.value = true;
  }

  else if (form.courseid == null) {
    hasError2.value = true;
  }
  else if (form.sub == null) {
    hasError3.value = true;
    
  }

  else if (form.class_timing == null) {
    hasError4.value = true;
  }
  else if (form.trainer == null) {
    hasError5.value = true;
  }
  else if (form.moc == null) {
    hasError6.value = true;
  }
  else if (date.value == "") {
    hasError7.value = true;
  }
  else if (date2.value == "") {
    hasError8.value = true;
  }

  else if (form.batch_type == null) {
    hasError9.value = true;
  }
  else if (form.batch_type !== 2 && form.amount == "") {
    hasError10.value = true;
  }
  else if (form.batch_type !== 2 && form.risks == "") {
    hasError11.value = true;
  }
  else if (form.batch_type !== 2 && form.mitigation == "") {
    hasError12.value = true;
  }
  else if (form.split == null) {
    hasError13.value = true;
  }

  else {

    if (user.loggedIn) {

      try {

        const add_enq = dayjs(date2.value).format("YYYY-MM-DD");
        const Tentative = dayjs(date.value).format("YYYY-MM-DD");
        console.log("value2",values2.value , gettable.value.total)
        if (form.split === 2 && values2.value != gettable.value.total) {
          theme.pushMessage('count is exceeded')

          //  location.reload();
        }
        else {
              for (var j = 0; j < followup.value.length; j++)
                {               
                  if(followup.value[j].count!=0){
                    followupnew.value.push({counselor: followup.value[j].cid, count: followup.value[j].count})
               }
               
                }
          await batchplan.getBatchPlan({
            "course": form.courseid.id, "subject": form.sub.id, "branch": form.branch.id, "tentative_start": Tentative,
            "class_timing": form.class_timing.name, "class_timing_id": form.class_timing.id, "batch_type": form.batch_type, "trainer": form.trainer, "mode_of_class": form.moc.name,
            "mode_of_class_id": form.moc.id, "risks": form.risks, "pull_enq_from": form.checkboxTwo, "mitigation_plan": form.mitigation, "student": number(form.amount),
            "agreed_date": add_enq, "split": (form.split), "other_branches": gettable.value.other_branches, "inactive": gettable.value.inactive, "authorless_couns":form.authorless,
            "other_roles": gettable.value.other_roles, "followup": followupnew.value
          });

          theme.pushMessage('Batch Plan Created Successfully')
          // location.reload();
        }


      }


      catch (error) {
        theme.pushMessage(error)
      }
    }
  }
}

const tabledata = async () => {
  if (form.courseid != null && form.class_timing != null && date2.value != null && date.value != null && form.moc != null && form.branch != null) {
    await batchplan.getEnq({ "course": form.courseid.id, "class_timing": form.class_timing.name, "agreed_date": date2.value, "branch": form.branch.id, "start_date": date.value, "mode_class": form.moc.name, "pull_enq_from": form.checkboxTwo.join() })
  }
}




const splitMethod = async (value) => {
  if (value === 2) {

    let something = JSON.parse(JSON.stringify(getCourse.value));
    let cns = []
    for (var i = 0; i < something.branch.length; i++) {
      if (something.branch[i].id === form.branch.id) {
        cns = something.branch[i].counselor
      }
    }
    if (cns.length > 0) {
      for (var p = 0; p < cns.length; p++) {
        followup.value.push({ counselor: cns[p].username, count: 0, cid: cns[p].id })
      }
        
  //         if(data[i].count!=0){
  // counscount.push({"name":data[i].id, "count":data[i].count})
  //   }
      }
  }
  else {
    followup.value = []

  }
}



const clear = async () => {
  form.courseid = null,
    form.sub = null,
    form.trainer = null

}



const clearsubject = async () => {
  form.sub = null;
}


const holidaydata = () => {
  for (let i = 0; i < holiday.value.length; i++) {

    if (holiday.value[i].date === date2.value || holiday.value[i].date === date.value) {
      alert("its declare as a holiday")
    }
  }
}


</script>

<style >
.hello {
  width: 100%
}

.modal-card-body {
  overflow-y: auto;
  -ms-overflow-style: none;
}

.vs__dropdown-menu {
  background-color: darkgrey !important;
  border: none !important;
  color: white !important;
  text-transform: capitalize !important;
}

.vs__open-indicator,
.vs__clear {
  fill: white !important;
}
</style>


