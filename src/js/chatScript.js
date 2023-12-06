const fileInput = document.querySelector("#upload");
// const values = document.querySelectorAll("#values p");
const conditionInput = document.querySelector("#condition");
const locationInput = document.querySelector("#location");
const zoneInput = document.querySelector("#zone");
const surfaceInput = document.querySelector("#surface");
const garageInput = document.querySelector("#garage");
const bedInput = document.querySelector("#bed");
const bathInput = document.querySelector("#bath");
const downloadButton = document.querySelector("#download");
const originalImage = document.querySelector("#originalImage");
const mobile__image__container = document.querySelector("#mobile__image__container");
const mobile__image = document.querySelector("#mobile__image");



fileInput.addEventListener("change", async (e) => {
    const [file] = fileInput.files;
    originalImage.src = await fileToDataUri(file);
    console.log(file);
    console.log(originalImage);
    return false;
});
// conditionInput.addEventListener('keyup', () => {
//     values[0].textContent = conditionInput.value.toUpperCase()
// })
// locationInput.addEventListener('keyup', () => {
//     values[1].textContent = locationInput.value.toUpperCase()
// })
// zoneInput.addEventListener('keyup', () => {
//     values[2].textContent = zoneInput.value
// })
// surfaceInput.addEventListener('keyup', () => {
//     values[3].textContent = surfaceInput.value + 'm2'
// })
// garageInput.addEventListener('keyup', () => {
//     values[4].textContent = garageInput.value
// })
// bedInput.addEventListener('keyup', () => {
//     values[5].textContent = bedInput.value
// })
// bathInput.addEventListener('keyup', () => {
//     values[6].textContent = bathInput.value
// })

downloadButton.addEventListener('click', async () => {
    // console.log('click');
    // downloadButton.textContent = 'clickeado'

    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) || window.innerWidth <= 550) {
        mobile__image.src = await watermarkImage(
            originalImage,
            "./src/img/plantilla.png");
        mobile__image__container.style.visibility = "visible";
    } else {
        download_image()
    }

})


function fileToDataUri(field) {
    return new Promise((resolve) => {
        const reader = new FileReader();

        reader.addEventListener("load", () => {
            resolve(reader.result);
        });

        reader.readAsDataURL(field);
    });
}

async function download_image() {
    const link = document.getElementById("actionDowload");
    link.download = `nazarpropiedades-${Date.now()}.jpeg`;
    link.href = await watermarkImage(
        originalImage,
        "./src/img/plantilla.png");
    link.click();
}

const fitImageOn = function (imageObj, context) {

    let scale = 0
    let diference = 0
    let width
    let positionX
    let positionY

    if (imageObj.naturalWidth > imageObj.naturalHeight) {
        scale = imageObj.naturalWidth / imageObj.naturalHeight
        diference = 1080 - imageObj.naturalHeight
        width = imageObj.naturalWidth + diference * scale
        positionX = width - 1080
        positionX = positionX / 2
        context.drawImage(imageObj, -positionX, 0, width, 1080);

    } else if (imageObj.naturalHeight > imageObj.naturalWidth) {
        scale = imageObj.naturalHeight / imageObj.naturalWidth
        diference = 1080 - imageObj.naturalWidth
        height = imageObj.naturalHeight + diference * scale
        positionY = height - 1080
        positionY = positionY / 2
        context.drawImage(imageObj, 0, -positionY, 1080, height);
    }

}



async function watermarkImage(originalImage, watermarkImagePath) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const canvasWidth = 1080;
    // const canvasWidth = originalImage.width;
    const canvasHeight = 1080;
    // const canvasHeight = originalImage.height;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    console.log(originalImage);
    console.log(watermarkImagePath);

    // initializing the canvas with the original image
    fitImageOn(originalImage, context)
    // context.drawImage(originalImage, 0, 0, canvasWidth, canvasHeight);

    // loading the watermark image and transforming it into a pattern
    const result = await fetch(watermarkImagePath);
    const blob = await result.blob();
    const image = await createImageBitmap(blob);
    console.log('.');
    console.log(image);
    const pattern = context.createPattern(image, "no-repeat");

    // translating the watermark image to the bottom right corner
    context.translate(0, 0);
    context.rect(0, 0, canvasWidth, canvasHeight);
    context.fillStyle = pattern;

    context.fill();

    context.fillStyle = "white";
    context.textBaseline = "middle";
    context.font = "bold 39px Arial";
    context.fillText(conditionInput.value.toUpperCase(), canvasWidth - 1009, canvasHeight - 190);

    context.fillStyle = "white";
    context.textBaseline = "middle";
    context.font = "bold 33px Arial";
    context.fillText(locationInput.value.toUpperCase(), canvasWidth - 1009, canvasHeight - 145);

    context.fillStyle = "white";
    context.textBaseline = "middle";
    context.font = "bold 35px Arial";
    context.fillText(zoneInput.value, canvasWidth - 1009, canvasHeight - 110);

    context.fillStyle = "white";
    context.textBaseline = "middle";
    context.font = "bold 23px Arial";
    context.fillText(surfaceInput.value + 'm2', canvasWidth - 159, canvasHeight - 265);

    context.fillStyle = "white";
    context.textBaseline = "middle";
    context.font = "bold 22px Arial";
    const arr = garageInput.value.split(' ');
    context.fillText(arr[0], canvasWidth - 159, canvasHeight - 200);

    context.fillStyle = "white";
    context.textBaseline = "middle";
    context.font = "bold 22px Arial";
    context.fillText(arr[1], canvasWidth - 159, canvasHeight - 175);

    context.fillStyle = "white";
    context.textBaseline = "middle";
    context.font = "bold 22px Arial";
    context.fillText(bedInput.value, canvasWidth - 159, canvasHeight - 115);

    context.fillStyle = "white";
    context.textBaseline = "middle";
    context.font = "bold 22px Arial";
    context.fillText(bathInput.value, canvasWidth - 159, canvasHeight - 40);

    return canvas.toDataURL();
}



