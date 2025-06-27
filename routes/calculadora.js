var express = require("express");
var router = express.Router();

function calcularImc(peso, altura) {
  return (peso / (altura * altura)).toFixed(2);
}

function classificarImc(imc) {
  if (imc < 18.5) {
    return "Baixo peso";
  } else if (imc >= 18.5 && imc < 24.9) {
    return "Peso normal";
  } else if (imc >= 25 && imc < 29.9) {
    return "Sobrepeso";
  } else {
    return "Obesidade";
  }
}

function calcularImcCompleto(peso, altura) {
  const imc = calcularImc(peso, altura);
  const classificacao = classificarImc(imc);

  return {
    peso,
    altura,
    imc,
    classificacao,
  };
}

function calculadora(numero1, numero2, operacao) {
  let resultado = 0;
  switch (operacao) {
    case (operacao = "+"):
      resultado = numero1 + numero2;
      break;
    case (operacao = "-"):
      resultado = numero1 - numero2;
      break;
    case (operacao = "/"):
      resultado = numero1 / numero2;
      break;
    case (operacao = "*"):
      resultado = numero1 * numero2;
      break;
    default:
      resultado = "Operação não suportada";
      break;
  }

  return resultado;
}

router.post("/", function (req, res, next) {
  const { peso, altura, numero1, numero2, operacao } = req.body;
  const calculo = calculadora(numero1, numero2, operacao);
  const imc = calcularImcCompleto(peso, altura);
  res.json({
    imc,
    calculo,
  });
});

module.exports = router;
