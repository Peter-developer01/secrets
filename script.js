const saveKeyButton = document.querySelector("#save-key"),
	encryptButton = document.querySelector("#encrypt"),
	decryptButton = document.querySelector("#decrypt"),
	keyInput = document.querySelector("#key-area"),
	encryptArea = document.querySelector("#encrypt-area"),
	decryptArea = document.querySelector("#decrypt-area"),
	outputArea = document.querySelector("#output");

let key = "";
loadKey();

saveKeyButton.addEventListener("click", () => {
	saveKey();
});

encryptButton.addEventListener("click", () => {
	checkKey();
	const encrypted = encrypt(encryptArea.value);
	outputArea.value = encrypted;
});

decryptButton.addEventListener("click", () => {
	checkKey();
	const decrypted = decrypt(decryptArea.value);
	outputArea.value = decrypted;
});

function saveKey() {
	key = keyInput.value;
	localStorage.setItem("key", key);
}

function loadKey() {
	let localKey = localStorage.getItem("key");
	key = localKey || key;
	keyInput.value = key;
}

function checkKey() {
	if (key === "") {
		alert("Please enter a key");
	}
}

function encrypt(text) {
	return CryptoJS.AES.encrypt(text, key).toString();
}

function decrypt(text) {
	return CryptoJS.AES.decrypt(text, key).toString(CryptoJS.enc.Utf8);
}