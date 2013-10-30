
(function($) {
  $.declare('overlay', {
    defaults: {
      overlayClass: 'overlay',
      backdropClass: 'overlay-backdrop',
      backdropClick: true
    },

    init: function() {

      if ($('.'+this.overlayClass).length !== 0) {
        $('.'+this.overlayClass).overlay('hide');
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
      this.el.addClass(this.overlayClass);
      $('body').css('overflow', 'hidden');
      this.showBackdrop();
      this.el.show();
      this.emit('show');
    },

    hide: function() {
      this.el.removeClass(this.overlayClass);
      $('body').css('overflow', '');
      this.hideBackdrop();
      this.el.hide();
      this.emit('hide');
      this.el.removeData('overlay');
    }
  });
})(jQuery);
