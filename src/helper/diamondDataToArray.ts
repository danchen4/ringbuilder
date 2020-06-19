import { formatCurrency } from './formatCurrency'
import { costMarkup } from './costMarkup';
import { DIAMOND_COST_MARKUP } from '../constants'

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
  price: number,
}

export function diamondDataToTableArray(catalog: DiamondDataFromDatabase[]): DiamondTableData[] {
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
      price: costMarkup(catalog[product].cost, DIAMOND_COST_MARKUP),
    });
  }
  return diamondTable;
}

export function diamondDataToProductObj(catalog: DiamondDataFromDatabase[]): any {
  let diamondProductObj = {};
  for (let product in catalog) {
    diamondProductObj = {
      lab: { label: 'Lab', value: catalog[product].lab },
      certNumber: { label: 'Certificate Number', value: catalog[product].certNumber },
      shape: { label: 'Shape', value: catalog[product].shape },
      carats: { label: 'Carats', value: catalog[product].carats },
      color: { label: 'Color', value: catalog[product].color },
      clarity: { label: 'Clarity', value: catalog[product].clarity },
      cut: { label: 'Cut', value: catalog[product].cut },
      symmetry: { label: 'Symmetry', value: catalog[product].symmetry },
      polish: { label: 'Polish', value: catalog[product].polish },
      length: { label: 'Length', value: catalog[product].length + 'mm' },
      width: { label: 'Width', value: catalog[product].width + 'mm' },
      depth: { label: 'Depth', value: catalog[product].depth + 'mm' },
      tablePer: { label: 'Table %', value: (catalog[product].tableper * 100).toFixed(2) + '%' },
      depthPer: { label: 'Depth %', value: (catalog[product].depthper * 100).toFixed(2) + '%' },
      price: { label: 'Price', value: formatCurrency(costMarkup(catalog[product].cost, DIAMOND_COST_MARKUP)) },
    };
  }
  return diamondProductObj;
}
