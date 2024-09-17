<template>
  <div class="app-container">
    <!-- Navbar -->
    <div class="navbar">
      <div class="navbar-left">
        <img src="@/assets/logo.png" alt="Logo" class="navbar-logo">
        <div class="search-bar">
          <input 
            type="text" 
            placeholder="ค้นหา" 
            class="search-input" 
            v-model="searchQuery" 
            @focus="showSuggestions = true" 
            @blur="hideSuggestions"
            @input="onSearchInput"
          >
          <div class="search-icon-wrapper">
            <img src="@/assets/search-icon.png" alt="Search Icon" class="search-icon">
          </div>

          <!-- ป๊อปอัพสำหรับคำแนะนำการค้นหา -->
          <div v-if="showSuggestions && filteredSuggestions.length" class="autocomplete-popup">
            <ul>
              <li v-for="(suggestion, index) in filteredSuggestions" :key="index" @mousedown="selectSuggestion(suggestion)">
                {{ suggestion }}
              </li>
            </ul>
          </div>
        </div>
        <div class="icons">
          <img src="@/assets/user.png" alt="User Icon" class="icon">
          <p>{{ username }}</p> 
          <img 
            :src="isMenuOpen ? openMenuIcon : closeMenuIcon" 
            alt="Menu Icon" 
            class="icon" 
            @click="toggleMenu" 
          />  
          <!-- เมนูป๊อปอัพ -->
          <div v-if="isMenuOpen" class="popup-menu">
            <ul>
              <li><a href="#">จัดประกาศ</a></li>
              <li><a href="#">หน้าร้านของฉัน</a></li>
              <li><a href="#">ประวัติการใช้บริการ</a></li>
              <li><a href="#">เเชท</a></li>
              <li><a href="#">รายการโปรด</a></li>
              <li><a href="#">เเก้ไขข้อมูลส่วนตัว</a></li>
              <li><a href="#">ออกจากระบบ</a></li>
            </ul>
          </div>
        </div>
         <button class="sell-button"><router-link to="/sell" class="text-black">ลงขายสินค้า</router-link></button>
      </div>
    </div>
  <div class="confirm-container">
    <div class="confirm-content">
      <div class="product-summary">
        <h2>รายละเอียดสินค้า</h2>
        <div class="product-images">
          <img v-for="(image, index) in images" :key="index" :src="image" class="product-image" />
        </div>
        <ul>
          <li><strong>ชื่อสินค้า:</strong> {{ productName }}</li>
          <li><strong>หมวดหมู่:</strong> {{ category }}</li>
          <li><strong>ราคา:</strong> {{ price }}</li>
          <li><strong>รายละเอียด:</strong> {{ description }}</li>
          <li><strong>พื้นที่:</strong> {{ location.province }}, {{ location.district }}</li>
          <li><strong>เบอร์โทรศัพท์:</strong> {{ phone }}</li>
        </ul>
      </div>

      <div class="order-summary">
        <h2>สรุปรายการ</h2>
        <p>คุณมี {{ images.length }} รายการที่จะลงขาย</p>
        <button @click="confirmSale" class="btn-confirm">ยืนยันการลงขาย</button>
      </div>
    </div>

    <div v-if="showPopup" class="popup-overlay">
      <div class="popup-content">
        <h2>ลงขายสำเร็จ!</h2>
        <p>สินค้าของคุณถูกลงขายเรียบร้อยแล้ว</p>
        <button @click="goToSell" class="btn-home">ลงขายเพิ่ม</button>
        <button @click="goToHome" class="btn-home">กลับไปหน้า Home</button>
      </div>
    </div>
  </div>
  <!-- Footer -->
  <footer>
      <div class="footer-section">
        <h3>เกี่ยวกับเรา</h3>
        <p>ติดตามเราบน:</p>
        <div class="social-icons">
          <img src="@/assets/fb.png" alt="Facebook" class="social-icon">
          <img src="@/assets/line.png" alt="Line" class="social-icon">
          <img src="@/assets/ig.png" alt="Instagram" class="social-icon">
        </div>
      </div>
      <div class="footer-section">
        <h3>ศูนย์ช่วยเหลือ</h3>
        <p><a href="#">ข้อกำหนดและเงื่อนไขในการใช้งาน</a></p>
        <p><a href="#">นโยบายความเป็นส่วนตัว</a></p>
      </div>
      <div class="footer-section">
        <h3>ติดต่อเรา</h3>
        <p>บริษัท จูอาโล่ มาร์เก็ตเพลส จำกัด </p>
        <p>เลขที่ 191/23 อาคารซีทีไอ ทาวเวอร์ ชั้น 26 </p>
        <p>ถนน รัชดาภิเษก แขวงคลองเตย เขตคลองเตย </p>
        <p> กรุงเทพมหานคร 10110</p>
        <div class="footer-icon">
          <img src="@/assets/phone.png" alt="Phone" class="social-icon"><p>091-XXXXX</p>
        </div>
        <div class="footer-icon">
          <img src="@/assets/email.png" alt="Email" class="social-icon"><p>jenglovegtas@gmail.com</p>
        </div>
      </div>
    </footer>
</div>
</template>

<script>
import closeMenuIcon from '@/assets/closemenu.png';
import openMenuIcon from '@/assets/openmenu.png';

