let html5Qrcode;
let scannedText = "";

const scanBtn = document.getElementById("scanModeBtn");
const generateBtnMode = document.getElementById("generateModeBtn");
const scannerSection = document.getElementById("scannerSection");
const generatorSection = document.getElementById("generatorSection");

scanBtn.onclick = () => {
    scanBtn.classList.add("active");
    generateBtnMode.classList.remove("active");
    scannerSection.classList.remove("hidden");
    generatorSection.classList.add("hidden");
    startScanner();
};

generateBtnMode.onclick = () => {
    generateBtnMode.classList.add("active");
    scanBtn.classList.remove("active");
    generatorSection.classList.remove("hidden");
    scannerSection.classList.add("hidden");
};

function startScanner() {
    html5Qrcode = new Html5Qrcode("reader");

    Html5Qrcode.getCameras().then(devices => {
        if (devices.length > 0) {
            html5Qrcode.start(
                devices[0].id,
                { fps: 10, qrbox: 250 },
                (decodedText) => {
                    scannedText = decodedText;

                    document.getElementById("resultText").innerText = decodedText;
                    document.getElementById("resultBox").classList.remove("hidden");

                    document.getElementById("copyBtn").onclick = () => {
                        navigator.clipboard.writeText(scannedText);
                        alert("Copied!");
                    };

                    if (decodedText.startsWith("http")) {
                        document.getElementById("openBtn").classList.remove("hidden");
                        document.getElementById("openBtn").onclick = () => {
                            window.open(decodedText, "_blank");
                        };
                    } else {
                        document.getElementById("openBtn").classList.add("hidden");
                    }

                    html5Qrcode.stop();
                }
            );
        }
    }).catch(err => {
        alert("Camera access denied!");
    });
}

document.getElementById("generateBtn").onclick = () => {
    const text = document.getElementById("qrInput").value.trim();
    const qrContainer = document.getElementById("qrcode");

    qrContainer.innerHTML = "";

    if (text === "") {
        alert("Please enter text or URL");
        return;
    }

    new QRCode(qrContainer, {
        text: text,
        width: 200,
        height: 200
    });
};
