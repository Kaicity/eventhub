import * as Yup from 'yup';

const EventSchema = Yup.object().shape({
  title: Yup.string().required('Please enter a title for the event.'),
  description: Yup.string(),
  locationTitle: Yup.string(),
  locationAddress: Yup.string(),
  imageUrl: Yup.string(),
  users: Yup.array().of(Yup.string()),
  author: Yup.string(),

  date: Yup.date().required('Please select a date.'),

  startAt: Yup.date().required('Please select a start time.'),

  endAt: Yup.date()
    .required('Please select an end time.')
    .min(Yup.ref('startAt'), 'End time must be later than start time'),
});

export default EventSchema;
