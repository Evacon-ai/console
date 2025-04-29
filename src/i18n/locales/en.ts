export default {
  common: {
    signIn: 'Sign in',
    signOut: 'Sign Out',
    table: {
      recordsPerPage: 'Records per page',
      noData: 'No data available',
      noResults: 'No matching records found',
      loading: 'Loading...',
      selectedRecords: 'Selected records',
      rowsPerPage: 'Rows per page:'
    },
    email: 'Email',
    password: 'Password',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    back: 'Back',
    home: 'Home',
    projects: 'Projects',
    profile: 'Profile',
    organizations: 'Organizations',
    newProject: 'New Project',
    cancel: 'Cancel',
    continue: 'Continue',
    finish: 'Finish',
    close: 'Close',
    processing: 'Processing',
    success: 'Success',
    pleaseWait: 'Please wait...',
    refresh: 'Refresh',
    download: 'Download',
    language: 'Language',
    save: 'Save',
    theme: 'Theme',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode'
  },
  auth: {
    signInTitle: 'Sign in to your account',
    signUpTitle: 'Create your account',
    signUp: 'Sign up',
    needAccount: 'Need an account? Sign up',
    haveAccount: 'Already have an account? Sign in',
    emailRequired: 'Email is required',
    passwordRequired: 'Password is required',
    resetPassword: 'Reset Password',
    resetPasswordInstructions: 'Enter your email address and we will send you instructions to reset your password.',
    sendResetLink: 'Send Reset Link',
    resetPasswordSuccess: 'Check your email for password reset instructions.',
    invalidResetLink: 'Invalid or expired password reset link.',
    passwordResetSuccess: 'Your password has been successfully reset.',
    rateLimitExceeded: 'Too many attempts. Please try again in a few minutes.',
    setNewPassword: 'Set New Password',
    setNewPasswordInstructions: 'Please enter your new password below.',
    newPassword: 'New Password',
    confirmPassword: 'Confirm Password',
    confirmPasswordRequired: 'Please confirm your password',
    passwordTooShort: 'Password must be at least 8 characters long',
    passwordsDoNotMatch: 'Passwords do not match'
  },
  users: {
    title: 'Users',
    noUsersFound: 'No users found',
    searchUsers: 'Search users',
    fullName: 'Full Name',
    failedToLoadUsers: 'Failed to load users',
    failedToCreateUser: 'Failed to create user',
    failedToUpdateUser: 'Failed to update user',
    failedToDeleteUser: 'Failed to delete user',
    confirmDelete: 'Delete User',
    confirmDeleteMessage: 'Are you sure you want to delete this user? This action cannot be undone.',
    evaconStaff: 'Evacon Staff',
    customerUsers: 'Customer Users',
    addUser: 'Add User',
    editUser: 'Edit User',
    deleteUser: 'Delete User',
    deleteConfirmation: 'Are you sure you want to delete this user?',
    userDeleted: 'User successfully deleted',
    userUpdated: 'User successfully updated',
    userAdded: 'User successfully added. A password reset email has been sent.',
    firstName: 'First Name',
    lastName: 'Last Name',
    firstNameRequired: 'First name is required',
    lastNameRequired: 'Last name is required',
    invalidEmail: 'Please enter a valid email address',
    role: 'Role',
    level: 'Level',
    addedBy: 'Added by {name} {date}',
    updatedBy: 'Last updated by {name} {date}',
    levels: {
      customer: 'Customer',
      evacon: 'Evacon'
    }
  },
  projects: {
    title: 'Projects',
    createNew: 'Create New Project',
    description: 'Description',
    projectDescription: 'Project Description',
    generated: '{time} ago',
    wizard: {
      projectName: 'Project Name',
      nameYourProject: 'Name your project',
      projectNamePlaceholder: 'Enter project name',
      fdsTitle: 'FDS File',
      fdsUpload: 'Upload FDS file',
      setPointTitle: 'Set Point File',
      setPointUpload: 'Upload Set Point file',
      designTitle: 'Design File',
      designUpload: 'Upload Design file',
      ioTitle: 'I/O File',
      ioUpload: 'Upload I/O file',
      processingTitle: 'Processing Files',
      uploadToTIA: 'Upload to TIA Portal'
    }
  },
  profile: {
    title: 'Profile',
    role: 'Role',
    company: 'Company',
    joined: 'Joined {date}',
    contactInfo: 'Contact Information',
    companyInfo: 'Company Information',
    accountInfo: 'Account Information',
    personalInfo: 'Personal Information',
    editProfile: 'Edit Profile',
    saveChanges: 'Save Changes',
    roles: {
      evacon_admin: 'Evacon Administrator',
      evacon_staff: 'Evacon Staff',
      evacon_user: 'Evacon Staff',
      customer_admin: 'Customer Administrator',
      customer_user: 'Customer User',
      user: 'User',
      admin: 'Administrator'
    }
  },
  dashboard: {
    title: 'Home',
    stats: {
      activeProjects: 'Active Projects',
      teamMembers: 'Team Members',
      recentActivity: 'Recent Activity'
    },
    activity: {
      title: 'Recent Activity',
      timeAgo: '{time} ago',
      day: 'day | days'
    }
  },
  time: {
    ago: '{time} ago',
    minute: 'minute | minutes',
    hour: 'hour | hours',
    day: 'day | days',
    week: 'week | weeks',
    month: 'month | months'
  },
  organizations: {
    title: 'Organizations',
    addNew: 'Add Organization',
    notes: {
      title: 'Notes',
      edit: 'Edit Notes'
    },
    details: {
      title: 'Details',
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
      },
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
      contact: {
        edit: 'Edit Contact Name',
        editEmail: 'Edit Contact Email',
        updatePhone: 'Update Phone Number',
        name: 'Contact Name',
        nameRequired: 'Contact name is required',
        email: 'Contact Email',
        emailTooLong: 'Email address is too long'
      },
      website: {
        edit: 'Edit Website URL',
        url: 'Website URL',
        invalidUrl: 'Please enter a valid URL starting with http:// or https://',
        emptyHint: 'Leave empty if no website'
      },
      timezone: {
        edit: 'Edit Timezone',
        label: 'Timezone',
        required: 'Timezone is required'
      },
      notes: {
        edit: 'Edit Notes'
      }
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
    organization: 'Organization',
    name: 'Organization Name',
    nameRequired: 'Organization name is required',
    addedOn: 'Added on {date}',
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
}