import { formatCurrency} from './formatCurrency'

const DIAMOND_COST_MARKUP = 1.5;


export interface DiamondDataFromDatabase {
  carats: number,
  certNumber: number,
  clarity: string,
  color: string,
  cost: number,
  cut: string,
  depth: number,
  depthper: number,
  flourescence: string,
  lab: string,
  length: number,
  polish: string,
  shape: string,
  symmetry: string,
  tableper: number,
  width: number,
}

export interface DiamondTableData {
  certNumber: number,
  shape: string,
  carats: number,
  color: string,
  clarity: string,
  cut: string,
  report: string,
  price: string,
}


export function diamondDataToArray(catalog: DiamondDataFromDatabase[]): DiamondTableData[] {
  let diamondTable = [];
  for (let product in catalog) {
    diamondTable.push({
      certNumber: catalog[product].certNumber,
      shape: catalog[product].shape,
      carats: catalog[product].carats,
      color: catalog[product].color,
      clarity: catalog[product].clarity,
      cut: catalog[product].cut,
      report: catalog[product].lab,
      price: formatCurrency(Math.ceil((catalog[product].cost * DIAMOND_COST_MARKUP) / 10) * 10),
    });
  }
  return diamondTable;
}