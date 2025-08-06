#!/bin/bash

echo "🔧 修复当前部署问题..."

# 设置kubeconfig
export KUBECONFIG=kubeconfig.yaml

# 删除有问题的Pod
echo "🗑️ 删除有问题的Pod..."
kubectl delete pod la-mian-app-6c8c5569f9-52f94 -n la-mian --insecure-skip-tls-verify

# 更新部署镜像到latest并重启
echo "🔄 更新部署到latest镜像..."
kubectl set image deployment/la-mian-app la-mian=ghcr.io/ioexceptions/la-mian:latest -n la-mian --insecure-skip-tls-verify

# 强制重启部署
echo "♻️ 强制重启部署..."
kubectl rollout restart deployment/la-mian-app -n la-mian --insecure-skip-tls-verify

# 等待部署完成
echo "⏳ 等待部署完成..."
kubectl rollout status deployment/la-mian-app -n la-mian --insecure-skip-tls-verify

# 检查最终状态
echo "📊 检查最终状态..."
kubectl get pods -n la-mian --insecure-skip-tls-verify

echo "✅ 修复完成！"