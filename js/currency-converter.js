document.addEventListener('DOMContentLoaded', function() {
    const convertButton = document.getElementById('convert-currency');
    const swapButton = document.getElementById('swap-currencies');
    const convertedAmountDisplay = document.getElementById('converted-amount');
    const exchangeRateDisplay = document.getElementById('exchange-rate');

    // Exchange rates (would normally come from an API)
    const exchangeRates = {
        'USD': 1.0000,
        'EUR': 0.9150,
        'GBP': 0.7900,
        'JPY': 148.50,
        'CHF': 0.8750,
        'AUD': 0.6580
    };

    convertButton.addEventListener('click', convertCurrency);
    swapButton.addEventListener('click', swapCurrencies);

    function convertCurrency() {
        const amount = parseFloat(document.getElementById('from-amount').value);
        const fromCurrency = document.getElementById('from-currency').value;
        const toCurrency = document.getElementById('to-currency').value;

        if (!amount) {
            alert('Please enter an amount to convert');
            return;
        }

        // Calculate conversion rate
        const rate = calculateExchangeRate(fromCurrency, toCurrency);
        const convertedAmount = amount * rate;

        // Display results
        convertedAmountDisplay.textContent = `${toCurrency} ${convertedAmount.toFixed(2)}`;
        exchangeRateDisplay.textContent = `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;
        
        // Show result section
        document.getElementById('converter-result').style.display = 'block';
    }

    function calculateExchangeRate(fromCurrency, toCurrency) {
        // Convert to USD first (base currency), then to target currency
        const toUSD = 1 / exchangeRates[fromCurrency];
        const finalRate = toUSD * exchangeRates[toCurrency];
        return finalRate;
    }

    function swapCurrencies() {
        const fromCurrency = document.getElementById('from-currency');
        const toCurrency = document.getElementById('to-currency');
        
        // Swap selected values
        const temp = fromCurrency.value;
        fromCurrency.value = toCurrency.value;
        toCurrency.value = temp;
        
        // If there's already a conversion shown, update it
        if (document.getElementById('converter-result').style.display === 'block') {
            convertCurrency();
        }
    }

    // Form validation
    document.getElementById('from-amount').addEventListener('input', function(e) {
        const value = parseFloat(e.target.value);
        if (value < 0) {
            e.target.value = 0;
        }
    });

    // Initial conversion if URL parameters are present
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('amount') && urlParams.has('from') && urlParams.has('to')) {
        document.getElementById('from-amount').value = urlParams.get('amount');
        document.getElementById('from-currency').value = urlParams.get('from');
        document.getElementById('to-currency').value = urlParams.get('to');
        convertCurrency();
    }
});