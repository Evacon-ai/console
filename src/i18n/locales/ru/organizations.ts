export default {
  title: 'Организации',
  addNew: 'Добавить организацию',
  notes: {
    title: 'Заметки',
    edit: 'Редактировать заметки'
  },
  status: {
    active: 'Активен',
    inactive: 'Неактивен'
  },
  billing: {
    title: 'Оплата',
    currentPlan: 'Текущий план',
    upgradePlan: 'Улучшить план',
    freeTrial: 'Бесплатный период',
    trialEnds: 'Ваш пробный период заканчивается через {days} дней',
    paymentMethods: 'Способы оплаты',
    addPaymentMethod: 'Добавить способ оплаты',
    noPaymentMethods: 'Способы оплаты не добавлены',
    addCreditCard: 'Добавьте кредитную карту для автоматических платежей',
    billingHistory: 'История платежей',
    export: 'Экспорт',
    noInvoices: 'Нет счетов',
    invoicesWillAppear: 'История платежей появится здесь, когда вы начнете использовать платные функции',
    comingSoon: 'Функции оплаты скоро появятся! Мы работаем над интеграцией Stripe для безопасных платежей.'
  },
  integrations: {
    title: 'Интеграции',
    configureApiKey: 'Настроить API-ключ',
    tiaPortal: {
      description: 'Подключение к TIA Portal для автоматизированного программирования и настройки ПЛК.',
      title: 'Интеграция с TIA Portal',
      apiKeyLabel: 'API-ключ TIA Portal',
      apiKeyDescription: 'Введите ваш API-ключ TIA Portal для включения автоматизированного программирования и настройки ПЛК.'
    },
    eplan: {
      description: 'Интеграция с EPLAN для электротехнического проектирования и документации.',
      title: 'Интеграция с EPLAN',
      apiKeyLabel: 'API-ключ EPLAN',
      apiKeyDescription: 'Введите ваш API-ключ EPLAN для включения интеграции электротехнического проектирования.'
    },
    comingSoon: 'Скоро'
  },
  details: {
    title: 'Детали',
    address: {
      edit: 'Редактировать адрес',
      street: 'Улица',
      streetRequired: 'Улица обязательна',
      city: 'Город',
      cityRequired: 'Город обязателен',
      state: 'Штат/Область',
      stateRequired: '{label} обязателен',
      postalCode: 'Почтовый индекс',
      postalCodeRequired: 'Почтовый индекс обязателен',
      country: 'Страна',
      countryRequired: 'Страна обязательна'
    },
    name: {
      edit: 'Редактировать название организации',
      name: 'Название организации',
      nameRequired: 'Название организации обязательно'
    },
    logo: {
      update: 'Обновить логотип организации',
      dropHint: 'Перетащите логотип сюда или нажмите для выбора',
      supportedFormats: 'Поддерживаемые форматы: PNG, JPG, GIF',
      invalidFormat: 'Пожалуйста, выберите допустимый файл изображения (PNG, JPG или GIF)',
      fileTooLarge: 'Размер файла должен быть меньше 5МБ',
      uploadFailed: 'Не удалось загрузить логотип'
    }
  },
  organization: 'Организация',
  name: 'Название организации',
  nameRequired: 'Название организации обязательно',
  projectCount: 'Проекты: {count}',
  viewProjects: 'Просмотр проектов организации',
  addedOn: 'Добавлено {date}',
  noOrganizations: 'Организации не найдены',
  failedToLoad: 'Не удалось загрузить организации',
  failedToCreate: 'Не удалось создать организацию',
  failedToUpdate: 'Не удалось обновить организацию',
  failedToDelete: 'Не удалось удалить организацию',
  users: {
    title: 'Пользователи организации',
    noUsers: 'Пользователи не найдены',
    noUsersCaption: 'Добавьте пользователей в вашу организацию, чтобы начать совместную работу',
    addUser: 'Добавить пользователя',
    editRole: 'Изменить роль',
    remove: 'Удалить',
    removeTitle: 'Удалить пользователя',
    removeConfirm: 'Вы уверены, что хотите удалить {name} из этой организации?',
    removeWarning: 'Это действие нельзя отменить.',
    onlyAdminsCanAdd: 'Только администраторы могут добавлять пользователей',
    onlyAdminsCanChangeStatus: 'Только администраторы могут изменять статус организации',
    selectOrganization: 'Выберите организацию',
    roles: {
      administrator: 'Администратор',
      user: 'Пользователь'
    },
    edit: {
      title: 'Изменить роль',
      role: 'Роль',
      roleRequired: 'Роль обязательна'
    }
  }
}