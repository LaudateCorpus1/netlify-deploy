const { send } = require('micro')
const logger = require('../utils/logger')
const axios = require('axios')
const { NETLIFY_TOKEN } = process.env

const getStatus = async (req, res) => {
  const siteId = req.params.id
  try {
    const { data: status } = await axios.post(
      `https://api-dev.netlify-services.com/builder/build-status`,
      { siteId },
      {
        headers: {
          Authorization: `bearer ${NETLIFY_TOKEN}`
        }
      }
    )
    logger('info', 'Status Received', status)
    send(res, 200, {
      status
    })
  } catch (e) {
    logger('error', 'Could not get Status', e)
    send(res, 500, 'There was an error creating your deploy')
  }
}

module.exports = getStatus
