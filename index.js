const container = document.querySelector(".container");
const generateBtn = document.querySelector(".form-btn");
const qrInput = document.querySelector("#qrInput");
const qrImg = document.getElementById("qr-img");
const download = document.getElementById("download-btn");

let toDownloadSrc = "";
generateBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let qrValue = qrInput.value;
    if (!qrValue) return;
    generateBtn.innerText = "Generating your QR Code...";
    generateBtn.style.backgroundColor = "rgba(67, 212, 38, 0.722)";
    let src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrValue}`;
    qrImg.src = src;
    toDownloadSrc = src;
    qrImg.addEventListener("load", () => {
        container.classList.add("active");
        generateBtn.innerText = "Generate QR Code";
        generateBtn.style.backgroundColor = "rgba(98, 181, 249, 0.722)";
        qrInput.value = "";
    });
});

download.addEventListener("click", (e) => {
    e.preventDefault();
    download.innerText = "Downloading your file...";
    download.style.backgroundColor = "rgba(67, 212, 38, 0.722)";
    fetchFile(toDownloadSrc);
});

function fetchFile(url) {
    fetch(url)
        .then((res) => res.blob())
        .then((file) => {
            let tempUrl = URL.createObjectURL(file);
            let aTag = document.createElement("a");
            aTag.href = tempUrl;
            aTag.download = url.replace(/^.*[\\\/]/, "");
            document.body.appendChild(aTag);
            aTag.click();
            aTag.remove();
            URL.revokeObjectURL(tempUrl);
            download.innerText = "Download QR Code";
            download.style.backgroundColor = "rgb(249, 221, 98)";
        });
}
