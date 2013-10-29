

suite('overlay', function() {

  var el;

  setup(function() {
    var content = $('<div class="content"><button data-action="hide">Hide</button>This is content</div><div class="content2"></div>');
    $('#fixture').html(content);
    el = $('#fixture .content');
  });

  teardown(function() {
    $('#fixture').empty();
    $('.modal-backdrop').remove();
  });

  test('$().modal exists', function() {
    assert.equal(typeof $('#fixture').modal, 'function');
  });

  test('$().modal() returns el', function() {
    var e = el.modal();
    assert.equal(e, el);
  });

  test('$().modal() adds class and adds backdrop', function() {
    el.modal();

    console.log(el);
    assert.ok(el.hasClass('modal'));
    assert.equal($('.modal-backdrop').length, 1);
  });

  test('click data-action="hide" closes modal', function() {
    el.modal();
    assert.ok(el.hasClass('modal'));
    assert.equal($('.modal-backdrop').length, 1);

    $('button').click();
    assert.equal($('.modal').length, 0);
    assert.equal($('.modal-backdrop').length, 0);
  });

  test('click backdrop closes modal', function() {
    el.modal();
    $('.modal-backdrop').click();
    assert.equal($('.modal').length, 0);
    assert.equal($('.modal-backdrop').length, 0);
  });

  test('disable click backdrop', function() {
    el.modal({ backdropClick: false });
    $('.modal-backdrop').click();
    assert.equal($('.modal').length, 1);
    assert.equal($('.modal-backdrop').length, 1);
  });

  test('$().modal("hide") closes', function() {
    el.modal();
    assert.ok(el.hasClass('modal'));
    assert.equal($('.modal-backdrop').length, 1);
    assert.equal(typeof el.data('modal'), 'object');

    el.modal('hide');
    assert.equal($('.modal').length, 0);
    assert.equal($('.modal-backdrop').length, 0);
    assert.equal(typeof el.data('modal'), 'undefined');
  });

  test('$().modal("hide") doesn\'t error if not visible', function() {
    assert.doesNotThrow(function() {
      el.modal('hide');
    });
  });

  test('$().modal("show") manually shows modal', function() {
    el.modal();
    assert.ok(el.hasClass('modal'));
    assert.equal($('.modal-backdrop').length, 1);

    el.modal('hide');
    assert.equal($('.modal').length, 0);
    assert.equal($('.modal-backdrop').length, 0);

    el.modal('show');
    assert.ok(el.hasClass('modal'));
    assert.equal($('.modal-backdrop').length, 1);
  });

  test('calling "show" twice doesn\'t add another backdrop', function() {
    el.modal();
    assert.ok(el.hasClass('modal'));
    assert.equal($('.modal-backdrop').length, 1);

    el.modal('show');
    assert.ok(el.hasClass('modal'));
    assert.equal($('.modal-backdrop').length, 1);
  });

  test('adds overflow hidden on body when modal is open', function() {
    el.modal();

    assert.equal($('body').css('overflow'), 'hidden');
  });

  test('display: block when showing modal', function() {
    el.modal();

    assert.equal(el.css('display'), 'block');
  });

  test('display: none when hiding modal', function() {
    el.modal();
    el.modal('hide');

    assert.equal(el.css('display'), 'none');
  });

  test('removes overflow hidden when closed', function() {
    el.modal();

    el.modal('hide');

    assert.equal($('body').css('overflow'), 'visible');

  });

  test('event for on show', function(done) {
    el.on('show', function() { done(); });
    el.modal();
  });

  test('event for on hide', function(done) {
    el.on('hide', function() { done(); });
    el.modal();
    el.modal('hide');
  });

  test('test calling modal when one is already open', function() {
    el.modal();
    $('.content2').modal();

    assert.ok(!el.hasClass('modal'));
    assert.ok($('.content2').hasClass('modal'));
    assert.equal($('.modal-backdrop').length, 1);
  });

  test('custom class for modal and modal-backdrop', function() {
    el.modal({
      modalClass: 'modal2',
      backdropClass: 'modal-backdrop2'
    });

    assert.ok(el.hasClass('modal2'));
    assert.equal($('.modal-backdrop2').length, 1);

    //cleanup
    el.modal('hide');
  });

  test('global settings for modalClass and backdropClass', function() {
    $.fn.modal.defaults.modalClass = 'modal3';
    $.fn.modal.defaults.backdropClass = 'modal-backdrop3';

    el.modal();

    assert.ok(el.hasClass('modal3'));
    assert.equal($('.modal-backdrop3').length, 1);

    //cleanup
    el.modal('hide');
    $.fn.modal.defaults = {};
  });

  test('$().modal("toggle")');
  
});

