# n8n-nodes-callov

Node n8n para integração completa com a API Callov - Sistema de Gerenciamento de Agendamentos, Clientes, Serviços e Profissionais.

## 🚀 Instalação

### Via npm (Recomendado)

```bash
npm install n8n-nodes-callov
```

### Via interface do n8n

1. Vá em **Settings** → **Community Nodes**
2. Digite: `n8n-nodes-callov`
3. Clique em **Install**
4. Reinicie o n8n

## 🔐 Configuração

1. No n8n, vá em **Credentials** → **New**
2. Procure por **Callov API**
3. Insira sua API Key (disponível em Configurações → API no Callov)
4. Teste a conexão

## 📋 Recursos Disponíveis

### 📅 Appointments (Agendamentos)

- **Create**: Criar novo agendamento com dropdowns dinâmicos
- **Get**: Buscar agendamento por ID
- **Get Many**: Listar agendamentos com filtros avançados
- **Get Availability**: Verificar horários disponíveis de um profissional
- **Update**: Atualizar status, horários e notas
- **Delete**: Cancelar agendamento

### 👥 Clients (Clientes)

- **Create**: Criar novo cliente com dados completos
- **Get Many**: Listar clientes com busca por nome, email ou telefone

### 🛠️ Services (Serviços)

- **Create**: Criar serviço com preço, duração e profissionais associados
- **Get**: Buscar serviço específico
- **Get Many**: Listar serviços com filtros por categoria e profissional
- **Update**: Atualizar informações do serviço
- **Delete**: Remover serviço

### 👨‍💼 Team Members (Profissionais)

- **Get**: Buscar profissional por ID
- **Get Many**: Listar profissionais ativos com filtros

## ✨ Recursos Especiais

### 🎯 Dropdowns Dinâmicos

Ao criar agendamentos, os campos são preenchidos automaticamente:
- **Client**: Lista todos os clientes cadastrados
- **Service**: Mostra serviços com duração e preço
- **Team Member**: Lista profissionais ativos com especialidade

### 🤖 Suporte para AI Agents

Este node pode ser usado como **Tool** para agentes de IA (OpenAI, Anthropic, etc.):
- Agentes podem criar agendamentos automaticamente
- Verificar disponibilidade de horários
- Buscar informações de clientes e serviços
- Gerenciar todo o sistema via linguagem natural

## 📖 Exemplos de Uso

### Criar um Agendamento

```
1. Adicione o node Callov
2. Resource: Appointment
3. Operation: Create
4. Selecione Client, Service e Team Member nos dropdowns
5. Defina Start Time e End Time
6. Execute!
```

### Verificar Disponibilidade

```
1. Resource: Appointment
2. Operation: Get Availability
3. Selecione Team Member
4. Escolha a Data
5. Defina Duration Minutes (padrão: 30)
6. Retorna todos os horários livres
```

### Criar Serviço com Profissionais

```
1. Resource: Service
2. Operation: Create
3. Name: "Corte de Cabelo"
4. Duration: 30 minutos
5. Price: "50.00"
6. Team Member IDs: Selecione múltiplos profissionais
```

### Usar com AI Agent

```
1. Adicione um node AI Agent (OpenAI, Anthropic, etc.)
2. Conecte o node Callov como Tool
3. O agente pode executar comandos como:
   - "Agende um corte de cabelo para João amanhã às 14h"
   - "Quais horários estão disponíveis hoje?"
   - "Liste todos os serviços de manicure"
```

## 🔧 Requisitos

- API Key válida do Callov
- Plano Professional ou Enterprise (requisito da API Callov)
- n8n versão 1.0.0 ou superior

## 📚 Documentação da API

Para mais detalhes sobre os endpoints e parâmetros, consulte a documentação oficial da API Callov.

## 🐛 Suporte

Para problemas ou dúvidas:
- Issues: https://github.com/lossautomacoes/n8n-nodes-callov/issues
- API Callov: Entre em contato com o suporte oficial

## 📝 Changelog

### v1.4.0
- ✅ Adicionado recurso completo de Services (CRUD)
- ✅ Suporte para AI Agent Tools
- ✅ Dropdowns dinâmicos para todos os recursos

### v1.3.0
- ✅ Dropdowns dinâmicos para Client, Service e Team Member
- ✅ Melhorias na UX

### v1.2.0
- ✅ Adicionado recurso Team Members

### v1.1.0
- ✅ Adicionado Get Availability

### v1.0.0
- ✅ Lançamento inicial com Appointments e Clients

## 📄 Licença

MIT
