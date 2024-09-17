<template>
  <div id="app">
    <div class="product-details">
      <!-- Product Image Section and Info Section -->
      <div class="main-content">
        <div class="image-section">
          <div class="main-image-container">
            <button class="arrow-button left-arrow" @click="prevImage">←</button>
            <img :src="currentImage" alt="Product Image" class="main-image">
            <button class="arrow-button right-arrow" @click="nextImage">→</button>
            <div class="like-icon">❤️</div>
          </div>
          <div class="thumbnail-container">
            <img 
              v-for="(image, index) in productImages" 
              :key="index" 
              :src="image" 
              class="thumbnail" 
              @click="selectImage(index)">
          </div>
        </div>
  
        <div class="info-section">
          <h2>{{ productName }}</h2>
          <p class="price">{{ price }} บาท</p>
          <p class="seller">ลงขายโดย {{ sellerName }}</p>
  
          <!-- Action Buttons -->
          <div class="action-buttons">
            <button class="action-button">
              <img src="@/assets/chat.png" alt="Chat Icon" class="icon"> คุยกับผู้ขาย
            </button>
            <button class="action-button">
              <img src="@/assets/phone.png" alt="Phone Icon" class="icon"> โทร
            </button>
          </div>
  
          <!-- Product Details -->
          <div class="product-description">
            <h3>รายละเอียดสินค้า</h3>
            <p>เสื้อManchester United 23/24</p>
            <p>ของแท้ 💯</p>
            <p>ไซส์ L</p>
            <p>สภาพสินค้า: มือสอง</p>
            <p>ลงขายเมื่อ: 21 ส.ค. 2567 19:16 น.</p>
            <p>ตำแหน่งสินค้า: ศรีสะเกษ</p>
            <p>หมายเลขประกาศ: 370032303</p>
            <p>ส่งต่อครับ 1 ตัว จัดส่งหรือนัดรับได้ค่ะ</p>
            <p>🆔 LINE: Jeng12345</p>
            <p>ทักมาได้ตลอดเลยนะครับ (ต่อรองราคาได้ครับ😆 )</p>
          </div>
        </div>
      </div>
  
      <!-- Seller Info -->
      <div class="seller-info">
        <img src="@/assets/seller.png" alt="Seller Image" class="seller-image">
        <div class="seller-text">
          <p>ขายเสื้อบอลมือ2สภาพดี</p>
          <p>เป็นสมาชิกมาแล้ว 1 ปี 3 เดือน 11 วัน</p>
        </div>
        <div class="seller-actions">
          <button class="action-button">
            <img src="@/assets/phone.png" alt="Phone Icon" class="icon"> โทร
          </button>
          <button class="action-button">
            <img src="@/assets/products.png" alt="Products Icon" class="icon"> ดูสินค้าทั้งหมด
          </button>
        </div>
      </div>
  
      <!-- Related Products -->
      <div class="related-products">
        <h3>สินค้าที่คุณอาจจะสนใจ</h3>
        <div class="product-grid">
          <div class="product-box" v-for="product in relatedProducts" :key="product.id">
            <img :src="product.image" alt="Related Product" class="related-image">
            <div class="like-icon">❤️</div>
            <p>{{ product.name }}</p>
            <p class="price">{{ product.price }} บาท</p>
            <div class="location-icon">
              <img src="@/assets/location.png" alt="Location Icon" class="icon"> {{ product.location }}
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Footer Section -->
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
        <p>บริษัท จูอาโล่ มาร์เก็ตเพลส จำกัด</p>
        <p>เลขที่ 191/23 อาคารซีทีไอ ทาวเวอร์ ชั้น 26</p>
        <p>ถนน รัชดาภิเษก แขวงคลองเตย เขตคลองเตย</p>
        <p>กรุงเทพมหานคร 10110</p>
        <div class="footer-icon">
          <img src="@/assets/phone.png" alt="Phone" class="social-icon">
          <p>091-XXXXX</p>
        </div>
        <div class="footer-icon">
          <img src="@/assets/email.png" alt="Email" class="social-icon">
          <p>jenglovegtas@gmail.com</p>
        </div>
      </div>
    </footer>
  </div>
