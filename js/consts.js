const OPTIONS_KEYS = {
  SALARIED_TYPE: "salaried_type",
  REGIME: "regime",
  PERIODICITY: "periodicity",
};

const SALARIED_TYPES = {
  BRUTO: "Sueldo bruto",
  NETO: "Sueldo neto",
};

const REGIMES = {
  SYS: "Sueldos y Salarios",
  HONORARIOS: "Honorarios",
};

const PERIODICITIES = {
  MENSUAL: "Mensual",
  QUINCENAL: "Quincenal",
  SEMANAL: "Semanal",
  DIA: "Día",
};

const periodicities_options = [
  {
    label: PERIODICITIES.MENSUAL,
    value: PERIODICITIES.MENSUAL,
  },
  {
    label: PERIODICITIES.QUINCENAL,
    value: PERIODICITIES.QUINCENAL,
  },
  {
    label: PERIODICITIES.SEMANAL,
    value: PERIODICITIES.SEMANAL,
  },
  {
    label: PERIODICITIES.DIA,
    value: PERIODICITIES.DIA,
  },
];
const regimes_options = [
  {
    label: REGIMES.SYS,
    value: REGIMES.SYS,
  },
  {
    label: REGIMES.HONORARIOS,
    value: REGIMES.HONORARIOS,
  },
];
