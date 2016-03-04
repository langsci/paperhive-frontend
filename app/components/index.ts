import avatar from './avatar';
import avatarList from './avatar-list';
import extensionButtons from './extension-buttons';
import comment from './comment';
import feedbackButton from './feedback-button';
import hiveButton from './hive-button';
import hivedDocs from './hived-docs';
import navbarSearch from './navbar-search';
import navbarUser from './navbar-user';
import settingsEmail from './settings-email';

export default function(app) {
  avatar(app);
  avatarList(app);
  extensionButtons(app);
  comment(app);
  feedbackButton(app);
  hiveButton(app);
  hivedDocs(app);
  navbarSearch(app);
  navbarUser(app);
  settingsEmail(app);
};
