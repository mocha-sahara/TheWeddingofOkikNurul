// ==========================================
// CORE INTERACTION SCRIPT - ROYAL JAVANESE (FIREBASE INTEGRATED)
// ==========================================

// Inisialisasi Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyCngZv8J6EHnSzDL-Brpm5dLWAysaOgosY",
    authDomain: "undangan-nurul.firebaseapp.com",
    projectId: "undangan-nurul",
    storageBucket: "undangan-nurul.firebasestorage.app",
    messagingSenderId: "57189733311",
    appId: "1:57189733311:web:32b44771425655878d070a"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
// Koleksi database (tabel) untuk ucapan
const ucapanCollection = db.collection("ucapan_tamu");

function initData() {
    try {
        const d = dataUndangan; 
        const setText = (id, val) => { const el = document.getElementById(id); if(el) el.innerText = val; };
        
        setText('txt-kutipan', d.kutipan.teks);
        setText('txt-sumber', d.kutipan.sumber);
        
        // Mempelai Pria
        setText('nama-pria', d.mempelai.pria.namaLengkap);
        setText('ortu-pria', `Putra dari\n${d.mempelai.pria.namaAyah} & ${d.mempelai.pria.namaIbu}`);
        document.getElementById('foto-pria').src = d.mempelai.pria.foto;
        document.getElementById('ig-pria').href = d.mempelai.pria.instagram;

        // Mempelai Wanita
        setText('nama-wanita', d.mempelai.wanita.namaLengkap);
        setText('ortu-wanita', `Putri dari\n${d.mempelai.wanita.namaAyah} & ${d.mempelai.wanita.namaIbu}`);
        document.getElementById('foto-wanita').src = d.mempelai.wanita.foto;
        document.getElementById('ig-wanita').href = d.mempelai.wanita.instagram;

        // Injeksi Teks Hero Motion Area
        setText('hero-pria', d.mempelai.pria.namaPanggilan);
        setText('hero-wanita', d.mempelai.wanita.namaPanggilan);

        // Injeksi Rangkaian Acara
        const acaraList = document.getElementById('acara-list-inject');
        if (acaraList) {
            acaraList.innerHTML = ""; 
            Object.keys(d.acara).forEach((key) => {
                const acr = d.acara[key];
                if (acr.namaAcara) {
                    const iconTop = key === 'akad' ? 'fa-ring' : 'fa-handshake-angle';
                    
                    let blockHTML = `
                        <div class="arch-card-double-layer dyn-anim fade-up">
                            <div class="arch-inner-pattern-cover"></div>
                            <div class="arch-main-content">
                                <div class="icon-marriage-center"><i class="fa-solid ${iconTop}"></i></div>
                                <h2 class="cursive-title-blue font-latin mt-10">${acr.namaAcara}</h2>
                                <p class="event-date font-klasik mt-25">${acr.hariTanggal.replace(/\n/g, '<br>')}</p>
                                <p class="event-time font-klasik mt-10">${acr.waktu}</p>
                                
                                <div class="horizontal-line-decor mt-20">
                                    <div class="thin-line"></div>
                                    <i class="fa-solid fa-house decor-mid-icon"></i>
                                    <div class="thin-line"></div>
                                </div>
                                
                                <h3 class="venue-title font-klasik mt-20">${acr.tempat}</h3>
                                <p class="venue-address font-klasik mt-5">${acr.alamatLengkap}</p>
                                <a href="${acr.linkGoogleMaps}" target="_blank" class="btn-slate-pill mt-25">
                                    <i class="fa-solid fa-location-dot"></i> Google Maps
                                </a>
                            </div>
                        </div>`;
                    acaraList.innerHTML += blockHTML;
                }
            });
        }

        // Injeksi Galeri Marquee
        const track = document.getElementById('galeri-track');
        if(track && d.galeri.length > 0) {
            track.innerHTML = "";
            const doubleGallery = [...d.galeri, ...d.galeri]; 
            doubleGallery.forEach((src) => {
                track.innerHTML += `<img src="${src}" alt="Gallery Marquee Element">`;
            });
        }

        // Injeksi Kado Cashless & Kirim Kado Fisik
        setText('txt-pengantar-kado', d.hadiahDigital.teksPengantar);
        const rekList = document.getElementById('rekening-list');
        if(rekList) {
            rekList.innerHTML = "";
            // Rekening (hanya BCA)
            d.hadiahDigital.rekening.forEach((rek, i) => {
                const id = `rek-${i}`;
                rekList.innerHTML += `
                    <div class="rek-box-luxury">
                        <strong class="bank-title font-klasik">${rek.bank}</strong>
                        <span id="${id}" class="rek-number-digits">${rek.nomorRekening}</span>
                        <small class="rek-holder-name font-klasik">a.n ${rek.atasNama}</small>
                        <button class="btn-copy-action font-klasik" onclick="copyRekening('${id}', this)"><i class="fa-regular fa-copy"></i> Salin Rekening</button>
                    </div>`;
            });
        }
        
        const kadoContainer = document.getElementById('kirim-kado-container');
        if(kadoContainer && d.hadiahDigital.kirimKado) {
            kadoContainer.innerHTML = `
                <div class="rek-box-luxury mt-15">
                    <strong class="bank-title font-klasik mb-5"><i class="fa-solid fa-gift"></i> Kirim Kado</strong>
                    <span class="rek-holder-name font-klasik" style="font-weight:600; font-size:1.1rem; color:#222;">Penerima: ${d.hadiahDigital.kirimKado.namaPenerima}</span>
                    <p id="alamat-kado" class="rek-holder-name font-klasik mt-5" style="line-height:1.5;">${d.hadiahDigital.kirimKado.alamatLengkap}</p>
                    <button class="btn-copy-action font-klasik" onclick="copyRekening('alamat-kado', this)"><i class="fa-regular fa-copy"></i> Salin Alamat</button>
                </div>
            `;
        }

        // Injeksi Footer Penutup
        setText('txt-terimakasih', d.penutup.teksBawah);
        setText('txt-salam-tutup', d.penutup.salam);

        // Membaca URL Tamu Dinamis
        const urlParams = new URLSearchParams(window.location.search);
        const tamu = urlParams.get('to') || urlParams.get('u');
        if (tamu) setText('guest-name', tamu);

        runCountdownSystem(d.acara.akad.tanggalCountdown);

    } catch(e) { console.error("Error initialization:", e); }
}

