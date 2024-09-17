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
          <div class="prelogin">
            <router-link to="/signup" class="text-black">สมัครสมาชิก</router-link>
            <router-link to="/signin" class="text-black">เข้าสู่ระบบ</router-link>
          </div>
          <button class="sell-button">ลงขายสินค้า</button>
        </div>
      </div>
  
      <!-- Advertisement -->
      <div class="advertisement">
        <button class="arrow-button left-arrow">&#10094;</button>
        <div class="ads-container">
          <!-- Ads go here -->
        </div>
        <button class="arrow-button right-arrow">&#10095;</button>
        <div class="dot-navigation">
          <!-- Dot navigation goes here -->
        </div>
      </div>
  
      <!-- Categories -->
      <div class="categories">
        <h2 class="section-title">หมวดหมู่</h2>
        <div class="category-grid">
          <!-- วนลูปแสดงหมวดหมู่ที่แตกต่างกัน -->
          <div class="category-box" v-for="(category, index) in categories" :key="index" @click="onCategoryClick(index)">
            <img :src="category.image" :alt="category.name" class="category-image">
            <p>{{ category.name }}</p>
          </div>
        </div>
      </div>
  
      <!-- Recommended Products -->
      <div class="recommended-products">
        <h2 class="section-title">สินค้าแนะนำ</h2>
        <div class="product-grid">
          <!-- วนลูปแสดงสินค้าที่แตกต่างกัน -->
          <div class="product-box" v-for="(product, index) in recommendedProducts" :key="index" @click="onProductClick(index)">
            <div class="like-button">❤️</div>
            <img :src="product.image" :alt="product.name" class="product-image">
            <p>{{ product.name }}</p>
            <p>Price: {{ product.price }} บาท</p>
            <p>{{ product.store }}</p>
          </div>
        </div>
      </div>
      <div class="more-pages">
        <router-link to="/recom" class="text-black">เพิ่มเติม</router-link>
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
  import shirtImage from '@/assets/category1.png';
  import pantsImage from '@/assets/category2.png';
  import shoesImage from '@/assets/category3.png';
  import hatImage from '@/assets/category4.png';
  import necklaceImage from '@/assets/category5.png';
  import ringsImage from '@/assets/category6.png';
  import braceletsImage from '@/assets/category7.png';
  import earringImage from '@/assets/category8.png';
  
  import productAImage from '@/assets/product1.png';
  import productBImage from '@/assets/product1.png';
  import productCImage from '@/assets/product1.png';
  import productDImage from '@/assets/product1.png';
  import productEImage from '@/assets/product1.png';
  import productFImage from '@/assets/product1.png';
  
  export default {
    data() {
      return {
        categories: [
          { name: 'เสื้อผ้า', image: shirtImage },
          { name: 'กางเกง', image: pantsImage },
          { name: 'รองเท้า', image: shoesImage },
          { name: 'หมวก', image: hatImage },
          { name: 'สร้อยคอ', image: necklaceImage },
          { name: 'แหวน', image: ringsImage },
          { name: 'กำไลข้อมือ', image: braceletsImage },
          { name: 'ต่างหู', image: earringImage }
        ],
        recommendedProducts: [
          { name: 'Manchester United 23/24 มือสองสภาพดี ไซต์L', image: productAImage, price: 1000, store: 'ร้านค้า 1' },
          { name: 'Manchester United 23/24 มือสองสภาพดี ไซต์L', image: productBImage, price: 2000, store: 'ร้านค้า 2' },
          { name: 'Manchester United 23/24 มือสองสภาพดี ไซต์L', image: productCImage, price: 3000, store: 'ร้านค้า 3' },
          { name: 'Manchester United 23/24 มือสองสภาพดี ไซต์L', image: productDImage, price: 4000, store: 'ร้านค้า 4' },
          { name: 'Manchester United 23/24 มือสองสภาพดี ไซต์L', image: productEImage, price: 5000, store: 'ร้านค้า 5' },
          { name: 'Manchester United 23/24 มือสองสภาพดี ไซต์L', image: productFImage, price: 6000, store: 'ร้านค้า 6' },
          { name: 'Manchester United 23/24 มือสองสภาพดี ไซต์L', image: productFImage, price: 6000, store: 'ร้านค้า 7' },
          { name: 'Manchester United 23/24 มือสองสภาพดี ไซต์L', image: productFImage, price: 6000, store: 'ร้านค้า 8' },
          { name: 'Manchester United 23/24 มือสองสภาพดี ไซต์L', image: productFImage, price: 6000, store: 'ร้านค้า 9' },
          { name: 'Manchester United 23/24 มือสองสภาพดี ไซต์L', image: productFImage, price: 6000, store: 'ร้านค้า 10' },
          { name: 'Manchester United 23/24 มือสองสภาพดี ไซต์L', image: productFImage, price: 6000, store: 'ร้านค้า 11' },
          { name: 'Manchester United 23/24 มือสองสภาพดี ไซต์L', image: productFImage, price: 6000, store: 'ร้านค้า 12' },
        ],
        searchQuery: '', // เก็บข้อมูลที่ผู้ใช้พิมพ์ในช่องค้นหา
        showSuggestions: false, // ควบคุมการแสดงผลป๊อปอัพ
        suggestions: ['รองเท้า', 'เสื้อผ้า', 'หมวก', 'สร้อยคอ', 'กำไลข้อมือ'],
      };
    },
    methods: {
      onCategoryClick(index) {
        alert(`คุณคลิกหมวดหมู่ ${this.categories[index].name}`);
      },
      onProductClick(index) {
        alert(`คุณคลิกสินค้า ${this.recommendedProducts[index].name}`);
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
  
  <style scoped>
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
  
  .prelogin {
  display: flex;
  align-items: center; /* ปรับให้ลิงก์อยู่กลางแนวตั้ง */
  justify-content: flex-end; /* จัดลิงก์ให้อยู่ทางด้านขวา */
  margin-right: 150px; /* ปรับพื้นที่ทางขวา */
  gap: 50px; /* เพิ่มช่องว่างระหว่างลิงก์ */
}

.prelogin a {
  text-decoration: none; /* ลบเส้นใต้ */
  color: #000; /* สีตัวหนังสือ */
  padding: 5px 10px; /* เพิ่มพื้นที่รอบๆตัวหนังสือ */
  border-radius: 5px; /* เพิ่มความโค้งให้กับลิงก์ */
  transition: background-color 0.3s ease; /* เพิ่ม transition effect */
}

.prelogin a:hover {
  background-color: #f0f0f0; /* เปลี่ยนพื้นหลังเมื่อ hover */
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
  
  /* Advertisement Styles */
  .advertisement {
    position: relative;
    width: 100%;
    height: 645px;
    background-color: #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .arrow-button {
    position: absolute;
    top: 50%;
    background-color: rgba(0,0,0,0.5);
    color: #fff;
    border: none;
    cursor: pointer;
    padding: 10px;
    z-index: 1;
  }
  
  .left-arrow {
    left: 10px;
  }
  
  .right-arrow {
    right: 10px;
  }
  
  .dot-navigation {
    position: absolute;
    bottom: 10px;
    display: flex;
  }
  
  .dot-navigation div {
    width: 10px;
    height: 10px;
    background-color: #888;
    border-radius: 50%;
    margin: 0 5px;
  }
  
  /* Categories Styles */
  .categories {
    padding: 20px 0;
  }
  
  .section-title {
    margin-left: 185px;
    font-size: 24px;
  }
  
  .category-grid {
    display: grid;
    grid-template-columns: repeat(4, 200px);
    gap: 30px;
    justify-content: center;
  }
  
  .category-box {
    width: 200px;
    height: 200px;
    background-color: #f4f4f4;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .category-image {
    width: 100px;
    height: 100px;
  }
  
  /* Recommended Products Styles */
  .recommended-products {
    padding: 20px 0;
  }
  
  .product-grid {
    display: grid;
    grid-template-columns: repeat(4, 300px);
    gap: 30px;
    justify-content: center;
  }
  
  .product-box {
    width: 300px;
    height: 400px;
    background-color: #f4f4f4;
    position: relative;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .product-image {
    width: 150px;
    height: 150px;
  }
  
  .like-button {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
  
  .more-pages {
  display: flex;
  align-items: center; 
  justify-content: center; 
  margin-top: 50px;
  margin-bottom: 250px;
  gap: 50px; 
}

  .more-pages a {
    text-decoration: none; /* ลบเส้นใต้ */
    color: #000; /* สีตัวหนังสือ */
    padding: 5px 10px; /* เพิ่มพื้นที่รอบๆตัวหนังสือ */
    border-radius: 5px; /* เพิ่มความโค้งให้กับลิงก์ */
    transition: background-color 0.3s ease; /* เพิ่ม transition effect */
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
  }
  .footer-icon {
  display: flex;
  }
  </style>
  