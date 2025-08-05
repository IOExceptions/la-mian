# GitHub Container Registry 设置指南

## 🔍 问题解决

如果您遇到 `403 Forbidden` 错误，请按照以下步骤解决：

### 1. 创建 Personal Access Token

1. 访问 [GitHub Settings](https://github.com/settings/tokens)
2. 点击 "Generate new token (classic)"
3. 选择以下权限：
   - `repo` (完整仓库访问权限)
   - `write:packages` (写入包权限)
   - `read:packages` (读取包权限)
   - `delete:packages` (删除包权限，可选)

### 2. 配置 GitHub Secrets

在您的 GitHub 仓库设置中添加以下 Secret：

- **名称**: `CR_PAT`
- **值**: 上面创建的 Personal Access Token

### 3. 更新工作流配置

如果使用自定义 Token，需要更新工作流：

```yaml
- name: Log in to Container Registry
  uses: docker/login-action@v3 
  with:
    registry: ${{ env.REGISTRY }} 
    username: ${{ github.actor }}
    password: ${{ secrets.CR_PAT }}  # 使用自定义 Token
```

### 4. 检查仓库设置

确保您的仓库设置正确：

1. 访问仓库设置
2. 检查 "Actions" → "General" → "Workflow permissions"
3. 确保设置为 "Read and write permissions"

### 5. 检查包可见性

1. 访问 [GitHub Packages](https://github.com/features/packages)
2. 检查您的包是否可见
3. 确保包权限设置正确

## 🔧 替代解决方案

### 方案一：使用 Docker Hub

如果 GHCR 问题持续，可以改用 Docker Hub：

```yaml
env:
  REGISTRY: docker.io
  IMAGE_NAME: your-dockerhub-username/la-mian
```

### 方案二：使用自托管 Registry

```yaml
env:
  REGISTRY: your-registry.com
  IMAGE_NAME: la-mian
```

## 📋 检查清单

- [ ] Personal Access Token 已创建
- [ ] Token 权限已正确设置
- [ ] GitHub Secrets 已配置
- [ ] 仓库权限已检查
- [ ] 包可见性已确认

## 🚨 常见问题

### 1. Token 权限不足
```
Error: 403 Forbidden
```
**解决方案**: 确保 Token 有 `write:packages` 权限

### 2. 仓库权限问题
```
Error: insufficient_scope
```
**解决方案**: 检查仓库的 Actions 权限设置

### 3. 包不存在
```
Error: repository not found
```
**解决方案**: 确保包名称正确，检查包可见性

## 📞 支持

如果问题仍然存在：

1. 检查 GitHub Actions 日志
2. 验证 Token 权限
3. 联系 GitHub 支持 