    // See http://mongoosejs.com/docs/models.html
    // for more of what you can do here.
    module.exports = function (app) {
        const modelName = 'employee';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   name: { type: String, unique: false, lowercase: false, default: '' },
       employeeId: { type: Schema.Types.ObjectId, ref: "users" },
       dob: { type: Date },
       gender: { type: String , enum: ["Male","Female"] },
       phone: { type: String, unique: false, lowercase: false, default: '' },
       email: { type: String, unique: false, lowercase: false, default: '' },
       address: { type: String, unique: false, lowercase: false, default: '' },
       employment: { type: String, unique: false, lowercase: false, default: '' },
       status: { type: Boolean, default: false },
       hire: { type: Boolean, default: true },
       date: { type: Date },
       terminationDate: { type: Date },
       department: { type: String, unique: false, lowercase: false, default: '' },
       managerSupervisor: { type: String, unique: false, lowercase: false, default: '' },
       salary: { type: Number },

            
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