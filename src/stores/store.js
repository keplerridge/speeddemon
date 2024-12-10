import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
      username: '',
      user_id: null,
    }),
    actions: {
      setUser(username, user_id) {
        this.username = username;
        this.user_id = user_id;
      },
      clearUser() {
        this.username = '';
        this.user_id = null;
      },
    },
    getters: {
      isUserLoggedIn: (state) => !!state.username && !!state.user_id,
    },
});
