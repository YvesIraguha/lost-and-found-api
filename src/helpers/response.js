/* eslint-disable no-underscore-dangle */
/**
 * Response function to send data on the client upon on request
 * @param response Response object as it is used in middleware or controller function
 * @param message Message to be sent to the client if it a successful request
 * @param data Data to be sent to the client if any requested
 * @param error Error to be sent to the client if the request fails
 * @param status Status to be sent to the client
 */

export default {
  success: (response, message, data, status = 200) => {
    if (Array.isArray(data)) return response.status(status).json(data);

    return response.status(status).json({
      message: response.__(message) || null,
      data
    });
  },
  error: (response, error, status = 400) => response.status(status).json({
    error: response.__(error)
  })
};
