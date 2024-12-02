import mongoose from 'mongoose';

const channelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'channel name is required']
    }
  },
  { timestamps: true }
);

export const Channel = mongoose.model('Channel', channelSchema);
