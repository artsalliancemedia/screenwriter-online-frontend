locals {
  origin_id = "${var.service_name}-${var.environment}-cloudfront"
}

data "aws_route53_zone" "web_public_r53_zone" {
  zone_id = "${var.route_53_hosted_zone_id}"
}

resource "aws_cloudfront_distribution" "cloudfront" {

  origin {
    domain_name = "${data.terraform_remote_state.ts_apps_alb_state.dns_name}"
    origin_id = "${local.origin_id}"

    custom_origin_config {
      http_port = 80
      https_port = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols = [
        "TLSv1",
        "TLSv1.1",
        "TLSv1.2"
      ]
    }
  }

  enabled = true
  is_ipv6_enabled = true

  aliases = ["${local.domain_name}"]

  default_cache_behavior {
    allowed_methods = [
      "GET",
      "HEAD",
      "OPTIONS"
    ]
    cached_methods = [
      "GET",
      "HEAD"
    ]
    target_origin_id = "${local.origin_id}"

    forwarded_values {
      query_string = false
      headers = [
        "*"
      ]
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl = 0
    default_ttl = 3600
    max_ttl = 86400
  }

  ordered_cache_behavior {
    path_pattern = "p2/*"
    allowed_methods = [
      "DELETE",
      "GET",
      "HEAD",
      "OPTIONS",
      "PATCH",
      "POST",
      "PUT"
    ]
    cached_methods = [
      "GET",
      "HEAD"
    ]
    target_origin_id = "${local.origin_id}"

    forwarded_values {
      query_string = true
      headers = [
        "*"
      ]
      cookies {
        forward = "all"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl = 0
    default_ttl = 0
    max_ttl = 0
  }

  ordered_cache_behavior {
      path_pattern = "ws/*"
      allowed_methods = [
        "DELETE",
        "GET",
        "HEAD",
        "OPTIONS",
        "PATCH",
        "POST",
        "PUT"
      ]
      cached_methods = [
        "GET",
        "HEAD"
      ]
      target_origin_id = "${local.origin_id}"

      forwarded_values {
        query_string = true
        headers = [
          "*"
        ]
        cookies {
          forward = "all"
        }
      }

      viewer_protocol_policy = "redirect-to-https"
      min_ttl = 0
      default_ttl = 0
      max_ttl = 0
    }

  price_class = "PriceClass_All"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn = "${var.cloudfront_https_certificate_arn}"
    ssl_support_method = "sni-only"
    minimum_protocol_version = "TLSv1.2_2018"
  }
}

locals {
  domain_name = "${var.dns_name}.${replace(data.aws_route53_zone.web_public_r53_zone.name, "/[.]$/", "")}"
}