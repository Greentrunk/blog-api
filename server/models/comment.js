import mongoose from 'mongoose';
import { DateTime } from 'luxon';

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
    {
        handle: String,
        text: String,
        timestamp: {type: Date, default: Date.now()},
        post: {type: Schema.Types.ObjectId, ref: 'post'}
    }
);

// Virtual for formatted timestamp
CommentSchema
.virtual('timestamp_formatted')
.get(() => DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS));

// Export module
export default mongoose.model('Comment', CommentSchema);