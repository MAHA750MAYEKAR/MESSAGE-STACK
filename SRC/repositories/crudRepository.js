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
    deleteById: async function (id) {
      const response = await model.findByIdAndDelete(id);
      return response;
    },
    updateById: async function (id, data) {
      const updatedDoc = await model.findByIdAndUpdate(id, data, { new: true });
      return updatedDoc;
    }
  };
}
