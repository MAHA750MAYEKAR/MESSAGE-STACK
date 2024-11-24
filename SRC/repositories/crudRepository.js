export default function crudRepository(model) {
  return {
    create: async function (data) {
      console.log('data12', data);
      console.log('model', model);
      const newUser = await model.create(data);
      console.log('newUser12', newUser);
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
