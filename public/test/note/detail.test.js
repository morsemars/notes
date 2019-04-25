'use strict';

describe('noteDetail', function() {
    let $componentController;
    let ctrl;
    let Note;
    /* let Session; */
    let note;

    beforeEach(() => {
        module('app');

        inject((_$componentController_, _Note_, _Session_, _$route_, _$q_, _$rootScope_) => {
            $componentController = _$componentController_;
            Note = _Note_;
            /* Session = _Session_;
            $route = _$route_;
            $q = _$q_;
            $rootScope = _$rootScope_; */
        });

        /* spyOn(Note, 'delete');
        spyOn(Session, 'current'); */

        note = new Note({
            id: 56,
            subject: 'some subject',
            body: 'some body',
        });

        ctrl = $componentController('noteDetail', {}, {
            note
        });
    });

    describe('$onInit', () => {
        it('should set display to notes', () => {
            console.log(ctrl);
            ctrl.$onInit();

            expect(ctrl.display).toEqual(note);
        });

    });
});
