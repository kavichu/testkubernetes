# Install bitnami mongodb helm chart

```sh
helm repo add bitnami https://charts.bitnami.com/bitnami
helm upgrade --install mongodb -f values.yaml bitnami/mongodb
```
