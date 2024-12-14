import http from 'k6/http';
import { check, sleep } from 'k6';
// import { console } from 'k6/console';

export const options = {
  // vus: 100,
  // duration: '5h',
  // iterations: 1, // Total number of iterations to run
  // rps: 200,

  stages: [
    { duration: '5m', target: 100 },  // Ramp-up to 50 users
    { duration: '1H', target: 100 }, // Ramp-up to 100 users
    { duration: '5m', target: 0 },  // Ramp-down to 0 users
  ],

  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests should complete below 200ms
    http_req_failed: ['rate<0.01'],   // Less than 1% of requests should fail
  },

  cloud: {
    projectID: 3729532,
    name: 'Test e-raport',
  }
};

const baseUrl = 'http://carina.s-net.id:1011';
// const token = '3295|rJTjoxRP1KT3dq6BIXmGM9wmzDeAj3LDxwya34cb';

// List of endpoints to test
const endpoints = [
  '/api/dashboard',
  '/api/peserta-didik?status=aktif&user_id=0af91f8a-699b-45a1-8c13-71f27804dcdc&sekolah_id=0ef2b473-ecfd-435a-a2f0-354baba95b71&semester_id=20241&periode_aktif=2024%2F2025+Ganjil&tingkat=&jurusan_sp_id=&rombongan_belajar_id=&page=1&per_page=1000&q=&sortby=nama&sortbydesc=ASC',
  '/api/referensi/kompetensi-dasar?user_id=0af91f8a-699b-45a1-8c13-71f27804dcdc&guru_id=9124b78b-8e3b-479e-98e9-32ea7ba6650f&sekolah_id=0ef2b473-ecfd-435a-a2f0-354baba95b71&semester_id=20241&periode_aktif=2024%2F2025+Ganjil&tingkat=&rombongan_belajar_id=&pembelajaran_id=&page=1&per_page=200&q=&sortby=updated_at&sortbydesc=DESC',
  '/api/referensi/capaian-pembelajaran?user_id=0af91f8a-699b-45a1-8c13-71f27804dcdc&guru_id=9124b78b-8e3b-479e-98e9-32ea7ba6650f&sekolah_id=0ef2b473-ecfd-435a-a2f0-354baba95b71&semester_id=20241&periode_aktif=2024%2F2025+Ganjil&tingkat=&rombongan_belajar_id=&pembelajaran_id=&add_cp=true&page=1&per_page=100&q=&sortby=updated_at&sortbydesc=DESC',
  '/api/referensi/tujuan-pembelajaran?user_id=0af91f8a-699b-45a1-8c13-71f27804dcdc&guru_id=9124b78b-8e3b-479e-98e9-32ea7ba6650f&sekolah_id=0ef2b473-ecfd-435a-a2f0-354baba95b71&semester_id=20241&periode_aktif=2024%2F2025+Ganjil&tingkat=&rombongan_belajar_id=&pembelajaran_id=&page=1&per_page=100&q=&sortby=updated_at&sortbydesc=DESC',
  '/api/penilaian/nilai-sikap?user_id=0af91f8a-699b-45a1-8c13-71f27804dcdc&guru_id=9124b78b-8e3b-479e-98e9-32ea7ba6650f&sekolah_id=0ef2b473-ecfd-435a-a2f0-354baba95b71&semester_id=20241&periode_aktif=2024%2F2025+Ganjil&page=1&per_page=100&q=&sortby=created_at&sortbydesc=DESC',
  '/api/users/profil',
  '/api/setting/unduhan',
];

const insertEndpoints = [
  '/api/referensi/pembelajaran',
  '/api/penilaian/get-sumatif-lingkup-materi',
  '/api/penilaian/get-nilai-akhir',
  '/api/penilaian/get-capaian-kompetensi',
  '/api/penilaian/simpan-nilai-akhir',
];

