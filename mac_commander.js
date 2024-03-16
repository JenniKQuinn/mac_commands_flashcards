document.addEventListener('keydown', function(event) {
    // Prevent default browser action
    event.preventDefault();

    // Add the pressed key to the current set of pressed keys
    currentKeys.add(formatKey(event));

    // Potentially check the combination immediately or wait for a 'submit' action
});

document.addEventListener('keyup', function(event) {
    // Remove the released key from the current set of pressed keys
    currentKeys.delete(formatKey(event));

    // Check if the current combination is correct
    checkAnswer(currentKeys);
});

let currentKeys = new Set();

function formatKey(event) {
    // Check for individual modifiers without any other key pressed
    if (event.key === 'Meta' || event.key === 'Control' || event.key === 'Shift' || event.key === 'Alt') {
        switch(event.key) {
            case 'Meta': return 'Command';
            case 'Control': return 'Ctrl';
            case 'Shift': return 'Shift';
            case 'Alt': return 'Alt';
        }
    }

    // Initialize an array to hold parts of the final key representation
    let parts = [];

    // Check and add modifier keys in a specific order
    if (event.metaKey) parts.push('Command');
    if (event.shiftKey) parts.push('Shift');
    if (event.ctrlKey) parts.push('Ctrl');
    if (event.altKey) parts.push('Alt');

    // Normalize the non-modifier key if it's not a modifier key being pressed alone
    if (event.key !== 'Meta' && event.key !== 'Shift' && event.key !== 'Control' && event.key !== 'Alt') {
        let key = event.key.toUpperCase(); // Normalize key value
        parts.push(key);
    }

    // Join parts with "-" for modifiers combination or with "+" for key combinations
    return parts.join("-");
}


function checkAnswer(currentKeys) {
    let correctKeys = new Set(flashcards[currentCardIndex].answer.split('+').map(k => k.toUpperCase()));
    if (isEqualSet(currentKeys, correctKeys)) {
        displayFeedback("CORRECT!");
        // Proceed to next card...
    } else {
        // The current combination is incorrect; wait or show feedback
    }
}

function isEqualSet(as, bs) {
    if (as.size !== bs.size) return false;
    for (var a of as) if (!bs.has(a)) return false;
    return true;
}
