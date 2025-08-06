#!/bin/bash

# 快速测试 K3s 连接脚本
# 使用方法: ./test-k3s-connection.sh

echo "🔍 快速测试 K3s 连接..."

# 检查 kubectl 是否安装
if ! command -v kubectl &> /dev/null; then
    echo "❌ kubectl 未安装"
    echo "📋 请先安装 kubectl"
    exit 1
fi

# 检查 kubeconfig 文件
if [ ! -f "kubeconfig.yaml" ]; then
    echo "📋 创建测试 kubeconfig..."
    echo "$KUBE_CONFIG" | base64 -d > kubeconfig.yaml
fi

# 设置环境变量
export KUBECONFIG=kubeconfig.yaml

# 测试连接
echo "🔗 测试集群连接..."
if kubectl cluster-info --insecure-skip-tls-verify 2>/dev/null; then
    echo "✅ 集群连接成功！"
    
    # 检查集群状态
    echo "📊 集群状态:"
    kubectl get nodes --insecure-skip-tls-verify --no-headers | wc -l | xargs echo "节点数量:"
    kubectl get namespaces --insecure-skip-tls-verify --no-headers | wc -l | xargs echo "命名空间数量:"
    
    # 检查 la-mian 命名空间
    if kubectl get namespace la-mian --insecure-skip-tls-verify 2>/dev/null; then
        echo "✅ la-mian 命名空间存在"
        
        # 检查部署
        if kubectl get deployment la-mian-app -n la-mian --insecure-skip-tls-verify 2>/dev/null; then
            echo "✅ la-mian-app 部署存在"
            kubectl get pods -n la-mian --insecure-skip-tls-verify
        else
            echo "⚠️ la-mian-app 部署不存在"
        fi
    else
        echo "⚠️ la-mian 命名空间不存在"
    fi
    
    echo ""
    echo "🎉 K3s 连接测试通过！可以开始部署。"
else
    echo "❌ 集群连接失败"
    echo ""
    echo "🔧 故障排除步骤:"
    echo "1. 检查 KUBE_CONFIG 环境变量"
    echo "2. 验证 kubeconfig.yaml 文件内容"
    echo "3. 确认 K3s 服务器正在运行"
    echo "4. 检查网络连接"
    echo ""
    echo "📋 调试命令:"
    echo "kubectl config view"
    echo "kubectl cluster-info --insecure-skip-tls-verify"
    exit 1
fi
