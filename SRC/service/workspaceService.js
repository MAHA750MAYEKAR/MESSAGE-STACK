import { workspaceRepository } from '../repositories/workspaceRepository.js';
import { v4 as uuidv4 } from 'uuid';
import ClientErrors from '../utils/errors/clientErrors.js';
import { StatusCodes } from 'http-status-codes';
import { Workspace } from '../schema/workspaceSchema.js';
import channelRepository from '../repositories/channelRepository.js';
import userRepository from '../repositories/userRepository.js';
import { addEmailToMailQueue } from '../producer/mailQueueProducer.js';
import { mailObject } from '../utils/common/mailObject.js';

export const workspaceService = async function (workspaceObject) {
  try {
    const joinCode = uuidv4().substring(0, 6).toUpperCase();

    const workspace = await workspaceRepository.create({
      name: workspaceObject.name,
      description: workspaceObject.description,
      joinCode
    });

    await workspaceRepository.addMembersToWorkspace(
      workspace._id,
      workspaceObject.owner,
      'admin'
    );

    const updatedWorkspace = await workspaceRepository.addChannelToWorkspace(
      workspace._id,
      'general'
    );
    return updatedWorkspace;
  } catch (error) {
    console.log('workspace service error', error);
  }
};

export const getAllUserPartOfWorkspaceService = async function (userId) {
  try {
    const response =
      await workspaceRepository.fetchAllWorkspaceByMemberId(userId);
    return response;
  } catch (error) {
    console.log('get all user part of workspace error', error);
    throw error;
  }
};

