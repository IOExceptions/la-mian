# GitHub Actions 自动化部署设置指南

## 📋 概述

本指南将帮助您配置 GitHub Actions 工作流，实现代码提交后自动部署到 K3s 集群。

## 🔧 前置要求

### 1. GitHub 仓库设置

确保您的项目已推送到 GitHub 仓库，并且包含以下文件：
- `.github/workflows/deploy.yml`
- `.github/workflows/ci.yml`
- `Dockerfile`
- `k8s-deployment.yaml`

### 2. K3s 服务器准备

确保您的 K3s 服务器已正确配置：
- K3s 集群运行正常
- kubectl 已配置
- Docker 已安装并运行
- SSH 访问已配置

## 🔐 GitHub Secrets 配置

在 GitHub 仓库设置中添加以下 Secrets：

### 必需的 Secrets

1. **K3S_HOST**
   - 描述：K3s 服务器的 IP 地址
   - 示例：`192.168.1.100`

2. **K3S_USERNAME**
   - 描述：SSH 用户名
   - 示例：`ubuntu`

3. **K3S_SSH_KEY**
   - 描述：SSH 私钥内容
   - 获取方法：
     ```bash
     # 生成 SSH 密钥对
     ssh-keygen -t rsa -b 4096 -C "github-actions"
     
     # 复制私钥内容
     cat ~/.ssh/id_rsa
     ```

4. **K3S_PORT**
   - 描述：SSH 端口号
   - 默认值：`22`

### 可选的 Secrets

5. **TELEGRAM_TOKEN**
   - 描述：Telegram Bot Token
   - 获取方法：
     1. 在 Telegram 中找到 @BotFather
     2. 发送 `/newbot` 命令
     3. 按提示创建机器人
     4. 复制获得的 Token

6. **TELEGRAM_TO**
   - 描述：Telegram 聊天 ID
   - 获取方法：
     1. 将机器人添加到目标聊天
     2. 发送消息到聊天
     3. 访问 `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
     4. 找到 `chat.id` 字段的值

## 🚀 部署流程

### 1. 初始设置

在 K3s 服务器上运行初始设置：

```bash
# 克隆项目到服务器
git clone https://github.com/your-username/la-mian.git
cd la-mian

# 运行初始设置脚本
./k8s-setup.sh
```

### 2. 配置镜像拉取权限

如果使用私有仓库，需要配置镜像拉取 Secret：

```bash
# 创建 Docker Registry Secret
kubectl create secret docker-registry ghcr-secret \
  --docker-server=ghcr.io \
  --docker-username=your-username \
  --docker-password=your-github-token \
  --namespace=la-mian
```

### 3. 更新 Kubernetes 配置

编辑 `k8s-deployment.yaml` 文件，更新镜像名称：

```yaml
containers:
- name: la-mian
  image: ghcr.io/your-username/la-mian:latest
```

### 4. 推送代码触发部署

```bash
# 提交更改
git add .
git commit -m "feat: 添加自动化部署配置"
git push origin main
```

## 📊 工作流说明

### CI 工作流 (`ci.yml`)

触发条件：
- 推送到 `main` 或 `master` 分支
- 创建 Pull Request

执行步骤：
1. 代码检出
2. 多版本 Node.js 测试 (18.x, 20.x)
3. 依赖安装
4. 代码检查
5. 项目构建
6. 安全漏洞扫描

### 部署工作流 (`deploy.yml`)

触发条件：
- 推送到 `main` 或 `master` 分支
- 创建 Pull Request

执行步骤：
1. 代码检出
2. Docker 镜像构建
3. 推送到 GitHub Container Registry
4. SSH 连接到 K3s 服务器
5. 拉取最新镜像
6. 更新 Kubernetes 部署
7. 等待部署完成
8. 发送通知

## 🔍 监控和调试

### 查看工作流状态

1. 访问 GitHub 仓库页面
2. 点击 "Actions" 标签
3. 查看工作流执行状态

### 查看部署日志

```bash
# 查看 Pod 状态
kubectl get pods -n la-mian

# 查看部署日志
kubectl logs -f deployment/la-mian-app -n la-mian

# 查看工作流日志
kubectl describe pod <pod-name> -n la-mian
```

### 常见问题排查

1. **SSH 连接失败**
   - 检查 `K3S_HOST` 和 `K3S_PORT` 配置
   - 验证 SSH 密钥是否正确
   - 确认服务器防火墙设置

2. **镜像拉取失败**
   - 检查 GitHub Token 权限
   - 验证镜像名称是否正确
   - 确认容器仓库访问权限

3. **Kubernetes 部署失败**
   - 检查 kubectl 配置
   - 验证命名空间是否存在
   - 查看 Pod 事件日志

## 🔄 更新和维护

### 更新部署配置

```bash
# 更新 Kubernetes 配置
kubectl apply -f k8s-deployment.yaml

# 重启部署
kubectl rollout restart deployment/la-mian-app -n la-mian
```

### 回滚部署

```bash
# 查看部署历史
kubectl rollout history deployment/la-mian-app -n la-mian

# 回滚到上一个版本
kubectl rollout undo deployment/la-mian-app -n la-mian
```

### 扩缩容

```bash
# 扩展副本数
kubectl scale deployment la-mian-app --replicas=3 -n la-mian

# 查看资源使用情况
kubectl top pods -n la-mian
```

## 📱 通知配置

### Telegram 通知设置

1. 创建 Telegram Bot
2. 获取 Bot Token
3. 获取聊天 ID
4. 配置 GitHub Secrets

### 自定义通知

可以修改 `.github/workflows/deploy.yml` 中的通知部分：

```yaml
- name: Custom Notification
  uses: appleboy/telegram-action@master
  with:
    to: ${{ secrets.TELEGRAM_TO }}
    token: ${{ secrets.TELEGRAM_TOKEN }}
    message: |
      自定义通知消息
      部署状态: ${{ job.status }}
```

## 🔒 安全最佳实践

1. **密钥管理**
   - 使用 GitHub Secrets 存储敏感信息
   - 定期轮换 SSH 密钥
   - 限制 GitHub Token 权限

2. **访问控制**
   - 使用最小权限原则
   - 定期审查访问权限
   - 启用双因素认证

3. **网络安全**
   - 配置防火墙规则
   - 使用 VPN 或专用网络
   - 启用 SSH 密钥认证

## 📞 支持

如果遇到问题：

1. 检查 GitHub Actions 日志
2. 查看 Kubernetes 事件
3. 验证网络连接
4. 联系技术支持

## 📚 相关文档

- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [K3s 文档](https://docs.k3s.io/)
- [Kubernetes 文档](https://kubernetes.io/docs/)
- [Docker 文档](https://docs.docker.com/) 