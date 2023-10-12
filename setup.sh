
# Create Docker Network "bridge-net" to this host.
sudo docker network create -d bridge --subnet=172.99.0.0/24 bridge-net


# ------------------------------------------------------------------------------- 
WORKDIR=/app
# ------------------------------------------------------------------------------- 

IMAGE_NAME="nextjs-ui"
CONTAINER_NAME="nextjsui"
TAG=1.21.6-alpine
HTTP_PUB_PORT=80
HTTPS_PUB_PORT=443

sudo docker rm -f $CONTAINER_NAME

sudo docker run --name $CONTAINER_NAME \
        --restart=always \
        --network bridge-net \
        -v $PWD/file:$WORKDIR \
        -v $PWD/nginx/logs:/var/log/nginx \
        -v $PWD/nginx/nginx.conf:/etc/nginx/nginx.conf \
        -v $PWD/nginx/nginx.default.conf:/etc/nginx/conf.d/default.conf \
        -v $PWD/nginx/letsencrypt:/letsencrypt \
        -v $PWD/nginx/ssl:/ssl \
        -v /etc/localtime:/etc/localtime:ro \
        -p $HTTP_PUB_PORT:80 \
        -p $HTTPS_PUB_PORT:443 \
        -d $IMAGE_NAME
