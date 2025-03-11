import axios from 'axios';
import {captureScreenshot} from "./screenshot.js";


const instructionInput = document.getElementById("instruction-section--instruction-input");

const imageContainer = document.getElementById("image-container");

const handleInstructionsSubmit = async () => {
    const instruction = instructionInput.value;
    alert(`instruction: ${instruction}`);

    const {data, status} = await axios.post('http://localhost:3000/instruction-to-steps', {
        instruction
    });

    if (status !== 200) {
        alert("Error fetching steps");
        return;
    }

    alert(`steps: ${data.steps}`);
};

const handleAtomicStepSubmit = () => {
    const step = document.getElementById("steps-section--step-input").value;
    alert(`step: ${step}`);
};

document.getElementById("instruction-section--instruction-button").addEventListener("click", handleInstructionsSubmit);
document.getElementById("steps-section--step-button").addEventListener("click", async () => {
    const image = await captureScreenshot();

    const img = document.createElement('img');
    img.src = image;

    // Clear any previous images and append the new one
    imageContainer.innerHTML = '';  // Clear the previous image
    imageContainer.appendChild(img);  // Add the new image

    const step = document.getElementById("steps-section--step-input").value;
    alert(`step: ${step}`);

    const {data, status} = await axios.post('http://localhost:3000/execute-atomic-step', {
        step
    });

    if (status !== 200) {
        alert("Error fetching steps");
        return;
    }

    alert(`steps: ${data}`);
});