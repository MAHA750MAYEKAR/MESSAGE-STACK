import { workspaceRepository } from '../repositories/workspaceRepository.js';
import { v4 as uuidv4 } from 'uuid';
import ClientErrors from '../utils/errors/clientErrors.js';
import { StatusCodes } from 'http-status-codes';
import { Workspace } from '../schema/workspaceSchema.js';
import channelRepository from '../repositories/channelRepository.js';
import mongoose from 'mongoose';

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
