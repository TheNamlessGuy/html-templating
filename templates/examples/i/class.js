// This is obviously an example, do not actually do this
Templates.register(class extends BaseTemplate {
  static keys = ['I'];

  static template = '<i></i>';

  static inputRules() {
    return {
      ...super.inputRules(),
      ...{
        value: {required: true, types: ['string']},
      },
    };
  }

  _setValue(value) {
    this.element.innerText = value;
  }

  async onInit(input) {
    this._setValue(input.value);
  }

  async onUpdate(input) {
    if ('value' in input) {
      this._setValue(input.value);
    }
  }
});
