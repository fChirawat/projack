<template>
  <div class="app-container">
    <div class="login-container">
      <div class="login-box">
        <div class="logo">
          <img src="@/assets/logo.png" alt="Logo" class="logo-image">
        </div>
        <h2>Sign Up</h2>
        <form @submit.prevent="handleSubmit">
          <div class="input-group">
            <label for="username"><i class="fas fa-user"></i></label>
            <input type="text" id="username" v-model="username" placeholder="Username" required>
          </div>
          <div class="input-group">
            <label for="email"><i class="fas fa-envelope"></i></label>
            <input type="email" id="email" v-model="email" placeholder="Email" required>
          </div>
          <div class="input-group">
            <label for="password"><i class="fas fa-lock"></i></label>
            <div class="password-container">
              <input :type="passwordVisible ? 'text' : 'password'" id="password" v-model="password" placeholder="Password" required>
              <button type="button" @click="togglePasswordVisibility" class="password-toggle">
                <i :class="passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
          </div>
          <div class="input-group">
            <label for="confirm-password"><i class="fas fa-lock"></i></label>
            <div class="password-container">
              <input :type="passwordVisible ? 'text' : 'password'" id="confirm-password" v-model="confirmPassword" placeholder="Confirm Password" required>
              <button type="button" @click="togglePasswordVisibility" class="password-toggle">
                <i :class="passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
          </div>
          <button type="submit" :disabled="!isFormValid" class="signup-button">สมัครสมาชิก</button>
        </form>
        <div class="login-link">
          <p>Already Have an Account? <router-link to="/signin" class="text-black">Sign In</router-link></p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from 'axios';
import Footer from '@/components/Footer.vue';

export default {
  name: "register",
  components: {
    Footer
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      passwordVisible: false // State for toggling password visibility
    };
  },
  computed: {
    isFormValid() {
      return this.username && this.email && this.password && this.confirmPassword && this.password === this.confirmPassword;
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    async handleSubmit() {
      try {
        // ส่งคำขอสมัครสมาชิกไปยังเซิร์ฟเวอร์
        const response = await axios.post('http://localhost:3000/register', {
          username: this.username,
          email: this.email,
          password: this.password
        });

        // ตรวจสอบสถานะการตอบกลับ
        if (response.status === 201) { // ใช้ 201 สำหรับการสร้างทรัพยากรใหม่
          alert('Sign Up successful');
          // เปลี่ยนเส้นทางไปยังหน้าล็อกอินหลังจากสมัครสมาชิกสำเร็จ
          this.$router.push('/signin');
        }
      } catch (error) {
        // ตรวจสอบข้อผิดพลาดอย่างปลอดภัย
        let message = 'Sign Up failed';
        if (error.response && error.response.data && error.response.data.message) {
          message = error.response.data.message;
        } else if (error.response && error.response.status) {
          message = `Error ${error.response.status}: ${error.response.statusText}`;
        }
        alert(message);
      }
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

html, body, #app, .app-container {
  height: 100%;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

body {
  background-color: #f9f9f9;
}

.login-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box {
  background-color: #ffffff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 400px;
}

.logo {
  margin-bottom: 20px;
}

.logo-image {
  width: 50px;
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.input-group {
  margin-bottom: 15px;
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  color: #555;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.password-container {
  position: relative;
}

.password-container input {
  width: 100%;
}

.password-toggle {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #555;
}

.password-toggle i {
  font-size: 18px;
}

.signup-button {
  background-color: #ff7f3f;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  width: 100%;
  cursor: pointer;
  font-size: 16px;
}

.signup-button:hover {
  background-color: #ff671c;
}

.login-link {
  margin-top: 20px;
  font-size: 14px;
  color: #888;
}

.login-link a {
  color: #ff7f3f;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}

footer {
  padding: 20px;
  background-color: #ff7f3f;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
}

.footer-section h3 {
  margin-bottom: 10px;
}

.footer-section p, .footer-section a {
  color: #fff;
}

.social-icons {
  display: flex;
}

.social-icon {
  width: 20px;
  margin-right: 10px;
}
.footer-icon {
  display: flex;
}
</style>
