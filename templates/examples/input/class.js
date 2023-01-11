Templates.registerType('input-type', function(value) {
  return ['text', 'number'].includes(value);
});

Templates.register(class extends BaseTemplate {
  static keys = ['INPUT'];

  static template = '<div><span class="input-title"></span><input class="input"></div>';
  static styleFile = './style.css';

  static inputRules() {
    return {
      ...super.inputRules(),
      ...{
        type: {required: false, default: 'text', types: ['input-type']},
        title: {required: false, default: null, types: ['null', 'string']},
        value: {required: true, types: ['string']},
        placeholder: {required: false, default: '', types: ['string']},
        onChange: {required: false, default: () => {}, types: ['function']},
        onEnter: {required: false, default: () => {}, types: ['function']},
        trim: {required: false, default: false, types: ['boolean']},
      },
    }
  }

  elements = {
    title: null,
    input: null,
  };

  _type = null;
  _onChangeCallback = null;
  _onEnterCallback = null;
  _trim = null;

  _setTitle(title) {
    this.elements.title.classList.toggle('hidden', title == null);
    this.elements.input.classList.toggle('titleless', title == null);
  }

  _lastValue = null;
  _setValue(value) {
    this.elements.input.value = value;
    this._lastValue = value;
  }

  _onInput() {
    let value = this.elements.input.value;
    if (this._trim) { value = value.trim(); }

    if (value === this._lastValue) { return; }

    if (this._type === 'number') {
      // TODO: Verify that value is a number. If not, revert to _lastValue and exit early
    }

    this._setValue(this.elements.input.value);
    if (this._onChangeCallback) { this._onChangeCallback(value); }
  }

  _onKeyUp(e) {
    if (e.key === 'Enter') {
      if (this._onEnterCallback) { this._onEnterCallback(); }
    }
  }

  async onInit(input) {
    this._type = input.type;
    this._trim = input.trim;
    this._onChangeCallback = input.onChange;
    this._onEnterCallback = input.onEnter;

    this.elements.title = this.elements.getElementsByClassName('input-title')[0];

    this.elements.input = this.elements.getElementsByClassName('input')[0];
    this.elements.input.addEventListener('keyup', this._onKeyUp.bind(this));
    this.elements.input.addEventListener('input', this._onInput.bind(this));

    this._setTitle(input.title);

    this.elements.input.placeholder = input.placeholder;

    this._setValue(input.value);
  }

  async onUpdate(input) {
    if ('type' in input) {
      this._type = input.type;
    }

    if ('title' in input) {
      this._setTitle(input.title);
    }

    if ('value' in input) {
      this._setValue(input.value);
    }

    if ('placeholder' in input) {
      this.elements.input.placeholder = input.placeholder;
    }

    if ('onChange' in input) {
      this._onChangeCallback = input.onChange;
    }

    if ('onEnter' in input) {
      this._onEnterCallback = input.onEnter;
    }

    if ('trim' in input) {
      this._trim = input.trim;
    }
  }

  value() {
    return this.elements.input.value;
  }
});