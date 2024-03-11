    // See http://mongoosejs.com/docs/models.html
    // for more of what you can do here.
    module.exports = function (app) {
        const modelName = 'maintenanceRequests';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   buildingid: { type: Schema.Types.ObjectId, ref: "buildings" },
       userid: { type: Schema.Types.ObjectId, ref: "users" },
       description: { type: String, unique: false, lowercase: false, default: '' },
       category: { type: String, unique: false, lowercase: false, default: '' },
       priority: { type: String , enum: ["High","Medium","Low"] },
       status: { type: Boolean, default: false },
       reporteddate: { type: Date, default: '' },
       completeddate: { type: Date, default: '' },

            
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