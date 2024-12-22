import mongoose from 'mongoose';

const channelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'channel name is required']
    },
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Workspace',
      required:[true,'Workspace ID is required']
    }
  },
  { timestamps: true }
);

export const Channel = mongoose.model('Channel', channelSchema);
