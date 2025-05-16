export default {
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
    contact: {
      edit: 'Kontakt bearbeiten',
      name: 'Name',
      nameRequired: 'Kontaktname ist erforderlich',
      editEmail: 'E-Mail bearbeiten',
      email: 'E-Mail',
      emailRequired: 'E-Mail ist erforderlich',
      emailTooLong: 'E-Mail muss weniger als 255 Zeichen haben',
      phone: 'Telefon',
      updatePhone: 'Telefon aktualisieren',
      phoneNumber: 'Telefonnummer',
      countryCode: 'Ländercode',
      chooseCountry: 'Land auswählen',
      searchCountry: 'Land suchen',
      example: 'Beispiel:',
      invalidPhone: 'Bitte geben Sie eine gültige Telefonnummer ein'
    },
    website: {
      edit: 'Webseite bearbeiten',
      url: 'Webseite URL',
      invalidUrl: 'Bitte geben Sie eine gültige URL ein',
      emptyHint: 'Leer lassen, wenn keine Webseite vorhanden'
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
    timezone: {
      edit: 'Zeitzone bearbeiten',
      label: 'Zeitzone',
      required: 'Zeitzone ist erforderlich'
    },
    notes: {
      edit: 'Notizen bearbeiten',
      notes: 'Notizen',
      notesRequired: 'Notizen sind erforderlich'
    }
  },
  organization: 'Organisation',
  name: 'Organisationsname',
  nameRequired: 'Organisationsname ist erforderlich',
  projectCount: 'Projekte: {count}',
  viewProjects: 'Organisationsprojekte anzeigen',
  addedOn: '{date} hinzugefügt',
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
    onlyAdminsCanChangeStatus: 'Nur Administratoren können den Status der Organisation ändern',
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
}