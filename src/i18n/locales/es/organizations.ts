export default {
  title: 'Organizaciones',
  addNew: 'Agregar Organización',
  notes: {
    title: 'Notas',
    edit: 'Editar Notas'
  },
  status: {
    active: 'Activo',
    inactive: 'Inactivo'
  },
  billing: {
    title: 'Facturación',
    currentPlan: 'Plan Actual',
    upgradePlan: 'Mejorar Plan',
    freeTrial: 'Prueba Gratuita',
    trialEnds: 'Su prueba termina en {days} días',
    paymentMethods: 'Métodos de Pago',
    addPaymentMethod: 'Agregar Método de Pago',
    noPaymentMethods: 'No se han agregado métodos de pago',
    addCreditCard: 'Agregue una tarjeta de crédito para habilitar pagos automáticos',
    billingHistory: 'Historial de Facturación',
    export: 'Exportar',
    noInvoices: 'No hay facturas aún',
    invoicesWillAppear: 'Su historial de facturación aparecerá aquí una vez que comience a usar funciones pagas',
    comingSoon: '¡Funciones de facturación próximamente! Estamos trabajando en la integración de Stripe para pagos seguros.'
  },
  integrations: {
    title: 'Integraciones',
    configureApiKey: 'Configurar Clave API',
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
      edit: 'Editar Dirección',
      street: 'Calle',
      streetRequired: 'La calle es requerida',
      city: 'Ciudad',
      cityRequired: 'La ciudad es requerida',
      state: 'Estado',
      province: 'Provincia',
      stateTerritory: 'Estado/Territorio',
      stateProvince: 'Estado/Provincia',
      stateRequired: 'El estado/provincia es requerido',
      postalCode: 'Código Postal',
      postalCodeRequired: 'El código postal es requerido',
      country: 'País',
      countryRequired: 'El país es requerido'
    },
    contact: {
      edit: 'Editar Contacto',
      name: 'Nombre',
      nameRequired: 'El nombre de contacto es requerido',
      editEmail: 'Editar correo electrónico',
      email: 'Correo electrónico',
      emailRequired: 'El correo electrónico es requerido',
      emailTooLong: 'El correo electrónico debe tener menos de 255 caracteres',
      phone: 'Teléfono',
      updatePhone: 'Actualizar teléfono',
      phoneNumber: 'Número de teléfono',
      countryCode: 'Código de país',
      chooseCountry: 'Elegir país',
      searchCountry: 'Buscar un país',
      example: 'Ejemplo:',
      invalidPhone: 'Por favor ingrese un número de teléfono válido'
    },
    website: {
      edit: 'Editar sitio web',
      url: 'URL del sitio web',
      invalidUrl: 'Por favor ingrese una URL válida',
      emptyHint: 'Dejar vacío si no hay sitio web'
    },
    name: {
      edit: 'Editar Nombre de la Organización',
      name: 'Nombre de la Organización',
      nameRequired: 'El nombre de la organización es requerido'
    },
    logo: {
      update: 'Actualizar Logo de la Organización',
      dropHint: 'Suelte su logo aquí o haga clic para seleccionar',
      supportedFormats: 'Formatos soportados: PNG, JPG, GIF',
      invalidFormat: 'Por favor seleccione un archivo de imagen válido (PNG, JPG o GIF)',
      fileTooLarge: 'El tamaño del archivo debe ser menor a 5MB',
      uploadFailed: 'Error al subir el logo'
    },
    timezone: {
      edit: 'Editar zona horaria',
      label: 'Zona horaria',
      required: 'La zona horaria es requerida'
    },
    notes: {
      edit: 'Editar notas',
      notes: 'Notas',
      notesRequired: 'Las notas son requeridas'
    }
  },
  organization: 'Organización',
  name: 'Nombre de la Organización',
  nameRequired: 'El nombre de la organización es requerido',
  projectCount: 'Proyectos: {count}',
  viewProjects: 'Ver proyectos de la organización',
  addedOn: 'Agregado {date}',
  noOrganizations: 'No se encontraron organizaciones',
  failedToLoad: 'Error al cargar las organizaciones',
  failedToCreate: 'Error al crear la organización',
  failedToUpdate: 'Error al actualizar la organización',
  failedToDelete: 'Error al eliminar la organización',
  users: {
    title: 'Usuarios de la Organización',
    noUsers: 'No se encontraron usuarios',
    noUsersCaption: 'Agregue usuarios a su organización para comenzar a colaborar',
    addUser: 'Agregar Usuario',
    editRole: 'Editar Rol',
    remove: 'Eliminar',
    removeTitle: 'Eliminar Usuario',
    removeConfirm: '¿Está seguro que desea eliminar a {name} de esta organización?',
    removeWarning: 'Esta acción no se puede deshacer.',
    onlyAdminsCanAdd: 'Solo los administradores pueden agregar usuarios',
    onlyAdminsCanChangeStatus: 'Solo los administradores pueden cambiar el estado de la organización',
    selectOrganization: 'Seleccionar organización',
    roles: {
      administrator: 'Administrador',
      user: 'Usuario'
    },
    edit: {
      title: 'Editar Rol',
      role: 'Rol',
      roleRequired: 'El rol es requerido'
    }
  }
}