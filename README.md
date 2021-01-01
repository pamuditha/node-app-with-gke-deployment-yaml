# Deploy a simple Node.js app on Kubernetes (GKE)

## Deploy on Kubernetes (GKE)

Create a new Kubernetes cluster

Enter a name for your cluster, location, number of nodes and machine type. Then click More Options.

If you need to automatically add new nodes to the cluster, then click Enable autoscaling.

You can allow access to some APIs from the cluster. For example, I allow access to Google Cloud Storage (GCS).
After your cluster has been created, click Connect.

Now you’ll see a Cloud Shell with the command, press Enter to execute it and get GKE credentials. After that, you can execute any commands with kubectl.
For example, let’s check the nodes of a cluster.

Push docker image to Google Container Registry

I’ll use GitHub repo which includes a simple Node.js app, Dockerfile, and deployment.yaml. All these commands I’ll enter in Cloud Shell.

Replace [PROJECT_ID] in deployment.yaml with your GCP project ID.
Get credentials to Google Container Registry
gcloud auth configure-docker
Build and push the docker image to Google Container Registry
`docker build -t gcr.io/[PROJECT_ID]/app:v1 .`
`docker push gcr.io/[PROJECT_ID]/app:v1`
Deploy docker image to Kubernetes
Deployment YAML file contains two parts:
Deployment - describe containers to be deployed
Service - will create a LoadBalancer to expose our containers to the internet

Create deployment and service.

`kubectl apply -f deployment.yaml --record`
Check deployment process

`kubectl get deployments`
Check pods (containers)

`kubectl get pods`

Check service and copy external IP address (LoadBalancer)
kubectl get services

Now, you can open in your browser this URL
http://<EXTERNAL-IP>/
How to release a new version?
Push a new version of docker image to the Container Registry, change docker image version in deployment.yaml and then run this command to set desired deployment state.
`kubectl apply -f deployment.yaml --record`
How to rollback new release?
`kubectl rollout undo deployment/my-app-deployment`
Useful tips
Check container logs

`kubectl logs <POD NAME>`
Go inside container
`kubectl exec -it <POD NAME> bash`
Delete a whole deployment
`kubectl delete deployment my-app-deployment`
Set horizontal pod autoscaling policy for deployment
`kubectl autoscale deployment <DEPLOYMENT_NAME> --max 4  --min 2 --cpu-percent 60`
Check horizontal pod autoscaling policy (HorizontalPodAutoscaler object)
`kubectl get hpa`
Check pod Events to investigate issues with pods deployment, polling docker image, etc.

`kubectl get pods`
kubectl describe pods/<POD_NAME>



## Run
npm i
npm run start
```
