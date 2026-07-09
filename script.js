function initData() {
    try {
        const d = dataUndangan; 
        const setText = (id, val) => { const el = document.getElementById(id); if(el) el.innerText = val; };
        const setHTML = (id, val) => { const el = document.getElementById(id); if(el) el.innerHTML = val; };
        
        const namaPasangan = `${d.mempelai.pria.namaPanggilan} & ${d.mempelai.wanita.namaPanggilan}`;
        
        document.getElementById('page-title').innerText = d.umum.judulWeb;
        setText('cover-names', namaPasangan);
        
        // Teks Hero Delay Motion
        setText('hero-pria', d.mempelai.pria.namaPanggilan);
        setText('hero-wanita', d.mempelai.wanita.namaPanggilan);
        setText('hero-date', d.acara.akad.hariTanggal);

        setHTML('txt-kutipan', d.kutipan.teks);
        setText('txt-sumber', d.kutipan.sumber);
        
        // Mempelai Pria
        setText('nama-pria', d.mempelai.pria.namaLengkap);
        setText('ortu-pria', `${d.mempelai.pria.namaAyah} & ${d.mempelai.pria.namaIbu}`);
        const fotoPria = document.getElementById('foto-pria');
        if(fotoPria) fotoPria.src = d.mempelai.pria.foto;
        const igPria = document.getElementById('ig-pria');
        if(igPria) igPria.href = d.mempelai.pria.instagram;

        // Mempelai Wanita
        setText('nama-wanita', d.mempelai.wanita.namaLengkap);
        setText('ortu-wanita', `${d.mempelai.wanita.namaAyah} & ${d.mempelai.wanita.namaIbu}`);
        const fotoWanita = document.getElementById('foto-wanita');
        if(fotoWanita) fotoWanita.src = d.mempelai.wanita.foto;
        const igWanita = document.getElementById('ig-wanita');
        if(igWanita) igWanita.href = d.mempelai.wanita.instagram;

        // Acara
        const acaraContainer = document.getElementById('acara-container');
        if (acaraContainer) {
            Object.keys(d.acara).forEach(key => {
                const acara = d.acara[key];
                if (acara.namaAcara) {
                    acaraContainer.innerHTML += `
                    <section class="section-card animate-on-scroll fade-up">
                        <div class="section-bg-pattern"></div>
                        <img src="./asset/coklat.png" class="ornament leaf pos-bl anim-float-l" alt="Daun">
                        <div class="section-content">
                            <i class="fa-solid fa-heart icon-blue"></i>
                            <h3 class="cursive-title-blue">${acara.namaAcara}</h3>
                            <p class="text-body mt-10">Insya Allah akan dilaksanakan pada:</p>
                            <p class="bold-text color-primary mt-10">${acara.hariTanggal}</p>
                            <p class="text-body bold-text" style="color:var(--color-primary-dark);">${acara.waktu}</p>
                            <div class="divider-short"></div>
                            <i class="fa-solid fa-location-dot icon-blue"></i>
                            <p class="bold-text mt-10">${acara.tempat}</p>
                            <p class="text-body">${acara.alamatLengkap}</p>
                            <a href="${acara.linkGoogleMaps}" target="_blank" class="btn-outline"><i class="fa-solid fa-map-location-dot"></i> Buka Peta</a>
                        </div>
                    </section>`;
                }
            });
        }

        // Galeri (Menyematkan ke thumbnail video prewed & footer)
        const grid = document.getElementById('galeri-grid');
        if(grid && d.galeri.length > 0) {
            document.getElementById('thumb-galeri-cover').src = d.galeri[0];
            document.getElementById('img-cover-footer').src = d.mempelai.coverFoto || d.galeri[0];

            d.galeri.forEach((src, idx) => {
                grid.innerHTML += `<img src="${src}" alt="Gallery" loading="lazy" onerror="this.src='https://via.placeholder.com/300/5c778a/fff'">`;
            });
        }

        // Rekening
        setText('txt-pengantar-kado', d.hadiahDigital.teksPengantar);
        const rekList = document.getElementById('rekening-list');
        if(rekList) {
            d.hadiahDigital.rekening.forEach((rek, i) => {
                const id = `rek-${i}`;
                const icon = rek.bank.toLowerCase().includes('gift') ? 'fa-gift' : 'fa-building-columns';
                rekList.innerHTML += `
                    <div class="rek-card w-100">
                        <i class="fa-solid ${icon}" style="color:var(--color-primary); font-size:1.5rem; position:absolute; right:20px; top:20px; opacity:0.3;"></i>
                        <strong class="font-serif" style="color:var(--color-primary); font-size:1.3rem;">${rek.bank}</strong><br>
                        <span id="${id}" style="font-family: 'Montserrat', monospace; font-size:1.3rem; color:var(--text-dark); display:block; margin:8px 0; font-weight:600;">${rek.nomorRekening}</span>
                        <small style="color:#666; font-family:'Cormorant Garamond', serif; font-size:1.1rem;">a.n ${rek.atasNama}</small><br>
                        <button class="btn-copy" onclick="copyRek('${id}', this)"><i class="fa-regular fa-copy"></i> Salin Rekening</button>
                    </div>`;
            });
        }

        // Footer
        setText('footer-names', namaPasangan);
        setText('txt-terimakasih', d.penutup.teksBawah);
        setText('txt-salam-tutup', d.penutup.terimaKasih);

        const urlParams = new URLSearchParams(window.location.search);
        const tamu = urlParams.get('to');
        if (tamu) setText('guest-name', tamu);

        runCountdown(d.acara.akad.tanggalCountdown);

    } catch(e) { console.error("Error injeksi data:", e); }
}

