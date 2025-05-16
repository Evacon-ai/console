export default {
  title: 'Organizacje',
  addNew: 'Dodaj organizację',
  notes: {
    title: 'Notatki',
    edit: 'Edytuj notatki'
  },
  status: {
    active: 'Aktywny',
    inactive: 'Nieaktywny'
  },
  billing: {
    title: 'Rozliczenia',
    currentPlan: 'Aktualny plan',
    upgradePlan: 'Ulepsz plan',
    freeTrial: 'Darmowy okres próbny',
    trialEnds: 'Twój okres próbny kończy się za {days} dni',
    paymentMethods: 'Metody płatności',
    addPaymentMethod: 'Dodaj metodę płatności',
    noPaymentMethods: 'Nie dodano jeszcze metod płatności',
    addCreditCard: 'Dodaj kartę kredytową, aby włączyć automatyczne płatności',
    billingHistory: 'Historia rozliczeń',
    export: 'Eksportuj',
    noInvoices: 'Brak faktur',
    invoicesWillAppear: 'Twoja historia rozliczeń pojawi się tutaj, gdy zaczniesz korzystać z płatnych funkcji',
    comingSoon: 'Funkcje rozliczeń wkrótce! Pracujemy nad integracją Stripe dla bezpiecznych płatności.'
  },
  integrations: {
    title: 'Integracje',
    configureApiKey: 'Skonfiguruj klucz API',
    tiaPortal: {
      description: 'Połącz się z TIA Portal dla automatycznego programowania i konfiguracji PLC.',
      title: 'Integracja TIA Portal',
      apiKeyLabel: 'Klucz API TIA Portal',
      apiKeyDescription: 'Wprowadź swój klucz API TIA Portal, aby włączyć automatyczne programowanie i konfigurację PLC.'
    },
    eplan: {
      description: 'Integracja z EPLAN dla inżynierii elektrycznej i dokumentacji.',
      title: 'Integracja EPLAN',
      apiKeyLabel: 'Klucz API EPLAN',
      apiKeyDescription: 'Wprowadź swój klucz API EPLAN, aby włączyć integrację inżynierii elektrycznej.'
    },
    comingSoon: 'Wkrótce'
  },
  details: {
    title: 'Szczegóły',
    address: {
      edit: 'Edytuj adres',
      street: 'Ulica',
      streetRequired: 'Ulica jest wymagana',
      city: 'Miasto',
      cityRequired: 'Miasto jest wymagane',
      state: 'Województwo',
      stateRequired: '{label} jest wymagane',
      postalCode: 'Kod pocztowy',
      postalCodeRequired: 'Kod pocztowy jest wymagany',
      country: 'Kraj',
      countryRequired: 'Kraj jest wymagany'
    },
    contact: {
      edit: 'Edytuj kontakt',
      name: 'Nazwa',
      nameRequired: 'Nazwa kontaktu jest wymagana',
      editEmail: 'Edytuj email',
      email: 'Email',
      emailRequired: 'Email jest wymagany',
      emailTooLong: 'Email musi mieć mniej niż 255 znaków',
      phone: 'Telefon',
      updatePhone: 'Aktualizuj telefon',
      phoneNumber: 'Numer telefonu',
      countryCode: 'Kod kraju',
      chooseCountry: 'Wybierz kraj',
      searchCountry: 'Szukaj kraju',
      example: 'Przykład:',
      invalidPhone: 'Proszę podać prawidłowy numer telefonu'
    },
    website: {
      edit: 'Edytuj stronę internetową',
      url: 'Adres strony internetowej',
      invalidUrl: 'Proszę podać prawidłowy URL',
      emptyHint: 'Pozostaw puste jeśli brak strony'
    },
    name: {
      edit: 'Edytuj nazwę organizacji',
      name: 'Nazwa organizacji',
      nameRequired: 'Nazwa organizacji jest wymagana'
    },
    logo: {
      update: 'Zaktualizuj logo organizacji',
      dropHint: 'Upuść logo tutaj lub kliknij, aby wybrać',
      supportedFormats: 'Obsługiwane formaty: PNG, JPG, GIF',
      invalidFormat: 'Wybierz prawidłowy plik obrazu (PNG, JPG lub GIF)',
      fileTooLarge: 'Rozmiar pliku musi być mniejszy niż 5MB',
      uploadFailed: 'Nie udało się przesłać logo'
    },
    timezone: {
      edit: 'Edytuj strefę czasową',
      label: 'Strefa czasowa',
      required: 'Strefa czasowa jest wymagana'
    },
    notes: {
      edit: 'Edytuj notatki',
      notes: 'Notatki',
      notesRequired: 'Notatki są wymagane'
    }
  },
  organization: 'Organizacja',
  name: 'Nazwa organizacji',
  nameRequired: 'Nazwa organizacji jest wymagana',
  projectCount: 'Projekty: {count}',
  viewProjects: 'Zobacz projekty organizacji',
  addedOn: 'Dodano {date}',
  noOrganizations: 'Nie znaleziono organizacji',
  failedToLoad: 'Nie udało się załadować organizacji',
  failedToCreate: 'Nie udało się utworzyć organizacji',
  failedToUpdate: 'Nie udało się zaktualizować organizacji',
  failedToDelete: 'Nie udało się usunąć organizacji',
  users: {
    title: 'Użytkownicy organizacji',
    noUsers: 'Nie znaleziono użytkowników',
    noUsersCaption: 'Dodaj użytkowników do swojej organizacji, aby rozpocząć współpracę',
    addUser: 'Dodaj użytkownika',
    editRole: 'Edytuj rolę',
    remove: 'Usuń',
    removeTitle: 'Usuń użytkownika',
    removeConfirm: 'Czy na pewno chcesz usunąć {name} z tej organizacji?',
    removeWarning: 'Tej akcji nie można cofnąć.',
    onlyAdminsCanAdd: 'Tylko administratorzy mogą dodawać użytkowników',
    onlyAdminsCanChangeStatus: 'Tylko administratorzy mogą zmienić status organizacji',
    selectOrganization: 'Wybierz organizację',
    roles: {
      administrator: 'Administrator',
      user: 'Użytkownik'
    },
    edit: {
      title: 'Edytuj rolę',
      role: 'Rola',
      roleRequired: 'Rola jest wymagana'
    }
  }
}