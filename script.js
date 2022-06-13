// membuat variabel objek untuk menyimpan data dan kondisi
const calc = {
	displayNumbers: "0",
	operator: null,
	firstNumber: null,
	waitingForSecondNumber: false,
};

// fungsi untuk menampilkan angka pada display
function updateDisplay() {
	document.querySelector("#displayNumber").innerText = calc.displayNumbers;
}

// fungsi membersihkan layar pada kalkulator
function clearCalculator() {
	calc.displayNumbers = "0";
	calc.operator = null;
	calc.firstNumber = null;
	calc.waitingForSecondNumber = false;
}

// fungsi memasukkan angka kedalam displayNumber
function inputDigit(digit) {
	// kondisi yang akan menghilangkan angka 0 dan menggantinya dengan angka baru
	if (calc.displayNumbers === "0") {
		calc.displayNumbers = digit;
	} else {
		calc.displayNumbers += digit;
	}
}

// fungsi untuk mengaktifkan minus dan plus
function inverseNumber() {
	if (calc.displayNumbers === "0") {
		return;
	}
	calc.displayNumbers = calc.displayNumbers * -1;
}

// fungsi untuk menangani operator
function handleOperator(operator) {
	if (!calc.waitingForSecondNumber) {
		calc.operator = operator;
		calc.waitingForSecondNumber = true;
		calc.firstNumber = calc.displayNumbers;

		// mengatur ulang nilai display number supaya tombol selanjutnya dimulai dari angka pertama lagi
		calc.displayNumbers = "0";
	} else {
		alert("operator sudah ditetapkan");
	}
}
// fungsi untuk melakukan kalkulasi operasi matematik
function performCalculation() {
	if (calc.firstNumber == null || calc.operator == null) {
		alert("anda belum menetapkan operator");
		return;
	}
	let result = 0;
	if (calc.operator === "+") {
		result = parseInt(calc.firstNumber) + parseInt(calc.displayNumbers);
	} else {
		result = parseInt(calc.firstNumber) - parseInt(calc.displayNumbers);
	}
	// objek yang akan dikirimkan sebagai argumen fungsi putHistory
	const history = {
		firstNumber: calc.firstNumber,
		secondNumber: calc.displayNumbers,
		operator: calc.operator,
		result: result,
	};

	putHistory(history);
	calc.displayNumbers = result;
	renderHistory();
}

// fungsi untuk mengambil semua button , dan menambahkan event
const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
	button.addEventListener("click", function (event) {
		// mendapatkan objek elemen yang di klik
		const target = event.target;
		// fungsi untuk menghapus angka di kalkulator
		if (target.classList.contains("clear")) {
			clearCalculator();
			updateDisplay();
			return;
		}
		if (target.classList.contains("negative")) {
			inverseNumber();
			updateDisplay();
			return;
		}
		if (target.classList.contains("equals")) {
			performCalculation();
			updateDisplay();
			return;
		}
		if (target.classList.contains("operator")) {
			handleOperator(target.innerText);
			return;
		}
		inputDigit(target.innerText);
		updateDisplay();
	});
}
