# n8n-nodes-callov

n8n node for complete integration with the Callov API - Appointment Scheduling, Clients, Services, and Team Members Management System.

## Installation

### Via npm (Recommended)

```bash
npm install n8n-nodes-callov
```

### Via n8n interface

1. Go to **Settings** → **Community Nodes**
2. Type: `n8n-nodes-callov`
3. Click **Install**
4. Restart n8n

## Configuration

1. In n8n, go to **Credentials** → **New**
2. Search for **Callov API**
3. Enter your API Key (available in Settings → API in Callov)
4. Test the connection

## Available Resources

### Appointments

- **Create**: Create new appointment with dynamic dropdowns
- **Get**: Fetch appointment by ID
- **Get Many**: List appointments with advanced filters
- **Get Availability**: Check available time slots for a team member
- **Update**: Update status, times, and notes
- **Delete**: Cancel appointment

### Clients

- **Create**: Create new client with complete data
- **Get Many**: List clients with search by name, email, or phone

### Services

- **Create**: Create service with price, duration, and associated team members
- **Get**: Fetch specific service
- **Get Many**: List services with filters by category and team member
- **Update**: Update service information
- **Delete**: Remove service

### Team Members

- **Get**: Fetch team member by ID
- **Get Many**: List active team members with filters

## Special Features

### Dynamic Dropdowns

When creating appointments, fields are automatically populated:
- **Client**: Lists all registered clients
- **Service**: Shows services with duration and price
- **Team Member**: Lists active team members with specialty

### AI Agent Support

This node can be used as a **Tool** for AI agents (OpenAI, Anthropic, etc.):
- Agents can automatically create appointments
- Check time slot availability
- Fetch client and service information
- Manage the entire system via natural language

## Usage Examples

### Create an Appointment

```
1. Add the Callov node
2. Resource: Appointment
3. Operation: Create
4. Select Client, Service, and Team Member from dropdowns
5. Set Start Time and End Time
6. Execute!
```

### Check Availability

```
1. Resource: Appointment
2. Operation: Get Availability
3. Select Team Member
4. Choose the Date
5. Set Duration Minutes (default: 30)
6. Returns all available time slots
```

### Create Service with Team Members

```
1. Resource: Service
2. Operation: Create
3. Name: "Haircut"
4. Duration: 30 minutes
5. Price: "50.00"
6. Team Member IDs: Select multiple team members
```

### Use with AI Agent

```
1. Add an AI Agent node (OpenAI, Anthropic, etc.)
2. Connect the Callov node as a Tool
3. The agent can execute commands like:
   - "Schedule a haircut for John tomorrow at 2pm"
   - "What time slots are available today?"
   - "List all manicure services"
```

## Requirements

- Valid Callov API Key
- Professional or Enterprise plan (Callov API requirement)
- n8n version 1.0.0 or higher

## API Documentation

For more details about endpoints and parameters, refer to the official Callov API documentation.

## Support

For issues or questions:
- Issues: https://github.com/paulolinder/n8n-nodes-callov/issues
- Callov API: Contact official support

## Changelog

### v1.7.0
- Added complete Services resource (CRUD)
- AI Agent Tools support
- Dynamic dropdowns for all resources

### v1.3.0
- Dynamic dropdowns for Client, Service, and Team Member
- UX improvements

### v1.2.0
- Added Team Members resource

### v1.1.0
- Added Get Availability

### v1.0.0
- Initial release with Appointments and Clients

## License

MIT
