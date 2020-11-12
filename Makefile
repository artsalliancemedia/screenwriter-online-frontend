default: help

local:
	yarn run serve

patch:
	yarn version --no-git-tag-version --patch

minor:
	yarn version --no-git-tag-version --minor

major:
	yarn version --no-git-tag-version --major

help:
	@echo "   \033[35m make \033[0m                  \033[1mCommand instructions\033[0m"
	@echo "   \033[35m make version                  \033[0m\t ---  get version"
	@echo "   \033[35m make patch                    \033[0m\t ---  set version patch, like 1.0.X"
	@echo "   \033[35m make minor                    \033[0m\t ---  set version minor, like 1.X.0"
	@echo "   \033[35m make major                    \033[0m\t ---  set version minor, like X.0.0"

VERSION_SUFFIX ?= ""
VERSION ?= $$(grep -m1 version package.json | awk -F: '{ print $2 }' | sed 's/[",version: ]//g')$(VERSION_SUFFIX)
NPM_REGISTRY ?= npm
REGISTRY ?= 886366864302.dkr.ecr.eu-west-1.amazonaws.com
IMAGE ?= $(REGISTRY)/artsalliancemedia/screenwriter-online-frontend
NGINX ?= config/nginx.conf
NPM_AUTH_TOKEN ?= ''

version:
	@echo $(VERSION)

docker-build-frontend:
	docker build -f Dockerfile \
	--build-arg REGISTRY=$(REGISTRY) \
	--build-arg NPM_REGISTRY=$(NPM_REGISTRY) \
	--build-arg NPM_AUTH_TOKEN=$(NPM_AUTH_TOKEN) \
	--build-arg NGINX=$(NGINX) \
	-t $(IMAGE):$(VERSION) .

docker-push-frontend:
	docker push $(IMAGE):$(VERSION)
