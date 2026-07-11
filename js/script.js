// Database Utama Inventori 21 Produk Lengkap BITZZ PHONE
const defaultProducts = [
  // Kategori: iPhone
  { id: "17pm", nama: "iPhone 17 Pro Max", kategori: "iphone", harga: 26500000, img: "image/17_pm-removebg-preview.png", brand: "Apple Smartphone", tag: "Terbaru", stok: 10 },
  { id: "17p", nama: "iPhone 17 Pro", kategori: "iphone", harga: 23000000, img: "image/17p-removebg-preview.png", brand: "Apple Smartphone", tag: "Terbaru", stok: 12 },
  { id: "17b", nama: "iPhone 17 Standard", kategori: "iphone", harga: 15000000, img: "image/17b-removebg-preview.png", brand: "Apple Smartphone", tag: "Terbaru", stok: 15 },
  { id: "16pm", nama: "iPhone 16 Pro Max", kategori: "iphone", harga: 23500000, img: "image/ip_16_pm-removebg-preview.png", brand: "Apple Smartphone", tag: "", stok: 8 },
  { id: "16p", nama: "iPhone 16 Pro", kategori: "iphone", harga: 19500000, img: "image/ip_16_p-removebg-preview.png", brand: "Apple Smartphone", tag: "", stok: 14 },
  { id: "16b", nama: "iPhone 16 Standard", kategori: "iphone", harga: 15000000, img: "image/16_b-removebg-preview.png", brand: "Apple Smartphone", tag: "", stok: 20 },
  { id: "15pm", nama: "iPhone 15 Pro Max", kategori: "iphone", harga: 11000000, img: "image/ip_15_pm-removebg-preview.png", brand: "Apple Smartphone", tag: "", stok: 5 },
  { id: "15p", nama: "iPhone 15 Pro", kategori: "iphone", harga: 19500000, img: "image/ip_15p-removebg-preview.png", brand: "Apple Smartphone", tag: "", stok: 7 },
  { id: "15b", nama: "iPhone 15 Standard", kategori: "iphone", harga: 15000000, img: "image/ip_15_b-removebg-preview.png", brand: "Apple Smartphone", tag: "", stok: 11 },
  { id: "14pm", nama: "iPhone 14 Pro Max", kategori: "iphone", harga: 9500000, img: "image/iphone_14_pro_max_gold_1_3-removebg-preview.png", brand: "Apple Smartphone", tag: "", stok: 4 },
  { id: "14p", nama: "iPhone 14 Pro", kategori: "iphone", harga: 8500000, img: "image/sewa-rental-iphone-14-pro-jakarta-1-removebg-preview.png", brand: "Apple Smartphone", tag: "", stok: 6 },
  
  // Kategori: MacBook
  { id: "mbpm3", nama: "MacBook Pro M3 Pro", kategori: "macbook", harga: 28999000, img: "image/mcb3pro.png", brand: "Apple Computing", tag: "Hot Item", stok: 5 },
  { id: "mbam3", nama: "MacBook Air M3", kategori: "macbook", harga: 19450000, img: "image/mba_13_m3_2024_hero.png", brand: "Apple Computing", tag: "", stok: 9 },
  { id: "mbpm2", nama: "MacBook Pro M2", kategori: "macbook", harga: 21000000, img: "image/111869_sp870-macbook-pro-13-in-m2-2022.png", brand: "Apple Computing", tag: "", stok: 3 },
  { id: "mbam2", nama: "MacBook Air M2", kategori: "macbook", harga: 16200000, img: "image/macbook_air_m2_midnight_pdp_image_position-1__id_1_1-removebg-preview.png", brand: "Apple Computing", tag: "", stok: 8 },
  { id: "mbpm1", nama: "MacBook Pro M1", kategori: "macbook", harga: 14500000, img: "image/produk-1737789267-removebg-preview.png", brand: "Apple Computing", tag: "", stok: 2 },
  
  // Kategori: iPad
  { id: "ippm4", nama: "iPad Pro M4", kategori: "ipad", harga: 19499000, img: "image/ipad-pro-11-inch-13-inch.png", brand: "Apple Tablet", tag: "Ultra Thin", stok: 7 },
  { id: "ipair6", nama: "iPad Air 6 M2", kategori: "ipad", height: 11200000, harga: 11200000, img: "image/images-removebg-preview.png", brand: "Apple Tablet", tag: "", stok: 12 },
  { id: "ippm2", nama: "iPad Pro M2", kategori: "ipad", harga: 14800000, img: "image/ipad_m2-removebg-preview.png", brand: "Apple Tablet", tag: "", stok: 4 },
  { id: "ip10", nama: "iPad 10th Gen", kategori: "ipad", harga: 5999000, img: "image/ipad_gen_10_10_9_inci_wi-fi_blue_1_1-removebg-preview.png", brand: "Apple Tablet", tag: "", stok: 18 },
  { id: "ipmini6", nama: "iPad Mini 6", kategori: "ipad", harga: 7850000, img: "image/iPad Mini 6.png", brand: "Apple Tablet", tag: "", stok: 10 }
];

