/**
 * MetaRole AI — Response Utilities
 * Standardized API response format
 */

/**
 * successResponse — Standard success envelope
 * @param {string} message
 * @param {object} data
 */
exports.successResponse = (message, data = {}) => ({
  success: true,
  message,
  data,
  timestamp: new Date().toISOString(),
});

/**
 * errorResponse — Standard error envelope
 * @param {string} message
 * @param {object} details
 */
exports.errorResponse = (message, details = {}) => ({
  success: false,
  message,
  details,
  timestamp: new Date().toISOString(),
});
