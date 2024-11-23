export default function crudRepository(schema){
    return {
        model:schema,
        create:async function(data){
            const newUser=await this.model.create(data)
            return newUser

        },
        findAll:async function(data){
            const allDocs=await this.model.find()
            return allDocs
        },
        findById:async function(id){
            const doc=await this.model.findById(id)
            return doc
        },
        deleteById:async function(id){
            const response=await this.model.findByIdAndDelete(id)
            return response

        },
        updateById:async function (id,data){
            const updatedDoc=await this.model.findByIdAndUpdate(id,data,{new:true})
            return updatedDoc
        }

    }

}