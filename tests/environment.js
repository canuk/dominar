var expect = window.chai.expect;
var Dominar = require('../src/dominar');
var DominarField = require('../src/dominar-field');
var Utils = require('../src/utils');

describe('initialisation', function() {

	it('should be able to initialise dominar', function() {
		var dominar = new Dominar($('<form/>'), {

		});
	});

	it('should be globally available', function() {
		expect(window.Dominar).to.be.defined;
	});

	it('should default options to', function() {

		expect(Dominar.prototype.defaults).to.deep.equal({
			container: '.form-group',
			delay: 300,
			delayTriggers: ['keyup'],
			rules: '',
			remoteRule: Utils.noop,
			triggers: ['keyup', 'focusout', 'change'],
			message: true,
			customMessages: {},
			feedback: true,
			feedbackIcons: {
				success: '<i class="glyphicon glyphicon-check"></i>',
				error: '<i class="glyphicon glyphicon-remove"></i>'
			}
		});

	});

	it('should default config to', function() {

		expect(Dominar.prototype.configDefaults).to.deep.equal({
			validateOnSubmit: true
		});

	});

});

describe('basic validation and option testing', function() {

	it('should show just error', function() {
		var dominar = new Dominar($('<form><div class="form-group"><input name="username"></div></form>'), {
			username: {
				rules: 'required',
				feedback: false,
				message: true
			}
		});

		var $username = dominar.$form.find('[name=username]');
		dominar.validate($username);
		expect(dominar.$form.html()).to.equal([
			'<div class="form-group has-error">',
				'<input name="username"><span class="help-block">The username field is required.</span>',
			'</div>'
		].join(''));
	});

	// it('should show error on keyup', function() {
		
	// 	var dominar = new Dominar($('<form><div class="form-group"><input name="username"></div></form>'), {
	// 		username: {
	// 			rules: 'required',
	// 			feedback: false,
	// 			message: false
	// 		}
	// 	});

	// 	var spy = sinon.spy(dominar, 'validateDelayed');

	// 	dominar.$form.find('input').trigger('keyup');

	// 	setTimeout(function() {
	// 		expect(spy.called).to.be.true
	// 	}, 50);

	// 	// console.log(dominar.$form.find('.form-group'));
	// 	// setTimeout(function() {
	// 	// 	expect(dominar.$form.find('.form-group').hasClass('has-error')).to.be.true;
	// 	// }, 2000);
	// });

	it('should allow getting a field by name', function() {

		var dominar = new Dominar($('<form><div class="form-group"><input name="username"></div></form>'), { username: {} });
		var field = dominar.getField('username');
		expect(field).to.be.instanceof(DominarField);
		expect(field.name).to.equal('username');

	});

	it('should be able to destroy', function() {

		var dominar = new Dominar($('<form><div class="form-group"><input name="username"></div></form>'), { username: {} });

		dominar.getField('username').showError('test');

		expect(dominar.$form.find('.form-group').hasClass('has-error')).to.be.true;
		expect(dominar.$form.find('.form-control-feedback').length).to.equal(1);
		expect(dominar.$form.find('.help-block').html()).to.equal('test');

		dominar.destroy();

		expect(dominar.$form.find('.form-group').hasClass('.has-error')).to.be.false;
		expect(dominar.$form.find('.help-block').html().length).to.equal(0);
		expect(dominar.$form.find('.form-control-feedback').html().length).to.equal(0);

	});

});