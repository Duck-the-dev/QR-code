
const input = document.getElementById('input');
const button = document.getElementById('start');
const image = document.getElementById('image');
const back = document.getElementById('back');
const download = document.getElementById('download');
const alert = document.getElementById('alert');

// Initially hide the image, download button, and alert
image.classList.add('hidden');
download.classList.add('hidden');
alert.classList.add('hidden');

button.addEventListener('click', () => {
    const inputValue = input.value;
    
    if (!inputValue) {
        // Show alert if input is empty
        alert.classList.remove('hidden');
        return;
    }
    
    // Hide alert if input is not empty
    alert.classList.add('hidden');
    
    const imageUrl = "https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=" + inputValue;
    image.src = imageUrl;
    
    
    // Hide the image and download button until the image is loaded
    image.classList.add('hidden');
    download.classList.add('hidden');
    back.classList.add('hidden');
});

image.addEventListener('load', () => {
    
    
    // Show the image and download button, hide the start button
    image.classList.remove('hidden');
    download.classList.remove('hidden');
    button.classList.add('hidden');
    
    // Fetch the image as a blob and trigger the download
    fetch(image.src)
        .then(response => response.blob())
        .then(blob => {
            const url = URL.createObjectURL(blob);
            download.href = url;
            download.setAttribute('download', 'qrcode.png');  // Provide a filename
            
            // Cleanup the object URL after downloading
            download.addEventListener('click', () => {
                setTimeout(() => {
                    URL.revokeObjectURL(url);
                    // Hide the image and download button, show the start button, and clear the input field
                    image.classList.add('hidden');
                    download.classList.add('hidden');
                    button.classList.remove('hidden');
                    back.classList.remove('hidden');

                    input.value = '';
                }, 100);
            });
        });
});