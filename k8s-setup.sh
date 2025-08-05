#!/bin/bash

# K3s 初始设置脚本
# 使用方法: ./k8s-setup.sh

set -e

echo "🚀 开始 K3s 初始设置..."

# 检查 kubectl 是否可用
if ! command -v kubectl &> /dev/null; then
    echo "❌ 错误: kubectl 未安装"
    exit 1
fi

# 检查 kubectl 连接
if ! kubectl cluster-info &> /dev/null; then
    echo "❌ 错误: 无法连接到 Kubernetes 集群"
    exit 1
fi

echo "✅ 环境检查通过!"

# 创建命名空间
echo "📦 创建命名空间..."
kubectl create namespace la-mian --dry-run=client -o yaml | kubectl apply -f -

# 创建 Docker 镜像拉取 Secret
echo "🔐 创建镜像拉取 Secret..."
kubectl create secret docker-registry ghcr-secret \
  --docker-server=ghcr.io \
  --docker-username=your-username \
  --docker-password=your-github-token \
  --namespace=la-mian \
  --dry-run=client -o yaml | kubectl apply -f -

# 应用 Kubernetes 配置
echo "📋 应用 Kubernetes 配置..."
kubectl apply -f k8s-deployment.yaml

# 等待部署完成
echo "⏳ 等待部署完成..."
kubectl rollout status deployment/la-mian-app -n la-mian --timeout=300s

echo "✅ 初始设置完成!"
echo ""
echo "📊 部署状态:"
kubectl get pods -n la-mian
kubectl get services -n la-mian
kubectl get ingress -n la-mian

echo ""
echo "🔍 查看日志:"
echo "kubectl logs -f deployment/la-mian-app -n la-mian"
echo ""
echo "🌐 访问信息:"
echo "- 内部服务: la-mian-service.la-mian.svc.cluster.local:80"
echo "- 外部访问: 配置域名解析到 K3s 节点 IP" 