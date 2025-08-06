#!/bin/bash

# 修复 kubeconfig 认证问题脚本
# 使用方法: ./fix-kubeconfig.sh

echo "🔧 修复 kubeconfig 认证问题..."

# 检查 K3s 服务状态
echo "📋 检查 K3s 服务状态..."
sudo systemctl status k3s --no-pager

# 获取服务器 IP
SERVER_IP=$(ip addr show | grep "inet " | grep -v 127.0.0.1 | head -n1 | awk '{print $2}' | cut -d'/' -f1)
echo "🌐 服务器 IP: $SERVER_IP"

# 检查原始 kubeconfig
echo "📋 检查原始 kubeconfig..."
if [ -f "/etc/rancher/k3s/k3s.yaml" ]; then
    echo "✅ kubeconfig 文件存在"
    
    # 检查证书数据
    CERT_DATA=$(sudo cat /etc/rancher/k3s/k3s.yaml | grep "client-certificate-data:" -A1 | tail -n1 | tr -d ' ')
    KEY_DATA=$(sudo cat /etc/rancher/k3s/k3s.yaml | grep "client-key-data:" -A1 | tail -n1 | tr -d ' ')
    
    if [ -n "$CERT_DATA" ] && [ -n "$KEY_DATA" ]; then
        echo "✅ 证书数据存在"
        echo "📏 证书数据长度: ${#CERT_DATA}"
        echo "📏 密钥数据长度: ${#KEY_DATA}"
    else
        echo "❌ 证书数据缺失"
        echo "🔧 重新生成 kubeconfig..."
        sudo rm -f /etc/rancher/k3s/k3s.yaml
        sudo systemctl restart k3s
        sleep 10
    fi
else
    echo "❌ kubeconfig 文件不存在"
    echo "🔧 重新初始化 K3s..."
    sudo systemctl restart k3s
    sleep 10
fi

# 重新获取证书数据
echo "🔄 重新获取证书数据..."
CERT_DATA=$(sudo cat /etc/rancher/k3s/k3s.yaml | grep "client-certificate-data:" -A1 | tail -n1 | tr -d ' ')
KEY_DATA=$(sudo cat /etc/rancher/k3s/k3s.yaml | grep "client-key-data:" -A1 | tail -n1 | tr -d ' ')

if [ -z "$CERT_DATA" ] || [ -z "$KEY_DATA" ]; then
    echo "❌ 无法获取证书数据"
    echo "🔧 尝试手动生成证书..."
    
    # 检查证书文件
    if [ -f "/var/lib/rancher/k3s/server/tls/client-admin.crt" ]; then
        echo "✅ 找到证书文件"
        CERT_DATA=$(sudo cat /var/lib/rancher/k3s/server/tls/client-admin.crt | base64 -w 0)
        KEY_DATA=$(sudo cat /var/lib/rancher/k3s/server/tls/client-admin.key | base64 -w 0)
    else
        echo "❌ 证书文件不存在"
        exit 1
    fi
fi

# 验证 base64 数据
echo "🔍 验证 base64 数据..."
if echo "$CERT_DATA" | base64 -d > /dev/null 2>&1; then
    echo "✅ 证书数据 base64 编码正确"
else
    echo "❌ 证书数据 base64 编码错误"
    # 重新编码
    CERT_DATA=$(echo "$CERT_DATA" | base64 -d | base64 -w 0)
fi

if echo "$KEY_DATA" | base64 -d > /dev/null 2>&1; then
    echo "✅ 密钥数据 base64 编码正确"
else
    echo "❌ 密钥数据 base64 编码错误"
    # 重新编码
    KEY_DATA=$(echo "$KEY_DATA" | base64 -d | base64 -w 0)
fi

# 创建修复后的 kubeconfig
echo "📝 创建修复后的 kubeconfig..."
cat > kubeconfig-fixed.yaml << EOF
apiVersion: v1
kind: Config
clusters:
- cluster:
    insecure-skip-tls-verify: true
    server: https://$SERVER_IP:6443
  name: default
contexts:
- context:
    cluster: default
    user: default
  name: default
current-context: default
users:
- name: default
  user:
    client-certificate-data: $CERT_DATA
    client-key-data: $KEY_DATA
EOF

echo "✅ 创建了修复后的 kubeconfig: kubeconfig-fixed.yaml"

# 验证 kubeconfig 格式
echo "🔍 验证 kubeconfig 格式..."
if kubectl config view --kubeconfig=kubeconfig-fixed.yaml > /dev/null 2>&1; then
    echo "✅ kubeconfig 格式正确"
else
    echo "❌ kubeconfig 格式错误"
    echo "📋 kubeconfig 内容:"
    cat kubeconfig-fixed.yaml
    exit 1
fi

# 测试连接
echo "🔗 测试连接..."
export KUBECONFIG=kubeconfig-fixed.yaml
kubectl cluster-info

if [ $? -eq 0 ]; then
    echo "✅ 连接测试成功！"
    echo ""
    echo "📋 获取 base64 编码的 kubeconfig:"
    cat kubeconfig-fixed.yaml | base64 -w 0
    echo ""
    echo "📝 请将此内容复制到 GitHub Secrets 的 KUBE_CONFIG 中"
else
    echo "❌ 连接测试失败"
    echo "🔍 调试信息:"
    kubectl cluster-info dump
fi
