data "template_file" "screenwriter_online_frontend_template_def" {
  template = "${file("${path.module}/task_definitions/web_td_template.json")}"

  vars {
    service_name              = "${var.service_name}-${var.environment}"
    config_signature          = "${var.config_signature}"
    image_name                = "${var.docker_registry}/${var.image_name}"
    image_tag                 = "${var.image_tag}"
    vue_app_env               = "${var.vue_app_env}"
    vue_app_base_url          = "${var.vue_app_base_url}"
    vue_app_producer_url      = "${var.vue_app_producer_url}"
    vue_app_hub_url           = "${var.vue_app_hub_url}"
    vue_app_screenwriter_online_url           = "${var.vue_app_screenwriter_online_url}"
    node_host                 = "${var.node_host}"
  }
}

resource "aws_ecs_task_definition" "web_td" {
  family = "screenwriter_online_frontend_${var.environment}"
  container_definitions = "${data.template_file.screenwriter_online_frontend_template_def.rendered}"
}

resource "aws_ecs_service" "screenwriter_online_frontend_svc" {
  name = "${var.service_name}-${var.environment}-tf"
  cluster = "${data.terraform_remote_state.cluster_state.cluster_name}"
  task_definition = "${aws_ecs_task_definition.web_td.arn}"
  desired_count = 1

  iam_role = "${var.iam_role_arn}"

  depends_on = [
    "aws_alb_listener_rule.web"
  ]

  load_balancer {
    target_group_arn = "${aws_alb_target_group.web.arn}"
    container_name   = "${var.service_name}-${var.environment}"
    container_port   = "${var.container_port}"
  }
}


resource "aws_alb_target_group" "web" {
  name                 = "${var.service_name}-${var.environment}-tf"
  port                 = 80
  protocol             = "HTTP"
  vpc_id               = "${var.vpc_id}"
  deregistration_delay = 30

  health_check {
    healthy_threshold   = 5
    unhealthy_threshold = 3
    timeout             = 3
    protocol            = "HTTP"
    interval            = 30
    matcher             = "200,301,302"
    path                = "/status"
  }
}

resource "aws_alb_listener_rule" "web" {
  listener_arn ="${data.terraform_remote_state.ts_apps_alb_state.https_listener_arn}"
  priority     = 155

  action {
    type             = "forward"
    target_group_arn = "${aws_alb_target_group.web.arn}"
  }

  condition {
    host_header {
      values = ["${aws_route53_record.web_public_r53.fqdn}"]
    }
  }

  depends_on = ["aws_route53_record.web_public_r53"]
}


resource "aws_route53_record" "web_public_r53" {
  zone_id = "${var.r53_public_zone_id}"
  name    = "${var.dns_name}"
#  type    = "CNAME"
#  ttl     = "60"
#  records = ["${data.terraform_remote_state.ts_apps_alb_state.dns_name}"]
  type    = "A"
  alias {
    name                   = "${aws_cloudfront_distribution.cloudfront.domain_name}"
    zone_id                = "${aws_cloudfront_distribution.cloudfront.hosted_zone_id}"
    evaluate_target_health = false
  }
}
