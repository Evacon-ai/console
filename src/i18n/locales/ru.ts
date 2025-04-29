export default {
  common: {
    signIn: 'Войти',
    signOut: 'Выйти',
    table: {
      recordsPerPage: 'Записей на странице',
      noData: 'Нет данных',
      noResults: 'Ничего не найдено',
      loading: 'Загрузка...',
      selectedRecords: 'Выбранные записи',
      rowsPerPage: 'Строк на странице:'
    },
    email: 'Эл. почта',
    password: 'Пароль',
    rememberMe: 'Запомнить меня',
    forgotPassword: 'Забыли пароль?',
    back: 'Назад',
    home: 'Главная',
    projects: 'Проекты',
    profile: 'Профиль',
    organizations: 'Организации',
    newProject: 'Новый проект',
    cancel: 'Отмена',
    continue: 'Продолжить',
    finish: 'Завершить',
    close: 'Закрыть',
    processing: 'Обработка',
    success: 'Успешно',
    pleaseWait: 'Пожалуйста, подождите...',
    refresh: 'Обновить',
    download: 'Скачать',
    language: 'Язык',
    save: 'Сохранить',
    theme: 'Тема',
    lightMode: 'Светлая тема',
    darkMode: 'Тёмная тема'
  },
  auth: {
    signInTitle: 'Войдите в свой аккаунт',
    signUpTitle: 'Создайте аккаунт',
    signUp: 'Регистрация',
    needAccount: 'Нужен аккаунт? Зарегистрируйтесь',
    haveAccount: 'Уже есть аккаунт? Войдите',
    emailRequired: 'Требуется эл. почта',
    passwordRequired: 'Требуется пароль',
    resetPassword: 'Сброс пароля',
    resetPasswordInstructions: 'Введите свой адрес электронной почты, и мы отправим вам инструкции по сбросу пароля.',
    sendResetLink: 'Отправить ссылку для сброса',
    resetPasswordSuccess: 'Проверьте свою электронную почту для получения инструкций по сбросу пароля.',
    invalidResetLink: 'Недействительная или просроченная ссылка для сброса пароля.',
    passwordResetSuccess: 'Ваш пароль был успешно сброшен.',
    rateLimitExceeded: 'Слишком много попыток. Пожалуйста, попробуйте снова через несколько минут.',
    setNewPassword: 'Установить новый пароль',
    setNewPasswordInstructions: 'Пожалуйста, введите новый пароль ниже.',
    newPassword: 'Новый пароль',
    confirmPassword: 'Подтвердите пароль',
    confirmPasswordRequired: 'Пожалуйста, подтвердите пароль',
    passwordTooShort: 'Пароль должен содержать не менее 8 символов',
    passwordsDoNotMatch: 'Пароли не совпадают'
  },
  users: {
    title: 'Пользователи',
    noUsersFound: 'Пользователи не найдены',
    searchUsers: 'Поиск пользователей',
    fullName: 'Полное имя',
    failedToLoadUsers: 'Не удалось загрузить пользователей',
    failedToCreateUser: 'Не удалось создать пользователя',
    failedToUpdateUser: 'Не удалось обновить пользователя',
    failedToDeleteUser: 'Не удалось удалить пользователя',
    confirmDelete: 'Удалить пользователя',
    confirmDeleteMessage: 'Вы уверены, что хотите удалить этого пользователя? Это действие нельзя отменить.',
    evaconStaff: 'Сотрудники Evacon',
    customerUsers: 'Пользователи-клиенты',
    addUser: 'Добавить пользователя',
    editUser: 'Редактировать пользователя',
    deleteUser: 'Удалить пользователя',
    deleteConfirmation: 'Вы уверены, что хотите удалить этого пользователя?',
    userDeleted: 'Пользователь успешно удален',
    userUpdated: 'Пользователь успешно обновлен',
    userAdded: 'Пользователь успешно добавлен. Отправлено письмо для сброса пароля.',
    firstName: 'Имя',
    lastName: 'Фамилия',
    firstNameRequired: 'Имя обязательно',
    lastNameRequired: 'Фамилия обязательна',
    invalidEmail: 'Пожалуйста, введите действительный адрес электронной почты',
    role: 'Роль',
    level: 'Уровень',
    addedBy: 'Добавлено пользователем {name} {date}',
    updatedBy: 'Последнее обновление от {name} {date}',
    levels: {
      customer: 'Клиент',
      evacon: 'Evacon'
    }
  },
  projects: {
    title: 'Проекты',
    createNew: 'Создать новый проект',
    description: 'Описание',
    projectDescription: 'Описание проекта',
    generated: '{time} назад',
    wizard: {
      projectName: 'Название проекта',
      nameYourProject: 'Назовите ваш проект',
      projectNamePlaceholder: 'Введите название проекта',
      fdsTitle: 'Файл FDS',
      fdsUpload: 'Загрузить файл FDS',
      setPointTitle: 'Файл уставок',
      setPointUpload: 'Загрузить файл уставок',
      designTitle: 'Файл проекта',
      designUpload: 'Загрузить файл проекта',
      ioTitle: 'Файл ввода/вывода',
      ioUpload: 'Загрузить файл ввода/вывода',
      processingTitle: 'Обработка файлов',
      uploadToTIA: 'Загрузить в TIA Portal'
    }
  },
  profile: {
    title: 'Профиль',
    role: 'Роль',
    company: 'Компания',
    joined: 'Присоединился {date}',
    contactInfo: 'Контактная информация',
    companyInfo: 'Информация о компании',
    accountInfo: 'Информация об аккаунте',
    personalInfo: 'Личная информация',
    editProfile: 'Редактировать профиль',
    saveChanges: 'Сохранить изменения',
    roles: {
      evacon_admin: 'Администратор Evacon',
      evacon_staff: 'Сотрудник Evacon',
      evacon_user: 'Сотрудник Evacon',
      customer_admin: 'Администратор клиента',
      customer_user: 'Пользователь клиента',
      user: 'Пользователь',
      admin: 'Администратор'
    }
  },
  dashboard: {
    title: 'Главная',
    stats: {
      activeProjects: 'Активные проекты',
      teamMembers: 'Члены команды',
      recentActivity: 'Последние действия'
    },
    activity: {
      title: 'Последние действия',
      timeAgo: '{time} назад',
      day: 'день | дня | дней'
    }
  },
  time: {
    ago: '{time} назад',
    minute: 'минута | минуты | минут',
    hour: 'час | часа | часов',
    day: 'день | дня | дней',
    week: 'неделя | недели | недель',
    month: 'месяц | месяца | месяцев'
  },
  organizations: {
    title: 'Организации',
    addNew: 'Добавить организацию',
    notes: {
      title: 'Заметки',
      edit: 'Редактировать заметки'
    },
    details: {
      title: 'Детали',
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
      },
      address: {
        edit: 'Редактировать адрес',
        street: 'Улица',
        streetRequired: 'Улица обязательна',
        city: 'Город',
        cityRequired: 'Город обязателен',
        state: 'Штат',
        province: 'Провинция',
        stateTerritory: 'Штат/Территория',
        stateProvince: 'Штат/Провинция',
        stateRequired: 'Штат/Провинция обязательна',
        postalCode: 'Почтовый индекс',
        postalCodeRequired: 'Почтовый индекс обязателен',
        country: 'Страна',
        countryRequired: 'Страна обязательна'
      },
      contact: {
        edit: 'Редактировать имя контакта',
        editEmail: 'Редактировать email контакта',
        updatePhone: 'Обновить номер телефона',
        name: 'Имя контакта',
        nameRequired: 'Имя контакта обязательно',
        email: 'Email контакта',
        emailTooLong: 'Адрес электронной почты слишком длинный'
      },
      website: {
        edit: 'Редактировать URL сайта',
        url: 'URL сайта',
        invalidUrl: 'Пожалуйста, введите действительный URL, начинающийся с http:// или https://',
        emptyHint: 'Оставьте пустым, если нет сайта'
      },
      timezone: {
        edit: 'Редактировать часовой пояс',
        label: 'Часовой пояс',
        required: 'Часовой пояс обязателен'
      },
      notes: {
        edit: 'Редактировать заметки'
      }
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
    organization: 'Организация',
    name: 'Название организации',
    nameRequired: 'Название организации обязательно',
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
}