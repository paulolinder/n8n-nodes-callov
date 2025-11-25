# Guia de Publicação no NPM

## Pré-requisitos

1. **Conta no NPM**
   - Crie uma conta em https://www.npmjs.com/signup
   - Verifique seu email

2. **Login no NPM via terminal**
   ```bash
   npm login
   ```
   - Digite seu username
   - Digite sua senha
   - Digite seu email

## Passos para Publicar

### 1. Atualizar informações do package.json

Edite o `package.json` e atualize:
- `author.name`: Seu nome
- `author.email`: Seu email
- `homepage`: URL do seu repositório GitHub
- `repository.url`: URL do seu repositório GitHub

### 2. Criar repositório no GitHub (opcional mas recomendado)

```bash
git init
git add .
git commit -m "Initial commit - Callov n8n node"
git branch -M main
git remote add origin https://github.com/seu-usuario/n8n-nodes-callov.git
git push -u origin main
```

### 3. Verificar se o build está funcionando

```bash
npm run build
```

### 4. Testar o pacote localmente

```bash
npm pack
```

Isso cria um arquivo `.tgz` que você pode testar antes de publicar.

### 5. Publicar no NPM

```bash
npm publish
```

Se for a primeira vez publicando um pacote com escopo, use:
```bash
npm publish --access public
```

## Após a Publicação

1. **Verificar no NPM**
   - Acesse: https://www.npmjs.com/package/n8n-nodes-callov
   - Confirme que o pacote está visível

2. **Instalar no n8n**
   ```bash
   npm install n8n-nodes-callov
   ```

3. **Registrar no n8n Community Nodes**
   - Acesse: https://docs.n8n.io/integrations/community-nodes/
   - Siga as instruções para adicionar à lista oficial

## Atualizações Futuras

Para publicar uma nova versão:

1. Faça suas alterações no código

2. Atualize a versão no package.json:
   ```bash
   npm version patch  # 1.0.0 -> 1.0.1
   npm version minor  # 1.0.0 -> 1.1.0
   npm version major  # 1.0.0 -> 2.0.0
   ```

3. Build e publique:
   ```bash
   npm run build
   npm publish
   ```

4. Commit e push das mudanças:
   ```bash
   git push && git push --tags
   ```

## Troubleshooting

### Erro: "You do not have permission to publish"
- Verifique se está logado: `npm whoami`
- Faça login novamente: `npm login`

### Erro: "Package name already exists"
- O nome `n8n-nodes-callov` já está em uso
- Escolha outro nome no package.json

### Erro: "402 Payment Required"
- Pacotes com escopo (@seu-usuario/n8n-nodes-callov) precisam de conta paga
- Use nome sem escopo ou adicione `--access public`

## Checklist Final

- [ ] package.json atualizado com suas informações
- [ ] README.md está completo e claro
- [ ] LICENSE está presente
- [ ] Código compilado sem erros (`npm run build`)
- [ ] Testado localmente
- [ ] Logado no npm (`npm whoami`)
- [ ] Publicado com sucesso (`npm publish`)
- [ ] Verificado no npmjs.com
