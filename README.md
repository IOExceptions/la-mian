# La-Mian - 拉面餐厅应用

一个现代化的拉面餐厅 Web 应用，使用 Next.js 构建。

## 🚀 快速开始

### 本地开发

```bash
# 安装依赖
npm install --legacy-peer-deps

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

### 容器化部署

#### 本地构建和部署

```bash
# 构建 Docker 镜像
docker build -t la-mian:latest .

# 运行容器
docker run -p 3000:3000 la-mian:latest
```

#### K3s 部署

```bash
# 初始设置
./k8s-setup.sh

# 手动部署
./k8s-deploy.sh
```

## 🔄 自动化部署

### GitHub Actions 配置

项目配置了 GitHub Actions 工作流，实现代码提交后自动部署到 K3s 集群。

#### 部署方式选择

**推荐方式：使用 KUBE_CONFIG**

更安全、更简单的部署方式，直接使用 kubectl 连接到 K3s 集群。

**传统方式：使用 SSH**

通过 SSH 连接到服务器执行部署命令。

#### 必需的 GitHub Secrets

**KUBE_CONFIG 方式：**
- `KUBE_CONFIG`: Base64 编码的 kubeconfig 文件内容

**SSH 方式：**
- `K3S_HOST`: K3s 服务器 IP 地址
- `K3S_USERNAME`: SSH 用户名
- `K3S_SSH_KEY`: SSH 私钥
- `K3S_PORT`: SSH 端口 (默认 22)

**可选配置：**
- `TELEGRAM_TOKEN`: Telegram Bot Token
- `TELEGRAM_TO`: Telegram 聊天 ID

#### 工作流说明

1. **CI 工作流** (`ci.yml`)
   - 代码质量检查
   - 安全漏洞扫描
   - 多版本 Node.js 测试

2. **部署工作流** (`deploy.yml`)
   - 构建 Docker 镜像
   - 推送到 GitHub Container Registry
   - 自动部署到 K3s 集群
   - 部署状态通知

### 部署流程

1. 推送代码到 `main` 或 `master` 分支
2. GitHub Actions 自动触发构建
3. 构建 Docker 镜像并推送到 GHCR
4. 使用 kubectl 或 SSH 连接到 K3s 服务器
5. 拉取最新镜像并更新部署
6. 发送部署状态通知

## 📁 项目结构

```
la-mian/
├── app/                    # Next.js App Router 页面
├── components/             # React 组件
├── lib/                    # 工具函数和配置
├── public/                 # 静态资源
├── .github/workflows/      # GitHub Actions 工作流
├── k8s-deployment.yaml     # Kubernetes 部署配置
├── Dockerfile              # Docker 镜像配置
├── KUBE_CONFIG_SETUP.md    # KUBE_CONFIG 部署指南
└── README.md              # 项目说明
```

## 🛠️ 技术栈

- **前端框架**: Next.js 15
- **UI 组件**: Radix UI + Tailwind CSS
- **状态管理**: React Context
- **容器化**: Docker
- **编排**: Kubernetes (K3s)
- **CI/CD**: GitHub Actions
- **镜像仓库**: GitHub Container Registry

## 📊 性能特性

- **静态生成**: 25 个静态页面
- **代码分割**: 自动代码分割优化
- **图片优化**: 自动图片优化
- **缓存策略**: 静态资源长期缓存
- **SEO 友好**: 服务端渲染支持

## 🔧 配置说明

### Next.js 配置

- `output: 'standalone'`: 支持容器化部署
- `images.unoptimized: true`: 禁用图片优化以支持容器化
- `eslint.ignoreDuringBuilds: true`: 构建时忽略 ESLint 错误
- `typescript.ignoreBuildErrors: true`: 构建时忽略 TypeScript 错误

### Kubernetes 配置

- **副本数**: 2 个副本确保高可用性
- **资源限制**: 内存 512Mi，CPU 500m
- **健康检查**: liveness 和 readiness 探针
- **自动扩缩容**: 支持 HPA 配置

## 🚨 故障排除

### 常见问题

1. **构建失败**
   ```bash
   # 清理缓存
   npm run build -- --no-cache
   ```

2. **容器启动失败**
   ```bash
   # 查看容器日志
   docker logs <container-id>
   ```

3. **Kubernetes 部署失败**
   ```bash
   # 查看 Pod 状态
   kubectl describe pod <pod-name> -n la-mian
   
   # 查看日志
   kubectl logs <pod-name> -n la-mian
   ```

### 监控和维护

```bash
# 查看部署状态
kubectl get pods -n la-mian

# 查看服务状态
kubectl get services -n la-mian

# 查看 Ingress 状态
kubectl get ingress -n la-mian

# 查看日志
kubectl logs -f deployment/la-mian-app -n la-mian
```

## 📝 开发指南

### 添加新页面

1. 在 `app/` 目录下创建新文件夹
2. 添加 `page.tsx` 文件
3. 导出 React 组件

### 添加新组件

1. 在 `components/` 目录下创建组件文件
2. 使用 TypeScript 和 Tailwind CSS
3. 遵循项目命名规范

### 样式指南

- 使用 Tailwind CSS 类名
- 遵循移动优先设计
- 保持组件可复用性

## 📄 许可证

MIT License

## 🤝 贡献

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 📞 支持

如有问题，请创建 Issue 或联系开发团队。
