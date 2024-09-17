<template>
    <div class="app-container">
        <!-- Recommended Products -->
        <div class="recommended-products">
          <h2 class="section-title">สินค้าแนะนำ</h2>
          <div class="product-grid">
            <!-- วนลูปแสดงสินค้าที่แตกต่างกัน -->
            <div class="product-box" v-for="(product, index) in paginatedProducts" :key="index" @click="onProductClick(index)">
              <div class="like-button">❤️</div>
              <img :src="product.image" :alt="product.name" class="product-image">
              <p>{{ product.name }}</p>
              <p>Price: {{ product.price }} บาท</p>
              <p>{{ product.store }}</p>
            </div>
          </div>
        </div>
        <!-- Pagination Controls -->
        <div class="pagination-controls">
          <button @click="prevPage" class="arrow-btn">←</button>
          <span class="page-number" v-for="page in totalPages" :key="page" @click="goToPage(page)" :class="{'active-page': page === currentPage}">
          {{ page }}
          </span>
          <button @click="nextPage" class="arrow-btn">→</button>
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
import productAImage from '@/assets/product1.png';
import productBImage from '@/assets/product1.png';
import productCImage from '@/assets/product1.png';
import productDImage from '@/assets/product1.png';
import productEImage from '@/assets/product1.png';
import productFImage from '@/assets/product1.png';

export default {
    data() {
      return {
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
          { name: 'Manchester United 23/24 มือสองสภาพดี ไซต์L', image: productAImage, price: 1000, store: 'ร้านค้า 1' },
          { name: 'Manchester United 23/24 มือสองสภาพดี ไซต์L', image: productBImage, price: 2000, store: 'ร้านค้า 2' },
          { name: 'Manchester United 23/24 มือสองสภาพดี ไซต์L', image: productCImage, price: 3000, store: 'ร้านค้า 3' },
          { name: 'Manchester United 23/24 มือสองสภาพดี ไซต์L', image: productDImage, price: 4000, store: 'ร้านค้า 4' },
          { name: 'Manchester United 23/24 มือสองสภาพดี ไซต์L', image: productEImage, price: 5000, store: 'ร้านค้า 5' },
          { name: 'Manchester United 23/24 มือสองสภาพดี ไซต์L', image: productFImage, price: 6000, store: 'ร้านค้า 6' },
          { name: 'Manchester United 23/24 มือสองสภาพดี ไซต์L', image: productFImage, price: 7000, store: 'ร้านค้า 7' },
          { name: 'Manchester United 23/24 มือสองสภาพดี ไซต์L', image: productFImage, price: 8000, store: 'ร้านค้า 8' },
          { name: 'Manchester United 23/24 มือสองสภาพดี ไซต์L', image: productFImage, price: 9000, store: 'ร้านค้า 9' },
          { name: 'Manchester United 23/24 มือสองสภาพดี ไซต์L', image: productFImage, price: 10000, store: 'ร้านค้า 10' },
          { name: 'Manchester United 23/24 มือสองสภาพดี ไซต์L', image: productFImage, price: 11000, store: 'ร้านค้า 11' },
          { name: 'Manchester United 23/24 มือสองสภาพดี ไซต์L', image: productFImage, price: 12000, store: 'ร้านค้า 12' },
        ],
        currentPage: 1, // หน้าเริ่มต้น
        productsPerPage: 12, // จำนวนสินค้าที่แสดงต่อหน้า
      };
    },
    computed: {
      paginatedProducts() {
      // กำหนดช่วงของสินค้าที่จะแสดงในแต่ละหน้า
        const start = (this.currentPage - 1) * this.productsPerPage;
        const end = start + this.productsPerPage;
        return this.recommendedProducts.slice(start, end);
      },
      totalPages() {
        return Math.ceil(this.recommendedProducts.length / this.productsPerPage);
      }
    },
    methods: {
  onProductClick(index) {
    this.$router.push({ name: 'ProductDetail', params: { id: index } });
  },
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  },
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  },
  goToPage(page) {
    this.currentPage = page;
  }
}

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

  /* Recommended Products Styles */
  .recommended-products {
    padding: 100px 0;
  }
  
  .section-title {
    margin-left:250px;
    font-size: 24px;
    margin-bottom: 100px;
  }
  
  .product-grid {
    display: grid;
    grid-template-columns: repeat(4, 300px);
    gap: 75px;
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

  .pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 100px;
}

.arrow-btn {
  background-color: #ffffff;
  border: none;
  color: rgb(0, 0, 0);
  font-size: 20px;
  padding: 10px 15px;
  cursor: pointer;
  margin: 0 10px;
}

.page-number {
  font-size: 20px;
  font-weight: bold;
  margin: 0 10px;
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
}

.active-page {
  background-color: #ffffff;
  color: rgb(0, 0, 0);
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