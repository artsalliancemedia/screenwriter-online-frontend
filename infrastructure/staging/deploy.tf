module "staging_screenwriter_online_frontend" {
  source                              = "../common/"
  environment                         = "${var.environment}"
  r53_public_zone_id                  = "${var.r53_public_zone_id}"
  dns_name                            = "${var.dns_name}"
  tag_cluster                         = "${var.tag_cluster}"
  remote_state_bucket                 = "${var.remote_state_bucket}"
  remote_state_bucket_key             = "${var.remote_state_bucket_key}"
  remote_ts_apps_alb_state_bucket     = "${var.remote_ts_apps_alb_state_bucket}"
  remote_ts_apps_alb_state_bucket_key = "${var.remote_ts_apps_alb_state_bucket_key}"

  # service config
  config_signature          = "${var.config_signature}"
  alb_dns_name              = "${var.alb_dns_name}"
  image_name                = "${var.image_name}"
  image_tag                 = "${var.image_tag}"
  vue_app_env               = "${var.vue_app_env}"
  vue_app_base_url          = "${var.vue_app_base_url}"
  vue_app_producer_url      = "${var.vue_app_producer_url}"
  vue_app_hub_url           = "${var.vue_app_hub_url}"
  vue_app_screenwriter_online_url           = "${var.vue_app_screenwriter_online_url}"
  node_host                 = "${var.node_host}"
}
