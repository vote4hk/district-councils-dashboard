set -e
# make sure the .env.production is valid
export $(cat .env.production | xargs)

# build the docker image with name dc2019
docker build -t dc2019 .

# build and push image (to nandi's dockerhub repo)
docker tag dc2019 nandiheath/dc2019:latest
docker push nandiheath/dc2019:latest

# restart the pods
# TODO: rolling deployment with tagged images
kubectl delete pod -l app=dc2019
