document.addEventListener('DOMContentLoaded', function() {
    const calculateButton = document.getElementById('calculate-pip');
    const pipValueDisplay = document.getElementById('pip-value');
    
    // Exchange rates
    const exchangeRates = {
        'EUR/USD': 1.0950,
        'GBP/USD': 1.2650,
        'USD/JPY': 148.50,
        'USD/CHF': 0.8750,
        'AUD/USD': 0.6580
    };

    calculateButton.addEventListener('click', calculatePipValue);

    function calculatePipValue() {
        const currencyPair = document.getElementById('currency-pair').value;
        const positionSize = parseFloat(document.getElementById('position-size').value);
        const accountCurrency = document.getElementById('account-currency').value;

        if (!currencyPair || !positionSize) {
            alert('Please fill in all fields');
            return;
        }

        // Standard lot size
        const standardLot = 100000;
        
        // pip value based on currency pair
        let pipValue = 0;
        const lotValue = positionSize * standardLot;

        // Calculate pip value based on currency pair type
        if (currencyPair.endsWith('JPY')) {
            // For JPY pairs, 1 pip = 0.01
            pipValue = (0.01 * lotValue) / exchangeRates[currencyPair];
        } else {
            // For other pairs, 1 pip = 0.0001
            pipValue = (0.0001 * lotValue);
        }

        // Convert to account
        if (accountCurrency !== 'USD') {
            // Would normally use real exchange rates here
            const conversionRates = {
                'EUR': 0.91,
                'GBP': 0.79
            };
            pipValue = pipValue * conversionRates[accountCurrency];
        }

        // result
        pipValueDisplay.textContent = `${accountCurrency} ${pipValue.toFixed(2)}`;
        
        // result section
        document.getElementById('pip-result').style.display = 'block';
    }

    // Form validation
    document.getElementById('position-size').addEventListener('input', function(e) {
        const value = parseFloat(e.target.value);
        if (value < 0.01) {
            e.target.value = 0.01;
        }
    });
});