data "terraform_remote_state" "cluster_state" {
  backend = "s3"

  config {
    region = "${var.region}"
    bucket = "${var.remote_state_bucket}"
    key    = "${var.remote_state_bucket_key}"
  }
}

data "terraform_remote_state" "ts_apps_alb_state" {
  backend = "s3"

  config {
    region = "${var.region}"
    bucket = "${var.remote_ts_apps_alb_state_bucket}"
    key    = "${var.remote_ts_apps_alb_state_bucket_key}"
  }
}

