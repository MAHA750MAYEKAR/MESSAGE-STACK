export default function crudRepository(model) {
  return {
    create: async function (data) {
      const newUser = await model.create(data);

      return newUser;
    },
    findAll: async function () {
      const allDocs = await model.find();
      return allDocs;
    },

    findById: async function (id) {
      const doc = await model.findById(id);
      return doc;
    },
    getById: async function (id) {
      const doc = await model.findById(id);
      return doc;
    },
    deleteById: async function (id) {
      const response = await model.findByIdAndDelete(id);
      return response;
    },
    updateById: async function (id, data) {
      const updatedDoc = await model.findByIdAndUpdate(id, data, { new: true });
      return updatedDoc;
    },
    deleteMany: async function (modelIds) {
      //modelIds is array of ids
      const response = await model.deleteMany({
        _id: {
          //id should present in channel id array
          $in: modelIds
        }
      });
      return response;
    },
    delete: async function (id) {
      const response = await model.findByIdAndDelete(id);
      return response;
    },
    findOne: async function (data) {
      const response = await model.findOne(data);
      return response;
    }
  };
}
