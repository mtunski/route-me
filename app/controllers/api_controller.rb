class ApiController < ActionController::API
  private

  def respond_with(resource, options = {})
    super(resource, options.merge(location: nil))
  end
end
