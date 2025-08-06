#!/bin/bash

# 强制重新部署脚本
# 用于解决镜像缓存问题

echo "🔄 强制重新部署 la-mian 应用..."

# 设置kubeconfig
export KUBECONFIG=kubeconfig.yaml

# 获取最新镜像
echo "📋 检查可用的镜像标签..."
echo "访问 https://github.com/IOExceptions/la-mian/pkgs/container/la-mian 查看所有镜像"

# 重启部署（这会强制拉取新镜像）
echo "♻️ 重启部署..."
kubectl rollout restart deployment/la-mian-app -n la-mian --insecure-skip-tls-verify

# 等待部署完成
echo "⏳ 等待重启完成..."
kubectl rollout status deployment/la-mian-app -n la-mian --insecure-skip-tls-verify

# 检查Pod状态
echo "📊 检查Pod状态..."
kubectl get pods -n la-mian --insecure-skip-tls-verify

# 显示镜像信息
echo "🏷️ 当前使用的镜像："
kubectl get deployment la-mian-app -n la-mian -o jsonpath='{.spec.template.spec.containers[0].image}' --insecure-skip-tls-verify
echo

echo "✅ 重新部署完成！"