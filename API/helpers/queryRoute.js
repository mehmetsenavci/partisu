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
      queryObj.sort.split(',').forEach((value) => {
        sort.push([value]);
      });
    } else {
      sort = ['createdAt'];
    }
    return sort;
  },
  fullQuery: function (queryObj) {
    const sort = this.sort(queryObj);
    const { offset, limit } = this.pagination(queryObj);
    const filter = this.filter(queryObj);
    const fields = this.fields(queryObj);

    return {
      where: filter,
      attributes: fields,
      limit: limit,
      offset: offset,
      order: sort,
    };
  },
};
