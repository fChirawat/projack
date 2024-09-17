<template>
  <div class="app-container">
    <!-- Navbar -->
    <Headbar />

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
    <router-view />
    <!-- Footer -->
    <Footer />
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

import closeMenuIcon from '@/assets/closemenu.png';
import openMenuIcon from '@/assets/openmenu.png';

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


</style>