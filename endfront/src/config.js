// src/config.js

const LOCAL_IP = "172.20.10.2"; // Đổi IP tại đây khi cần172.20.10.2
//const LOCAL_IP = "192.168.1.16";//wifi STESTE
//const LOCAL_IP = "192.168.77.121";//wifihuce
//const LOCAL_IP = "192.168.1.7";//home
//const LOCAL_IP = "192.168.2.66";//cau Nam
//const LOCAL_IP = "192.168.1.16"; //Nha Tam
//const LOCAL_IP = "26.180.3.34"; //Nha sach
const PORT = 3000;

export const BASE_URL = `http://${LOCAL_IP}:${PORT}`;
