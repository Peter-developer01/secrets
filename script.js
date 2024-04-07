const generateKeysButton = document.querySelector("#generate-keys"),
	saveKeysButton = document.querySelector("#save-keys"),
	updateSymbolsButton = document.querySelector("#update-symbols"),
	resetSymbolsButton = document.querySelector("#reset-to-default"),
	encryptButton = document.querySelector("#encrypt"),
	decryptButton = document.querySelector("#decrypt"),
	cipherArea = document.querySelector("#cipher-area"),
	symbolsArea = document.querySelector("#symbols"),
	encryptArea = document.querySelector("#encrypt-area"),
	decryptArea = document.querySelector("#decrypt-area"),
	outputArea = document.querySelector("#output");

const defaultSymbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 !@#$%^&*()_+-=[]{}|;':\",./<>?`~";

let symbols = defaultSymbols;

loadSymbols();

let keys = {};

loadKeys();

generateKeysButton.addEventListener("click", () => {
	const generatedKeys = generateKeys();
	keys = generatedKeys;
	cipherArea.value = JSON.stringify(keys);
	saveKeys();
});

saveKeysButton.addEventListener("click", () => {
	saveKeys();
});

encryptButton.addEventListener("click", () => {
	const encrypted = encrypt(encryptArea.value);
	outputArea.value = encrypted;
});

decryptButton.addEventListener("click", () => {
	const decrypted = decrypt(decryptArea.value);
	outputArea.value = decrypted;
});

updateSymbolsButton.addEventListener("click", updateSymbols);
resetSymbolsButton.addEventListener("click", resetSymbols);

function generateKeys() {
	let usedValues = [];
	let cipher = {
		encrypt: {},
		decrypt: {}
	};

	const allCharacters = symbols;

	for (let i = 0; i < allCharacters.length; i++) {
		let random = Math.floor(Math.random() * allCharacters.length);
		while (usedValues.includes(random)) {
			random = Math.floor(Math.random() * allCharacters.length);
		}

		cipher.encrypt[allCharacters[i]] = random;
		usedValues.push(random);

	}

	const decrypt = {};

	for (let key in cipher.encrypt) {
		decrypt[cipher.encrypt[key]] = key;
	}

	cipher.decrypt = decrypt;

	return cipher;
}

function saveKeys() {
	keys = JSON.parse(cipherArea.value);
	localStorage.setItem("keys", JSON.stringify(keys));
}

function loadKeys() {
	let localKeys = localStorage.getItem("keys");
	keys = JSON.parse(localKeys);
	cipherArea.value = localKeys;
}

function encrypt(text) {
	const cipher = keys.encrypt;
	let output = [];
	for (let i = 0; i < text.length; i++) {
		output.push(cipher[text[i]]?.toString() || text[i]);
	}
	
	return output.join("-");
}

function decrypt(text) {
	text = text.trim().replaceAll(" ", "-" + keys.encrypt[" "] + "-").split("-");
	const cipher = keys.decrypt;
	let output = "";
	for (let i = 0; i < text.length; i++) {
		output += cipher[text[i]] || text[i];
	}
	
	return output;
}

function loadSymbols() {
	const localSymbols = localStorage.getItem("symbols");
	symbolsArea.value = localSymbols || defaultSymbols;
	symbols = localSymbols || defaultSymbols;
}

function resetSymbols() {
	symbols = defaultSymbols;
	localStorage.setItem("symbols", symbols);
	symbolsArea.value = symbols;
	generateKeysButton.click();
}

function updateSymbols() {
	symbols = symbolsArea.value;
	localStorage.setItem("symbols", symbols);
	generateKeysButton.click();
}