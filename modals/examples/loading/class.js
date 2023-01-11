Modals.register(class extends BaseModal {
  static keys = ['LOADING'];

  static template = `
<div>
  <h2 class="modal-title"></h2>
  <div class="modal-row">
    <img src="/static/images/loading.apng" />
  </div>
</div>
`;

  static inputRules() {
    return {
      title: {default: 'Loading...'},
    };
  }

  elements = {
    title: null,
  };

  async onInit() {
    this.elements.title = this.element.getElementsByClassName('modal-title')[0];
  }

  async onShow(input) {
    this.elements.title.innerText = input.title;
  }
});