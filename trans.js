// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input');
    const chooseButton = document.getElementById('choose-button');
    const fileNameInput = document.getElementById('trans-file-name');
    const uploadButton = document.getElementById('trans-upload-button');
    const videoLinkInput = document.getElementById('trans-video-link');
    const fetchButton = document.getElementById('fetch-button');
    const thumbnailContainer = document.getElementById('thumbnail-container');
    const languageDropdown = document.getElementById('trans-language-dropdown');
    const submitButton = document.getElementById('submit-button');
    const outputDropdown = document.getElementById('trans-output-dropdown');
    const outputVideoContainer = document.getElementById('output-video-container');
    const downloadButton = document.getElementById('download-button');

    const apiKey = 'AIzaSyDfMbHgSvWY4KT2coSua-LlMonaL4_I3FQ'; // Replace with your actual API key

    // Populate language dropdown with AWS Translate languages
    const languages = [
        { code: 'None', name: 'Select'},
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Spanish' },
        { code: 'fr', name: 'French' },
        // Add more languages as needed
    ];

    languages.forEach(language => {
        const option = document.createElement('option');
        option.value = language.code;
        option.textContent = language.name;
        languageDropdown.appendChild(option);
    });

    chooseButton.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            fileNameInput.value = fileInput.files[0].name;
        }
    });

    uploadButton.addEventListener('click', () => {
        if (fileInput.files.length > 0) {
            // Handle file upload
            alert('File uploaded: ' + fileInput.files[0].name);
        } else {
            alert('No file chosen');
        }
    });

    fetchButton.addEventListener('click', () => {
        const videoLink = videoLinkInput.value;
        if (videoLink) {
            const videoId = extractVideoId(videoLink);
            if (videoId) {
                fetchVideoDetails(videoId);
            } else {
                alert('Invalid YouTube link');
            }
        } else {
            alert('Please paste a video link');
        }
    });

    submitButton.addEventListener('click', () => {
        const selectedLanguage = languageDropdown.value;
        if (selectedLanguage) {
            // Handle translation submission
            alert('Translation requested in: ' + selectedLanguage);
        } else {
            alert('Please select a language');
        }
    });

    outputDropdown.addEventListener('change', () => {
        const outputType = outputDropdown.value;
        if (outputType === 'transcript') {
            // Display transcript (placeholder example)
            outputVideoContainer.innerHTML = '<p>Transcript will be displayed here</p>';
        } else if (outputType === 'translate') {
            // Display translated video (placeholder example)
            outputVideoContainer.innerHTML = '<video controls><source src="path/to/translated/video.mp4" type="video/mp4"></video>';
        }
    });

    downloadButton.addEventListener('click', () => {
        // Handle download functionality (placeholder example)
        alert('Download initiated');
    });

    function extractVideoId(url) {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    function fetchVideoDetails(videoId) {
        fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`)
            .then(response => response.json())
            .then(data => {
                if (data.items && data.items.length > 0) {
                    const videoDetails = data.items[0].snippet;
                    displayThumbnail(videoDetails);
                } else {
                    alert('Video not found');
                }
            })
            .catch(error => {
                console.error('Error fetching video details:', error);
                alert('Failed to fetch video details');
            });
    }

    function displayThumbnail(videoDetails) {
        const thumbnailUrl = videoDetails.thumbnails.high.url;
        thumbnailContainer.innerHTML = `<img src="${thumbnailUrl}" alt="${videoDetails.title}">`;
    }
});
