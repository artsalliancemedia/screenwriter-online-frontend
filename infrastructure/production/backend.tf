terraform {
  backend "s3" {
    bucket         = "aam-tf-prodcd-eu-west-1-app"
    key            = "aam-production-prodcd-screenwriter-online-frontend-2"
    region         = "eu-west-1"
    dynamodb_table = "terraform_state"
  }
}