function bukaUndangan() {
    const coverScreen = document.getElementById('cover-screen');
    const mainContent = document.getElementById('main-content');
    const audio = document.getElementById('bg-music');
    const video = document.getElementById('intro-video');
    const btnMusic = document.getElementById('btn-music-toggle');
    
    audio.play().catch(e => console.log("Backsound autoplay block solved."));
    btnMusic.style.display = 'flex';

    coverScreen.style.transform = 'translateY(-100vh)';
    coverScreen.style.opacity = '0';
    
    setTimeout(() => {
        coverScreen.style.display = 'none';
        mainContent.style.display = 'block';
        video.play().catch(e => console.log("Motion player active."));
        
        setTimeout(() => {
            mainContent.style.opacity = '1';
            window.scrollTo(0, 0); 
            
            initIntersectionObserverAnimations();
            
            // DELAY UTAMA 7 DETIK UNTUK EMERGE HERO TEXT
            setTimeout(() => {
                const heroTextBubble = document.getElementById('hero-text-bubble');
                if(heroTextBubble) heroTextBubble.classList.add('show-hero');
            }, 7000);

        }, 50);
    }, 800);
}

function initIntersectionObserverAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.dyn-anim').forEach(el => observer.observe(el));
}

function toggleMusic() {
    const audio = document.getElementById('bg-music');
    const btnMusic = document.getElementById('btn-music-toggle');
    if (audio.paused) {
        audio.play();
        btnMusic.classList.remove('music-paused');
    } else {
        audio.pause();
        btnMusic.classList.add('music-paused');
    }
}

function copyRekening(id, btn) {
    const text = document.getElementById(id).innerText;
    navigator.clipboard.writeText(text).then(() => {
        const ogText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Disalin';
        btn.style.background = 'var(--slate-dark)';
        setTimeout(() => { 
            btn.innerHTML = ogText; 
            btn.style.background = 'var(--slate-blue)';
        }, 2000);
    });
}