const payloads = [
  // Payload for insert-endpoint2
  JSON.stringify({
    bobot_sumatif_materi: {},
    bobot_sumatif_akhir: {},
    user_id: '0af91f8a-699b-45a1-8c13-71f27804dcdc',
    sekolah_id: '0ef2b473-ecfd-435a-a2f0-354baba95b71',
    semester_id: '20241',
    periode_aktif: '2024/2025 Ganjil',
    guru_id: '9124b78b-8e3b-479e-98e9-32ea7ba6650f',
  }),

  JSON.stringify({
    "tahun_pelajaran": "2024/2025 Ganjil",
    "tingkat": 12,
    "jenis_rombel": 1,
    "rombongan_belajar_id": "5c21aa6b-2cf7-4437-906d-7bcad3255428",
    "pembelajaran_id": "64ac4850-6142-4117-b1fc-980cb98f226f",
    "teknik_penilaian_id": "a5a864cb-3628-467a-81aa-d5801c2c3d5a",
    "cp_id": "",
    "guru_id": "9124b78b-8e3b-479e-98e9-32ea7ba6650f",
    "sekolah_id": "0ef2b473-ecfd-435a-a2f0-354baba95b71",
    "semester_id": "20241",
    "merdeka": false,
    "nilai": {},
    "nilai_tp": {},
    "nilai_sumatif": {},
    "kompeten": {}
  }),

  JSON.stringify({
    "tahun_pelajaran": "2024/2025 Ganjil",
    "tingkat": 12,
    "jenis_rombel": 1,
    "rombongan_belajar_id": "5c21aa6b-2cf7-4437-906d-7bcad3255428",
    "mata_pelajaran_id": 802010710,
    "pembelajaran_id": "64ac4850-6142-4117-b1fc-980cb98f226f",
    "bentuk_penilaian": "akhir",
    "guru_id": "9124b78b-8e3b-479e-98e9-32ea7ba6650f",
    "sekolah_id": "0ef2b473-ecfd-435a-a2f0-354baba95b71",
    "semester_id": "20241",
    "merdeka": false,
    "nilai": {},
    "kompeten": {}
  }),

  JSON.stringify({
    "tahun_pelajaran": "2024/2025 Ganjil",
    "tingkat": 12,
    "jenis_rombel": 1,
    "rombongan_belajar_id": "5c21aa6b-2cf7-4437-906d-7bcad3255428",
    "mata_pelajaran_id": 802010710,
    "pembelajaran_id": "64ac4850-6142-4117-b1fc-980cb98f226f",
    "guru_id": "9124b78b-8e3b-479e-98e9-32ea7ba6650f",
    "sekolah_id": "0ef2b473-ecfd-435a-a2f0-354baba95b71",
    "semester_id": "20241",
    "merdeka": false,
    "nilai": {},
    "kompeten": {},
    "inkompeten": {}
  }),

  JSON.stringify({
    "tahun_pelajaran": "2024/2025 Ganjil",
    "tingkat": 12,
    "jenis_rombel": 1,
    "rombongan_belajar_id": "5c21aa6b-2cf7-4437-906d-7bcad3255428",
    "mata_pelajaran_id": 802010710,
    "pembelajaran_id": "64ac4850-6142-4117-b1fc-980cb98f226f",
    "bentuk_penilaian": "akhir",
    "guru_id": "9124b78b-8e3b-479e-98e9-32ea7ba6650f",
    "sekolah_id": "0ef2b473-ecfd-435a-a2f0-354baba95b71",
    "semester_id": "20241",
    "merdeka": false,
    "nilai": {
      "cb786d9a-1f4a-4d77-bc81-294540ff665d": 75,
      "d2e3b80a-90d2-4bca-983a-8e9795f24c99": "75",
      "09ded82f-8987-43c6-ae60-86b2f104a2b1": 0,
      "2011569d-6305-43cf-bfa9-db2112e35de1": 0,
      "787dc2ec-8341-46b0-8f67-972b94b120b1": 0,
      "c0260108-24da-4777-ab8c-111ff2c62687": 0,
      "ded9f87c-8bc5-438e-84e1-bd7ee7dd7c6f": 0,
      "1b8f8104-52fc-46e0-8539-a8ebe6adf741": 0,
      "1f30b01e-7f8d-49a2-87bb-98d984e3fdee": 0,
      "221d1505-0e91-43ce-bb46-f1b96fd4b5a1": 0,
      "d17c9a85-c195-4b5c-a0e3-b7e73932b5c7": 0,
      "74820617-8702-477d-8701-3fd2cc7f086b": 0,
      "10403161-142b-44a2-a889-0a2613c331ff": 0,
      "3ce9f453-6867-4051-87c3-5eb17bf75fe7": 0,
      "798a15d2-8876-408f-8880-502e3482ac27": 0,
      "e369da67-579b-4a87-8608-8d04bf089dda": 0,
      "2584a649-2ff5-458c-b34e-d57e315846e8": 0,
      "dd27a644-5f9e-49bd-a9e3-67960748b6a2": 0,
      "26212b41-f480-4d08-8dd8-faaf68068487": 0,
      "5c720ce3-8cea-4ecd-a7d5-b889ede90ef1": 0,
      "b8842425-0a34-4f0a-b742-381ffff90a81": 0,
      "2da08d8f-8e4e-4038-85c5-41619e44949a": 0,
      "91be1e7c-ae66-4570-ad45-3e6251a8dbe1": 0,
      "151345eb-9d8f-489e-9d7a-1e359a587d7c": 0,
      "ea1ae96c-ed4e-4137-b65d-a24678174247": 0,
      "fc45a62b-db69-48bc-bcce-b1d26e6e9bd0": 0,
      "1fca93f8-ea4e-4515-a4c1-80f90b6ba9e3": 0,
      "ae3d46f6-228e-4b42-8826-b69334c92d5f": 0,
      "88b789f6-e6b4-4db2-830c-a9f1a2e942be": 0,
      "918f973a-ea31-4493-975e-557bfe3155f7": 0,
      "9a2d5b22-fa64-49bb-955c-309a66ab858b": 0
    },
    "kompeten": {
      "cb786d9a-1f4a-4d77-bc81-294540ff665d#5bdab811-cb77-4d3a-8e7b-e143a080be90": "1",
      "d2e3b80a-90d2-4bca-983a-8e9795f24c99#5bdab811-cb77-4d3a-8e7b-e143a080be90": "1"
    }
  })
];