</template>

  
  <script>
  import productImage1 from '@/assets/product1.png';
  import productImage2 from '@/assets/product2.png';
  import productImage3 from '@/assets/product3.png';
  import productImage4 from '@/assets/product4.png';
  import productImage5 from '@/assets/product5.png';
  
  export default {
    data() {
      return {
        currentImageIndex: 0,
        productImages: [
           productImage1,
           productImage2,
           productImage3,
           productImage4,
           productImage5
        ],
        productName: 'เสื้อManchester United 23/24',
        price: 1000,
        sellerName: 'Jeng12345',
        relatedProducts: [
          { id: 1, name: 'เสื้อ Chelsea 2024', price: 1200, location: 'กรุงเทพ', image: productImage1 },
          { id: 2, name: 'เสื้อ Liverpool 2023', price: 900, location: 'นนทบุรี', image: productImage1 },
          { id: 3, name: 'เสื้อ Arsenal 2024', price: 1500, location: 'เชียงใหม่', image: productImage1 },
          { id: 4, name: 'เสื้อ Barcelona 2023', price: 2000, location: 'ภูเก็ต', image: productImage1 }
        ]
      };
    },
    computed: {
      currentImage() {
        return this.productImages[this.currentImageIndex];
      }
    },
    methods: {
      selectImage(index) {
        this.currentImageIndex = index;
      },
      nextImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.productImages.length;
      },
      prevImage() {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.productImages.length) % this.productImages.length;
      }
    }
  };
  </script>
  
  <style scoped>
html, body {
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

footer {
  padding: 20px;
  background-color: #ff7f3f;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-shrink: 0; /* Ensures the footer stays at the bottom */
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
  width: 30px;
  margin-right: 10px;
  height: 30px;
}

.footer-icon {
  display: flex;
}

main {
  flex: 1;
}

.product-details {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-content {
  display: flex;
  gap: 20px;
  margin-bottom: 50px; /* Adjust the spacing from the bottom */
  border: 2px solid #ddd; /* Border around the main content */
  padding: 20px;
  border-radius: 8px;
}

.image-section {
  position: relative;
  width: 600px;
  height: 700px;
  border: 1px solid #ccc; /* Border around the image section */
  border-radius: 8px;
}

.main-image-container {
  position: relative;
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ccc; /* Border between the main image and thumbnails */
}

.main-image {
  width: 350px;
  height: 350px;
}

.thumbnail-container {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}

.thumbnail {
  width: 80px;
  height: 80px;
  cursor: pointer;
  border: 1px solid #ccc; /* Border around thumbnail images */
  border-radius: 4px;
}

.arrow-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.left-arrow {
  left: 0;
}

.right-arrow {
  right: 0;
}

.like-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
}

.info-section {
  max-width: 400px;
  border: 1px solid #ddd; /* Border around the info section */
  border-radius: 8px;
  padding: 20px;
}

.price {
  font-size: 24px;
  color: #ff7f3f;
}

.action-buttons {
  display: flex;
  gap: 10px;
  margin: 20px 0;
}

.action-button {
  display: flex;
  align-items: center;
  background-color: #ff7f3f;
  color: #fff;
  padding: 10px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.icon {
  width: 24px;
  margin-right: 10px;
}

.product-description {
  margin-top: 20px;
}

.seller-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc; /* Border around the seller info */
  padding: 10px;
  border-radius: 8px;
}

.seller-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.seller-text {
  flex: 1;
  margin-left: 10px;
  margin-right: 20px;
}

.seller-actions {
  display: flex;
  gap: 10px;
}

.related-products {
  text-align: left;
  margin-top: 40px;
 
  padding: 20px;
}

.product-grid {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
}

.product-box {
  width: 300px;
  position: relative; /* กำหนดให้กล่องสินค้าเป็นตำแหน่งอ้างอิงสำหรับไอคอนหัวใจ */
  border: 1px solid #ddd; 
  border-radius: 8px;
  padding: 10px;
  text-align: center;
}

.like-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
}


.related-image {
  width: 100%;
  border-bottom: 1px solid #ddd; /* Border between image and text */
}

.location-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.location-icon img {
  width: 14px;
  margin-right: 5px;
}

</style>
