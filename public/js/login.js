const { createApp } = Vue;

createApp({
  data() {
    return {
      username: '',
      password: '',
      repeatPassword: '',
      userType: '',
    };
  },
  methods: {
    saveUser() {
      console.log('saving user', this.$data);
    },
  },
}).mount('#loginPage');
