document.addEventListener('DOMContentLoaded', function () {
    // DOM elements
    const balanceElement = document.querySelector('.balance');
    const dice1 = document.getElementById('dice1');
    const dice2 = document.getElementById('dice2');
    const dice3 = document.getElementById('dice3');
    const numberButtonsDice1 = document.querySelectorAll('.number-btn-dice1');
    const numberButtonsDice2 = document.querySelectorAll('.number-btn-dice2');
    const numberButtonsDice3 = document.querySelectorAll('.number-btn-dice3');
    const diceButtons = document.querySelectorAll('.dice-btn');
    const amountInput = document.getElementById('amount');
    const resultElement = document.querySelector('.result');
    const inputError = document.querySelector('.inputerror');
    const diceSelectionErrors = document.querySelector('.diceselectionerrors');
    const numberSelectionError1 = document.querySelector('.numberselectionerror1');
    const numberSelectionError2 = document.querySelector('.numberselectionerror2');
    const numberSelectionError3 = document.querySelector('.numberselectionerror3');
    const placeBetButton = document.getElementById('placeBet');
    const dicePredictionSelection = document.querySelector('.dicepredictionselection');
    const userSelectionNumbers = document.querySelector('.userselectionnumbers');
    const diceSection1 = document.querySelector('.dice1selection');
    const diceSection2 = document.querySelector('.dice2selection');
    const diceSection3 = document.querySelector('.dice3selection');

    // Initialize variables
    let balance = 5000;
    let selectedNumberDice1 = null;
    let selectedNumberDice2 = null;
    let selectedNumberDice3 = null;
    let selectedDice = null;

    // Hide dice elements initially
    const diceElements = [dice1, dice2, dice3];
    diceElements.forEach(dice => dice.style.display = 'none');

    // Hide prediction selection sections initially
    dicePredictionSelection.style.display = 'none';
    diceSection1.style.display = 'none';
    diceSection2.style.display = 'none';
    diceSection3.style.display = 'none';

    // Event listeners for number buttons
    numberButtonsDice1.forEach(button => {
        button.addEventListener('click', () => {
            numberButtonsDice1.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            selectedNumberDice1 = parseInt(button.getAttribute('data-number'));
        });
    });

    numberButtonsDice2.forEach(button => {
        button.addEventListener('click', () => {
            numberButtonsDice2.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            selectedNumberDice2 = parseInt(button.getAttribute('data-number'));
        });
    });

    numberButtonsDice3.forEach(button => {
        button.addEventListener('click', () => {
            numberButtonsDice3.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            selectedNumberDice3 = parseInt(button.getAttribute('data-number'));
        });
    });

    // Event listener for dice buttons
    diceButtons.forEach(button => {
        button.addEventListener('click', () => {
            diceButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            selectedDice = parseInt(button.getAttribute('data-number'));

            // Display relevant dice sections based on selected number of dice
            diceElements.forEach((dice, index) => {
                dice.style.display = index < selectedDice ? 'block' : 'none';
            });

            diceSection1.style.display = selectedDice >= 1 ? 'block' : 'none';
            diceSection2.style.display = selectedDice >= 2 ? 'block' : 'none';
            diceSection3.style.display = selectedDice >= 3 ? 'block' : 'none';
            dicePredictionSelection.style.display = 'block';
        });
    });

    // Function to roll the dice
    function rollDice(diceElement) {
        diceElement.style.transition = 'transform 3s';
        const outcome = Math.floor(Math.random() * 6) + 1;
        const additionalRotationX = Math.floor(Math.random() * 4) * 360;
        const additionalRotationY = Math.floor(Math.random() * 4) * 360;

        // Set rotation based on dice outcome
        let rotateX, rotateY;
        switch (outcome) {
            case 1: rotateX = 0; rotateY = 0; break;
            case 2: rotateX = -90; rotateY = 0; break;
            case 3: rotateX = 0; rotateY = -90; break;
            case 4: rotateX = 0; rotateY = 90; break;
            case 5: rotateX = 90; rotateY = 0; break;
            case 6: rotateX = 0; rotateY = 180; break;
        }

        diceElement.style.transform = `rotateX(${rotateX + additionalRotationX}deg) rotateY(${rotateY + additionalRotationY}deg)`;
        dicePredictionSelection.style.display = 'none';
        return outcome;
    }

    // Event listener for placing a bet
    placeBetButton.addEventListener('click', () => {
        const betAmount = parseFloat(amountInput.value);

        // Clear error messages
        diceSelectionErrors.textContent = '';
        numberSelectionError1.textContent = '';
        numberSelectionError2.textContent = '';
        numberSelectionError3.textContent = '';
        inputError.textContent = '';

        // Validate user inputs
        if (!selectedDice) {
            diceSelectionErrors.textContent = `Please select the number of dice you want to roll.`;
            return;
        }
        if (!selectedNumberDice1) {
            numberSelectionError1.textContent = `Select between 1 and 6 for Dice 1`;
            return;
        }
        if (!selectedNumberDice2 && selectedDice >= 2) {
            numberSelectionError2.textContent = `Select between 1 and 6 for Dice 2`;
            return;
        }
        if (!selectedNumberDice3 && selectedDice >= 3) {
            numberSelectionError3.textContent = `Select between 1 and 6 for Dice 3`;
            return;
        }
        if (isNaN(betAmount) || betAmount <= 0) {
            inputError.textContent = `Please enter a valid bet amount.`;
            return;
        }
        if (betAmount > balance) {
            inputError.textContent = `Insufficient balance!`;
            return;
        }

        // Deduct the bet amount from balance
        balance -= betAmount;
        balanceElement.textContent = `Balance: Ksh${balance}`;

        // Roll the dice and collect outcomes
        const outcomes = [];
        for (let i = 0; i < selectedDice; i++) {
            outcomes.push(rollDice(diceElements[i]));
        }

        // Evaluate bet result after dice roll
        setTimeout(() => {
            // Check if each dice outcome matches the user's prediction
            const winningOutcomes = [selectedNumberDice1, selectedNumberDice2, selectedNumberDice3]
                .slice(0, selectedDice)
                .every((num, index) => num === outcomes[index]);

            let payoutMultiplier = 0;

            // Determine payout based on number of dice and matching outcomes
            if (selectedDice === 1 && winningOutcomes) {
                payoutMultiplier = 2;
            } else if (selectedDice === 2 && winningOutcomes) {
                payoutMultiplier = 3;
            } else if (selectedDice === 3 && winningOutcomes) {
                payoutMultiplier = 5;
            }

            // Update balance and display result
            if (payoutMultiplier > 0) {
                balance += betAmount * payoutMultiplier;
                resultElement.textContent = `You won! Dice showed ${outcomes.join(', ')}.`;
            } else {
                resultElement.textContent = `You lost! Dice showed ${outcomes.join(', ')}.`;
            }

            balanceElement.textContent = `Balance: Ksh${balance}`;
            amountInput.value = '';
            numberButtonsDice1.forEach(btn => btn.classList.remove('selected'));
            numberButtonsDice2.forEach(btn => btn.classList.remove('selected'));
            numberButtonsDice3.forEach(btn => btn.classList.remove('selected'));
            diceButtons.forEach(btn => btn.classList.remove('selected'));

            // Display the user's selected numbers
            const selectedNumbers = [selectedNumberDice1, selectedNumberDice2, selectedNumberDice3]
                .filter(num => num !== null)
                .slice(0, selectedDice);
            userSelectionNumbers.textContent = `You selected: ${selectedNumbers.join(', ')}`;
            dicePredictionSelection.style.display = 'none';

            // Reset selected numbers and dice
            selectedNumberDice1 = null;
            selectedNumberDice2 = null;
            selectedNumberDice3 = null;
            selectedDice = null;
        }, 3000);
    });
});
