Templates.registerType('button-type', function(value) {
  return ['info', 'ok', 'cancel'].includes(value);
});

Templates.register(class extends BaseTemplate {
  static keys = ['BUTTON'];

  static template = '<span class="button-container"><button class="button"></button></span>';
  static styleFile = './style.css';

  static inputRules() {
    return {
      ...super.inputRules(),
      ...{
        title: {required: true, types: ['string']},
        type: {required: false, default: null, types: ['null', 'button-type']},
        disabled: {required: false, default: false, types: ['boolean']},
        onClick: {required: true, types: ['function']},
      },
    };
  }

  _onClickCallback = null;
  _onClick(e) {
    if (this.isDisabled()) { return; }
    this._onClickCallback(e);
  }

  elements = {
    button: null,
  };

  _setDisabled(value) {
    this.element.classList.toggle('disabled', value);
  }

  _setType(value) {
    this.elements.button.classList.toggle('button-info', value === 'info');
    this.elements.button.classList.toggle('button-ok', value === 'ok');
    this.elements.button.classList.toggle('button-cancel', value === 'cancel');
  }

  async onInit(input) {
    this._onClickCallback = input.onClick;

    this.elements.button = this.element.getElementsByTagName('button')[0];
    this.elements.button.innerText = input.title;
    this.elements.button.addEventListener('click', this._onClick.bind(this));

    this._setType(input.type);
    this._setDisabled(input.disabled);
  }

  async onUpdate(input) {
    if ('onClick' in input) {
      this._onClickCallback = input.onClick;
    }

    if ('disabled' in input) {
      this._setDisabled(input.disabled);
    }

    if ('type' in input) {
      this._setType(input.type);
    }

    if ('title' in input) {
      this.elements.button.innerText = input.title;
    }
  }

  isDisabled() {
    return this.element.classList.contains('disabled');
  }
});