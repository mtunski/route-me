source "https://rubygems.org"
ruby "2.4.1"

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gem "pg", "~> 0.21.0"
gem "puma", "~> 3.10.0"
gem "rails", "~> 5.1.4"

gem "geocoder"
gem "redis", "~> 3.0"
gem "responders"
gem "sidekiq"

gem "execjs", "~> 2.7.0"
gem "mini_racer", "~> 0.1.14"
gem "react_on_rails", "~> 10.0.1"

group :development, :test do
  gem "dotenv-rails", "~> 2.2.1"
  gem "pry", "~> 0.10.4"
  gem "pry-rails", "~> 0.3.6"
  gem "pry-remote", "~> 0.1.8"
end

group :development do
  gem "foreman", "~> 0.84.0"
  gem "listen", "~> 3.1.5"
  gem "rubocop", "~> 0.49.1", require: false
  gem "spring", "~> 2.0.2"
  gem "spring-watcher-listen", "~> 2.0.1"
end
