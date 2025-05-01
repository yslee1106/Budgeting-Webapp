import TabbedModal from 'layouts/Modal/TabbedModal';
import ExpenseInfo from 'pages/budget/components/expenses/info/info'
import ExpenseHistory from 'pages/budget/components/expenses/info/history'
import ExpenseTransaction from 'pages/budget/components/expenses/info/transaction'

function BucketInfo({ isOpen, setIsOpen, selectedBucket }) {

    const tabPanels = [
        <ExpenseInfo selectedBucket={selectedBucket} />,
        <ExpenseHistory selectedBucket={selectedBucket} />,
        <ExpenseTransaction selectedBucket={selectedBucket} />,
    ]

    const tabs = [
        { id: 'info', label: 'Info' },
        { id: 'history', label: 'History' },
        { id: 'transactions', label: 'Transactions' },
    ]

    return (
        <TabbedModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title={selectedBucket?.name}
            tabs={tabs}
            tabPanels={tabPanels}
        />
    )
}

export default BucketInfo