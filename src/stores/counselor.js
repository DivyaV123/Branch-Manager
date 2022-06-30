import { defineStore, acceptHMRUpdate } from 'pinia'
import axios from 'axios';
import { sessionStore } from './session'

export const counselorStore = defineStore('counselor', {

    state: () => ({
        enquiries: [],
        enqCount: 0,
        noEnquiryForms: [],
        noEnqFormCount: 0,
        updateStatus: [],
        updateStatusCount: 0,
        dataNotTaken: [],
        dataNotTakenCount: 0,
        stars: [],
        starsCount: 0,
        esclatedToMe: [],
        esclatedToMeCount: 0,
        esclatedByMe: [],
        esclatedByMeCount: 0,
        mode: [],
        classtiming: [],
        timeslot: [],
        highestdegree: [],
        courses: [],
        modeclass: [],
        branches: [],
        degree: [],
        masters: [],
        records: [],
        recordCount: 0,
        nrecords: [],
        nrecordCount: 0,
        eReasons: [],
        bUsers: [],
        rReasons: [],
        callStatus: [],
        singleRecord: [],
        categoryStatus: [],
        refers: [],
        referCount: 0,
        refersInside: [],
        refersInsideCount: 0,
        noCallEnquiry: [],
        noCallEnquiryCount: 0,
        formMessage: {
            show: true,
            message: ''
        },
        isEnquirySearchActive: false,
        nextBatch: [],
        nextBatchCount: 0,
        needOnline: [],
        needOnlineCount: 0,
        missedCalls: [],
        missedCallsCount: 0,
        oBToMe:[],
        oBToMeCount:0,
        meToOB:[],
        meToOBCount:0,
        reminders:[],
        remindersCount: 0,
        internals:[],
        internalsCount: 0,
        callBack:[],
        callBackCount: 0,
        joinedSomewhere:[],
        joinedSomewhereCount: 0,
        alreadyJoined:[],
        alreadyJoinedCount: 0,
        coming:[],
        comingCount: 0,


    }),
    actions: {
        async searchOpenclose() {
            this.isEnquirySearchActive = !this.isEnquirySearchActive
        },
        async getComing() {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const coming = await axios.get('https://cm.qspiders.com/counselor/coming/', {
                        headers: headers
                    });
                    this.$patch({
                        coming: coming.data.results,
                        comingCount: coming.data.total,

                    })

                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async getAlreadyJoined() {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const alreadyjoined = await axios.get('https://cm.qspiders.com/counselor/already-joined/', {
                        headers: headers
                    });
                    this.$patch({
                        alreadyJoined: alreadyjoined.data.results,
                        alreadyJoinedCount: alreadyjoined.data.total,

                    })

                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async getJoinedSomewhere() {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const joinedsomewhere = await axios.get('https://cm.qspiders.com/counselor/joined-somewhere/', {
                        headers: headers
                    });
                    this.$patch({
                        joinedSomewhere: joinedsomewhere.data.results,
                        joinedSomewhereCount: joinedsomewhere.data.total,

                    })

                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async getCallBack() {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const callback = await axios.get('https://cm.qspiders.com/counselor/call-back/', {
                        headers: headers
                    });
                    this.$patch({
                        callBack: callback.data.results,
                        callBackCount: callback.data.total,

                    })

                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async getInternals() {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const internals = await axios.get('https://cm.qspiders.com/commons2/internal-list/', {
                        headers: headers
                    });
                    this.$patch({
                        internals: internals.data.results,
                        internalsCount: internals.data.total,

                    })

                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async getReminders() {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const reminders = await axios.get('https://cm.qspiders.com/commons2/reminder/', {
                        headers: headers
                    });
                    this.$patch({
                        reminders: reminders.data.results,
                        remindersCount: reminders.data.total,

                    })

                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async getMeToOB() {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const metoob = await axios.get('https://cm.qspiders.com/counselor/from-me-other-branch/', {
                        headers: headers
                    });
                    this.$patch({
                        meToOB: metoob.data.results,
                        meToOBCount: metoob.data.total,

                    })

                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async getOBToMe() {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const obtome = await axios.get('https://cm.qspiders.com/counselor/other-branch-to-me/', {
                        headers: headers
                    });
                    this.$patch({
                        oBToMe: obtome.data.results,
                        oBToMeCount: obtome.data.total,

                    })

                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async getMissedCalls() {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const missedcalls = await axios.get('https://cm.qspiders.com/callrecord/get-missed-calls/', {
                        headers: headers
                    });
                    this.$patch({
                        missedCalls: missedcalls.data.results,
                        missedCallsCount: missedcalls.data.total,

                    })

                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async getNeedOnline() {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const needonline = await axios.get('https://cm.qspiders.com/counselor/status-need-online/', {
                        headers: headers
                    });
                    this.$patch({
                        needOnline: needonline.data.results,
                        needOnlineCount: needonline.data.total,

                    })

                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async getNextBatch() {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const nextbatch = await axios.get('https://cm.qspiders.com/counselor/status-next-batch/', {
                        headers: headers
                    });
                    this.$patch({
                        nextBatch: nextbatch.data.results,
                        nextBatchCount: nextbatch.data.total,

                    })

                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async getFormValues() {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const values = await axios.get('https://cm.qspiders.com/counselor/enquiry-form-values/', {
                        headers: headers
                    });
                    this.$patch({
                        mode: values.data.mode,
                        classtiming: values.data.classtiming,
                        timeslot: values.data.timeslot,
                        highestdegree: values.data.highestdegree,
                        courses: values.data.courses,
                        modeclass: values.data.modeclass,
                        branches: values.data.branches,
                        degree: values.data.degree,
                        masters: values.data.masters,
                    })

                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async getSearchValues() {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const values = await axios.get('https://cm.qspiders.com/counselor/enquiry-search-values/', {
                        headers: headers
                    });
                    this.$patch({
                        mode: values.data.mode,
                        classtiming: values.data.classtiming,
                        timeslot: values.data.timeslot,
                        highestdegree: values.data.highestdegree,
                        courses: values.data.courses,
                    })

                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async getAcademicValues() {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const values = await axios.get('https://cm.qspiders.com/counselor/enquiry-academic-values/', {
                        headers: headers
                    });
                    console.log(values)
                    this.$patch({
                        highestdegree: values.data.highestdegree,
                        degree: values.data.degree,
                        masters: values.data.masters,
                    })

                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async getCourseValues() {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const values = await axios.get('https://cm.qspiders.com/counselor/enquiry-course-values/?per_page=200', {
                        headers: headers
                    });
                    this.$patch({
                        courses: values.data.courses,
                        modeclass: values.data.modeclass,
                        branches: values.data.branches,
                    })

                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async getERecordValues(id) {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    if (id) {
                        const records = await axios.get(`https://cm.qspiders.com/counselor/call-records-by-enquiry/?id=${id}`, {
                            headers: headers
                        });
                        this.records = records.data.results
                        this.recordCount = records.data.total
                    }
                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async getNRecordValues(number) {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    if (number) {
                        const records = await axios.get(`https://cm.qspiders.com/callrecord/call-records-by-number/?number=${number}`, {
                            headers: headers
                        });
                        this.nrecords = records.data.results
                        this.nrecordCount = records.data.total
                    }
                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async getEReasons() {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const reasons = await axios.get('https://cm.qspiders.com/escalations/reasons/?per_page=200', {
                        headers: headers
                    });
                    this.eReasons = reasons.data.results
                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async getBCounselors() {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const busers = await axios.get('https://cm.qspiders.com/counselor/branch-counselors/?per_page=200', {
                        headers: headers
                    });
                    this.bUsers = busers.data.results
                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async getRReasons() {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const reasons = await axios.get('https://cm.qspiders.com/counselor/remove-reason/?per_page=200', {
                        headers: headers
                    });
                    this.rReasons = reasons.data.results
                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async getCallStatus() {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const status = await axios.get('https://cm.qspiders.com/callrecord/main-status/?per_page=200', {
                        headers: headers
                    });
                    this.callStatus = status.data.results
                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async getCategoryStatus() {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const status = await axios.get('https://cm.qspiders.com/callrecord/category/?per_page=200', {
                        headers: headers
                    });
                    this.categoryStatus = status.data.results
                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async getRecord(rid) {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const record = await axios.get(`https://cm.qspiders.com/callrecord/call-record-by-id/?rid=${rid}`, {
                        headers: headers
                    });
                    this.singleRecord = record.data.results
                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async getEnquiries(page = 1, search = "") {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const enquiries = await axios.get(`https://cm.qspiders.com/counselor/enquiries/?page=${page}${search}`, {
                        headers: headers
                    });
                    this.enquiries = enquiries.data.results
                    this.enqCount = enquiries.data.total

                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async getNoEnquiryForm(page = 1) {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const calls = await axios.get(`https://cm.qspiders.com/callrecord/call-record-enquiry/?page=${page}`, {
                        headers: headers
                    });
                    this.noEnquiryForms = calls.data.results
                    this.noEnqFormCount = calls.data.total

                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async getUpdateStatus(page = 1) {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const calls = await axios.get(`https://cm.qspiders.com/callrecord/call-record-no-status/?page=${page}`, {
                        headers: headers
                    });
                    this.updateStatus = calls.data.results
                    this.updateStatusCount = calls.data.total

                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async getDataNotTaken(page = 1) {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const enqs = await axios.get(`https://cm.qspiders.com/counselor/data-not-taken/?page=${page}`, {
                        headers: headers
                    });
                    this.dataNotTaken = enqs.data.results
                    this.dataNotTakenCount = enqs.data.total

                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async getStars(page = 1) {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const stars = await axios.get(`https://cm.qspiders.com/counselor/stars/?page=${page}`, {
                        headers: headers
                    });
                    this.stars = stars.data.results
                    this.starsCount = stars.data.total

                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async getEscalatedToMe(page = 1) {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const enqs = await axios.get(`https://cm.qspiders.com/counselor/escalated-to-me/?page=${page}`, {
                        headers: headers
                    });
                    this.esclatedToMe = enqs.data.results
                    this.esclatedToMeCount = enqs.data.total

                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async getEscalatedByMe(page = 1) {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const enqs = await axios.get(`https://cm.qspiders.com/counselor/escalated-by-me/?page=${page}`, {
                        headers: headers
                    });
                    this.esclatedByMe = enqs.data.results
                    this.esclatedByMeCount = enqs.data.total

                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async getStreams(query, type) {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const streams = await axios.get(`https://cm.qspiders.com/education/streams/?qualification_type=${type}&name=${query}`, {
                        headers: headers
                    });
                    return streams.data

                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async getColleges(query, type) {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const colleges = await axios.get(`https://cm.qspiders.com/education/colleges/?qualification_type=${type}&name=${query}`, {
                        headers: headers
                    });
                    return colleges.data

                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async getReferrals(page = 1) {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const refers = await axios.get(`https://cm.qspiders.com/counselor/referrals-count/?page=${page}`, {
                        headers: headers
                    });
                    this.refers = refers.data
                    this.referCount = refers.data.total

                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async getReferralsInside(query, page = 1) {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const refers = await axios.get(`https://cm.qspiders.com/counselor/referrals-inside/?page=${page}&${query}`, {
                        headers: headers
                    });
                    this.refersInside = refers.data.results
                    this.refersInsideCount = refers.data.total

                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async getNoCallsEnquiry(page = 1) {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const ncs = await axios.get(`https://cm.qspiders.com/counselor/no-calls-enquiry/?page=${page}`, {
                        headers: headers
                    });
                    this.noCallEnquiry = ncs.data.results
                    this.noCallEnquiryCount = ncs.data.total

                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async submitEnquiry(form) {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const response = await axios.post('https://cm.qspiders.com/counselor/enquiry-submit/', form, { headers });
                    return response
                }
                catch (err) {
                    return { message: 'Error has occured', error: err };
                }
            }
        },
        async submitAcademic(form) {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const response = await axios.post('https://cm.qspiders.com/counselor/enquiry/au-education/', form, { headers });
                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async submitContact(form) {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const response = await axios.post('https://cm.qspiders.com/counselor/enquiry/au-contact/', form, { headers });
                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async submitEmail(form) {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const response = await axios.post('https://cm.qspiders.com/counselor/enquiry/au-email/', form, { headers });
                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async submitCourse(form) {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const response = await axios.post('https://cm.qspiders.com/counselor/enquiry/au-course/', form, { headers });
                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async submitEscalate(form) {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const response = await axios.post('https://cm.qspiders.com/counselor/escalate-enquiry/', form, { headers });
                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async submitRemove(form) {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const response = await axios.post('https://cm.qspiders.com/counselor/remove-enquiry/', form, { headers });
                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async submitOnline(form) {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const response = await axios.post('https://cm.qspiders.com/counselor/need-online/', form, { headers });
                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async submitChangeStatus(form) {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const response = await axios.post('https://cm.qspiders.com/callrecord/call-record-change-status/', form, { headers });
                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async submitAddStatus(form) {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const response = await axios.post('https://cm.qspiders.com/callrecord/call-record-update-status/', form, { headers });
                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async unStar(form) {
            const user = sessionStore();
            const token = user.user.token
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }
                try {
                    const response = await axios.post('https://cm.qspiders.com/commons2/star-remove/', form, { headers });
                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
    }

})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(counselorStore, import.meta.hot))
}