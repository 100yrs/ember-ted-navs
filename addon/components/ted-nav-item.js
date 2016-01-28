import Ember from 'ember';
import layout from '../templates/components/ted-nav-item';

const { capitalize } = Ember.String;
const { computed } = Ember;

const TedNavItem = Ember.Component.extend({
  layout,
  classNames: ['Ted-nav-item'],

  route: computed('params.[]', function() {
    let len = this.get('params.length');

    return this.get('params')[len - 1];
  }),

  /* Private */
  resolution: Ember.inject.service(),
  tagName: 'li',
  classNameBindings: [
    ':Ted-app-nav-item',
    'isActive:active'
    // 'isActive:Ted-app-nav-item--is-active',
    // 'isBecomingActive:Ted-app-nav-item--is-becoming-active'
  ],

  appNav: null,

  // currentRoute: computed.readOnly('appNav.currentRoute'),
  // nextRoute: computed.readOnly('appNav.nextRoute'),

  // isActive: computed('appNav.activeNavItem', 'appNav.emberRouter', function() {
  //   return this.get('appNav.activeNavItem') === this;
  // }),
  currentRouteName: computed.readOnly('appNav.emberRouter.currentRouteName'),
  isActive: computed('currentRouteName', function() {
    if (!this.get('currentRouteName')) {
      return;
    }

    return this.get('currentRouteName').split('.').indexOf(this.get('route')) > -1
  }),

  isNotActive: computed.not('isActive'),

  width: computed('resolution.width', function() {
    this.get('resolution');
    return this.$().width();
  }),

  offset: computed('resolution.width', function() {
    this.get('resolution');
    return this.$().offset().left;
  }),

  // isBecomingActive: computed('route', 'nextRoute', 'isNotActive', function() {
  //   return this.get('isNotActive') && (this.get('route') === this.get('nextRoute'));
  // }),

  // click() {
  //   this.get('appNav').clickedNavItem(this);
  // },

  registerWithAppNav: Ember.on('didInsertElement', function() {
    Ember.run.scheduleOnce('afterRender', () => {
      let appNav = this.nearestWithProperty('_tedAppNav');
      this.set('appNav', appNav);
      appNav.registerNavItem(this);
    });
  })

});

TedNavItem.reopenClass({ positionalParams: 'params' });

export default TedNavItem;
