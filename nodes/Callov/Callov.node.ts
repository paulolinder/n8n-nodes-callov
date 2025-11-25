import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
	ILoadOptionsFunctions,
	INodePropertyOptions,
	ISupplyDataFunctions,
	SupplyData,
} from 'n8n-workflow';

export class Callov implements INodeType {
	methods = {
		loadOptions: {
			async getClients(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const baseUrl = 'https://zvlknadahupckbpjgvjf.supabase.co/functions/v1';
				const returnData: INodePropertyOptions[] = [];

				try {
					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						'callovApi',
						{
							method: 'GET',
							url: `${baseUrl}/api-clients?limit=100`,
							json: true,
						},
					);

					const responseData = response as IDataObject;
					if (responseData.data && Array.isArray(responseData.data)) {
						for (const client of responseData.data) {
							const clientData = client as IDataObject;
							returnData.push({
								name: clientData.full_name as string,
								value: clientData.id as string,
								description: clientData.email as string || clientData.phone as string,
							});
						}
					}
				} catch (error) {
					// Return empty array if error
				}

				return returnData;
			},

			async getTeamMembers(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const baseUrl = 'https://zvlknadahupckbpjgvjf.supabase.co/functions/v1';
				const returnData: INodePropertyOptions[] = [];

				try {
					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						'callovApi',
						{
							method: 'GET',
							url: `${baseUrl}/api-team-members?limit=100&is_active=true`,
							json: true,
						},
					);

					const responseData = response as IDataObject;
					if (responseData.data && Array.isArray(responseData.data)) {
						for (const member of responseData.data) {
							const memberData = member as IDataObject;
							returnData.push({
								name: memberData.full_name as string,
								value: memberData.id as string,
								description: memberData.specialty as string || memberData.email as string,
							});
						}
					}
				} catch (error) {
					// Return empty array if error
				}

				return returnData;
			},

			async getServices(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const baseUrl = 'https://zvlknadahupckbpjgvjf.supabase.co/functions/v1';
				const returnData: INodePropertyOptions[] = [];

				try {
					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						'callovApi',
						{
							method: 'GET',
							url: `${baseUrl}/api-services?limit=100`,
							json: true,
						},
					);

					const responseData = response as IDataObject;
					if (responseData.data && Array.isArray(responseData.data)) {
						for (const service of responseData.data) {
							const serviceData = service as IDataObject;
							returnData.push({
								name: serviceData.name as string,
								value: serviceData.id as string,
								description: `${serviceData.duration_minutes || ''} min - ${serviceData.price || ''}`,
							});
						}
					}
				} catch (error) {
					// Return empty array if error
				}

