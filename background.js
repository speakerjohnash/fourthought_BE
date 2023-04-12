// Create a context menu item for selected text.
chrome.contextMenus.create({
  id: "copyText",
  title: "Copy Text to Extension",
  contexts: ["selection"]
});

// Listen for the context menu item click event.
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "copyText") {
    // Get the selected text.
    const selectedText = info.selectionText;

    // Send a message to the content script to show the UI with the selected text.
    chrome.tabs.sendMessage(tab.id, {
      action: "showUI",
      selectedText: selectedText
    });
  }
});
