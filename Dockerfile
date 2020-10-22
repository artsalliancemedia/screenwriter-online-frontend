# for build the frontend image

ARG REGISTRY=886366864302.dkr.ecr.eu-west-1.amazonaws.com

FROM $REGISTRY/artsalliancemedia/node-frontend-base:0.0.1 as BUILDER
ARG NPM_REGISTRY=https://registry.npmjs.org/
LABEL stage=node-build
WORKDIR /app
COPY ./ /app
RUN yarn cache clean && \
    yarn config set registry $NPM_REGISTRY && \
    yarn config delete proxy && \
    yarn config delete https-proxy && \
    yarn install --network-timeout 1000000 && \
    yarn build

FROM $REGISTRY/artsalliancemedia/nginx-alpine:1.18.0
ARG NGINX=config/nginx.conf
WORKDIR /app
COPY --from=BUILDER /app/dist /app
COPY $NGINX /etc/nginx/nginx.conf
COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