				return returnData;
			},
		},
	};

	description: INodeTypeDescription = {
		displayName: 'Callov',
		name: 'callov',
		icon: 'file:callov.png',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Callov API for appointments and clients',
		defaults: {
			name: 'Callov',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'callovApi',
				required: true,
			},
		],
		usableAsTool: true,
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Appointment',
						value: 'appointment',
					},
					{
						name: 'Client',
						value: 'client',
					},
					{
						name: 'Service',
						value: 'service',
					},
					{
						name: 'Team Member',
						value: 'teamMember',
					},
				],
				default: 'appointment',
			},

			// Appointment Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['appointment'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new appointment',
						action: 'Create an appointment',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Cancel an appointment',
						action: 'Delete an appointment',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get an appointment by ID',
						action: 'Get an appointment',
					},
					{
						name: 'Get Availability',
						value: 'getAvailability',
						description: 'Get available time slots for a team member',
						action: 'Get availability',
					},
					{
						name: 'Get By Client Phone',
						value: 'getByClientPhone',
						description: 'Get appointments by client phone number',
						action: 'Get appointments by client phone',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many appointments',
						action: 'Get many appointments',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update an appointment',
						action: 'Update an appointment',
					},
				],
				default: 'getAll',
			},

			// Client Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['client'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new client',
						action: 'Create a client',
					},
					{
						name: 'Get By Phone',
						value: 'getByPhone',
						description: 'Get a client by phone number',
						action: 'Get a client by phone',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many clients',
						action: 'Get many clients',
					},
				],
				default: 'getAll',
			},

			// Service Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['service'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new service',
						action: 'Create a service',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a service',
						action: 'Delete a service',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a service by ID',
						action: 'Get a service',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many services',
						action: 'Get many services',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a service',
						action: 'Update a service',
					},
				],
				default: 'getAll',
			},

			// Team Member Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['teamMember'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a team member by ID',
						action: 'Get a team member',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many team members',
						action: 'Get many team members',
					},
				],
				default: 'getAll',
			},

			// Appointment: Get
			{
				displayName: 'Appointment ID',
				name: 'appointmentId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['appointment'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
				description: 'The ID of the appointment',
			},

			// Appointment: Get By Client Phone
			{
				displayName: 'Client Phone',
				name: 'clientPhoneNumber',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['appointment'],
						operation: ['getByClientPhone'],
					},
				},
				default: '',
				placeholder: '(11) 99999-9999 or 11999999999',
				description: 'Phone number of the client to search appointments',
			},
			{
				displayName: 'Additional Filters',
				name: 'additionalFilters',
				type: 'collection',
				placeholder: 'Add Filter',
				default: {},
				displayOptions: {
					show: {
						resource: ['appointment'],
						operation: ['getByClientPhone'],
					},
				},
				options: [
					{
						displayName: 'Status',
						name: 'status',
						type: 'options',
						options: [
							{
								name: 'Scheduled',
								value: 'scheduled',
							},
							{
								name: 'Confirmed',
								value: 'confirmed',
							},
							{
								name: 'Completed',
								value: 'completed',
							},
							{
								name: 'Canceled',
								value: 'canceled',
							},
							{
								name: 'No Show',
								value: 'no_show',
							},
						],
						default: '',
						description: 'Filter by appointment status',
					},
					{
						displayName: 'Start Date',
						name: 'start_date',
						type: 'dateTime',
						default: '',
						description: 'Filter appointments from this date',
					},
					{
						displayName: 'End Date',
						name: 'end_date',
						type: 'dateTime',
						default: '',
						description: 'Filter appointments until this date',
					},
				],
			},

			// Appointment: Get Availability
			{
				displayName: 'Team Member ID',
				name: 'teamMemberIdAvailability',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['appointment'],
						operation: ['getAvailability'],
					},
				},
				default: '',
				description: 'UUID of the team member to check availability',
				hint: 'Use "Get Many" on Team Members to find the ID',
			},
			{
				displayName: 'Date',
				name: 'availabilityDate',
				type: 'dateTime',
				required: true,
				displayOptions: {
					show: {
						resource: ['appointment'],
						operation: ['getAvailability'],
					},
				},
				default: '',
				description: 'Date to check availability (YYYY-MM-DD)',
			},
			{
				displayName: 'Duration Minutes',
				name: 'durationMinutes',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['appointment'],
						operation: ['getAvailability'],
					},
				},
				default: 30,
				description: 'Duration in minutes (default: 30)',
			},

			// Appointment: Create
			{
				displayName: 'Client ID',
				name: 'clientId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['appointment'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'UUID of the client. You can also use the "Get Many" operation on Clients to find the ID.',
				hint: 'Use dropdown in manual mode or paste UUID when used as AI tool',
			},
			{
				displayName: 'Service ID',
				name: 'serviceId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['appointment'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'UUID of the service. You can also use the "Get Many" operation on Services to find the ID.',
				hint: 'Use dropdown in manual mode or paste UUID when used as AI tool',
			},
			{
				displayName: 'Team Member ID',
				name: 'teamMemberId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['appointment'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'UUID of the team member/professional. You can also use the "Get Many" operation on Team Members to find the ID.',
				hint: 'Use dropdown in manual mode or paste UUID when used as AI tool',
			},
			{
				displayName: 'Start Time',
				name: 'startTime',
				type: 'dateTime',
				required: true,
				displayOptions: {
					show: {
						resource: ['appointment'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'Start date and time of the appointment',
			},
			{
				displayName: 'End Time',
				name: 'endTime',
				type: 'dateTime',
				required: true,
				displayOptions: {
					show: {
						resource: ['appointment'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'End date and time of the appointment',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['appointment'],
						operation: ['create'],
					},
				},
				options: [
					{
						displayName: 'Notes',
						name: 'notes',
						type: 'string',
						default: '',
						description: 'Additional notes for the appointment',
					},
				],
			},

			// Appointment: Update
			{
				displayName: 'Update Fields',
				name: 'updateFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['appointment'],
						operation: ['update'],
					},
				},
				options: [
					{
						displayName: 'Status',
						name: 'status',
						type: 'options',
						options: [
							{
								name: 'Scheduled',
								value: 'scheduled',
							},
							{
								name: 'Confirmed',
								value: 'confirmed',
							},
							{
								name: 'Completed',
								value: 'completed',
							},
							{
								name: 'Canceled',
								value: 'canceled',
							},
							{
								name: 'No Show',
								value: 'no_show',
							},
						],
						default: 'scheduled',
						description: 'Status of the appointment',
					},
					{
						displayName: 'Notes',
						name: 'notes',
						type: 'string',
						default: '',
						description: 'Additional notes for the appointment',
					},
					{
						displayName: 'Start Time',
						name: 'start_time',
						type: 'dateTime',
						default: '',
						description: 'Start date and time of the appointment',
					},
					{
						displayName: 'End Time',
						name: 'end_time',
						type: 'dateTime',
						default: '',
						description: 'End date and time of the appointment',
					},
				],
			},

			// Appointment: Get Many
			{
				displayName: 'Return All',
				name: 'returnAll',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['appointment', 'client'],
						operation: ['getAll'],
					},
				},
				default: false,
				description: 'Whether to return all results or only up to a given limit',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['appointment', 'client'],
						operation: ['getAll'],
						returnAll: [false],
					},
				},
				typeOptions: {
					minValue: 1,
					maxValue: 100,
				},
				default: 50,
				description: 'Max number of results to return',
			},
			{
				displayName: 'Filters',
				name: 'filters',
				type: 'collection',
				placeholder: 'Add Filter',
				default: {},
				displayOptions: {
					show: {
						resource: ['appointment'],
						operation: ['getAll'],
					},
				},
				options: [
					{
						displayName: 'Status',
						name: 'status',
						type: 'options',
						options: [
							{
								name: 'Scheduled',
								value: 'scheduled',
							},
							{
								name: 'Confirmed',
								value: 'confirmed',
							},
							{
								name: 'Completed',
								value: 'completed',
							},
							{
								name: 'Canceled',
								value: 'canceled',
							},
							{
								name: 'No Show',
								value: 'no_show',
							},
						],
						default: '',
						description: 'Filter by appointment status',
					},
					{
						displayName: 'Client Phone',
						name: 'client_phone',
						type: 'string',
						default: '',
						placeholder: '(11) 99999-9999 or 11999999999',
						description: 'Filter appointments by client phone number (with or without formatting)',
					},
					{
						displayName: 'Team Member ID',
						name: 'team_member_id',
						type: 'string',
						default: '',
						description: 'Filter by team member/professional',
					},
					{
						displayName: 'Start Date',
						name: 'start_date',
						type: 'dateTime',
						default: '',
						description: 'Filter appointments from this date',
					},
					{
						displayName: 'End Date',
						name: 'end_date',
						type: 'dateTime',
						default: '',
						description: 'Filter appointments until this date',
					},
				],
			},

			// Client: Get By Phone
			{
				displayName: 'Phone Number',
				name: 'phoneNumber',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['client'],
						operation: ['getByPhone'],
					},
				},
				default: '',
				placeholder: '(11) 99999-9999 or 11999999999',
				description: 'Phone number of the client to search for',
			},

			// Client: Create
			{
				displayName: 'Full Name',
				name: 'fullName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['client'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'Full name of the client',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['client'],
						operation: ['create'],
					},
				},
				options: [
					{
						displayName: 'Email',
						name: 'email',
						type: 'string',
						placeholder: 'name@email.com',
						default: '',
						description: 'Email address of the client',
					},
					{
						displayName: 'Phone',
						name: 'phone',
						type: 'string',
						default: '',
						description: 'Phone number of the client',
					},
					{
						displayName: 'CPF',
						name: 'cpf',
						type: 'string',
						default: '',
						description: 'CPF of the client',
					},
					{
						displayName: 'Birth Date',
						name: 'birth_date',
						type: 'dateTime',
						default: '',
						description: 'Birth date of the client',
					},
					{
						displayName: 'Address',
						name: 'address',
						type: 'string',
						default: '',
						description: 'Address of the client',
					},
				],
			},

			// Client: Get Many
			{
				displayName: 'Filters',
				name: 'filters',
				type: 'collection',
				placeholder: 'Add Filter',
				default: {},
				displayOptions: {
					show: {
						resource: ['client'],
						operation: ['getAll'],
					},
				},
				options: [
					{
						displayName: 'Search',
						name: 'search',
						type: 'string',
						default: '',
						description: 'Search by name, email or phone',
					},
				],
			},

			// Service: Get/Update/Delete
			{
				displayName: 'Service ID',
				name: 'serviceId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['service'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
				description: 'The ID of the service',
			},

			// Service: Create
			{
				displayName: 'Name',
				name: 'serviceName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['service'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'Name of the service',
			},
			{
				displayName: 'Duration Minutes',
				name: 'serviceDuration',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['service'],
						operation: ['create'],
					},
				},
				default: 30,
				description: 'Duration of the service in minutes',
			},
			{
				displayName: 'Price',
				name: 'servicePrice',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['service'],
						operation: ['create'],
					},
				},
				default: '',
				placeholder: '50.00',
				description: 'Price of the service',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['service'],
						operation: ['create'],
					},
				},
				options: [
					{
						displayName: 'Category',
						name: 'category',
						type: 'string',
						default: '',
						description: 'Category of the service (e.g., Hair, Nails)',
					},
					{
						displayName: 'Description',
						name: 'description',
						type: 'string',
						default: '',
						description: 'Description of the service',
					},
					{
						displayName: 'Team Member IDs',
						name: 'team_member_ids',
						type: 'multiOptions',
						typeOptions: {
							loadOptionsMethod: 'getTeamMembers',
						},
						default: [],
						description: 'Team members who can perform this service',
					},
				],
			},

			// Service: Update
			{
				displayName: 'Update Fields',
				name: 'updateFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['service'],
						operation: ['update'],
					},
				},
				options: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Name of the service',
					},
					{
						displayName: 'Duration Minutes',
						name: 'duration_minutes',
						type: 'number',
						default: 30,
						description: 'Duration of the service in minutes',
					},
					{
						displayName: 'Price',
						name: 'price',
						type: 'string',
						default: '',
						description: 'Price of the service',
					},
					{
						displayName: 'Category',
						name: 'category',
						type: 'string',
						default: '',
						description: 'Category of the service',
					},
					{
						displayName: 'Description',
						name: 'description',
						type: 'string',
						default: '',
						description: 'Description of the service',
					},
					{
						displayName: 'Is Active',
						name: 'is_active',
						type: 'boolean',
						default: true,
						description: 'Whether the service is active',
					},
					{
						displayName: 'Team Member IDs',
						name: 'team_member_ids',
						type: 'multiOptions',
						typeOptions: {
							loadOptionsMethod: 'getTeamMembers',
						},
						default: [],
						description: 'Team members who can perform this service',
					},
				],
			},

			// Service: Get Many - Return All
			{
				displayName: 'Return All',
				name: 'returnAll',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['service'],
						operation: ['getAll'],
					},
				},
				default: false,
				description: 'Whether to return all results or only up to a given limit',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['service'],
						operation: ['getAll'],
						returnAll: [false],
					},
				},
				typeOptions: {
					minValue: 1,
					maxValue: 100,
				},
				default: 50,
				description: 'Max number of results to return',
			},

			// Service: Get Many - Filters
			{
				displayName: 'Filters',
				name: 'filters',
				type: 'collection',
				placeholder: 'Add Filter',
				default: {},
				displayOptions: {
					show: {
						resource: ['service'],
						operation: ['getAll'],
					},
				},
				options: [
					{
						displayName: 'Category',
						name: 'category',
						type: 'string',
						default: '',
						description: 'Filter by category',
					},
					{
						displayName: 'Team Member ID',
						name: 'team_member_id',
						type: 'options',
						typeOptions: {
							loadOptionsMethod: 'getTeamMembers',
						},
						default: '',
						description: 'Filter by team member',
					},
					{
						displayName: 'Is Active',
						name: 'is_active',
						type: 'boolean',
						default: true,
						description: 'Filter only active services',
					},
				],
			},

			// Team Member: Get
			{
				displayName: 'Team Member ID',
				name: 'teamMemberIdGet',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['teamMember'],
						operation: ['get'],
					},
				},
				default: '',
				description: 'The ID of the team member',
			},

			// Team Member: Get Many - Return All
			{
				displayName: 'Return All',
				name: 'returnAll',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['teamMember'],
						operation: ['getAll'],
					},
				},
				default: false,
				description: 'Whether to return all results or only up to a given limit',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['teamMember'],
						operation: ['getAll'],
						returnAll: [false],
					},
				},
				typeOptions: {
					minValue: 1,
					maxValue: 100,
				},
				default: 50,
				description: 'Max number of results to return',
			},

			// Team Member: Get Many - Filters
			{
				displayName: 'Filters',
				name: 'filters',
				type: 'collection',
				placeholder: 'Add Filter',
				default: {},
				displayOptions: {
					show: {
						resource: ['teamMember'],
						operation: ['getAll'],
					},
				},
				options: [
					{
						displayName: 'Search',
						name: 'search',
						type: 'string',
						default: '',
						description: 'Search by name, email or specialty',
					},
					{
						displayName: 'Is Active',
						name: 'is_active',
						type: 'boolean',
						default: true,
						description: 'Filter only active team members',
					},
				],
			},
		],
	};

	async supplyData(this: ISupplyDataFunctions, itemIndex: number): Promise<SupplyData> {
		const resource = this.getNodeParameter('resource', itemIndex) as string;
		const operation = this.getNodeParameter('operation', itemIndex) as string;

		const toolDescription = `Callov ${resource} - ${operation}`;
		
		return {
			response: {
				name: `callov_${resource}_${operation}`,
				description: toolDescription,
				schema: this.getNodeParameter('$input', itemIndex) as any,
			},
		};
	}

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		const resource = this.getNodeParameter('resource', 0);
		const operation = this.getNodeParameter('operation', 0);

		const baseUrl = 'https://zvlknadahupckbpjgvjf.supabase.co/functions/v1';

		for (let i = 0; i < items.length; i++) {
			try {
				if (resource === 'appointment') {
					if (operation === 'create') {
						const clientId = this.getNodeParameter('clientId', i) as string;
						const serviceId = this.getNodeParameter('serviceId', i) as string;
						const teamMemberId = this.getNodeParameter('teamMemberId', i) as string;
						const startTime = this.getNodeParameter('startTime', i) as string;
						const endTime = this.getNodeParameter('endTime', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							client_id: clientId,
							service_id: serviceId,
							team_member_id: teamMemberId,
							start_time: startTime,
							end_time: endTime,
							...additionalFields,
						};

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'callovApi',
							{
								method: 'POST',
								url: `${baseUrl}/api-appointments`,
								body,
								json: true,
							},
						);

						returnData.push(response as IDataObject);
					}

					if (operation === 'get') {
						const appointmentId = this.getNodeParameter('appointmentId', i) as string;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'callovApi',
							{
								method: 'GET',
								url: `${baseUrl}/api-appointments/${appointmentId}`,
								json: true,
							},
						);

						returnData.push(response as IDataObject);
					}

					if (operation === 'getByClientPhone') {
						const clientPhone = this.getNodeParameter('clientPhoneNumber', i) as string;
						const additionalFilters = this.getNodeParameter('additionalFilters', i) as IDataObject;

						// Remove non-digits from phone number
						const cleanPhone = clientPhone.replace(/\D/g, '');

						const qs: IDataObject = {
							client_phone: cleanPhone,
							page: 1,
							limit: 100,
							...additionalFilters,
						};

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'callovApi',
							{
								method: 'GET',
								url: `${baseUrl}/api-appointments`,
								qs,
								json: true,
							},
						);

						const responseData = response as IDataObject;
						if (responseData.data && Array.isArray(responseData.data)) {
							returnData.push(...(responseData.data as IDataObject[]));
						}
					}

					if (operation === 'getAvailability') {
						const teamMemberId = this.getNodeParameter('teamMemberIdAvailability', i) as string;
						const availabilityDate = this.getNodeParameter('availabilityDate', i) as string;
						const durationMinutes = this.getNodeParameter('durationMinutes', i) as number;

						// Convert date to YYYY-MM-DD format
						const dateObj = new Date(availabilityDate);
						const formattedDate = dateObj.toISOString().split('T')[0];

						const qs: IDataObject = {
							team_member_id: teamMemberId,
							date: formattedDate,
							duration_minutes: durationMinutes,
						};

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'callovApi',
							{
								method: 'GET',
								url: `${baseUrl}/api-availability`,
								qs,
								json: true,
							},
						);

						returnData.push(response as IDataObject);
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i);
						const filters = this.getNodeParameter('filters', i) as IDataObject;

						const qs: IDataObject = {
							page: 1,
							...filters,
						};

						if (!returnAll) {
							qs.limit = this.getNodeParameter('limit', i);
						} else {
							qs.limit = 100;
						}

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'callovApi',
							{
								method: 'GET',
								url: `${baseUrl}/api-appointments`,
								qs,
								json: true,
							},
						);

						const responseData = response as IDataObject;
						if (responseData.data && Array.isArray(responseData.data)) {
							returnData.push(...(responseData.data as IDataObject[]));
						}
					}

					if (operation === 'update') {
						const appointmentId = this.getNodeParameter('appointmentId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'callovApi',
							{
								method: 'PATCH',
								url: `${baseUrl}/api-appointments/${appointmentId}`,
								body: updateFields,
								json: true,
							},
						);

						returnData.push(response as IDataObject);
					}

					if (operation === 'delete') {
						const appointmentId = this.getNodeParameter('appointmentId', i) as string;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'callovApi',
							{
								method: 'DELETE',
								url: `${baseUrl}/api-appointments/${appointmentId}`,
								json: true,
							},
						);

						returnData.push(response as IDataObject);
					}
				}

				if (resource === 'client') {
					if (operation === 'create') {
						const fullName = this.getNodeParameter('fullName', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							full_name: fullName,
							...additionalFields,
						};

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'callovApi',
							{
								method: 'POST',
								url: `${baseUrl}/api-clients`,
								body,
								json: true,
							},
						);

						returnData.push(response as IDataObject);
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i);
						const filters = this.getNodeParameter('filters', i) as IDataObject;

						const qs: IDataObject = {
							page: 1,
							...filters,
						};

						if (!returnAll) {
							qs.limit = this.getNodeParameter('limit', i);
						} else {
							qs.limit = 100;
						}

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'callovApi',
							{
								method: 'GET',
								url: `${baseUrl}/api-clients`,
								qs,
								json: true,
							},
						);

						const responseData = response as IDataObject;
						if (responseData.data && Array.isArray(responseData.data)) {
							returnData.push(...(responseData.data as IDataObject[]));
						}
					}

					if (operation === 'getByPhone') {
						const phoneNumber = this.getNodeParameter('phoneNumber', i) as string;

						// Search for client by phone using the search parameter
						const qs: IDataObject = {
							search: phoneNumber,
							limit: 100,
						};

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'callovApi',
							{
								method: 'GET',
								url: `${baseUrl}/api-clients`,
								qs,
								json: true,
							},
						);

						const responseData = response as IDataObject;
						if (responseData.data && Array.isArray(responseData.data)) {
							// Filter results to match phone exactly (API search might return partial matches)
							const cleanPhone = phoneNumber.replace(/\D/g, ''); // Remove non-digits
							const matchedClients = (responseData.data as IDataObject[]).filter((client) => {
								const clientPhone = (client.phone as string || '').replace(/\D/g, '');
								return clientPhone === cleanPhone;
							});

							if (matchedClients.length > 0) {
								returnData.push(...matchedClients);
							} else {
								// If no exact match, return all search results
								returnData.push(...(responseData.data as IDataObject[]));
							}
						}
					}
				}

				if (resource === 'service') {
					if (operation === 'create') {
						const name = this.getNodeParameter('serviceName', i) as string;
						const durationMinutes = this.getNodeParameter('serviceDuration', i) as number;
						const price = this.getNodeParameter('servicePrice', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							name,
							duration_minutes: durationMinutes,
							price,
							...additionalFields,
						};

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'callovApi',
							{
								method: 'POST',
								url: `${baseUrl}/api-services`,
								body,
								json: true,
							},
						);

						returnData.push(response as IDataObject);
					}

					if (operation === 'get') {
						const serviceId = this.getNodeParameter('serviceId', i) as string;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'callovApi',
							{
								method: 'GET',
								url: `${baseUrl}/api-services/${serviceId}`,
								json: true,
							},
						);

						returnData.push(response as IDataObject);
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i);
						const filters = this.getNodeParameter('filters', i) as IDataObject;

						const qs: IDataObject = {
							page: 1,
							...filters,
						};

						if (!returnAll) {
							qs.limit = this.getNodeParameter('limit', i);
						} else {
							qs.limit = 100;
						}

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'callovApi',
							{
								method: 'GET',
								url: `${baseUrl}/api-services`,
								qs,
								json: true,
							},
						);

						const responseData = response as IDataObject;
						if (responseData.data && Array.isArray(responseData.data)) {
							returnData.push(...(responseData.data as IDataObject[]));
						}
					}

					if (operation === 'update') {
						const serviceId = this.getNodeParameter('serviceId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'callovApi',
							{
								method: 'PATCH',
								url: `${baseUrl}/api-services/${serviceId}`,
								body: updateFields,
								json: true,
							},
						);

						returnData.push(response as IDataObject);
					}

					if (operation === 'delete') {
						const serviceId = this.getNodeParameter('serviceId', i) as string;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'callovApi',
							{
								method: 'DELETE',
								url: `${baseUrl}/api-services/${serviceId}`,
								json: true,
							},
						);

						returnData.push(response as IDataObject);
					}
				}

				if (resource === 'teamMember') {
					if (operation === 'get') {
						const teamMemberId = this.getNodeParameter('teamMemberIdGet', i) as string;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'callovApi',
							{
								method: 'GET',
								url: `${baseUrl}/api-team-members/${teamMemberId}`,
								json: true,
							},
						);

						returnData.push(response as IDataObject);
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i);
						const filters = this.getNodeParameter('filters', i) as IDataObject;

						const qs: IDataObject = {
							page: 1,
							...filters,
						};

						if (!returnAll) {
							qs.limit = this.getNodeParameter('limit', i);
						} else {
							qs.limit = 100;
						}

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'callovApi',
							{
								method: 'GET',
								url: `${baseUrl}/api-team-members`,
								qs,
								json: true,
							},
						);

						const responseData = response as IDataObject;
						if (responseData.data && Array.isArray(responseData.data)) {
							returnData.push(...(responseData.data as IDataObject[]));
						}
					}
				}
			} catch (error) {
				if (this.continueOnFail()) {
					const errorMessage = error instanceof Error ? error.message : 'Unknown error';
					returnData.push({ error: errorMessage });
					continue;
				}
				throw error;
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
