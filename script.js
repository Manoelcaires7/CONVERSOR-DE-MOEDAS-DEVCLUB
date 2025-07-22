const convertButton = document.querySelector("#convert-button")
const currencySelect = document.querySelector(".currency-select")

const convertValues = async ()=> {
    const currencySelectUr = document.querySelector(".currency-select-ur").value; // Moeda de origem
    const inputCurrencyValue = document.querySelector(".input-currency").value; // Pega o valor inserido como string
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert");
    const currencyValueToConverted = document.querySelector(".currency-value");

    const moedas = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL").then( retorno => retorno.json())
    const dolar = moedas.USDBRL.high
    const euro = moedas.EURBRL.high
    const btc = moedas.BTCBRL.high
    console.log(moedas)


    // Exibe o valor da moeda de origem formatado
    currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(inputCurrencyValue);

    // Define as taxas de câmbio


    let convertedValue = 0;

    // Converte o valor baseado na moeda de origem
    if (currencySelectUr === 'dolar') {
        convertedValue = inputCurrencyValue * dolarToday; // Se for dólar, multiplica pela taxa de dólar
    } else if (currencySelectUr === 'euro') {
        convertedValue = inputCurrencyValue * euroToday; // Se for euro, multiplica pela taxa de euro
    } else if (currencySelectUr === 'libra') {
        convertedValue = inputCurrencyValue * libraToday; // Se for libra, multiplica pela taxa de libra
    } else if (currencySelectUr === 'btc') {
        convertedValue = inputCurrencyValue * btcToday; // Se for bitcoin, multiplica pela taxa de bitcoin
    } else {
        convertedValue = inputCurrencyValue; // Se for real, não precisa converter
    }

    // Agora convertemos para a moeda escolhida no segundo select
    if (currencySelect.value === 'dolar') {
        currencyValueToConverted.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(convertedValue / dolarToday); // Converte para dólar
    } else if (currencySelect.value === 'euro') {
        currencyValueToConverted.innerHTML = new Intl.NumberFormat('de-DE', {
            style: "currency",
            currency: "EUR"
        }).format(convertedValue / euroToday); // Converte para euro
    } else if (currencySelect.value === 'btc') {
        currencyValueToConverted.innerHTML = new Intl.NumberFormat('de-US', {
            style: "currency",
            currency: "BTC",
            minimumFractionDigits: 8,
            maximumFractionDigits: 8
        }).format(convertedValue / btcToday); // Converte para bitcoin
    }
}


function changeCurrency(){
const currencyName = document.getElementById('currency-name')
const currencyImage = document.querySelector('.currency-img')

if(currencySelect.value == 'dolar') {
    currencyName.innerHTML = 'dolar americano'
    currencyImage.src = './assets/eua.png'
}

if(currencySelect.value == 'euro') {
    currencyName.innerHTML = 'Euro'
    currencyImage.src = './assets/euro.png'
}

if(currencySelect.value == 'libra') {
    currencyName.innerHTML = 'Libra'
    currencyImage.src = './assets/libra 1.png'
}

if(currencySelect.value == 'btc') {
    currencyName.innerHTML = 'BTC'
    currencyImage.src = './assets/bitcoin 1.png'
}
convertValues()
}

currencySelect.addEventListener("change", changeCurrency)
convertButton.addEventListener("click", convertValues)