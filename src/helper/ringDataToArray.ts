export interface RingDataFromDatabase {
  sku: string;
  name: string;
  description: string;
  price: number;
  center_shape: string;
  ring_style: string;
  accent_weight: number;
  band_thickness: number;
  metals: string;
  image_wg_1: string;
  image_wg_2: string;
  image_wg_3: string;
  image_yg_1: string;
  image_yg_2: string;
  image_yg_3: string;
  image_rg_1: string;
  image_rg_2: string;
  image_rg_3: string;
}

export interface RingData {
  sku: string;
  name: string;
  description: string;
  price: number;
  center: string;
  style: string;
  accent: number;
  thickness: number;
  metals: string[];
  gallery: string[];
}

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
