/** Consistent API response helper across the whole backend. */
function success(res, data = null, message = 'OK', status = 200) {
  return res.status(status).json({ success: true, message, data });
}

function failure(res, message = 'Something went wrong', status = 500, code) {
  return res.status(status).json({ success: false, message, code });
}

module.exports = { success, failure };