function runCountdownSystem(targetString) {
    const target = new Date(targetString).getTime();
    setInterval(function() {
        const distance = target - new Date().getTime();
        if (distance < 0) return;
        
        document.getElementById("cd-hari").innerText = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        document.getElementById("cd-jam").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
        document.getElementById("cd-menit").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        document.getElementById("cd-detik").innerText = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
    }, 1000);
}

// ==========================================
// FIREBASE FIRESTORE RSVP LOGIC
// ==========================================

// Format tanggal
// Format tanggal
function formatDate(timestamp) {
    // 1. Jika waktu dari server belum turun (saat baru saja diklik kirim)
    if (!timestamp) return "Baru saja";
    
    // 2. Ubah format waktu khusus Firebase menjadi format waktu standar
    const d = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    
    // 3. Susun menjadi DD/MM/YYYY HH:MM
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth()+1).toString().padStart(2, '0')}/${d.getFullYear()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}

// Fungsi Load Ucapan Realtime dari Firebase
function loadUcapan() {
    const container = document.getElementById('ucapan-list');
    
    // Dengarkan perubahan data di Firestore secara realtime, urutkan dari yang terbaru
    ucapanCollection.orderBy("timestamp", "desc").onSnapshot((querySnapshot) => {
        container.innerHTML = ""; // Bersihkan list
        let count = 0;
        
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            count++;
            
            const div = document.createElement('div');
            div.className = 'ucapan-card-item';
            div.innerHTML = `
                <div class="user-name-title font-klasik">${data.nama} <span class="rsvp-badge font-klasik">${data.kehadiran}</span></div>
                <p class="user-msg-text font-klasik mt-5">${data.pesan}</p>
                <span class="meta-date mt-5">${formatDate(data.timestamp)}</span>
            `;
            container.appendChild(div);
        });
        
        document.getElementById('count-ucapan').innerText = count;
        
        if (count === 0) {
            container.innerHTML = '<p class="font-klasik text-white mt-10 text-center" style="opacity:0.6; font-size:0.9rem;">Belum ada ucapan. Jadilah yang pertama!</p>';
        }
    }, (error) => {
        console.error("Error fetching realtime data: ", error);
        container.innerHTML = '<p class="font-klasik text-white mt-10 text-center" style="opacity:0.6; font-size:0.9rem;">Gagal memuat ucapan. Periksa koneksi.</p>';
    });
}

// Fungsi Kirim Ucapan ke Firebase
document.getElementById('rsvp-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah reload halaman
    
    const namaInput = document.getElementById('nama-tamu');
    const hadirInput = document.getElementById('konfirmasi-hadir');
    const pesanInput = document.getElementById('pesan-tamu');
    const btnSubmit = document.getElementById('btn-submit-ucapan');
    
    const nama = namaInput.value.trim();
    const hadir = hadirInput.value;
    const pesan = pesanInput.value.trim();
    
    if (!nama || !pesan || !hadir) { alert('Harap lengkapi form ucapan!'); return; }
    
    btnSubmit.innerText = "MENGIRIM...";
    btnSubmit.disabled = true;

    // Simpan ke Firestore
    ucapanCollection.add({
        nama: nama,
        kehadiran: hadir,
        pesan: pesan,
        timestamp: firebase.firestore.FieldValue.serverTimestamp() // Gunakan waktu server Firestore
    })
    .then(() => {
        // Berhasil dikirim, form direset
        namaInput.value = '';
        hadirInput.value = '';
        pesanInput.value = '';
        
        btnSubmit.innerText = "BERHASIL DIKIRIM!";
        btnSubmit.style.backgroundColor = "#5cb85c"; // Hijau sukses
        
        setTimeout(() => {
            btnSubmit.innerText = "KIRIM UCAPAN";
            btnSubmit.style.backgroundColor = "var(--gold-calm)";
            btnSubmit.disabled = false;
        }, 3000);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
        alert("Terjadi kesalahan saat mengirim ucapan. Silakan coba lagi.");
        btnSubmit.innerText = "KIRIM UCAPAN";
        btnSubmit.disabled = false;
    });
});

window.addEventListener('DOMContentLoaded', () => {
    initData();
    // Panggil fungsi load ucapan saat halaman dimuat
    loadUcapan();
});