export default {
  data() {
    return {
    productName: this.$route.params.productName || 'ไม่ระบุ',
    category: this.$route.params.category || 'ไม่ระบุ',
    price: this.$route.params.price || 'ไม่ระบุ',
    images: this.$route.params.images || [],
    description: this.$route.params.description || 'ไม่ระบุ',
    location: this.$route.params.location || {}, // ตั้งค่าเริ่มต้นเป็นวัตถุว่าง
    phone: this.$route.params.phone || 'ไม่ระบุ',
    showPopup: false, // เพิ่มนี้เพื่อแสดง popup
    username: 'JohnDoe',
    isMenuOpen: false,
    closeMenuIcon, 
    openMenuIcon,
    searchQuery: '', // เก็บข้อมูลที่ผู้ใช้พิมพ์ในช่องค้นหา
    showSuggestions: false, // ควบคุมการแสดงผลป๊อปอัพ
    suggestions: ['รองเท้า', 'เสื้อผ้า', 'หมวก', 'สร้อยคอ', 'กำไลข้อมือ'],
  };
},
  methods: {
    confirmSale() {
      this.showPopup = true;
    },
    goToHome() {
      this.$router.push('/home');
    },
    goToSell() {
      this.$router.push('/sell');
    },
    onProductClick(index) {
      this.$router.push({ name: 'ProductDetail', params: { id: index } });
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    onSearchInput() {
      // แสดงคำแนะนำเมื่อมีการพิมพ์
      this.showSuggestions = true;
    },
    hideSuggestions() {
      // ซ่อนคำแนะนำหลังจากคลิกนอกช่องค้นหา
      setTimeout(() => {
        this.showSuggestions = false;
      }, 200);
    },
    selectSuggestion(suggestion) {
      // เลือกคำแนะนำที่คลิก
      this.searchQuery = suggestion;
      this.showSuggestions = false;
    }
  },
  computed: {
    filteredSuggestions() {
      // กรองคำแนะนำตามสิ่งที่ผู้ใช้พิมพ์
      return this.suggestions.filter(suggestion =>
        suggestion.includes(this.searchQuery)
      );
    }
  },
};
</script>

  
<style>

/* General Styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

html, body, #app {
  height: 100%;
}

/* Navbar Styles */
.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  background-color: #f8f8f8;
  position: relative;
}

.navbar-left {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1800px; /* Adjust to fit your design */
}

.navbar-logo {
  width: 50px;
  margin-right: 20px;
  margin-left: 100px; /* Adjust to add space from the left edge */
}

.autocomplete-popup {
  position: absolute;
  top: 45px; /* ระยะห่างจากช่องค้นหา */
  left: 0;
  width: 85%;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  z-index: 999;
  display: flex; /* ใช้ flexbox สำหรับการจัดเรียง */
  justify-content: flex-start; /* จัดให้อยู่ชิดซ้าย */
  padding: 10px;
}

.autocomplete-popup ul {
  display: flex; /* แสดงรายการในแนวนอน */
  list-style: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap; /* ถ้ามีรายการยาวเกินจะให้เลื่อนไปบรรทัดถัดไป */
}

.autocomplete-popup li {
  padding: 10px;
  cursor: pointer;
  white-space: nowrap; /* ป้องกันการตัดคำในบรรทัดเดียว */
}

.autocomplete-popup li:hover {
  background-color: #f0f0f0;
}

.search-bar {
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
}

.search-input {
  width: 100%;
  max-width: 970px;
  height: 40px;
  padding-left: 10px;
  padding-right: 40px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.search-icon-wrapper {
  position: absolute;
  right: 170px;
  display: flex;
  align-items: center;
  height: 100%;
}

.search-icon {
  width: 20px;
  height: 20px;
}

.icons {
  display: flex;
  align-items: center;
  margin-right: 250px;
}

.icon {
  width: 30px;
  margin-right: 10px;
  cursor: pointer; /* ทำให้ไอคอนดูเป็นปุ่ม */
}

.popup-menu {
  position: absolute; /* ทำให้เมนูลอย */
  top: 60px; /* ระยะห่างจากปุ่ม */
  right: 400px; /* ปรับตำแหน่งให้ตรงกับปุ่มกด */
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  width: 150px;
  z-index: 1000; /* เพื่อให้อยู่ด้านบน */
}

.popup-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.popup-menu li {
  padding: 10px;
  text-align: left;
}

.popup-menu li a {
  text-decoration: none;
  color: #333;
}

.popup-menu li:hover {
  background-color: #f0f0f0;
}

.sell-button {
  background-color: #ff7f3f;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: auto; /* Align to the right */
}

.sell-button a {
  text-decoration: none; /* ลบเส้นใต้ */
  color: #000; /* สีตัวหนังสือ */
  padding: 5px 10px; /* เพิ่มพื้นที่รอบๆตัวหนังสือ */
  border-radius: 5px; /* เพิ่มความโค้งให้กับลิงก์ */
  transition: background-color 0.3s ease; /* เพิ่ม transition effect */
}

  .confirm-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    margin-top: 90px;
    margin-bottom: 345px;
  }
  
  .confirm-content {
    display: flex;
    justify-content: space-between;
  }
  
  .product-summary {
    width: 60%;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  
  .product-images {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .product-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .order-summary {
    width: 35%;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    text-align: center;
  }
  
  .btn-confirm {
    width: 200px;
    height: 50px;
    background-color: #EB8237;
    border: none;
    color: rgb(0, 0, 0);
    font-size: 16px;
    cursor: pointer;
    border-radius: 4px;
    margin-top: 20px;
  }
  
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .popup-content {
    background: white;
    padding: 30px;
    border-radius: 8px;
    text-align: center;
  }
  
  .btn-home {
    width: 150px;
    height: 40px;
    background-color: #EB8237;
    border: none;
    color: rgb(0, 0, 0);
    font-size: 16px;
    cursor: pointer;
    border-radius: 4px;
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
  }

/* Footer Styles */
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
  height: 20px;
}
.footer-icon {
  display: flex;
}
  </style>
  