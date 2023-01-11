Modals.register(class extends BaseModal {
  static keys = ['INPUT'];

  static template = `
<div>
  <h2 class="modal-title"></h2>
  <div class="modal-row">
    <input-field></input-field>
  </div>
  <div class="modal-row">
    <ok-btn></ok-btn>
    <cancel-btn></cancel-btn>
  </div>
</div>
`;

  static inputRules() {
    return {
      title: {required: true},
      inputValue: {required: true},
      inputTitle: {required: false, default: null},
      inputType: {required: false, default: 'text'},
      onOK: {required: true},
      onCancel: {required: false, default: null},
    };
  }

  elements = {
    title: null,
    input: null,

    btn: {
      ok: null,
      cancel: null,
    },
  };

  _onOKCallback = null;
  _onOK() {
    if (this._onOKCallback) { this._onOKCallback(); }
  }

  _onCancelCallback = null;
  _onCancel() {
    if (this._onCancelCallback) { this._onCancelCallback(); }
  }

  async onInit() {
    this.elements.title = this.element.getElementsByClassName('modal-title')[0];

    this.elements.input = await Templates.init(Templates.INPUT, {value: ''}); // See /templates/examples/input/
    this.elements.input.replaceTag('input-field', this.element);

    this.elements.btn.ok = await Templates.init(Templates.BUTTON, {title: 'OK', type: 'ok', onClick: this._onOK.bind(this)}); // See /templates/examples/button/
    this.elements.btn.ok.replaceTag('ok-btn', this.element);

    this.elements.btn.cancel = await Templates.init(Templates.BUTTON, {title: 'Cancel', type: 'cancel', onClick: this._onCancel.bind(this)}); // See /templates/examples/button/
    this.elements.btn.cancel.replaceTag('cancel-btn', this.element);
  }

  async onShow(input) {
    this._onOKCallback = input.onOK;
    this._onCancelCallback = input.onCancel;

    this.elements.title.innerText = input.title;

    this.elements.input.update({
      value: input.inputValue,
      title: input.inputTitle,
      type: input.inputType,
    });
  }
});