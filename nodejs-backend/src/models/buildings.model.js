    // See http://mongoosejs.com/docs/models.html
    // for more of what you can do here.
    module.exports = function (app) {
        const modelName = 'buildings';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   buildingName: { type: String, unique: false, lowercase: false, default: '' },
       address: { type: String, unique: false, lowercase: false, default: '' },
       buidlingType: { type: String, unique: false, lowercase: false, default: '' },
       userid: { type: Schema.Types.ObjectId, ref: "users" },

            
          },
          {
            timestamps: true
        });
      
        // This is necessary to avoid model compilation errors in watch mode
        // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };