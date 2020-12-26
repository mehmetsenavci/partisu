module.exports = {
  fields: (queryObj) => {
    // FIELDS
    let fields = [];
    if (queryObj.fields !== undefined) {
      fields = queryObj.fields.split(',');
    } else {
      fields = '';
    }
    return fields;
  },
  filter: (queryObj) => {
    const filter = queryObj.where;
    return filter;
  },
  pagination: (queryObj) => {
    const offset = Number.isNaN(queryObj.limit * queryObj.page)
      ? undefined
      : queryObj.limit * queryObj.page;

    return { offset, limit: queryObj.limit };
  },
  sort: (queryObj) => {
    let sort = [];
    if (queryObj.sort !== undefined) {
      sort = queryObj.sort.split(',');
    } else {
      sort = 'createdAt';
    }
    return [sort];
  },
};
