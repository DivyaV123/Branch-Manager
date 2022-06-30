import { defineStore, acceptHMRUpdate } from 'pinia'
import { useStorage } from "vue3-storage";
import axios from 'axios';

const ls = useStorage();
export const sessionStore = defineStore('user', {
    state: () => ({
        user: null,
        loggedIn: false,
        loginError: '',
    }),
    actions: {
        async login(data) {
            console.log("data",data)
            try {
                const response = await axios.post('https://cm.qspiders.com/users/manager/login/', data);
                ls.setStorage({
                    key: 'user',
                    data: JSON.stringify(response.data),
                    success: res => {
                        this.$patch({
                            user: response.data,
                            loggedIn: true,
                            loginError: ''
                        })
                    }
                })
                return this.loggedIn
            } catch (err) {
                this.$patch({
                    loginError: err.response.data.non_field_errors[0]
                    
                })
               
               return this.loginError;
             
            }
            
        },
        async logout() {
            const token = this.user.token
            const data = {}
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                ls.removeStorage({
                    key: 'user',
                    success: res => {
                        this.$patch({
                            user: null,
                            loggedIn: false,
                            loginError: ''
                        })
                        try {
                            axios.post('https://cm.qspiders.com/users/logout/', data, {
                                headers: headers
                            });
                            return true
                        }
                        catch (err) {
                            return false
                        }



                    }
                })
            }
        },

        async checkUser() {
            if (ls.hasKey('user')) {
                ls.getStorage({
                    key: 'user',
                    success: res => {
                        const data = JSON.parse(res.data)
                        console
                        this.$patch({
                            user: data,
                            loggedIn: true,
                            loginError: ''
                        })
                    }
                })
            }

        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(sessionStore, import.meta.hot))
}


// import { defineStore, acceptHMRUpdate } from 'pinia'
// import { themeStore } from "../stores/theme"
// import Cookies from 'js-cookie'
// import axios from 'axios';
// export const sessionStore = defineStore('user', {
//     state: () => ({
//         user: null,
//         loggedIn: false,
//         studentRole: false,
//         trainerRole: false,
//         trackerRole: false,
//         counselorRole: false,
//         loginError: ''
//     }),
//     actions: {
//         async login(data) {
//             const theme = themeStore();
//             try {
//                 const response = await axios.post('http://cm.qspiders.com/users/manager/login/', data);
//                 // Cookies.set('user', JSON.stringify(response.data), { domain: '.qspiders.com' })
                
//                 Cookies.set('user', JSON.stringify(response.data))
//                 const groups = response.data.groups
//                 const result = groups.some(element => {
//                     if (element.name === "counselor") {
//                         this.counselorRole = true
//                     }
//                     if (element.name === "student") {
//                         this.studentRole = true
//                     }
//                     if (element.name === "trainer") {
//                         this.trainerRole = true
//                     }
//                     if (element.name === "tracker") {
//                         this.trackerRole = true
//                     }

//                 });
//                 //set { domain: '.qspiders.com' } on launch
//                 this.$patch({
//                     user: response.data,
//                     loggedIn: true,
//                     loginError: ''
//                 })
//                 return this.loggedIn
//             } catch (err) {
//                 theme.pushMessage("Unable to login with provided credentials")
//                 // this.$patch({
//                 //     loginError: err.response.data.non_field_errors[0]
//                 // })
//             }

//         },
//         async logout() {
//             const token = this.user.token
//             const data = {}
//             if (token) {
//                 const headers = {
//                     'Authorization': `Token ${token}`
//                 }
//                 try {
//                     // Cookies.remove('user', { domain: '.qspiders.com' })
//                     Cookies.remove('user')
//                     this.$patch({
//                         user: null,
//                         loggedIn: false,
//                         loginError: ''
//                     })
//                     await axios.post('http://cm.qspiders.com/users/logout/', data, {
//                         headers: headers
//                     });
//                     return true
//                 }
//                 catch (err) {
//                     return false
//                 }

//             }
//         },

//         async checkUser() {
//             const theme = themeStore();
//             if (this.user === null) {
//                 if (Cookies.get('user')) {
//                     const data = JSON.parse(Cookies.get('user'))
//                     const groups = data.groups
//                     const result = groups.some(element => {
//                         if (element.name === "counselor") {
//                             this.counselorRole = true
//                             return true
//                         }
//                         else if (element.name === "student") {
//                             this.studentRole = true
//                             return true
//                         }
//                         else if (element.name === "trainer") {
//                             this.trainerRole = true
//                             return true
//                         }
//                         else if (element.name === "tracker") {
//                             this.trackerRole = true
//                             return true
//                         }
//                         else {
//                             return false
//                         }

//                     });
//                     if (result) {
//                         this.$patch({
//                             user: data,
//                             loggedIn: true,
//                             loginError: ''
//                         })
//                     }
//                     else {
//                         theme.pushMessage("You do not have permission to enter this role/domain.")
//                     }

//                 }
//             }

//         }
//     }
// })

// if (import.meta.hot) {
//     import.meta.hot.accept(acceptHMRUpdate(sessionStore, import.meta.hot))
// }