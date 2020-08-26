import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

type ICreateTransactionService = Omit<Transaction, 'id'>;

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({
    title,
    value,
    type,
  }: ICreateTransactionService): ICreateTransactionService {
    const { total } = this.transactionsRepository.getBalance();

    if (type === 'outcome' && value > total) {
      throw new Error('Withdrawal exceded total amount available');
    }

    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    return transaction;
  }
}

export default CreateTransactionService;
