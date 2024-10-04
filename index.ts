export default (keyCombos: string[], callbackFn: (e: KeyboardEvent) => void) => {
	const pressedKeys = new Set<string>();

	const onKeyDown = (e: KeyboardEvent) => {
		// Normalize the key name for cross-platform compatibility
		const key = normalizeKey(e);

		// Add the pressed key to the set
		pressedKeys.add(key);

		// Check if all keys in keyCombos are pressed
		if (keyCombos.every((kc: string) => pressedKeys.has(kc))) {
			callbackFn(e); // Trigger the callback when all keys are pressed
		}
	};
    
	// Remove the key when it's released
	const onKeyUp = (e: KeyboardEvent) => {
		pressedKeys.delete(normalizeKey(e));
	}; 

	// Attach the event listeners
	window.addEventListener('keydown', onKeyDown);
	window.addEventListener('keyup', onKeyUp);

	// Clean up the listeners when the window is unloaded
	window.addEventListener('unload', () => {
		window.removeEventListener('keydown', onKeyDown);
		window.removeEventListener('keyup', onKeyUp);
	});

	// Helper to normalize key names (for cross-platform compatibility)
	function normalizeKey(e: KeyboardEvent) {
		// macOS uses 'Meta' for Command key, treat it as 'Control'
		if (e.key === 'Meta') return 'Control'; // macOS Command key normalization
		return e.key;
	}
};
