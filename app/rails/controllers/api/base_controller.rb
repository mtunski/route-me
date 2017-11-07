module Api
  class BaseController < ActionController::API
    private

    attr_accessor :client_id

    def set_client_id
      @client_id ||= params[:client_id]
    end

    def respond_with(resource, options = {})
      super(resource, options.merge(location: nil))
    end
  end
end
