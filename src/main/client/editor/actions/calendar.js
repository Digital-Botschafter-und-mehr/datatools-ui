import { secureFetch } from '../../common/util/util'
import { setActiveGtfsEntity } from './editor'

//// CALENDAR + SCHEDULE_EXCEPTION

export function requestingCalendars (feedId) {
  return {
    type: 'REQUESTING_CALENDARS',
    feedId
  }
}

export function receiveCalendars (feedId, calendars) {
  return {
    type: 'RECEIVE_CALENDARS',
    feedId,
    calendars
  }
}

export function fetchCalendars (feedId) {
  return function (dispatch, getState) {
    dispatch(requestingCalendars(feedId))
    const url = `/api/manager/secure/calendar?feedId=${feedId}`
    return secureFetch(url, getState())
      .then(res => res.json())
      .then(calendars => {
        dispatch(receiveCalendars(feedId, calendars))
        return calendars
      })
  }
}

export function savingCalendar (feedId, calendar) {
  return {
    type: 'SAVING_CALENDAR',
    feedId,
    calendar
  }
}

export function saveCalendar (feedId, calendar) {
  return function (dispatch, getState) {
    dispatch(savingCalendar(feedId, calendar))
    const method = calendar.id !== 'new' ? 'put' : 'post'
    const url = calendar.id !== 'new'
      ? `/api/manager/secure/calendar/${calendar.id}?feedId=${feedId}`
      : `/api/manager/secure/calendar?feedId=${feedId}`
    const data = {
      // datatools props
      feedId: calendar.feedId,
      description: calendar.description,

      // gtfs spec props
      gtfsServiceId: calendar.service_id,
      monday: calendar.monday === 1,
      tuesday: calendar.tuesday === 1,
      wednesday: calendar.wednesday === 1,
      thursday: calendar.thursday === 1,
      friday: calendar.friday === 1,
      saturday: calendar.saturday === 1,
      sunday: calendar.sunday === 1,
      startDate: calendar.start_date,
      endDate: calendar.end_date,
      id: calendar.id === 'new' ? null : calendar.id,
    }
    return secureFetch(url, getState(), method, data)
      .then(res => res.json())
      .then(c => {
        // dispatch(receiveCalendar(feedId, calendar))
        dispatch(fetchCalendars(feedId))
        .then(() => {
          if (calendar.id === 'new') {
            dispatch(setActiveGtfsEntity(feedId, 'calendar', c.id))
          }
          return c
        })
      })
  }
}

export function deletingCalendar (feedId, calendar) {
  return {
    type: 'DELETING_CALENDAR',
    feedId,
    calendar
  }
}

export function deleteCalendar (feedId, calendar) {
  return function (dispatch, getState) {
    dispatch(deletingCalendar(feedId, calendar))
    if (calendar.id === 'new') {
      return dispatch(fetchCalendars(feedId))
    }
    const url = `/api/manager/secure/calendar/${calendar.id}?feedId=${feedId}`
    return secureFetch(url, getState(), 'delete')
      .then(res => res.json())
      .then(calendar => {
        dispatch(fetchCalendars(feedId))
      })
  }
}

export function savingScheduleException (feedId, scheduleException) {
  return {
    type: 'SAVING_SCHEDULE_EXCEPTION',
    feedId,
    scheduleException
  }
}

export function receiveScheduleException (feedId, scheduleException) {
  return {
    type: 'RECEIVE_SCHEDULE_EXCEPTION',
    feedId,
    scheduleException
  }
}

export function saveScheduleException (feedId, scheduleException) {
  return function (dispatch, getState) {
    dispatch(savingScheduleException(feedId, scheduleException))
    const method = scheduleException.id !== 'new' ? 'put' : 'post'
    const url = scheduleException.id !== 'new'
      ? `/api/manager/secure/scheduleexception/${scheduleException.id}?feedId=${feedId}`
      : `/api/manager/secure/scheduleexception?feedId=${feedId}`
    const data = {
      // datatools props
      id: scheduleException.id === 'new' ? null : scheduleException.id,
      name: scheduleException.name,
      feedId: scheduleException.feedId,
      exemplar: scheduleException.exemplar,
      dates: scheduleException.dates,
      customSchedule: scheduleException.customSchedule,

      // gtfs spec props
      // gtfs_prop: scheduleException.gtfs_prop
    }
    return secureFetch(url, getState(), method, data)
      .then(res => res.json())
      .then(s => {
        // dispatch(receiveScheduleException(feedId, scheduleException))
        dispatch(fetchScheduleExceptions(feedId))
        .then(() => {
          if (scheduleexception.id === 'new') {
            dispatch(setActiveGtfsEntity(feedId, 'scheduleexception', s.id))
          }
          return s
        })
      })
  }
}

export function requestingScheduleExceptions (feedId) {
  return {
    type: 'REQUESTING_SCHEDULE_EXCEPTIONS',
    feedId
  }
}

export function receiveScheduleExceptions (feedId, scheduleExceptions) {
  return {
    type: 'RECEIVE_SCHEDULE_EXCEPTIONS',
    feedId,
    scheduleExceptions
  }
}

export function fetchScheduleExceptions (feedId) {
  return function (dispatch, getState) {
    dispatch(requestingScheduleExceptions(feedId))
    const url = `/api/manager/secure/scheduleexception?feedId=${feedId}`
    return secureFetch(url, getState())
      .then(res => res.json())
      .then(scheduleExceptions => {
        dispatch(receiveScheduleExceptions(feedId, scheduleExceptions))
        return scheduleExceptions
      })
  }
}

export function deletingScheduleException (feedId, scheduleException) {
  return {
    type: 'DELETING_SCHEDULE_EXCEPTION',
    feedId,
    scheduleException
  }
}

export function deleteScheduleException (feedId, scheduleException) {
  return function (dispatch, getState) {
    dispatch(deletingScheduleException(feedId, scheduleException))
    if (scheduleException.id === 'new') {
      return dispatch(fetchScheduleExceptions(feedId))
    }
    const url = `/api/manager/secure/scheduleexception/${scheduleException.id}?feedId=${feedId}`
    return secureFetch(url, getState(), 'delete')
      .then(res => res.json())
      .then(scheduleException => {
        dispatch(fetchScheduleExceptions(feedId))
      })
  }
}
