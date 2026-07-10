// ==========================================
// CORE INTERACTION SCRIPT - ROYAL JAVANESE
// ==========================================

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

        // Injeksi Rangkaian Acara (Kubah Terpisah, 2 Lapis)
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

        // Injeksi Galeri Marquee Double Loop Element
        const track = document.getElementById('galeri-track');
        if(track && d.galeri.length > 0) {
            track.innerHTML = "";
            const doubleGallery = [...d.galeri, ...d.galeri]; 
            doubleGallery.forEach((src) => {
                track.innerHTML += `<img src="${src}" alt="Gallery Marquee Element">`;
            });
        }

        // Injeksi Kado Cashless
        setText('txt-pengantar-kado', d.hadiahDigital.teksPengantar);
        const rekList = document.getElementById('rekening-list');
        if(rekList) {
            rekList.innerHTML = "";
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

let ucapanCount = 0;
function kirimUcapan() {
    const nama = document.getElementById('nama-tamu').value;
    const hadir = document.getElementById('konfirmasi-hadir').value;
    const pesan = document.getElementById('pesan-tamu').value;
    if (!nama || !pesan || !hadir) { alert('Harap isi kelengkapan ucapan anda!'); return; }

    const container = document.getElementById('ucapan-list');
    const d = new Date();
    const dateStr = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;

    const div = document.createElement('div');
    div.className = 'ucapan-card-item';
    div.innerHTML = `
        <div class="user-name-title font-klasik">${nama} <span class="rsvp-badge font-klasik">${hadir}</span></div>
        <p class="user-msg-text font-klasik mt-5">${pesan}</p>
        <span class="meta-date mt-5">${dateStr}</span>
    `;
    
    container.prepend(div);
    ucapanCount++;
    document.getElementById('count-ucapan').innerText = ucapanCount;
    
    document.getElementById('nama-tamu').value = ''; 
    document.getElementById('pesan-tamu').value = '';
}

window.addEventListener('DOMContentLoaded', () => {
    initData();
});
