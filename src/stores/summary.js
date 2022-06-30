import { defineStore,acceptHMRUpdate } from 'pinia';
import { useStorage } from "vue3-storage";
import axios from 'axios';
import { sessionStore } from '../stores/session'

const ls = useStorage();

export const summaryStore = defineStore ('summary',{
    state:()=>({
      number:[],
      email:[],
      escalation_reason:[],
      escalation_to:[],
      remove:[],
      streams:[],
      colleges:[],
      degree:[],
      escalate:[],
      remove_post:[],
      online:[],
      highestDeg:[],
      academic_post:[],
      error:""
    }),
    actions: { 
      async removeError(){
        this.error = ""
        },
        async getContact(data) {
        const user = sessionStore();
        const token = user.user.token;
        if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
              try {
              const response = await
              axios.post(`https://cm.qspiders.com/manager/enquiry/au-contact/`,data,{
                headers: headers
              });
            this.number = response.data    
          }
          catch (err) {
            console.log("err", err)    
        }
        } 
        },
        async getEscalationReason(data) {
          const user = sessionStore();
          const token = user.user.token;
          if (token) {
                  const headers = {
                      'Authorization': `Token ${token}`
                  }
                try {
                const response = await
                axios.get(`https://cm.qspiders.com/manager/reasons/`,{
                  headers: headers
                });
              this.escalation_reason = response.data.results     
            }
            catch (err) {
              console.log("err", err)    
          }
          } 
          },
          async getRemove(data) {
            const user = sessionStore();
            const token = user.user.token;
            if (token) {
                    const headers = {
                        'Authorization': `Token ${token}`
                    }
                  try {
                  const response = await
                  axios.get(`https://cm.qspiders.com/manager/remove-reason/`,{
                    headers: headers
                  });
                this.remove = response.data.results     
              }
              catch (err) {
                console.log("err", err)    
            }
            } 
            },
          async getEscalationTo(data) {
            const user = sessionStore();
            const token = user.user.token;
            if (token) {
                    const headers = {
                        'Authorization': `Token ${token}`
                    }
                  try {
                  const response2 = await
                  axios.get(`https://cm.qspiders.com/manager/counselorlist/`,{
                    headers: headers
                  });
                this.escalation_to = response2.data.results     
              }
              catch (err) {
                console.log("err", err)    
            }
            } 
            },
            async getStreams(data) {
           
              const user = sessionStore();
              const token = user.user.token;
              if (token) {
                      const headers = {
                          'Authorization': `Token ${token}`
                      }
                    try {
                    const response = await
                    axios.get(`https://cm.qspiders.com/education/streams/?qualification_type=${data}`,{
                      headers: headers
                    });
                  this.streams = response.data.results 
                   
                }
                catch (err) {
                  console.log("err", err)    
              }
              } 
              },
              async getColleges(data) {
                // console.log("data",data)
                const user = sessionStore();
                const token = user.user.token;
                if (token) {
                        const headers = {
                            'Authorization': `Token ${token}`
                        }
                      try {
                      const response = await
                      axios.get(`https://cm.qspiders.com/education/colleges/?qualification_type=${data}`,{
                        headers: headers
                      });
                    this.colleges = response.data.results     
                  }
                  catch (err) {
                    console.log("err", err)    
                }
                } 
                },
                async getDegree(data) {
                  // console.log("data",data)
                  const user = sessionStore();
                  const token = user.user.token;
                  if (token) {
                          const headers = {
                              'Authorization': `Token ${token}`
                          }
                        try {
                        const response = await
                        axios.get(`https://cm.qspiders.com/education/degree/?qualification_type=${data}`,{
                          headers: headers
                        });
                      this.degree = response.data.results     
                    }
                    catch (err) {
                      console.log("err", err)    
                  }
                  } 
                  },
              async getHighestDegree(data) {
                const user = sessionStore();
                const token = user.user.token;
                if (token) {
                        const headers = {
                            'Authorization': `Token ${token}`
                        }
                      try {
                      const response = await
                      axios.get(`https://cm.qspiders.com/commons2/highest-degree/`,{
                        headers: headers
                      });
                    this.highestDeg = response.data.results     
                  }
                  catch (err) {
                    console.log("err", err)    
                }
                } 
                },
              async getEsculate(data) {
                const user = sessionStore();
                const token = user.user.token;
                if (token) {
                        const headers = {
                            'Authorization': `Token ${token}`
                        }
                      try {
                      const response2 = await
                      axios.post(`https://cm.qspiders.com/manager/escalate-enquiry/`,data,{
                        headers: headers
                      });
                    this.escalate = response2.data
                  }
                  catch (err) {
                  this.error = err.response.data.message
                  return this.error 
                }
                }
                },
                async getRemovedd(data) {
                  const user = sessionStore();
                  const token = user.user.token;
                  if (token) {
                          const headers = {
                              'Authorization': `Token ${token}`
                          }
                        try {
                        const response2 = await
                        axios.post(`https://cm.qspiders.com/counselor/remove-enquiry/`,data,{
                          headers: headers
                        });
                      this.remove_post = response2.data
                      console.log("reove",this.remove_post);
                    }
                    catch (err) {
                      console.log("err", err)    
                  }
                  }
                  },
                  async getAcademicsPost(data) { 
                    const user = sessionStore();
                    const token = user.user.token;
                    if (token) {
                            const headers = {
                                'Authorization': `Token ${token}`
                            }
                          try {
                          const response2 = await
                          axios.post(`https://cm.qspiders.com/manager/enquiry/au-education/`,data,{
                            headers: headers
                          });
                        this.academic_post = response2.data
                      }
                      catch (err) {
                        console.log("err", err)    
                    }
                    }
                    },
        async getEmail(data) {
          const user = sessionStore();
          const token = user.user.token;
          if (token) {
                  const headers = {
                      'Authorization': `Token ${token}`
                  }
                try {
                const response2 = await
                axios.post(`https://cm.qspiders.com/manager/enquiry/au-email/`,data,{
                  headers: headers
                });
              this.email = response2.data
            }
            catch (err) {
              console.log("err", err)    
          }
          } 
          },
          async getOnline(data) {
            const user = sessionStore();
            const token = user.user.token;
            if (token) {
                    const headers = {
                        'Authorization': `Token ${token}`
                    }
                  try {
                  const response2 = await
                  axios.post(`https://cm.qspiders.com/manager/need-online/`,data,{
                    headers: headers
                  });
                this.online = response2.data
              }
              catch (err) {
                console.log("err", err)    
            }
            }
            },
         
          
        }
    })

    if (import.meta.hot) {
        import.meta.hot.accept(acceptHMRUpdate(summaryStore, import.meta.hot))
    }