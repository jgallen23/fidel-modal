

suite('overlay', function() {

  var el;

  setup(function() {
    var content = $('<div class="content"><button data-action="hide">Hide</button>This is content</div><div class="content2"></div>');
    $('#fixture').html(content);
    el = $('#fixture .content');
  });

  teardown(function() {
    $('#fixture').empty();
    $('.overlay-backdrop').remove();
  });

  test('$().overlay exists', function() {
    assert.equal(typeof $('#fixture').overlay, 'function');
  });

  test('$().overlay() returns el', function() {
    var e = el.overlay();
    assert.equal(e, el);
  });

  test('$().overlay() adds class and adds backdrop', function() {
    el.overlay();

    console.log(el);
    assert.ok(el.hasClass('overlay'));
    assert.equal($('.overlay-backdrop').length, 1);
  });

  test('click data-action="hide" closes overlay', function() {
    el.overlay();
    assert.ok(el.hasClass('overlay'));
    assert.equal($('.overlay-backdrop').length, 1);

    $('button').click();
    assert.equal($('.overlay').length, 0);
    assert.equal($('.overlay-backdrop').length, 0);
  });

  test('click backdrop closes overlay', function() {
    el.overlay();
    $('.overlay-backdrop').click();
    assert.equal($('.overlay').length, 0);
    assert.equal($('.overlay-backdrop').length, 0);
  });

  test('disable click backdrop', function() {
    el.overlay({ backdropClick: false });
    $('.overlay-backdrop').click();
    assert.equal($('.overlay').length, 1);
    assert.equal($('.overlay-backdrop').length, 1);
  });

  test('$().overlay("hide") closes', function() {
    el.overlay();
    assert.ok(el.hasClass('overlay'));
    assert.equal($('.overlay-backdrop').length, 1);
    assert.equal(typeof el.data('overlay'), 'object');

    el.overlay('hide');
    assert.equal($('.overlay').length, 0);
    assert.equal($('.overlay-backdrop').length, 0);
    assert.equal(typeof el.data('overlay'), 'undefined');
  });

  test('$().overlay("hide") doesn\'t error if not visible', function() {
    assert.doesNotThrow(function() {
      el.overlay('hide');
    });
  });

  test('$().overlay("show") manually shows overlay', function() {
    el.overlay();
    assert.ok(el.hasClass('overlay'));
    assert.equal($('.overlay-backdrop').length, 1);

    el.overlay('hide');
    assert.equal($('.overlay').length, 0);
    assert.equal($('.overlay-backdrop').length, 0);

    el.overlay('show');
    assert.ok(el.hasClass('overlay'));
    assert.equal($('.overlay-backdrop').length, 1);
  });

  test('calling "show" twice doesn\'t add another backdrop', function() {
    el.overlay();
    assert.ok(el.hasClass('overlay'));
    assert.equal($('.overlay-backdrop').length, 1);

    el.overlay('show');
    assert.ok(el.hasClass('overlay'));
    assert.equal($('.overlay-backdrop').length, 1);
  });

  test('adds overflow hidden on body when overlay is open', function() {
    el.overlay();

    assert.equal($('body').css('overflow'), 'hidden');
  });

  test('display: block when showing overlay', function() {
    el.overlay();

    assert.equal(el.css('display'), 'block');
  });

  test('display: none when hiding overlay', function() {
    el.overlay();
    el.overlay('hide');

    assert.equal(el.css('display'), 'none');
  });

  test('removes overflow hidden when closed', function() {
    el.overlay();

    el.overlay('hide');

    assert.equal($('body').css('overflow'), 'visible');

  });

  test('event for on show', function(done) {
    el.on('show', function() { done(); });
    el.overlay();
  });

  test('event for on hide', function(done) {
    el.on('hide', function() { done(); });
    el.overlay();
    el.overlay('hide');
  });

  test('test calling overlay when one is already open', function() {
    el.overlay();
    $('.content2').overlay();

    assert.ok(!el.hasClass('overlay'));
    assert.ok($('.content2').hasClass('overlay'));
    assert.equal($('.overlay-backdrop').length, 1);
  });

  test('custom class for overlay and overlay-backdrop', function() {
    el.overlay({
      overlayClass: 'overlay2',
      backdropClass: 'overlay-backdrop2'
    });

    assert.ok(el.hasClass('overlay2'));
    assert.equal($('.overlay-backdrop2').length, 1);

    //cleanup
    el.overlay('hide');
  });

  test('global settings for overlayClass and backdropClass', function() {
    $.fn.overlay.defaults.overlayClass = 'overlay3';
    $.fn.overlay.defaults.backdropClass = 'overlay-backdrop3';

    el.overlay();

    assert.ok(el.hasClass('overlay3'));
    assert.equal($('.overlay-backdrop3').length, 1);

    //cleanup
    el.overlay('hide');
    $.fn.overlay.defaults = {};
  });

  test('$().overlay("toggle")');
  
});

