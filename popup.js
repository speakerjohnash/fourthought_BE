// Get the selected text from local storage and populate the textarea.
chrome.storage.local.get("selectedText", (data) => {
  const selectedText = data.selectedText || "";
  document.getElementById("textArea").value = selectedText;
});

document.getElementById("saveBtn").addEventListener("click", async function () {
  // Get the selected text and certainty level from the popup.
  const selectedText = document.getElementById("textArea").value;
  const certainty = document.getElementById("certainty").value;

  // Create an object to store the selected text, timestamp, and certainty level.
  const textData = {
    text: selectedText,
    timestamp: new Date().toISOString(),
    certainty: certainty,
  };

  // Save the object to local storage.
  try {
    const data = await new Promise((resolve) =>
      chrome.storage.local.get("textCopierData", resolve)
    );
    let textCopierData = data.textCopierData || [];
    textCopierData.push(textData);
    await new Promise((resolve) =>
      chrome.storage.local.set({ textCopierData: textCopierData }, resolve)
    );

    // Update the status to show that the data was saved.
    document.getElementById("status").textContent = "Text saved successfully!";
    setTimeout(function () {
      document.getElementById("status").textContent = "";
    }, 2000);
  } catch (error) {
    document.getElementById("status").textContent = "Error saving text.";
  }
});
