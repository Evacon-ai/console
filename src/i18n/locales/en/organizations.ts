export default {
  title: 'Organizations',
  addNew: 'Add Organization',
  notes: {
    title: 'Notes',
    edit: 'Edit Notes'
  },
  status: {
    active: 'Active',
    inactive: 'Inactive'
  },
  billing: {
    title: 'Billing',
    currentPlan: 'Current Plan',
    upgradePlan: 'Upgrade Plan',
    freeTrial: 'Free Trial',
    trialEnds: 'Your trial ends in {days} days',
    paymentMethods: 'Payment Methods',
    addPaymentMethod: 'Add Payment Method',
    noPaymentMethods: 'No payment methods added yet',
    addCreditCard: 'Add a credit card to enable automatic payments',
    billingHistory: 'Billing History',
    export: 'Export',
    noInvoices: 'No invoices yet',
    invoicesWillAppear: 'Your billing history will appear here once you start using paid features',
    comingSoon: 'Billing features coming soon! We\'re working on integrating Stripe for secure payments.'
  },
  integrations: {
    title: 'Integrations',
    configureApiKey: 'Configure API Key',
    tiaPortal: {
      description: 'Connect to TIA Portal for automated PLC programming and configuration.',
      title: 'TIA Portal Integration',
      apiKeyLabel: 'TIA Portal API Key',
      apiKeyDescription: 'Enter your TIA Portal API key to enable automated PLC programming and configuration.'
    },
    eplan: {
      description: 'Integrate with EPLAN for electrical engineering and documentation.',
      title: 'EPLAN Integration',
      apiKeyLabel: 'EPLAN API Key',
      apiKeyDescription: 'Enter your EPLAN API key to enable electrical engineering integration.'
    },
    comingSoon: 'Coming soon'
  },
  details: {
    title: 'Details',
    address: {
      edit: 'Edit Address',
      street: 'Street Address',
      streetRequired: 'Street address is required',
      city: 'City',
      cityRequired: 'City is required',
      state: 'State',
      province: 'Province',
      stateTerritory: 'State/Territory',
      stateProvince: 'State/Province',
      stateRequired: 'State/Province is required',
      postalCode: 'Postal Code',
      postalCodeRequired: 'Postal code is required',
      country: 'Country',
      countryRequired: 'Country is required'
    },
    name: {
      edit: 'Edit Organization Name',
      name: 'Organization Name',
      nameRequired: 'Organization name is required'
    },
    logo: {
      update: 'Update Organization Logo',
      dropHint: 'Drop your logo here or click to select',
      supportedFormats: 'Supported formats: PNG, JPG, GIF',
      invalidFormat: 'Please select a valid image file (PNG, JPG, or GIF)',
      fileTooLarge: 'File size must be less than 5MB',
      uploadFailed: 'Failed to upload logo'
    }
  },
  organization: 'Organization',
  name: 'Organization Name',
  nameRequired: 'Organization name is required',
  projectCount: 'Projects: {count}',
  viewProjects: 'View organization projects',
  addedOn: 'Added {date}',
  noOrganizations: 'No organizations found',
  failedToLoad: 'Failed to load organizations',
  failedToCreate: 'Failed to create organization',
  failedToUpdate: 'Failed to update organization',
  failedToDelete: 'Failed to delete organization',
  users: {
    title: 'Organization Users',
    noUsers: 'No users found',
    noUsersCaption: 'Add users to your organization to start collaborating',
    addUser: 'Add User',
    editRole: 'Edit Role',
    remove: 'Remove',
    removeTitle: 'Remove User',
    removeConfirm: 'Are you sure you want to remove {name} from this organization?',
    removeWarning: 'This action cannot be undone.',
    onlyAdminsCanAdd: 'Only administrators can add users',
    onlyAdminsCanChangeStatus: 'Only administrators can change organization status',
    selectOrganization: 'Select organization',
    roles: {
      administrator: 'Administrator',
      user: 'User'
    },
    edit: {
      title: 'Edit Role',
      role: 'Role',
      roleRequired: 'Role is required'
    }
  }
}