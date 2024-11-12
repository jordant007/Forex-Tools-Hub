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

       