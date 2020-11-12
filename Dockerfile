# for build the frontend image

ARG REGISTRY=886366864302.dkr.ecr.eu-west-1.amazonaws.com

FROM $REGISTRY/artsalliancemedia/node-frontend-base:0.0.2-berry as BUILDER
ARG NPM_REGISTRY=npm
ARG NPM_AUTH_TOKEN
LABEL stage=node-build
WORKDIR /app
COPY ./ /app
RUN yarn --version
RUN yarn rebuild
RUN yarn install --immutable --immutable-cache
RUN yarn build

FROM $REGISTRY/artsalliancemedia/nginx-alpine:1.18.0
ARG NGINX=config/nginx.conf
WORKDIR /app
COPY --from=BUILDER /app/dist /app
COPY $NGINX /etc/nginx/nginx.conf
COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
