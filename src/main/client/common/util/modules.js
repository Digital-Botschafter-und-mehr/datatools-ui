export const getFeed = (feeds, id) => {
  const feed = feeds.find(f => f.externalProperties.MTC.AgencyId === id)
  return feed
}

export const getFeedId = (feed) => {
  // console.log(feed)
  return feed.externalProperties.MTC.AgencyId
}

export const getAlertsUrl = () => {
  return DT_CONFIG.modules.alerts.use_extension === 'mtc' ? DT_CONFIG.extensions.mtc.rtd_api + '/ServiceAlert' : '/api/manager/secure/alerts'
}

export const getSignConfigUrl = () => {
  return DT_CONFIG.modules.sign_config.use_extension === 'mtc' ? DT_CONFIG.extensions.mtc.rtd_api + '/DisplayConfiguration' : '/api/manager/secure/displays'
}

export const getDisplaysUrl = () => {
  return DT_CONFIG.modules.sign_config.use_extension === 'mtc' ? DT_CONFIG.extensions.mtc.rtd_api + '/Display' : '/api/manager/secure/displays'
}
