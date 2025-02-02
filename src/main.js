import './style.css';

import axios from 'axios';

console.log('Hello, world!');

const instructionInput = document.getElementById("instruction-section--instruction-input");

const imageContainer = document.getElementById("image-container");

const handleInstructionsSubmit = () => {
    const instruction = instructionInput.value;
    alert(`instruction: ${instruction}`);

    chrome.tabs.captureVisibleTab({format: 'png'}, async function (dataUrl) {
        if (chrome.runtime.lastError) {
            console.error("Error capturing tab: " + chrome.runtime.lastError.message);
            return;
        }

        // Display the captured image by setting the src of an <img> tag
        const img = document.createElement('img');
        img.src = dataUrl;

        // Clear any previous images and append the new one
        imageContainer.innerHTML = '';  // Clear the previous image
        imageContainer.appendChild(img);  // Add the new image

        const {data, status} = await axios.post('http://localhost:3000/instruction-to-steps', {
            instruction
        });

        if(status !== 200) {
            alert("Error fetching steps");
            return;
        }

        alert(`steps: ${data.steps}`);
    });
};

document.getElementById("instruction-section--instruction-button").addEventListener("click", handleInstructionsSubmit);
