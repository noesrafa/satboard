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
  SYS: "Sueldos",
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
    label: "Sueldos y salarios",
    value: REGIMES.SYS,
  },
  {
    label: "Honorarios",
    value: REGIMES.HONORARIOS,
  },
];

const ISR_LIMITS = [
  {
    inferior_limit: 0.01,
    superior_limit: 746.04,
    fixed_fee: 0,
    percentage: 1.92,
  },
  {
    inferior_limit: 746.05,
    superior_limit: 6332.04,
    fixed_fee: 14.32,
    percentage: 6.4,
  },
  {
    inferior_limit: 6332.05,
    superior_limit: 11128.01,
    fixed_fee: 371.83,
    percentage: 10.88,
  },
  {
    inferior_limit: 11128.02,
    superior_limit: 12935.82,
    fixed_fee: 893.63,
    percentage: 16,
  },
  {
    inferior_limit: 12935.83,
    superior_limit: 15487.71,
    fixed_fee: 1182.88,
    percentage: 17.92,
  },
  {
    inferior_limit: 15487.72,
    superior_limit: 31236.49,
    fixed_fee: 1640.17,
    percentage: 21.36,
  },
  {
    inferior_limit: 31236.5,
    superior_limit: 49233.0,
    fixed_fee: 5004.11,
    percentage: 23.52,
  },
  {
    inferior_limit: 49233.01,
    superior_limit: 93993.9,
    fixed_fee: 9236.89,
    percentage: 30,
  },
  {
    inferior_limit: 93993.91,
    superior_limit: 125325.21,
    fixed_fee: 22665.15,
    percentage: 32,
  },
  {
    inferior_limit: 125325.22,
    superior_limit: 375975.62,
    fixed_fee: 32691.17,
    percentage: 34,
  },
  {
    inferior_limit: 375975.63,
    superior_limit: 9999999999,
    fixed_fee: 117912.3,
    percentage: 35,
  },
];

const SUBSIDY_INFO = {
  limit: 9081,
  daily_uma: 106.57,
  monthly_uma: 3300.53,
  fixed_fee: 11.82,
  total_subsidy: 390.12,
};
