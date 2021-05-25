# Create Kind cluster with ingress
kind create cluster --config kind-config.yaml --name=uptoyou

# Install Ingress Controller
kubectl get nodes
kubectl create -f mandatory.yaml
kubectl create -f service-nodeport.yaml

# Check nginx ingress
kubectl get pod -n ingress-nginx -o wide

# Run Patch for schedule
kubectl patch deployments -n ingress-nginx nginx-ingress-controller -p '{"spec":{"template":{"spec":{"containers":[{"name":"nginx-ingress-controller","ports":[{"containerPort":80,"hostPort":80},{"containerPort":443,"hostPort":443}]}],"nodeSelector":{"ingress-ready":"true"},"tolerations":[{"key":"node-role.kubernetes.io/master","operator":"Equal","effect":"NoSchedule"}]}}}}'
kubectl get pod -n ingress-nginx -o wide 


