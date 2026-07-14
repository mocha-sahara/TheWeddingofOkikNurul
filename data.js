// ==========================================
// FILE PUSAT DATA UNDANGAN DIGITAL
// ==========================================

const dataUndangan = {
    umum: {
        judulWeb: "The Wedding of Okik & Nurul",
        deskripsiWeb: "Undangan Pernikahan Okik & Nurul",
        audioLatar: "./asset/lagu.mp3", 
        putarOtomatis: true
    },
    kutipan: {
        teks: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.",
        sumber: "- QS. Ar-Rum: 21 -"
    },
    mempelai: {
        pria: {
            namaLengkap: "Okik Aris Setiawan, S.T.",
            namaPanggilan: "Okik",
            namaAyah: "Bpk. Heri Susanto",
            namaIbu: "Ibu Nanik",
            foto: "./asset/foto_pria.jpeg",
            instagram: "https://instagram.com/Okik.aris" 
        },
        wanita: {
            namaLengkap: "Nurul Dwi Indah Istiana, S.M.",
            namaPanggilan: "Nurul",
            namaAyah: "Bpk. Ekhwan Sunarto",
            namaIbu: "Ibu Hariyatun",
            foto: "./asset/foto_wanita.jpeg",
            instagram: "https://instagram.com/nuristiana010" 
        }
    },
    acara: {
        akad: {
            namaAcara: "Akad Nikah",
            hariTanggal: "Minggu\n02 Agustus 2026",
            tanggalCountdown: "2026-08-02T08:00:00", 
            waktu: "08:00 WIB - 10:00 WIB",
            tempat: "Kediaman Mempelai Wanita",
            alamatLengkap: "Balongrejo RT30/RW10 - Balonggebang - Gondang - Nganjuk",
            linkGoogleMaps: "https://goo.gl/maps/1Dvg7RLgNhKyL9bs8?g_st=ac"
        },
        resepsi: {
            namaAcara: "Resepsi Pernikahan",
            hariTanggal: "Minggu\n02 Agustus 2026",
            waktu: "13:00 WIB - 15:00 WIB",
            tempat: "Kediaman Mempelai Wanita",
            alamatLengkap: "Balongrejo RT30/RW10 <br> Balonggebang - Gondang - Nganjuk",
            linkGoogleMaps: "https://goo.gl/maps/1Dvg7RLgNhKyL9bs8?g_st=ac"
        }
    },
    galeri: [
        "./asset/bg2.jpeg", 
        "./asset/bg4.jpeg", 
       
    ],
    hadiahDigital: {
        teksPengantar: "Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless.",
        rekening: [
            { bank: "MANDIRI", atasNama: "Okik Aris S", nomorRekening: "1780011469604" }
        ],
        kirimKado: {
            namaPenerima: "Nurul Dwi Indah",
            alamatLengkap: "Dsn. Balongrejo, Ds. Balonggebang, RT 30, RW 10, Kec. Gondang, Kab. Nganjuk"
        }
    },
    penutup: {
        teksBawah: "Suatu kebahagiaan & kehormatan bagi kami, apabila Bapak/Ibu/Saudara/i, berkenan hadir dan memberikan do'a restu kepada kami",
        salam: "Wassalamu'alaikum Warahmatullahi Wabarakatuh",
        terimaKasih: "Kami yang berbahagia,"
    }
};
