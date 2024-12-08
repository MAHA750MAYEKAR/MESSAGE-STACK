import { workspaceRepository } from '../repositories/workspaceRepository.js';
import ClientErrors from '../utils/errors/clientErrors.js';
import userRepository from '../repositories/userRepository.js';

workspaceRepository;

export const isMemberPartOfWorkspaceService = async function (
  workspaceId,
  memberId
) {
  try {
    const workspace = await workspaceRepository.getById(workspaceId);
    const nameOfWorkspace = workspace.name;
    console.log('name os workspace', nameOfWorkspace);

    if (!workspace) {
      throw new ClientErrors({
        message: 'Workspace not found ',
        explanation: 'Invalid data',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const isUserAMember = workspace.members.find((member) => {
      //console.log("member.memberId:", member.memberId.toString(), "&& memberId:", memberId);

      return member.memberId.toString() === memberId;
    });

    if (!isUserAMember) {
      throw new ClientErrors({
        message: 'User is not a part of Workspace ',
        explanation: 'Invalid data',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const user = await userRepository.getById(memberId);

    return {
      user,
      nameOfWorkspace
    };
  } catch (error) {
    console.log('error in  is member part of service', error);
  }
};
