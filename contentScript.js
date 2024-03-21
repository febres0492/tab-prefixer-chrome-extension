// Listener for keyboard shortcut (Ctrl+Shift+Y)
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'Y') {
        e.preventDefault(); // Prevent the default action (refresh)

        const newPrefix = prompt("Enter a new prefix to be saved, or type 'delete' to remove the existing prefix:");
        if (newPrefix.trim().toLowerCase() === 'delete') {
            localStorage.removeItem('customPrefix');
            alert("Saved prefix has been deleted.");
        } else if (newPrefix !== null && newPrefix.trim() !== '') {
            localStorage.setItem('customPrefix', newPrefix.trim());
        }
        // Reapply the title to reflect the new or deleted prefix
        setTitle();
    }
});
