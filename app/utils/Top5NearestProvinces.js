const provinces = [
    // ภาคเหนือ
    { name: "เชียงใหม่", latitude: 18.79028, longitude: 98.96056, region: "ภาคเหนือ" },
    { name: "แม่ฮ่องสอน", latitude: 19.30111, longitude: 97.96528, region: "ภาคเหนือ" },
    { name: "เชียงราย", latitude: 19.90944, longitude: 99.82750, region: "ภาคเหนือ" },
    { name: "ลำพูน", latitude: 18.58639, longitude: 99.01194, region: "ภาคเหนือ" },
    { name: "ลำปาง", latitude: 18.28611, longitude: 99.51306, region: "ภาคเหนือ" },
    { name: "พะเยา", latitude: 19.16528, longitude: 99.90361, region: "ภาคเหนือ" },
    { name: "แพร่", latitude: 18.14528, longitude: 100.14194, region: "ภาคเหนือ" },
    { name: "น่าน", latitude: 18.78333, longitude: 100.78333, region: "ภาคเหนือ" },
    { name: "อุตรดิตถ์", latitude: 17.62306, longitude: 100.09583, region: "ภาคเหนือ" },
    { name: "ตาก", latitude: 16.89667, longitude: 99.01333, region: "ภาคเหนือ" },
    { name: "สุโขทัย", latitude: 17.00583, longitude: 99.82639, region: "ภาคเหนือ" },
    { name: "พิษณุโลก", latitude: 16.81583, longitude: 100.26361, region: "ภาคเหนือ" },
    { name: "กำแพงเพชร", latitude: 16.48111, longitude: 99.52222, region: "ภาคเหนือ" },
    { name: "เพชรบูรณ์", latitude: 16.42417, longitude: 101.15472, region: "ภาคเหนือ" },
    { name: "พิจิตร", latitude: 16.44306, longitude: 100.34667, region: "ภาคเหนือ" },

    // ภาคตะวันออกเฉียงเหนือ
    { name: "กาฬสินธุ์", latitude: 16.43417, longitude: 103.50917, region: "ภาคตะวันออกเฉียงเหนือ" },
    { name: "ขอนแก่น", latitude: 16.43889, longitude: 102.82861, region: "ภาคตะวันออกเฉียงเหนือ" },
    { name: "ชัยภูมิ", latitude: 15.80556, longitude: 102.03111, region: "ภาคตะวันออกเฉียงเหนือ" },
    { name: "นครพนม", latitude: 17.40694, longitude: 104.78083, region: "ภาคตะวันออกเฉียงเหนือ" },
    { name: "นครราชสีมา", latitude: 14.97500, longitude: 102.10000, region: "ภาคตะวันออกเฉียงเหนือ" },
    { name: "บุรีรัมย์", latitude: 14.99417, longitude: 103.10222, region: "ภาคตะวันออกเฉียงเหนือ" },
    { name: "มหาสารคาม", latitude: 16.17722, longitude: 103.30083, region: "ภาคตะวันออกเฉียงเหนือ" },
    { name: "มุกดาหาร", latitude: 16.54306, longitude: 104.72278, region: "ภาคตะวันออกเฉียงเหนือ" },
    { name: "ยโสธร", latitude: 15.79722, longitude: 104.14306, region: "ภาคตะวันออกเฉียงเหนือ" },
    { name: "ร้อยเอ็ด", latitude: 16.05306, longitude: 103.65111, region: "ภาคตะวันออกเฉียงเหนือ" },
    { name: "เลย", latitude: 17.48528, longitude: 101.73028, region: "ภาคตะวันออกเฉียงเหนือ" },
    { name: "ศรีสะเกษ", latitude: 15.11444, longitude: 104.32028, region: "ภาคตะวันออกเฉียงเหนือ" },
    { name: "สกลนคร", latitude: 17.15639, longitude: 104.14556, region: "ภาคตะวันออกเฉียงเหนือ" },
    { name: "สุรินทร์", latitude: 14.88000, longitude: 103.49000, region: "ภาคตะวันออกเฉียงเหนือ" },
    { name: "หนองคาย", latitude: 17.87444, longitude: 102.73833, region: "ภาคตะวันออกเฉียงเหนือ" },
    { name: "หนองบัวลำภู", latitude: 17.20417, longitude: 102.44444, region: "ภาคตะวันออกเฉียงเหนือ" },
    { name: "อุดรธานี", latitude: 17.53917, longitude: 102.78444, region: "ภาคตะวันออกเฉียงเหนือ" },
    { name: "อุบลราชธานี", latitude: 15.22806, longitude: 104.85944, region: "ภาคตะวันออกเฉียงเหนือ" },
    { name: "อำนาจเจริญ", latitude: 15.85000, longitude: 104.63333, region: "ภาคตะวันออกเฉียงเหนือ" },

    // ภาคกลาง
    { name: "กรุงเทพมหานคร", latitude: 13.72917, longitude: 100.52389, region: "ภาคกลาง" },
    { name: "อุทัยธานี", latitude: 15.38111, longitude: 100.02694, region: "ภาคกลาง" },
    { name: "ชัยนาท", latitude: 15.18722, longitude: 100.12833, region: "ภาคกลาง" },
    { name: "นครสวรรค์", latitude: 15.70389, longitude: 100.13722, region: "ภาคกลาง" },
    { name: "นนทบุรี", latitude: 13.85083, longitude: 100.52222, region: "ภาคกลาง" },
    { name: "ปทุมธานี", latitude: 14.05000, longitude: 100.48333, region: "ภาคกลาง" },
    { name: "พระนครศรีอยุธยา", latitude: 14.35361, longitude: 100.56917, region: "ภาคกลาง" },
    { name: "ลพบุรี", latitude: 14.80000, longitude: 100.62694, region: "ภาคกลาง" },
    { name: "สมุทรปราการ", latitude: 13.59556, longitude: 100.60722, region: "ภาคกลาง" },
    { name: "สมุทรสงคราม", latitude: 13.41972, longitude: 100.00167, region: "ภาคกลาง" },
    { name: "สมุทรสาคร", latitude: 13.54861, longitude: 100.27750, region: "ภาคกลาง" },
    { name: "สระบุรี", latitude: 14.52861, longitude: 100.91139, region: "ภาคกลาง" },
    { name: "สิงห์บุรี", latitude: 14.89111, longitude: 100.40306, region: "ภาคกลาง" },
    { name: "อ่างทอง", latitude: 14.59028, longitude: 100.45528, region: "ภาคกลาง" },

    // ภาคตะวันออก
    { name: "ชลบุรี", latitude: 13.36222, longitude: 100.98333, region: "ภาคตะวันออก" },
    { name: "ระยอง", latitude: 12.67417, longitude: 101.27889, region: "ภาคตะวันออก" },
    { name: "จันทบุรี", latitude: 12.60861, longitude: 102.10389, region: "ภาคตะวันออก" },
    { name: "ตราด", latitude: 12.30250, longitude: 102.51250, region: "ภาคตะวันออก" },
    { name: "นครนายก", latitude: 14.20028, longitude: 101.21111, region: "ภาคตะวันออก" },
    { name: "ฉะเชิงเทรา", latitude: 13.69028, longitude: 101.07028, region: "ภาคตะวันออก" },
    { name: "ปราจีนบุรี", latitude: 14.05472, longitude: 101.36917, region: "ภาคตะวันออก" },
    { name: "สระแก้ว", latitude: 13.82417, longitude: 102.06472, region: "ภาคตะวันออก" },

    // ภาคตะวันตก
    { name: "กาญจนบุรี", latitude: 14.00417, longitude: 99.54806, region: "ภาคตะวันตก" },
    { name: "ประจวบคีรีขันธ์", latitude: 11.79722, longitude: 99.79361, region: "ภาคตะวันตก" },
    { name: "สุพรรณบุรี", latitude: 14.47472, longitude: 100.12278, region: "ภาคตะวันตก" },
    { name: "เพชรบุรี", latitude: 13.11389, longitude: 99.94056, region: "ภาคตะวันตก" },
    { name: "นครปฐม", latitude: 13.81972, longitude: 100.06000, region: "ภาคตะวันตก" },
    { name: "ราชบุรี", latitude: 13.52806, longitude: 99.81361, region: "ภาคตะวันตก" },

    // ภาคใต้
    { name: "กระบี่", latitude: 8.08630, longitude: 98.90628, region: "ภาคใต้" },
    { name: "ชุมพร", latitude: 10.49569, longitude: 99.18246, region: "ภาคใต้" },
    { name: "ตรัง", latitude: 7.55944, longitude: 99.61111, region: "ภาคใต้" },
    { name: "นครศรีธรรมราช", latitude: 8.43042, longitude: 99.96306, region: "ภาคใต้" },
    { name: "นราธิวาส", latitude: 6.42639, longitude: 101.82417, region: "ภาคใต้" },
    { name: "ปัตตานี", latitude: 6.86944, longitude: 101.25000, region: "ภาคใต้" },
    { name: "พังงา", latitude: 8.45139, longitude: 98.53306, region: "ภาคใต้" },
    { name: "พัทลุง", latitude: 7.61783, longitude: 100.07736, region: "ภาคใต้" },
    { name: "ภูเก็ต", latitude: 7.88044, longitude: 98.39230, region: "ภาคใต้" },
    { name: "ยะลา", latitude: 6.54494, longitude: 101.28394, region: "ภาคใต้" },
    { name: "ระนอง", latitude: 9.96360, longitude: 98.63476, region: "ภาคใต้" },
    { name: "สงขลา", latitude: 7.20061, longitude: 100.59080, region: "ภาคใต้" },
    { name: "สตูล", latitude: 6.62300, longitude: 100.06737, region: "ภาคใต้" },
    { name: "สุราษฎร์ธานี", latitude: 9.13824, longitude: 99.32164, region: "ภาคใต้" }

];

function calculateDistance(lat1, lon1, lat2, lon2) {
    const toRad = (value) => (value * Math.PI) / 180; // แปลงองศาเป็นเรเดียน
    const R = 6371; // รัศมีโลกในหน่วยกิโลเมตร
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // ระยะทางในกิโลเมตร
}

export function findTop5NearestProvinces(userLat, userLon) {
    // คำนวณระยะทางสำหรับทุกจังหวัด
    const distances = provinces.map((province) => {
        const distance = calculateDistance(userLat, userLon, province.latitude, province.longitude);
        return { ...province, distance }; // เก็บทั้งจังหวัดและระยะทาง
    });

    // เรียงจังหวัดตามระยะทางจากน้อยไปหามาก
    distances.sort((a, b) => a.distance - b.distance);

    // เลือก 5 จังหวัดที่ใกล้ที่สุด
    const top5Provinces = distances.slice(0, 5);

    // คืนค่าชื่อจังหวัดและภูมิภาคของ 5 จังหวัดที่ใกล้ที่สุด
    return top5Provinces.map(province => ({ name: province.name, region: province.region }));
}