export const deleteWorkspaceService = async function (workspaceId, userId) {
  try {
    const workspace = await workspaceRepository.getById(workspaceId); //find is this workspace exist
    if (!workspace) {
      throw new ClientErrors({
        message: 'The workspace is not found',
        explanation: 'Invalid data',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    //now checking if user trying to delete this workspace is part of workspace and is admin only thn WS can b deleted
    const isAllowed = workspace.members.find(
      (member) =>
        member.memberId.toString() === userId && member.role === 'admin'
    );
    if (isAllowed) {
      await channelRepository.deleteMany(workspace.channels);

      const response = await workspaceRepository.delete(workspaceId);
      return response;
    }
    throw new ClientErrors({
      message: 'The user is not admin or part of the workpace',
      explanation: 'The user is not allowed to delete the Workspace',
      statusCode: StatusCodes.UNAUTHORIZED
    });
  } catch (error) {
    console.log('deleting workspace');
    throw new Error(error);
  }
};

export const getWorkspacesService = async function (workspaceId, userId) {
  //user should have access to workspace he is part of
  try {
    const workspace = await workspaceRepository.getById(workspaceId);
    if (!workspace) {
      throw new ClientErrors({
        message: 'Workspace not found ',
        explanation: 'Invalid data',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const isUserPartOfWorkspace = workspace.members.find(
      (member) => member.memberId.toString() === userId
    );

    if (isUserPartOfWorkspace) {
      const response = await workspaceRepository.findAll(workspaceId);

      return response;
    }
    throw new ClientErrors({
      message: 'The user is not  part of the workpace',
      explanation: 'cannot fetch data',
      statusCode: StatusCodes.UNAUTHORIZED
    });
  } catch (error) {
    console.log('get workspace===>');
    throw new Error(error);
  }
};

export const getWorkspaceByJoincodeService = async function (joincode, userId) {
  try {
    const workspace =
      await workspaceRepository.getWorkspaceByJoinCode(joincode);

    if (!workspace) {
      throw new ClientErrors({
        message: 'Workspace not found ',
        explanation: 'Invalid data',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    const isUserPartOfWorkspace = workspace.members.find((member) => {
      return (
        member.memberId.toString() === userId ||
        member.memberId._id.toString() === userId
      );
    });

    if (!isUserPartOfWorkspace) {
      throw new ClientErrors({
        message: 'user is not member of workspace',
        explanation: 'user is not member of workspace ',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    return workspace;
  } catch (error) {
    console.log('get workspace by join code===>', error);
    throw error;
  }
};

export const updateWorkspaceService = async function (
  workspaceId,
  userId,
  updateObject
) {
  try {
    const workspace =
      await workspaceRepository.getWorkspaceDetailsById(workspaceId);
    console.log('at workspace service', workspace);

    if (!workspace) {
      throw new ClientErrors({
        message: 'Workspace not found ',
        explanation: 'Invalid data',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    const isUserPartOfWorkspace = workspace.members.find((member) => {
      return (
        member.memberId.toString() === userId ||
        (member.memberId._id.toString() === userId && member.role === 'admin')
      );
    });
    if (!isUserPartOfWorkspace) {
      throw new ClientErrors({
        message: 'User is not authorized to update this workspace',
        explanation: 'Only admin members can perform updates',
        statusCode: StatusCodes.FORBIDDEN // Better suited for permission issues
      });
    }
    const updatedWorkspace = await workspaceRepository.updateById(
      workspaceId,
      updateObject
    );
    console.log(updatedWorkspace, 'updated workspace at service');

    return updatedWorkspace;
  } catch (error) {
    console.log('Error in updating workspace:', error.message);
    throw error; // Rethrow error to handle it upstream
  }
}; // Ensure the catch block is properly closed

export const addMembersToWorkspaceService = async function (
  workspaceId,
  userId,
  role
) {
  try {
    const workspace = await workspaceRepository.getById(workspaceId);
    if (!workspace) {
      throw new ClientErrors({
        message: 'Workspace not found ',
        explanation: 'Invalid data',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    //checking is person ur adding whose id exist or not
    const isValidUser = await userRepository.getById(userId);
    if (!isValidUser) {
      throw new ClientErrors({
        explanation: 'Invalid data sent from the client',
        message: 'User not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    // Add the member to the workspace
    const response = await workspaceRepository.addMembersToWorkspace(
      workspaceId,
      userId,
      role
    );
    addEmailToMailQueue({
      ...mailObject(workspace),
      to: 'mayekardiksha750@gmail.com'
    }); //to:"isValidUser.email"
    return response;
  } catch (error) {
    console.log('error in adding members workspace');
    throw new Error(error);
  }
};

export const addChannelToWorkspace = async function (
  workspaceId,
  channelName,
  userId
) {
  try {
    //console.log("workspaceis:",workspaceId);

    const workspace =
      await workspaceRepository.getWorkspaceDetailsById(workspaceId);
    if (!workspace) {
      throw new ClientErrors({
        explanation: 'Invalid data sent from the client',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    //only admin can add members
    const isUserAdmin = workspace.members.find((member) => {
      //console.log(member.memberId._id.toString(),"AND",userId.toString());

      return (
        member.memberId._id.toString() === userId.toString() &&
        member.role === 'admin'
      );
    });
    if (!isUserAdmin) {
      throw new ClientErrors({
        message: 'Permission denied',
        explanation: 'Only admins can add channels to the workspace',
        statusCode: StatusCodes.FORBIDDEN
      });
    }

    /* const isChannelAlreadyPartOfWorkspace = (workspace, channelName) => {
      return workspace.channels.find(
        (channel) =>{ 
          console.log(channel.name.toUpperCase(),"AND",channelName.toUpperCase());
          
          return channel.name.toUpperCase() === channelName.toUpperCase()}
      );
    };*/
    const isChannelAlreadyPartOfWorkspace = workspace.channels.find(
      (channel) => channel.name === channelName
    );
    if (isChannelAlreadyPartOfWorkspace) {
      throw new ClientErrors({
        message: 'this channel is already part of this workspace  ',
        explanation: 'Invalid data',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    const response = await workspaceRepository.addChannelToWorkspace(
      workspaceId,
      channelName
    );
    return response;
  } catch (error) {
    console.log('error in adding channel workspace');
    throw new Error(error);
  }
};
