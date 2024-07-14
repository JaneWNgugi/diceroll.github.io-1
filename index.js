document.addEventListener('DOMContentLoaded', function () {
    // DOM elements
    const dice1Buttons = document.querySelectorAll('.number-btn-dice1');
    const dice2Buttons = document.querySelectorAll('.number-btn-dice2');
    const dice3Buttons = document.querySelectorAll('.number-btn-dice3');

    const labelElement = document.getElementById('label');
    const containerElement = document.querySelector('.container'); // Changed to querySelector for a single element
    const balanceElement = document.querySelector('.balance');
    // dice images
    const dice1 = document.getElementById('dice1');
    const dice2 = document.getElementById('dice2');
    const dice3 = document.getElementById('dice3');

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
    const matchesWonElement = document.querySelector('.matcheswon');

    // Initialize variables
    let balance = 5000;
    let selectedNumberDice1 = null;
    let selectedNumberDice2 = null;
    let selectedNumberDice3 = null;
    let selectedDice = null;
    
    let matchesWon = 0; // Initialize matches won counter

    // Hide dice elements initially
    const diceElements = [dice1, dice2, dice3];
    diceElements.forEach(dice => dice.style.display = 'none');

    // Hide prediction selection sections initially
    dicePredictionSelection.style.display = 'none';
    diceSection1.style.display = 'none';
    diceSection2.style.display = 'none';
    diceSection3.style.display = 'none';

    // Function to add event listeners to buttons
    function addNumberButtonListeners(buttons, setSelectedNumber) {
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove 'selected' class and reset background color for all buttons
                buttons.forEach(btn => {
                    btn.classList.remove('selected');
                    // btn.style.backgroundColor = 'blue'; 
                    dice1Buttons.forEach(btn => btn.style.backgroundColor = '');
                    dice2Buttons.forEach(btn => btn.style.backgroundColor = '');
                    dice3Buttons.forEach(btn => btn.style.backgroundColor = '');
                    // Reset background color
                });
    
                // Add 'selected' class and set background color for the clicked button
                button.classList.add('selected');
                button.style.backgroundColor = 'black';
                // dice1Buttons.forEach(btn => btn.style.backgroundColor = '');
                // dice2Buttons.forEach(btn => btn.style.backgroundColor = '');
                // dice3Buttons.forEach(btn => btn.style.backgroundColor = '');
                // Set selected number
                setSelectedNumber(parseInt(button.getAttribute('data-number')));
            });
        });
    }
    

    // Event listeners for number buttons
    addNumberButtonListeners(dice1Buttons, number => selectedNumberDice1 = number);
    addNumberButtonListeners(dice2Buttons, number => selectedNumberDice2 = number);
    addNumberButtonListeners(dice3Buttons, number => selectedNumberDice3 = number);

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

            // Display sections and update background color
            diceSection1.style.display = selectedDice >= 1 ? 'block' : 'none';
            diceSection2.style.display = selectedDice >= 2 ? 'block' : 'none';
            diceSection3.style.display = selectedDice >= 3 ? 'block' : 'none';
            dicePredictionSelection.style.display = 'block';

            // Update the background color based on selected number of dice
            switch (selectedDice) {
                case 1:
                    containerElement.style.backgroundColor = '#E5FFFA	'; // Example color for 1 dice
                    labelElement.style.color = 'black';
                    labelElement.style.fontWeight = '100';
                    // colors styles for dice 1 buttons sections
                    dice1Buttons.forEach(btn => btn.style.backgroundColor = 'blue');
                    dice1Buttons.selectedNumberDice1.forEach(btn => btn.style.backgroundColor = 'black');
                    // selectedNumberDice2.style.backgroundColor = 'black';
                    
                    addNumberButtonListeners.style.selectedNumberDice1.backgroundColor='black';
                    break;
                case 2:
                    labelElement.style.color = 'black';
                    labelElement.style.fontWeight = '100';
                    containerElement.style.backgroundColor = '#F0F4F4'; // Example color for 2 dice
                    // colors styles for dice 1 buttons sections
                    dice1Buttons.forEach(btn => btn.style.backgroundColor = 'blue');
                    // colors styles for dice 2 buttons sections
                    dice2Buttons.forEach(btn => btn.style.backgroundColor = 'red');
                    selectedNumberDice2.style.backgroundColor = 'black';
                    break;
                case 3:
                    labelElement.style.color = 'black';
                    labelElement.style.fontWeight = '100';
                    containerElement.style.backgroundColor = '#F0F5F4'; // Example color for 3 dice
                    // colors styles for dice 1 buttons sections
                    dice1Buttons.forEach(btn => btn.style.backgroundColor = 'blue');
                    // colors styles for dice 2 buttons sections
                    dice2Buttons.forEach(btn => btn.style.backgroundColor = 'red');
                    // colors styles for dice 3 buttons sections
                    dice3Buttons.forEach(btn => btn.style.backgroundColor = 'green');
                    
                   
                    break;
                default:
                    dice1Buttons.forEach(btn => btn.style.backgroundColor = 'blue');
                    // colors styles for dice 2 buttons sections
                    dice2Buttons.forEach(btn => btn.style.backgroundColor = 'red');
                    dice3Buttons.forEach(btn => btn.style.backgroundColor = 'green');
                    containerElement.style.backgroundColor = 'white'; // Default color
            }
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
        userSelectionNumbers.textContent = "";
        matchesWonElement.textContent = "";
        resultElement.textContent = "";
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
            // Collect user selections and outcomes
            const selectedNumbers = [selectedNumberDice1, selectedNumberDice2, selectedNumberDice3].slice(0, selectedDice);

            // Check if predictions match the outcomes exactly
            let exactMatches = 0;
            for (let i = 0; i < selectedDice; i++) {
                if (selectedNumbers[i] === outcomes[i]) {
                    exactMatches++;
                }
            }

            // Determine payout based on exact matches
            let payoutMultiplier = 0;
            if (exactMatches === 1) {
                payoutMultiplier = 2; // 1 exact match
                matchesWon=1;
            } else if (exactMatches === 2) {
                payoutMultiplier = 3; // 2 exact matches
               matchesWon=2;
            } else if (exactMatches === 3) {

                payoutMultiplier = 5; // 3 exact matches
                matchesWon=3;
               
            }

            if (payoutMultiplier > 0) {
                balance += betAmount * payoutMultiplier;
                resultElement.textContent = ` won! result:  ${outcomes.join(', ')}.`;
            } else {
                resultElement.textContent = ` lost! result: ${outcomes.join(', ')}.`;
            }

            balanceElement.textContent = `Balance: Ksh${balance}`;
            amountInput.value = '';
            
            dice1Buttons.forEach(btn => btn.classList.remove('selected'));
            dice2Buttons.forEach(btn => btn.classList.remove('selected'));
            dice3Buttons.forEach(btn => btn.classList.remove('selected'));
            diceButtons.forEach(btn => btn.classList.remove('selected'));

            // Display the user's selected numbers
            userSelectionNumbers.textContent = `You selected: ${selectedNumbers.join(', ')}`;
            matchesWonElement.textContent += ` Won: ${matchesWon}.`;
            dicePredictionSelection.style.display = 'none';

            // Reset selected numbers,matcheswon and dice
            selectedNumberDice1 = null;
            selectedNumberDice2 = null;
            selectedNumberDice3 = null;
            selectedDice = null;
            matchesWon=0;
        }, 3000);
    });
});
