import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AdminSchema = new Schema(
    {
        first_name: {type: String, required: true},
        last_name: {type: String, required: true},
        username: {type: String, required: true},
        password: {type: String, required: true}
    }
);

// Virtual for user's full name
AdminSchema
.virtual('name')
.get(function () {
  return this.first_name + ' ' + this.last_name;
});

// Export model
export default mongoose.model('Admin', AdminSchema);