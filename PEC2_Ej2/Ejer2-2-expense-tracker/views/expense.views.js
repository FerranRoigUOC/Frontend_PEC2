/**
 * @class View
 *
 * Visual representation of the model.
 */
class TransactionView {
  constructor() {
    this.balance = this.getElement('balance');
    this.money_plus = this.getElement('money-plus');
    this.money_minus = this.getElement('money-minus');
    this.list = this.getElement('list');
    this.form = this.getElement('form');
    this.text = this.getElement('text');
    this.amount = this.getElement('amount');

    this._temporaryAmountValue = "";
    this._temporaryTextValue = "";
    this._initLocalListeners();
  }


  createElement(tag, className) {
    const element = document.createElement(tag);

    if (className) element.classList.add(className);

    return element;
  }

  getElement(selector){
    const element = document.getElementById(selector);

    return element;
  }

  // Update the balance, income and expense, (init)
  displayTransactions(transactions) {

    this.list.innerHTML = '';
    transactions.forEach( function(transaction)
      {
        // Get sign
        const sign = transaction.amount < 0 ? '-' : '+';
      
        const item = document.createElement('li');
        item.id = transaction.id;
      
        // Add class based on value
        item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
      
        item.innerHTML = `
        <span contenteditable="true" class="editable-text">${transaction.text}</span> <span contenteditable="true" class="editable">${sign}${Math.abs(
          transaction.amount
        )}</span> <button class="delete-btn">x</button>`;
      
        document.getElementById('list').appendChild(item);
      }
    );

    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    const income = amounts
      .filter(item => item > 0)
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2);

    const expense = (
      amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
      -1
    ).toFixed(2);

    this.balance.innerText = `$${total}`;
    this.money_plus.innerText = `$${income}`;
    this.money_minus.innerText = `$${expense}`;
  }

  bindAddTransaction(handler) {
    this.form.addEventListener("submit", event => {
      event.preventDefault();

      if (this.text.value.trim() === '' || this.amount.value.trim() === '') {
        alert('Please add a text and amount');
      } else {

        handler(this.text.value, +this.amount.value);
    
        this.text.value = '';
        this.amount.value = '';
      }
    });
  }

  bindDeleteTransaction(handler) {
    this.list.addEventListener("click", event => {
      if (event.target.className === "delete-btn") {
        const id = event.target.parentElement.id;

        handler(parseInt(id));
      }
    });
  }

  bindEditTransaction(handler) {
    this.list.addEventListener("focusout", event => {
      if (this._temporaryAmountValue || this._temporaryTextValue) {
        const id = event.target.parentElement.id;

        handler(parseInt(id), this._temporaryAmountValue != "" ? parseInt(this._temporaryAmountValue) : "", this._temporaryTextValue);
        this._temporaryAmountValue = "";
        this._temporaryTextValue = "";
      }
    });
  }

  _initLocalListeners() {
    this.list.addEventListener("input", event => {
      if (event.target.className === "editable") {
        this._temporaryAmountValue = event.target.innerText;
      }
      if (event.target.className === "editable-text") {
        this._temporaryTextValue = event.target.innerText;
      }
    });
  }
}
