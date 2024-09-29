// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('finder-search-button');
    const clearButton = document.getElementById('finder-clear-button');
    const micButton = document.getElementById('finder-mic-button');
    const searchInput = document.getElementById('finder-search-input');
    const resultsContainer = document.getElementById('finder-results');

    const API_KEY = 'AIzaSyDfMbHgSvWY4KT2coSua-LlMonaL4_I3FQ';

    searchButton.addEventListener('click', () => {
        const query = searchInput.value;
        if (query) {
            searchYouTube(query);
        }
    });

    clearButton.addEventListener('click', () => {
        searchInput.value = '';
        resultsContainer.innerHTML = '';
    });

    micButton.addEventListener('click', () => {
        startVoiceRecognition();
    });

    function searchYouTube(query) {
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${API_KEY}`)
            .then(response => response.json())
            .then(data => displayResults(data.items))
            .catch(error => console.error('Error fetching YouTube data:', error));
    }

    function displayResults(videos) {
        resultsContainer.innerHTML = '';
        videos.forEach(video => {
            const videoElement = document.createElement('div');
            videoElement.classList.add('thumbnail');
            videoElement.innerHTML = `
                <img src="${video.snippet.thumbnails.default.url}" alt="${video.snippet.title}">
                <p>${video.snippet.title}</p>
            `;
            videoElement.addEventListener('click', () => {
                window.open(`https://www.youtube.com/watch?v=${video.id.videoId}`, '_blank');
            });
            resultsContainer.appendChild(videoElement);
        });
    }

    function startVoiceRecognition() {
        if (!('webkitSpeechRecognition' in window)) {
            alert('Your browser does not support speech recognition.');
            return;
        }

        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.start();

        recognition.onresult = event => {
            const transcript = event.results[0][0].transcript;
            searchInput.value = transcript;
            searchYouTube(transcript);
        };

        recognition.onerror = event => {
            console.error('Speech recognition error:', event.error);
        };

        recognition.onend = () => {
            console.log('Speech recognition service disconnected');
        };
    }
});