// 2. FUNGSI REDIRECT (BUKA UNDANGAN) & TEKS DELAY
const audio = document.getElementById('bg-music');
const video = document.getElementById('intro-video');
const btnMusic = document.getElementById('btn-music-toggle');
let isPlaying = false;

function bukaUndangan() {
    const coverScreen = document.getElementById('cover-screen');
    const mainContent = document.getElementById('main-content');
    
    // Play Musik
    audio.play().catch(e => console.log("Audio terblokir browser"));
    isPlaying = true;
    btnMusic.style.display = 'block';

    // Animasi Cover Menghilang
    coverScreen.style.transform = 'translateY(-100vh)';
    coverScreen.style.opacity = '0';
    
    setTimeout(() => {
        coverScreen.style.display = 'none';
        
        mainContent.style.display = 'block';
        video.play().catch(e => console.log("Video autoplay terblokir: " + e));
        
        setTimeout(() => {
            mainContent.style.opacity = '1';
            window.scrollTo(0, 0); 
            
            initScrollObserver();
            
            // DELAY 7 DETIK SESUAI PERMINTAAN
            setTimeout(() => {
                const heroTextBubble = document.getElementById('hero-text-bubble');
                if(heroTextBubble) heroTextBubble.classList.add('show-hero');
            }, 7000);

        }, 50);
    }, 800);
}

function toggleMusic() {
    if (isPlaying) { audio.pause(); btnMusic.classList.add('music-paused'); }
    else { audio.play(); btnMusic.classList.remove('music-paused'); }
    isPlaying = !isPlaying;
}

function copyRek(id, btn) {
    const text = document.getElementById(id).innerText;
    navigator.clipboard.writeText(text).then(() => {
        const og = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Disalin';
        btn.style.backgroundColor = '#2c3e50';
        setTimeout(() => { 
            btn.innerHTML = og; 
            btn.style.backgroundColor = 'var(--color-primary)';
        }, 2000);
    });
}

function runCountdown(target) {
    const countDownDate = new Date(target).getTime();
    setInterval(function() {
        const distance = countDownDate - new Date().getTime();
        if (distance < 0) return;
        document.getElementById("cd-hari").innerText = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        document.getElementById("cd-jam").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
        document.getElementById("cd-menit").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        document.getElementById("cd-detik").innerText = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
    }, 1000);
}

function initScrollObserver() {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.15 }); 
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

// RSVP
let uCount = 0;
function kirimUcapan() {
    const nama = document.getElementById('nama-tamu').value;
    const hadir = document.getElementById('konfirmasi-hadir').value;
    const pesan = document.getElementById('pesan-tamu').value;
    if (!nama || !hadir || !pesan) { alert('Harap isi form!'); return; }

    const list = document.getElementById('ucapan-list');
    const badge = hadir === 'Hadir' ? 'hadir' : '';
    const d = new Date();
    const time = `${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')} - ${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;

    const div = document.createElement('div');
    div.className = 'ucapan-item';
    div.innerHTML = `
        <div class="uc-nama">${nama} <span class="uc-badge ${badge}">${hadir}</span></div>
        <span class="uc-waktu"><i class="fa-regular fa-clock"></i> ${time}</span>
        <div class="uc-teks">${pesan}</div>
    `;
    list.prepend(div);
    uCount++;
    document.getElementById('count-ucapan').innerText = uCount;
    document.getElementById('nama-tamu').value = ''; document.getElementById('konfirmasi-hadir').value = ''; document.getElementById('pesan-tamu').value = '';
}

initData();