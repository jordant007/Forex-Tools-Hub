document.addEventListener('DOMContentLoaded', function() {
    const calculateButton = document.getElementById('calculate-pip');
    const pipValueDisplay = document.getElementById('pip-value');
    
    
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

        //  lot size
        const standardLot = 100000;
        
        //  pip value 
        let pipValue = 0;
        const lotValue = positionSize * standardLot;

        //  pip value based on currency pair type
        if (currencyPair.endsWith('JPY')) {
            // For JPY pairs, 1 pip = 0.01
            pipValue = (0.01 * lotValue) / exchangeRates[currencyPair];
        } else {
            // For other pairs, 1 pip = 0.0001
            pipValue = (0.0001 * lotValue);
        }
