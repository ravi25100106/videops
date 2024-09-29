// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const videoForm = document.getElementById('video-form');
    const outputContainer = document.getElementById('gen-output-container');

    // Handle form submission
    videoForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(videoForm);
        const data = {
            description: formData.get('video-description'),
            type: formData.get('video-type')
        };

        // Send data to backend for video processing
        const response = await fetch('/api/process-video', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        displayOutput(result);
    });

    function displayOutput(result) {
        outputContainer.innerHTML = `<video controls width="100%">
            <source src="${result.videoUrl}" type="video/mp4">
            Your browser does not support the video tag.
        </video>`;
    }
});
