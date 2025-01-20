import { Channel } from '../schema/channelSchema.js';
import crudRepository from './crudRepository.js';

const channelRepository = {
  ...crudRepository(Channel), //take all the key-value pairs (methods and properties) returned by the crudRepository function and include them in the userRepository object.
  getChannelWithWorkspaceDetails: async function (channelId) {
    const channel = await Channel.findById(channelId).populate(
      'workspaceId', // Field to populate
      'name' // Fields to select from the Workspace model (optional)
    );

   // console.log('channel in repo', channel);
    //console.log('channel.workspace id in repo', channel.workspaceId);

    return channel;
  }
};

export default channelRepository;
