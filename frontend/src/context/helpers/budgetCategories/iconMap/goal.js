import {
    Savings as SavingsIcon,
    TrendingUp as InvestmentIcon,
    CreditCard as DebtRepaymentIcon,
    Warning as EmergencyFundIcon,
    Elderly as RetirementIcon,
    School as EducationIcon,
    BeachAccess as VacationIcon,
    Home as HomeIcon,
    DirectionsCar as CarIcon,
    Category as OtherIcon,
} from '@mui/icons-material';

export const GOAL_CATEGORY_ICONS = {
    SAVINGS: <SavingsIcon fontSize="medium" />,
    INVESTMENT: <InvestmentIcon fontSize="medium" />,
    DEBT_REPAYMENT: <DebtRepaymentIcon fontSize="medium" />,
    EMERGENCY_FUND: <EmergencyFundIcon fontSize="medium" />,
    RETIREMENT: <RetirementIcon fontSize="medium" />,
    EDUCATION: <EducationIcon fontSize="medium" />,
    VACATION: <VacationIcon fontSize="medium" />,
    HOME: <HomeIcon fontSize="medium" />,
    CAR: <CarIcon fontSize="medium" />,
    OTHER: <OtherIcon fontSize="medium" />,
};

export const getGoalCategoryIcon = (category) => {
    return GOAL_CATEGORY_ICONS[category] || <OtherIcon fontSize="medium" />;
};