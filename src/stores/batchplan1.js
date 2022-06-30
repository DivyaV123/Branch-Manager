import { defineStore,acceptHMRUpdate } from 'pinia';
import { useStorage } from "vue3-storage";
import axios from 'axios';
import { sessionStore } from '../stores/session'

const ls = useStorage();

export const batchplanStore = defineStore ('batch_plan',{
    state:()=>({
        course:[],
        // subject:[],
        // class_timing:[],
        // batch_type:[],
        // branch:[],
        // moc:[],
        // trainer:[],
        // batchcode:[],
        // split:[],
        // counsellorList:[],
        enq:[],
        postdata:[],
        pullEnqFrom:[],
        error:"",
        agreed_date:[],
        start_date:[],
        bacthplan:[],
        not_started:[],
        not_started_total:[],
        holidays:[],
        started:[],
        started_total:[],
        change_pass:[],
       
    }),
    
    actions: {
    async removeError(){
        this.error = ""
        },  
 
async getCourses(data) {
  const user = sessionStore();
  const token = user.user.token;
  if (token) {
          const headers = {
              'Authorization': `Token ${token}`
          }
        try {
        const response = await
        axios.get(`https://cm.qspiders.com/manager/GetapiView/`,{
          headers: headers
        }); 
      this.course = response.data
    }
    catch (err) {
      console.log("err", err)    
  }
}
},
async getBatchPlan(data) {
  console.log("hereee",data);
  const user = sessionStore();
  const token = user.user.token;
 
  if (token) {
          const headers = {
              'Authorization': `Token ${token}`
          }
        try {
        const response1 = await
        axios.post(`https://cm.qspiders.com/manager/batch_plan/`,data,{
          headers: headers
        });
      this.postdata = response1.data
    }
    catch (err) {
      console.log("err", err.response1)    
    }
  }

},
async getEnq(data) {
  console.log("inside getenq",data);
  const user = sessionStore();
  const token = user.user.token;
 
  if (token) {
          const headers = {
              'Authorization': `Token ${token}`
          }
        try {
        const response2 = await
        axios.get(`https://cm.qspiders.com/manager/get-batch-plan/?course=${data.course}&class_timing=${data.class_timing}&agreed_date=${data.agreed_date}&branch=${data.branch}&start_date=${data.start_date}&mode_class=${data.mode_class}&pull_enq_from=${data.pull_enq_from}`,{
         
          headers: headers
        });
      this.enq = response2.data
    
    }
    catch (err) {
      console.log("err", err)    
    }
  }
},
async getnotstarted(page=1,data) {
  const user = sessionStore();
  const token = user.user.token;
  if (token) {
          const headers = {
              'Authorization': `Token ${token}`
          }
     
        try {
        const response3 = await
        axios.get(`https://cm.qspiders.com/manager/followup-not-started/?page=${page}`,{
          headers: headers
        });
  this.not_started=response3.data.results
  this.not_started_total=response3.data.total


    }
    catch (err) {
      console.log("err", err)    
  }
  } 
  },
  async getstarted(page=1,data) {
    const user = sessionStore();
    const token = user.user.token;
    if (token) {
            const headers = {
                'Authorization': `Token ${token}`
            }
       
          try {
          const response4 = await
          axios.get(`https://cm.qspiders.com/manager/followup-started/?page=${page}`,{
            headers: headers
          });
    this.started=response4.data.results
    this.started_total=response4.data.total
  
  
      }
      catch (err) {
        console.log("err", err)    
    }
    } 
    },
  async getholiday(data) {
    const user = sessionStore();
    const token = user.user.token;
    if (token) {
            const headers = {
                'Authorization': `Token ${token}`
            }
       
          try {
          const response5 = await
          axios.get(`https://cm.qspiders.com/manager/holidaylist/?id=1`,{
            headers: headers
          });
        
         
    this.holidays=response5.data.results
      }
      catch (err) {
        console.log("err", err)    
    }
    } 
    },
    async changepassword(data) {
      const user = sessionStore();
      const token = user.user.token;
      if (token) {
              const headers = {
                  'Authorization': `Token ${token}`
              }
         
            try {
            const response6 = await
            axios.post(`https://cm.qspiders.com/users/user-change-password/`,data,{
              headers: headers
            });
          
        
      this.change_pass=response6.data
      // this.call_record_total=response3.data.total
   

        }
        catch (err) {
          console.log("err", err)    
      }
      } 
      },
  
    }
    })

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(batchplanStore, import.meta.hot))
}
