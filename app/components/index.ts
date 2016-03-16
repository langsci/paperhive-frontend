import avatar from './avatar';
import avatarList from './avatar-list';
import comment from './comment/index';
import discussionThreadView from './discussion-thread-view/index';
import extensionButtons from './extension-buttons/index';
import documentNew from './document-new/index';
import feedbackButton from './feedback-button';
import hiveButton from './hive-button';
import hivedDocs from './hived-docs';
import inlineEditable from './inline-editable';
import marginDiscussion from './margin-discussion';
import marginDiscussionDraft from './margin-discussion-draft';
import navbarSearch from './navbar-search';
import navbarUser from './navbar-user';
import newReply from './new-reply/index';
import passwordRequest from './passwordRequest';
import passwordReset from './passwordReset';
import searchResults from './search-results/index';
import settingsAccounts from './settings-accounts';
import settingsEmail from './settings-email';

export default function(app) {
  avatar(app);
  avatarList(app);
  comment(app);
  discussionThreadView(app);
  documentNew(app);
  extensionButtons(app);
  feedbackButton(app);
  hiveButton(app);
  hivedDocs(app);
  inlineEditable(app);
  marginDiscussion(app);
  marginDiscussionDraft(app);
  navbarSearch(app);
  navbarUser(app);
  newReply(app);
  passwordRequest(app);
  passwordReset(app);
  searchResults(app);
  settingsAccounts(app);
  settingsEmail(app);
};
