export interface Ward {
  name: string;
  code: number;
  divisionType: string;
  codename: string;
  districtCode: number;
}

export interface District {
  name: string;
  code: number;
  divisionType: string;
  codename: string;
  provinceCode: number;
  wards: Ward[];
}

export interface Province {
  name: string;
  code: number;
  divisionType: string;
  codename: string;
  phone_code: number;
  districts: District[];
}
