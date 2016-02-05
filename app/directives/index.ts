import affix from './affix';
import attributes from './attributes';
import attribution from './attribution';
import comment from './comment';
import confirmedClick from './confirmed-click';
import elastic from './elastic';
import elementPosition from './elementPosition';
import elementSize from './elementSize';
import gravatar from './gravatar';
import gravatarList from './gravatarList';
import highlights from './highlights';
import marginDiscussion from './marginDiscussion';
import marginDiscussionDraft from './marginDiscussionDraft';
import inlineEditable from './inline-editable';
import kramjax from './kramjax';
import onOutside from './onOutside';
import onTextSelect from './onTextSelect';
import pdf from './pdf';
import subnav from './subnav';
import toc from './toc';
import validateArticleSource from './validateArticleSource';
import validateUsername from './validate-username';
import viewportHeight from './viewportHeight';

export default function(app) {
  affix(app);
  attributes(app);
  attribution(app);
  comment(app);
  confirmedClick(app);
  elastic(app);
  elementPosition(app);
  elementSize(app);
  gravatar(app);
  gravatarList(app);
  highlights(app);
  marginDiscussion(app);
  marginDiscussionDraft(app);
  inlineEditable(app);
  kramjax(app);
  onOutside(app);
  onTextSelect(app);
  pdf(app);
  subnav(app);
  toc(app);
  validateArticleSource(app);
  validateUsername(app);
  viewportHeight(app);
};
