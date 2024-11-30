import { workspaceRepository } from '../repositories/workspaceRepository.js';
import { v4 as uuidv4 } from 'uuid';

export const workspaceService = async function (workspaceObject) {
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

  const updatedWorkspace= await workspaceRepository.addChannelToWorkspace(workspace._id, 'general');
  return updatedWorkspace;
};
