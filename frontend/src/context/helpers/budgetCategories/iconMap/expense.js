import {
  // Housing
  Home as HousingIcon,
  House as RentMortgageIcon,
  Bolt as UtilitiesIcon,
  Handyman as HomeMaintenanceIcon,
  Shield as HomeInsuranceTaxesIcon,
  
  // Transportation
  DirectionsCar as TransportationIcon,
  CarRental as VehiclePaymentIcon,
  LocalGasStation as VehicleExpensesIcon,
  DirectionsBus as PublicTransportIcon,
  LocalParking as ParkingTollsIcon,
  
  // Food
  Restaurant as FoodIcon,
  LocalGroceryStore as GroceriesIcon,
  DinnerDining as DiningOutIcon,
  
  // Health
  LocalHospital as HealthcareIcon,
  HealthAndSafety as HealthInsuranceIcon,
  MedicalServices as MedicalExpensesIcon,
  FitnessCenter as FitnessIcon,
  
  // Entertainment
  SportsEsports as EntertainmentIcon,
  LiveTv as StreamingSubscriptionsIcon,
  TheaterComedy as RecreationIcon,
  
  // Shopping
  ShoppingCart as ShoppingIcon,
  Checkroom as ClothingIcon,
  Devices as ElectronicsIcon,
  Spa as PersonalCareIcon,
  
  // Travel
  Flight as TravelIcon,
  Hotel as AccommodationIcon,
  AirplanemodeActive as TravelTransportIcon,
  Hiking as TravelActivitiesIcon,
  
  // Financial
  CreditCard as DebtIcon,
  Savings as SavingsInvestmentsIcon,
  
  // Other Life Expenses
  School as EducationIcon,
  ChildCare as ChildcareIcon,
  Pets as PetsIcon,
  CardGiftcard as GiftsDonationsIcon,
  Work as BusinessExpensesIcon,
  
  // Catch-all
  Category as MiscellaneousIcon
} from '@mui/icons-material';

export const EXPENSE_CATEGORY_ICONS = {
  // Housing
  HOUSING: <HousingIcon fontSize="medium" />,
  RENT_MORTGAGE: <RentMortgageIcon fontSize="medium" />,
  UTILITIES: <UtilitiesIcon fontSize="medium" />,
  HOME_MAINTENANCE: <HomeMaintenanceIcon fontSize="medium" />,
  HOME_INSURANCE_TAXES: <HomeInsuranceTaxesIcon fontSize="medium" />,
  
  // Transportation
  TRANSPORTATION: <TransportationIcon fontSize="medium" />,
  VEHICLE_PAYMENT: <VehiclePaymentIcon fontSize="medium" />,
  VEHICLE_EXPENSES: <VehicleExpensesIcon fontSize="medium" />,
  PUBLIC_TRANSPORT: <PublicTransportIcon fontSize="medium" />,
  PARKING_TOLLS: <ParkingTollsIcon fontSize="medium" />,
  
  // Food
  FOOD: <FoodIcon fontSize="medium" />,
  GROCERIES: <GroceriesIcon fontSize="medium" />,
  DINING_OUT: <DiningOutIcon fontSize="medium" />,
  
  // Health
  HEALTHCARE: <HealthcareIcon fontSize="medium" />,
  HEALTH_INSURANCE: <HealthInsuranceIcon fontSize="medium" />,
  MEDICAL_EXPENSES: <MedicalExpensesIcon fontSize="medium" />,
  FITNESS: <FitnessIcon fontSize="medium" />,
  
  // Entertainment
  ENTERTAINMENT: <EntertainmentIcon fontSize="medium" />,
  STREAMING_SUBSCRIPTIONS: <StreamingSubscriptionsIcon fontSize="medium" />,
  RECREATION: <RecreationIcon fontSize="medium" />,
  
  // Shopping
  SHOPPING: <ShoppingIcon fontSize="medium" />,
  CLOTHING: <ClothingIcon fontSize="medium" />,
  ELECTRONICS: <ElectronicsIcon fontSize="medium" />,
  PERSONAL_CARE: <PersonalCareIcon fontSize="medium" />,
  
  // Travel
  TRAVEL: <TravelIcon fontSize="medium" />,
  ACCOMMODATION: <AccommodationIcon fontSize="medium" />,
  TRAVEL_TRANSPORT: <TravelTransportIcon fontSize="medium" />,
  TRAVEL_ACTIVITIES: <TravelActivitiesIcon fontSize="medium" />,
  
  // Financial
  DEBT: <DebtIcon fontSize="medium" />,
  SAVINGS_INVESTMENTS: <SavingsInvestmentsIcon fontSize="medium" />,
  
  // Other Life Expenses
  EDUCATION: <EducationIcon fontSize="medium" />,
  CHILDCARE: <ChildcareIcon fontSize="medium" />,
  PETS: <PetsIcon fontSize="medium" />,
  GIFTS_DONATIONS: <GiftsDonationsIcon fontSize="medium" />,
  BUSINESS: <BusinessExpensesIcon fontSize="medium" />,
  
  // Catch-all
  MISCELLANEOUS: <MiscellaneousIcon fontSize="medium" />
};

export const getExpenseCategoryIcon = (category) => {
  return EXPENSE_CATEGORY_ICONS[category] || <MiscellaneousIcon fontSize="medium" />;
};