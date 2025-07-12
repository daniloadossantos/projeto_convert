const input = document.querySelector("input")
const currency = document.querySelector("select")
const opt = document.querySelector("option")


const button = document.querySelector("button")

const footer = document.querySelector("footer")
const description = document.querySelector("#description")
const result = document.querySelector("#result")

currency.onchange = () => {
  if (currency.value != "") {
    console.log(currency)
    currency.style.background = `url("./img/check.svg") no-repeat`;
  }
}


button.addEventListener("click", (event) => {
  footer.setAttribute("class", "show-result")
  num = input.value
  conversion(num)
  event.preventDefault()
})

conversion = (num) => {
  let cotacao
  let res = num
  let coin = currency.value

  switch (coin) {
    case "USD":
      cotacao = 5.54
      res *= cotacao;
      description.textContent = `US$ 1 = R$ ${cotacao}`
      result.textContent = `R$ ${res.toFixed(2)}`;
      break;

    case "EUR":
      cotacao = 6.51
      res *= cotacao;
      description.textContent = `EUR 1 = R$ ${cotacao}`
      result.textContent = `R$ ${res.toFixed(2)}`;
      break;

    case "GBP":
      cotacao = 7.49
      res *= cotacao;
      description.textContent = `GPB 1 = R$ ${cotacao}`
      result.textContent = `R$ ${res.toFixed(2)}`;
      break;

    default:
      console.log("Erro no cálculo.")
      break;
  }
}
