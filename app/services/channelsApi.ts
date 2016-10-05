import { assign } from 'lodash';

export default function(app) {
  app.service('channelsApi', class ChannelApi {
    static $inject = ['$http', 'config', 'notificationService'];
    constructor(public $http, public config, public notificationService) {}

    getAll() {
      return this.$http.get(`${this.config.apiUrl}/channels`)
        .catch(this.notificationService.httpError('could not get channels'))
        .then(response => response.data.channels);
    }

    get(id) {
      return this.$http.get(`${this.config.apiUrl}/channels/${id}`)
        .catch(this.notificationService.httpError('could not get channel'))
        .then(response => response.data);
    }

    create(channel) {
      return this.$http.post(`${this.config.apiUrl}/channels`, channel)
        .catch(this.notificationService.httpError('could not create channel'))
        .then(response => response.data);
    }

    update(id, channel) {
      return this.$http.put(`${this.config.apiUrl}/channels/${id}`, channel)
        .catch(this.notificationService.httpError('could not update channel'))
        .then(response => response.data);
    }

    activate(id) {
      return this.$http.post(`${this.config.apiUrl}/channels/${id}/active`)
        .catch(this.notificationService.httpError('could not activate channel'))
    }

    deactivate(id) {
      return this.$http.delete(`${this.config.apiUrl}/channels/${id}/active`)
        .catch(this.notificationService.httpError('could not deactivate channel'))
    }
  });
}

/*
      $update(obj) {
        return $http({
          method: 'PUT',
          url: `${config.apiUrl}/channels/{this.id}`,
          data: obj,
        })
          .catch(httpError('could not update channel'))
          .then(response => {
            const channel = new Channel(response.data, this.collection);
            if (this.collection) {
              const index = this.collection.indexOf(this);
              if (index !== -1) this.collection[index] = channel;
            }
            return channel;
          });
      }

      $deactivate() {
        return $http({
          method: 'DELETE',
          url: `${config.apiUrl}/channels/{this.id}/active`,
        })
          .catch(httpError('could not deactivate channel'))
          .then(response => this.isActive = false);
      }

      $activate() {
        return $http({
          method: 'POST',
          url: `${config.apiUrl}/channels/{this.id}/active`,
        })
          .catch(httpError('could not activate channel'))
          .then(response => this.isActive = true);
      }
    }

    class Channels extends Array {
      constructor() {
        super();
      }

      create(obj) {
        return Channel.$create(obj, this).then(channel => this.push(channel));
      }

      static get(params) {
        return $http({
          method: 'GET',
          url: `${config.apiUrl}/channels`,
          params,
        }).then(response => Channels.from(response.data.channels.map(channel => new Channel(channel))));
      }
    }




    ['channelsApi', function(channelsApi) {
      const $ctrl = this;

      channelsApi.get().then(channels => $ctrl.channels = channels);
    }];

    `
    <channel ng-repeat="channel in $ctrl.channels" channel="channel"></channel>
    `

    {
      bindings: {channel: '<'},
      controller: function () {
        $ctrl = this;

        $ctrl.deactivate = {
          $ctrl.deactivating = true;
          $ctrl.channel.$deactivate().then(() => $ctrl.deactivating = false;
        }
      }
      template: `
      <div>
        {{$ctrl.channel.title}}
        <button ng-click="$ctrl.deactivate()">deactivate</button>
      </div>
      `
    }
  }]);
}
*/
