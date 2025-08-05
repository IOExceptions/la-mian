#!/bin/bash

# K3s 部署脚本
# 使用方法: ./k8s-deploy.sh

set -e

echo "🚀 开始 K3s 部署..."

# 检查 Docker 是否运行
if ! docker info > /dev/null 2>&1; then
    echo "❌ 错误: Docker 未运行"
    exit 1
fi

# 检查 kubectl 是否可用
if ! command -v kubectl &> /dev/null; then
    echo "❌ 错误: kubectl 未安装"
    exit 1
fi

# 构建 Docker 镜像
echo "🐳 构建 Docker 镜像..."
docker build -t la-mian:latest .

# 检查构建结果
if [ $? -ne 0 ]; then
    echo "❌ Docker 构建失败"
    exit 1
fi

echo "✅ Docker 镜像构建完成!"

# 应用 Kubernetes 配置
echo "📦 部署到 K3s..."

# 创建命名空间（如果不存在）
kubectl create namespace la-mian --dry-run=client -o yaml | kubectl apply -f -

# 应用部署配置
kubectl apply -f k8s-deployment.yaml

# 等待部署完成
echo "⏳ 等待部署完成..."
kubectl rollout status deployment/la-mian-app -n la-mian

echo "✅ 部署完成!"
echo ""
echo "📋 部署信息:"
echo "- 命名空间: la-mian"
echo "- 部署名称: la-mian-app"
echo "- 服务名称: la-mian-service"
echo "- Ingress: la-mian-ingress"

# 显示部署状态
echo ""
echo "🔍 部署状态:"
kubectl get pods -n la-mian
kubectl get services -n la-mian
kubectl get ingress -n la-mian

echo ""
echo "🌐 访问信息:"
echo "- 内部服务: la-mian-service.la-mian.svc.cluster.local:80"
echo "- 外部访问: 配置域名解析到 K3s 节点 IP" 