/*

    Copyright (C) 2012-2013 by Clearcode <http://clearcode.cc>
    and associates (see AUTHORS).

    This file is part of cc-message-service.

    cc-message-service is free software: you can redistribute it and/or modify
    it under the terms of the Lesser GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    cc-message-service is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with cc-message-service.  If not, see <http://www.gnu.org/licenses/>.

*/
(function(){
    'use strict';

    var Message = function($rootScope){
        this._places = {};
        this.$rootScope = $rootScope;
    }

    Message.$inject = ['$rootScope'];


    /**
     * Receive message
     * @param {String} place
     * @param {function(msg)} callback called when msg received
     * @param {Object} $scope required if live stream message receiving (emitting
     * and receiving on the same page)
     */
    Message.prototype.get = function(place, callback, $scope){
        // different route page
        if(Array.isArray(this._places[place])){
            this._places[place].forEach(function(msg){
                callback(msg);
            });

            this._places[place] = [];
        }

        // same route page
        if($scope){
            $scope.$on('event:message:' + place, function(){
                var msg = this._places[place].pop();
                callback(msg);
            }.bind(this));
        }
    }

    /**
     * Send message
     * @param {String} place
     * @param {String} msg
     * @param {String} type
     */
    Message.prototype.send = function(place, msg, type){
        if(!Array.isArray(this._places[place])){
            this._places[place] = [];
        }

        this._places[place].push({text: msg, type: type});
        this.$rootScope.$broadcast('event:message:' + place);
    }

    angular.module('cc.message.service').service('message', Message);
})();
