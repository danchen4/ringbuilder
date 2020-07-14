export interface DiamondDataFromDatabase {
  carats: number;
  certNumber: number;
  clarity: string;
  color: string;
  cost: number;
  cut: string;
  depth: number;
  depthper: number;
  flourescence: string;
  lab: string;
  length: number;
  polish: string;
  shape: string;
  symmetry: string;
  tableper: number;
  width: number;
}

export interface DiamondTableData {
  certNumber: number;
  shape: string;
  carats: string;
  color: string;
  clarity: string;
  cut: string;
  report: string;
  price: number;
}

export interface DiamondData {
  lab: { label: string; value: string };
  certNumber: { label: string; value: string };
  shape: { label: string; value: string };
  carats: { label: string; value: string };
  color: { label: string; value: string };
  clarity: { label: string; value: string };
  cut: { label: string; value: string };
  symmetry: { label: string; value: string };
  polish: { label: string; value: string };
  length: { label: string; value: string };
  width: { label: string; value: string };
  depth: { label: string; value: string };
  tablePer: { label: string; value: string };
  depthPer: { label: string; value: string };
  price: { label: string; value: string };
}
