import { Request, Response } from 'express';

export const mockHTTPRequest = {} as Request;

export const mockHTTPResponse = {
  send: jest.fn().mockReturnThis(),
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
} as unknown as Response;

export const mockNextFunction = jest.fn();
