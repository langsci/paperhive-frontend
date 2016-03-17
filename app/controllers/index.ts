import document from './document';
import documentText from './documentText';
import authReturn from './authReturn';
import contact from './contact';
import discussionList from './discussionList';
import hivers from './hivers';
import meta from './meta';
import jobs from './jobs';
import navbar from './navbar';
import notifications from './notifications';
import passwordRequest from './passwordRequest';
import settings from './settings';
import subscribe from './subscribe';

export default function(app) {
  document(app);
  documentText(app);
  authReturn(app);
  contact(app);
  discussionList(app);
  hivers(app);
  meta(app);
  jobs(app);
  navbar(app);
  notifications(app);
  passwordRequest(app);
  settings(app);
  subscribe(app);
};
