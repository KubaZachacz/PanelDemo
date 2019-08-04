import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
// import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar'
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar'
import { useTheme } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import eventColor from '@material-ui/core/colors/teal';
import { Typography, Button, ButtonGroup, Tooltip } from '@material-ui/core';
import { ChevronLeft, ChevronRight, HelpOutline } from '@material-ui/icons';

import moment from 'moment'
import 'moment/locale/pl'

import axios from 'axios';
import * as URL from 'assets/urls.js'
import { updateCalendar, setForm, updateForm } from 'store/actions/actions'

import TreatmentModal from 'components/Treatments/TreatmentModal/TreatmentModal'
import './sass/styles.scss';

moment.locale('pl');

const localizer = momentLocalizer(moment)

const useStyles = makeStyles(theme => ({
  tooltip: {
    backgroundColor: eventColor[900],
  },
  tooltipText: {
    fontSize: '1.2em'
  }
}));

const defaultView = 'month'

const toolbarLang = {
  TODAY: 'Dziś',
  MONTH: 'Miesiąc',
  WEEK: 'Tydzień',
  WORK_WEEK: 'Tydzień prac.',
  DAY: 'Dzień',
  AGENDA: 'agenda',
}

export const navigate = {
  PREVIOUS: 'PREV',
  NEXT: 'NEXT',
  TODAY: 'TODAY',
  DATE: 'DATE',
}

export const views = {
  MONTH: 'month',
  WEEK: 'week',
  WORK_WEEK: 'work_week',
  DAY: 'day',
  AGENDA: 'agenda',
}


class CustomToolbar extends React.Component {
  render() {
    let { localizer: { messages }, label } = this.props
    const helpIconStyle = { color: "#c7c7c7", marginRight: 8 }
    return (
      <>
        <div className="rbc-toolbar">
          <ButtonGroup color="primary" variant="contained">
            <Button onClick={this.navigate.bind(null, navigate.PREVIOUS)}><ChevronLeft /></Button>
            <Button onClick={this.navigate.bind(null, navigate.TODAY)}>{toolbarLang.TODAY}</Button>
            <Button onClick={this.navigate.bind(null, navigate.NEXT)}><ChevronRight /></Button>
          </ButtonGroup>
          <Typography color="primary" variant="h5" className="rbc-toolbar-label">{label}</Typography>
          <Tooltip title=
            {<>
              <Typography variant="subtitle2">Kliknij w wybrany zabieg, żeby go edytować.</Typography>
              <Typography variant="subtitle2">Kliknij i przeciągnij w miejscu wybranej daty by utworzyć nowy zabieg.</Typography>
            </>}
          >
          <HelpOutline size="small" style={helpIconStyle} />
          </Tooltip>
        <ButtonGroup color="primary" variant="contained">
          <Button onClick={this.view.bind(null, views.MONTH)}>{toolbarLang.MONTH}</Button>
          <Button onClick={this.view.bind(null, views.WEEK)}>{toolbarLang.WEEK}</Button>
          <Button onClick={this.view.bind(null, views.DAY)}>{toolbarLang.DAY}</Button>
        </ButtonGroup>
      </div>
      </>
    )
  }
  navigate = action => {
    this.props.onNavigate(action)
  }
  view = action => {
    this.props.onView(action)
  }
}

const getData = (URL) => {
  return new Promise(resolve => {
    axios.get(URL)
      .then(res => {
        if (res.data) {
          resolve(res.data)
        }
      })
      .catch(function (error) {
        console.log(error);
        resolve(null)
      });
  });
}

