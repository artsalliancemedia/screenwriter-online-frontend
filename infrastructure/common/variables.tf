variable "iam_role_arn" {
  default =  "arn:aws:iam::886366864302:role/ecsServiceRole"
}

variable "vpc_id" {
  default = "vpc-dde2bfb9"
}

variable "service_name" {
  default = "sd-frontend"
}

variable "container_port" {
  default = 80
}

variable "web_task_number" {
  default = 1
}

variable "cloudfront_https_certificate_arn" {
  default = "arn:aws:acm:us-east-1:886366864302:certificate/1a565231-3c78-48b5-ade1-414ba10808ef"
}

variable "route_53_hosted_zone_id" {
  default = "ZB25WK20P9GNK"
}

variable "docker_registry" {
  default = "886366864302.dkr.ecr.eu-west-1.amazonaws.com"
}

variable "tag_cluster" {}

variable "environment" {
}

variable "r53_public_zone_id" {}

variable "dns_name" {}

variable "region" {
  default = "eu-west-1"
}

variable "remote_state_bucket" {}

variable "remote_state_bucket_key" {}

variable "remote_ts_apps_alb_state_bucket" {}

variable "remote_ts_apps_alb_state_bucket_key" {}

variable "alb_dns_name" {}
#task_definitions

variable "config_signature" {}
variable "image_name" {}
variable "image_tag" {}

variable "vue_app_env" {}
variable "vue_app_base_url" {}
variable "vue_app_producer_url" {}
variable "vue_app_hub_url" {}
variable "vue_app_screenwriter_online_url" {}
variable "node_host" {}
