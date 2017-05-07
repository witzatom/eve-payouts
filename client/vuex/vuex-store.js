import Vue from 'vue';
import Vuex from 'vuex';
import {
  actions
} from './actions.js'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isConnected: false,
    sitesData: [],
    opData: [],
    opList: []
  },

  mutations: {
    SOCKET_CONNECT(state) {
      console.log('SOCKET_CONNECT');
      state.isConnected = true;
    },

    SOCKET_DISCONNECT(state) {
      console.log('SOCKET_DISCONNECT');
      state.isConnected = false;
    },

    SOCKET_PARTICIPANT_ADDED(state, data) {
      console.log('SOCKET_PARTICIPANT_ADDED');
      console.log(JSON.stringify(data));
      var found = -1;
      for (var i = 0; i < state.sitesData.length; i++) {
        if (state.sitesData[i].id === data.SiteId) {
          /*if (!state.sitesData[i]['SiteParticipations'])
            state.sitesData[i]['SiteParticipations'] = [];*/
          state.sitesData[i].SiteParticipations.push(data);
          break;
        }
      }
    },

    SOCKET_PARTICIPANT_UPDATE(state, data) {
      console.log('SOCKET_PARTICIPANT_UPDATE');
      console.log(JSON.stringify(data));
      var found = -1;
      for (var i = 0; i < state.sitesData.length; i++) {
        if (state.sitesData[i].id == data.SiteId) {
          var currentSite = state.sitesData[i];
          for (var j = 0; j < currentSite.SiteParticipations.length; j++) {
            if (currentSite.SiteParticipations[j].id == data.id) {
              currentSite.SiteParticipations[j] = data;
              break;
            }
          }
          break;
        }
      }
    },

    SOCKET_GET_SITES(state, data) {
      console.log('SOCKET_GET_SITES');
      console.log(JSON.stringify(data));
      state.sitesData = data;
      for (var i = 0; i < state.sitesData.length; i++) {
        /*if (!state.sitesData[i]['SiteParticipations'])
          state.sitesData[i]['SiteParticipations'] = [];*/
      }
    },

    SOCKET_GET_SITE(state, data) {
      console.log('SOCKET_GET_SITE');
      console.log(JSON.stringify(data));
      if (!data['SiteParticipations'])
        data['SiteParticipations'] = [];
      var found = -1;
      for (var i = 0; i < state.sitesData.length; i++) {
        if (state.sitesData[i].id == data.id) {
          found = i;
          break;
        }
      }
      if (found >= 0)
        state.sitesData[i] = data;
      else
        state.sitesData.push(data);
    },

    SOCKET_GET_OP(state, data) {
      console.log('SOCKET_GET_OP');
      console.log(JSON.stringify(data));
      state.opData = data
    },

    SOCKET_GET_OPS(state, data) {
      console.log('SOCKET_GET_OPS');
      console.log(JSON.stringify(data));
      state.opList = data
    }
  },
  actions
});