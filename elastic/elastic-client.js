import { Client } from '@elastic/elasticsearch'; // Menggunakan import
import fs from 'fs';                            // Menggunakan import
import path from 'path';


const ELASTIC_URL = 'https://localhost:9200'; 
const ELASTIC_USERNAME = 'elastic';          
const ELASTIC_PASSWORD = '+Y3YmsIcz7pWYMd-vfAM';    
const CA_CERT_PATH = 'C:\\ELK\\elasticsearch-9.2.0-windows-x86_64\\elasticsearch-9.2.0\\config\\certs\\http_ca.crt'; 


// Inisialisasi Klien
const client = new Client({
    node: ELASTIC_URL,
    auth: { 
        username: ELASTIC_USERNAME, 
        password: ELASTIC_PASSWORD 
    },
    //ssl: {
        // sebelum dijalankan jalankan ini dulu
        //rejectUnauthorized: false 
    //}
});


async function checkConnection() {
    console.log(`Mencoba terhubung ke ElasticSearch di ${ELASTIC_URL}...`);
    try {
        const response = await client.info();
        
        console.log('\n✅ Koneksi BERHASIL!');
        console.log('----------------------------------------------------');
        console.log(`Cluster Name: ${response.cluster_name}`);
        console.log(`Elastic Version: ${response.version.number}`);
        console.log('----------------------------------------------------');

    } catch (error) {
        console.error('\n❌ Koneksi GAGAL!');
        console.error('----------------------------------------------------');
        if (error.meta && error.meta.statusCode === 401) {
            console.error('AUTHENTICATION FAILED (401): Periksa ELASTIC_USERNAME dan ELASTIC_PASSWORD Anda.');
        } else if (error.code === 'ECONNREFUSED' || error.name === 'NoConnection') {
            console.error('Koneksi DITOLAK: Pastikan Elasticsearch Anda berjalan dan host/port sudah benar.');
        } else if (error.name === 'RequestError' && error.message.includes('self-signed')) {
            console.error('ERROR SERTIFIKAT: Pastikan path CA_CERT_PATH benar dan file tersedia.');
        } else {
            console.error('Error lain:', error.message);
        }
        console.log('----------------------------------------------------');
    }
}

checkConnection();