const state = {
    keepAives: false
}

const mutations = {
    CHANGE_KEEPAIVE: (state) => {
        state.keepAives = !state.keepAives
    }
}

export default {
    namespaced: true,
    state,
    mutations,
}