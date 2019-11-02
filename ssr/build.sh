set -e
# make sure the .env.production is valid

# build the docker image with name dc2019
docker build -t dc2019ssr .

# build and push image (to nandi's dockerhub repo)
docker tag dc2019ssr nandiheath/dc2019ssr:latest
docker push nandiheath/dc2019ssr:latest

# restart the pods
# TODO: rolling deployment with tagged images
kubectl delete pod -l app=dc2019ssr
