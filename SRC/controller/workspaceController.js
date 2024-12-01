import { workspaceService } from '../service/workspaceService.js';
import { StatusCodes } from 'http-status-codes';
import { successResponse } from '../utils/common/succesResponse.js';
import { deleteWorkspaceService } from '../service/workspaceService.js';
import mongoose from 'mongoose';

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
