#!/bin/bash

echo "🔍 检查K3s集群状态..."
kubectl get nodes --insecure-skip-tls-verify

echo ""
echo "📦 检查命名空间..."
kubectl get namespaces --insecure-skip-tls-verify

echo ""
echo "🚀 检查部署状态..."
kubectl get deployments -n la-mian --insecure-skip-tls-verify

echo ""
echo "📋 检查Pod状态..."
kubectl get pods -n la-mian --insecure-skip-tls-verify

echo ""
echo "🔍 检查Pod详细信息..."
kubectl describe pods -n la-mian --insecure-skip-tls-verify

echo ""
echo "📝 检查Pod日志..."
kubectl logs -n la-mian -l app=la-mian --insecure-skip-tls-verify --tail=50

echo ""
echo "🌐 检查服务状态..."
kubectl get services -n la-mian --insecure-skip-tls-verify

echo ""
echo "🔗 检查Ingress状态..."
kubectl get ingress -n la-mian --insecure-skip-tls-verify

echo ""
echo "📊 检查事件..."
kubectl get events -n la-mian --insecure-skip-tls-verify --sort-by='.lastTimestamp' 