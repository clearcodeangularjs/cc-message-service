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
'use strict';

describe('message service', function(){
    beforeEach(module('sandboxApp'));

    var message, $rootScope, catchedMsg, $scope;

    beforeEach(inject(function(_message_, _$rootScope_){
        message = _message_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        catchedMsg = false;
    }));

    describe('when on the same route page', function(){
        beforeEach(function(){
            message.get('p1', function(msg){
                catchedMsg = msg;
            }, $scope);
            message.send('p1', 'test msg', 'info');
        });

        it('catch messages through events', function(){
            expect(catchedMsg).toEqual({text: 'test msg', type: 'info'});
        });

        it('should remove message from buffor', function(){
            catchedMsg = false;
            message.get('p1', function(msg){
                catchedMsg = msg;
            }, $scope);
            expect(catchedMsg).toBe(false);
        });
    });

    describe('when on the different route page', function(){
        beforeEach(function(){
            spyOn($rootScope, '$broadcast'); // events can't be catched
            message.send('p1', 'test msg', 'info');
            message.get('p1', function(msg){
                catchedMsg = msg;
            });
        });

        it('catch messages through buffor', function(){
            expect(catchedMsg).toEqual({text: 'test msg', type: 'info'});
        });

        it('should clean the buffor', function(){
            catchedMsg = false;
            message.get('p1', function(msg){
                catchedMsg = msg;
            });
            expect(catchedMsg).toBe(false);
        });
    });
});
