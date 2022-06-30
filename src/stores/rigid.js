import { defineStore,acceptHMRUpdate } from 'pinia';
import { useStorage } from "vue3-storage";
import axios from 'axios';
import { sessionStore } from '../stores/session'

const ls = useStorage();

export const rigidStore = defineStore ('rigid',{
    state:()=>({
       rigid:[],
       rigid_total:0,
       rigid_child:[],
       rig_child_total:0,
       days:[],
       days_total:0,
       reg_code:[],
       call_record:[],
       call_record_total:[],
       counselor:[],
       managercounselor:[],
       cancelbatch:[],
       removereason:[],
       resplit:[],
       post_resplit:[],
       follow_second:[],
       hrfoc:[],
       accept:[],
       reject:[],
       author:[],
       callhistory:[],
       total_call:0,
       error:""
    }),
    actions: { 
        async getCourses(page=1,search) {
          console.log("search",search)
        const user = sessionStore();
        const token = user.user.token;
        // console.log("token",token);
          
        if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
              try {
              const response = await
              axios.get(`https://cm.qspiders.com/manager/rigid_enquiry/?page=${page}&${search}&mode_class=offline`,{
                headers: headers
              });
              
            this.rigid = response.data.results,
            this.rigid_total=response.data.total
            // console.log("data",response);
          }
          catch (err) {
            console.log("err", err)    
        }
        } 
        },
        async getStudentDetails(page=1, id, types,date1,date2,count,mode) {

          // getMchescalCounsReport(page=1, cid, type, search)
          console.log("dataa StudentDetails js",page, id, types);
          const user = sessionStore();
          const token = user.user.token;
          
          if (token) {
                  const headers = {
                      'Authorization': `Token ${token}`
                  }
             
                try {
                const response2 = await
                axios.get(`https://cm.qspiders.com/manager/rigid_enquiry2/?page=${page}&id=${id}&types=${types}&from_date=${date1}&to_date=${date2}&count=${count}&mode_class=${mode}
                `,{
     
                  headers: headers
                });
                
                console.log("response2",response2)
              this.rigid_child = response2.data.results,
              this.rig_child_total=response2.data.total
     

            }
            catch (err) {
              console.log("err", err)    
          }
          } 
          },
          async getlist(page=1,search) {
            console.log("dataa in list",page,search);
            const user = sessionStore();
            const token = user.user.token;
            if (token) {
                    const headers = {
                        'Authorization': `Token ${token}`
                    }
               
                  try {
                  const response3 = await
                  axios.get(`https://cm.qspiders.com/manager/batch-planning-list/?page=${page}&${search}`,{
                    headers: headers
                  });
                
                 console.log("response3",response3)
            this.days=response3.data.results
            console.log("response3",  this.days)
            this.days_total=response3.data.total
         
  
              }
              catch (err) {
                console.log("err", err)    
            }
            } 
            },
            async putregcode(data) {
              console.log("dataa in putreg js",data.formState);
              const user = sessionStore();
              const token = user.user.token;
              if (token) {
                      const headers = {
                          'Authorization': `Token ${token}`
                      }
                 
                    try {
                    const response4 = await
                    axios.get(`https://cm.qspiders.com/manager/raisebatchplan/?tentative_start=${data.formState.tentative_start}&id=${data.formState.id}`,{
                      headers: headers
                    });
                  
                  
              this.reg_code=response4.data

              console.log("regcode start", this.reg_code)
          
    
                }
                catch (err) {
                  console.log("err", err)    
              }
              } 
              },   
              async getcallrecord(page=1,data) {
                console.log("call record",page,data);
                const user = sessionStore();
                const token = user.user.token;
                if (token) {
                        const headers = {
                            'Authorization': `Token ${token}`
                        }
                   
                      try {
                      const response5 = await
                      axios.get(`https://cm.qspiders.com/counselor/call-records-by-enquiry/?page=${page}&id=${data}`,{
                        headers: headers
                      });
                    
              
                this.call_record=response5.data.results
                this.call_record_total=response5.data.total
             
      
                  }
                  catch (err) {
                    console.log("err", err)    
                }
                } 
                },
                async postcancelldata(data) {
                  console.log("cancel record",data);
                  const user = sessionStore();
                  const token = user.user.token;
                  if (token) {
                          const headers = {
                              'Authorization': `Token ${token}`
                          }
                     
                        try {
                        const response6 = await
                        axios.post(`https://cm.qspiders.com/manager/cancelbatchplan/`,data,{
                          headers: headers
                        });
                      console.log("res",response6)
                    
                  this.cancelbatch=response6.data.results
                  console.log("res1",this.cancelbatch);
                }
                    catch (err) {
                      console.log("err", err)    
                  }
                  } 
                  },   
                   async getremove(data) {
                    const user = sessionStore();
                    const token = user.user.token;
                    if (token) {
                            const headers = {
                                'Authorization': `Token ${token}`
                            }
                       
                          try {
                          const response7 = await
                          axios.get(`https://cm.qspiders.com/manager/ReasonsList/`,{
                            headers: headers
                          });
                        
                   
                    this.removereason=response7.data.results
                    // this.call_record_total=response3.data.total
                 
          
                      }
                      catch (err) {
                        console.log("err", err)    
                    }
                    } 
                    },
                    async getresplit(data) {
                      console.log("resplit record",data);
                      const user = sessionStore();
                      const token = user.user.token;
                      if (token) {
                              const headers = {
                                  'Authorization': `Token ${token}`
                              }
                         
                            try {
                            const response8 = await
                            axios.get(`https://cm.qspiders.com/manager/resplit-list/?bid=${data.id}`,{
                              headers: headers
                            });
                          
                        
                      this.resplit=response8.data.results
                      console.log("resplit js",this.resplit);
                      // this.call_record_total=response3.data.total
                   
            
                        }
                        catch (err) {
                          console.log("err", err)    
                      }
                      } 
                      },
                  async postresplit(data) {
                    console.log("post resplit",data);
                    const user = sessionStore();
                    const token = user.user.token;
                    if (token) {
                            const headers = {
                                'Authorization': `Token ${token}`
                            }
                       
                          try {
                          const response9 = await
                          axios.post(`https://cm.qspiders.com/manager/resplit-followup/`,data,{
                            headers: headers
                          });
                        console.log("response9",response9);
                      
                    this.post_resplit=response9.data
                    console.log("dataaaaaaaaa",this.post_resplit);
                    // this.call_record_total=response3.data.total
                 
          
                      }
                      catch (err) {
                        console.log("err", err)    
                    }
                    } 
                    },
                     async getsharecounsellor(data) {
                       console.log("data in manager",data);
                      const user = sessionStore();
                      const token = user.user.token;
                      if (token) {
                              const headers = {
                                  'Authorization': `Token ${token}`
                              }
                         
                            try {
                            const response10 = await  
                            axios.get(`https://cm.qspiders.com/manager/share/?bid=${data.bid}&counid=${data.counid}&urole=managers`,{
                              headers: headers
                            });
                          
                 console.log("response10",response10.data);
                      this.managercounselor=response10.data
                      console.log("response10", this.managercounselor);
                        }
                        catch (err) {
                          console.log("err", err)    
                      }
                      } 
                      },
                      async getsharecounsellor1(data) {
                        console.log("sharecounselor  in js  s",data);
                        const user = sessionStore();
                        const token = user.user.token;
                        if (token) {
                                const headers = {
                                    'Authorization': `Token ${token}`
                                }
                           
                              try {
                              const response11 = await
                          
                              axios.get(`https://cm.qspiders.com/manager/share/?urole=counselor&fid=${data}`,{
                                headers: headers
                              });
                            
                   
                        this.counselor=response11.data
                        console.log("response11",this.counselor) 
                          }
                          catch (err) {
                            console.log("err", err)    
                        }
                        } 
                        },
                        async gethrfoc(data) {
                          console.log("hrfoc in js",data);
                          const user = sessionStore();
                          const token = user.user.token;
                          if (token) {
                                  const headers = {
                                      'Authorization': `Token ${token}`
                                  }
                             
                                try {
                                const response12 = await
                            
                                axios.get(`https://cm.qspiders.com/manager/hrfoclist/?fid=${data}&type=shared`,{
                                  headers: headers
                                });
                              
                     
                          this.hrfoc=response12.data.results
                          console.log("response12",this.hrfoc) 
                            }
                            catch (err) {
                              console.log("err", err)    
                          }
                          } 
                          },
                          async getshared(data) {
                            console.log("author",data);
                            const user = sessionStore();
                            const token = user.user.token;
                            if (token) {
                                    const headers = {
                                        'Authorization': `Token ${token}`
                                    }
                               
                                  try {
                                  const response12 = await
                              
                                  axios.get(`https://cm.qspiders.com/manager/hrfoclist/?fid=${data}&type=author`,{
                                    headers: headers
                                  });
                                
                       
                            this.author=response12.data.results
                            console.log("response12",this.author) 
                              }
                              catch (err) {
                                console.log("err", err)    
                            }
                            } 
                            },
                          async getaccept(data) {
                            console.log("accept",data);
                            const user = sessionStore();
                            const token = user.user.token;
                            if (token) {
                                    const headers = {
                                        'Authorization': `Token ${token}`
                                    }
                               
                                  try {
                                  const response12 = await
                              
                                  axios.post(`https://cm.qspiders.com/manager/accept-followup/`,data,{
                                    headers: headers
                                  });
                                
                       
                            this.accept=response12.data
                            console.log("response12",this.accept) 
                              }
                              catch (err) {
                                console.log("err", err.response)    
                            }
                            } 
                            },
                            async getreject(data) {
                              console.log("reject",data);
                              const user = sessionStore();
                              const token = user.user.token;
                              if (token) {
                                      const headers = {
                                          'Authorization': `Token ${token}`
                                      }
                                 
                                    try {
                                    const response12 = await
                                
                                    axios.post(`https://cm.qspiders.com/manager/accept-followup/`,data,{
                                      headers: headers
                                    });
                                  
                         console.log("respobnse12",response12);
                              this.reject=response12.data
                              console.log("response1",this.reject) 
                                }
                                catch (err) {
                                  console.log("err", err)    
                              }
                              } 
                              },
                              async getcallhistory(page=1,data) {
                                console.log("call history",page,data);
                                const user = sessionStore();
                                const token = user.user.token;
                                if (token) {
                                        const headers = {
                                            'Authorization': `Token ${token}`
                                        }
                                   
                                      try {
                                      const response13 = await
                                  
                                      axios.get(`https://cm.qspiders.com/manager/followup-call-history/?page=${page}&id=${data}`,{
                                        headers: headers
                                      });
                                    
                           console.log("respobnse13",response13);
                                this.callhistory=response13.data.results
                                this.total_call =response13.data.total
                                console.log("response1",this.callhistory) 
                                  }
                                  catch (err) {
                                    console.log("err", err)    
                                }
                                } 
                                },
                            async getfollowupsecond(page=1,id,type,search) {
                              console.log("second",id,type ,search);
                              const user = sessionStore();
                              const token = user.user.token;
                              if (token) {
                                      const headers = {
                                          'Authorization': `Token ${token}`
                                      }
                                 
                                    try {
                                    const response11 = await
                                    axios.get(`https://cm.qspiders.com/manager/followuplist/?id=${id}&type=${type}&${search}`,{
                                      headers: headers
                                    });
                                  
                          console.log(response11);
                              this.follow_second=response11.data.results
                              console.log("second", this.follow_second) 
                         
                           
                    
                                }
                                catch (err) {
                                  console.log("err", err)    
                              }
                              } 
                              }
                
              
        
        }
    })

    if (import.meta.hot) {
        import.meta.hot.accept(acceptHMRUpdate(rigidStore, import.meta.hot))
    }

    