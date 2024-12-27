import mongoose from 'mongoose';

const workspaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name of workspace is required'],
    unique: true
  },
  description: {
    type: String
  },
  members: [
    {
      memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      role: {
        type: String,
        enum: ['admin', 'member'],
        default: 'member'
      }
    }
  ],
  joinCode: {
    type: String,
    required: [true, 'join code is required']
  },
  channels: [
    {
      channelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel',
      },
      name: {
        type: String,
        required: true,
      },
    },
  ],
});

export const Workspace = mongoose.model('Workspace', workspaceSchema);
