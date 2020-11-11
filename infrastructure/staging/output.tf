output "task_definition_arns" {
  value = "${module.staging_screenwriter_online_frontend.task_definition_arns}"
}

output "cluster" {
  value = "${module.staging_screenwriter_online_frontend.cluster}"
}

output "producer_frontend_url" {
  value = "${module.staging_screenwriter_online_frontend.producer_frontend_url}"
}
