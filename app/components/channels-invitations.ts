'use strict';
import template from './channels-invitations.html';

export default function(app) {
  app.component('channelsInvitations', {
    controller: class ChannelsInvitationsCtrl {
      static $inject = ['channelService'];
      constructor(public channelService) {}

      invitationConfirm(channelId, invitationId) {
        this.channelInviting = invitationId;
        this.channelService.invitationConfirm(channelId, invitationId)
          .finally(() => this.channelInviting = false);
      }

      invitationDelete(channelId, invitationId) {
        this.invitationDeleting = invitationId;
        this.channelService.invitationDelete(channelId, invitationId)
          .finally(() => this.invitationDeleting = false);
      }

    },
    template,
  });
};
