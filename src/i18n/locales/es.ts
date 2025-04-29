export default {
  common: {
    signIn: 'Iniciar sesión',
    signOut: 'Cerrar sesión',
    table: {
      recordsPerPage: 'Registros por página',
      noData: 'No hay datos disponibles',
      noResults: 'No se encontraron registros coincidentes',
      loading: 'Cargando...',
      selectedRecords: 'Registros seleccionados',
      rowsPerPage: 'Filas por página:'
    },
    email: 'Correo electrónico',
    password: 'Contraseña',
    rememberMe: 'Recordarme',
    forgotPassword: '¿Olvidó su contraseña?',
    home: 'Inicio',
    projects: 'Proyectos',
    profile: 'Perfil',
    organizations: 'Organizaciones',
    newProject: 'Nuevo Proyecto',
    cancel: 'Cancelar',
    continue: 'Continuar',
    finish: 'Finalizar',
    back: 'Atrás',
    close: 'Cerrar',
    processing: 'Procesando',
    success: 'Éxito',
    pleaseWait: 'Por favor espere...',
    refresh: 'Actualizar',
    download: 'Descargar',
    language: 'Idioma',
    save: 'Guardar',
    save: 'Guardar',
    theme: 'Tema',
    lightMode: 'Modo Claro',
    darkMode: 'Modo Oscuro'
  },
  projects: {
    title: 'Proyectos',
    createNew: 'Crear Nuevo Proyecto',
    description: 'Descripción',
    projectDescription: 'Descripción del Proyecto',
    generated: 'hace {time}',
    wizard: {
      projectName: 'Nombre del Proyecto',
      nameYourProject: 'Nombre su proyecto',
      projectNamePlaceholder: 'Ingrese el nombre del proyecto',
      fdsTitle: 'Archivo FDS',
      fdsUpload: 'Subir archivo FDS',
      setPointTitle: 'Archivo de Punto de Ajuste',
      setPointUpload: 'Subir archivo de punto de ajuste',
      designTitle: 'Archivo de Diseño',
      designUpload: 'Subir archivo de diseño',
      ioTitle: 'Archivo E/S',
      ioUpload: 'Subir archivo E/S',
      processingTitle: 'Procesando Archivos',
      uploadToTIA: 'Subir a TIA Portal'
    }
  },
  auth: {
    signInTitle: 'Inicie sesión en su cuenta',
    signUpTitle: 'Cree su cuenta',
    signUp: 'Registrarse',
    needAccount: '¿Necesita una cuenta? Regístrese',
    haveAccount: '¿Ya tiene una cuenta? Inicie sesión',
    emailRequired: 'El correo electrónico es requerido',
    passwordRequired: 'La contraseña es requerida',
    resetPassword: 'Restablecer contraseña',
    resetPasswordInstructions: 'Ingrese su correo electrónico y le enviaremos instrucciones para restablecer su contraseña.',
    sendResetLink: 'Enviar enlace de restablecimiento',
    resetPasswordSuccess: 'Revise su correo electrónico para obtener instrucciones de restablecimiento de contraseña.',
    invalidResetLink: 'Enlace de restablecimiento de contraseña inválido o expirado.',
    passwordResetSuccess: 'Su contraseña ha sido restablecida exitosamente.',
    rateLimitExceeded: 'Demasiados intentos. Por favor, inténtelo de nuevo en unos minutos.',
    setNewPassword: 'Establecer nueva contraseña',
    setNewPasswordInstructions: 'Por favor, ingrese su nueva contraseña abajo.',
    newPassword: 'Nueva contraseña',
    confirmPassword: 'Confirmar contraseña',
    confirmPasswordRequired: 'Por favor confirme su contraseña',
    passwordTooShort: 'La contraseña debe tener al menos 8 caracteres',
    passwordsDoNotMatch: 'Las contraseñas no coinciden'
  },
  users: {
    title: 'Usuarios',
    noUsersFound: 'No se encontraron usuarios',
    searchUsers: 'Buscar usuarios',
    fullName: 'Nombre completo',
    failedToLoadUsers: 'Error al cargar usuarios',
    failedToCreateUser: 'Error al crear usuario',
    failedToUpdateUser: 'Error al actualizar usuario',
    failedToDeleteUser: 'Error al eliminar usuario',
    confirmDelete: 'Eliminar Usuario',
    confirmDeleteMessage: '¿Está seguro de que desea eliminar este usuario? Esta acción no se puede deshacer.',
    evaconStaff: 'Personal de Evacon',
    customerUsers: 'Usuarios Cliente',
    addUser: 'Agregar Usuario',
    editUser: 'Editar Usuario',
    deleteUser: 'Eliminar Usuario',
    deleteConfirmation: '¿Está seguro de que desea eliminar este usuario?',
    userDeleted: 'Usuario eliminado exitosamente',
    userUpdated: 'Usuario actualizado exitosamente',
    userAdded: 'Usuario agregado exitosamente. Se ha enviado un correo electrónico para restablecer la contraseña.',
    firstName: 'Nombre',
    lastName: 'Apellido',
    firstNameRequired: 'El nombre es requerido',
    lastNameRequired: 'El apellido es requerido',
    invalidEmail: 'Por favor ingrese un correo electrónico válido',
    role: 'Rol',
    level: 'Nivel',
    addedBy: 'Agregado por {name} {date}',
    updatedBy: 'Última actualización por {name} {date}',
    levels: {
      customer: 'Cliente',
      evacon: 'Evacon'
    }
  },
  profile: {
    title: 'Perfil',
    role: 'Rol',
    company: 'Empresa',
    joined: 'Se unió en {date}',
    contactInfo: 'Información de Contacto',
    companyInfo: 'Información de la Empresa',
    accountInfo: 'Información de la Cuenta',
    personalInfo: 'Información Personal',
    editProfile: 'Editar Perfil',
    saveChanges: 'Guardar Cambios',
    roles: {
      evacon_admin: 'Administrador de Evacon',
      evacon_staff: 'Personal de Evacon',
      evacon_user: 'Personal de Evacon',
      customer_admin: 'Administrador de Cliente',
      customer_user: 'Usuario de Cliente',
      user: 'Usuario',
      admin: 'Administrador'
    }
  },
  dashboard: {
    title: 'Inicio',
    stats: {
      activeProjects: 'Proyectos Activos',
      teamMembers: 'Miembros del Equipo',
      recentActivity: 'Actividad Reciente'
    },
    activity: {
      title: 'Actividad Reciente',
      timeAgo: 'hace {time}',
      day: 'día | días'
    }
  },
  organizations: {
    title: 'Organizaciones',
    addNew: 'Agregar organización',
    notes: {
      title: 'Notas',
      edit: 'Editar notas'
    },
    status: {
      active: 'Activo',
      inactive: 'Inactivo'
    },
    billing: {
      title: 'Facturación',
      currentPlan: 'Plan actual',
      upgradePlan: 'Mejorar plan',
      freeTrial: 'Prueba gratuita',
      trialEnds: 'Su prueba termina en {days} días',
      paymentMethods: 'Métodos de pago',
      addPaymentMethod: 'Agregar método de pago',
      noPaymentMethods: 'No se han agregado métodos de pago',
      addCreditCard: 'Agregue una tarjeta de crédito para habilitar pagos automáticos',
      billingHistory: 'Historial de facturación',
      export: 'Exportar',
      noInvoices: 'No hay facturas aún',
      invoicesWillAppear: 'Su historial de facturación aparecerá aquí una vez que comience a usar funciones pagas',
      comingSoon: '¡Funciones de facturación próximamente! Estamos trabajando en la integración de Stripe para pagos seguros.'
    },
    integrations: {
      title: 'Integraciones',
      configureApiKey: 'Configurar clave API',
      tiaPortal: {
        description: 'Conéctese a TIA Portal para programación y configuración automatizada de PLC.',
        title: 'Integración TIA Portal',
        apiKeyLabel: 'Clave API de TIA Portal',
        apiKeyDescription: 'Ingrese su clave API de TIA Portal para habilitar la programación y configuración automatizada de PLC.'
      },
      eplan: {
        description: 'Integración con EPLAN para ingeniería eléctrica y documentación.',
        title: 'Integración EPLAN',
        apiKeyLabel: 'Clave API de EPLAN',
        apiKeyDescription: 'Ingrese su clave API de EPLAN para habilitar la integración de ingeniería eléctrica.'
      },
      comingSoon: 'Próximamente'
    },
    integrations: {
      title: 'Integraciones',
      configureApiKey: 'Configurar clave API',
      tiaPortal: {
        description: 'Conéctese a TIA Portal para programación y configuración automatizada de PLC.',
        title: 'Integración TIA Portal',
        apiKeyLabel: 'Clave API de TIA Portal',
        apiKeyDescription: 'Ingrese su clave API de TIA Portal para habilitar la programación y configuración automatizada de PLC.'
      },
      eplan: {
        description: 'Integración con EPLAN para ingeniería eléctrica y documentación.',
        title: 'Integración EPLAN',
        apiKeyLabel: 'Clave API de EPLAN',
        apiKeyDescription: 'Ingrese su clave API de EPLAN para habilitar la integración de ingeniería eléctrica.'
      },
      comingSoon: 'Próximamente'
    },
    details: {
      title: 'Detalles',
      address: {
        edit: 'Editar dirección',
        street: 'Calle',
        streetRequired: 'La calle es requerida',
        city: 'Ciudad',
        cityRequired: 'La ciudad es requerida',
        state: 'Estado/Provincia',
        stateRequired: '{label} es requerido',
        postalCode: 'Código postal',
        postalCodeRequired: 'El código postal es requerido',
        country: 'País',
        countryRequired: 'El país es requerido'
      },
      name: {
        edit: 'Editar nombre de la organización',
        name: 'Nombre de la organización',
        nameRequired: 'El nombre de la organización es requerido'
      },
      logo: {
        update: 'Actualizar logo de la organización',
        dropHint: 'Suelta tu logo aquí o haz clic para seleccionar',
        supportedFormats: 'Formatos soportados: PNG, JPG, GIF',
        invalidFormat: 'Por favor selecciona un archivo de imagen válido (PNG, JPG o GIF)',
        fileTooLarge: 'El tamaño del archivo debe ser menor a 5MB',
        uploadFailed: 'Error al subir el logo'
      },
      address: {
        edit: 'Editar dirección'
      },
      contact: {
        edit: 'Editar nombre de contacto',
        editEmail: 'Editar correo electrónico de contacto',
        updatePhone: 'Actualizar número de teléfono'
      },
      website: {
        edit: 'Editar URL del sitio web'
      },
      timezone: {
        edit: 'Editar zona horaria',
        label: 'Zona horaria',
        required: 'La zona horaria es requerida'
      },
      notes: {
        edit: 'Editar notas'
      }
    },
    organization: 'Organización',
    name: 'Nombre de la organización',
    nameRequired: 'El nombre de la organización es requerido',
    addedOn: 'Agregado el {date}',
    noOrganizations: 'No se encontraron organizaciones',
    failedToLoad: 'Error al cargar las organizaciones',
    failedToCreate: 'Error al crear la organización',
    failedToUpdate: 'Error al actualizar la organización',
    failedToDelete: 'Error al eliminar la organización',
    users: {
      title: 'Usuarios de la organización',
      noUsers: 'No se encontraron usuarios',
      noUsersCaption: 'Agregue usuarios a su organización para comenzar a colaborar',
      addUser: 'Agregar usuario',
      editRole: 'Editar rol',
      remove: 'Eliminar',
      removeTitle: 'Eliminar usuario',
      removeConfirm: '¿Está seguro que desea eliminar a {name} de esta organización?',
      removeWarning: 'Esta acción no se puede deshacer.',
      onlyAdminsCanAdd: 'Solo los administradores pueden agregar usuarios',
      selectOrganization: 'Seleccionar organización',
      roles: {
        administrator: 'Administrador',
        user: 'Usuario'
      },
      edit: {
        title: 'Editar rol',
        role: 'Rol',
        roleRequired: 'El rol es requerido'
      }
    }
  },
  time: {
    ago: 'hace {time}',
    minute: 'minuto | minutos',
    hour: 'hora | horas',
    day: 'día | días',
    week: 'semana | semanas',
    month: 'mes | meses'
  }
}