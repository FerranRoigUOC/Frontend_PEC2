/**
 * @class Service
 *
 * Manages the data of the application.
 */
class TransactionsService {
  constructor() {
    this.transactions = (JSON.parse(localStorage.getItem("transactions")) || []).map(
      transaction => new Transaction(transaction)
    );
  }

  bindTransactionsListChanged(callback) {
    this.onTransactionsListChanged = callback;
  }

  _commit(transactions) {
    this.onTransactionsListChanged(transactions);
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }

  addTransaction(text, amount) {
    this.transactions.push(new Transaction({ text, amount }));

    this._commit(this.transactions);
  }

  deleteTransaction(_id) {
    this.transactions = this.transactions.filter(({ id }) => id !== _id);

    this._commit(this.transactions);
  }

  editTransaction(id, updatedAmount, transactionText) {
    this.transactions = this.transactions.map(t =>
      t.id === id
        ? new Transaction({
            ...t,
            amount: updatedAmount != "" ? updatedAmount : t.amount,
            text: transactionText != "" ? transactionText : t.text,
          })
        : t
    );

    this._commit(this.transactions);
  }

}
