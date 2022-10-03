// getting input fields from the DOM to manipulate
const container = document.querySelector(".container");
const generateBtn = document.querySelector(".form-btn");
const qrInput = document.querySelector("#qrInput");
const qrImg = document.getElementById("qr-img");
const download = document.getElementById("download-btn");
const ecc = document.getElementById("ecclvl");

// initiallize qr-code img variable to enabke download later
let toDownloadSrc = "";
generateBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // get raw text to converrt into qr-code
    let qrValue = qrInput.value;
    // check if the qr-value is  empty, if so do nothing
    if (!qrValue) return;
    //change generateBtn backgound-color to indicate taht it is loading
    generateBtn.innerText = "Generating your QR Code...";
    generateBtn.style.backgroundColor = "rgba(67, 212, 38, 0.722)";
    // connect to the api to convert text into qr-code
    let src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrValue}&ecc=${ecc.value}`;
    qrImg.src = src;
    toDownloadSrc = src;
    // event to reverrt the backround og the btn to indicate that it is done loading
    qrImg.addEventListener("load", () => {
        container.classList.add("active");
        generateBtn.innerText = "Generate QR Code";
        generateBtn.style.backgroundColor = "rgba(98, 181, 249, 0.722)";
        qrInput.value = "";
    });
});

// events to add hover effect to the btn
generateBtn.addEventListener("mouseover", (e) => {
    e.preventDefault();
    generateBtn.style.backgroundColor = "rgb(98, 181, 249)";
});

generateBtn.addEventListener("mouseout", (e) => {
    e.preventDefault();
    generateBtn.style.backgroundColor = "rgba(98, 181, 249, 0.722)";
});

// event to enable download fearture of the qr-code img
download.addEventListener("click", (e) => {
    e.preventDefault();
    download.innerText = "Downloading your file...";
    download.style.backgroundColor = "rgba(67, 212, 38, 0.722)";
    fetchFile(toDownloadSrc);
});

// function to actually enable the download
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
