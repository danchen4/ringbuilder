export function filterArrayObject(array: any[], filters: any) {
  const filterKeys = Object.keys(filters); // name of functions in filter object
  return array.filter((item) => {
    // validates all filter criteria
    return filterKeys.every((key) => {
      // ignores non-function predicates
      if (typeof filters[key] !== 'function') return true;
      return filters[key](item[key]);
    });
  });
}

/*

  item = { 
    shape: 'Round',
    color: 'H',
    ...
  }

  filters = {
    shape() {},
    color() {}
  }

  filterKeys = [shape, color]

  filters[shape](item[shape]) = shape('Round') { return true/false }


*/
