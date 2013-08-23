/*!
 * fidel-modal - Modal plugin built with fidel
 * v0.1.4
 * https://github.com/jgallen23/fidel-modal/
 * copyright Greg Allen 2013
 * MIT License
*/

(function($) {
  $.declare('modal', {
    defaults: {
      modalClass: 'modal',
      backdropClass: 'modal-backdrop',
      backdropClick: true
    },

    init: function() {

      if ($('.modal').length !== 0) {
        $('.modal').modal('hide');
      }

      this.show();
    },

    getBackdrop: function() {
      return $('.'+this.backdropClass);
    },

    showBackdrop: function() {
      this.hideBackdrop();
      var el = $('<div/>').addClass(this.backdropClass);
      if (this.backdropClick) {
        el.on('click', this.proxy(this.hide));
      }
      $('body').append(el);
    },

    hideBackdrop: function() {
      this.getBackdrop().remove();
    },

    show: function() {
      this.el.addClass(this.modalClass);
      $('body').css('overflow', 'hidden');
      this.showBackdrop();
      this.el.show();
      this.emit('show');
    },

    hide: function() {
      this.el.removeClass(this.modalClass);
      $('body').css('overflow', '');
      this.hideBackdrop();
      this.el.hide();
      this.emit('hide');
      this.el.removeData('modal');
    }
  });
})(jQuery);
