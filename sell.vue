<template>
  <div class="container">
    <form @submit.prevent="submitForm">
      <!-- หัวข้อสินค้า -->
      <div class="form-group">
        <label for="productName">หัวข้อสินค้าที่คุณต้องการขาย*</label>
        <input
          v-model="productName"
          type="text"
          id="productName"
          class="form-control"
          :class="{ 'is-invalid': errors.productName }"
          placeholder="ชื่อสินค้าเช่น เสื้อบอลสภาพเหมือนใหม่"
          @input="validateProductName"
        />
      </div>
      <small class="text-danger small-text" v-if="errors.productName">ไม่ควรใส่อักขระพิเศษ เช่น &*#^</small>

      <!-- เลือกหมวดหมู่ -->
      <div class="form-group">
        <label for="category">เลือกหมวดหมู่ให้ตรงกับสินค้า*</label>
        <select v-model="category" id="category" class="form-control">
          <option disabled value="">เลือกหมวดหมู่</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>

      <!-- ราคา -->
      <div class="form-group">
        <label for="price">ระบุราคาที่เหมาะสม*</label>
        <input v-model="price" type="number" id="price" class="form-control" placeholder="ระบุราคาเต็มของสินค้า/บริการ" />
      </div>

      <!-- อัพโหลดรูปภาพ -->
      <div class="form-group">
        <label>รูปภาพสินค้า*</label>
        <div class="upload-container">
          <input type="file" @change="handleImageUpload" multiple />
        </div>
      </div>
      <small class="small-text text-danger" v-if="images.length > 15">ใส่รูปได้สูงสุด 15 รูป</small>

      <!-- รายละเอียดสินค้า -->
      <div class="form-group">
        <label for="description">รายละเอียดสินค้า</label>
        <textarea v-model="description" id="description" class="form-control" placeholder="ข้อมูลเพิ่มเติม เช่น สภาพสินค้า สี อายุการใช้งาน ระยะประกัน"></textarea>
      </div>

      <!-- พื้นที่ของสินค้า -->
      <div class="form-group">
        <label for="location">ระบุพื้นที่ของสินค้า*</label>
        <div class="location-select">
          <select v-model="location.province" @change="fetchDistricts" class="form-control">
            <option disabled value="">เลือกจังหวัด</option>
            <option v-for="province in provinces" :key="province" :value="province">{{ province }}</option>
          </select>

          <select v-model="location.district" class="form-control">
            <option disabled value="">เลือกอำเภอ</option>
            <option v-for="district in districts" :key="district" :value="district">{{ district }}</option>
          </select>
        </div>
      </div>

      <!-- เบอร์โทร -->
      <div class="form-group">
        <label for="phone">เบอร์โทรศัพท์ติดต่อ*</label>
        <input
          v-model="phone"
          type="tel"
          id="phone"
          class="form-control"
          placeholder="มือถือเช่น 08XXXXXXXX"
          @input="validatePhoneNumber"
        />
      </div>
      <small class="text-danger small-text" v-if="errors.phone">กรุณาใส่เบอร์โทรที่คุณใช้สมัครสมาชิก เพื่อความปลอดภัยในการใช้งาน หากพบปัญหา สามารถติดต่อฝ่ายบริการลูกค้า</small>

      <!-- ปุ่มส่งฟอร์ม -->
      <div class="form-group button-group">
        <p class="terms-text">คลิกปุ่ม ”ต่อไป” เพื่อยอมรับ <a href="#">ข้อกำหนดและเงื่อนไข</a></p>
        <button type="submit" class="btn-next">ต่อไป</button>
      </div>
    </form>
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
</template>

<script>
export default {
  data() {
    return {
      productName: '',
      category: '',
      price: '',
      images: [],
      description: '',
      location: {
        province: '',
        district: '',
      },
      phone: '',
      errors: {
        productName: false,
        phone: false,
      },
      categories: ['หมวก', 'เสื้อ', 'กางเกง', 'รองเท้า', 'สร้อยคอ', 'แหวน', 'กำไลข้อมือ', 'ต่างหู'],
      provinces: ['กรุงเทพฯ', 'เชียงใหม่', 'ภูเก็ต'], // รายชื่อจังหวัดทั้งหมด
      districts: [], // จะถูกโหลดตามจังหวัดที่เลือก
    };
  },
  methods: {
  validateProductName() {
    const regex = /^[\u0E00-\u0E7Fa-zA-Z0-9\s\-_]+$/; // ไม่อนุญาตให้มีอักษรพิเศษ
    this.errors.productName = !regex.test(this.productName);
  },
  handleImageUpload(event) {
    const files = event.target.files;
    if (files.length > 15) {
      return; // ไม่ให้อัพโหลดเกิน 15 รูป
    }
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.images.push(e.target.result);
      };
      reader.readAsDataURL(files[i]);
    }
  },
  fetchDistricts() {
    // ตัวอย่างการดึงข้อมูลอำเภอตามจังหวัดที่เลือก
    if (this.location.province === 'กรุงเทพฯ') {
      this.districts = ['เขตดุสิต', 'เขตปทุมวัน'];
    } else if (this.location.province === 'เชียงใหม่') {
      this.districts = ['อำเภอเมืองเชียงใหม่', 'อำเภอสันทราย'];
    }
  },
  validatePhoneNumber() {
    const phoneRegex = /^08\d{8}$/; // ตรวจสอบว่าเบอร์โทรขึ้นต้นด้วย 08 และมี 10 หลัก
    this.errors.phone = !phoneRegex.test(this.phone);
  },
  submitForm() {
    if (!this.errors.productName && !this.errors.phone && this.images.length <= 15) {
      // เปลี่ยนไปหน้ายืนยัน
      this.$router.push({
        name: 'ConSell', // ให้ตรงกับชื่อ route ของหน้ายืนยัน
        params: {
          productName: this.productName,
          category: this.category,
          price: this.price,
          images: this.images,
          description: this.description,
          location: this.location,
          phone: this.phone,
        },
      });
    } else {
      alert('กรุณากรอกข้อมูลให้ถูกต้อง');
    }
  },
},
};
</script>

<style>
.container {
  max-width: 800px;
  margin: 0 auto;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  margin-top: 90px;
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

label {
  width: 30%; /* ขนาดของ label */
  margin-right: 10px;
  flex-shrink: 0; /* ป้องกันไม่ให้ label ย่อขนาด */
}

input[type="text"],
input[type="number"],
input[type="tel"],
select,
textarea {
  width: 70%; /* ขนาดของช่องกรอกข้อมูล */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

textarea {
  resize: vertical;
}

.upload-container {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  width: 70%; /* ทำให้ขนาดของ upload-container เท่ากับช่องกรอกข้อมูล */
}

.location-select {
  display: flex;
  gap: 10px;
  width: 70%; /* ทำให้ขนาดของ location-select เท่ากับช่องกรอกข้อมูล */
}

.small-text {
  display: block;
  margin-left: 31%; /* ปรับให้เข้ากับขนาดของช่องกรอกข้อมูล */
  margin-bottom: 10px;
}

.button-group {
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.terms-text {
  text-align: center;
  margin-bottom: 10px;
  margin-left: 80px;
}

.btn-next {
  width: 250px;
  height: 50px;
  background-color: #EB8237;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
}

.text-danger {
  color: red;
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
