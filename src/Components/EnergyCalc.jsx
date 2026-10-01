import { useState } from "react";
import Button from "./Button";
import { data } from "../data";
import "./EnergyCalc.css";

const EnergyCalc = () => {
  // Estados dos campos do formulário
  const [power, setPower] = useState("");
  const [hours, setHours] = useState("");
  const [days, setDays] = useState("");

  // Estados do resultado
  const [consumption, setConsumption] = useState(null);
  const [classification, setClassification] = useState(null);
  const [error, setError] = useState("");

  // Mantém apenas dígitos e vírgula
  const validDigits = (text) => {
    return text.replace(/[^0-9,]/g, "");
  };

  const handlePowerChange = (e) => setPower(validDigits(e.target.value));
  const handleHoursChange = (e) => setHours(validDigits(e.target.value));
  const handleDaysChange = (e) => setDays(validDigits(e.target.value));

  // Converte "70,5" em 70.5
  const toNumber = (text) => Number(text.replace(",", "."));

  const clearForm = (e) => {
    e.preventDefault();
    setPower("");
    setHours("");
    setDays("");
    setConsumption(null);
    setClassification(null);
    setError("");
  };

  const calcEnergy = (e) => {
    e.preventDefault();

    setConsumption(null);
    setClassification(null);

    if (power === "" || hours === "" || days === "") {
      setError("Preencha todos os campos.");
      return;
    }

    const valuePower = toNumber(power);
    const valueHours = toNumber(hours);
    const valueDays = toNumber(days);

    if (
      Number.isNaN(valuePower) ||
      Number.isNaN(valueHours) ||
      Number.isNaN(valueDays) ||
      valuePower <= 0 ||
      valueHours <= 0 ||
      valueDays <= 0
    ) {
      setError("Digite valores maiores que zero.");
      return;
    }

    if (valueHours > 24) {
      setError("As horas de uso por dia não podem passar de 24.");
      return;
    }

    if (valueDays > 31) {
      setError("Os dias de uso no mês não podem passar de 31.");
      return;
    }

    // Consumo mensal em kWh
    const result = (valuePower * valueHours * valueDays) / 1000;

    setError("");
    setConsumption(result);
    setClassification(data.find((item) => result <= item.max));
  };

  return (
    <div id="calc-container">
      <h1>Calculadora de Consumo de Energia Elétrica</h1>
      <p className="descricao">
        Informe os dados do equipamento para calcular o consumo mensal.
      </p>

      <form id="energy-form">
        <div className="form-inputs">
          <div className="form-control">
            <label htmlFor="power">Potência do equipamento (W):</label>
            <input
              type="text"
              name="power"
              id="power"
              placeholder="Ex: 1000"
              onChange={handlePowerChange}
              value={power}
            />
          </div>

          <div className="form-control">
            <label htmlFor="hours">Horas de utilização por dia:</label>
            <input
              type="text"
              name="hours"
              id="hours"
              placeholder="Ex: 2"
              onChange={handleHoursChange}
              value={hours}
            />
          </div>

          <div className="form-control">
            <label htmlFor="days">Dias de utilização no mês:</label>
            <input
              type="text"
              name="days"
              id="days"
              placeholder="Ex: 30"
              onChange={handleDaysChange}
              value={days}
            />
          </div>
        </div>

        <div className="action-control">
          <Button id="calc-btn" text="Calcular" onClick={calcEnergy} type="submit" />
          <Button id="clear-btn" text="Limpar" onClick={clearForm} />
        </div>
      </form>

      {error && <div className="resultado muito-alto">{error}</div>}

      {consumption !== null && classification && (
        <div className={`resultado ${classification.infoclass}`}>
          Consumo mensal: {consumption.toFixed(2).replace(".", ",")} kWh
          <br />
          Classificação: {classification.info}
        </div>
      )}
    </div>
  );
};

export default EnergyCalc;
