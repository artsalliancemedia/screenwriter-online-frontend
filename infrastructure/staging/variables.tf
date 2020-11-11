#aws config
variable "container_port" {
  default = 80
}

variable "environment" {
  default = "staging"
}

variable "r53_public_zone_id" {
  default = "ZB25WK20P9GNK"
}

variable "dns_name" {
  default = "screenwriter-online.staging"
}

variable "alb_dns_name" {
  default = "adminui-staging-lb-379616644.eu-west-1.elb.amazonaws.com"
}

variable "tag_cluster" {
  default = "staging"
}

#bucket
variable "remote_state_bucket" {
  default = "aam-tf-prodcd-eu-west-1-app"
}

variable "remote_state_bucket_key" {
  default = "aam-staging-prodcd-producer-cluster"
}

variable "remote_ts_apps_alb_state_bucket" {
  default = "aam-tf-prodcd-eu-west-1-app"
}

variable "remote_ts_apps_alb_state_bucket_key" {
  default = "aam-staging-prodcd-ts-apps-alb"
}

#service_config

variable "config_signature" {
  default = "Aam_screenwriter_online"
}
variable "image_name" {}
variable "image_tag" {}

variable "vue_app_env" {
  default = "staging"
}
variable "vue_app_base_url" {
  default = "/"
}
variable "vue_app_producer_url" {
  default = "https://producer.staging.aamts.io"
}
variable "vue_app_hub_url" {
  default = "https://admin.staging.aamts.io"
}
variable "vue_app_screenwriter_online_url" {
  default = "https://screenwriter-online.staging.aamts.io"
}
variable "node_host" {
  default = "node-frontend.staging.aamts.io"
}
