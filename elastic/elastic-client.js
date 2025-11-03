import { Client } from '@elastic/elasticsearch'; // deafulnya elastic
import fs from 'fs';
import path from 'path';

const ELASTIC_URL = 'https://localhost:9200';
const ELASTIC_USERNAME = 'elastic';
const ELASTIC_PASSWORD = '+Y3YmsIcz7pWYMd-vfAM';
const CA_CERT_PATH = 'C:\\ELK\\elasticsearch-9.2.0-windows-x86_64\\elasticsearch-9.2.0\\config\\certs\\http_ca.crt'; // ini ga dipake karena SSL dimatiin

// Inisialisasi Klien
const client = new Client({
  node: ELASTIC_URL,
  auth: {
    username: ELASTIC_USERNAME,
    password: ELASTIC_PASSWORD,
  },
  // ssl: { rejectUnauthorized: false },
});

// Ekspor dulu clientnya biar tersedia untuk file lain abis itu jalanin cek koneksi
export default client;

// Cek koneksi (hanya log, tidak ganggu ekspor)
(async () => {
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
    console.error(error);
    console.log('----------------------------------------------------');
  }
})();
