import mongoose from 'mongoose';
import { DateTime } from 'luxon';

const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        title: String,
        text: String,
        date: {type: Date, default: Date.now()},
        published: Boolean
    }
);

// URL virtual
PostSchema
.virtual('url')
.get(() => '/post/' + this._id);

// Virtual for formatted date
PostSchema
.virtual('date_formatted')
.get(() => DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATETIME_MED));

// Export Model
export default mongoose.model('Post', PostSchema);