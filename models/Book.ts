import mongoose, { Document, Model, Schema } from 'mongoose';

export type BookStatus = 'want-to-read' | 'reading' | 'completed';

export interface IBook extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  author: string;
  tags: string[];
  status: BookStatus;
  createdAt: Date;
  updatedAt: Date;
}

const BookSchema = new Schema<IBook>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please provide a book title'],
      maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    author: {
      type: String,
      required: [true, 'Please provide an author name'],
      maxlength: [100, 'Author name cannot be more than 100 characters'],
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ['want-to-read', 'reading', 'completed'],
      default: 'want-to-read',
    },
  },
  {
    timestamps: true,
  }
);

BookSchema.index({ userId: 1, createdAt: -1 });

export default (mongoose.models.Book as Model<IBook>) || mongoose.model<IBook>('Book', BookSchema);
