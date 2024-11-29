import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: [true, 'message body is required']
    },
    image: {
      type: String
    },

    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Channel',
      required: [true, 'channel ID is required']
    },
    senderID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Sender ID is required']
    },
    workspaceId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Workspace",
      required:[true,'workspace ID required']
    }
  },
  { timestamps: true }
);

export const Message=mongoose.model("Message",messageSchema)
