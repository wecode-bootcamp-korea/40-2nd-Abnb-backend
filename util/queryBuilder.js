const queryBuilder = (queryList, productList) => {
  let queryClause;
  if (queryList.length === 1) {
    queryClause = queryOnlyOne(queryList[0]);
    queryClause += queryForRoomTypesOnly(queryList[0]);
    queryClause += queryForDateOnly(queryList[0]);
    queryClause += queryForPriceOnly(queryList[0]);
    if (productList) {
      for (const index in productList) {
        const query = productList[index];
        queryClause += ` AND NOT p.id = ${query}`;
      }
    }
    return queryClause;
  }

  for (const index in queryList) {
    const query = queryList[index];
    if (index === '0') {
      queryClause = queryOnlyOne(query);
      queryClause += queryForRoomTypesOnly(query);
      queryClause += queryForDateOnly(query);
      queryClause += queryForPriceOnly(query);
    } else {
      queryClause += nextQuery(query);
      queryClause += queryForRoomTypes(query);
      queryClause += queryForDate(query);
      queryClause += queryForPrice(query);
    }
  }
  if (productList) {
    for (const index in productList) {
      const query = productList[index];
      queryClause += ` AND NOT p.id = ${query}`;
    }
  }
  return queryClause;
};

const dateQueryBuilder = (dateList) => {
  let queryClause = '';
  for (const index in dateList) {
    const query = dateList[index];
    if (index === '0') {
      queryClause = queryForDateOnly(query);
    } else {
      queryClause += queryForDateOnly(query);
    }
  }
  return queryClause;
};

const queryOnlyOne = (query) => {
  switch (query[0]) {
    case 'category':
      return `c.name = "${query[1]}"`;
    case 'bedroom':
      return `p.bedroom = ${parseInt(query[1])}`;
    case 'bed':
      return `p.bed = ${parseInt(query[1])}`;
    case 'bathroom':
      return `p.bathroom = ${parseInt(query[1])}`;
    case 'max_guest':
      return `p.maximum_guest = ${parseInt(query[1])}`;
    case 'region':
      return `p.address LIKE '%${query[1]}%'`;
    case 'adult':
      return `p.maximum_guest >= ${query[1]}`;
    default:
      return '';
  }
};

const nextQuery = (query) => {
  switch (query[0]) {
    case 'category':
      return ` AND c.name = "${query[1]}"`;
    case 'bedroom':
      return ` AND p.bedroom = ${parseInt(query[1])}`;
    case 'bed':
      return ` AND p.bed = ${parseInt(query[1])}`;
    case 'bathroom':
      return ` AND p.bathroom = ${parseInt(query[1])}`;
    case 'region':
      return ` AND p.address LIKE '%${query[1]}%'`;
    case 'adult':
      return ` AND p.maximum_guest >= ${query[1]}`;
    default:
      return '';
  }
};

const queryForPrice = (query) => {
  switch (query[0]) {
    case 'min_price':
      return ` AND p.price BETWEEN ${parseInt(query[1])}`;
    case 'max_price':
      return ` AND p.price < ${parseInt(query[1])}`;
    default:
      return '';
  }
};

const queryForPriceOnly = (query) => {
  switch (query[0]) {
    case 'min_price':
      return `p.price BETWEEN ${parseInt(query[1])}`;
    case 'max_price':
      return ` AND ${parseInt(query[1])}`;
    default:
      return '';
  }
};

const queryForDateOnly = (query) => {
  switch (query[0]) {
    case 'checkIn':
      return `check_in_date >= '${query[1]}'`;
    case 'checkOut':
      return ` AND check_out_date <= '${query[1]}'`;
    default:
      return '';
  }
};

const queryForDate = (query) => {
  switch (query[0]) {
    case 'checkIn':
      return ` AND NOT b.check_out_date > DATE('${query[1]}')`;
    case 'checkOut':
      return ` AND NOT b.check_in_date < DATE('${query[1]}')`;
    default:
      return '';
  }
};

const queryForRoomTypesOnly = (query) => {
  switch (query[0]) {
    case 'private':
      return `r.name = "${query[0]}"`;
    case 'public':
      return `r.name = "${query[0]}"`;
    case 'guest':
      return `r.name = "${query[0]}"`;
    default:
      return '';
  }
};

const queryForRoomTypes = (query) => {
  switch (query[0]) {
    case 'private':
      return ` OR r.name = "${query[0]}"`;
    case 'public':
      return ` OR r.name = "${query[0]}"`;
    case 'guest':
      return ` OR r.name = "${query[0]}"`;
    default:
      return '';
  }
};

const createProductList = (queryList) => {
  let list = [];
  queryList.forEach((ele) => {
    if (!list.includes(ele.id)) {
      list.push(ele.id);
    }
  });
  return list;
};
module.exports = {
  queryBuilder,
  dateQueryBuilder,
  createProductList,
};
