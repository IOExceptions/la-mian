#!/bin/bash

# 简单的 kubeconfig 获取脚本
# 使用方法: ./simple-kubeconfig.sh

echo "🔧 获取正确的 kubeconfig..."

# 检查 K3s 服务状态
echo "📋 检查 K3s 服务状态..."
if sudo systemctl is-active --quiet k3s; then
    echo "✅ K3s 服务正在运行"
else
    echo "❌ K3s 服务未运行"
    sudo systemctl start k3s
    sleep 5
fi

# 获取服务器 IP
SERVER_IP=$(ip addr show | grep "inet " | grep -v 127.0.0.1 | head -n1 | awk '{print $2}' | cut -d'/' -f1)
echo "🌐 服务器 IP: $SERVER_IP"

# 直接复制原始 kubeconfig
echo "📋 复制原始 kubeconfig..."
sudo cp /etc/rancher/k3s/k3s.yaml kubeconfig-original.yaml

# 更新服务器地址
echo "🔧 更新服务器地址..."
sed -i "s|server: https://127.0.0.1:6443|server: https://$SERVER_IP:6443|g" kubeconfig-original.yaml

# 添加跳过 TLS 验证
echo "🔧 添加跳过 TLS 验证..."
sed -i '/server:/a\    insecure-skip-tls-verify: true' kubeconfig-original.yaml

echo "✅ 创建了修复后的 kubeconfig: kubeconfig-original.yaml"

# 测试连接
echo "🔗 测试连接..."
export KUBECONFIG=kubeconfig-original.yaml
kubectl cluster-info

if [ $? -eq 0 ]; then
    echo "✅ 连接测试成功！"
    echo ""
    echo "📋 获取 base64 编码的 kubeconfig:"
    cat kubeconfig-original.yaml | base64 -w 0
    echo ""
    echo "📝 请将此内容复制到 GitHub Secrets 的 KUBE_CONFIG 中"
else
    echo "❌ 连接测试失败"
    echo "🔍 尝试使用原始 kubeconfig..."
    export KUBECONFIG=/etc/rancher/k3s/k3s.yaml
    kubectl cluster-info
fi 