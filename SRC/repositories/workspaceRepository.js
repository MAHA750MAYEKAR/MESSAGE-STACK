import { Workspace } from '../schema/workspaceSchema.js';
import crudRepository from './crudRepository.js';
import ClientErrors from '../utils/errors/clientErrors.js';
import { StatusCodes } from 'http-status-codes';
import User from '../schema/userSchema.js';
import channelRepository from './channelRepository.js';

export const workspaceRepository = {
  ...crudRepository(Workspace),

  getWorkspaceByName: async function (workspaceName) {
    const workspace = await Workspace.findOne({
      name: workspaceName
    });

    if (!workspace) {
      throw new ClientErrors({
        Message: 'Workspace not found',
        explanation: 'Invalid data sent by the client',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    return workspace;
  },
  getWorkspaceByJoinCode: async function (joincode) {
    const workspace = await Workspace.findOne({
      joincode
    });
    if (!workspace) {
      throw new ClientErrors({
        message: 'Workspace not found',
        Explanation: 'invalid data sent by the client',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
  },
  addMembersToWorkspace: async function (workspaceId, memberId, role) {
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      throw new ClientErrors({
        message: 'workspace not found',
        explanation: 'Invalid data sent by the user',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const isUserValid = await User.findById(memberId);
    console.log('isUserValid', isUserValid);

    if (!isUserValid) {
      throw new ClientErrors({
        message: 'The user is invalid already',
        explanation: 'Invalid data sent by the user',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const isMemberAlreadyPartOfWorkspace = workspace.members.find(
      (member) => member.memberId == memberId
    );

    if (isMemberAlreadyPartOfWorkspace) {
      throw new ClientErrors({
        message: 'The user is already part of workspace',
        explanation: 'Invalid data sent by the user',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    workspace.members.push({
      memberId,
      role
    });

    await workspace.save();
    return workspace;
  },
  addChannelToWorkspace: async function (workspaceId, channelName) {
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      throw new ClientErrors({
        message: 'workspace not found',
        explanation: 'Invalid data sent by the user',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    const isChannelAlreadyPartOfWorkspace = workspace.channels.find(
      (channel) => channel.name === channelName
    );

    if (isChannelAlreadyPartOfWorkspace) {
      throw new ClientErrors({
        message: 'The channel is already part of workspace',
        explanation: 'Invalid data sent by the client',
        statusCode: StatusCodes.FORBIDDEN
      });
    }
    const channel = await channelRepository.create({ name: channelName });
    workspace.channels.push(channel);
    await workspace.save();
    return workspace;
  },
  fetchAllWorkspaceByMemberId: async function (memberId) {
    const workspaces = await Workspace.find({
      'members.memberId': memberId
    }).populate('members.memberId', 'username email avatar');

    return workspaces;
  }
};
