import * as Yup from 'yup';

const EventSchema = Yup.object().shape({
  title: Yup.string().required('Please enter a title for the event.'),
  description: Yup.string().required('Please provide a description.'),
  location: Yup.object().shape({
    title: Yup.string(),
    address: Yup.string(),
  }),
  imageUrl: Yup.string(),
  users: Yup.array().of(Yup.string()),
  author: Yup.string(),
  startAt: Yup.number(),
  endAt: Yup.number(),
  date: Yup.number(),
});

export default EventSchema;
