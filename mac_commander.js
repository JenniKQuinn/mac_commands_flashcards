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
    let key = event.key.toUpperCase(); // Normalize key value
    if (event.metaKey) key = 'CMD+' + key;
    if (event.altKey) key = 'ALT+' + key;
    if (event.shiftKey) key = 'SHIFT+' + key;
    if (event.ctrlKey) key = 'CTRL+' + key;
    return key;
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