const Calendar = ({ events, updateCalendar, setTreatmentData, updateTreatmentData }) => {

  const classes = useStyles();
  // const [events, setEvents] = useState([]);
  const [officesMap, setOfficesMap] = useState([]);
  const [actualView, setActualView] = useState(defaultView);
  const [open, setOpen] = React.useState(false);

  const getOffices = async () => {
    const data = await getData(URL.treatments)
    if (data && data.offices) {
      setOfficesMap(data.offices)
    }
  }

  const theme = useTheme();

  useEffect(() => {
    getOffices();
  }, [])

  useEffect(() => {
    if (officesMap) updateCalendar();
  }, [officesMap])

  //treatment form stuff
  const handleClose = value => {
    setOpen(false);
  };

  const formSaveHandler = () => {
    updateCalendar();
  }

  // Fix na aktualną godzinę kalendarza, bo pokazywał ok 30 min za szybko 
  const setNow = () => {
    const dt = new Date();
    dt.setMinutes(dt.getMinutes() + 30);
    return dt
  }

  const viewChangeHandler = (view) => {
    setActualView(view)
  }

  const eventClickHandler = event => {
    const tempFormData = {
      ...event,
      WasTreatmentDone: event.IsTreatmentDone,
      WasTreatmentCanceled: event.IsTreatmentCancel,
    }
    setTreatmentData(tempFormData);
    setOpen(true);
  }

  const newEventHandler = (input) => {
    if (input.bounds) {
      const toSetValues = [{ field: 'TreatmentDate', value: input.start }]
      if (input.resourceId) toSetValues.push({ field: 'OfficeID', value: input.resourceId })
      setTreatmentData(null, toSetValues);
      setOpen(true);
    }
  }

  const eventStyle = (event, start, end, isSelected) => {
    const color = 800 - 100 * event.OfficeID;
    const colorValue = eventColor[color >= 400 ? color : 400];
    return {
      style: {
        backgroundColor: colorValue,
        border: 'none',
        zIndex: 999
      }
    }
  }

  const eventTootlip = (treatment, client, user, start, end) => (
    <>
      <Typography className={classes.tooltipText}>{start} - {end}</Typography>
      <Typography className={classes.tooltipText}>{treatment}</Typography>
      <Typography className={classes.tooltipText}>{client}</Typography>
      <Typography className={classes.tooltipText}>{' z ' + user}</Typography>
    </>
  )

  const CustomEvent = ({ event }) => {
    return (
      <Tooltip title={eventTootlip(event.TreatmentName, event.ClientName, event.WhoDoneTreatment, moment(event.TreatmentDate).format('HH:mm'), moment(event.EndDate).format('HH:mm'))} classes={{ tooltip: classes.tooltip }}>
        <span style={{ fontSize: '0.8em' }}>
          {event.TreatmentName + ': '} <em>{event.ClientName + ' z ' + event.WhoDoneTreatment}</em>
        </span>
      </Tooltip>
    )
  }


  return (
    <div className="Calendar" style={{ paddingBottom: '50px' }}>
      <BigCalendar
        localizer={localizer}
        defaultDate={new Date()}
        getNow={setNow}
        defaultView={defaultView}
        events={events}
        culture='pl'
        min={new Date('2000-01-01 07:00:00')}
        max={new Date('2000-01-01 23:00:00')}
        selectable
        onSelectSlot={newEventHandler}
        step={30}
        timeslots={1}
        onSelectEvent={eventClickHandler}
        titleAccessor='TreatmentName'
        startAccessor='TreatmentDate'
        endAccessor='EndDate'
        resourceAccessor='OfficeID'
        resources={actualView === 'day' ? officesMap : null}
        onView={viewChangeHandler}
        resourceIdAccessor="OfficeID"
        resourceTitleAccessor="OfficeName"
        components={{
          toolbar: CustomToolbar,
          event: CustomEvent,
        }}
        eventPropGetter={eventStyle}
        style={{ height: 600 }}
        messages={{
          showMore: total => `+${total} więcej`
        }}
      />
      <TreatmentModal open={open} isFromCalendar={true} onClose={handleClose} refreshOnSave={formSaveHandler} />
    </div>
  )
};
const mapStateToProps = state => {
  return {
    events: state.calendarEvents
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setTreatmentData: (data, toSetVals) => dispatch(setForm('treatmentForm', data, toSetVals)),
    updateTreatmentData: (field, value) => dispatch(updateForm('treatmentForm', field, value)),
    updateCalendar: () => dispatch(updateCalendar()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
