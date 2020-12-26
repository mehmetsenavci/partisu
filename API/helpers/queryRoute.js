module.exports = {
  pagination: (model, queryObj) => {
    let offset = queryObj.limit * queryObj.page;
    if (Number.isNaN(offset)) offset = undefined;

    return model.findAll({
      limit: queryObj.limit,
      offset: offset,
    });
  },
  fields: (model, queryObj) => {
    if (queryObj.fields !== undefined) {
      const fields = queryObj.fields.split(',');
      console.log(fields);
      return model.findAll({ attributes: fields });
    } else {
      return model.findAll();
    }
  },
};
