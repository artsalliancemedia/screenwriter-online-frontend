output "task_definition_arns" {
  value = ["${aws_ecs_task_definition.web_td.arn}"]
}

output "cluster" {
  value = "adminui-${var.tag_cluster}-cluster"
}

output "producer_frontend_url" {
  value = "${aws_route53_record.web_public_r53.fqdn}"
}
