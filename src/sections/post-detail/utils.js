export const GenAddress = (street, ward, district, province) => {
  return `${street ? street + ', ' : ''}${ward ? ward + ', ' : ''}${
    district ? district + ', ' : ''
  }${province}`;
};

export const GenCurrecy = (cost) => {
  return cost?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
};

export const GetUtility = (utility, utilities) => {
  for (let u of utilities) {
    if (utility == u?.id) return u;
  }
  return undefined;
};
