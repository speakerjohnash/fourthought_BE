// Function to create and show the UI element on the page.
function showUI(selectedText) {
  // Create the UI element.
  const ui = document.createElement('div');
  ui.id = 'text-copier-ui';
  ui.style.position = 'fixed';
  ui.style.top = '10px';
  ui.style.right = '10px';
  ui.style.width = '300px';
  ui.style.padding = '10px';
  ui.style.backgroundColor = '#f8f8f8';
  ui.style.border = '1px solid #ccc';
  ui.style.zIndex = '9999';
  ui.innerHTML = `
    <h3>Text Copier</h3>
    <textarea id="textArea" rows="5" cols="30">${selectedText}</textarea><br>
    <label for="certainty">Certainty (0-100%):</label>
    <input type="number" id="certainty" min="0" max="100" value="100"><br>
    <button id="saveBtn">Save</button>
    <button id="closeBtn">Close</button>
    <div id="status"></div>
  `;

  // Append the UI element to the body.
  document.body.appendChild(ui);

  // Add event listeners for the Save and Close buttons.
  document.getElementById('saveBtn').addEventListener('click', () => {
    const selectedText = document.getElementById('textArea').value;
    const certainty = document.getElementById('certainty').value;
    const textData = {
      text: selectedText,
      timestamp: new Date().toISOString(),
      certainty: certainty
    };
    chrome.storage.local.get('textCopierData', (data) => {
      let textCopierData = data.textCopierData || [];
      textCopierData.push(textData);
      chrome.storage.local.set({ textCopierData }, () => {
        document.getElementById('status').textContent = 'Text saved successfully!';
        setTimeout(() => {
          document.getElementById('status').textContent = '';
        }, 2000);
      });
    });
  });

  document.getElementById('closeBtn').addEventListener('click', () => {
    ui.remove();
  });
}

// Listen for messages from the background script.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'showUI') {
    showUI(request.selectedText);
  }
});
