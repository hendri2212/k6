import http from 'k6/http';
import { check, sleep } from 'k6';

const url = 'http://carina.s-net.id:1011/api/referensi/pembelajaran';
const token = '3295|rJTjoxRP1KT3dq6BIXmGM9wmzDeAj3LDxwya34cb';

const payload = JSON.stringify({
    bobot_sumatif_materi: {},
    bobot_sumatif_akhir: {},
    user_id: "0af91f8a-699b-45a1-8c13-71f27804dcdc",
    sekolah_id: "0ef2b473-ecfd-435a-a2f0-354baba95b71",
    semester_id: "20241",
    periode_aktif: "2024/2025 Ganjil",
    guru_id: "9124b78b-8e3b-479e-98e9-32ea7ba6650f"
});

export default function () {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    const response = http.post(url, payload, { headers: headers });

    // Log the response time
    console.log(`Response time: ${response.timings.duration} ms`);
    console.log(`Response: ${response.body}`);

    // Check the response status
    check(response, {
        'is status 200': (r) => r.status === 200,
        'response time < 500ms': (r) => r.timings.duration < 500, // Increased threshold
    });

    // Sleep for a second between iterations
    sleep(1);
}

// Define the options for the load test
export const options = {
    vus: 1, // Number of virtual users
    // duration: '30s', // Duration of the test
    iterations: 1, // Total number of iterations to run
};