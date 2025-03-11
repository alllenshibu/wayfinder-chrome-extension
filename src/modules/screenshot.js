export const captureScreenshot = async () => {
    return new Promise((resolve, reject) => {
        chrome.tabs.captureVisibleTab({ format: 'png' }, function (dataUrl) {
            if (chrome.runtime.lastError) {
                reject("Error capturing tab: " + chrome.runtime.lastError.message);
            } else {
                resolve(dataUrl);
            }
        });
    });
};
