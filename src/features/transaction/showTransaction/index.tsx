import TransactionTable from '../../../components/transactionTable';

const ShowTransactionView = ({ distributorId, shopId }) => {
  return (
    <TransactionTable
      distributorId={distributorId}
      shopId={shopId}
    ></TransactionTable>
  );
};

export default ShowTransactionView;
