import { RingDataFromDatabase, RingData } from '../types';

// data from firebase in following format:
// catalog: {
//   ER12876: {
//     accent_weight: 0.27
//     band_thickness: 1.5
//      ...
//   }
// }

export function ringDataToArray(catalog: RingDataFromDatabase[]): RingData[] {
  let ringCatalog = [];
  for (let product in catalog) {
    ringCatalog.push({
      sku: catalog[product].sku,
      name: catalog[product].name,
      description: catalog[product].description,
      price: catalog[product].price,
      center: catalog[product].center_shape,
      style: catalog[product].ring_style,
      accent: catalog[product].accent_weight,
      thickness: catalog[product].band_thickness,
      metals: catalog[product].metals.split(', '),
      gallery: [
        catalog[product].image_wg_1,
        catalog[product].image_wg_2,
        catalog[product].image_wg_3,
        catalog[product].image_yg_1,
        catalog[product].image_yg_2,
        catalog[product].image_yg_3,
        catalog[product].image_rg_1,
        catalog[product].image_rg_2,
        catalog[product].image_rg_3,
      ],
    });
  }
  return ringCatalog;
}
