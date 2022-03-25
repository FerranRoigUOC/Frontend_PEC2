/**
 * @class Controller
 *
 * Links the user input and the view output.
 *
 * @param model
 * @param view
 */
class TransactionController {
  constructor(service, view) {
    this.service = service;
    this.view = view;

    // Explicit this binding
    this.service.bindTransactionsListChanged(this.onTransactionsListChanged);
    this.view.bindAddTransaction(this.handleAddTransaction);
    this.view.bindDeleteTransaction(this.handleDeleteTransaction);
    this.view.bindEditTransaction(this.handleEditTransaction);

    // Display initial transactions
    this.onTransactionsListChanged(this.service.transactions); //init
  }

  onTransactionsListChanged = transactions => {
    this.view.displayTransactions(transactions);
  };

  handleAddTransaction = (transactionText, transactionAmount) => {
    this.service.addTransaction(transactionText, transactionAmount);
  };

  handleDeleteTransaction = id => {
    this.service.deleteTransaction(id);
  };

  handleEditTransaction = (id, transactionAmount, transactionText) => {
    this.service.editTransaction(id, transactionAmount, transactionText);
  };

}
