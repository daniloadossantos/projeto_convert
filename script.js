//Cotações da moeda
const USD = 5.54
const EUR = 6.51
const GBR = 7.49


const amount = document.querySelector("#amount")
const input = document.querySelector("input")
const currency = document.querySelector("select")
const form = document.querySelector("form")

const opt = document.querySelector("option")
const radioButtons = document.querySelectorAll('input[name="iof"]')
const selectedRadio = document.querySelector('input[name="iof"]:checked')

const iofInput = document.querySelector("#iof-percentage")
const iofOpt = document.querySelector("#iof-select")
const button = document.querySelector("button")
const footer = document.querySelector("footer")
const description = document.querySelector("#description")
const iofDescr = document.querySelector("#iof-description")
const result = document.querySelector("#result")

//Para inserir bandeiras ao lado da moeda
currency.onchange = () => {
  switch (currency.value) {
    case "USD":
      currency.style.background = `url("./img/united-states-flag-icon.svg") no-repeat`;
      break;

    case "EUR":

      currency.style.background = `url("./img/europe-flag-icon.svg") no-repeat`;
      break;

    case "GBP":

      currency.style.background = `url("./img/united-kingdom-flag-icon.svg") no-repeat`;
      break;

    default:
      console.log("Erro no cálculo.")
      break;
    //currency.style.background = `url("./img/check.svg") no-repeat`;
  }
}

//Função ativada quando o formulário é enviado
form.onsubmit = (event) => {
  event.preventDefault()
  footer.setAttribute("class", "show-result")
  let num = parseFloat(input.value)
  let percent = parseFloat(iofInput.value).toFixed(2)
  console.log(num)
  console.log(percent)
  conversion(num, percent)
  emptyRule()
}

//Faz a conversão da moeda
conversion = (num, percent) => {
  let currencyNow
  let res = num
  let coin = currency.value
  let percents = percent / 100


  try {
    switch (coin) {
      case "USD":
        currencyNow = USD
        res *= currencyNow * (1 + percents);
        description.textContent = `US$ 1 = ${formatCurrencyBRL(currencyNow)}`
        result.textContent = `${formatCurrencyBRL(res)}`;
        iofDescr.textContent = ` (IOF: ${iofInput.value}%)`
        currency.style.background = `url("./img/united-states-flag-icon.svg") no-repeat`;
        break;

      case "EUR":
        currencyNow = EUR
        res *= currencyNow * (1 + percents);
        description.textContent = `€ 1 = ${formatCurrencyBRL(currencyNow)}`
        result.textContent = `${formatCurrencyBRL(res)}`;
        iofDescr.textContent = ` (IOF: ${iofInput.value}%)`
        currency.style.background = `url("./img/europe-flag-icon.svg") no-repeat`;
        break;

      case "GBP":
        currencyNow = GBR
        res *= currencyNow * (1 + percents);
        description.textContent = `£ 1 = ${formatCurrencyBRL(currencyNow)}`
        result.textContent = `${formatCurrencyBRL(res)}`;
        iofDescr.textContent = ` (IOF: ${iofInput.value}%)`
        currency.style.background = `url("./img/united-kingdom-flag-icon.svg") no-repeat`;
        break;
    }
  }
  catch {
    window.alert("Não foi possível concluir. Tente novamente.")
  }
}


emptyRule = () => {
  if (input.value <= 0) {
    input.classList.add("input-error");
    console.log("Empty")
  }

}

radioButtons.forEach(radio => {
  radio.addEventListener('change', function () {
    const selectedRadio = document.querySelector('input[name="iof"]:checked')
    if (selectedRadio) {
      const value = selectedRadio.value;
      console.log("Opção selecionada:", value);

      if (value === "Yes") {
        iofInput.removeAttribute("hidden")
        iofDescr.removeAttribute("hidden")
        iofInput.setAttribute("required", true);


      } else {
        iofInput.setAttribute("hidden", true);
        iofInput.value = 0
        iofDescr.setAttribute("hidden", true);

      }
    }
    conversion(parseFloat(input.value))
  });
})

amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g
  amount.value = amount.value.replace(hasCharactersRegex, "")
})

//Formato na moeda Real Brasileiro
function formatCurrencyBRL(value) {
  //Transforma em número para formatar em R$ x.xxx,xx
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}