let products = JSON.parse(localStorage.getItem("bitzz_products")) || defaultProducts;
if(!localStorage.getItem("bitzz_products")) {
  localStorage.setItem("bitzz_products", JSON.stringify(products));
}

let cart = JSON.parse(localStorage.getItem("bitzz_cart")) || [];
let currentUser = JSON.parse(localStorage.getItem("bitzz_user")) || null;
let activeCategory = "";

document.addEventListener("DOMContentLoaded", () => {
  console.log("BITZZ SYSTEM OPERASIONAL: Infrastruktur Siap.");
  updateCartCountBadge();
  renderProducts(); // Inisialisasi awal render
  
  const greetingElem = document.getElementById("userGreeting");
  if (currentUser && greetingElem) {
    greetingElem.innerText = `Halo, ${currentUser.nama} ✨`;
  }
});

// Render Komponen Katalog Secara Dinamis
function renderProducts(filterInput = "") {
  const grid = document.getElementById("productGrid");
  if (!grid) return;
  grid.innerHTML = "";

  products.forEach(p => {
    // Filter Kategori Kontrol & Filter Search Bar Kontrol
    const matchCategory = activeCategory === "" || p.kategori === activeCategory;
    const matchSearch = p.nama.toLowerCase().includes(filterInput.toLowerCase());

    if (matchCategory && matchSearch) {
      const isOut = p.stok <= 0;
      const card = document.createElement("article");
      card.className = "product-card";
      card.setAttribute("data-title", p.nama.toLowerCase());
      card.setAttribute("data-category", p.kategori);

      card.innerHTML = `
        ${p.tag ? `<div class="badge-new">${p.tag}</div>` : ''}
        <div class="product-image-container">
          <img src="${p.img}" alt="${p.nama}" class="product-image" onerror="this.src='https://placehold.co/160x160/1f2937/ffffff?text=${p.nama}'" />
        </div>
        <div class="product-info">
          <span class="product-brand">${p.brand}</span>
          <h3 class="product-name">${p.nama}</h3>
          
          <div style="margin-bottom:10px;">
            <label style="font-size:0.75rem; font-weight:600; display:block; margin-bottom:3px;">Pilih Kapasitas:</label>
            <select id="storage-${p.id}" style="width:100%; padding:5px; border-radius:6px; font-size:0.8rem; background:var(--input-bg); color:var(--text-main); border:1px solid var(--border-color);">
              <option value="128GB">128 GB</option>
              <option value="256GB">256 GB (+ Rp 1.500.000)</option>
              <option value="512GB">512 GB (+ Rp 3.500.000)</option>
              <option value="1TB">1 TB (+ Rp 6.000.000)</option>
            </select>
          </div>

          <div class="product-price">Rp ${p.harga.toLocaleString("id-ID")}</div>
          
          <div style="font-size:0.8rem; font-weight:600; margin: 8px 0; color:${isOut ? '#dc3545' : 'var(--text-muted)'};">
            ${isOut ? '<i class="fa-solid fa-circle-xmark"></i> Stok Habis' : `<i class="fa-solid fa-box-open"></i> Stok Tersedia: ${p.stok} Unit`}
          </div>

          <div class="qty-box">
            <label>Qty:</label>
            <input type="number" value="1" min="1" id="qty-${p.id}" ${isOut ? 'disabled' : ''} />
          </div>
          <div class="product-actions">
            <button class="btn-add-cart-main" onclick="addToCart('${p.id}')" ${isOut ? 'disabled style="background:#6c757d; cursor:not-allowed;"' : ''}>
              <i class="fa-solid fa-cart-plus"></i> ${isOut ? 'Habis' : 'Beli Perangkat'}
            </button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    }
  });
}

function addToCart(productId) {
  const p = products.find(prod => prod.id === productId);
  if (!p) return;

  const qtyInput = document.getElementById(`qty-${p.id}`);
  const storageSelect = document.getElementById(`storage-${p.id}`);
  
  const qty = qtyInput ? (parseInt(qtyInput.value) || 1) : 1;
  const storage = storageSelect ? storageSelect.value : "128GB";

  if (qty < 1) {
    alert("Batas minimum pembelian perangkat adalah 1 unit.");
    return;
  }

  if (qty > p.stok) {
    alert(`Maaf, stok tidak mencukupi. Sisa stok tersedia: ${p.stok} unit.`);
    return;
  }

  // Hitung Modifikasi Penambahan Harga Berdasarkan Kapasitas Storage
  let hargaFinal = p.harga;
  if(storage === "256GB") hargaFinal += 1500000;
  if(storage === "512GB") hargaFinal += 3500000;
  if(storage === "1TB") hargaFinal += 6000000;

  const cartItemName = `${p.nama} (${storage})`;

  const existingItemIndex = cart.findIndex(item => item.nama === cartItemName);
  if (existingItemIndex > -1) {
    if ((cart[existingItemIndex].qty + qty) > p.stok) {
      alert(`Gagal menambah: Total unit di keranjang melebihi stok toko.`);
      return;
    }
    cart[existingItemIndex].qty += qty;
  } else {
    cart.push({ id: p.id, nama: cartItemName, harga: hargaFinal, qty: qty });
  }

  localStorage.setItem("bitzz_cart", JSON.stringify(cart));
  if (qtyInput) qtyInput.value = 1; 
  
  updateCartCountBadge();
  alert(`Sukses: ${cartItemName} sebanyak ${qty} Unit masuk ke Tas Belanja.`);
}

function updateCartCountBadge() {
  const badge = document.getElementById("cartCount");
  if (badge) {
    badge.innerText = cart.reduce((sum, item) => sum + (item.qty || 0), 0);
  }
}

// Navigasi Filter Kategori Utama
function filterCategory(category, element) {
  const buttons = document.querySelectorAll('.category-card');
  buttons.forEach(btn => btn.classList.remove('active'));
  if (element) element.classList.add('active');

  activeCategory = category;
  
  const sectionKatalog = document.getElementById("katalogSection");
  if (sectionKatalog) sectionKatalog.style.display = "block";

  const judulKatalog = document.getElementById("katalogTitle");
  if (judulKatalog) judulKatalog.innerText = "Katalog Produk " + category.toUpperCase();

  // Kosongkan kolom pencarian agar tidak bentrok dengan filter kategori
  const searchInput = document.getElementById("mainSearch");
  if(searchInput) searchInput.value = "";

  renderProducts();

  if (sectionKatalog) {
    sectionKatalog.scrollIntoView({ behavior: 'smooth' });
  }
}

function forceOpenCatalog() {
  activeCategory = "";
  const sectionKatalog = document.getElementById("katalogSection");
  if (sectionKatalog) sectionKatalog.style.display = "block";
  const judulKatalog = document.getElementById("katalogTitle");
  if (judulKatalog) judulKatalog.innerText = "Semua Katalog Produk";
  
  const buttons = document.querySelectorAll('.category-card');
  buttons.forEach(btn => btn.classList.remove('active'));
  
  // Kosongkan kolom pencarian
  const searchInput = document.getElementById("mainSearch");
  if(searchInput) searchInput.value = "";

  renderProducts();
}

// ==========================================
// PERBAIKAN FITUR PENCARIAN (MESIN PENCARI)
// ==========================================
function searchApp() {
  const input = document.getElementById("mainSearch").value.toLowerCase().trim();
  const sectionKatalog = document.getElementById("katalogSection");
  const judulKatalog = document.getElementById("katalogTitle");

  // PENTING: Reset kategori aktif saat pengguna mulai mengetik di mesin pencari
  // Agar sistem mencari di seluruh produk, tidak hanya di satu kategori saja.
  activeCategory = ""; 
  
  // Hilangkan efek aktif (warna biru) pada tombol kategori karena kita sedang mencari mode global
  const buttons = document.querySelectorAll('.category-card');
  buttons.forEach(btn => btn.classList.remove('active'));

  if (input !== "") {
    if (sectionKatalog) sectionKatalog.style.display = "block";
    if (judulKatalog) judulKatalog.innerText = 'Hasil Pencarian: "' + input + '"';
    renderProducts(input);
  } else {
    // Jika kolom pencarian dikosongkan, kembali tampilkan semua produk
    if (judulKatalog) judulKatalog.innerText = "Semua Katalog Produk";
    renderProducts();
  }
}

// SYSTEM BACK-END MODUL PORTAL ADMIN LOCALSTORAGE CONTROL
function openAdminModal() {
  document.getElementById("adminModal").style.display = "flex";
}
function closeAdminModal() {
  document.getElementById("adminModal").style.display = "none";
}
function handleAdminLogin(e) {
  e.preventDefault();
  const u = document.getElementById("adminUser").value;
  const p = document.getElementById("adminPass").value;

  if (u === "ilhammangekyo@gmail.com" && p === "Ilham191107") {
    closeAdminModal();
    openAdminPanelModal();
  } else {
    alert("Akses Ditolak: Username atau password salah!");
  }
}

function openAdminPanelModal() {
  document.getElementById("adminPanelModal").style.display = "flex";
  const listArea = document.getElementById("adminProductList");
  listArea.innerHTML = "";

  products.forEach(p => {
    const row = document.createElement("div");
    row.style.cssText = "display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; border-bottom:1px solid var(--border-color); padding-bottom:8px;";
    row.innerHTML = `
      <span style="font-size:0.85rem; font-weight:600; max-width:60%;">${p.nama}</span>
      <div>
        <label style="font-size:0.75rem; margin-right:5px;">Stok:</label>
        <input type="number" id="adm-stok-${p.id}" value="${p.stok}" min="0" style="width:70px; padding:4px; text-align:center; border-radius:6px; border:1px solid var(--border-color); background:var(--input-bg); color:var(--text-main);" />
      </div>
    `;
    listArea.appendChild(row);
  });
}

function closeAdminPanelModal() {
  products.forEach(p => {
    const inp = document.getElementById(`adm-stok-${p.id}`);
    if (inp) {
      p.stok = parseInt(inp.value) || 0;
    }
  });
  localStorage.setItem("bitzz_products", JSON.stringify(products));
  document.getElementById("adminPanelModal").style.display = "none";
  
  // Ambil nilai pencarian (jika ada) lalu render
  const searchInput = document.getElementById("mainSearch") ? document.getElementById("mainSearch").value : "";
  renderProducts(searchInput);
  
  alert("Sistem Berhasil Diperbarui: Kuantitas stok inventori toko sinkron.");
}

// LOGIC TRANSAKSI & CHECKOUT SYSTEM
function openCartModal() {
  renderCartOrCheckoutUI();
  const modal = document.getElementById("modal");
  if (modal) modal.style.display = "flex";
}
function closeModal() {
  document.getElementById("modal").style.display = "none";
}
window.onclick = function (e) {
  if (e.target == document.getElementById("modal")) closeModal();
};

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("bitzz_cart", JSON.stringify(cart));
  updateCartCountBadge();
  renderCartOrCheckoutUI();
}

function renderCartOrCheckoutUI() {
  const modalContent = document.getElementById("modalContent");
  if (!modalContent) return;

  if (cart.length === 0) {
    modalContent.innerHTML = `
      <h2 style="text-align:center;">Tas Belanja</h2>
      <hr style="margin: 15px 0; opacity: 0.1" />
      <p style='text-align:center; padding: 20px 0; font-size:0.9rem; opacity:0.7;'>Tas Belanja Anda masih kosong.</p>
      <button onclick="closeModal()" class="btn btn-primary" style="margin:0 auto; display:block;">Menjelajah</button>
    `;
    return;
  }

  let itemsHtml = "";
  let grandTotal = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.harga * item.qty;
    grandTotal += itemTotal;
    itemsHtml += `
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding: 10px 0;">
        <div>
          <strong style="font-size:0.85rem;">${item.nama}</strong><br>
          <small style="opacity: 0.7;">Rp ${item.harga.toLocaleString("id-ID")} &times; ${item.qty}</small>
        </div>
        <div style="text-align:right">
          <span style="font-size:0.9rem; font-weight:600;">Rp ${itemTotal.toLocaleString("id-ID")}</span><br>
          <button onclick="removeFromCart(${index})" style="background:none; border:none; color:#dc3545; cursor:pointer; font-size:0.75rem; text-decoration:underline;">Hapus</button>
        </div>
      </div>
    `;
  });

  modalContent.innerHTML = `
    <h2 style="text-align:center;">Ringkasan Belanja</h2>
    <hr style="margin: 15px 0; opacity: 0.1;" />
    <div style="max-height: 180px; overflow-y: auto; margin-bottom: 15px;">${itemsHtml}</div>
    <div style="display:flex; justify-content:space-between; font-weight:700; margin-bottom: 20px; font-size:1rem; border-top:1px solid var(--border-color); padding-top:10px;">
      <span>Subtotal:</span>
      <span>Rp ${grandTotal.toLocaleString("id-ID")}</span>
    </div>
    <button onclick="triggerCheckoutFlow()" class="btn btn-primary w-100">PROSES CHECKOUT</button>
  `;
}

function triggerCheckoutFlow() {
  if (!currentUser) {
    closeModal();
    document.getElementById("authModal").style.display = "flex";
    document.getElementById("mainContentWrapper").classList.add("blurred");
  } else {
    renderActualCheckoutForm();
  }
}

function handleRegistration(event) {
  event.preventDefault();
  currentUser = {
    nama: document.getElementById("regName").value.trim(),
    phone: document.getElementById("regPhone").value.trim(),
    alamat: document.getElementById("regAddress").value.trim(),
    noRekening: document.getElementById("regBankNo").value.trim(),
    namaBank: document.getElementById("regBankName").value
  };
  localStorage.setItem("bitzz_user", JSON.stringify(currentUser));
  closeAuthModal();
  if(document.getElementById("userGreeting")) {
    document.getElementById("userGreeting").innerText = `Halo, ${currentUser.nama} ✨`;
  }
  openCartModal();
  renderActualCheckoutForm();
}

function closeAuthModal() {
  document.getElementById("authModal").style.display = "none";
  document.getElementById("mainContentWrapper").classList.remove("blurred");
}

function renderActualCheckoutForm() {
  const modalContent = document.getElementById("modalContent");
  if (!modalContent) return;

  let grandTotal = cart.reduce((sum, item) => sum + (item.harga * item.qty), 0);

  modalContent.innerHTML = `
    <h2 style="text-align:center;">Metode Pembayaran</h2>
    <hr style="margin: 10px 0; opacity: 0.1" />
    <div style="display:flex; justify-content:space-between; font-weight:700; margin-bottom: 10px; font-size:1rem;">
      <span>Total Tagihan:</span>
      <span style="color:var(--neon-blue);">Rp ${grandTotal.toLocaleString("id-ID")}</span>
    </div>
    <form class="form-checkout" onsubmit="processPaymentGateway(event, ${grandTotal})">
      <label>Nama Penerima</label>
      <input type="text" value="${currentUser.nama}" readonly />
      <label>Alamat Kirim</label>
      <input type="text" value="${currentUser.alamat}" readonly />
      <label>Metode Safe-Gate *</label>
      <select id="paymentMethod" required>
        <option value="QRIS">QRIS Standar Finansial Dinamis</option>
        <option value="SeaBank">Transfer Rekening SeaBank Corporate</option>
        <option value="DANA">Giro Kilat Saldo DANA Enterprise</option>
      </select>
      <div class="motto-box"><strong>MOTO: Gadget Premium, Pelayanan Bintang Lima!</strong></div>
      <button type="submit" class="btn btn-primary w-100">PROSES INVOICE RESMI</button>
    </form>
  `;
}

function processPaymentGateway(event, grandTotal) {
  event.preventDefault();
  const method = document.getElementById("paymentMethod").value;
  const invoiceNo = "INV-" + Math.floor(100000 + Math.random() * 900000);
  const dateNow = new Date().toLocaleString("id-ID");

  // Potong Stok Produk Di Sini Saat Faktur Tercetak Sukses
  cart.forEach(item => {
    const pIndex = products.findIndex(prod => prod.id === item.id);
    if(pIndex > -1) {
      products[pIndex].stok = Math.max(0, products[pIndex].stok - item.qty);
    }
  });
  localStorage.setItem("bitzz_products", JSON.stringify(products));

  // Siapkan rincian untuk HTML (Invoice) dan Text (WhatsApp)
  let itemsSummaryHtml = "";
  let waItemsText = ""; 
  
  cart.forEach(item => {
    itemsSummaryHtml += `<li>${item.nama} (${item.qty}x) - <strong>Rp ${(item.harga * item.qty).toLocaleString("id-ID")}</strong></li>`;
    waItemsText += `- ${item.nama} (${item.qty}x) : Rp ${(item.harga * item.qty).toLocaleString("id-ID")}%0A`;
  });

  // Instruksi Pembayaran Sesuai Metode
  let paymentInstruction = "";
  if (method === "QRIS") {
    paymentInstruction = `
      <p style="font-size:0.8rem; text-align:center; margin-bottom:5px;">Pindai QRIS Resmi <strong>Bitzz Store</strong>:</p>
      <img src="image/qris.jpeg" alt="QRIS" class="qris-image" onerror="this.src='https://placehold.co/120x120/ffffff/000000?text=QRIS+CODE'" />
      <span style="font-size:0.7rem; opacity:0.7; display:block; text-align:center;">NMID: ID1026531348849</span>
    `;
  } else if (method === "SeaBank") {
    paymentInstruction = `
      <p>Transfer Manual Bank: <strong>SeaBank</strong></p>
      <p>No Rekening: <strong style="color:#dc3545;">9016 8120 0790</strong></p>
      <p>A/N Pemilik: <strong>ILHAM HIDAYAT</strong></p>
    `;
  } else if (method === "DANA") {
    paymentInstruction = `
      <p>Kirim Saldo Dompet Digital <strong>DANA</strong></p>
      <p>No Akun DANA: <strong style="color:#dc3545;">0856 0086 5191</strong></p>
      <p>A/N Pemilik: <strong>ILHAM HIDAYAT</strong></p>
    `;
  }

  // ==========================================
  // GENERATOR LINK WHATSAPP OTOMATIS
  // ==========================================
  let waMessage = `Halo Admin BITZZ PHONE,%0A%0A`;
  waMessage += `Saya ingin mengkonfirmasi pembayaran pesanan saya:%0A%0A`;
  waMessage += `*No Faktur:* ${invoiceNo}%0A`;
  waMessage += `*Nama:* ${currentUser.nama}%0A`;
  waMessage += `*No WA:* ${currentUser.phone}%0A`;
  waMessage += `*Alamat:* ${currentUser.alamat}%0A`;
  waMessage += `*Metode Pembayaran:* ${method}%0A%0A`;
  waMessage += `*Rincian Pesanan:*%0A${waItemsText}%0A`;
  waMessage += `*Total Pembayaran:* *Rp ${grandTotal.toLocaleString("id-ID")}*%0A%0A`;
  waMessage += `Berikut saya lampirkan bukti transfer pembayarannya. Mohon segera diproses ya.`;

  // Nomor WA Admin BITZZ (0856-0086-5191 dikonversi ke format API 62)
  const waLink = `https://api.whatsapp.com/send?phone=6285600865191&text=${waMessage}`;

  // Reset keranjang belanja setelah checkout
  cart = [];
  localStorage.removeItem("bitzz_cart");
  updateCartCountBadge();

  // Render Invoice ke Layar Pop-up
  const modalContent = document.getElementById("modalContent");
  if (modalContent) {
    modalContent.innerHTML = `
      <div class="invoice-container">
        <div class="invoice-header">
          <h2>FAKTUR PEMESANAN</h2>
          <span class="invoice-status">Pending</span>
        </div>
        <div class="invoice-body-info">
          <p><strong>No Faktur:</strong> ${invoiceNo}</p>
          <p><strong>Waktu:</strong> ${dateNow}</p>
          <p><strong>Penerima:</strong> ${currentUser.nama}</p>
          <p><strong>WhatsApp:</strong> ${currentUser.phone}</p>
          <p><strong>Alamat:</strong> ${currentUser.alamat}</p>
        </div>
        <div style="font-size:0.8rem; margin-bottom:10px;">
          <p style="font-weight:700; margin-bottom:4px;">Rincian Item:</p>
          <ul style="padding-left:15px; opacity:0.9; line-height:1.4;">${itemsSummaryHtml}</ul>
        </div>
        <div style="text-align:right; font-weight:700; font-size:1rem; margin-bottom:14px; border-top:1px solid var(--border-color); padding-top:8px;">
          Total Tagihan: <span style="color:#dc3545;">Rp ${grandTotal.toLocaleString("id-ID")}</span>
        </div>
        <div class="payment-details">${paymentInstruction}</div>
        
        <a href="${waLink}" target="_blank" class="btn w-100" style="margin-top:15px; display:block; text-align:center; background:#25D366; color:#ffffff; text-decoration:none; font-weight:600; padding:12px; border-radius:25px;" onclick="closeModal(); renderProducts();">
          <i class="fa-brands fa-whatsapp" style="font-size:1.1rem; margin-right:5px;"></i> Kirim Bukti ke WhatsApp
        </a>
        
        <button onclick="closeModal(); renderProducts();" class="btn btn-secondary w-100" style="margin-top:10px;">Tutup</button>
      </div>
    `;
  }
}