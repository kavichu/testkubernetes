# Install bitnami mongodb helm chart

```sh
helm repo add bitnami https://charts.bitnami.com/bitnami
helm upgrade --install mongodb -f values.yaml bitnami/mongodb
```

# Clean up
This is an important step, if not doing after uninstalling mongodb chart, the pvs create problems when reused.

```sh
# delete mongodb chart
helm delete mongodb
# delete all pvcs
kubectl get pvc | grep pv | awk '{print $1}' | xargs kubectl delete pvc
# delete all pvs
kubectl get pv | grep pv | awk '{print $1}' | xargs kubectl delete pv
```
