import mongoose, { Schema, models } from 'mongoose';

const mediaSchema = new Schema({
  backdrop_path: { type: String, default: '' },
  title: { type: String, default: '' },
  vote_average: { type: Number, default: 0 },
  genre_ids: { type: [Number], default: [] },
  id: { type: Number },
  name: { type: String, default: '' },
});

const listSchema = new Schema({
  tv: {
    type: [mediaSchema],
    default: [],
  },
  movies: {
    type: [mediaSchema],
    default: [],
  },
});

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    reset_token: {
      required: false,
      type: String,
      trim: true,
    },
    watchlist: {
      type: listSchema,
      default: {},
    },
    favorites: { type: listSchema, default: {} },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model('User', userSchema);

export default User;
