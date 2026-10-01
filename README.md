# Calculadora de Consumo de Energia (React + Vite)

Conversão da calculadora em HTML/CSS/JS puro para React, seguindo a Aula 19.

## Como rodar
```
npm install
npm run dev
```

## Estrutura
- `src/App.jsx` – renderiza o componente principal
- `src/Components/EnergyCalc.jsx` – formulário, estados (`useState`), cálculo e resultado
- `src/Components/Button.jsx` – botão reutilizável
- `src/data.js` – faixas de classificação do consumo
- Fórmula: `consumo (kWh) = potência (W) × horas/dia × dias / 1000`
