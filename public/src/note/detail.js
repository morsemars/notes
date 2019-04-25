'use strict';

angular.module('app').component('noteDetail', {
    templateUrl: '/src/note/detail.html',
    bindings: {
        session: '<',
        note: '<',
        versions: '<'
    },
    controller: function() {
        this.$onInit = function() {
            this.display = this.note;
        };
    },
});
