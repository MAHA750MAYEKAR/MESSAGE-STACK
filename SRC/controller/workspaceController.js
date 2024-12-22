import {
  addMembersToWorkspaceService,
  updateWorkspaceService,
  workspaceService
} from '../service/workspaceService.js';
import { StatusCodes } from 'http-status-codes';
import { successResponse } from '../utils/common/succesResponse.js';
import { deleteWorkspaceService } from '../service/workspaceService.js';
import { getWorkspacesService } from '../service/workspaceService.js';
import { getWorkspaceByJoincodeService } from '../service/workspaceService.js';
import { addChannelToWorkspace } from '../service/workspaceService.js';

export const createworkspaceController = async (req, res) => {
  try {
    const datatype = { ...req.body, owner: req.user };
    if (!datatype.name) {
      return res.json({
        message: 'please add workspace name'
      });
    }

    const response = await workspaceService(datatype);

    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(response, 'workspace created successfully'));
  } catch (error) {
    console.log('workspace controller', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: 'false',
      data: {},
      message: error.message,
      error: error.errors
    });
  }
};

export const deleteWorkspaceController = async function (req, res) {
  try {
    const response = await deleteWorkspaceService(
      req.params.workspaceId,
      req.user
    );
    if (!response) {
      return res.json({
        message: 'no response at delete workspace'
      });
    }
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'workspace deleted successfully'));
  } catch (error) {
    console.log('workspace controller', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: 'false',
      data: {},
      message: error.message,
      error: error.errors
    });
  }
};
export const getWorkspacesController = async function (req, res) {
  try {
    const response = await getWorkspacesService(
      req.params.workspaceId,
      req.user
    );

    if (!response) {
      return res.json({
        message: 'no response at get workspace controller'
      });
    }
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Successfully fetched all workspaces'));
  } catch (error) {
    console.log('workspace controller', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: 'false',
      data: {},
      message: error.message,
      error: error.errors
    });
  }
};

export const getWorkspaceByJoincodeController = async function (req, res) {
  try {
    // console.log(req.params,"this is req.params");

    const joincode = req.params.joincode.trim();
    //console.log(joincode,"this is req.params");
    const response = await getWorkspaceByJoincodeService(joincode, req.user);
    if (!response) {
      return res.json({
        message: 'no response at get workspace controller'
      });
    }
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Successfully fetched workspaces'));
  } catch (error) {
    console.log('get workspace by joincode controller', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: 'false',
      data: {},
      message: error.message,
      error: error.errors
    });
  }
};

export const updateWorkspaceController = async function (req, res) {
  try {
    const response = await updateWorkspaceService(
      req.params.workspaceId,
      req.user,
      req.body
    );

    if (!response) {
      return res.json({
        message: 'no response at updating workspace controller'
      });
    }
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Successfully updated workspaces'));
  } catch (error) {
    console.log('err in updating workspace controller', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: 'false',
      data: {},
      message: error.message,
      error: error.errors
    });
  }
};

export const addMembersToWorkspaceController = async function (req, res) {
  try {
    const response = await addMembersToWorkspaceService(
      req.params.workspaceId,
      req.body.memberId,     
      req.body.role || 'member',
      req.user
    
    );
    
    if (!response) {
      return res.json({
        message: 'no response at adding members to workspace controller'
      });
    }
    return res
      .status(StatusCodes.OK)
      .json(
        successResponse(response, 'Successfully added members to  workspaces')
      );
  } catch (error) {
    console.log('err in adding members toworkspace controller', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: 'false',
      data: {},
      message: error.message,
      error: error.errors
    });
  }
};

export const addChannelToWorkspaceController = async function (req, res) {
  try {
    const response = await addChannelToWorkspace(
      req.params.workspaceId,
      req.body.channelname,
      req.user
    );
    console.log('name:', req.body.channelname);
    console.log('response', response);

    if (!response) {
      return res.json({
        message: 'no response at adding channel to workspace controller'
      });
    }
    return res
      .status(StatusCodes.OK)
      .json(
        successResponse(response, 'Successfully added channel to  workspaces')
      );
  } catch (error) {
    console.log('err in adding channel to workspace controller', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: 'false',
      data: {},
      message: error.message,
      error: error.errors
    });
  }
};
