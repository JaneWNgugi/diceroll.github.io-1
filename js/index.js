document.addEventListener('DOMContentLoaded', function () {
    const balanceElement = document.querySelector('.balance');
    const numberButtons = document.querySelectorAll('.number-btn');
    const diceButtons = document.querySelectorAll('.dice-btn');
    const amountInput = document.getElementById('amount');
    const resultElement = document.querySelector('.result');
    const inputError = document.querySelector('.inputerror');
    const diceSelectionErrors = document.querySelector('.diceselectionerrors');
    const numberSelectionError = document.querySelector('.numberselectionerror');
    const placeBetButton = document.getElementById('placeBet');
    const dice1 = document.getElementById('dice1');
    const dice2 = document.getElementById('dice2');
    const dice3 = document.getElementById('dice3');

    let balance = 5000;
    let selectedNumber = null;

    // Hide all dice initially
    const diceElements = [dice1, dice2, dice3];
    diceElements.forEach(dice => dice.style.display = 'none');

    // number buttons
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            numberButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            selectedNumber = parseInt(button.getAttribute('data-number'));
        });
    });

    let selectedDice = null;

    // dice buttons
    diceButtons.forEach(button => {
        button.addEventListener('click', () => {
            diceButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            selectedDice = parseInt(button.getAttribute('data-number'));

            // Show the selected number of dice
            diceElements.forEach((dice, index) => {
                if (index < selectedDice) {
                    dice.style.display = 'block';
                } else {
                    dice.style.display = 'none';
                }
            });
        });
    });

    function rollDice(diceElement) {
        diceElement.style.transition = 'transform 3s';
        const outcome = Math.floor(Math.random() * 6) + 1;

        const additionalRotationX = Math.floor(Math.random() * 4) * 360;
        const additionalRotationY = Math.floor(Math.random() * 4) * 360;

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

        return outcome;
    }

    placeBetButton.addEventListener('click', () => {
        const betAmount = parseFloat(amountInput.value);
        
        // Reset errors
        diceSelectionErrors.textContent = '';
        numberSelectionError.textContent = '';
        inputError.textContent = '';
    
        if (!selectedDice) {
            diceSelectionErrors.textContent = `Please select the number of dice you want to roll.`;
            return;
        }
        if (!selectedNumber) {
            numberSelectionError.textContent = `Please select a number between 1 and 6.`;
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
        
        // Deduct the bet amount from the balance
        balance -= betAmount;
        balanceElement.textContent = `Balance: $${balance}`;
    
        const outcomes = [];
    
        for (let i = 0; i < selectedDice; i++) {
            outcomes.push(rollDice(diceElements[i]));
        }
    
        setTimeout(() => {
            const win = outcomes.some(outcome => outcome === selectedNumber);
            let payoutMultiplier = 0;
    
            if (selectedDice === 1) {
                payoutMultiplier = 2;
            } else if (selectedDice === 2) {
                payoutMultiplier = 3;
            } else if (selectedDice === 3) {
                payoutMultiplier = 4;
            }
    
            if (win) {
                balance += betAmount * payoutMultiplier;
                resultElement.textContent = `You won! Dice showed ${outcomes.join(', ')}.`;
            } else {
                resultElement.textContent = `You lost! Dice showed ${outcomes.join(', ')}.`;
            }
    
            balanceElement.textContent = `Balance: $${balance}`;
            amountInput.value = '';
            numberButtons.forEach(btn => btn.classList.remove('selected'));
            diceButtons.forEach(btn => btn.classList.remove('selected'));
            selectedNumber = null;
            selectedDice = null;
        }, 3000); // Duration of the roll animation
    });
});
