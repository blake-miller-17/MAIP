const ADD_1_PLACE = 4;
const ADD_2_PLACE = 5;

const LEN_IP = 4;
const IP = document.getElementById("IP");
const PERSIST_ADD_1 = document.getElementById("persist-add-1");
const PERSIST_ADD_2 = document.getElementById("persist-add-2");
const ADD_1 = document.getElementById("add-1");
const ADD_2 = document.getElementById("add-2");
const IP_PRESENTATION = document.getElementById("ip_input_presentation");
const CRT_BUTTON = document.getElementById("crt-button");

const bytes = [
  document.getElementById("byte_0"),
  document.getElementById("byte-1"),
  document.getElementById("byte-2"),
  document.getElementById("byte-3"),
];

let IP_VALUE = ["", "", "", ""];

window.addEventListener("DOMContentLoaded", () => {
  loadPersistedValues();
});

// Save values when checkboxes change
PERSIST_ADD_1.addEventListener("change", () => {
  if (PERSIST_ADD_1.checked) {
    localStorage.setItem("add-1-value", ADD_1.value);
    localStorage.setItem("add-1-persist", "true");
  } else {
    localStorage.removeItem("add-1-value");
    localStorage.removeItem("add-1-persist");
  }
});

PERSIST_ADD_2.addEventListener("change", () => {
  if (PERSIST_ADD_2.checked) {
    localStorage.setItem("add-2-value", ADD_2.value);
    localStorage.setItem("add-2-persist", "true");
  } else {
    localStorage.removeItem("add-2-value");
    localStorage.removeItem("add-2-persist");
  }
});

IP.addEventListener("input", (event) => {
  const value = event.target.value;
  const pts = value.split(".");

  for (let i = 0; i < 4; i++) {
    if (!pts[i]) {
      bytes[i].value = "";
      IP_VALUE[i] = "";
    } else {
      bytes[i].value = pts[i];
      IP_VALUE[i] = pts[i];
    }
  }

  IP_PRESENTATION.value = setPresentation();
});

ADD_1.addEventListener("input", (event) => {
  const val = event.target.value;
  if (PERSIST_ADD_1.checked) {
    localStorage.setItem("add-1-value", val);
  }
  IP_VALUE[ADD_1_PLACE] = val ? val : "";
  IP_PRESENTATION.value = setPresentation();
});

ADD_2.addEventListener("input", (event) => {
  const val = event.target.value;
  if (PERSIST_ADD_2.checked) {
    localStorage.setItem("add-2-value", val);
  }
  IP_VALUE[ADD_2_PLACE] = val ? val : "";
  IP_PRESENTATION.value = setPresentation();
});

CRT_BUTTON.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(IP_PRESENTATION.value);

    // Visual feedback
    const originalText = CRT_BUTTON.textContent;
    CRT_BUTTON.textContent = "Copied!";
    CRT_BUTTON.style.backgroundColor = "#45a049";

    setTimeout(() => {
      CRT_BUTTON.textContent = originalText;
      CRT_BUTTON.style.backgroundColor = "#4CAF50";
    }, 2000);
  } catch (err) {
    console.error("Failed to copy: ", err);
    // Fallback for older browsers
    fallbackCopyTextToClipboard(IP_PRESENTATION.value);
  }
});

function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  textArea.style.top = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand("copy");
    CREATE_BTN.textContent = "Copied!";
    setTimeout(() => {
      CREATE_BTN.textContent = "Create Modified IP";
    }, 2000);
  } catch (err) {
    console.error("Fallback: Could not copy text: ", err);
  }

  document.body.removeChild(textArea);
}

// Load persisted values
const loadPersistedValues = () => {
  // Load ADD_1
  if (localStorage.getItem("add-1-persist")) {
    PERSIST_ADD_1.checked = true;
    ADD_1.value = localStorage.getItem("add-1-value") || "";
    IP_VALUE[ADD_1_PLACE] = ADD_1.value ? ADD_1.value : "";
  }

  // Load ADD_2
  if (localStorage.getItem("add-2-persist")) {
    PERSIST_ADD_2.checked = true;
    ADD_2.value = localStorage.getItem("add-2-value") || "";
    IP_VALUE[ADD_2_PLACE] = ADD_2.value ? ADD_2.value : "";
  }
  //   IP_PRESENTATION.value = setPresentation();
};

const setPresentation = () => {
  let ret = "";
  const diff = IP_VALUE.length - LEN_IP;
  for (let i = 0; i < LEN_IP; i++) {
    if (i == LEN_IP - 1) ret += IP_VALUE[i];
    else ret += IP_VALUE[i] + "-";
  }

  for (let j = LEN_IP; j < IP_VALUE.length; j++) {
    ret += IP_VALUE[j];
  }

  return ret;
};
