export default {
  common: {
    signIn: 'Anmelden',
    signOut: 'Abmelden',
    table: {
      recordsPerPage: 'Einträge pro Seite',
      noData: 'Keine Daten verfügbar',
      noResults: 'Keine passenden Einträge gefunden',
      loading: 'Wird geladen...',
      selectedRecords: 'Ausgewählte Einträge',
      rowsPerPage: 'Zeilen pro Seite:'
    },
    email: 'E-Mail',
    password: 'Passwort',
    rememberMe: 'Angemeldet bleiben',
    forgotPassword: 'Passwort vergessen?',
    home: 'Startseite',
    projects: 'Projekte',
    profile: 'Profil',
    organizations: 'Organisationen',
    newProject: 'Neues Projekt',
    cancel: 'Abbrechen',
    continue: 'Weiter',
    finish: 'Fertigstellen',
    back: 'Zurück',
    close: 'Schließen',
    processing: 'Verarbeitung',
    success: 'Erfolgreich',
    pleaseWait: 'Bitte warten...',
    refresh: 'Aktualisieren',
    download: 'Herunterladen',
    language: 'Sprache',
    save: 'Speichern',
    save: 'Speichern',
    theme: 'Design',
    lightMode: 'Heller Modus',
    darkMode: 'Dunkler Modus'
  },
  projects: {
    title: 'Projekte',
    createNew: 'Neues Projekt erstellen',
    description: 'Beschreibung',
    projectDescription: 'Projektbeschreibung',
    generated: 'vor {time}',
    wizard: {
      projectName: 'Projektname',
      nameYourProject: 'Benennen Sie Ihr Projekt',
      projectNamePlaceholder: 'Projektname eingeben',
      fdsTitle: 'FDS-Datei',
      fdsUpload: 'FDS-Datei hochladen',
      setPointTitle: 'Sollwert-Datei',
      setPointUpload: 'Sollwert-Datei hochladen',
      designTitle: 'Design-Datei',
      designUpload: 'Design-Datei hochladen',
      ioTitle: 'E/A-Datei',
      ioUpload: 'E/A-Datei hochladen',
      processingTitle: 'Dateien werden verarbeitet',
      uploadToTIA: 'In TIA Portal hochladen'
    }
  },
  auth: {
    signInTitle: 'Melden Sie sich bei Ihrem Konto an',
    signUpTitle: 'Konto erstellen',
    signUp: 'Registrieren',
    needAccount: 'Noch kein Konto? Registrieren',
    haveAccount: 'Bereits ein Konto? Anmelden',
    emailRequired: 'E-Mail ist erforderlich',
    passwordRequired: 'Passwort ist erforderlich',
    resetPassword: 'Passwort zurücksetzen',
    resetPasswordInstructions: 'Geben Sie Ihre E-Mail-Adresse ein und wir senden Ihnen Anweisungen zum Zurücksetzen Ihres Passworts.',
    sendResetLink: 'Link zum Zurücksetzen senden',
    resetPasswordSuccess: 'Prüfen Sie Ihre E-Mail für Anweisungen zum Zurücksetzen des Passworts.',
    invalidResetLink: 'Ungültiger oder abgelaufener Link zum Zurücksetzen des Passworts.',
    passwordResetSuccess: 'Ihr Passwort wurde erfolgreich zurückgesetzt.',
    rateLimitExceeded: 'Zu viele Versuche. Bitte versuchen Sie es in einigen Minuten erneut.',
    setNewPassword: 'Neues Passwort festlegen',
    setNewPasswordInstructions: 'Bitte geben Sie unten Ihr neues Passwort ein.',
    newPassword: 'Neues Passwort',
    confirmPassword: 'Passwort bestätigen',
    confirmPasswordRequired: 'Bitte bestätigen Sie Ihr Passwort',
    passwordTooShort: 'Das Passwort muss mindestens 8 Zeichen lang sein',
    passwordsDoNotMatch: 'Die Passwörter stimmen nicht überein'
  },
  users: {
    title: 'Benutzer',
    noUsersFound: 'Keine Benutzer gefunden',
    searchUsers: 'Benutzer suchen',
    fullName: 'Vollständiger Name',
    failedToLoadUsers: 'Fehler beim Laden der Benutzer',
    failedToCreateUser: 'Fehler beim Erstellen des Benutzers',
    failedToUpdateUser: 'Fehler beim Aktualisieren des Benutzers',
    failedToDeleteUser: 'Fehler beim Löschen des Benutzers',
    confirmDelete: 'Benutzer löschen',
    confirmDeleteMessage: 'Sind Sie sicher, dass Sie diesen Benutzer löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
    evaconStaff: 'Evacon Mitarbeiter',
    customerUsers: 'Kundenbenutzer',
    addUser: 'Benutzer hinzufügen',
    editUser: 'Benutzer bearbeiten',
    deleteUser: 'Benutzer löschen',
    deleteConfirmation: 'Sind Sie sicher, dass Sie diesen Benutzer löschen möchten?',
    userDeleted: 'Benutzer wurde erfolgreich gelöscht',
    userUpdated: 'Benutzer wurde erfolgreich aktualisiert',
    userAdded: 'Benutzer wurde erfolgreich hinzugefügt. Eine E-Mail zum Zurücksetzen des Passworts wurde gesendet.',
    firstName: 'Vorname',
    lastName: 'Nachname',
    firstNameRequired: 'Vorname ist erforderlich',
    lastNameRequired: 'Nachname ist erforderlich',
    invalidEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
    role: 'Rolle',
    level: 'Ebene',
    addedBy: 'Hinzugefügt von {name} {date}',
    updatedBy: 'Zuletzt aktualisiert von {name} {date}',
    levels: {
      customer: 'Kunde',
      evacon: 'Evacon'
    }
  },
  profile: {
    title: 'Profil',
    role: 'Rolle',
    company: 'Unternehmen',
    joined: 'Beigetreten {date}',
    contactInfo: 'Kontaktinformationen',
    companyInfo: 'Unternehmensinformationen',
    accountInfo: 'Kontoinformationen',
    personalInfo: 'Persönliche Informationen',
    editProfile: 'Profil bearbeiten',
    saveChanges: 'Änderungen speichern',
    roles: {
      evacon_admin: 'Evacon Administrator',
      evacon_staff: 'Evacon Mitarbeiter',
      evacon_user: 'Evacon Mitarbeiter',
      customer_admin: 'Kundenadministrator',
      customer_user: 'Kundenbenutzer',
      user: 'Benutzer',
      admin: 'Administrator'
    }
  },
  dashboard: {
    title: 'Startseite',
    stats: {
      activeProjects: 'Aktive Projekte',
      teamMembers: 'Teammitglieder',
      recentActivity: 'Letzte Aktivitäten'
    },
    activity: {
      title: 'Letzte Aktivitäten',
      timeAgo: 'vor {time}',
      day: 'Tag | Tage'
    }
  },
  organizations: {
    title: 'Organisationen',
    addNew: 'Organisation hinzufügen',
    notes: {
      title: 'Notizen',
      edit: 'Notizen bearbeiten'
    },
    status: {
      active: 'Aktiv',
      inactive: 'Inaktiv'
    },
    billing: {
      title: 'Abrechnung',
      currentPlan: 'Aktueller Plan',
      upgradePlan: 'Plan upgraden',
      freeTrial: 'Kostenlose Testversion',
      trialEnds: 'Ihre Testversion endet in {days} Tagen',
      paymentMethods: 'Zahlungsmethoden',
      addPaymentMethod: 'Zahlungsmethode hinzufügen',
      noPaymentMethods: 'Noch keine Zahlungsmethoden hinzugefügt',
      addCreditCard: 'Fügen Sie eine Kreditkarte hinzu, um automatische Zahlungen zu aktivieren',
      billingHistory: 'Abrechnungsverlauf',
      export: 'Exportieren',
      noInvoices: 'Noch keine Rechnungen',
      invoicesWillAppear: 'Ihr Abrechnungsverlauf erscheint hier, sobald Sie kostenpflichtige Funktionen nutzen',
      comingSoon: 'Abrechnungsfunktionen kommen bald! Wir arbeiten an der Integration von Stripe für sichere Zahlungen.'
    },
    integrations: {
      title: 'Integrationen',
      configureApiKey: 'API-Schlüssel konfigurieren',
      tiaPortal: {
        description: 'Verbinden Sie sich mit TIA Portal für automatisierte SPS-Programmierung und -Konfiguration.',
        title: 'TIA Portal Integration',
        apiKeyLabel: 'TIA Portal API-Schlüssel',
        apiKeyDescription: 'Geben Sie Ihren TIA Portal API-Schlüssel ein, um automatisierte SPS-Programmierung und -Konfiguration zu aktivieren.'
      },
      eplan: {
        description: 'Integration mit EPLAN für Elektrotechnik und Dokumentation.',
        title: 'EPLAN Integration',
        apiKeyLabel: 'EPLAN API-Schlüssel',
        apiKeyDescription: 'Geben Sie Ihren EPLAN API-Schlüssel ein, um die Elektrotechnik-Integration zu aktivieren.'
      },
      comingSoon: 'Demnächst verfügbar'
    },
    integrations: {
      title: 'Integrationen',
      configureApiKey: 'API-Schlüssel konfigurieren',
      tiaPortal: {
        description: 'Verbinden Sie sich mit TIA Portal für automatisierte SPS-Programmierung und -Konfiguration.',
        title: 'TIA Portal Integration',
        apiKeyLabel: 'TIA Portal API-Schlüssel',
        apiKeyDescription: 'Geben Sie Ihren TIA Portal API-Schlüssel ein, um automatisierte SPS-Programmierung und -Konfiguration zu aktivieren.'
      },
      eplan: {
        description: 'Integration mit EPLAN für Elektrotechnik und Dokumentation.',
        title: 'EPLAN Integration',
        apiKeyLabel: 'EPLAN API-Schlüssel',
        apiKeyDescription: 'Geben Sie Ihren EPLAN API-Schlüssel ein, um die Elektrotechnik-Integration zu aktivieren.'
      },
      comingSoon: 'Demnächst verfügbar'
    },
    details: {
      title: 'Details',
      address: {
        edit: 'Adresse bearbeiten',
        street: 'Straße',
        streetRequired: 'Straße ist erforderlich',
        city: 'Stadt',
        cityRequired: 'Stadt ist erforderlich',
        state: 'Bundesland',
        stateRequired: '{label} ist erforderlich',
        postalCode: 'Postleitzahl',
        postalCodeRequired: 'Postleitzahl ist erforderlich',
        country: 'Land',
        countryRequired: 'Land ist erforderlich'
      },
      name: {
        edit: 'Organisationsname bearbeiten',
        name: 'Organisationsname',
        nameRequired: 'Organisationsname ist erforderlich'
      },
      logo: {
        update: 'Organisationslogo aktualisieren',
        dropHint: 'Logo hier ablegen oder zum Auswählen klicken',
        supportedFormats: 'Unterstützte Formate: PNG, JPG, GIF',
        invalidFormat: 'Bitte wählen Sie eine gültige Bilddatei (PNG, JPG oder GIF)',
        fileTooLarge: 'Dateigröße muss kleiner als 5MB sein',
        uploadFailed: 'Logo konnte nicht hochgeladen werden'
      },
      address: {
        edit: 'Adresse bearbeiten'
      },
      contact: {
        edit: 'Kontaktname bearbeiten',
        editEmail: 'Kontakt-E-Mail bearbeiten',
        updatePhone: 'Telefonnummer aktualisieren'
      },
      website: {
        edit: 'Website-URL bearbeiten'
      },
      timezone: {
        edit: 'Zeitzone bearbeiten',
        label: 'Zeitzone',
        required: 'Zeitzone ist erforderlich'
      },
      notes: {
        edit: 'Notizen bearbeiten'
      }
    },
    organization: 'Organisation',
    name: 'Organisationsname',
    nameRequired: 'Organisationsname ist erforderlich',
    addedOn: 'Hinzugefügt am {date}',
    noOrganizations: 'Keine Organisationen gefunden',
    failedToLoad: 'Fehler beim Laden der Organisationen',
    failedToCreate: 'Fehler beim Erstellen der Organisation',
    failedToUpdate: 'Fehler beim Aktualisieren der Organisation',
    failedToDelete: 'Fehler beim Löschen der Organisation',
    users: {
      title: 'Organisationsbenutzer',
      noUsers: 'Keine Benutzer gefunden',
      noUsersCaption: 'Fügen Sie Benutzer zu Ihrer Organisation hinzu, um die Zusammenarbeit zu beginnen',
      addUser: 'Benutzer hinzufügen',
      editRole: 'Rolle bearbeiten',
      remove: 'Entfernen',
      removeTitle: 'Benutzer entfernen',
      removeConfirm: 'Sind Sie sicher, dass Sie {name} aus dieser Organisation entfernen möchten?',
      removeWarning: 'Diese Aktion kann nicht rückgängig gemacht werden.',
      onlyAdminsCanAdd: 'Nur Administratoren können Benutzer hinzufügen',
      selectOrganization: 'Organisation auswählen',
      roles: {
        administrator: 'Administrator',
        user: 'Benutzer'
      },
      edit: {
        title: 'Rolle bearbeiten',
        role: 'Rolle',
        roleRequired: 'Rolle ist erforderlich'
      }
    }
  },
  time: {
    ago: 'vor {time}',
    minute: 'Minute | Minuten',
    hour: 'Stunde | Stunden',
    day: 'Tag | Tage',
    week: 'Woche | Wochen',
    month: 'Monat | Monate'
  }
}