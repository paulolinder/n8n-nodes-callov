import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class CallovApi implements ICredentialType {
	name = 'callovApi';
	displayName = 'Callov API';
	documentationUrl = 'https://callov.com/docs/api';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			placeholder: 'sk_live_YOUR_API_KEY',
			description: 'Your Callov API key (available in Settings → API)',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://zvlknadahupckbpjgvjf.supabase.co/functions/v1',
			url: '/api-appointments?limit=1',
		},
	};
}
