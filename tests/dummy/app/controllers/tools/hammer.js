import Controller from '@ember/controller';

export default Controller.extend({
    breadCrumb: 'hammer',

    actions: {
      knock() {
        this.set('breadCrumb', 'sledgehammer');
      }
    }
});
