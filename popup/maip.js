const IP = document.getElementById("IP");
const OCTET = document.getElementById("octet");
const BIT_1 = document.getElementById("bit-1");
const BIT_2 = document.getElementById("bit-2");
const BIT_3 = document.getElementById("bit-3");

const ADD_1 = document.getElementById("add-1");
const ADD_2 = document.getElementById("add-2");

const CRT_BUTTON = document.getElementById("crt-button");

let IP_VALUE = '';

IP.addEventListener('input', (event) => {
    const value = event.target.value;
    const pts = value.split('.')

    OCTET.value = pts[0];
    BIT_1.value = pts[1];
    BIT_2.value = pts[2];
    BIT_3.value = pts[3];

    if (ADD_1.value) {
        console.log(ADD_1)
        console.log(ADD_1.value)
        IP_VALUE += value + '.' + ADD_1.value;
    }

    if (ADD_2.value) {
        console.log(ADD_2)
        console.log(ADD_2.value)
        IP_VALUE += value + '.' + ADD_2.value;
    }
});

CRT_BUTTON.addEventListener('click', () => {
    console.log(IP_VALUE);
});