require_relative "boot"

require "rails"
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "action_cable/engine"

Bundler.require(*Rails.groups)

module RouteMe
  class Application < Rails::Application
    config.load_defaults 5.1

    config.api_only = true

    config.eager_load_paths += Dir["#{config.root}/app/rails/**"]

    config.paths["app/views"] << "app/rails/views"
    config.paths["app/helpers"] << "app/rails/helpers"

    config.active_job.queue_adapter = :sidekiq
  end
end
