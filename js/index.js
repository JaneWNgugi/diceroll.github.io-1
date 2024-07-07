document.addEventListener('DOMContentLoaded', function () {
    const balanceElement = document.querySelector('.balance');
    const numberButtons = document.querySelectorAll('.number-btn');
    const amountInput = document.getElementById('amount');
    const resultElement = document.querySelector('.result');
    const inputError = document.querySelector('.inputerror');
    const numberSelectionError = document.querySelector('.numberselectionerror');
    const placeBetButton = document.getElementById('placeBet');
    const dice = document.getElementById('dice');

    let balance = 5000;
    let selectedNumber = null;
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            numberButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            selectedNumber = parseInt(button.getAttribute('data-number'));
        });
    });

    placeBetButton.addEventListener('click', () => {
        const betAmount = parseFloat(amountInput.value);

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

        // Animate the dice roll
        dice.style.transition = 'transform 3s';
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
        dice.style.transform = `rotateX(${rotateX + additionalRotationX}deg) rotateY(${rotateY + additionalRotationY}deg)`;

        setTimeout(() => {
            numberSelectionError.classList.remove();
            inputError.classList.remove();
            if (outcome === selectedNumber) {
                balance += betAmount * 2; // 5:1 payout for correct guess
                resultElement.textContent = `You won! Dice showed ${outcome}.`;
            } else {
                balance -= betAmount;
                resultElement.textContent = `Dice showed ${outcome}.`;
            }

            balanceElement.textContent = `Balance: $${balance}`;
            amountInput.value = '';
            numberButtons.forEach(btn => btn.classList.remove('selected'));
            selectedNumber = null;
        }, 3000); // Duration of the roll animation
    });
});
