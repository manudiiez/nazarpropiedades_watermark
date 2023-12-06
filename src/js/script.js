const canvas = new fabric.Canvas('canvas');
const uploadInput = document.getElementById("upload");
const downloadButton = document.getElementById("download");
const originalImage = document.querySelector("#originalImage");
/* ---------------------------------- Input --------------------------------- */
const conditionInput = document.querySelector("#condition");
const locationInput = document.querySelector("#location");
const zoneInput = document.querySelector("#zone");
const surfaceInput = document.querySelector("#surface");
const garageInput = document.querySelector("#garage");
const bedInput = document.querySelector("#bed");
const bathInput = document.querySelector("#bath");

function fitImageOnCanvas(image, canvas) {
    const imgWidth = image.width;
    const imgHeight = image.height;
    const canvasWidth = canvas.getWidth();
    const canvasHeight = canvas.getHeight();
    let scaleFactor = 1;
    let offsetX = 0;
    let offsetY = 0;

    if (imgWidth > imgHeight) {
        scaleFactor = canvasHeight / imgHeight;
        offsetX = -(imgWidth * scaleFactor - canvasWidth) / 2;
    } else {
        scaleFactor = canvasWidth / imgWidth;
        offsetY = -(imgHeight * scaleFactor - canvasHeight) / 2;
    }

    const scaledWidth = imgWidth * scaleFactor;
    const scaledHeight = imgHeight * scaleFactor;

    image.scale(scaleFactor).set({
        left: offsetX,
        top: offsetY,
        scaleX: scaleFactor,
        scaleY: scaleFactor,
        width: scaledWidth,
        height: scaledHeight
    });

    canvas.add(image);
    canvas.renderAll();
}
uploadInput.addEventListener("change", async (e) => {
    const [file] = uploadInput.files;
    const imageUrl = await fileToDataUri(file);
    originalImage.src = imageUrl

    fabric.Image.fromURL(imageUrl, function (img) {
        canvas.setWidth(1080);
        canvas.setHeight(1080);
        fitImageOnCanvas(img, canvas);
    });
});

downloadButton.addEventListener('click', () => {
    // Cargar la imagen de marca de agua predefinida
    const watermarkUrl = './src/img/plantilla.png';
    fabric.Image.fromURL(watermarkUrl, function (watermark) {
        watermark.set({ left: 0, top: 0, opacity: 1 });
        fitImageOnCanvas(watermark, canvas);

        // Crear texto con los valores del formulario (simulación)
        const condicion = new fabric.Text(conditionInput.value.toUpperCase(), {
            left: 1080 - 1009,
            top: 1080 - 215,
            fill: 'white',
            fontFamily: 'Arial',
            fontSize: 39,
            fontWeight: 'bold'
        });

        const ubicacion = new fabric.Text(locationInput.value.toUpperCase(), {
            left: 71,
            top: 1080 - 170,
            fill: 'white',
            fontFamily: 'Arial',
            fontSize: 33,
            fontWeight: 'bold'
        });

        const departamento = new fabric.Text(zoneInput.value, {
            left: 71,
            top: 1080 - 135,
            fill: 'white',
            fontFamily: 'Arial',
            fontSize: 35,
            fontWeight: 'bold'
        });
        const superficie = new fabric.Text(surfaceInput.value + 'm2', {
            left: 921,
            top: 1080 - 280,
            fill: 'white',
            fontFamily: 'Arial',
            fontSize: 23,
            fontWeight: 'bold'
        });
        const values = garageInput.value.split(' ')
        let cochera = null
        let cochera2 = null
        const arr = values.length === 1 ? values : values.filter(item => item !== '')
        if (arr.length === 1) {
            cochera = new fabric.Text(arr[0], {
                left: 921,
                top: 1080 - 200,
                fill: 'white',
                fontFamily: 'Arial',
                fontSize: 22,
                fontWeight: 'bold'
            });
        } else {
            cochera = new fabric.Text(arr[0], {
                left: 921,
                top: 1080 - 215,
                fill: 'white',
                fontFamily: 'Arial',
                fontSize: 22,
                fontWeight: 'bold'
            });
            cochera2 = new fabric.Text(arr[1], {
                left: 921,
                top: 1080 - 190,
                fill: 'white',
                fontFamily: 'Arial',
                fontSize: 22,
                fontWeight: 'bold'
            });
            canvas.add(cochera2);
        }
        const habitaciones = new fabric.Text(bedInput.value, {
            left: 921,
            top: 1080 - 130,
            fill: 'white',
            fontFamily: 'Arial',
            fontSize: 22,
            fontWeight: 'bold'
        });

        const baños = new fabric.Text(bathInput.value, {
            left: 921,
            top: 1080 - 55,
            fill: 'white',
            fontFamily: 'Arial',
            fontSize: 22,
            fontWeight: 'bold'
        });


        canvas.add(condicion);
        canvas.add(ubicacion);
        canvas.add(departamento);
        canvas.add(superficie);
        canvas.add(cochera);
        canvas.add(habitaciones);
        canvas.add(baños);


        // Descargar la imagen con texto y marca de agua
        const dataURL = canvas.toDataURL({ format: 'jpeg', quality: 0.8 });
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'imagen_con_marca_agua.jpg';
        link.click();
    });
});

// Función para convertir archivo a URL de datos
async function fileToDataUri(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = function (e) {
            resolve(e.target.result);
        };
        reader.readAsDataURL(file);
    });
}
