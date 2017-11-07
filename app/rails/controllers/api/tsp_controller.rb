module Api
  class TspController < BaseController
    before_action :set_client_id

    respond_to :json

    def solve
      params.permit!

      SolveTspJob.perform_later(client_id, params[:locations].map(&:to_h), params[:algorithm_parameters].to_h)

      head :accepted
    end
  end
end
