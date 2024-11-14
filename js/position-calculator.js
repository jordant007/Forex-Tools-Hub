document.addEventListener('DOMContentLoaded', function() {
    const calculateButton = document.getElementById('calculate-position');
    const positionSizeResult = document.getElementById('position-size-result');
    const riskAmountResult = document.getElementById('risk-amount');

    
    const exchangeRates = {
        'EUR/USD': 1.0950,
        'GBP/USD': 1.2650,
        'USD/JPY': 148.50,
        'USD/CHF': 0.8750,
        'AUD/USD': 0.6580
    };

    calculateButton.addEventListener('click', calculatePositionSize);

    function calculatePositionSize() {
        const accountBalance = parseFloat(document.getElementById('account-balance').value);
        const riskPercentage = parseFloat(document.getElementById('risk-percentage').value);
        const stopLoss = parseFloat(document.getElementById('stop-loss').value);
        const currencyPair = document.getElementById('currency-pair-position').value;

        if (!accountBalance || !riskPercentage || !stopLoss || !currencyPair) {
            alert('Please fill in all fields');
            return;
        }

        //  risk amount
        const riskAmount = accountBalance * (riskPercentage / 100);

        // Standard lot size
        const standardLot = 100000;

        // Calculate pip value based on currency pair type
        let pipValue;
        if (currencyPair.endsWith('JPY')) {
            pipValue = (0.01 * standardLot) / exchangeRates[currencyPair];
        } else {
            pipValue = (0.0001 * standardLot);
        }

        //  position size in lots
        const positionSize = (riskAmount / (stopLoss * pipValue)).toFixed(2);

        // results
        positionSizeResult.textContent = positionSize;
        riskAmountResult.textContent = `$${riskAmount.toFixed(2)}`;
        
        // Show result section
        document.getElementById('position-result').style.display = 'block';
    }

    // Form validation
    document.getElementById('risk-percentage').addEventListener('input', function(e) {
        const value = parseFloat(e.target.value);
        if (value < 0.1) {
            e.target.value = 0.1;
        } else if (value > 10) {
            e.target.value = 10;
        }
    });

    document.getElementById('stop-loss').addEventListener('input', function(e) {
        const value = parseFloat(e.target.value);
        if (value < 1) {
            e.target.value = 1;
        }
    });
});