export default function () {
  // 1. Perform login
  const loginPayload = JSON.stringify({
    email: 'arifin.hendri465@gmail.com', // Replace with a valid username
    password: 'qkkmnt7f', // Replace with a valid password
    semester_id: '20241',
  });

  const loginHeaders = {
    'Content-Type': 'application/json',
  };

  const loginRes = http.post(`${baseUrl}/api/auth/login`, loginPayload, { headers: loginHeaders });

  check(loginRes, {
    'login was successful': (res) => res.status === 200,
  });

  const accessToken = loginRes.json('accessToken'); // Assuming the API returns a token
  if (!accessToken) {
    console.error('Login failed, no token returned');
    return;
  }

  // 2. Use the token in subsequent requests
  const authHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`, // Attach the token
    // Authorization: `Bearer ${token}`, // Attach the token
  };
  for (const endpoint of endpoints) {
    const url = `${baseUrl}${endpoint}`;
    const res = http.get(url, { headers: authHeaders });

    check(res, {
      [`${endpoint} responded successfully`]: (r) => r.status === 200,
    });
  }

  // 2. Perform Insert Operations
  for (let i = 0; i < insertEndpoints.length; i++) {
    const endpoint = insertEndpoints[i];
    const payload = payloads[i];

    const insertRes = http.post(`${baseUrl}${endpoint}`, payload, { headers: authHeaders });
    
    // Logging untuk debugging
    // console.log(`Payload sent to ${endpoint}: ${JSON.stringify(payload)}`);
    console.log(`Response: ${insertRes.body}`);
    console.log(`Response time: ${insertRes.timings.duration}ms`);

    // Check the response status
    check(insertRes, {
      [`insert to ${insertEndpoints} was successful`]: (res) => res.status === 200,
      [`response time for ${insertEndpoints} is below 1500ms`]: (res) => res.timings.duration < 1500,
    });
    
    // if (insertRes.status !== 201) {
    //   console.error(`Insert response for ${endpoint}: ${insertRes.status} - ${insertRes.body}`);
    //   console.error(`Insert failed for ${endpoint}. Status: ${insertRes.status}`);
    // }
    
    // check(insertRes, {
    //   'is status 200': (r) => r.status === 200,
    //   'response time < 500ms': (r) => r.timings.duration < 500,
    // });

    // Optional: Log response for debugging
    console.log(`Insert response for ${endpoint}: ${insertRes.body}`);
  }

  sleep(1); // Simulate user think time
}