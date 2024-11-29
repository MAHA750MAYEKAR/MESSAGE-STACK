import { Channel } from '../schema/channelSchema.js';
import crudRepository from './crudRepository.js';

const channelRepository = {
  ...crudRepository(Channel) //take all the key-value pairs (methods and properties) returned by the crudRepository function and include them in the userRepository object.
};

export default channelRepository;
