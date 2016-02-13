'use strict';
import { clone } from 'lodash';
import { Observable } from 'rx';
import socketio from 'socket.io-client';
import url from 'url';

export default function(app) {
  app.factory('websocketService', ['config', function(config) {
    console.log(Observable);
    class WebsocketService {
      constructor(apiUrl) {
        // parse url for socketio
        this.parsedUrl = url.parse(config.apiUrl);
        this.path = this.parsedUrl.path + 'socket.io';
      }

      getNamespaceUrl(namespace) {
        const parsedUrl = clone(this.parsedUrl);
        parsedUrl.pathname = '/documents';
        return url.format(parsedUrl);
      }

      join(namespace, room) {
        return Observable.create((observable) => {
          // connect to socketio endpoint
          const socket = socketio.connect(
            this.getNamespaceUrl(namespace),
            {
              path: this.path,
              // TODO: remove for allowing fallback?
              transports: ['websocket'],
            }
          );

          socket.emit('join', {id: room});

          // TODO catch other events
          socket.on('newDiscussion', observable.onNext.bind(observable));

          socket.on('error', observable.onError.bind(observable));
          socket.on('reconnect_failed', observable.onError.bind(observable));
          // TODO check if the following errors are fatal
          // socket.on('reconnect_error', observable.onError.bind(observable));
          // socket.on('connect_error', observable.onError.bind(observable));

          return () => socket.close();
        });
      }

    }

    return new WebsocketService();

  }]);
};