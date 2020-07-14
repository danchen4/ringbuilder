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
